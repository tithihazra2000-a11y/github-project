// pages/ProjectDetailPage.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import PROJECTS from "../src/data/projects";

export default function ProjectDetailPage() {
  const { navigate, selectedProject, showToast } = useContext(AppContext);

  // Fallback to first project if none selected
  const p = selectedProject || PROJECTS[0];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "24px",
      padding: "28px",
      maxWidth: "1100px",
      margin: "0 auto",
    }}>

      {/* ===== LEFT COLUMN ===== */}
      <div>
        <button className="back-btn" onClick={() => navigate("browse")}>← Back to Browse</button>

        {/* Header Card */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ background: "rgba(124,58,237,0.12)", color: "var(--purple3)", fontSize: "11px", padding: "3px 10px", borderRadius: "99px", border: "1px solid var(--border)" }}>
                {p.tag}
              </span>
              {p.badge && <span className={`badge badge-${p.badge}`}>{p.badge.toUpperCase()}</span>}
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ color: "var(--warning)", fontSize: "14px" }}>{p.stars}</span>
              <span style={{ color: "var(--text3)", fontSize: "12px" }}>({p.reviews} reviews)</span>
            </div>
          </div>

          <h1 style={{ fontFamily: "var(--font-head)", fontSize: "26px", fontWeight: 800, marginBottom: "8px" }}>{p.title}</h1>

          <div style={{ display: "flex", gap: "16px", color: "var(--text2)", fontSize: "13px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span>👤 by <span style={{ color: "var(--purple3)" }}>{p.seller}</span></span>
            <span>📥 {p.downloads} downloads</span>
            <span>📅 Updated {p.updatedAt}</span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {Object.keys(p.techStack).map(key => (
              <span key={key} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "4px 12px", fontSize: "12px", color: "var(--text2)" }}>
                {key}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: "14px", color: "var(--purple3)" }}>📋 Project Overview</h3>
          <p style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.8 }}>{p.longDesc}</p>
        </div>

        {/* What's Included */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: "14px", color: "var(--purple3)" }}>✅ What's Included</h3>
          <ul style={{ listStyle: "none" }}>
            {p.included.map((item, i) => (
              <li key={i} style={{ padding: "6px 0", color: "var(--text2)", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
                <span style={{ color: "var(--purple)" }}>→</span>{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: "14px", color: "var(--purple3)" }}>🛠 Tech Stack</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {Object.entries(p.techStack).map(([key, val]) => (
              <div key={key} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px" }}>
                <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".5px" }}>{key}</div>
                <div style={{ fontSize: "13px" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDEBAR ===== */}
      <div>
        <div style={{
          background: "var(--bg2)", border: "1px solid var(--border2)",
          borderRadius: "var(--radius)", padding: "24px",
          position: "sticky", top: "70px",
        }}>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--purple3)", marginBottom: "4px" }}>
            {p.price}
          </div>
          <div style={{ color: "var(--text3)", textDecoration: "line-through", fontSize: "14px", marginBottom: "4px" }}>
            {p.originalPrice}{" "}
            <span style={{ color: "var(--success)", textDecoration: "none", fontSize: "12px" }}>{p.discount}</span>
          </div>

          <div style={{ marginBottom: "16px" }} />

          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", fontSize: "15px", marginBottom: "10px" }}
            onClick={() => navigate("checkout")}
          >
            Buy Now — {p.price}
          </button>

          <button
            className="btn btn-ghost"
            style={{ width: "100%", padding: "10px", fontSize: "13px", marginBottom: "16px" }}
            onClick={() => showToast("Added to wishlist!")}
          >
            🔖 Add to Wishlist
          </button>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "16px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {[
              ["License",     "Personal + Commercial"],
              ["Files",       `ZIP (${p.files.length} files)`],
              ["Size",        p.size],
              ["Last Update", p.updatedAt],
              ["Support",     "6 Months"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--text2)" }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "16px 0" }} />

          <div style={{ fontSize: "12px", color: "var(--text3)", marginBottom: "10px" }}>Sales</div>
          <div style={{ background: "var(--bg3)", borderRadius: "99px", height: "4px", overflow: "hidden", marginBottom: "6px" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (p.downloads / 1000) * 100)}%`, background: "linear-gradient(90deg, var(--purple), var(--purple3))", borderRadius: "99px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text3)" }}>
            <span>{p.downloads} sold</span>
            <span>⚡ High demand</span>
          </div>
        </div>
      </div>
    </div>
  );
}