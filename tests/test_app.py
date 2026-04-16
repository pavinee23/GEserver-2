import io
import json
import unittest
from urllib.parse import urlsplit
from unittest.mock import patch

from app import PortalApplication


class PortalApplicationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.profile = {
            "brand_name": "GOEUN SERVER HUB",
            "headline": "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
            "subheadline": "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
            "phone": "081-234-5678",
            "email": "goeunserverhub@gmail.com",
            "address": "Bangkok, Thailand",
        }
        self.services = [
            {
                "id": 1,
                "title": "พัฒนาระบบเฉพาะธุรกิจ",
                "description": "ระบบสำหรับลูกค้าแต่ละราย",
                "highlight": "Custom Workflow",
                "sort_order": 1,
            }
        ]
        self.clients = [
            {
                "id": 1,
                "name": "M-Factory",
                "slug": "m-factory",
                "description": "ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว",
                "system_url": "https://portal.example.com/m-factory",
                "status": "online",
                "contact_email": "ops@rung-ruang.example.com",
                "contact_phone": "02-111-2233",
                "accent_color": "#1F7A8C",
                "sort_order": 1,
            },
            {
                "id": 2,
                "name": "MCT-Market",
                "slug": "mct-market",
                "description": "จำหน่ายอุปกรณ์การเกษตร พร้อมพัฒนาแพลตฟอร์มการตลาดที่ใช้ AI ตอบลูกค้า เสนอขายสินค้า และรับชำระเงินแทน",
                "system_url": "https://portal.example.com/mct-market",
                "status": "online",
                "contact_email": "sales@mct-market.example.com",
                "contact_phone": "02-444-8822",
                "accent_color": "#5F8A3A",
                "sort_order": 2,
            },
        ]
        self.products = [
            {
                "id": 1,
                "client_slug": "mct-market",
                "sku": "MCT-SPRAY-020",
                "name": "เครื่องพ่นยาแบตเตอรี่ 20L",
                "category": "เครื่องมือเกษตร",
                "description": "ถังพ่นยาระบบแบตเตอรี่สำหรับสวนและแปลงผัก",
                "price": 2450.0,
                "currency": "THB",
                "stock_quantity": 35,
                "unit": "เครื่อง",
                "is_featured": True,
                "sort_order": 2,
            }
        ]

        self.patches = [
            patch("app.initialize_database"),
            patch("app.get_site_profile", return_value=self.profile),
            patch("app.list_services", return_value=self.services),
            patch("app.list_clients", return_value=self.clients),
            patch("app.list_products", return_value=self.products),
            patch("app.search_products", return_value=self.products),
            patch(
                "app.chat_with_sales_ai",
                return_value={
                    "reply": "พบสินค้าแนะนำ 1 รายการ พร้อมช่วยออกใบเสนอราคาเบื้องต้นได้ครับ",
                    "products": self.products,
                    "mode": "demo",
                    "tools_used": ["search_products"],
                },
            ),
            patch(
                "app.get_client_by_slug",
                side_effect=lambda slug: next(
                    (client for client in self.clients if client["slug"] == slug),
                    None,
                ),
            ),
        ]

        for item in self.patches:
            item.start()

        self.addCleanup(self.stop_patches)
        self.app = PortalApplication()

    def stop_patches(self) -> None:
        for item in reversed(self.patches):
            item.stop()

    def request(self, path: str, method: str = "GET", payload: dict | None = None):
        status_holder = {}
        headers_holder = {}
        split = urlsplit(path)
        body = json.dumps(payload).encode("utf-8") if payload is not None else b""

        def start_response(status, headers):
            status_holder["status"] = status
            headers_holder["headers"] = dict(headers)

        response_body = b"".join(
            self.app(
                {
                    "REQUEST_METHOD": method,
                    "PATH_INFO": split.path,
                    "QUERY_STRING": split.query,
                    "CONTENT_LENGTH": str(len(body)),
                    "CONTENT_TYPE": "application/json",
                    "wsgi.input": io.BytesIO(body),
                },
                start_response,
            )
        )
        return status_holder["status"], headers_holder["headers"], response_body

    def test_home_page_renders_seed_content(self):
        status, headers, body = self.request("/")
        decoded = body.decode("utf-8")

        self.assertEqual(status, "200 OK")
        self.assertIn("text/html", headers["Content-Type"])
        self.assertIn("GOEUN SERVER HUB", decoded)
        self.assertIn("M-Factory", decoded)
        self.assertIn("goeunserverhub@gmail.com", decoded)
        self.assertIn("/static/logo-mark.svg", decoded)
        self.assertIn('data-language="en"', decoded)
        self.assertIn("中文", decoded)

    def test_clients_api_returns_json(self):
        status, headers, body = self.request("/api/clients")
        payload = json.loads(body.decode("utf-8"))

        self.assertEqual(status, "200 OK")
        self.assertIn("application/json", headers["Content-Type"])
        self.assertEqual(len(payload["clients"]), 2)
        self.assertEqual(payload["clients"][0]["slug"], "m-factory")

    def test_products_api_returns_filtered_products(self):
        status, headers, body = self.request("/api/products?q=เครื่องพ่น&client_slug=mct-market")
        payload = json.loads(body.decode("utf-8"))

        self.assertEqual(status, "200 OK")
        self.assertIn("application/json", headers["Content-Type"])
        self.assertEqual(payload["client_slug"], "mct-market")
        self.assertEqual(payload["products"][0]["sku"], "MCT-SPRAY-020")

    def test_ai_chat_api_returns_reply(self):
        status, headers, body = self.request(
            "/api/ai/chat",
            method="POST",
            payload={"message": "มีเครื่องพ่นยาไหม", "client_slug": "mct-market"},
        )
        payload = json.loads(body.decode("utf-8"))

        self.assertEqual(status, "200 OK")
        self.assertIn("application/json", headers["Content-Type"])
        self.assertEqual(payload["mode"], "demo")
        self.assertEqual(payload["client_slug"], "mct-market")
        self.assertIn("ใบเสนอราคา", payload["reply"])

    def test_go_route_redirects_to_customer_system(self):
        status, headers, body = self.request("/go/mct-market")

        self.assertEqual(status, "302 Found")
        self.assertEqual(headers["Location"], "https://portal.example.com/mct-market")
        self.assertEqual(body, b"")

    def test_unknown_route_returns_not_found(self):
        status, _, body = self.request("/missing-page")

        self.assertEqual(status, "404 Not Found")
        self.assertIn("ไม่พบหน้าที่คุณต้องการ", body.decode("utf-8"))


if __name__ == "__main__":
    unittest.main()
