// pages/UserDashboard.js
import React, { useState, useContext } from "react";
import { AppContext } from "../App";

const PURCHASES = [
  { title: "E-Commerce AI Platform",    seller: "DevPro_India",  price: "₹799",   date: "Jan 15, 2025", tech: "React, Node.js"   },
  { title: "Hospital Mgmt System",      seller: "TechCraft",     price: "₹599",   date: "Jan 10, 2025", tech: "PHP, MySQL"       },
  { title: "Real-time Chat App",        seller: "FullStackGuru", price: "₹399",   date: "Jan 5, 2025",  tech: "Socket.io, React" },
  { title: "ML Dashboard",             seller: "DataWiz",       price: "₹999",   date: "Dec 28, 2024", tech: "Python, Flask"    },
  { title: "Blockchain Voting",         seller: "Web3Dev",       price: "₹1,299", date: "Dec 20, 2024", tech: "Solidity, React"  },
  { title: "Portfolio Template",        seller: "UIKing",        price: "₹199",   date: "Dec 15, 2024", tech: "HTML, CSS, JS"    },
];

const WISHLIST = [
  { title: "Fitness Tracker App",    seller: "MobilePro", price: "₹649" },
  { title: "AI Resume Builder",      seller: "DevStar",   price: "₹449" },
  { title: "Food Delivery Clone",    seller: "AppForge",  price: "₹899" },
];

export default function UserDashboard() {
  const { navigate, showToast } = useContext(AppContext);
  const [tab, setTab] = useState("purchases");

  return (
    <div className="section">
      {/* Profile Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
        <div style={{
          width: "56px", height: "56px",
          background: "rgba(124,58,237,0.15)", border: "2px solid var(--border2)",
          borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "22px",
        }}>👤</div>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800 }}>Rahul Sharma</div>
          <div style={{ color: "var(--text3)", fontSize: "13px" }}>rahul@example.com · Member since Jan 2025</div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => navigate("seller")}>
          Become a Seller →
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          { id: "purchases", label: `📦 My Purchases (${PURCHASES.length})` },
          { id: "wishlist",  label: `❤ Wishlist (${WISHLIST.length})` },
          { id: "reviews",   label: "⭐ My Reviews" },
          { id: "settings",  label: "⚙ Settings" },
        ].map(({ id, label }) => (
          <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
            {label}
          </div>
        ))}
      </div>

      {/* PURCHASES */}
      {tab === "purchases" && (
        <div>
          {PURCHASES.map((p, i) => (
            <div key={i} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "18px",
              display: "flex", gap: "16px", alignItems: "center",
              marginBottom: "12px", flexWrap: "wrap",
            }}>
              <div style={{
                width: "52px", height: "52px",
                background: "rgba(124,58,237,0.12)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "20px", flexShrink: 0,
              }}>💻</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{p.title}</div>
                <div style={{ color: "var(--text3)", fontSize: "12px" }}>
                  by {p.seller} · {p.price} · Purchased {p.date} ·{" "}
                  <span style={{ color: "var(--purple3)" }}>{p.tech}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="btn btn-primary btn-sm" onClick={() => { navigate("download"); showToast("Downloading files..."); }}>
                  ⬇ Download
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast("Review submitted!")}>
                  ★ Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WISHLIST */}
      {tab === "wishlist" && (
        <div>
          {WISHLIST.map((p, i) => (
            <div key={i} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "18px",
              display: "flex", gap: "16px", alignItems: "center", marginBottom: "12px",
            }}>
              <div style={{ width: "52px", height: "52px", background: "rgba(124,58,237,0.12)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>💜</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{p.title}</div>
                <div style={{ color: "var(--text3)", fontSize: "12px" }}>by {p.seller} · {p.price}</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="btn btn-primary btn-sm" onClick={() => navigate("checkout")}>Buy Now</button>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast("Removed from wishlist")}>✕ Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REVIEWS */}
      {tab === "reviews" && (
        <div style={{ color: "var(--text2)", padding: "40px", textAlign: "center" }}>
          No reviews yet. Purchase and review a project to see them here!
        </div>
      )}

      {/* SETTINGS */}
      {tab === "settings" && (
        <div style={{ maxWidth: "560px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px" }}>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "16px", marginBottom: "20px" }}>Account Settings</div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" defaultValue="Rahul Sharma" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue="rahul@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" defaultValue="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input className="form-input" type="password" placeholder="••••••••" />
          </div>
          <button className="btn btn-primary" onClick={() => showToast("Settings saved!")}>Save Changes</button>
        </div>
      )}
    </div>
  );
}