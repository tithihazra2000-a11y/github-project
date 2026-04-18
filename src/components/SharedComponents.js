// components/SharedComponents.js
import React, { useContext } from "react";
import { AppContext } from "../App";

// ── Footer ──────────────────────────────────────────────
export function Footer() {
  const { navigate } = useContext(AppContext);
  return (
    <footer style={{
      background: "var(--bg2)",
      borderTop: "1px solid var(--border)",
      padding: "32px 40px",
      textAlign: "center",
      color: "var(--text3)",
      fontSize: "12px",
    }}>
      © 2025 GitMarket —{" "}
      <span style={{ color: "var(--purple3)", cursor: "pointer" }} onClick={() => navigate("about")}>About</span> ·{" "}
      <span style={{ color: "var(--purple3)", cursor: "pointer" }} onClick={() => navigate("legal")}>Legal</span> ·{" "}
      <span style={{ color: "var(--purple3)", cursor: "pointer" }} onClick={() => navigate("contact")}>Contact</span>
    </footer>
  );
}

// ── Toast ────────────────────────────────────────────────
export function Toast({ message }) {
  return (
    <div style={{
      position: "fixed",
      top: "70px",
      right: "20px",
      background: "var(--bg2)",
      border: "1px solid var(--success)",
      color: "var(--success)",
      padding: "10px 18px",
      borderRadius: "var(--radius-sm)",
      fontSize: "13px",
      zIndex: 999,
      opacity: message ? 1 : 0,
      transition: "opacity .3s",
      pointerEvents: "none",
    }}>
      {message}
    </div>
  );
}

// ── ProjectCard ──────────────────────────────────────────
export function ProjectCard({ project }) {
  const { navigate } = useContext(AppContext);
  return (
    <div className="card" onClick={() => navigate("detail", project)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          background: "rgba(124,58,237,0.12)", color: "var(--purple3)",
          fontSize: "11px", padding: "3px 10px", borderRadius: "99px",
          border: "1px solid var(--border)",
        }}>
          {project.tag}
        </span>
        {project.badge && (
          <span className={`badge badge-${project.badge}`}>{project.badge.toUpperCase()}</span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "6px", lineHeight: 1.3 }}>
        {project.title}
      </div>
      <div style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.6, marginBottom: "14px" }}>
        {project.desc}
      </div>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "10px", alignItems: "center" }}>
        {project.langs.map((color, i) => (
          <React.Fragment key={i}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
            <span style={{ fontSize: "11px", color: "var(--text3)", marginRight: "6px" }}>{project.langNames[i]}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "17px", color: "var(--purple3)" }}>
          {project.price}
        </span>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "var(--warning)", fontSize: "12px" }}>{project.stars}</div>
          <div style={{ color: "var(--text3)", fontSize: "11px" }}>{project.downloads} downloads</div>
        </div>
      </div>
    </div>
  );
}

// ── StatusPill ───────────────────────────────────────────
export function StatusPill({ status }) {
  return (
    <span className={`status-pill ${status}`}>
      <span className="dot" />
      {status}
    </span>
  );
}