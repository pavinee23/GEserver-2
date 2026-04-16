const page = document.body.dataset.page;
const defaultLanguage = "th";
const languageStorageKey = "goeun-home-language";

const homeTranslations = {
  th: {
    strings: {
      "home.language_label": "ภาษา",
      "home.hero_eyebrow": "SERVER LANDING PAGE",
      "home.hero_note": "ดีไซน์, ทางเข้าระบบ และภาพลักษณ์ธุรกิจ จบในหน้าเดียว",
      "home.hero_title": "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
      "home.hero_subheadline": "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
      "home.cta_login": "เข้าสู่ระบบลูกค้า",
      "home.cta_services": "ดูบริการ",
      "home.stat_clients": "พอร์ทัลลูกค้า",
      "home.stat_services": "กลุ่มบริการ",
      "home.stat_ready": "พร้อมต่อยอดได้",
      "home.ops_online": "ออนไลน์ตอนนี้",
      "home.ops_records": "ลูกค้าในระบบ",
      "home.live_board": "กระดานสถานะล่าสุด",
      "home.panel_kicker": "Central Access",
      "home.panel_title": "รวมทุกระบบลูกค้าไว้ในที่เดียว",
      "home.panel_text": "ใช้หน้าเว็บนี้เป็นทั้งหน้าประชาสัมพันธ์บริษัท และจุดรวมลิงก์เข้าสู่ระบบของลูกค้าหลายรายจากฐานข้อมูลกลาง",
      "home.panel_item_1": "อัปเดตรายชื่อลูกค้าได้จากฐานข้อมูล",
      "home.panel_item_2": "รองรับสถานะระบบ เช่น พร้อมใช้งานหรือปิดปรับปรุง",
      "home.panel_item_3": "ทำเป็นหน้าเริ่มต้นของเซิร์ฟเวอร์หรือโดเมนหลักได้ทันที",
      "home.services_eyebrow": "YOUR SERVICES",
      "home.services_title": "บริการที่เว็บนี้ช่วยสื่อสารแทนคุณ",
      "home.services_text": "ออกแบบให้เป็นหน้าแรกที่ดูเป็นมืออาชีพ และยังเชื่อมไปยังระบบของลูกค้าได้โดยตรง",
      "home.access_eyebrow": "CLIENT ACCESS",
      "home.access_title": "เลือกบริษัทเพื่อเข้าสู่หน้าระบบ",
      "home.access_text": "รายการด้านล่างดึงมาจากฐานข้อมูล สามารถเพิ่มลูกค้าใหม่ได้โดยไม่ต้องแก้หน้าเว็บทีละการ์ด",
      "home.search_label": "ค้นหาลูกค้า",
      "home.search_placeholder": "พิมพ์ชื่อบริษัทหรือคำอธิบายระบบ",
      "filter.all": "ทั้งหมด",
      "filter.online": "พร้อมใช้งาน",
      "filter.maintenance": "บำรุงรักษา",
      "filter.coming_soon": "เร็ว ๆ นี้",
      "home.summary_total": "ทั้งหมด",
      "home.summary_online": "พร้อมใช้งาน",
      "home.summary_maintenance": "บำรุงรักษา",
      "home.summary_coming_soon": "เร็ว ๆ นี้",
      "home.empty_title": "ไม่พบลูกค้าที่ตรงกับคำค้นหา",
      "home.empty_text": "ลองล้างคำค้นหาหรือเปลี่ยนตัวกรองสถานะ แล้วระบบจะดึงรายการจากฐานข้อมูลมาแสดงใหม่ทันที",
      "home.client_view": "ดูทางเข้า",
      "home.client_enter": "เข้าระบบทันที",
      "home.fetch_error": "โหลดข้อมูลล่าสุดจาก API ไม่สำเร็จ",
    },
    statusLabels: {
      online: "พร้อมใช้งาน",
      maintenance: "บำรุงรักษา",
      "coming-soon": "เร็ว ๆ นี้",
    },
    serviceCards: {
      custom_workflow: {
        highlight: "เวิร์กโฟลว์เฉพาะทาง",
        title: "พัฒนาระบบเฉพาะธุรกิจ",
        description: "ออกแบบระบบให้ตรงกับขั้นตอนการทำงานของแต่ละบริษัท ทั้ง ERP, CRM, Stock, Dashboard และระบบภายในองค์กร",
      },
      database_ready: {
        highlight: "พร้อมเชื่อมฐานข้อมูล",
        title: "เชื่อมต่อฐานข้อมูลและรายงาน",
        description: "จัดโครงสร้างฐานข้อมูล เชื่อมข้อมูลข้ามระบบ และสร้างรายงานที่ดูง่ายสำหรับผู้บริหารและทีมปฏิบัติการ",
      },
      central_access: {
        highlight: "ศูนย์กลางการเข้าถึง",
        title: "ดูแลเซิร์ฟเวอร์และสิทธิ์การใช้งาน",
        description: "บริหารหน้าเข้าสู่ระบบลูกค้า ดูสถานะระบบ และอัปเดตช่องทางเข้าระบบจากศูนย์กลางเดียว",
      },
    },
  },
  en: {
    strings: {
      "home.language_label": "Language",
      "home.hero_eyebrow": "SERVER LANDING PAGE",
      "home.hero_note": "Design, access, and client experience in one polished front door",
      "home.hero_title": "Your hub for client systems and service showcase",
      "home.hero_subheadline": "Bring service promotion, contact channels, and access to multiple client systems together on one page.",
      "home.cta_login": "Client Login",
      "home.cta_services": "View Services",
      "home.stat_clients": "Client Portals",
      "home.stat_services": "Service Groups",
      "home.stat_ready": "Ready to Scale",
      "home.ops_online": "Online Now",
      "home.ops_records": "Client Records",
      "home.live_board": "Live Access Board",
      "home.panel_kicker": "Central Access",
      "home.panel_title": "Bring every client system into one place",
      "home.panel_text": "Use this page as both your company showcase and the central gateway to the systems you manage for multiple clients.",
      "home.panel_item_1": "Update client listings directly from the database",
      "home.panel_item_2": "Support system states such as online and maintenance",
      "home.panel_item_3": "Use it as the default page for your server or main domain",
      "home.services_eyebrow": "YOUR SERVICES",
      "home.services_title": "What this website helps you present",
      "home.services_text": "Designed to look professional as a landing page while still linking customers straight into their systems.",
      "home.access_eyebrow": "CLIENT ACCESS",
      "home.access_title": "Choose a company to enter its system",
      "home.access_text": "The list below is loaded from the database, so you can add new clients without rebuilding the page card by card.",
      "home.search_label": "Search Clients",
      "home.search_placeholder": "Search company name or system description",
      "filter.all": "All",
      "filter.online": "Online",
      "filter.maintenance": "Maintenance",
      "filter.coming_soon": "Coming Soon",
      "home.summary_total": "Total",
      "home.summary_online": "Online",
      "home.summary_maintenance": "Maintenance",
      "home.summary_coming_soon": "Coming Soon",
      "home.empty_title": "No clients matched your search",
      "home.empty_text": "Try clearing the search box or switching the status filter to see the database results again.",
      "home.client_view": "View Portal",
      "home.client_enter": "Enter Now",
      "home.fetch_error": "Failed to load the latest client data from the API",
    },
    statusLabels: {
      online: "Online",
      maintenance: "Maintenance",
      "coming-soon": "Coming Soon",
    },
    serviceCards: {
      custom_workflow: {
        highlight: "Custom Workflow",
        title: "Custom Business Systems",
        description: "Design systems that match each company's workflow, including ERP, CRM, stock control, dashboards, and internal tools.",
      },
      database_ready: {
        highlight: "Database Ready",
        title: "Database Integration and Reporting",
        description: "Structure databases, connect cross-system data, and build clear reports for executives and operations teams.",
      },
      central_access: {
        highlight: "Central Access",
        title: "Server and Access Management",
        description: "Manage client login pages, monitor system status, and update system entry points from one central hub.",
      },
    },
  },
  zh: {
    strings: {
      "home.language_label": "语言",
      "home.hero_eyebrow": "服务器门户首页",
      "home.hero_note": "设计、系统入口与品牌形象集中在同一页面",
      "home.hero_title": "您的客户系统与服务展示中心",
      "home.hero_subheadline": "把服务介绍、联系方式以及多个客户系统入口集中在同一个页面中。",
      "home.cta_login": "进入客户系统",
      "home.cta_services": "查看服务",
      "home.stat_clients": "客户门户",
      "home.stat_services": "服务模块",
      "home.stat_ready": "可持续扩展",
      "home.ops_online": "当前在线",
      "home.ops_records": "客户记录",
      "home.live_board": "实时访问看板",
      "home.panel_kicker": "统一入口",
      "home.panel_title": "把所有客户系统集中到一个地方",
      "home.panel_text": "这个页面既可以作为公司服务展示页，也可以作为多个客户系统的统一入口。",
      "home.panel_item_1": "可直接从数据库更新客户列表",
      "home.panel_item_2": "支持在线、维护中等系统状态显示",
      "home.panel_item_3": "可直接作为服务器或主域名首页使用",
      "home.services_eyebrow": "我们的服务",
      "home.services_title": "这个网站可以帮您展示什么",
      "home.services_text": "既是一张专业的品牌首页，也能直接连接客户自己的系统。",
      "home.access_eyebrow": "客户入口",
      "home.access_title": "选择公司进入对应系统",
      "home.access_text": "下方列表来自数据库，新增客户时无需逐张修改页面卡片。",
      "home.search_label": "搜索客户",
      "home.search_placeholder": "输入公司名称或系统说明",
      "filter.all": "全部",
      "filter.online": "在线",
      "filter.maintenance": "维护中",
      "filter.coming_soon": "即将上线",
      "home.summary_total": "全部",
      "home.summary_online": "在线",
      "home.summary_maintenance": "维护中",
      "home.summary_coming_soon": "即将上线",
      "home.empty_title": "没有找到符合条件的客户",
      "home.empty_text": "请尝试清空搜索条件或切换状态筛选，重新查看数据库中的结果。",
      "home.client_view": "查看入口",
      "home.client_enter": "立即进入",
      "home.fetch_error": "无法从 API 加载最新客户数据",
    },
    statusLabels: {
      online: "在线",
      maintenance: "维护中",
      "coming-soon": "即将上线",
    },
    serviceCards: {
      custom_workflow: {
        highlight: "定制流程",
        title: "定制业务系统开发",
        description: "根据每家公司的工作流程设计系统，包括 ERP、CRM、库存、仪表板和内部管理工具。",
      },
      database_ready: {
        highlight: "数据库就绪",
        title: "数据库整合与报表",
        description: "规划数据库结构，连接跨系统数据，并为管理层和运营团队生成清晰报表。",
      },
      central_access: {
        highlight: "统一入口",
        title: "服务器与权限管理",
        description: "集中管理客户登录页面、系统状态和各个系统入口链接。",
      },
    },
  },
  ko: {
    strings: {
      "home.language_label": "언어",
      "home.hero_eyebrow": "서버 랜딩 페이지",
      "home.hero_note": "디자인, 접속, 고객 경험을 한 화면에 담았습니다",
      "home.hero_title": "고객 시스템과 서비스 홍보를 위한 통합 허브",
      "home.hero_subheadline": "서비스 소개, 연락처, 여러 고객 시스템의 진입점을 한 페이지에 모아 보여줍니다.",
      "home.cta_login": "고객 시스템 입장",
      "home.cta_services": "서비스 보기",
      "home.stat_clients": "고객 포털",
      "home.stat_services": "서비스 영역",
      "home.stat_ready": "확장 준비 완료",
      "home.ops_online": "현재 운영",
      "home.ops_records": "고객 레코드",
      "home.live_board": "실시간 접속 보드",
      "home.panel_kicker": "통합 접근",
      "home.panel_title": "모든 고객 시스템을 한곳에서 관리하세요",
      "home.panel_text": "이 페이지를 회사 소개용 랜딩 페이지이자 여러 고객 시스템으로 연결되는 중앙 게이트웨이로 사용할 수 있습니다.",
      "home.panel_item_1": "데이터베이스에서 고객 목록을 바로 업데이트",
      "home.panel_item_2": "운영 중, 점검 중 같은 시스템 상태를 표시",
      "home.panel_item_3": "서버 또는 메인 도메인의 기본 페이지로 바로 사용 가능",
      "home.services_eyebrow": "서비스 소개",
      "home.services_title": "이 웹사이트가 대신 전해주는 서비스",
      "home.services_text": "전문적인 랜딩 페이지이면서 동시에 고객 시스템으로 바로 연결되는 구조입니다.",
      "home.access_eyebrow": "고객 접속",
      "home.access_title": "회사를 선택해 해당 시스템으로 이동하세요",
      "home.access_text": "아래 목록은 데이터베이스에서 불러오므로 새 고객을 추가해도 카드를 일일이 수정할 필요가 없습니다.",
      "home.search_label": "고객 검색",
      "home.search_placeholder": "회사명 또는 시스템 설명 검색",
      "filter.all": "전체",
      "filter.online": "운영 중",
      "filter.maintenance": "점검 중",
      "filter.coming_soon": "오픈 예정",
      "home.summary_total": "전체",
      "home.summary_online": "운영 중",
      "home.summary_maintenance": "점검 중",
      "home.summary_coming_soon": "오픈 예정",
      "home.empty_title": "검색 조건에 맞는 고객이 없습니다",
      "home.empty_text": "검색어를 지우거나 상태 필터를 바꾸면 데이터베이스 결과를 다시 볼 수 있습니다.",
      "home.client_view": "포털 보기",
      "home.client_enter": "바로 입장",
      "home.fetch_error": "API에서 최신 고객 데이터를 불러오지 못했습니다",
    },
    statusLabels: {
      online: "운영 중",
      maintenance: "점검 중",
      "coming-soon": "오픈 예정",
    },
    serviceCards: {
      custom_workflow: {
        highlight: "맞춤 워크플로",
        title: "맞춤형 비즈니스 시스템",
        description: "ERP, CRM, 재고, 대시보드, 사내 시스템까지 각 회사의 업무 흐름에 맞게 설계합니다.",
      },
      database_ready: {
        highlight: "데이터베이스 준비",
        title: "데이터베이스 연동과 리포트",
        description: "데이터베이스 구조를 설계하고 시스템 간 데이터를 연결하며 경영진과 운영팀을 위한 보고서를 제공합니다.",
      },
      central_access: {
        highlight: "통합 접근",
        title: "서버 및 접근 권한 관리",
        description: "고객 로그인 페이지, 시스템 상태, 각 시스템의 진입 링크를 한곳에서 관리합니다.",
      },
    },
  },
};

const searchInput = document.querySelector("#client-search");
const grid = document.querySelector("#client-grid");
const summary = document.querySelector("#status-summary");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const languageButtons = Array.from(document.querySelectorAll("[data-language]"));

let clients = [];
let activeFilter = "all";
let currentLanguage = defaultLanguage;

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getBundle = (language) => homeTranslations[language] || homeTranslations[defaultLanguage];

const getString = (language, key) => {
  const bundle = getBundle(language);
  return bundle.strings[key] || homeTranslations[defaultLanguage].strings[key] || key;
};

const getServiceCardCopy = (language, serviceKey) => {
  const bundle = getBundle(language);
  return bundle.serviceCards[serviceKey] || homeTranslations[defaultLanguage].serviceCards[serviceKey] || null;
};

const readStoredLanguage = () => {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
};

const persistLanguage = (language) => {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // Ignore storage errors and keep the current session language only.
  }
};

const renderSummary = () => {
  if (!summary) {
    return;
  }

  const counts = clients.reduce(
    (accumulator, client) => {
      accumulator.total += 1;
      accumulator[client.status] += 1;
      return accumulator;
    },
    { total: 0, online: 0, maintenance: 0, "coming-soon": 0 }
  );

  summary.innerHTML = `
    <span class="summary-chip">${escapeHtml(getString(currentLanguage, "home.summary_total"))} ${counts.total}</span>
    <span class="summary-chip">${escapeHtml(getString(currentLanguage, "home.summary_online"))} ${counts.online}</span>
    <span class="summary-chip">${escapeHtml(getString(currentLanguage, "home.summary_maintenance"))} ${counts.maintenance}</span>
    <span class="summary-chip">${escapeHtml(getString(currentLanguage, "home.summary_coming_soon"))} ${counts["coming-soon"]}</span>
  `;
};

const renderClients = () => {
  if (!grid) {
    return;
  }

  const query = (searchInput?.value || "").trim().toLowerCase();
  const visibleClients = clients.filter((client) => {
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    const searchTarget = `${client.name} ${client.description}`.toLowerCase();
    const matchesQuery = !query || searchTarget.includes(query);
    return matchesFilter && matchesQuery;
  });

  if (!visibleClients.length) {
    grid.innerHTML = `
      <article class="empty-state">
        <h3>${escapeHtml(getString(currentLanguage, "home.empty_title"))}</h3>
        <p>${escapeHtml(getString(currentLanguage, "home.empty_text"))}</p>
      </article>
    `;
    return;
  }

  const statusLabels = getBundle(currentLanguage).statusLabels;
  grid.innerHTML = visibleClients
    .map(
      (client) => `
        <article class="client-card" data-status="${escapeHtml(client.status)}" style="--client-accent: ${escapeHtml(
          client.accent_color
        )};">
          <div class="client-card-top">
            <span class="status-pill status-${escapeHtml(client.status)}" data-status-key="${escapeHtml(client.status)}">${
              statusLabels[client.status] || client.status
            }</span>
            <span class="client-slug">${escapeHtml(client.slug)}</span>
          </div>
          <h3>${escapeHtml(client.name)}</h3>
          <p>${escapeHtml(client.description)}</p>
          <div class="client-contact">
            <span>${escapeHtml(client.contact_email)}</span>
            <span>${escapeHtml(client.contact_phone)}</span>
          </div>
          <div class="client-actions">
            <a class="button button-primary" href="/portal/${escapeHtml(client.slug)}" data-client-view-label>${escapeHtml(
              getString(currentLanguage, "home.client_view")
            )}</a>
            <a class="text-link" href="/go/${escapeHtml(client.slug)}" data-client-enter-label>${escapeHtml(
              getString(currentLanguage, "home.client_enter")
            )}</a>
          </div>
        </article>
      `
    )
    .join("");
};

const syncActiveFilter = (button) => {
  filterButtons.forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
};

const translateStaticElements = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = getString(currentLanguage, key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", getString(currentLanguage, key));
  });
};

const translateServiceCards = () => {
  document.querySelectorAll("[data-service-key]").forEach((card) => {
    const serviceCopy = getServiceCardCopy(currentLanguage, card.dataset.serviceKey);
    const highlightElement = card.querySelector("[data-service-highlight]");
    const titleElement = card.querySelector("[data-service-title]");
    const descriptionElement = card.querySelector("[data-service-description]");

    if (!serviceCopy) {
      if (highlightElement) {
        highlightElement.textContent = highlightElement.dataset.originalText || highlightElement.textContent;
      }
      if (titleElement) {
        titleElement.textContent = titleElement.dataset.originalText || titleElement.textContent;
      }
      if (descriptionElement) {
        descriptionElement.textContent = descriptionElement.dataset.originalText || descriptionElement.textContent;
      }
      return;
    }

    if (highlightElement) {
      highlightElement.textContent = serviceCopy.highlight;
    }
    if (titleElement) {
      titleElement.textContent = serviceCopy.title;
    }
    if (descriptionElement) {
      descriptionElement.textContent = serviceCopy.description;
    }
  });
};

const translateServerRenderedClientCards = () => {
  const statusLabels = getBundle(currentLanguage).statusLabels;

  document.querySelectorAll("[data-status-key]").forEach((element) => {
    const statusKey = element.dataset.statusKey;
    element.textContent = statusLabels[statusKey] || statusKey;
  });

  document.querySelectorAll("[data-client-view-label]").forEach((element) => {
    element.textContent = getString(currentLanguage, "home.client_view");
  });

  document.querySelectorAll("[data-client-enter-label]").forEach((element) => {
    element.textContent = getString(currentLanguage, "home.client_enter");
  });
};

const applyHomeLanguage = (language) => {
  currentLanguage = homeTranslations[language] ? language : defaultLanguage;
  document.documentElement.lang = currentLanguage;
  persistLanguage(currentLanguage);

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === currentLanguage);
  });

  translateStaticElements();
  translateServiceCards();
  translateServerRenderedClientCards();

  if (clients.length) {
    renderSummary();
    renderClients();
  }
};

if (page === "home" || page === "clients") {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      syncActiveFilter(button);
      renderClients();
    });
  });

  searchInput?.addEventListener("input", () => {
    renderClients();
  });

  if (page === "home" && languageButtons.length) {
    const storedLanguage = readStoredLanguage();
    applyHomeLanguage(storedLanguage || defaultLanguage);

    languageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        applyHomeLanguage(button.dataset.language || defaultLanguage);
      });
    });
  }

  fetch("/api/clients")
    .then((response) => response.json())
    .then((payload) => {
      clients = payload.clients || [];
      renderSummary();
      renderClients();
    })
    .catch(() => {
      if (summary) {
        summary.innerHTML = `<span class="summary-chip">${escapeHtml(
          getString(currentLanguage, "home.fetch_error")
        )}</span>`;
      }
    });
}
