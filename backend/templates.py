from __future__ import annotations

from html import escape
from typing import Any


STATUS_LABELS = {
    "online": "พร้อมใช้งาน",
    "maintenance": "กำลังบำรุงรักษา",
    "coming-soon": "เตรียมเปิดใช้งาน",
}

SERVICE_TRANSLATION_KEYS = {
    "Custom Workflow": "custom_workflow",
    "Database Ready": "database_ready",
    "Central Access": "central_access",
}


def render_layout(
    *,
    title: str,
    body: str,
    profile: dict[str, Any],
    active_page: str,
    description: str,
) -> str:
    brand = escape(profile.get("brand_name", "SERVER HUB"))
    brand_email = escape(profile.get("email", ""))
    current_year = "2026"
    header_controls = f"""
      <div class="topbar-actions">
        {_render_language_switcher() if active_page == "home" else ""}
        <nav class="main-nav">
          <a class="{_nav_class(active_page, 'home')}" href="/">หน้าแรก</a>
          <a class="{_nav_class(active_page, 'clients')}" href="/clients">ลูกค้าของเรา</a>
        </nav>
      </div>
    """
    return f"""<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)} | {brand}</title>
  <meta name="description" content="{escape(description)}">
  <meta name="theme-color" content="#132321">
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
  <link rel="stylesheet" href="/static/styles.css">
  <script src="/static/app.js" defer></script>
</head>
<body data-page="{escape(active_page)}">
  <div class="page-shell">
    <header class="topbar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">
          <img class="brand-mark-image" src="/static/logo-mark.svg" alt="">
        </span>
        <span class="brand-copy">
          <span class="brand-overline">Private Client Infrastructure</span>
          <strong>{brand}</strong>
          <small class="brand-subtitle">Client Access & Service Showcase</small>
        </span>
      </a>
      {header_controls}
    </header>
    {body}
    <footer class="footer">
      <div class="footer-brand">
        <span class="footer-logo" aria-hidden="true">
          <img class="footer-logo-image" src="/static/logo-mark.svg" alt="">
        </span>
        <div>
          <strong>{brand}</strong>
          <p>{escape(profile.get('subheadline', ''))}</p>
        </div>
      </div>
      <div class="footer-contact">
        <span>{escape(profile.get('phone', ''))}</span>
        <span>{brand_email}</span>
        <span>{escape(profile.get('address', ''))}</span>
      </div>
      <div class="footer-meta">Copyright {current_year}</div>
    </footer>
  </div>
</body>
</html>
"""


def render_home(
    profile: dict[str, Any],
    services: list[dict[str, Any]],
    clients: list[dict[str, Any]],
) -> str:
    online_clients = sum(1 for client in clients if client["status"] == "online")
    service_cards = "".join(
        _render_service_card(service)
        for service in services
    )
    client_cards = render_client_cards(clients)
    live_rows = "".join(_render_live_access_row(client) for client in clients[:3])

    body = f"""
    <main>
      <section class="hero">
        <div class="hero-copy">
          <div class="hero-brandline">
            <span class="hero-seal" aria-hidden="true">
              <img class="hero-seal-image" src="/static/logo-mark.svg" alt="">
            </span>
            <div class="hero-brandcopy">
              <strong>{escape(profile['brand_name'])}</strong>
              <span>{escape(profile['email'])}</span>
            </div>
          </div>
          <div class="hero-heading-row">
          <p class="eyebrow" data-i18n="home.hero_eyebrow">SERVER LANDING PAGE</p>
            <span class="hero-note" data-i18n="home.hero_note">ดีไซน์, ทางเข้าระบบ และภาพลักษณ์ธุรกิจ จบในหน้าเดียว</span>
          </div>
          <h1 data-i18n="home.hero_title">{escape(profile['headline'])}</h1>
          <p class="lead" data-i18n="home.hero_subheadline">{escape(profile['subheadline'])}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#client-access" data-i18n="home.cta_login">เข้าสู่ระบบลูกค้า</a>
            <a class="button button-secondary" href="#services" data-i18n="home.cta_services">ดูบริการ</a>
          </div>
          <div class="hero-stats">
            <div>
              <strong>{len(clients)}</strong>
              <span data-i18n="home.stat_clients">พอร์ทัลลูกค้า</span>
            </div>
            <div>
              <strong>{len(services)}</strong>
              <span data-i18n="home.stat_services">กลุ่มบริการ</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span data-i18n="home.stat_ready">พร้อมต่อยอดได้</span>
            </div>
          </div>
          <div class="hero-watermark" aria-hidden="true">
            <img class="hero-watermark-image" src="/static/logo-mark.svg" alt="">
          </div>
        </div>
        <aside class="hero-panel">
          <div class="panel-heading">
            <span class="panel-kicker" data-i18n="home.panel_kicker">Central Access</span>
            <h2 data-i18n="home.panel_title">รวมทุกระบบลูกค้าไว้ในที่เดียว</h2>
            <p data-i18n="home.panel_text">ใช้หน้าเว็บนี้เป็นทั้งหน้าประชาสัมพันธ์บริษัท และจุดรวมลิงก์เข้าสู่ระบบของลูกค้าหลายรายจากฐานข้อมูลกลาง</p>
          </div>
          <div class="ops-metrics">
            <article class="ops-metric">
              <strong>{online_clients}</strong>
              <span data-i18n="home.ops_online">ออนไลน์ตอนนี้</span>
            </article>
            <article class="ops-metric">
              <strong>{len(clients)}</strong>
              <span data-i18n="home.ops_records">ลูกค้าในระบบ</span>
            </article>
          </div>
          <div class="ops-console">
            <div class="ops-console-head">
              <span data-i18n="home.live_board">กระดานสถานะล่าสุด</span>
              <span class="ops-dot" aria-hidden="true"></span>
            </div>
            {live_rows}
          </div>
          <ul class="panel-list">
            <li data-i18n="home.panel_item_1">อัปเดตรายชื่อลูกค้าได้จากฐานข้อมูล</li>
            <li data-i18n="home.panel_item_2">รองรับสถานะระบบ เช่น พร้อมใช้งานหรือปิดปรับปรุง</li>
            <li data-i18n="home.panel_item_3">ทำเป็นหน้าเริ่มต้นของเซิร์ฟเวอร์หรือโดเมนหลักได้ทันที</li>
          </ul>
        </aside>
      </section>

      <section class="section" id="services">
        <div class="section-heading">
          <p class="eyebrow" data-i18n="home.services_eyebrow">YOUR SERVICES</p>
          <h2 data-i18n="home.services_title">บริการที่เว็บนี้ช่วยสื่อสารแทนคุณ</h2>
          <p data-i18n="home.services_text">ออกแบบให้เป็นหน้าแรกที่ดูเป็นมืออาชีพ และยังเชื่อมไปยังระบบของลูกค้าได้โดยตรง</p>
        </div>
        <div class="service-grid">
          {service_cards}
        </div>
      </section>

      <section class="section section-access" id="client-access">
        <div class="section-heading">
          <p class="eyebrow" data-i18n="home.access_eyebrow">CLIENT ACCESS</p>
          <h2 data-i18n="home.access_title">เลือกบริษัทเพื่อเข้าสู่หน้าระบบ</h2>
          <p data-i18n="home.access_text">รายการด้านล่างดึงมาจากฐานข้อมูล สามารถเพิ่มลูกค้าใหม่ได้โดยไม่ต้องแก้หน้าเว็บทีละการ์ด</p>
        </div>
        <div class="access-toolbar">
          <label class="search-box" for="client-search">
            <span data-i18n="home.search_label">ค้นหาลูกค้า</span>
            <input id="client-search" type="search" placeholder="พิมพ์ชื่อบริษัทหรือคำอธิบายระบบ" data-i18n-placeholder="home.search_placeholder">
          </label>
          <div class="filter-group" aria-label="ตัวกรองสถานะ">
            <button class="filter-button is-active" type="button" data-filter="all" data-i18n="filter.all">ทั้งหมด</button>
            <button class="filter-button" type="button" data-filter="online" data-i18n="filter.online">พร้อมใช้งาน</button>
            <button class="filter-button" type="button" data-filter="maintenance" data-i18n="filter.maintenance">บำรุงรักษา</button>
            <button class="filter-button" type="button" data-filter="coming-soon" data-i18n="filter.coming_soon">เร็ว ๆ นี้</button>
          </div>
        </div>
        <div class="status-summary" id="status-summary"></div>
        <div class="client-grid" id="client-grid">
          {client_cards}
        </div>
      </section>
    </main>
    """

    return render_layout(
        title="หน้าแรก",
        body=body,
        profile=profile,
        active_page="home",
        description=profile["subheadline"],
    )


def render_clients_page(profile: dict[str, Any], clients: list[dict[str, Any]]) -> str:
    body = f"""
    <main>
      <section class="page-header">
        <p class="eyebrow">CLIENT DIRECTORY</p>
        <h1>สารบัญลูกค้าและทางเข้าระบบ</h1>
        <p>ใช้หน้านี้เป็นหน้าแยกสำหรับดูรายชื่อลูกค้าทั้งหมด หรือแนบลิงก์ส่งให้ทีมซัพพอร์ตใช้งานภายใน</p>
      </section>
      <section class="section section-access">
        <div class="access-toolbar">
          <label class="search-box" for="client-search">
            <span>ค้นหาลูกค้า</span>
            <input id="client-search" type="search" placeholder="ค้นหาชื่อบริษัท">
          </label>
          <div class="filter-group" aria-label="ตัวกรองสถานะ">
            <button class="filter-button is-active" type="button" data-filter="all">ทั้งหมด</button>
            <button class="filter-button" type="button" data-filter="online">พร้อมใช้งาน</button>
            <button class="filter-button" type="button" data-filter="maintenance">บำรุงรักษา</button>
            <button class="filter-button" type="button" data-filter="coming-soon">เร็ว ๆ นี้</button>
          </div>
        </div>
        <div class="status-summary" id="status-summary"></div>
        <div class="client-grid" id="client-grid">
          {render_client_cards(clients)}
        </div>
      </section>
    </main>
    """
    return render_layout(
        title="ลูกค้าของเรา",
        body=body,
        profile=profile,
        active_page="clients",
        description="รายชื่อลูกค้าทั้งหมดและลิงก์เข้าสู่ระบบ",
    )


def render_client_portal(profile: dict[str, Any], client: dict[str, Any]) -> str:
    status_key = client["status"]
    status_label = STATUS_LABELS.get(status_key, status_key)
    body = f"""
    <main>
      <section class="portal-hero">
        <a class="back-link" href="/clients">ย้อนกลับไปหน้ารายชื่อลูกค้า</a>
        <div class="portal-card" style="--client-accent: {escape(client['accent_color'])};">
          <span class="status-pill status-{escape(status_key)}">{escape(status_label)}</span>
          <h1>{escape(client['name'])}</h1>
          <p>{escape(client['description'])}</p>
          <div class="portal-meta">
            <span>อีเมล: {escape(client['contact_email'])}</span>
            <span>โทร: {escape(client['contact_phone'])}</span>
          </div>
          <div class="hero-actions">
            <a class="button button-primary" href="/go/{escape(client['slug'])}">เข้าสู่หน้าระบบ</a>
            <a class="button button-secondary" href="{escape(client['system_url'])}" target="_blank" rel="noopener noreferrer">เปิดลิงก์โดยตรง</a>
          </div>
        </div>
      </section>
    </main>
    """
    return render_layout(
        title=client["name"],
        body=body,
        profile=profile,
        active_page="clients",
        description=client["description"],
    )


def render_not_found(profile: dict[str, Any]) -> str:
    body = """
    <main>
      <section class="page-header not-found">
        <p class="eyebrow">404</p>
        <h1>ไม่พบหน้าที่คุณต้องการ</h1>
        <p>ลิงก์นี้อาจถูกเปลี่ยนหรือข้อมูลลูกค้าอาจยังไม่ถูกเพิ่มในระบบ</p>
        <a class="button button-primary" href="/">กลับหน้าแรก</a>
      </section>
    </main>
    """
    return render_layout(
        title="ไม่พบหน้า",
        body=body,
        profile=profile,
        active_page="home",
        description="ไม่พบหน้าที่ร้องขอ",
    )


def render_error_page(profile: dict[str, Any]) -> str:
    body = """
    <main>
      <section class="page-header not-found">
        <p class="eyebrow">500</p>
        <h1>ระบบขัดข้องชั่วคราว</h1>
        <p>กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบหากปัญหายังเกิดขึ้นต่อเนื่อง</p>
        <a class="button button-primary" href="/">กลับหน้าแรก</a>
      </section>
    </main>
    """
    return render_layout(
        title="ระบบขัดข้อง",
        body=body,
        profile=profile,
        active_page="home",
        description="ระบบขัดข้องชั่วคราว",
    )


def render_client_cards(clients: list[dict[str, Any]]) -> str:
    return "".join(_render_client_card(client) for client in clients)


def _render_client_card(client: dict[str, Any]) -> str:
    status_key = client["status"]
    status_label = STATUS_LABELS.get(status_key, status_key)
    return f"""
    <article class="client-card" data-status="{escape(status_key)}" data-search="{escape((client['name'] + ' ' + client['description']).lower())}" style="--client-accent: {escape(client['accent_color'])};">
      <div class="client-card-top">
        <span class="status-pill status-{escape(status_key)}" data-status-key="{escape(status_key)}">{escape(status_label)}</span>
        <span class="client-slug">{escape(client['slug'])}</span>
      </div>
      <h3>{escape(client['name'])}</h3>
      <p>{escape(client['description'])}</p>
      <div class="client-contact">
        <span>{escape(client['contact_email'])}</span>
        <span>{escape(client['contact_phone'])}</span>
      </div>
      <div class="client-actions">
        <a class="button button-primary" href="/portal/{escape(client['slug'])}" data-client-view-label>ดูทางเข้า</a>
        <a class="text-link" href="/go/{escape(client['slug'])}" data-client-enter-label>เข้าระบบทันที</a>
      </div>
    </article>
    """


def _nav_class(active_page: str, expected: str) -> str:
    return "is-active" if active_page == expected else ""


def _render_service_card(service: dict[str, Any]) -> str:
    service_key = _service_translation_key(service)
    key_attr = f' data-service-key="{escape(service_key)}"' if service_key else ""
    return f"""
        <article class="service-card"{key_attr}>
          <span class="service-highlight" data-service-highlight data-original-text="{escape(service['highlight'])}">{escape(service['highlight'])}</span>
          <h3 data-service-title data-original-text="{escape(service['title'])}">{escape(service['title'])}</h3>
          <p data-service-description data-original-text="{escape(service['description'])}">{escape(service['description'])}</p>
        </article>
        """


def _service_translation_key(service: dict[str, Any]) -> str | None:
    return SERVICE_TRANSLATION_KEYS.get(service["highlight"])


def _render_language_switcher() -> str:
    return """
        <div class="language-switcher" data-language-selector>
          <span class="language-label" data-i18n="home.language_label">ภาษา</span>
          <div class="language-options">
            <button class="language-button is-active" type="button" data-language="th">ไทย</button>
            <button class="language-button" type="button" data-language="en">English</button>
            <button class="language-button" type="button" data-language="zh">中文</button>
            <button class="language-button" type="button" data-language="ko">한국어</button>
          </div>
        </div>
    """


def _render_live_access_row(client: dict[str, Any]) -> str:
    status_key = client["status"]
    status_label = STATUS_LABELS.get(status_key, status_key)
    return f"""
        <div class="ops-row">
          <div class="ops-row-copy">
            <strong>{escape(client['name'])}</strong>
            <span>{escape(client['slug'])}</span>
          </div>
          <span class="ops-row-badge status-{escape(status_key)}" data-status-key="{escape(status_key)}">{escape(status_label)}</span>
        </div>
    """
