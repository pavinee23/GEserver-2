export const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const languageStorageKey = "goeun-agency-language";

export const fallbackProfile = {
  brand_name: "GOEUN SERVER HUB",
  headline: "ศูนย์กลางระบบลูกค้าและหน้าโปรโมตบริการของคุณ",
  subheadline:
    "รวมหน้าแนะนำบริการ, ช่องทางติดต่อ, และทางเข้าระบบสำหรับลูกค้าหลายรายไว้ในเว็บเดียว",
  phone: "081-234-5678",
  email: "goeunserverhub@gmail.com",
  address: "Bangkok, Thailand",
};

export const fallbackServices = [
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

export const fallbackClients = [
  {
    id: 1,
    name: "M-Factory",
    slug: "m-factory",
    description: "ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว",
    status: "online",
    contact_email: "m.factoryandresort@gmail.com",
    contact_phone: "+66 095-241-1833",
    system_url: "https://m-factoryandresort.com/",
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
    system_url: "https://MCT.market",
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

export const filterOptions = [
  { key: "all", label: "ทั้งหมด" },
  { key: "online", label: "พร้อมใช้งาน" },
  { key: "maintenance", label: "บำรุงรักษา" },
  { key: "coming-soon", label: "เร็ว ๆ นี้" },
];

export const languageOptions = [
  { key: "th", label: "ไทย" },
  { key: "en", label: "EN" },
  { key: "zh", label: "中文" },
  { key: "ko", label: "KO" },
];

export function clientPortalUrl(slug) {
  return `${backendBaseUrl}/portal/${slug}`;
}

export function clientLoginUrl(slug) {
  return `${backendBaseUrl}/go/${slug}`;
}

export function statusClassName(status) {
  if (status === "online") return "status-online";
  if (status === "maintenance") return "status-maintenance";
  return "status-coming-soon";
}

export async function getJson(paths) {
  const candidates = Array.isArray(paths) ? paths : [paths];
  let lastError = null;
  for (const path of candidates) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Request failed");
}
