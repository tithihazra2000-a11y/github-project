import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projects, categories } from "../data/mockData";
import ProjectCard from "../components/ProjectCard";

const HomePage = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const featured = projects.filter((p) => p.featured);

  const stats = [
    { label: "Projects Available", value: "500+", icon: "◈" },
    { label: "Active Sellers", value: "89", icon: "◉" },
    { label: "Happy Buyers", value: "3.4K", icon: "★" },
    { label: "Categories", value: "12", icon: "⊞" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/browse");
    }
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          background:
            "linear-gradient(160deg, var(--bg) 0%, var(--bg-card) 50%, var(--bg) 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "72px 0 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background code decoration */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 40,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-3)",
            lineHeight: 1.8,
            pointerEvents: "none",
          }}
        >
          {`const project = await marketplace\n  .browse({ category: "all" })\n  .filter({ rated: ">= 4.5" })\n  .purchase({ secure: true });`}
        </div>

        <div className="container" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: 16 }}>
            <span className="badge badge-blue" style={{ fontSize: 12 }}>
              🎓 Final Year Projects &amp; Ready-Made Solutions
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            Buy &amp; Sell{" "}
            <span style={{ color: "var(--accent)" }}>Developer Projects</span>
            <br />
            Built for Students &amp; Developers
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-2)",
              marginBottom: 32,
              maxWidth: 560,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Discover 500+ ready-to-deploy projects across web, mobile, AI/ML,
            and blockchain. Instant download, full source code, documentation included.
          </p>

          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              gap: 8,
              maxWidth: 560,
              margin: "0 auto 24px",
            }}
          >
            <div style={{ flex: 1, position: "relative" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-3)"
                strokeWidth="2"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="input"
                placeholder="Search e.g. MERN, Django, React Native..."
                style={{ paddingLeft: 36, height: 44, fontSize: 14 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              className="btn btn-primary"
              style={{ height: 44, paddingLeft: 24, paddingRight: 24 }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {["MERN Stack", "Django", "React Native", "Machine Learning", "Spring Boot"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/browse?q=${tag}`)}
                style={{
                  padding: "4px 12px",
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  fontSize: 12,
                  color: "var(--text-2)",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
        {/* ── Categories ────────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Find projects organized by domain and technology</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/browse?category=${cat.name}`)}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px 12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "var(--transition)",
                  color: "var(--text-1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--bg-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
                  {cat.count} projects
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Featured Projects ──────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 20,
            }}
          >
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-sub">Hand-picked, top-quality projects</p>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate("/browse")}
            >
              View All →
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>

        {/* ── Sell CTA ───────────────────────────────────── */}
        <section>
          <div
            style={{
              background: "linear-gradient(135deg, var(--accent-dim) 0%, var(--bg-hover) 100%)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                Got a great project? Start selling today.
              </h2>
              <p style={{ color: "var(--text-2)", fontSize: 14, maxWidth: 480 }}>
                Upload your project once, earn commissions every time it sells.
                Set your price, keep 80% of every sale. It's that simple.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                {["80% revenue share", "Instant payout", "Global reach"].map((f) => (
                  <span key={f} style={{ fontSize: 12, color: "var(--green)" }}>
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary btn-lg"
              style={{ flexShrink: 0 }}
              onClick={() => navigate("/seller/upload")}
            >
              Start Selling →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;