// components/Navbar.js
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Navbar({ currentPage }) {
  const { navigate } = useContext(AppContext);

  return (
    <nav style={{
      background: "var(--bg)",
      borderBottom: "1px solid var(--border)",
      padding: "0 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate("home")}
        style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span style={{ width: 8, height: 8, background: "var(--purple2)", borderRadius: "50%", display: "inline-block" }} />
        GitMarket
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {[
          { label: "Browse",  page: "browse" },
          { label: "Sell",    page: "seller" },
          { label: "About",   page: "about"  },
          { label: "Contact", page: "contact"},
        ].map(({ label, page }) => (
          <button
            key={page}
            className={`nav-link ${currentPage === page ? "active" : ""}`}
            onClick={() => navigate(page)}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-sm)",
              color: currentPage === page ? "var(--purple3)" : "var(--text2)",
              background: currentPage === page ? "rgba(124,58,237,0.12)" : "transparent",
              cursor: "pointer",
              fontSize: "13px",
              border: "none",
              fontFamily: "var(--font-body)",
              transition: "all .18s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("user")}>My Orders</button>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("admin")}>Admin</button>
      </div>
    </nav>
  );
}