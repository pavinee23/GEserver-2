from __future__ import annotations

import json
import mimetypes
import os
from pathlib import Path
from typing import Callable, Iterable
from urllib.parse import parse_qs

import mysql.connector

from .ai import chat_with_sales_ai
from .database import (
    get_client_by_slug,
    get_site_profile,
    initialize_database,
    list_clients,
    list_products,
    search_products,
    list_services,
)
from .templates import render_client_portal, render_clients_page, render_error_page, render_home, render_not_found


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
STATUS_TEXT = {
    200: "200 OK",
    302: "302 Found",
    400: "400 Bad Request",
    404: "404 Not Found",
    405: "405 Method Not Allowed",
    502: "502 Bad Gateway",
    500: "500 Internal Server Error",
}


class PortalApplication:
    def __init__(self) -> None:
        initialize_database()

    def __call__(self, environ: dict, start_response: Callable) -> Iterable[bytes]:
        method = environ.get("REQUEST_METHOD", "GET").upper()
        path = environ.get("PATH_INFO", "/")

        try:
            if path.startswith("/static/"):
                return self.serve_static(path, start_response)

            if method == "POST" and path == "/api/ai/chat":
                return self.ai_chat_api(environ, start_response)

            if method != "GET":
                return self.respond_json(start_response, 405, {"error": "Method not allowed"})

            if path == "/":
                return self.home(start_response)
            if path == "/clients":
                return self.clients_directory(start_response)
            if path == "/api/clients":
                return self.clients_api(start_response)
            if path == "/api/services":
                return self.services_api(start_response)
            if path == "/api/profile":
                return self.profile_api(start_response)
            if path == "/api/products":
                return self.products_api(environ, start_response)
            if path == "/health":
                return self.respond_json(start_response, 200, {"status": "ok"})
            if path.startswith("/portal/"):
                slug = path.removeprefix("/portal/").strip("/")
                return self.client_portal(slug, start_response)
            if path.startswith("/go/"):
                slug = path.removeprefix("/go/").strip("/")
                return self.redirect_to_system(slug, start_response)

            return self.not_found(start_response)
        except Exception:
            profile = self.safe_profile()
            return self.respond_html(start_response, 500, render_error_page(profile))

    def home(self, start_response: Callable) -> Iterable[bytes]:
        profile = get_site_profile()
        html = render_home(profile, list_services(), list_clients())
        return self.respond_html(start_response, 200, html)

    def clients_directory(self, start_response: Callable) -> Iterable[bytes]:
        profile = get_site_profile()
        html = render_clients_page(profile, list_clients())
        return self.respond_html(start_response, 200, html)

    def client_portal(self, slug: str, start_response: Callable) -> Iterable[bytes]:
        client = get_client_by_slug(slug)
        if not client:
            return self.not_found(start_response)
        profile = get_site_profile()
        html = render_client_portal(profile, client)
        return self.respond_html(start_response, 200, html)

    def redirect_to_system(self, slug: str, start_response: Callable) -> Iterable[bytes]:
        client = get_client_by_slug(slug)
        if not client:
            return self.not_found(start_response)
        start_response(
            STATUS_TEXT[302],
            [
                ("Content-Type", "text/plain; charset=utf-8"),
                ("Location", client["system_url"]),
            ],
        )
        return [b""]

    def clients_api(self, start_response: Callable) -> Iterable[bytes]:
        payload = {"clients": list_clients()}
        return self.respond_json(start_response, 200, payload)

    def services_api(self, start_response: Callable) -> Iterable[bytes]:
        payload = {"services": list_services()}
        return self.respond_json(start_response, 200, payload)

    def profile_api(self, start_response: Callable) -> Iterable[bytes]:
        payload = {"profile": get_site_profile()}
        return self.respond_json(start_response, 200, payload)

    def products_api(self, environ: dict, start_response: Callable) -> Iterable[bytes]:
        params = self.query_params(environ)
        query = params.get("q") or params.get("query") or ""
        client_slug = params.get("client_slug") or "mct-market"
        limit = self.parse_limit(params.get("limit"), default=12, maximum=24)

        if query:
            products = search_products(query, client_slug=client_slug, limit=limit)
        else:
            products = list_products(client_slug=client_slug, limit=limit)

        payload = {
            "products": products,
            "client_slug": client_slug,
            "query": query,
        }
        return self.respond_json(start_response, 200, payload)

    def ai_chat_api(self, environ: dict, start_response: Callable) -> Iterable[bytes]:
        payload = self.read_json_body(environ)
        message = str(payload.get("message", "")).strip()
        client_slug = str(payload.get("client_slug", "mct-market")).strip() or "mct-market"

        if not message:
            return self.respond_json(start_response, 400, {"error": "Message is required"})

        result = chat_with_sales_ai(message, client_slug=client_slug)
        result["client_slug"] = client_slug
        return self.respond_json(start_response, 200, result)

    def not_found(self, start_response: Callable) -> Iterable[bytes]:
        profile = self.safe_profile()
        return self.respond_html(start_response, 404, render_not_found(profile))

    def safe_profile(self) -> dict:
        try:
            return get_site_profile()
        except Exception:
            return {
                "brand_name": "GOEUN SERVER HUB",
                "headline": "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
                "subheadline": "ระบบพร้อมเชื่อมต่อ MySQL",
                "phone": "",
                "email": "",
                "address": "",
            }

    def query_params(self, environ: dict) -> dict[str, str]:
        raw_query = environ.get("QUERY_STRING", "")
        parsed = parse_qs(raw_query, keep_blank_values=True)
        return {key: values[-1] for key, values in parsed.items()}

    def parse_limit(self, raw_limit: str | None, *, default: int, maximum: int) -> int:
        if not raw_limit:
            return default
        try:
            return max(1, min(int(raw_limit), maximum))
        except (TypeError, ValueError):
            return default

    def read_json_body(self, environ: dict) -> dict:
        content_length = environ.get("CONTENT_LENGTH", "0") or "0"
        try:
            body_size = int(content_length)
        except (TypeError, ValueError):
            body_size = 0

        if body_size <= 0:
            return {}

        body = environ["wsgi.input"].read(body_size)
        if not body:
            return {}

        try:
            return json.loads(body.decode("utf-8"))
        except json.JSONDecodeError:
            return {}

    def serve_static(self, path: str, start_response: Callable) -> Iterable[bytes]:
        relative_path = path.removeprefix("/static/")
        asset_path = (STATIC_DIR / relative_path).resolve()
        if not str(asset_path).startswith(str(STATIC_DIR.resolve())) or not asset_path.is_file():
            return self.respond_json(start_response, 404, {"error": "Static asset not found"})

        mime_type = mimetypes.guess_type(asset_path.name)[0] or "application/octet-stream"
        content = asset_path.read_bytes()
        start_response(
            STATUS_TEXT[200],
            [
                ("Content-Type", f"{mime_type}; charset=utf-8"),
                ("Content-Length", str(len(content))),
            ],
        )
        return [content]

    def respond_html(self, start_response: Callable, status_code: int, html: str) -> Iterable[bytes]:
        content = html.encode("utf-8")
        start_response(
            STATUS_TEXT[status_code],
            [
                ("Content-Type", "text/html; charset=utf-8"),
                ("Content-Length", str(len(content))),
            ],
        )
        return [content]

    def respond_json(self, start_response: Callable, status_code: int, payload: dict) -> Iterable[bytes]:
        content = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        start_response(
            STATUS_TEXT[status_code],
            [
                ("Content-Type", "application/json; charset=utf-8"),
                ("Content-Length", str(len(content))),
            ],
        )
        return [content]


def main() -> None:
    from wsgiref.simple_server import make_server

    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    try:
        app = PortalApplication()
    except mysql.connector.Error as exc:
        raise SystemExit(
            "Could not initialize MySQL. Check MYSQL_HOST, MYSQL_PORT, "
            "MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE. "
            f"Original error: {exc}"
        ) from exc

    with make_server(host, port, app) as server:
        print(f"Serving GOEUN SERVER HUB on http://{host}:{port}")
        server.serve_forever()


# WSGI entry point for gunicorn: gunicorn backend.app:application
application = PortalApplication()

if __name__ == "__main__":
    main()
