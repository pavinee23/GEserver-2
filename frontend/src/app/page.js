"use client";

import { useDeferredValue, useEffect, useState } from "react";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
const languageStorageKey = "goeun-agency-language";

const fallbackProfile = {
  brand_name: "GOEUN SERVER HUB",
  headline: "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
  subheadline:
    "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
  phone: "081-234-5678",
  email: "goeunserverhub@gmail.com",
  address: "Bangkok, Thailand",
};

const fallbackServices = [
  {
    id: 1,
    title: "พัฒนาระบบเฉพาะธุรกิจ",
    description:
      "ออกแบบระบบให้ตรงกับ workflow ของแต่ละบริษัท ทั้ง ERP, CRM, Stock, Dashboard และระบบภายในองค์กร",
    highlight: "Custom Workflow",
  },
  {
    id: 2,
    title: "เชื่อมต่อฐานข้อมูลและรายงาน",
    description:
      "จัดโครงสร้างฐานข้อมูล, เชื่อมข้อมูลข้ามระบบ, และสร้างรายงานที่ดูง่ายสำหรับผู้บริหารและทีมปฏิบัติการ",
    highlight: "Database Ready",
  },
  {
    id: 3,
    title: "ดูแลเซิร์ฟเวอร์และสิทธิ์การใช้งาน",
    description:
      "บริหารหน้าเข้าสู่ระบบลูกค้า, ดูสถานะระบบ, และอัปเดตช่องทางเข้าระบบจากศูนย์กลางเดียว",
    highlight: "Central Access",
  },
];

const fallbackClients = [
  {
    id: 1,
    name: "M-Factory",
    slug: "m-factory",
    description: "ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว",
    status: "online",
    contact_email: "ops@rung-ruang.example.com",
    contact_phone: "02-111-2233",
    system_url: "https://portal.example.com/m-factory",
  },
  {
    id: 2,
    name: "MCT-Market",
    slug: "mct-market",
    description:
      "จำหน่ายอุปกรณ์การเกษตร ด้วยประสบการณ์ยาวนานมากกว่า 50 ปี พร้อมพัฒนาแพลตฟอร์มการตลาดที่ใช้ AI ตอบลูกค้า เสนอขายสินค้า และรับชำระเงินแทน",
    status: "online",
    contact_email: "sales@mct-market.example.com",
    contact_phone: "02-444-8822",
    system_url: "https://portal.example.com/mct-market",
  },
  {
    id: 3,
    name: "Green Retail Group",
    slug: "green-retail-group",
    description: "ระบบขายหน้าร้านและสรุปยอดหลายสาขา พร้อมหน้ารายงานสำหรับผู้บริหาร",
    status: "maintenance",
    contact_email: "it@green-retail.example.com",
    contact_phone: "02-555-1199",
    system_url: "https://portal.example.com/green-retail-group",
  },
];

const filterOptions = [
  { key: "all", label: "ทั้งหมด" },
  { key: "online", label: "พร้อมใช้งาน" },
  { key: "maintenance", label: "บำรุงรักษา" },
  { key: "coming-soon", label: "เร็ว ๆ นี้" },
];

const languageOptions = [
  { key: "th", label: "ไทย" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
  { key: "ko", label: "KO" },
];

const translations = {
  th: {
    brandKicker: "Agency-Inspired Client Hub",
    brandSubtitle: "Service Showcase and Multi-Client Access",
    navServices: "บริการ",
    navPortals: "พอร์ทัลลูกค้า",
    navJourney: "เส้นทางงาน",
    navContact: "ติดต่อ",
    heroKicker: "GOEUN DIGITAL INFRASTRUCTURE",
    heroWelcome: "ยินดีต้อนรับสู่ศูนย์กลางระบบลูกค้าของคุณ",
    heroTitle: "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
    heroSubtitle:
      "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
    heroPrimaryButton: "เปิดพอร์ทัลลูกค้า",
    heroSecondaryButton: "ดู workflow การพัฒนา",
    statPortals: "พอร์ทัลลูกค้า",
    statLive: "ระบบออนไลน์",
    statServices: "โมดูลบริการ",
    quickLinks: [
      "หน้าบริการ",
      "พอร์ทัลลูกค้า",
      "เส้นทางงาน",
      "ติดต่อเรา",
      "รายชื่อลูกค้า",
      "หน้าเซิร์ฟเวอร์",
    ],
    panelKicker: "ศูนย์ควบคุม",
    panelTitle: "สไตล์แบบ Agency แต่ใช้งานจริงกับ backend เดิม",
    panelCopy:
      "หน้าใหม่นี้หยิบจังหวะของ StartBootstrap Agency มาใช้ ทั้ง masthead, section rhythm, portfolio feel และ timeline แต่ยกระดับให้ดูเรียบหรูขึ้นและเหมาะกับงานระบบลูกค้าจริง",
    primaryContact: "ช่องทางติดต่อหลัก",
    portalAvailability: "สถานะพอร์ทัล",
    maintenance: "บำรุงรักษา",
    comingSoon: "กำลังจะเปิด",
    syncing: "กำลังซิงก์",
    liveSync: "เชื่อมต่อสด",
    servicesKicker: "บริการ",
    servicesTitle: "บริการในโทน Agency ที่ชัดขึ้นและดูพรีเมียมกว่าเดิม",
    servicesSubtitle:
      "โครง section นี้อิงจังหวะของ StartBootstrap Agency แต่ถูกปรับให้เหมาะกับบริษัทที่พัฒนาระบบจริง มีฐานข้อมูลจริง และต้องพาลูกค้าเข้าสู่พอร์ทัลหลายระบบจากหน้าเดียว",
    serviceMap: {
      "Custom Workflow": {
        highlight: "เวิร์กโฟลว์เฉพาะทาง",
        title: "พัฒนาระบบเฉพาะธุรกิจ",
        description:
          "ออกแบบระบบให้ตรงกับ workflow ของแต่ละบริษัท ทั้ง ERP, CRM, Stock, Dashboard และระบบภายในองค์กร",
      },
      "Database Ready": {
        highlight: "พร้อมเชื่อมฐานข้อมูล",
        title: "เชื่อมต่อฐานข้อมูลและรายงาน",
        description:
          "จัดโครงสร้างฐานข้อมูล, เชื่อมข้อมูลข้ามระบบ, และสร้างรายงานที่ดูง่ายสำหรับผู้บริหารและทีมปฏิบัติการ",
      },
      "Central Access": {
        highlight: "ศูนย์กลางการเข้าถึง",
        title: "ดูแลเซิร์ฟเวอร์และสิทธิ์การใช้งาน",
        description:
          "บริหารหน้าเข้าสู่ระบบลูกค้า, ดูสถานะระบบ, และอัปเดตช่องทางเข้าระบบจากศูนย์กลางเดียว",
      },
    },
    showcaseKicker: "พอร์ทัลลูกค้า",
    showcaseTitle: "ใช้ portfolio feeling แบบ Agency แต่แสดงพอร์ทัลลูกค้าจริง",
    showcaseSubtitle:
      "ส่วนนี้แทนพอร์ตโฟลิโอเดิมของ Agency theme ด้วยรายชื่อระบบลูกค้าจากฐานข้อมูล คุณจึงได้ทั้งความรู้สึกของธีมต้นฉบับและความสามารถใช้งานจริงในระบบเดียว",
    searchLabel: "ค้นหาลูกค้า",
    searchPlaceholder: "พิมพ์ชื่อบริษัท, slug หรือคำอธิบายระบบ",
    filterAll: "ทั้งหมด",
    filterOnline: "พร้อมใช้งาน",
    filterMaintenance: "บำรุงรักษา",
    filterComingSoon: "เร็ว ๆ นี้",
    viewPortal: "ดูทางเข้า",
    enterSystem: "เข้าระบบทันที",
    emptyTitle: "ไม่พบลูกค้าที่ตรงกับคำค้นหา",
    emptyText: "ลองล้างคำค้นหาหรือสลับตัวกรองสถานะ แล้วรายการจากฐานข้อมูลจะถูกแสดงใหม่ทันที",
    journeyKicker: "เส้นทางงาน",
    journeyTitle: "Timeline แบบ Agency ที่เล่าเรื่องการทำระบบของคุณแทน",
    journeySubtitle:
      "ผมเปลี่ยน section About เดิมของธีมให้กลายเป็นเส้นทางการพัฒนาระบบ ตั้งแต่วิเคราะห์งาน วางฐานข้อมูล เปิดใช้จริง ไปจนถึงดูแลหลังบ้านในระยะยาว",
    journeySteps: [
      {
        phase: "01",
        kicker: "สำรวจงาน",
        title: "อ่าน workflow ของธุรกิจจริงก่อนเขียนระบบ",
        description:
          "เริ่มจากงานจริงของลูกค้า ตั้งแต่ฝ่ายขาย ฝ่ายผลิต ไปจนถึงผู้บริหาร เพื่อให้สิ่งที่พัฒนาขึ้นตอบโจทย์ทีมใช้งานได้จริง ไม่ใช่แค่สวยในเดโม",
      },
      {
        phase: "02",
        kicker: "ออกแบบระบบ",
        title: "วางฐานข้อมูลและสิทธิ์ใช้งานให้รองรับการเติบโต",
        description:
          "ออกแบบ schema, รายงาน, สิทธิ์การเข้าถึง และ flow ข้อมูลข้ามระบบให้พร้อมขยายต่อ ทั้งฝั่ง operation และ dashboard สำหรับเจ้าของกิจการ",
      },
      {
        phase: "03",
        kicker: "เปิดใช้งาน",
        title: "เปิดพอร์ทัลลูกค้าและระบบหลังบ้านบนโครงเดียวกัน",
        description:
          "เชื่อมหน้าโปรโมตบริการกับ portal ของแต่ละลูกค้าไว้ใน landing เดียว ลดความกระจัดกระจาย และทำให้การเข้าถึงระบบดูเป็นแบรนด์เดียวกันทั้งหมด",
      },
      {
        phase: "04",
        kicker: "ดูแลต่อเนื่อง",
        title: "ดูแลต่อเนื่อง พร้อมอัปเดตสถานะและช่องทางเข้าใช้งาน",
        description:
          "เมื่อลูกค้าเพิ่มขึ้นหรือระบบเปลี่ยน หน้า hub นี้ยังอัปเดตจาก backend ได้ทันที ทำให้ทีม support และลูกค้าเข้าถึงทุกระบบได้จากจุดเดียว",
      },
    ],
    contactKicker: "ติดต่อ",
    contactTitle: "พร้อมใช้เป็นหน้าแรกของเซิร์ฟเวอร์ หรือพัฒนาเป็น client hub เต็มรูปแบบต่อได้",
    contactText:
      "ตอนนี้หน้า frontend ใหม่ได้ visual direction แบบ Agency ที่ดูโตขึ้นแล้ว และยังเชื่อมข้อมูล profile, services และ clients จาก backend เดิมได้ต่อเนื่อง",
    emailLabel: "อีเมล",
    phoneLabel: "โทรศัพท์",
    addressLabel: "ที่อยู่",
    sendEmail: "ส่งอีเมล",
    openDirectory: "เปิด directory เดิม",
    footerSubtitle: "ลิขสิทธิ์ © 2026 GOEUN SERVER HUB",
    footerFrontend: "สงวนลิขสิทธิ์",
    footerBackend: "GOEUN SERVER HUB",
    loadError: "โหลดข้อมูลจาก Python backend ไม่สำเร็จ จึงแสดงข้อมูลตัวอย่างแทนชั่วคราว",
    statusLabels: {
      online: "พร้อมใช้งาน",
      maintenance: "กำลังบำรุงรักษา",
      "coming-soon": "เตรียมเปิดใช้งาน",
    },
  },
  en: {
    brandKicker: "Agency-Inspired Client Hub",
    brandSubtitle: "Service Showcase and Multi-Client Access",
    navServices: "Services",
    navPortals: "Client Portals",
    navJourney: "Journey",
    navContact: "Contact",
    heroKicker: "GOEUN DIGITAL INFRASTRUCTURE",
    heroWelcome: "Welcome to your client access agency",
    heroTitle: "Your hub for client systems and service showcase",
    heroSubtitle:
      "Bring service promotion, contact channels, and access to multiple client systems together on one page.",
    heroPrimaryButton: "Open Client Portals",
    heroSecondaryButton: "View Development Workflow",
    statPortals: "Client Portals",
    statLive: "Live Systems",
    statServices: "Service Modules",
    quickLinks: [
      "Services",
      "Client Portals",
      "Journey",
      "Contact",
      "Client Directory",
      "Server Home",
    ],
    panelKicker: "Command Center",
    panelTitle: "Agency style, rebuilt for a real backend",
    panelCopy:
      "This new page borrows the rhythm of StartBootstrap Agency, including the masthead, section pacing, portfolio feeling, and timeline, but refines it into a more premium interface for real client systems.",
    primaryContact: "Primary Contact",
    portalAvailability: "Portal Availability",
    maintenance: "Maintenance",
    comingSoon: "Coming Soon",
    syncing: "Syncing",
    liveSync: "Live Sync",
    servicesKicker: "Services",
    servicesTitle: "Agency-inspired service blocks with a more premium finish",
    servicesSubtitle:
      "This section keeps the cadence of the Agency template but adapts it for a real system-development company with a real database and multiple client portals.",
    serviceMap: {
      "Custom Workflow": {
        highlight: "Custom Workflow",
        title: "Custom Business Systems",
        description:
          "Design systems around each company's real workflow, including ERP, CRM, stock, dashboards, and internal tools.",
      },
      "Database Ready": {
        highlight: "Database Ready",
        title: "Database Integration and Reporting",
        description:
          "Structure databases, connect cross-system data, and produce clear reports for leadership and operations teams.",
      },
      "Central Access": {
        highlight: "Central Access",
        title: "Server and Access Management",
        description:
          "Manage client login pages, monitor system status, and update entry points from one central hub.",
      },
    },
    showcaseKicker: "Client Portals",
    showcaseTitle: "Agency portfolio energy, rebuilt as real client portal cards",
    showcaseSubtitle:
      "This replaces the original Agency portfolio grid with live client systems from the database, keeping the visual mood while turning it into a usable gateway.",
    searchLabel: "Search Clients",
    searchPlaceholder: "Type a company name, slug, or system description",
    filterAll: "All",
    filterOnline: "Online",
    filterMaintenance: "Maintenance",
    filterComingSoon: "Coming Soon",
    viewPortal: "View Portal",
    enterSystem: "Enter System",
    emptyTitle: "No clients matched your search",
    emptyText: "Try clearing the search or switching the status filter to load the database results again.",
    journeyKicker: "Journey",
    journeyTitle: "An Agency-style timeline that tells your delivery story",
    journeySubtitle:
      "The original About section from the Agency theme is turned into a clear delivery journey, from discovery and data design to launch and ongoing support.",
    journeySteps: [
      {
        phase: "01",
        kicker: "Discovery",
        title: "Study the real business workflow before building",
        description:
          "Start with the client's real process across sales, production, and leadership so the system fits actual use instead of only looking good in a demo.",
      },
      {
        phase: "02",
        kicker: "Architecture",
        title: "Design the data model and permissions for scale",
        description:
          "Shape schemas, reports, access control, and cross-system flows so the platform can grow with operations and executive reporting.",
      },
      {
        phase: "03",
        kicker: "Launch",
        title: "Launch client portals and back-office systems together",
        description:
          "Bring service marketing and each client portal into one landing experience so access feels unified and more professional.",
      },
      {
        phase: "04",
        kicker: "Support",
        title: "Support continuously with live access updates",
        description:
          "As clients and systems evolve, this hub keeps entry points and system states updated directly from the backend for support teams and customers.",
      },
    ],
    contactKicker: "Contact",
    contactTitle: "Ready to serve as your main server homepage or grow into a full client hub",
    contactText:
      "The new frontend now carries an Agency-inspired visual direction while still connecting to the same profile, services, and client data from the existing backend.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    sendEmail: "Send Email",
    openDirectory: "Open Legacy Directory",
    footerSubtitle: "Copyright © 2026 GOEUN SERVER HUB",
    footerFrontend: "All rights reserved",
    footerBackend: "GOEUN SERVER HUB",
    loadError: "Could not load data from the Python backend, so fallback content is shown for now.",
    statusLabels: {
      online: "Online",
      maintenance: "Maintenance",
      "coming-soon": "Coming Soon",
    },
  },
  zh: {
    brandKicker: "灵感来自 Agency 的客户门户",
    brandSubtitle: "服务展示与多客户系统入口",
    navServices: "服务",
    navPortals: "客户入口",
    navJourney: "流程",
    navContact: "联系",
    heroKicker: "GOEUN DIGITAL INFRASTRUCTURE",
    heroWelcome: "欢迎来到您的客户系统入口中心",
    heroTitle: "您的客户系统与服务展示中心",
    heroSubtitle: "把服务介绍、联系方式以及多个客户系统入口集中在同一个页面中。",
    heroPrimaryButton: "打开客户入口",
    heroSecondaryButton: "查看开发流程",
    statPortals: "客户门户",
    statLive: "在线系统",
    statServices: "服务模块",
    quickLinks: [
      "服务页面",
      "客户入口",
      "流程说明",
      "联系我们",
      "客户目录",
      "服务器首页",
    ],
    panelKicker: "控制中心",
    panelTitle: "Agency 风格，但真正连接现有后端",
    panelCopy:
      "这个新页面借鉴了 StartBootstrap Agency 的节奏，包括 masthead、分区结构、作品集感与时间线，同时进一步升级为更适合真实客户系统的高端界面。",
    primaryContact: "主要联系方式",
    portalAvailability: "门户状态",
    maintenance: "维护中",
    comingSoon: "即将上线",
    syncing: "同步中",
    liveSync: "实时同步",
    servicesKicker: "服务",
    servicesTitle: "更精致、更专业的 Agency 风格服务展示",
    servicesSubtitle:
      "这一部分保留 Agency 模板的节奏感，但重新设计为适合真实系统开发公司、真实数据库和多个客户入口的结构。",
    serviceMap: {
      "Custom Workflow": {
        highlight: "定制流程",
        title: "定制业务系统开发",
        description: "根据每家公司的真实流程设计 ERP、CRM、库存、仪表板与内部工具。",
      },
      "Database Ready": {
        highlight: "数据库就绪",
        title: "数据库整合与报表",
        description: "规划数据库结构、连接跨系统数据，并生成清晰的管理与运营报表。",
      },
      "Central Access": {
        highlight: "统一入口",
        title: "服务器与权限管理",
        description: "集中管理客户登录页面、系统状态以及各个系统入口链接。",
      },
    },
    showcaseKicker: "客户入口",
    showcaseTitle: "保留 Agency 作品集气质，但改成真实客户门户",
    showcaseSubtitle:
      "这里把原本的 Agency 作品集区块替换为来自数据库的客户系统，让视觉风格保留，同时具备真实可用性。",
    searchLabel: "搜索客户",
    searchPlaceholder: "输入公司名称、slug 或系统说明",
    filterAll: "全部",
    filterOnline: "在线",
    filterMaintenance: "维护中",
    filterComingSoon: "即将上线",
    viewPortal: "查看入口",
    enterSystem: "立即进入",
    emptyTitle: "没有找到符合条件的客户",
    emptyText: "请尝试清空搜索条件或切换状态筛选，重新加载数据库结果。",
    journeyKicker: "流程",
    journeyTitle: "用 Agency 风格时间线讲述您的交付流程",
    journeySubtitle: "原本 Agency 的 About 区块被改造成系统交付流程，从需求分析、数据设计到上线与持续支持。",
    journeySteps: [
      {
        phase: "01",
        kicker: "调研",
        title: "先理解真实业务流程，再开始开发",
        description: "从销售、生产到管理层的真实工作流程出发，让系统真正适合使用，而不是只适合展示。",
      },
      {
        phase: "02",
        kicker: "架构",
        title: "设计可扩展的数据结构与权限体系",
        description: "规划 schema、报表、访问控制与跨系统数据流，让平台能够随业务一起扩展。",
      },
      {
        phase: "03",
        kicker: "上线",
        title: "同时推出客户门户与后台系统",
        description: "把服务展示与各客户系统入口整合到一个 landing 中，让整体访问体验更统一、更专业。",
      },
      {
        phase: "04",
        kicker: "支持",
        title: "持续维护并实时更新入口状态",
        description: "随着客户与系统变化，这个 hub 可直接从后端更新入口与状态，方便支持团队与客户使用。",
      },
    ],
    contactKicker: "联系",
    contactTitle: "可直接作为服务器首页，也可继续扩展成完整客户门户",
    contactText: "这个新前端已经具备 Agency 风格的品牌感，同时继续连接原有 backend 中的 profile、services 与 clients 数据。",
    emailLabel: "邮箱",
    phoneLabel: "电话",
    addressLabel: "地址",
    sendEmail: "发送邮件",
    openDirectory: "打开原目录页",
    footerSubtitle: "版权所有 © 2026 GOEUN SERVER HUB",
    footerFrontend: "保留所有权利",
    footerBackend: "GOEUN SERVER HUB",
    loadError: "无法从 Python backend 加载数据，当前暂时显示示例内容。",
    statusLabels: {
      online: "在线",
      maintenance: "维护中",
      "coming-soon": "即将上线",
    },
  },
  ko: {
    brandKicker: "Agency 스타일 고객 허브",
    brandSubtitle: "서비스 소개와 다중 고객 시스템 진입점",
    navServices: "서비스",
    navPortals: "고객 포털",
    navJourney: "진행 과정",
    navContact: "문의",
    heroKicker: "GOEUN DIGITAL INFRASTRUCTURE",
    heroWelcome: "고객 시스템 허브에 오신 것을 환영합니다",
    heroTitle: "고객 시스템과 서비스 홍보를 위한 통합 허브",
    heroSubtitle: "서비스 소개, 연락처, 여러 고객 시스템의 진입점을 한 페이지에 모아 보여줍니다.",
    heroPrimaryButton: "고객 포털 열기",
    heroSecondaryButton: "개발 워크플로 보기",
    statPortals: "고객 포털",
    statLive: "운영 중 시스템",
    statServices: "서비스 모듈",
    quickLinks: [
      "서비스 페이지",
      "고객 포털",
      "진행 과정",
      "문의하기",
      "고객 디렉터리",
      "서버 홈",
    ],
    panelKicker: "커맨드 센터",
    panelTitle: "Agency 스타일이지만 실제 백엔드와 함께 동작합니다",
    panelCopy:
      "이 새 페이지는 StartBootstrap Agency의 masthead, 섹션 리듬, 포트폴리오 감성, 타임라인 구조를 가져오되 실제 고객 시스템에 맞게 더 고급스럽게 다듬었습니다.",
    primaryContact: "주요 연락처",
    portalAvailability: "포털 상태",
    maintenance: "점검 중",
    comingSoon: "오픈 예정",
    syncing: "동기화 중",
    liveSync: "실시간 연결",
    servicesKicker: "서비스",
    servicesTitle: "더 세련되고 전문적인 Agency 스타일 서비스 섹션",
    servicesSubtitle:
      "이 섹션은 Agency 템플릿의 리듬을 유지하면서도 실제 시스템 개발 회사와 실제 데이터베이스, 여러 고객 포털에 맞게 다시 설계되었습니다.",
    serviceMap: {
      "Custom Workflow": {
        highlight: "맞춤 워크플로",
        title: "맞춤형 비즈니스 시스템 개발",
        description: "각 회사의 실제 업무 흐름에 맞춰 ERP, CRM, 재고, 대시보드와 내부 도구를 설계합니다.",
      },
      "Database Ready": {
        highlight: "데이터베이스 준비",
        title: "데이터베이스 연동과 리포트",
        description: "데이터베이스 구조를 설계하고 시스템 간 데이터를 연결하며 경영진과 운영팀을 위한 리포트를 제공합니다.",
      },
      "Central Access": {
        highlight: "통합 접근",
        title: "서버 및 접근 권한 관리",
        description: "고객 로그인 페이지, 시스템 상태, 각 시스템 진입 링크를 하나의 허브에서 관리합니다.",
      },
    },
    showcaseKicker: "고객 포털",
    showcaseTitle: "Agency 포트폴리오 감성을 유지하면서 실제 고객 포털로 재구성",
    showcaseSubtitle:
      "원래 Agency 테마의 포트폴리오 영역을 데이터베이스 기반 고객 시스템으로 바꿔, 분위기는 유지하면서 실제로 사용할 수 있는 구조로 만들었습니다.",
    searchLabel: "고객 검색",
    searchPlaceholder: "회사명, slug 또는 시스템 설명 검색",
    filterAll: "전체",
    filterOnline: "운영 중",
    filterMaintenance: "점검 중",
    filterComingSoon: "오픈 예정",
    viewPortal: "포털 보기",
    enterSystem: "바로 입장",
    emptyTitle: "검색 조건에 맞는 고객이 없습니다",
    emptyText: "검색어를 지우거나 상태 필터를 바꾸면 데이터베이스 결과를 다시 불러올 수 있습니다.",
    journeyKicker: "진행 과정",
    journeyTitle: "Agency 스타일 타임라인으로 전달 흐름을 보여줍니다",
    journeySubtitle:
      "Agency 테마의 About 섹션을 분석, 데이터 설계, 런칭, 지속 지원까지 보여주는 전달 여정으로 바꿨습니다.",
    journeySteps: [
      {
        phase: "01",
        kicker: "분석",
        title: "실제 업무 흐름을 먼저 이해하고 개발합니다",
        description: "영업, 생산, 경영진까지 실제 업무 흐름을 파악해 데모용이 아닌 실제 사용에 맞는 시스템을 만듭니다.",
      },
      {
        phase: "02",
        kicker: "구조 설계",
        title: "확장 가능한 데이터 구조와 권한 체계를 설계합니다",
        description: "스키마, 리포트, 접근 권한, 시스템 간 데이터 흐름을 설계해 운영과 경영 보고에 함께 대응합니다.",
      },
      {
        phase: "03",
        kicker: "런칭",
        title: "고객 포털과 백오피스 시스템을 함께 엽니다",
        description: "서비스 소개와 고객 포털을 하나의 랜딩 경험에 통합해 접근성과 브랜드 일관성을 높입니다.",
      },
      {
        phase: "04",
        kicker: "운영 지원",
        title: "지속적으로 관리하며 상태와 진입점을 업데이트합니다",
        description: "고객과 시스템이 늘어나도 이 허브는 백엔드에서 직접 상태와 링크를 갱신해 지원팀과 고객 모두가 쉽게 사용할 수 있습니다.",
      },
    ],
    contactKicker: "문의",
    contactTitle: "서버의 메인 첫 화면으로도, 완전한 고객 허브로도 확장 가능합니다",
    contactText:
      "이 새 프런트엔드는 Agency 스타일의 브랜드 감각을 가지면서도 기존 backend의 profile, services, clients 데이터와 계속 연결됩니다.",
    emailLabel: "이메일",
    phoneLabel: "전화",
    addressLabel: "주소",
    sendEmail: "이메일 보내기",
    openDirectory: "기존 디렉터리 열기",
    footerSubtitle: "저작권 © 2026 GOEUN SERVER HUB",
    footerFrontend: "판권 소유",
    footerBackend: "GOEUN SERVER HUB",
    loadError: "Python backend에서 데이터를 불러오지 못해 현재는 예시 데이터를 표시합니다.",
    statusLabels: {
      online: "운영 중",
      maintenance: "점검 중",
      "coming-soon": "오픈 예정",
    },
  },
};

async function getJson(paths) {
  const candidates = Array.isArray(paths) ? paths : [paths];
  let lastError = null;

  for (const path of candidates) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Request failed");
}

function clientPortalUrl(slug) {
  return `${backendBaseUrl}/portal/${slug}`;
}

function clientLoginUrl(slug) {
  return `${backendBaseUrl}/go/${slug}`;
}

function statusClassName(status) {
  if (status === "online") {
    return "status-online";
  }
  if (status === "maintenance") {
    return "status-maintenance";
  }
  return "status-coming-soon";
}

export default function HomePage() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [services, setServices] = useState(fallbackServices);
  const [clients, setClients] = useState(fallbackClients);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [profilePayload, servicesPayload, clientsPayload] = await Promise.all([
          getJson(["/api/backend/profile", "/backend-api/profile"]),
          getJson(["/api/backend/services", "/backend-api/services"]),
          getJson(["/api/backend/clients", "/backend-api/clients"]),
        ]);

        if (!active) {
          return;
        }

        setProfile(profilePayload.profile || fallbackProfile);
        setServices(servicesPayload.services || fallbackServices);
        setClients(clientsPayload.clients || fallbackClients);
      } catch {
        if (!active) {
          return;
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredClients = clients.filter((client) => {
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    const haystack = `${client.name} ${client.slug} ${client.description}`.toLowerCase();
    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  const onlineCount = clients.filter((client) => client.status === "online").length;
  const maintenanceCount = clients.filter((client) => client.status === "maintenance").length;
  const comingSoonCount = clients.filter((client) => client.status === "coming-soon").length;
  const heroClients = clients.slice(0, 3);
  const ui = translations[currentLanguage] || translations.th;
  const translatedFilterOptions = filterOptions.map((option) => ({
    ...option,
    label:
      option.key === "all"
        ? ui.filterAll
        : option.key === "online"
          ? ui.filterOnline
          : option.key === "maintenance"
            ? ui.filterMaintenance
            : ui.filterComingSoon,
  }));

  const localizedServices = services.map((service) => {
    const serviceCopy = ui.serviceMap[service.highlight];
    if (!serviceCopy) {
      return service;
    }

    return {
      ...service,
      highlight: serviceCopy.highlight,
      title: serviceCopy.title,
      description: serviceCopy.description,
    };
  });

  return (
    <main className="agency-page">
      <div className="agency-ambient agency-ambient-a" aria-hidden="true" />
      <div className="agency-ambient agency-ambient-b" aria-hidden="true" />
      <div className="agency-ambient agency-ambient-c" aria-hidden="true" />
      <nav className="agency-navbar">
        <div className="container-xxl agency-shell">
          <div className="agency-navbar-shell">
            <a className="agency-brand" href="#top">
              <img src="/logo-mark.svg" alt="GOEUN SERVER HUB" width="64" height="64" className="agency-brand-logo" />
              <span className="agency-brand-copy">
                <span className="agency-brand-kicker">{ui.brandKicker}</span>
                <strong>{profile.brand_name}</strong>
                <span>{ui.brandSubtitle}</span>
              </span>
            </a>
            <div className="agency-nav-tools">
              <div className="agency-language-switcher" aria-label="Language switcher">
                {languageOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`agency-language-button ${currentLanguage === option.key ? "is-active" : ""}`}
                    onClick={() => setCurrentLanguage(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="agency-nav-links">
                <a href="#services">{ui.navServices}</a>
                <a href="#showcase">{ui.navPortals}</a>
                <a href="#journey">{ui.navJourney}</a>
                <a href="#contact">{ui.navContact}</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="agency-masthead" id="top">
        <div className="container-xxl agency-shell">
          <div className="row g-4 align-items-stretch">
            <div className="col-12 col-xl-7">
              <div className="masthead-copy">
                <span className="section-kicker section-kicker-light">{ui.heroKicker}</span>
                <p className="masthead-welcome">{ui.heroWelcome}</p>
                <h1 className="masthead-title">{ui.heroTitle}</h1>
                <p className="masthead-subtitle">{ui.heroSubtitle}</p>

                <div className="masthead-signals">
                  {localizedServices.slice(0, 3).map((service, index) => (
                    <div key={service.id || service.highlight} className="masthead-signal">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{service.highlight}</strong>
                    </div>
                  ))}
                </div>

                <div className="masthead-actions">
                  <a className="btn agency-btn-primary btn-lg" href="#showcase">
                    {ui.heroPrimaryButton}
                  </a>
                  <a className="btn agency-btn-outline btn-lg" href="#journey">
                    {ui.heroSecondaryButton}
                  </a>
                </div>

                <div className="masthead-stats">
                  <div className="masthead-stat">
                    <span>{ui.statPortals}</span>
                    <strong>{clients.length}</strong>
                  </div>
                  <div className="masthead-stat">
                    <span>{ui.statLive}</span>
                    <strong>{onlineCount}</strong>
                  </div>
                  <div className="masthead-stat">
                    <span>{ui.statServices}</span>
                    <strong>{services.length}</strong>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-xl-5">
              <aside className="masthead-panel">
                <div className="masthead-panel-top">
                  <div>
                    <span className="section-kicker">{ui.panelKicker}</span>
                    <h2>{ui.panelTitle}</h2>
                  </div>
                  <span className="sync-pill">{loading ? ui.syncing : ui.liveSync}</span>
                </div>

                <p className="masthead-panel-copy">{ui.panelCopy}</p>

                <div className="contact-mini-card">
                  <span>{ui.primaryContact}</span>
                  <strong>{profile.email}</strong>
                  <small>{profile.phone}</small>
                </div>

                <div className="live-board">
                  <div className="live-board-head">
                    <span>{ui.portalAvailability}</span>
                    <span className="board-dot" aria-hidden="true" />
                  </div>
                  {heroClients.map((client) => (
                    <div key={client.slug} className="live-board-row">
                      <div>
                        <strong>{client.name}</strong>
                        <span>{client.slug}</span>
                      </div>
                      <span className={`status-pill ${statusClassName(client.status)}`}>
                        {ui.statusLabels[client.status] || client.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="agency-mini-grid">
                  <div>
                    <span>{ui.maintenance}</span>
                    <strong>{maintenanceCount}</strong>
                  </div>
                  <div>
                    <span>{ui.comingSoon}</span>
                    <strong>{comingSoonCount}</strong>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </header>

      <section className="agency-section agency-section-plain" id="services">
        <div className="container-xxl agency-shell">
          <div className="agency-section-shell agency-section-shell-soft">
            <div className="section-intro text-center">
              <span className="section-kicker">{ui.servicesKicker}</span>
              <h2 className="section-title">{ui.servicesTitle}</h2>
              <p className="section-subtitle">{ui.servicesSubtitle}</p>
            </div>

            <div className="row g-4">
              {localizedServices.map((service, index) => (
                <div key={service.id || service.title} className="col-12 col-md-6 col-xl-4">
                  <article className={`agency-service-card ${index === 1 ? "agency-service-card-featured" : ""}`}>
                    <div className="service-badge">{String(index + 1).padStart(2, "0")}</div>
                    <div className="service-icon-ring">{service.highlight.slice(0, 1)}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-highlight">{service.highlight}</span>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section agency-section-light" id="showcase">
        <div className="container-xxl agency-shell">
          <div className="agency-section-shell agency-section-shell-glow">
            <div className="section-intro text-center">
              <h2 className="section-title">{ui.showcaseTitle}</h2>
              <p className="section-subtitle">{ui.showcaseSubtitle}</p>
            </div>

            <div className="showcase-toolbar">
              <div className="showcase-search">
                <label htmlFor="client-search">{ui.searchLabel}</label>
                <input
                  id="client-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={ui.searchPlaceholder}
                />
              </div>
              <div className="showcase-filters">
                {translatedFilterOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`filter-pill ${activeFilter === option.key ? "is-active" : ""}`}
                    onClick={() => setActiveFilter(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-4">
              {filteredClients.map((client, index) => (
                <div
                  key={client.slug}
                  className={index === 0 ? "col-12 col-lg-6" : "col-12 col-md-6 col-lg-3"}
                >
                  <article className={`showcase-card ${index === 0 ? "showcase-card-featured" : ""}`}>
                    <div className="showcase-visual">
                      <div className="showcase-glow" />
                      <div className="showcase-visual-content">
                        <span className={`status-pill ${statusClassName(client.status)}`}>
                          {ui.statusLabels[client.status] || client.status}
                        </span>
                        <span className="client-slug">{client.slug}</span>
                      </div>
                    </div>
                    <div className="showcase-body">
                      <h3>{client.name}</h3>
                      <p>{client.description}</p>
                      <div className="showcase-meta">
                        <span>{client.contact_email}</span>
                        <span>{client.contact_phone}</span>
                      </div>
                      <div className="showcase-actions">
                        <a className="btn agency-btn-primary" href={clientPortalUrl(client.slug)}>
                          {ui.viewPortal}
                        </a>
                        <a className="btn agency-btn-soft" href={clientLoginUrl(client.slug)}>
                          {ui.enterSystem}
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {!filteredClients.length ? (
              <div className="empty-state-panel">
                <strong>{ui.emptyTitle}</strong>
                <span>{ui.emptyText}</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="agency-section agency-section-plain" id="journey">
        <div className="container-xxl agency-shell">
          <div className="agency-section-shell agency-section-shell-plain">
            <div className="section-intro text-center">
              <span className="section-kicker">{ui.journeyKicker}</span>
              <h2 className="section-title">{ui.journeyTitle}</h2>
              <p className="section-subtitle">{ui.journeySubtitle}</p>
            </div>

            <div className="journey-timeline">
              {ui.journeySteps.map((step, index) => (
                <div
                  key={step.phase}
                  className={`journey-item ${index % 2 === 0 ? "journey-item-left" : "journey-item-right"}`}
                >
                  <div className="journey-node">{step.phase}</div>
                  <article className="journey-card">
                    <span className="journey-kicker">{step.kicker}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section agency-section-dark" id="contact">
        <div className="container-xxl agency-shell">
          <div className="contact-banner">
            <div className="contact-banner-copy">
              <span className="section-kicker section-kicker-light">{ui.contactKicker}</span>
              <h2>{ui.contactTitle}</h2>
              <p>{ui.contactText}</p>
            </div>
            <div className="contact-banner-side">
              <div className="contact-strip">
                <span>{ui.emailLabel}</span>
                <strong>{profile.email}</strong>
              </div>
              <div className="contact-strip">
                <span>{ui.phoneLabel}</span>
                <strong>{profile.phone}</strong>
              </div>
              <div className="contact-strip">
                <span>{ui.addressLabel}</span>
                <strong>{profile.address}</strong>
              </div>
              <div className="contact-actions">
                <a className="btn agency-btn-primary btn-lg" href={`mailto:${profile.email}`}>
                  {ui.sendEmail}
                </a>
                <a className="btn agency-btn-outline btn-lg" href={`${backendBaseUrl}/clients`}>
                  {ui.openDirectory}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="agency-footer">
        <div className="container-xxl agency-shell">
          <div className="agency-footer-shell">
            <div className="agency-footer-brand">
              <img src="/logo-mark.svg" alt="GOEUN SERVER HUB" width="56" height="56" className="agency-footer-logo" />
              <div>
                <strong>{profile.brand_name}</strong>
                <span>{ui.footerSubtitle}</span>
              </div>
            </div>
            <div className="agency-footer-meta">
              <span>{ui.footerFrontend}</span>
              <span>{ui.footerBackend}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
