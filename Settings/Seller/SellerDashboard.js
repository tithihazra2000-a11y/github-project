import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sellerProjects } from "../../data/mockData";

// ─── Upload Project Sub-Page ──────────────────────────────────────────────────
export const UploadProject = () => {
  const navigate = useNavigate();
  const [step, setStep]   = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]   = useState({
    title: "", category: "", type: "", level: "", price: "",
    description: "", tech: "", pages: "", github: "", demo: "",
  });
  const [files, setFiles] = useState({ zip: null, doc: null, thumb: null });
  const [errors, setErrors] = useState({});

  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.category)     e.category = "Select a category";
    if (!form.type)         e.type = "Select project type";
    if (!form.level)        e.level = "Select level";
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = "Enter a valid price";
    if (form.description.length < 80) e.description = "Description must be at least 80 characters";
    return e;
  };

  const handleNext = () => {
    if (step === 1) {
      const e = validate();
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "64px 24px" }}>
        <div
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(63,185,80,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28, color: "var(--green)",
          }}
        >✓</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Project Submitted!</h2>
        <p style={{ color: "var(--text-2)", marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
          Your project has been submitted for review. Our team will review it within 24–48 hours.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn btn-outline" onClick={() => navigate("/seller/status")}>
            View Status
          </button>
          <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm({ title:"",category:"",type:"",level:"",price:"",description:"",tech:"",pages:"",github:"",demo:"" }); }}>
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  const stepLabels = ["Project Info", "Files", "Review"];

  return (
    <div style={{ maxWidth: 600 }}>
      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {stepLabels.map((label, i) => {
          const n = i + 1;
          const done = step > n; const active = step === n;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: done ? "var(--green)" : active ? "var(--accent)" : "var(--bg-hover)",
                  border: `2px solid ${done ? "var(--green)" : active ? "var(--accent)" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600,
                  color: done || active ? "#fff" : "var(--text-3)",
                }}>
                  {done ? "✓" : n}
                </div>
                <span style={{ fontSize: 13, color: active ? "var(--text-1)" : "var(--text-2)", fontWeight: active ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > n ? "var(--green)" : "var(--border)", margin: "0 10px" }} />}
            </div>
          );
        })}
      </div>

      {/* Step 1 – Project Info */}
      {step === 1 && (
        <div>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input className="input" placeholder="e.g. E-Commerce Platform (MERN Stack)" value={form.title} onChange={(e) => update("title", e.target.value)} />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="select" value={form.category} onChange={(e) => update("category", e.target.value)}>
                <option value="">Select...</option>
                {["Web Development","Mobile","Machine Learning","Blockchain","Healthcare","Management System","Productivity"].map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.category && <p className="form-error">{errors.category}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Project Type *</label>
              <select className="select" value={form.type} onChange={(e) => update("type", e.target.value)}>
                <option value="">Select...</option>
                <option>Ready-Made</option>
                <option>Final Year Project</option>
              </select>
              {errors.type && <p className="form-error">{errors.type}</p>}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label className="form-label">Level *</label>
              <select className="select" value={form.level} onChange={(e) => update("level", e.target.value)}>
                <option value="">Select...</option>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
              {errors.level && <p className="form-error">{errors.level}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input className="input" type="number" placeholder="499" value={form.price} onChange={(e) => update("price", e.target.value)} />
              {errors.price && <p className="form-error">{errors.price}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Pages / Screens</label>
              <input className="input" type="number" placeholder="24" value={form.pages} onChange={(e) => update("pages", e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Technologies Used</label>
            <input className="input" placeholder="React, Node.js, MongoDB (comma-separated)" value={form.tech} onChange={(e) => update("tech", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Description * <span style={{ color: "var(--text-3)", fontWeight: 400 }}>({form.description.length}/80 min)</span></label>
            <textarea
              className="textarea"
              rows={5}
              placeholder="Describe your project in detail: features, tech stack, what's included, use-cases..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="form-group">
              <label className="form-label">GitHub Repo URL</label>
              <input className="input" placeholder="https://github.com/..." value={form.github} onChange={(e) => update("github", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input className="input" placeholder="https://demo.example.com" value={form.demo} onChange={(e) => update("demo", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Step 2 – Files */}
      {step === 2 && (
        <div>
          {[
            { key: "zip",   label: "Source Code (ZIP) *",  accept: ".zip,.rar", hint: "Upload your complete project as a ZIP file" },
            { key: "doc",   label: "Documentation (PDF)",  accept: ".pdf",      hint: "Setup guide, ER diagrams, API docs" },
            { key: "thumb", label: "Thumbnail Image",      accept: ".jpg,.png", hint: "Project screenshot (recommended 800×500)" },
          ].map((f) => (
            <div key={f.key} className="form-group">
              <label className="form-label">{f.label}</label>
              <div
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "var(--transition)",
                  background: files[f.key] ? "rgba(47,129,247,0.05)" : "transparent",
                  borderColor: files[f.key] ? "var(--accent)" : "var(--border)",
                }}
                onClick={() => document.getElementById(`file-${f.key}`).click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) setFiles((prev) => ({ ...prev, [f.key]: file }));
                }}
              >
                <input
                  id={`file-${f.key}`}
                  type="file"
                  accept={f.accept}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setFiles((prev) => ({ ...prev, [f.key]: file }));
                  }}
                />
                {files[f.key] ? (
                  <p style={{ color: "var(--green)", fontSize: 13 }}>✓ {files[f.key].name}</p>
                ) : (
                  <>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                      Drop file here or click to browse
                    </p>
                    <p style={{ fontSize: 12, color: "var(--text-3)" }}>{f.hint}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3 – Review */}
      {step === 3 && (
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Project Details</h3>
            {[
              { label: "Title", val: form.title || "—" },
              { label: "Category", val: form.category || "—" },
              { label: "Type", val: form.type || "—" },
              { label: "Level", val: form.level || "—" },
              { label: "Price", val: form.price ? `₹${form.price}` : "—" },
              { label: "Technologies", val: form.tech || "—" },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 13 }}>
                <span style={{ color: "var(--text-2)", width: 100, flexShrink: 0 }}>{row.label}</span>
                <span style={{ color: "var(--text-1)" }}>{row.val}</span>
              </div>
            ))}
          </div>
          <div className="alert alert-info" style={{ fontSize: 13 }}>
            Your project will be reviewed by our team within 24–48 hours. You'll be notified by email once approved or if changes are requested.
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        {step > 1 && <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>← Back</button>}
        {step < 3 && <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={handleNext}>Continue →</button>}
        {step === 3 && <button className="btn btn-success" style={{ marginLeft: "auto" }} onClick={handleSubmit}>Submit for Review</button>}
      </div>
    </div>
  );
};

// ─── Project Status Sub-Page ──────────────────────────────────────────────────
export const ProjectStatus = () => {
  const statusBadge = { approved: "badge-green", pending: "badge-orange", rejected: "badge-red" };
  const statusLabel = { approved: "Approved", pending: "Under Review", rejected: "Rejected" };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Projects", val: sellerProjects.length, color: "var(--text-1)" },
          { label: "Approved", val: sellerProjects.filter((p) => p.status === "approved").length, color: "var(--green)" },
          { label: "Pending", val: sellerProjects.filter((p) => p.status === "pending").length, color: "var(--orange)" },
          { label: "Total Revenue", val: `₹${sellerProjects.reduce((s, p) => s + p.revenue, 0).toLocaleString("en-IN")}`, color: "var(--accent)" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ color: s.color, fontSize: 22 }}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Views</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {sellerProjects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span style={{ fontWeight: 500 }}>{p.title}</span>
                    {p.rejectReason && (
                      <p style={{ fontSize: 11, color: "var(--red)", marginTop: 2 }}>
                        ↳ {p.rejectReason}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${statusBadge[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td>₹{p.price}</td>
                  <td>{p.sales}</td>
                  <td style={{ color: "var(--green)", fontWeight: 500 }}>
                    {p.revenue > 0 ? `₹${p.revenue.toLocaleString("en-IN")}` : "—"}
                  </td>
                  <td>{p.views || "—"}</td>
                  <td style={{ color: "var(--text-2)" }}>{p.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Seller Dashboard Shell ───────────────────────────────────────────────────
const SellerDashboard = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isUpload  = location.pathname.includes("upload");
  const isStatus  = location.pathname.includes("status");
  const activeTab = isUpload ? "upload" : isStatus ? "status" : "overview";

  const totalRevenue = sellerProjects.reduce((s, p) => s + p.revenue, 0);
  const totalSales   = sellerProjects.reduce((s, p) => s + p.sales, 0);

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 className="page-title">Seller Dashboard</h1>
          <p className="page-subtitle">Manage your projects and track earnings</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/seller/upload")}>
          + Upload Project
        </button>
      </div>

      {/* Overview Stats */}
      {activeTab === "overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            { label: "Total Revenue", val: `₹${totalRevenue.toLocaleString("en-IN")}`, sub: "Lifetime earnings", color: "var(--accent)" },
            { label: "Total Sales", val: totalSales, sub: "All-time purchases", color: "var(--green)" },
            { label: "Projects", val: sellerProjects.length, sub: `${sellerProjects.filter((p) => p.status === "approved").length} approved`, color: "var(--text-1)" },
            { label: "Avg Rating", val: "4.7 ★", sub: "Across all projects", color: "var(--orange)" },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value" style={{ color: s.color, fontSize: 22 }}>{s.val}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab Bar */}
      <div className="tab-bar">
        {[
          { key: "overview", label: "Overview", path: "/seller/dashboard" },
          { key: "upload",   label: "Upload Project", path: "/seller/upload" },
          { key: "status",   label: "My Projects", path: "/seller/status" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === "overview" && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Recent Projects</h3>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProjects.slice(0, 4).map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.title}</td>
                      <td>
                        <span className={`badge ${p.status === "approved" ? "badge-green" : p.status === "pending" ? "badge-orange" : "badge-red"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>{p.sales}</td>
                      <td style={{ color: "var(--green)", fontWeight: 500 }}>
                        {p.revenue > 0 ? `₹${p.revenue.toLocaleString("en-IN")}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "upload" && <UploadProject />}
      {activeTab === "status" && <ProjectStatus />}
    </div>
  );
};

export default SellerDashboard;