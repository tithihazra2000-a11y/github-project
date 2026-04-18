// pages/AdminPanel.js
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { StatusPill } from "../src/components/SharedComponents";

const SIDEBAR = [
  { id: "overview",  icon: "📊", label: "Overview",     badge: null },
  { id: "projects",  icon: "📦", label: "Projects",     badge: null },
  { id: "users",     icon: "👥", label: "Users",        badge: null },
  { id: "sellers",   icon: "🏪", label: "Sellers",      badge: null },
  { id: "orders",    icon: "💳", label: "Orders",       badge: null },
  { id: "review",    icon: "🔍", label: "Review Queue", badge: "5"  },
];

const RECENT_ORDERS = [
  { id: "#GM-29841", project: "E-Commerce AI",   buyer: "rahul_s",  amount: "₹799",   commission: "₹80",  status: "approved" },
  { id: "#GM-29840", project: "Hospital Mgmt",    buyer: "priya22",  amount: "₹599",   commission: "₹60",  status: "approved" },
  { id: "#GM-29839", project: "Chat App",         buyer: "ankit_d",  amount: "₹399",   commission: "₹40",  status: "approved" },
  { id: "#GM-29838", project: "ML Dashboard",     buyer: "varsha_k", amount: "₹999",   commission: "₹100", status: "pending"  },
  { id: "#GM-29837", project: "Blockchain Vote",  buyer: "suresh_r", amount: "₹1,299", commission: "₹130", status: "approved" },
];

const ALL_PROJECTS = [
  { name: "E-Commerce AI",    seller: "DevPro_India",  price: "₹799",   sales: 42, status: "approved" },
  { name: "Hospital Mgmt",    seller: "TechCraft",     price: "₹599",   sales: 31, status: "approved" },
  { name: "ML Dashboard",     seller: "DataWiz",       price: "₹999",   sales: 12, status: "pending"  },
  { name: "Chat App",         seller: "FullStackGuru", price: "₹399",   sales: 68, status: "approved" },
  { name: "Blockchain Vote",  seller: "Web3Dev",       price: "₹1,299", sales:  8, status: "pending"  },
  { name: "Mobile Banking",   seller: "AppForge",      price: "₹899",   sales:  0, status: "rejected" },
];

const ALL_USERS = [
  { name: "Rahul Sharma", email: "rahul@ex.com",  purchases: 6,  joined: "Jan 2025", status: "approved" },
  { name: "Priya Kumar",  email: "priya@ex.com",  purchases: 3,  joined: "Dec 2024", status: "approved" },
  { name: "Ankit Dev",    email: "ankit@ex.com",  purchases: 11, joined: "Nov 2024", status: "approved" },
  { name: "Varsha K",     email: "varsha@ex.com", purchases: 1,  joined: "Jan 2025", status: "pending"  },
  { name: "Suresh R",     email: "suresh@ex.com", purchases: 0,  joined: "Jan 2025", status: "rejected" },
];

const ALL_SELLERS = [
  { name: "DevPro_India",  projects: 12, sales: 178, revenue: "₹47,200", status: "approved" },
  { name: "TechCraft",     projects: 8,  sales: 94,  revenue: "₹28,100", status: "approved" },
  { name: "FullStackGuru", projects: 5,  sales: 68,  revenue: "₹27,132", status: "approved" },
  { name: "DataWiz",       projects: 3,  sales: 12,  revenue: "₹11,988", status: "pending"  },
  { name: "Web3Dev",       projects: 2,  sales: 8,   revenue: "₹10,392", status: "approved" },
];

const REVIEW_QUEUE = [
  { name: "ML Sales Dashboard",        seller: "DataWiz",    price: "₹999",   submitted: "Jan 18", tech: ["Python","Flask","React"]          },
  { name: "Food Delivery Clone",       seller: "AppForge",   price: "₹899",   submitted: "Jan 17", tech: ["React Native","Node"]             },
  { name: "Quiz Platform",             seller: "EduDev",     price: "₹449",   submitted: "Jan 16", tech: ["Vue.js","Express"]                },
  { name: "HR Management System",      seller: "BizSoft",    price: "₹1,199", submitted: "Jan 15", tech: ["Angular","Spring Boot"]           },
  { name: "Crypto Wallet App",         seller: "CryptoForge",price: "₹1,499", submitted: "Jan 14", tech: ["Flutter","Web3"]                  },
];

export default function AdminPanel() {
  const { showToast } = useContext(AppContext);
  const [active, setActive] = useState("overview");

  const ActionBtn = ({ color, label, onClick }) => (
    <button onClick={onClick} style={{
      background: "transparent",
      border: `1px solid ${color === "green" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
      color: color === "green" ? "var(--success)" : "#f87171",
      padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-body)",
    }}>{label}</button>
  );

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ padding: "10px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px" }}>Admin Panel</div>
          <div style={{ fontSize: "12px", color: "var(--success)" }}>● Super Admin</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Manage</div>
          {SIDEBAR.map(({ id, icon, label, badge }) => (
            <div key={id} className={`sidebar-item ${active === id ? "active" : ""}`} onClick={() => setActive(id)}>
              <span>{icon}</span>{label}
              {badge && (
                <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "99px", fontSize: "10px", padding: "1px 6px", marginLeft: "4px" }}>
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="dash-content">

        {/* OVERVIEW */}
        {active === "overview" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Platform Overview</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "28px" }}>
              {[["2,438","purple","Total Projects"],["₹8.4L","green","Total Revenue"],["5","yellow","Pending Review"],["18,240","purple","Total Users"],["940","green","Active Sellers"],["12","red","Reported Issues"]].map(([v, c, l]) => (
                <div key={l} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: "4px", color: c === "purple" ? "var(--purple3)" : c === "green" ? "var(--success)" : c === "yellow" ? "var(--warning)" : "var(--danger)" }}>{v}</div>
                  <div style={{ color: "var(--text3)", fontSize: "12px" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>Recent Transactions</div>
              <table className="table">
                <thead><tr><th>Order ID</th><th>Project</th><th>Buyer</th><th>Amount</th><th>Commission</th><th>Status</th></tr></thead>
                <tbody>
                  {RECENT_ORDERS.map((o, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--purple3)" }}>{o.id}</td>
                      <td style={{ color: "var(--text)" }}>{o.project}</td>
                      <td>{o.buyer}</td>
                      <td style={{ color: "var(--success)" }}>{o.amount}</td>
                      <td style={{ color: "var(--warning)" }}>{o.commission}</td>
                      <td><StatusPill status={o.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* PROJECTS */}
        {active === "projects" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Manage Projects</div>
            <table className="table">
              <thead><tr><th>Project</th><th>Seller</th><th>Price</th><th>Sales</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {ALL_PROJECTS.map((p, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text)" }}>{p.name}</td>
                    <td style={{ color: "var(--purple3)" }}>{p.seller}</td>
                    <td>{p.price}</td><td>{p.sales}</td>
                    <td><StatusPill status={p.status} /></td>
                    <td style={{ display: "flex", gap: "6px" }}>
                      <ActionBtn color="green" label="✓" onClick={() => showToast("Project approved!")} />
                      <ActionBtn color="red"   label="✕" onClick={() => showToast("Project removed!")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* USERS */}
        {active === "users" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Manage Users</div>
            <table className="table">
              <thead><tr><th>User</th><th>Email</th><th>Purchases</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {ALL_USERS.map((u, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text)" }}>{u.name}</td>
                    <td>{u.email}</td><td>{u.purchases}</td><td>{u.joined}</td>
                    <td><StatusPill status={u.status} /></td>
                    <td><ActionBtn color="red" label="Suspend" onClick={() => showToast("User suspended!")} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* SELLERS */}
        {active === "sellers" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Manage Sellers</div>
            <table className="table">
              <thead><tr><th>Seller</th><th>Projects</th><th>Total Sales</th><th>Revenue</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {ALL_SELLERS.map((s, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--purple3)" }}>{s.name}</td>
                    <td>{s.projects}</td><td>{s.sales}</td>
                    <td style={{ color: "var(--success)" }}>{s.revenue}</td>
                    <td><StatusPill status={s.status} /></td>
                    <td><ActionBtn color="green" label="Verify" onClick={() => showToast("Seller verified!")} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ORDERS */}
        {active === "orders" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>All Orders</div>
            <table className="table">
              <thead><tr><th>Order ID</th><th>Buyer</th><th>Project</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {RECENT_ORDERS.concat(RECENT_ORDERS).map((o, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--purple3)" }}>#GM-{29841 - i}</td>
                    <td>{o.buyer}</td>
                    <td style={{ color: "var(--text)" }}>{o.project}</td>
                    <td style={{ color: "var(--success)" }}>{o.amount}</td>
                    <td>{i === 0 ? "Today" : i === 1 ? "Yesterday" : `${i}d ago`}</td>
                    <td><StatusPill status={i < 7 ? "approved" : "pending"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* REVIEW QUEUE */}
        {active === "review" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>
              Review Queue{" "}
              <span style={{ background: "var(--danger)", color: "#fff", borderRadius: "99px", fontSize: "12px", padding: "2px 8px", marginLeft: "8px" }}>
                {REVIEW_QUEUE.length} pending
              </span>
            </div>
            {REVIEW_QUEUE.map((r, i) => (
              <div key={i} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--text)" }}>{r.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text3)" }}>
                      by <span style={{ color: "var(--purple3)" }}>{r.seller}</span> · {r.price} · Submitted {r.submitted}
                    </div>
                    <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {r.tech.map(t => (
                        <span key={t} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "2px 8px", fontSize: "11px", color: "var(--text2)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-success btn-sm" onClick={() => showToast("Project approved!")}>✓ Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => showToast("Project rejected!")}>✕ Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}