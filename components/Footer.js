import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = {
    Marketplace: [
      { label: "Browse Projects", path: "/browse" },
      { label: "Sell a Project", path: "/seller/dashboard" },
      { label: "Pricing", path: "/about#pricing" },
    ],
    Support: [
      { label: "Help Center", path: "/about" },
      { label: "Contact Us", path: "/contact" },
      { label: "Report Issue", path: "/contact" },
    ],
    Legal: [
      { label: "Terms of Service", path: "/legal" },
      { label: "Privacy Policy", path: "/legal#privacy" },
      { label: "Refund Policy", path: "/legal#refund" },
    ],
  };

  return (
    <footer
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        marginTop: 64,
        padding: "40px 0 24px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 32,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  background: "var(--accent)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                }}
              >
                &lt;/&gt;
              </span>
              <span style={{ fontWeight: 600, color: "var(--text-1)" }}>DevMarket</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, maxWidth: 240 }}>
              The #1 marketplace for ready-made developer projects and final year
              academic projects. Buy, sell, and grow.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {["GitHub", "Twitter", "Discord"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    padding: "4px 10px",
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    fontSize: 12,
                    color: "var(--text-2)",
                    textDecoration: "none",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-1)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 12,
                }}
              >
                {heading}
              </p>
              <ul style={{ listStyle: "none" }}>
                {items.map((item) => (
                  <li key={item.label} style={{ marginBottom: 8 }}>
                    <Link
                      to={item.path}
                      style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            © {new Date().getFullYear()} DevMarket. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "var(--text-3)" }}>
            Built for developers, by developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;