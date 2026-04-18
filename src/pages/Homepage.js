// pages/HomePage.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import { ProjectCard } from "../components/SharedComponents";
import PROJECTS from "../data/projects";

const CATEGORIES = [
  { label: "Web Apps",   icon: "🌐" },
  { label: "Mobile",     icon: "📱" },
  { label: "ML/AI",      icon: "🤖" },
  { label: "Blockchain", icon: "⛓" },
  { label: "Final Year", icon: "🎓" },
  { label: "APIs",       icon: "🔌" },
  { label: "Games",      icon: "🎮" },
  { label: "Tools",      icon: "🛠" },
];

const HOW_IT_WORKS = [
  { icon: "🔍", title: "Browse",   desc: "Explore thousands of ready-made GitHub projects" },
  { icon: "💳", title: "Checkout", desc: "Secure payment via Stripe, UPI or Razorpay" },
  { icon: "⬇", title: "Download", desc: "Instant access to source code & documentation" },
  { icon: "🚀", title: "Deploy",   desc: "Ship your project in minutes with setup guides" },
];

export default function HomePage() {
  const { navigate } = useContext(AppContext);

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{
        padding: "80px 40px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow behind */}
        <div style={{
          position: "absolute", top: "-100px", left: "50%",
          transform: "translateX(-50%)", width: "600px", height: "400px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(124,58,237,0.15)", border: "1px solid var(--border2)",
          borderRadius: "99px", padding: "4px 14px", fontSize: "12px",
          color: "var(--purple3)", marginBottom: "20px",
        }}>
          ✦ The #1 Project Marketplace
        </div>

        <h1 style={{
          fontFamily: "var(--font-head)", fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800, lineHeight: 1.1, marginBottom: "16px",
        }}>
          Buy &amp; Sell <span style={{ color: "var(--purple2)" }}>GitHub Projects</span>
          <br />Instantly
        </h1>

        <p style={{ color: "var(--text2)", fontSize: "16px", maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Ready-made apps, final year projects &amp; source code — download in seconds.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" style={{ padding: "12px 28px", fontSize: "15px" }} onClick={() => navigate("browse")}>
            Browse Projects
          </button>
          <button className="btn btn-ghost" style={{ padding: "12px 28px", fontSize: "15px" }} onClick={() => navigate("seller")}>
            Start Selling
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "40px",
          marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)", flexWrap: "wrap",
        }}>
          {[["2,400+","Projects Listed"],["18K+","Downloads"],["940+","Sellers"],["4.8★","Avg Rating"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 700 }}>{n}</div>
              <div style={{ color: "var(--text3)", fontSize: "12px", marginTop: "2px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRENDING PROJECTS ===== */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">🔥 Trending Projects</div>
          <span className="section-link" onClick={() => navigate("browse")}>View all →</span>
        </div>
        <div className="cards-grid">
          {PROJECTS.slice(0, 4).map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <div className="section" style={{ marginTop: "-10px" }}>
        <div className="section-header">
          <div className="section-title">📦 Browse by Category</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
          {CATEGORIES.map(({ label, icon }) => (
            <div key={label} className="card" style={{ textAlign: "center", padding: "16px 12px" }} onClick={() => navigate("browse")}>
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">⚡ How It Works</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {HOW_IT_WORKS.map(({ icon, title, desc }) => (
            <div key={title} className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{title}</div>
              <div style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}