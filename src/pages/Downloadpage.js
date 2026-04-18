// pages/DownloadPage.js
import React, { useContext } from "react";
import { AppContext } from "../App";
import PROJECTS from "../data/projects";

export default function DownloadPage() {
  const { navigate, selectedProject, showToast } = useContext(AppContext);
  const p = selectedProject || PROJECTS[0];

  const fileDetails = {
    "main-source.zip":  { label: "Source Code",      size: "2.1 MB",  icon: "📦" },
    "docs.pdf":         { label: "Documentation",     size: "340 KB",  icon: "📄" },
    "db-schema.sql":    { label: "Database Schema",   size: "89 KB",   icon: "🗄" },
    "postman.json":     { label: "API Collection",    size: "45 KB",   icon: "📮" },
    "database.sql":     { label: "Database",          size: "120 KB",  icon: "🗄" },
    "model-weights.pkl":{ label: "ML Model Weights",  size: "1.4 MB",  icon: "🤖" },
    "sample-data.csv":  { label: "Sample Data",       size: "200 KB",  icon: "📊" },
    "contract-abi.json":{ label: "Contract ABI",      size: "32 KB",   icon: "⛓" },
    "assets.zip":       { label: "Assets",            size: "1.8 MB",  icon: "🖼" },
    "templates.zip":    { label: "Templates",         size: "3.2 MB",  icon: "🎨" },
    "readme.pdf":       { label: "README",            size: "180 KB",  icon: "📘" },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "60px auto", padding: "32px", textAlign: "center" }}>
      {/* Success Icon */}
      <div style={{
        width: "72px", height: "72px",
        background: "rgba(124,58,237,0.15)", border: "1px solid var(--border2)",
        borderRadius: "20px", display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 20px", fontSize: "28px",
      }}>
        ⬇
      </div>

      <h2 style={{ fontFamily: "var(--font-head)", fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>
        Purchase Complete! 🎉
      </h2>
      <p style={{ color: "var(--text2)", fontSize: "14px", lineHeight: 1.7 }}>
        Your order <strong style={{ color: "var(--purple3)" }}>#GM-{Math.floor(10000 + Math.random() * 90000)}</strong> has been confirmed.
        Download your files below.
      </p>

      {/* Download Files */}
      <div style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "20px",
        margin: "24px 0", textAlign: "left",
      }}>
        {p.files.map(file => {
          const info = fileDetails[file] || { label: "File", size: "Unknown", icon: "📄" };
          return (
            <div key={file} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                <div style={{
                  width: "32px", height: "32px",
                  background: "rgba(124,58,237,0.1)", border: "1px solid var(--border)",
                  borderRadius: "8px", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "14px", flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 500, color: "var(--text)" }}>{file}</div>
                  <div style={{ fontSize: "11px", color: "var(--text3)" }}>{info.label} · {info.size}</div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => showToast(`Downloading ${file}...`)}
              >
                Download
              </button>
            </div>
          );
        })}
      </div>

      {/* Access Key */}
      <div style={{
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: "var(--radius-sm)", padding: "14px 18px",
        fontSize: "13px", color: "var(--success)", marginBottom: "20px", textAlign: "left",
      }}>
        ✅ These files are also saved to your account. Access them anytime from <strong>My Orders</strong>.
      </div>

      <button className="btn btn-ghost" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} onClick={() => navigate("user")}>
        View in My Orders
      </button>
      <button className="btn btn-ghost" style={{ width: "100%", padding: "10px" }} onClick={() => navigate("browse")}>
        Continue Shopping
      </button>
    </div>
  );
}