// pages/SellerDashboard.js
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { StatusPill } from "../components/SharedComponents";

const SIDEBAR = [
  { id: "overview",  icon: "📊", label: "Overview"        },
  { id: "projects",  icon: "📦", label: "My Projects"     },
  { id: "earnings",  icon: "💰", label: "Earnings"        },
  { id: "upload",    icon: "⬆", label: "Upload Project"  },
  { id: "status",    icon: "📋", label: "Status"          },
];

const RECENT_SALES = [
  { project: "E-Commerce AI",  buyer: "rahul_s",  amount: "₹799",   date: "Today",     status: "approved" },
  { project: "Hospital Mgmt",  buyer: "priya22",  amount: "₹599",   date: "Yesterday", status: "approved" },
  { project: "Chat App",       buyer: "ankit_dev",amount: "₹399",   date: "2d ago",    status: "approved" },
  { project: "ML Dashboard",   buyer: "varsha_k", amount: "₹999",   date: "3d ago",    status: "pending"  },
  { project: "Blockchain Vote",buyer: "suresh_r", amount: "₹1,299", date: "5d ago",    status: "approved" },
];

const MY_PROJECTS = [
  { name: "E-Commerce AI Platform",    price: "₹799",   sales: 42, revenue: "₹33,558", status: "approved" },
  { name: "Hospital Mgmt System",      price: "₹599",   sales: 31, revenue: "₹18,569", status: "approved" },
  { name: "Real-time Chat App",        price: "₹399",   sales: 68, revenue: "₹27,132", status: "approved" },
  { name: "ML Sales Dashboard",        price: "₹999",   sales: 12, revenue: "₹11,988", status: "pending"  },
  { name: "Blockchain Voting",         price: "₹1,299", sales:  8, revenue: "₹10,392", status: "approved" },
  { name: "Mobile Banking App",        price: "₹899",   sales:  0, revenue: "₹0",      status: "rejected" },
];

const WITHDRAWALS = [
  { date: "Jan 15, 2025",  amount: "₹8,000",  method: "Bank Transfer", status: "approved" },
  { date: "Dec 30, 2024",  amount: "₹12,500", method: "UPI",           status: "approved" },
  { date: "Dec 10, 2024",  amount: "₹7,250",  method: "Bank Transfer", status: "approved" },
  { date: "Nov 28, 2024",  amount: "₹7,000",  method: "Bank Transfer", status: "approved" },
];

const SUBMISSION_STATUS = [
  { name: "ML Sales Dashboard",     date: "Submitted Jan 18", status: "pending",  msg: "🔍 Our team is reviewing your project. Usually 24–48 hrs." },
  { name: "Mobile Banking App",     date: "Submitted Jan 10", status: "rejected", msg: "❌ Reason: Incomplete documentation. Please re-upload with full README." },
  { name: "E-Commerce AI",          date: "Submitted Dec 20", status: "approved", msg: "✅ Live and earning! 42 sales so far." },
  { name: "Hospital Mgmt",          date: "Submitted Dec 15", status: "approved", msg: "✅ Live and earning! 31 sales so far." },
];

export default function SellerDashboard() {
  const { showToast } = useContext(AppContext);
  const [active, setActive] = useState("overview");
  const [tags, setTags] = useState(["React", "Node.js", "MongoDB"]);
  const [tagInput, setTagInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ padding: "10px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px" }}>DevPro_India</div>
          <div style={{ fontSize: "12px", color: "var(--success)" }}>Pro Seller ✦</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Dashboard</div>
          {SIDEBAR.map(({ id, icon, label }) => (
            <div key={id} className={`sidebar-item ${active === id ? "active" : ""}`} onClick={() => setActive(id)}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Account</div>
          <div className="sidebar-item"><span>⚙</span>Settings</div>
          <div className="sidebar-item"><span>💳</span>Payouts</div>
        </div>
      </div>

      {/* Content */}
      <div className="dash-content">

        {/* OVERVIEW */}
        {active === "overview" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Dashboard Overview</div>
            <div className="metrics-grid">
              {[["Total Revenue","₹47,200","green","↑ 12% this month"],["Total Sales","284","purple","↑ 8 this week"],["Listed Projects","12","","2 pending review"],["Avg Rating","4.8 ★","yellow","From 128 reviews"]].map(([l,v,c,sub]) => (
                <div key={l} className="metric-card">
                  <div className="metric-label">{l}</div>
                  <div className={`metric-val ${c}`}>{v}</div>
                  <div className="metric-change">{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "16px" }}>Recent Sales</div>
              <table className="table">
                <thead><tr><th>Project</th><th>Buyer</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {RECENT_SALES.map((s, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--text)" }}>{s.project}</td>
                      <td>{s.buyer}</td>
                      <td style={{ color: "var(--success)", fontWeight: 600 }}>{s.amount}</td>
                      <td>{s.date}</td>
                      <td><StatusPill status={s.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MY PROJECTS */}
        {active === "projects" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>My Projects</div>
            <table className="table">
              <thead><tr><th>Project Name</th><th>Price</th><th>Sales</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {MY_PROJECTS.map((p, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text)" }}>{p.name}</td>
                    <td style={{ color: "var(--purple3)" }}>{p.price}</td>
                    <td>{p.sales}</td>
                    <td style={{ color: "var(--success)" }}>{p.revenue}</td>
                    <td><StatusPill status={p.status} /></td>
                    <td>
                      <button className="action-btn" style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text2)", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-body)" }} onClick={() => showToast("Editing project...")}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* EARNINGS */}
        {active === "earnings" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Earnings</div>
            <div className="metrics-grid">
              {[["Available Balance","₹12,450","green"],["Total Earned","₹47,200","purple"],["Withdrawn","₹34,750",""],["Pending","₹0","yellow"]].map(([l,v,c]) => (
                <div key={l} className="metric-card"><div className="metric-label">{l}</div><div className={`metric-val ${c}`}>{v}</div></div>
              ))}
            </div>
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px" }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "16px" }}>Withdrawal History</div>
              <table className="table">
                <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                <tbody>
                  {WITHDRAWALS.map((w, i) => (
                    <tr key={i}>
                      <td>{w.date}</td>
                      <td style={{ color: "var(--success)", fontWeight: 600 }}>{w.amount}</td>
                      <td>{w.method}</td>
                      <td><StatusPill status={w.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary" style={{ marginTop: "16px" }} onClick={() => showToast("Withdrawal request submitted!")}>
                Request Withdrawal
              </button>
            </div>
          </>
        )}

        {/* UPLOAD */}
        {active === "upload" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Upload Project</div>
            <div style={{ maxWidth: "700px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px" }}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input className="form-input" type="text" placeholder="e.g. E-Commerce Platform with AI" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input">
                    <option>Web Apps</option><option>Mobile</option><option>ML/AI</option>
                    <option>Final Year</option><option>Blockchain</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input className="form-input" type="number" placeholder="499" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows={4} placeholder="Describe your project, features, and tech stack..." style={{ resize: "vertical" }} />
              </div>
              <div className="form-group">
                <label className="form-label">Tech Stack Tags</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "8px" }}>
                  {tags.map((t, i) => (
                    <span key={i} style={{ background: "rgba(124,58,237,0.15)", color: "var(--purple3)", border: "1px solid var(--border)", borderRadius: "4px", padding: "3px 10px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                      {t} <span style={{ cursor: "pointer", opacity: .6 }} onClick={() => removeTag(i)}>×</span>
                    </span>
                  ))}
                  <input type="text" placeholder="Add tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
                    style={{ background: "none", border: "none", color: "var(--text)", outline: "none", fontFamily: "var(--font-body)", fontSize: "13px", flex: 1, minWidth: "80px" }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Upload Project Files</label>
                <div
                  style={{ border: "2px dashed var(--border2)", borderRadius: "var(--radius)", padding: "40px", textAlign: "center", cursor: "pointer", transition: "all .2s" }}
                  onClick={() => showToast("File picker opened!")}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>📁</div>
                  <div style={{ color: "var(--text2)", fontSize: "14px" }}>Drag & drop your ZIP file here or <span style={{ color: "var(--purple3)" }}>browse to upload</span></div>
                  <div style={{ fontSize: "12px", color: "var(--text3)", marginTop: "6px" }}>Max 50MB · ZIP, RAR supported</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Demo Video URL (optional)</label>
                <input className="form-input" type="url" placeholder="https://youtube.com/..." />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Repo (optional)</label>
                <input className="form-input" type="url" placeholder="https://github.com/..." />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: "15px" }} onClick={() => showToast("Project submitted for review! ✓")}>
                Submit for Review
              </button>
            </div>
          </>
        )}

        {/* STATUS */}
        {active === "status" && (
          <>
            <div style={{ fontFamily: "var(--font-head)", fontSize: "22px", fontWeight: 800, marginBottom: "20px" }}>Submission Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SUBMISSION_STATUS.map((s, i) => (
                <div key={i} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--text3)" }}>{s.date}</div>
                    </div>
                    <StatusPill status={s.status} />
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text2)" }}>{s.msg}</div>
                  {s.status === "rejected" && (
                    <button className="btn btn-ghost btn-sm" style={{ marginTop: "10px" }} onClick={() => setActive("upload")}>Re-upload</button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}