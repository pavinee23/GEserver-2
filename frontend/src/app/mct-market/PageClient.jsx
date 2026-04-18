"use client";

import { useState, useEffect } from "react";

const GREEN = "#15803d";
const DARK_GREEN = "#14532d";
const MID_GREEN = "#16a34a";
const GOLD = "#ca8a04";
const EARTH = "#78350f";
const LIGHT = "#f0fdf4";
const NAVY = "#0f172a";
const WHITE = "#ffffff";

const SITE_URL = "https://MCT.market";
const PHONE = "02-444-8822";
const EMAIL = "sales@mct-market.example.com";

// ─── inject keyframe styles once ─────────────────────────────────
function injectStyle(id, css) {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

// ─── Content ─────────────────────────────────────────────────────
const CONTENT = {
  th: {
    navBrand: "MCT-Market",
    navLinks: [
      { label: "เกี่ยวกับเรา", href: "#about" },
      { label: "บริการ", href: "#services" },
      { label: "แพลตฟอร์ม AI", href: "#platform" },
      { label: "ติดต่อ", href: "#contact" },
    ],
    heroTitle: "MCT-Market",
    heroTagline: "ร้านเกษตรครบวงจร ประสบการณ์กว่า 50 ปี",
    heroDesc:
      "จำหน่ายอุปกรณ์การเกษตร เครื่องจักรกล เมล็ดพันธุ์ และปัจจัยการผลิตครบครัน พร้อมแพลตฟอร์ม AI ที่ช่วยตอบลูกค้า เสนอขายสินค้า และรับชำระเงินแทนคุณ",
    heroBtn: "🌾 เยี่ยมชมร้านค้า MCT.market",
    aboutTitle: "เกี่ยวกับ MCT-Market",
    aboutBody:
      "MCT-Market เป็นผู้จำหน่ายอุปกรณ์การเกษตรที่มีประสบการณ์ยาวนานมากกว่า 50 ปี เราคัดสรรสินค้าคุณภาพสูงทั้งเครื่องจักรกลการเกษตร ระบบชลประทาน เมล็ดพันธุ์ และปุ๋ย เพื่อตอบสนองความต้องการของเกษตรกรไทยในทุกพื้นที่",
    statsItems: [
      { value: "50+", label: "ปีแห่งประสบการณ์" },
      { value: "10,000+", label: "รายการสินค้า" },
      { value: "AI", label: "แพลตฟอร์มทันสมัย" },
      { value: "24/7", label: "บริการตอบลูกค้า" },
    ],
    servicesTitle: "สินค้าและบริการ",
    services: [
      {
        icon: "🚜",
        title: "เครื่องจักรกลการเกษตร",
        desc: "รถแทรกเตอร์ รถเกี่ยวข้าว เครื่องปลูก เครื่องฉีดพ่น และอุปกรณ์ทุ่นแรงครบครัน",
      },
      {
        icon: "💧",
        title: "ระบบชลประทานและน้ำ",
        desc: "ท่อ สปริงเกลอร์ ระบบน้ำหยด ปั๊มน้ำ และอุปกรณ์กักเก็บน้ำสำหรับพื้นที่การเกษตร",
      },
      {
        icon: "🌱",
        title: "เมล็ดพันธุ์และปัจจัยการผลิต",
        desc: "เมล็ดพันธุ์คัดสรร ปุ๋ยเคมีและอินทรีย์ ยาปราบศัตรูพืช และสารปรับปรุงดิน",
      },
    ],
    platformTitle: "แพลตฟอร์ม AI ของเรา",
    platformSubtitle: "เทคโนโลยีที่ช่วยให้ธุรกิจเกษตรของคุณเติบโต",
    platformFeatures: [
      {
        icon: "🤖",
        title: "AI ตอบลูกค้า",
        desc: "ระบบ AI ตอบคำถามลูกค้าได้ตลอด 24 ชั่วโมง ทั้งเรื่องสินค้า ราคา และวิธีใช้งาน",
      },
      {
        icon: "🛒",
        title: "เสนอขายสินค้าอัตโนมัติ",
        desc: "แพลตฟอร์มวิเคราะห์ความต้องการและแนะนำสินค้าที่เหมาะสมให้ลูกค้าแต่ละราย",
      },
      {
        icon: "💳",
        title: "รับชำระเงินแทน",
        desc: "ระบบชำระเงินออนไลน์ครบวงจร รองรับทุกช่องทาง ปลอดภัย รวดเร็ว ไม่ต้องตั้งระบบเอง",
      },
    ],
    contactTitle: "ติดต่อเรา",
    contactPhone: PHONE,
    contactEmail: EMAIL,
    contactCta: "เยี่ยมชมร้านค้าออนไลน์",
    footerText: "© 2024 MCT-Market. All rights reserved.",
  },
  en: {
    navBrand: "MCT-Market",
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Products", href: "#services" },
      { label: "AI Platform", href: "#platform" },
      { label: "Contact", href: "#contact" },
    ],
    heroTitle: "MCT-Market",
    heroTagline: "Complete Agricultural Supply — 50+ Years of Excellence",
    heroDesc:
      "Supplying agricultural equipment, machinery, seeds, and inputs for over 50 years. Now powered by an AI platform that answers customers, recommends products, and processes payments on your behalf.",
    heroBtn: "🌾 Visit MCT.market",
    aboutTitle: "About MCT-Market",
    aboutBody:
      "MCT-Market has been Thailand's trusted agricultural equipment supplier for over 50 years. We offer a comprehensive range of machinery, irrigation systems, seeds, and fertilizers, serving farmers across all regions of Thailand.",
    statsItems: [
      { value: "50+", label: "Years Experience" },
      { value: "10,000+", label: "Products" },
      { value: "AI", label: "Powered Platform" },
      { value: "24/7", label: "Customer Support" },
    ],
    servicesTitle: "Products & Services",
    services: [
      {
        icon: "🚜",
        title: "Agricultural Machinery",
        desc: "Tractors, harvesters, planters, sprayers, and labor-saving equipment for every farm need.",
      },
      {
        icon: "💧",
        title: "Irrigation & Water Systems",
        desc: "Pipes, sprinklers, drip irrigation, pumps, and water storage for agricultural land.",
      },
      {
        icon: "🌱",
        title: "Seeds & Production Inputs",
        desc: "Quality seeds, chemical and organic fertilizers, pesticides, and soil amendments.",
      },
    ],
    platformTitle: "Our AI Platform",
    platformSubtitle: "Technology that grows your agricultural business",
    platformFeatures: [
      {
        icon: "🤖",
        title: "AI Customer Service",
        desc: "AI responds to customer questions 24/7 — products, pricing, and usage guidance.",
      },
      {
        icon: "🛒",
        title: "Automated Sales Recommendations",
        desc: "The platform analyzes needs and recommends the right products to each customer.",
      },
      {
        icon: "💳",
        title: "Payment Processing",
        desc: "Full online payment system supporting all channels — safe, fast, no setup required.",
      },
    ],
    contactTitle: "Contact Us",
    contactPhone: PHONE,
    contactEmail: EMAIL,
    contactCta: "Visit Online Store",
    footerText: "© 2024 MCT-Market. All rights reserved.",
  },
};

// ─── LedBillboard component ───────────────────────────────────────
function LedBillboard({ text }) {
  useEffect(() => {
    injectStyle("led-blink-mct", `
      @keyframes ledBlinkMct {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }
      @keyframes dotPulseMct {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(0.6); }
      }
    `);
  }, []);

  return (
    <div style={{
      background: "transparent",
      border: `2px solid ${MID_GREEN}`,
      borderRadius: 12,
      padding: "16px 28px",
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      boxShadow: `0 0 18px ${MID_GREEN}55`,
      margin: "0 auto",
    }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: MID_GREEN,
          display: "inline-block",
          animation: `dotPulseMct 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
      <span style={{
        fontSize: "clamp(14px, 3vw, 18px)",
        fontWeight: 700,
        color: "#111111",
        letterSpacing: "0.08em",
        animation: "ledBlinkMct 2.5s ease-in-out infinite",
        fontFamily: "'Noto Sans Thai', 'Sarabun', sans-serif",
      }}>{text}</span>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: MID_GREEN,
          display: "inline-block",
          animation: `dotPulseMct 1.2s ease-in-out ${(2 - i) * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────
function StatCard({ value, label }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 16,
      padding: "20px 24px",
      textAlign: "center",
      flex: "1 1 140px",
      minWidth: 120,
    }}>
      <div style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800, color: WHITE }}>{value}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────
function ServiceCard({ icon, title, desc }) {
  return (
    <div style={{
      background: WHITE,
      border: `1px solid #dcfce7`,
      borderRadius: 16,
      padding: "28px 24px",
      flex: "1 1 260px",
      minWidth: 220,
      boxShadow: "0 2px 12px rgba(21,128,61,0.08)",
      transition: "box-shadow 0.2s",
    }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 17, color: DARK_GREEN, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

// ─── PlatformCard ─────────────────────────────────────────────────
function PlatformCard({ icon, title, desc }) {
  return (
    <div style={{
      background: LIGHT,
      border: `2px solid #bbf7d0`,
      borderRadius: 16,
      padding: "28px 24px",
      flex: "1 1 240px",
      minWidth: 200,
      textAlign: "center",
    }}>
      <div style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${MID_GREEN}, ${DARK_GREEN})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        margin: "0 auto 14px",
      }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 16, color: DARK_GREEN, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

// ─── Main PageClient ──────────────────────────────────────────────
export default function PageClient() {
  const [lang, setLang] = useState("th");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    injectStyle("mct-responsive", `
      @media (max-width: 768px) {
        .mct-hero-content { padding: 100px 20px 60px !important; }
        .mct-section { padding: 60px 20px !important; }
        .mct-cards { flex-direction: column !important; }
        .mct-stats { flex-wrap: wrap !important; }
        .mct-contact-grid { flex-direction: column !important; align-items: stretch !important; }
      }
    `);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const t = CONTENT[lang] || CONTENT.th;

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: `${DARK_GREEN}f2`,
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 clamp(16px, 4vw, 48px)",
    height: 64,
    borderBottom: `1px solid ${MID_GREEN}55`,
  };

  return (
    <div style={{ fontFamily: "'Noto Sans Thai', 'Sarabun', 'Inter', sans-serif", background: LIGHT, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── Navbar ── */}
      <nav style={navStyle}>
        <a href="#" style={{ fontWeight: 800, fontSize: 20, color: WHITE, textDecoration: "none", letterSpacing: "0.04em" }}>
          🌾 {t.navBrand}
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {t.navLinks.map((l) => (
              <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = WHITE}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}>
                {l.label}
              </a>
            ))}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
              style={{ background: MID_GREEN, color: WHITE, padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: `0 2px 8px ${MID_GREEN}66` }}>
              MCT.market ↗
            </a>
            <button onClick={() => setLang(lang === "th" ? "en" : "th")}
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6, color: WHITE, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
          </div>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setLang(lang === "th" ? "en" : "th")}
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6, color: WHITE, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              {lang === "th" ? "EN" : "TH"}
            </button>
            <button onClick={() => setMenuOpen((o) => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: 24, height: 2, background: WHITE, borderRadius: 2,
                  transform: menuOpen ? (i === 1 ? "scaleX(0)" : i === 0 ? "rotate(45deg) translate(5px, 5px)" : "rotate(-45deg) translate(5px, -5px)") : "none",
                  transition: "all 0.25s" }} />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: DARK_GREEN, padding: "16px 24px 24px", borderBottom: `2px solid ${MID_GREEN}`, display: "flex", flexDirection: "column", gap: 4 }}>
          {t.navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: 15, fontWeight: 500, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {l.label}
            </a>
          ))}
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 12, background: MID_GREEN, color: WHITE, padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center" }}>
            MCT.market ↗
          </a>
        </div>
      )}

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(160deg, ${DARK_GREEN} 0%, ${MID_GREEN} 60%, ${GOLD}33 100%)`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(202,138,4,0.08)", pointerEvents: "none" }} />

        <div className="mct-hero-content" style={{
          textAlign: "center",
          padding: "120px clamp(20px, 6vw, 80px) 80px",
          maxWidth: 800,
          position: "relative",
          zIndex: 1,
        }}>
          {/* billboard */}
          <div style={{ marginBottom: 32 }}>
            <LedBillboard text="🌾 MCT-Market — ร้านเกษตรครบวงจร" />
          </div>

          <h1 style={{ fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 900, color: WHITE, margin: "0 0 12px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {t.heroTitle}
          </h1>
          <p style={{ fontSize: "clamp(16px, 3vw, 22px)", color: "rgba(255,255,255,0.9)", fontWeight: 600, margin: "0 0 20px" }}>
            {t.heroTagline}
          </p>
          <p style={{ fontSize: "clamp(14px, 2.2vw, 17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 40px" }}>
            {t.heroDesc}
          </p>

          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${GOLD}, #a16207)`,
              color: WHITE,
              padding: "16px 36px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: "clamp(15px, 2.5vw, 18px)",
              textDecoration: "none",
              boxShadow: `0 6px 24px ${GOLD}66`,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${GOLD}88`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 6px 24px ${GOLD}66`; }}>
            {t.heroBtn}
          </a>
        </div>
      </div>

      {/* ── About + Stats ── */}
      <section id="about" className="mct-section" style={{ padding: "80px clamp(20px, 6vw, 80px)", background: WHITE }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: DARK_GREEN, marginBottom: 16, textAlign: "center" }}>
            {t.aboutTitle}
          </h2>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#374151", lineHeight: 1.8, textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            {t.aboutBody}
          </p>

          {/* Stats */}
          <div className="mct-stats" style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            {t.statsItems.map((s) => (
              <div key={s.label} style={{
                background: `linear-gradient(135deg, ${DARK_GREEN}, ${MID_GREEN})`,
                borderRadius: 16,
                padding: "24px 28px",
                textAlign: "center",
                flex: "1 1 160px",
                minWidth: 130,
                maxWidth: 200,
              }}>
                <div style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: WHITE }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="mct-section" style={{ padding: "80px clamp(20px, 6vw, 80px)", background: LIGHT }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: DARK_GREEN, marginBottom: 40, textAlign: "center" }}>
            {t.servicesTitle}
          </h2>
          <div className="mct-cards" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {t.services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Platform ── */}
      <section id="platform" className="mct-section" style={{
        padding: "80px clamp(20px, 6vw, 80px)",
        background: `linear-gradient(160deg, ${DARK_GREEN} 0%, ${MID_GREEN} 100%)`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: WHITE, marginBottom: 8, textAlign: "center" }}>
            {t.platformTitle}
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: 48 }}>
            {t.platformSubtitle}
          </p>
          <div className="mct-cards" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {t.platformFeatures.map((f) => (
              <PlatformCard key={f.title} {...f} />
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: `linear-gradient(135deg, ${GOLD}, #a16207)`,
                color: WHITE,
                padding: "14px 32px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                boxShadow: `0 4px 16px ${GOLD}55`,
              }}>
              🌐 ไปยัง MCT.market ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mct-section" style={{ padding: "80px clamp(20px, 6vw, 80px)", background: WHITE }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: DARK_GREEN, marginBottom: 40 }}>
            {t.contactTitle}
          </h2>

          <div className="mct-contact-grid" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <a href={`tel:${PHONE}`} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: LIGHT, border: `1px solid #bbf7d0`,
              borderRadius: 14, padding: "16px 24px", textDecoration: "none",
              color: DARK_GREEN, fontWeight: 600, fontSize: 15, flex: "1 1 200px", justifyContent: "center",
            }}>
              📞 {t.contactPhone}
            </a>
            <a href={`mailto:${EMAIL}`} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: LIGHT, border: `1px solid #bbf7d0`,
              borderRadius: 14, padding: "16px 24px", textDecoration: "none",
              color: DARK_GREEN, fontWeight: 600, fontSize: 14, flex: "1 1 260px", justifyContent: "center",
              wordBreak: "break-all",
            }}>
              ✉️ {t.contactEmail}
            </a>
          </div>

          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${MID_GREEN}, ${DARK_GREEN})`,
              color: WHITE,
              padding: "16px 40px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 17,
              textDecoration: "none",
              boxShadow: `0 6px 24px ${MID_GREEN}55`,
              letterSpacing: "0.02em",
            }}>
            🌾 {t.contactCta} → MCT.market
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: DARK_GREEN,
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
        padding: "28px 24px",
        fontSize: 13,
      }}>
        <div style={{ marginBottom: 8 }}>
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, textDecoration: "none" }}>
            MCT.market ↗
          </a>
          {" · "}
          <a href={`tel:${PHONE}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{PHONE}</a>
          {" · "}
          <a href={`mailto:${EMAIL}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{EMAIL}</a>
        </div>
        <div>{t.footerText}</div>
      </footer>
    </div>
  );
}
