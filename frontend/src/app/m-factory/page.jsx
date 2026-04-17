import Link from "next/link";

export const metadata = {
  title: "M-Factory — ขาย-ให้เช่าโกดัง โรงงาน รีสอร์ทส่วนตัว",
  description:
    "M-Factory ให้บริการขายและให้เช่าโกดัง โรงงาน พร้อมบริการที่พักรีสอร์ทส่วนตัว",
};

const SERVICES = [
  {
    icon: "🏭",
    title: "ให้เช่าโกดัง",
    desc: "พื้นที่โกดังขนาดต่างๆ พร้อมระบบรักษาความปลอดภัย 24 ชั่วโมง เหมาะสำหรับจัดเก็บสินค้าและวัสดุทุกประเภท",
  },
  {
    icon: "🏗️",
    title: "ขาย-ให้เช่าโรงงาน",
    desc: "โรงงานพร้อมใช้งาน ระบบไฟฟ้าครบ รองรับการขยายกิจการอุตสาหกรรม ทั้งแบบให้เช่าและขายขาด",
  },
  {
    icon: "🏖️",
    title: "รีสอร์ทส่วนตัว",
    desc: "บริการที่พักรีสอร์ทส่วนตัวสำหรับพักผ่อนและจัดกิจกรรมองค์กร บรรยากาศเงียบสงบเป็นส่วนตัว",
  },
];

export default function MFactoryPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Itim', 'Inter', sans-serif",
        background: "#f2f5fc",
        color: "#111b35",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(37,99,235,0.1)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(29,86,232,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #1d56e8, #0284c7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.1rem",
            }}
          >
            MF
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1rem", color: "#111b35" }}>
              M-Factory
            </div>
            <div style={{ fontSize: "0.72rem", color: "#2e3a52", letterSpacing: "0.08em" }}>
              โกดัง · โรงงาน · รีสอร์ท
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href="#services"
            style={{ color: "#111b35", fontSize: "0.95rem", fontWeight: 500 }}
          >
            บริการ
          </a>
          <a
            href="#contact"
            style={{ color: "#111b35", fontSize: "0.95rem", fontWeight: 500 }}
          >
            ติดต่อ
          </a>
          <Link
            href="/"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 999,
              background: "rgba(29,86,232,0.08)",
              color: "#1d56e8",
              fontSize: "0.88rem",
              fontWeight: 600,
            }}
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
          color: "#fff",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(255,255,255,0.08), transparent)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontSize: "0.82rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            พร้อมใช้งาน
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 1.25rem",
            }}
          >
            M-Factory
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 2rem",
            }}
          >
            ขาย-ให้เช่าโกดัง โรงงาน พร้อมบริการที่พัก รีสอร์ทส่วนตัว
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "0.85rem 2.2rem",
              borderRadius: 999,
              background: "#ffffff",
              color: "#1d56e8",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            ติดต่อเรา
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(29,86,232,0.08)",
              color: "#1d56e8",
              fontSize: "0.82rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontWeight: 700,
            }}
          >
            บริการของเรา
          </div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#111b35" }}>
            ครบทุกความต้องการด้านพื้นที่
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.title}
              style={{
                background: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                border: "1px solid rgba(37,99,235,0.1)",
                boxShadow: "0 4px 24px rgba(29,86,232,0.08)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#111b35",
                  margin: "0 0 0.75rem",
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: "#2e3a52", lineHeight: 1.75, margin: 0, fontSize: "0.95rem" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
          color: "#fff",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.75rem" }}>
            ติดต่อ M-Factory
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.05rem",
              margin: "0 0 2rem",
            }}
          >
            สนใจเช่าหรือซื้อพื้นที่? ติดต่อเราได้เลย
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:02-111-2233"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.5rem",
                borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              📞 02-111-2233
            </a>
            <a
              href="mailto:ops@rung-ruang.example.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.5rem",
                borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              ✉️ ops@rung-ruang.example.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(37,99,235,0.1)",
          padding: "1.25rem 2rem",
          textAlign: "center",
          color: "#2e3a52",
          fontSize: "0.88rem",
        }}
      >
        © 2026 M-Factory · ขาย-ให้เช่าโกดัง โรงงาน รีสอร์ทส่วนตัว
      </footer>
    </div>
  );
}
