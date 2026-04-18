import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/mockData";

const mockReviews = [
  { user: "Rahul S.", avatar: "RS", rating: 5, comment: "Excellent project! Documentation was very clear and setup was smooth. Saved me weeks of work.", date: "2024-03-20" },
  { user: "Priya M.", avatar: "PM", rating: 5, comment: "Perfect for my final year submission. Code is clean and well-commented. Highly recommend!", date: "2024-03-10" },
  { user: "Arjun K.", avatar: "AK", rating: 4, comment: "Very good project. Had a minor issue with environment setup but seller replied quickly and helped resolve.", date: "2024-02-28" },
];

const ProjectDetail = ({ onAddToCart, cart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project  = projects.find((p) => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) {
    return (
      <div className="container empty-state" style={{ paddingTop: 80 }}>
        <p className="empty-title">Project not found</p>
        <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => navigate("/browse")}>
          ← Back to Browse
        </button>
      </div>
    );
  }

  const inCart    = cart?.some((c) => c.id === project.id);
  const discount  = Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100);
  const related   = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

  const features = [
    "Full source code with comments",
    "Step-by-step setup documentation",
    "Database schema & ER diagram",
    "API documentation",
    "Testing files included",
    "Free support for 30 days",
    "Lifetime updates",
    "Commercial license",
  ];

  const techDetails = [
    { label: "Frontend", value: project.tech.slice(0, 2).join(", ") },
    { label: "Backend", value: project.tech.slice(2, 4).join(", ") || "N/A" },
    { label: "Database", value: project.tech.find((t) => ["MongoDB", "PostgreSQL", "MySQL", "Redis"].includes(t)) || "Included" },
    { label: "Pages / Screens", value: `${project.pages}` },
    { label: "Difficulty", value: project.level },
    { label: "Project Type", value: project.type },
    { label: "Last Updated", value: new Date(project.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) },
    { label: "License", value: "Single Use" },
  ];

  return (
    <div style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, color: "var(--text-2)", marginBottom: 24 }}>
          <span style={{ cursor: "pointer", color: "var(--accent)" }} onClick={() => navigate("/")}>Home</span>
          <span>/</span>
          <span style={{ cursor: "pointer", color: "var(--accent)" }} onClick={() => navigate("/browse")}>Browse</span>
          <span>/</span>
          <span>{project.title}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
          {/* ── Left Column ─────────────────────────────── */}
          <div>
            {/* Thumbnail */}
            <div
              style={{
                height: 280,
                background: "linear-gradient(135deg, var(--bg-hover) 0%, var(--accent-dim) 100%)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                position: "relative",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 48, color: "var(--accent)", opacity: 0.6 }}>
                {"</>"}
              </span>
              {project.badge && (
                <span className={`badge badge-orange`} style={{ position: "absolute", top: 16, left: 16 }}>
                  {project.badge}
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="tab-bar">
              {["overview", "tech", "reviews"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "reviews" && ` (${mockReviews.length})`}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{project.title}</h1>
                <p style={{ color: "var(--text-2)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  {project.longDescription}
                </p>

                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>What's Included</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 24,
                  }}
                >
                  {features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                      <span style={{ color: "var(--green)", fontWeight: 600 }}>✓</span>
                      <span style={{ color: "var(--text-2)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Technologies Used</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag" style={{ fontSize: 12, padding: "4px 12px" }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Tab */}
            {activeTab === "tech" && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Technical Specifications</h2>
                <div className="card">
                  <table style={{ width: "100%" }}>
                    <tbody>
                      {techDetails.map((row) => (
                        <tr key={row.label}>
                          <td style={{ width: "40%", color: "var(--text-2)", fontWeight: 500 }}>{row.label}</td>
                          <td style={{ fontFamily: row.label === "Pages / Screens" ? "var(--font-mono)" : "inherit" }}>
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                {/* Summary */}
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    padding: "20px 24px",
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    marginBottom: 24,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 48, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                      {project.rating}
                    </div>
                    <div className="stars" style={{ fontSize: 16, marginTop: 4 }}>
                      {"★".repeat(Math.floor(project.rating))}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 4 }}>
                      {project.reviews} reviews
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map((s) => {
                      const pct = s === 5 ? 72 : s === 4 ? 20 : s === 3 ? 6 : s === 2 ? 2 : 0;
                      return (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: "var(--text-2)", width: 8 }}>{s}</span>
                          <span className="stars" style={{ fontSize: 11 }}>★</span>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                          </div>
                          <span style={{ fontSize: 12, color: "var(--text-3)", width: 28 }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {mockReviews.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 0",
                      borderBottom: i < mockReviews.length - 1 ? "1px solid var(--border-soft)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div className="avatar">{r.avatar}</div>
                        <div>
                          <p style={{ fontWeight: 500, fontSize: 13 }}>{r.user}</p>
                          <span className="stars" style={{ fontSize: 12 }}>{"★".repeat(r.rating)}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--text-3)" }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Column – Purchase Card ─────────────── */}
          <div style={{ position: "sticky", top: 80 }}>
            <div
              className="card"
              style={{ padding: 24 }}
            >
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: "var(--accent)" }}>
                  ₹{project.price}
                </span>
                <span style={{ fontSize: 16, color: "var(--text-3)", textDecoration: "line-through", marginLeft: 8 }}>
                  ₹{project.originalPrice}
                </span>
                <span
                  style={{
                    marginLeft: 8,
                    background: "rgba(63,185,80,0.15)",
                    color: "var(--green)",
                    fontSize: 12,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 600,
                  }}
                >
                  {discount}% OFF
                </span>
              </div>

              <button
                className="btn btn-primary btn-lg"
                style={{ width: "100%", marginBottom: 10, justifyContent: "center" }}
                onClick={() => {
                  if (!inCart) onAddToCart?.(project);
                  navigate("/checkout");
                }}
              >
                {inCart ? "Proceed to Checkout →" : "Buy Now"}
              </button>

              <button
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}
                onClick={() => !inCart && onAddToCart?.(project)}
                disabled={inCart}
              >
                {inCart ? "✓ Added to Cart" : "+ Add to Cart"}
              </button>

              <hr className="divider" />

              {/* Project Meta */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "◈", label: "Category", val: project.category },
                  { icon: "⬢", label: "Level", val: project.level },
                  { icon: "▤", label: "Pages/Screens", val: project.pages },
                  { icon: "↓", label: "Downloads", val: project.downloads },
                  { icon: "★", label: "Rating", val: `${project.rating} (${project.reviews})` },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--text-2)" }}>
                      <span style={{ marginRight: 6 }}>{row.icon}</span>
                      {row.label}
                    </span>
                    <span style={{ fontWeight: 500 }}>{row.val}</span>
                  </div>
                ))}
              </div>

              <hr className="divider" />

              {/* Seller */}
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div className="avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                  {project.sellerAvatar}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{project.seller}</p>
                  <p style={{ fontSize: 12, color: "var(--text-2)" }}>Verified Seller</p>
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  padding: "12px",
                  background: "rgba(63,185,80,0.07)",
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(63,185,80,0.2)",
                }}
              >
                <p style={{ fontSize: 12, color: "var(--green)", textAlign: "center" }}>
                  🔒 Secure Payment · Instant Download
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Related Projects</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
              }}
            >
              {related.map((p) => (
                <div
                  key={p.id}
                  className="card"
                  style={{ cursor: "pointer", padding: 16 }}
                  onClick={() => navigate(`/project/${p.id}`)}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "var(--accent-dim)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      &lt;/&gt;
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="stars" style={{ fontSize: 11 }}>{"★".repeat(Math.floor(p.rating))}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>₹{p.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;