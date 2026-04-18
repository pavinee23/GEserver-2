from __future__ import annotations

import json
import os
from typing import Any

from .database import search_products


SYSTEM_PROMPT = """
You are the AI sales assistant for MCT-Market, an agricultural equipment and supplies business.
Answer clearly and professionally in Thai unless the user writes in another language.
Use the search_products tool whenever the user asks about products, pricing, stock, or recommendations.
Do not invent stock, payment confirmation, shipping dates, or discounts.
If the user wants to pay or confirm an order, explain that the platform will generate the next step after human or system confirmation.
""".strip()


def _demo_reply(message: str, client_slug: str) -> dict[str, Any]:
    products = search_products(message, client_slug=client_slug, limit=3)

    if products:
        lines = ["พบสินค้าที่น่าจะตรงกับความต้องการของลูกค้าครับ:"]
        for product in products:
            lines.append(
                f"- {product['name']} ({product['sku']}) ราคา {product['price']:,.2f} {product['currency']} "
                f"สต๊อก {product['stock_quantity']} {product['unit']}"
            )
        lines.append("หากต้องการ ผมช่วยสรุปเปรียบเทียบสินค้า ออกใบเสนอราคาเบื้องต้น หรือเตรียมส่งต่อทีมขายได้ครับ")
        return {
            "reply": "\n".join(lines),
            "products": products,
            "mode": "demo",
            "tools_used": ["search_products"],
        }

    return {
        "reply": (
            "ตอนนี้ยังไม่พบสินค้าที่ตรงคำค้นในฐานข้อมูลครับ "
            "ลองระบุประเภทสินค้า เช่น ปุ๋ย เมล็ดพันธุ์ เครื่องพ่นยา หรือระบบน้ำ เพิ่มได้เลย"
        ),
        "products": [],
        "mode": "demo",
        "tools_used": ["search_products"],
    }


def _create_openai_client():
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        return None

    try:
        from openai import OpenAI
    except ImportError:
        return None

    return OpenAI(api_key=api_key)


def _extract_function_calls(response) -> list[Any]:
    output = getattr(response, "output", None) or []
    return [item for item in output if getattr(item, "type", None) == "function_call"]


def _run_openai_chat(message: str, client_slug: str) -> dict[str, Any]:
    client = _create_openai_client()
    if client is None:
        return _demo_reply(message, client_slug)

    model = os.getenv("OPENAI_MODEL", "gpt-5.4-mini")
    response = client.responses.create(
        model=model,
        input=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message},
        ],
        tools=[
            {
                "type": "function",
                "name": "search_products",
                "description": "Search MCT-Market products from MySQL using product name, category, sku, or description.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Customer search text or product keyword.",
                        },
                        "limit": {
                            "type": "integer",
                            "description": "Maximum number of products to return.",
                            "minimum": 1,
                            "maximum": 6,
                        },
                    },
                    "required": ["query"],
                    "additionalProperties": False,
                },
                "strict": True,
            }
        ],
    )

    function_calls = _extract_function_calls(response)
    if not function_calls:
        return {
            "reply": response.output_text,
            "products": [],
            "mode": "openai",
            "tools_used": [],
        }

    tool_outputs = []
    matched_products: list[dict[str, Any]] = []
    tools_used: list[str] = []

    for call in function_calls:
        if getattr(call, "name", "") != "search_products":
            continue

        arguments = json.loads(getattr(call, "arguments", "{}") or "{}")
        products = search_products(
            arguments.get("query", ""),
            client_slug=client_slug,
            limit=arguments.get("limit", 5),
        )
        matched_products = products
        tools_used.append("search_products")
        tool_outputs.append(
            {
                "type": "function_call_output",
                "call_id": call.call_id,
                "output": json.dumps({"products": products}, ensure_ascii=False),
            }
        )

    if not tool_outputs:
        return {
            "reply": response.output_text,
            "products": matched_products,
            "mode": "openai",
            "tools_used": tools_used,
        }

    final_response = client.responses.create(
        model=model,
        previous_response_id=response.id,
        input=tool_outputs,
    )
    return {
        "reply": final_response.output_text,
        "products": matched_products,
        "mode": "openai",
        "tools_used": tools_used,
    }


def chat_with_sales_ai(message: str, *, client_slug: str = "mct-market") -> dict[str, Any]:
    try:
        return _run_openai_chat(message, client_slug)
    except Exception as exc:
        fallback = _demo_reply(message, client_slug)
        fallback["warning"] = f"OpenAI unavailable, using demo mode: {exc}"
        return fallback
