from __future__ import annotations

import os
from contextlib import closing
from dataclasses import dataclass
from decimal import Decimal
from typing import Any

import mysql.connector
from mysql.connector.connection import MySQLConnection


@dataclass(frozen=True)
class DatabaseSettings:
    host: str
    port: int
    user: str
    password: str
    database: str


SCHEMA_STATEMENTS = [
    """
    CREATE TABLE IF NOT EXISTS site_profile (
        id TINYINT PRIMARY KEY,
        brand_name VARCHAR(255) NOT NULL,
        headline VARCHAR(255) NOT NULL,
        subheadline TEXT NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    """,
    """
    CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        highlight VARCHAR(255) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    """,
    """
    CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        system_url VARCHAR(500) NOT NULL,
        status ENUM('online', 'maintenance', 'coming-soon') NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(50) NOT NULL,
        accent_color VARCHAR(20) NOT NULL DEFAULT '#1F7A8C',
        sort_order INT NOT NULL DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    """,
    """
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        client_slug VARCHAR(255) NOT NULL,
        sku VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(120) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'THB',
        stock_quantity INT NOT NULL DEFAULT 0,
        unit VARCHAR(50) NOT NULL DEFAULT 'unit',
        is_featured BOOLEAN NOT NULL DEFAULT FALSE,
        sort_order INT NOT NULL DEFAULT 0,
        INDEX idx_products_client_slug (client_slug),
        INDEX idx_products_category (category),
        INDEX idx_products_name (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    """,
]

LEGACY_CLIENT_SLUG = "rung-ruang-machine"
LEGACY_SECOND_CLIENT_SLUG = "siam-logistics"
LEGACY_PROFILE_EMAIL = "hello@goeunserverhub.local"
INTERMEDIATE_PROFILE_EMAIL = "Goeunserverhub@gmail.com"
UPDATED_PROFILE_EMAIL = "goeunserverhub@gmail.com"
UPDATED_CLIENT = {
    "name": "M-Factory",
    "slug": "m-factory",
    "description": "ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว",
    "system_url": "https://m-factoryandresort.com/",
    "status": "online",
    "contact_email": "m.factoryandresort@gmail.com",
    "contact_phone": "+66 095-241-1833",
    "accent_color": "#1F7A8C",
    "sort_order": 1,
}
UPDATED_SECOND_CLIENT = {
    "name": "MCT-Market",
    "slug": "mct-market",
    "description": "จำหน่ายอุปกรณ์การเกษตร ด้วยประสบการณ์ยาวนานมากกว่า 50 ปี พร้อมพัฒนาแพลตฟอร์มการตลาดที่ใช้ AI ตอบลูกค้า เสนอขายสินค้า และรับชำระเงินแทน",
    "system_url": "https://portal.example.com/mct-market",
    "status": "online",
    "contact_email": "sale@m-group.in.th",
    "contact_phone": "089-4871144",
    "contact_fax": "034-878369, 034-848022",
    "accent_color": "#5F8A3A",
    "sort_order": 2,
}
THIRD_CLIENT = {
    "name": "Green Retail Group",
    "slug": "green-retail-group",
    "description": "ระบบขายหน้าร้านและสรุปยอดหลายสาขา พร้อมหน้ารายงานสำหรับผู้บริหาร",
    "system_url": "https://portal.example.com/green-retail-group",
    "status": "maintenance",
    "contact_email": "it@green-retail.example.com",
    "contact_phone": "02-555-1199",
    "accent_color": "#397367",
    "sort_order": 3,
}
PRODUCT_SEEDS = [
    {
        "client_slug": "mct-market",
        "sku": "MCT-FERT-001",
        "name": "ปุ๋ยอินทรีย์ GOEUN Grow 25KG",
        "category": "ปุ๋ยและดิน",
        "description": "ปุ๋ยอินทรีย์สำหรับพืชผักและผลไม้ ช่วยปรับปรุงดินและเร่งการแตกราก เหมาะกับเกษตรกรที่ต้องการผลผลิตสม่ำเสมอ",
        "price": 690.00,
        "currency": "THB",
        "stock_quantity": 120,
        "unit": "กระสอบ",
        "is_featured": True,
        "sort_order": 1,
    },
    {
        "client_slug": "mct-market",
        "sku": "MCT-SPRAY-020",
        "name": "เครื่องพ่นยาแบตเตอรี่ 20L",
        "category": "เครื่องมือเกษตร",
        "description": "ถังพ่นยาระบบแบตเตอรี่ 20 ลิตร แรงดันสม่ำเสมอ ใช้งานง่าย เหมาะกับสวนผลไม้และแปลงผักขนาดกลาง",
        "price": 2450.00,
        "currency": "THB",
        "stock_quantity": 35,
        "unit": "เครื่อง",
        "is_featured": True,
        "sort_order": 2,
    },
    {
        "client_slug": "mct-market",
        "sku": "MCT-SEED-011",
        "name": "เมล็ดพันธุ์ข้าวโพดหวาน Premium 1KG",
        "category": "เมล็ดพันธุ์",
        "description": "เมล็ดพันธุ์คัดคุณภาพ อัตราการงอกสูง ให้ฝักสวย เหมาะสำหรับเกษตรกรที่ต้องการผลผลิตเชิงพาณิชย์",
        "price": 320.00,
        "currency": "THB",
        "stock_quantity": 88,
        "unit": "แพ็ก",
        "is_featured": False,
        "sort_order": 3,
    },
    {
        "client_slug": "mct-market",
        "sku": "MCT-PUMP-002",
        "name": "ปั๊มน้ำเกษตร 2 นิ้ว High Flow",
        "category": "ระบบน้ำ",
        "description": "ปั๊มน้ำแรงดันสูงสำหรับส่งน้ำเข้าสวนและไร่ รองรับงานรดน้ำต่อเนื่องและการใช้งานภาคสนาม",
        "price": 5890.00,
        "currency": "THB",
        "stock_quantity": 14,
        "unit": "เครื่อง",
        "is_featured": True,
        "sort_order": 4,
    },
]


def get_database_settings() -> DatabaseSettings:
    return DatabaseSettings(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DATABASE", "goeun_server_hub"),
    )


def get_connection(*, include_database: bool = True) -> MySQLConnection:
    settings = get_database_settings()
    connection_config = {
        "host": settings.host,
        "port": settings.port,
        "user": settings.user,
        "password": settings.password,
        "charset": "utf8mb4",
        "use_unicode": True,
    }

    if include_database:
        connection_config["database"] = settings.database

    return mysql.connector.connect(**connection_config)


def initialize_database() -> None:
    settings = get_database_settings()
    ensure_database_exists(settings)

    with closing(get_connection()) as connection:
        with closing(connection.cursor()) as cursor:
            for statement in SCHEMA_STATEMENTS:
                cursor.execute(statement)
        seed_defaults(connection)
        migrate_legacy_site_profile(connection)
        migrate_legacy_default_clients(connection)
        ensure_clients_current(connection)
        connection.commit()


def ensure_database_exists(settings: DatabaseSettings) -> None:
    with closing(get_connection(include_database=False)) as connection:
        with closing(connection.cursor()) as cursor:
            cursor.execute(
                f"CREATE DATABASE IF NOT EXISTS `{settings.database}` "
                "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
        connection.commit()


def seed_defaults(connection: MySQLConnection) -> None:
    with closing(connection.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT COUNT(*) AS total FROM site_profile")
        profile_exists = cursor.fetchone()["total"]
        if not profile_exists:
            cursor.execute(
                """
                INSERT INTO site_profile (
                    id,
                    brand_name,
                    headline,
                    subheadline,
                    phone,
                    email,
                    address
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    1,
                    "GOEUN SERVER HUB",
                    "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
                    "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
                    "081-234-5678",
                    UPDATED_PROFILE_EMAIL,
                    "Bangkok, Thailand",
                ),
            )

        cursor.execute("SELECT COUNT(*) AS total FROM services")
        services_exist = cursor.fetchone()["total"]
        if not services_exist:
            cursor.executemany(
                """
                INSERT INTO services (title, description, highlight, sort_order)
                VALUES (%s, %s, %s, %s)
                """,
                [
                    (
                        "พัฒนาระบบเฉพาะธุรกิจ",
                        "ออกแบบระบบให้ตรงกับ workflow ของแต่ละบริษัท ทั้ง ERP, CRM, Stock, Dashboard และระบบภายในองค์กร",
                        "Custom Workflow",
                        1,
                    ),
                    (
                        "เชื่อมต่อฐานข้อมูลและรายงาน",
                        "จัดโครงสร้างฐานข้อมูล, เชื่อมข้อมูลข้ามระบบ, และสร้างรายงานที่ดูง่ายสำหรับผู้บริหารและทีมปฏิบัติการ",
                        "Database Ready",
                        2,
                    ),
                    (
                        "ดูแลเซิร์ฟเวอร์และสิทธิ์การใช้งาน",
                        "บริหารหน้าเข้าสู่ระบบลูกค้า, ดูสถานะระบบ, และอัปเดตช่องทางเข้าระบบจากศูนย์กลางเดียว",
                        "Central Access",
                        3,
                    ),
                ],
            )

        cursor.execute("SELECT COUNT(*) AS total FROM clients")
        clients_exist = cursor.fetchone()["total"]
        if not clients_exist:
            cursor.executemany(
                """
                INSERT INTO clients (
                    name,
                    slug,
                    description,
                    system_url,
                    status,
                    contact_email,
                    contact_phone,
                    accent_color,
                    sort_order
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                [
                    (
                        UPDATED_CLIENT["name"],
                        UPDATED_CLIENT["slug"],
                        UPDATED_CLIENT["description"],
                        UPDATED_CLIENT["system_url"],
                        UPDATED_CLIENT["status"],
                        UPDATED_CLIENT["contact_email"],
                        UPDATED_CLIENT["contact_phone"],
                        UPDATED_CLIENT["accent_color"],
                        UPDATED_CLIENT["sort_order"],
                    ),
                    (
                        UPDATED_SECOND_CLIENT["name"],
                        UPDATED_SECOND_CLIENT["slug"],
                        UPDATED_SECOND_CLIENT["description"],
                        UPDATED_SECOND_CLIENT["system_url"],
                        UPDATED_SECOND_CLIENT["status"],
                        UPDATED_SECOND_CLIENT["contact_email"],
                        UPDATED_SECOND_CLIENT["contact_phone"],
                        UPDATED_SECOND_CLIENT["accent_color"],
                        UPDATED_SECOND_CLIENT["sort_order"],
                    ),
                    (
                        "Green Retail Group",
                        "green-retail-group",
                        "ระบบขายหน้าร้านและสรุปยอดหลายสาขา พร้อมหน้ารายงานสำหรับผู้บริหาร",
                        "https://portal.example.com/green-retail-group",
                        "maintenance",
                        "it@green-retail.example.com",
                        "02-555-1199",
                        "#397367",
                        3,
                    ),
                    (
                        "Metro Clinic Care",
                        "metro-clinic-care",
                        "ระบบคิวคนไข้และจัดการเอกสารภายในสำหรับทีมต้อนรับและฝ่ายบริหารคลินิก",
                        "https://portal.example.com/metro-clinic-care",
                        "coming-soon",
                        "admin@metro-clinic.example.com",
                        "02-998-7766",
                        "#7C5CFC",
                        4,
                    ),
                ],
            )

        cursor.execute("SELECT COUNT(*) AS total FROM products")
        products_exist = cursor.fetchone()["total"]
        if not products_exist:
            cursor.executemany(
                """
                INSERT INTO products (
                    client_slug,
                    sku,
                    name,
                    category,
                    description,
                    price,
                    currency,
                    stock_quantity,
                    unit,
                    is_featured,
                    sort_order
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                [
                    (
                        product["client_slug"],
                        product["sku"],
                        product["name"],
                        product["category"],
                        product["description"],
                        product["price"],
                        product["currency"],
                        product["stock_quantity"],
                        product["unit"],
                        product["is_featured"],
                        product["sort_order"],
                    )
                    for product in PRODUCT_SEEDS
                ],
            )


def migrate_legacy_site_profile(connection: MySQLConnection) -> None:
    with closing(connection.cursor()) as cursor:
        cursor.execute(
            "UPDATE site_profile SET email = %s WHERE id = 1 AND email IN (%s, %s)",
            (UPDATED_PROFILE_EMAIL, LEGACY_PROFILE_EMAIL, INTERMEDIATE_PROFILE_EMAIL),
        )


def migrate_legacy_default_clients(connection: MySQLConnection) -> None:
    with closing(connection.cursor(dictionary=True)) as cursor:
        _migrate_client(cursor, legacy_slug=LEGACY_CLIENT_SLUG, updated_client=UPDATED_CLIENT)
        _migrate_client(cursor, legacy_slug=LEGACY_SECOND_CLIENT_SLUG, updated_client=UPDATED_SECOND_CLIENT)


def ensure_clients_current(connection: MySQLConnection) -> None:
    """Upsert the three primary clients so status/contact info is always current."""
    clients_to_upsert = [UPDATED_CLIENT, UPDATED_SECOND_CLIENT, THIRD_CLIENT]
    with closing(connection.cursor()) as cursor:
        cursor.executemany(
            """
            INSERT INTO clients (
                name, slug, description, system_url,
                status, contact_email, contact_phone,
                accent_color, sort_order
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                name          = VALUES(name),
                description   = VALUES(description),
                system_url    = VALUES(system_url),
                status        = VALUES(status),
                contact_email = VALUES(contact_email),
                contact_phone = VALUES(contact_phone),
                accent_color  = VALUES(accent_color),
                sort_order    = VALUES(sort_order)
            """,
            [
                (
                    c["name"], c["slug"], c["description"], c["system_url"],
                    c["status"], c["contact_email"], c["contact_phone"],
                    c["accent_color"], c["sort_order"],
                )
                for c in clients_to_upsert
            ],
        )


def _migrate_client(cursor, *, legacy_slug: str, updated_client: dict[str, Any]) -> None:
    cursor.execute("SELECT id FROM clients WHERE slug = %s", (legacy_slug,))
    legacy_client = cursor.fetchone()

    cursor.execute("SELECT id FROM clients WHERE slug = %s", (updated_client["slug"],))
    current_client = cursor.fetchone()

    if legacy_client and not current_client:
        cursor.execute(
            """
            UPDATE clients
            SET
                name = %s,
                slug = %s,
                description = %s,
                system_url = %s,
                status = %s,
                contact_email = %s,
                contact_phone = %s,
                accent_color = %s,
                sort_order = %s
            WHERE slug = %s
            """,
            (
                updated_client["name"],
                updated_client["slug"],
                updated_client["description"],
                updated_client["system_url"],
                updated_client["status"],
                updated_client["contact_email"],
                updated_client["contact_phone"],
                updated_client["accent_color"],
                updated_client["sort_order"],
                legacy_slug,
            ),
        )


def get_site_profile() -> dict[str, Any]:
    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute("SELECT * FROM site_profile WHERE id = %s", (1,))
            row = cursor.fetchone()
    return row or {}


def _normalize_row(row: dict[str, Any] | None) -> dict[str, Any] | None:
    if not row:
        return row

    normalized = dict(row)
    for key, value in normalized.items():
        if isinstance(value, Decimal):
            normalized[key] = float(value)
    return normalized


def _normalize_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [_normalize_row(row) for row in rows if row]


def list_services() -> list[dict[str, Any]]:
    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute("SELECT * FROM services ORDER BY sort_order ASC, id ASC")
            rows = cursor.fetchall()
    return _normalize_rows(rows)


def list_clients() -> list[dict[str, Any]]:
    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute("SELECT * FROM clients ORDER BY sort_order ASC, id ASC")
            rows = cursor.fetchall()
    return _normalize_rows(rows)


def list_products(*, client_slug: str | None = None, limit: int | None = None) -> list[dict[str, Any]]:
    sql = "SELECT * FROM products"
    params: list[Any] = []

    if client_slug:
        sql += " WHERE client_slug = %s"
        params.append(client_slug)

    sql += " ORDER BY is_featured DESC, sort_order ASC, id ASC"

    if limit:
        sql += " LIMIT %s"
        params.append(limit)

    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute(sql, tuple(params))
            rows = cursor.fetchall()
    return _normalize_rows(rows)


def search_products(query: str, *, client_slug: str | None = None, limit: int = 5) -> list[dict[str, Any]]:
    cleaned_query = query.strip()
    if not cleaned_query:
        return list_products(client_slug=client_slug, limit=limit)

    wildcard = f"%{cleaned_query}%"
    conditions = [
        "(sku LIKE %s OR name LIKE %s OR category LIKE %s OR description LIKE %s)",
    ]
    params: list[Any] = [wildcard, wildcard, wildcard, wildcard]

    if client_slug:
        conditions.insert(0, "client_slug = %s")
        params.insert(0, client_slug)

    sql = (
        "SELECT * FROM products WHERE "
        + " AND ".join(conditions)
        + " ORDER BY is_featured DESC, sort_order ASC, id ASC LIMIT %s"
    )
    params.append(limit)

    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute(sql, tuple(params))
            rows = cursor.fetchall()
    return _normalize_rows(rows)


def get_client_by_slug(slug: str) -> dict[str, Any] | None:
    with closing(get_connection()) as connection:
        with closing(connection.cursor(dictionary=True)) as cursor:
            cursor.execute("SELECT * FROM clients WHERE slug = %s", (slug,))
            row = cursor.fetchone()
    return _normalize_row(row)
