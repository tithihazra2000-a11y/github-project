import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { projects, categories } from "../data/mockData";
import ProjectCard from "../components/ProjectCard";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const TYPES = ["All", "Ready-Made", "Final Year Project"];
const PRICE_RANGES = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 – ₹600", min: 300, max: 600 },
  { label: "₹600 – ₹900", min: 600, max: 900 },
  { label: "Above ₹900", min: 900, max: Infinity },
];

const BrowseProjects = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch]           = useState(searchParams.get("q") || "");
  const [category, setCategory]       = useState(searchParams.get("category") || "All");
  const [sort, setSort]               = useState("popular");
  const [level, setLevel]             = useState("All");
  const [type, setType]               = useState("All");
  const [priceIdx, setPriceIdx]       = useState(0);
  const [page, setPage]               = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  // ── Filter ──
  let filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);

    const matchCat  = category === "All" || p.category === category;
    const matchLvl  = level === "All"    || p.level === level;
    const matchType = type === "All"     || p.type === type;
    const pr        = PRICE_RANGES[priceIdx];
    const matchPrice = p.price >= pr.min && p.price < pr.max;

    return matchSearch && matchCat && matchLvl && matchType && matchPrice;
  });

  // ── Sort ──
  filtered = [...filtered].sort((a, b) => {
    if (sort === "newest")     return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "price_asc")  return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating")     return b.rating - a.rating;
    return b.downloads - a.downloads; // popular
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => {
    setSearch(""); setCategory("All"); setLevel("All");
    setType("All"); setPriceIdx(0); setSort("popular"); setPage(1);
    setSearchParams({});
  };

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-3)"
            strokeWidth="2"
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="input"
            placeholder="Search by name, tech, category..."
            style={{ paddingLeft: 32 }}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="select"
          style={{ width: 180 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span style={{ fontSize: 13, color: "var(--text-2)", whiteSpace: "nowrap" }}>
          {filtered.length} results
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 28, alignItems: "start" }}>
        {/* ── Sidebar Filters ─────────────────────────── */}
        <aside
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: 20,
            position: "sticky",
            top: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 14 }}>Filters</span>
            <button
              onClick={resetFilters}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Reset
            </button>
          </div>

          {/* Category */}
          <FilterSection title="Category">
            {categories.map((c) => (
              <FilterRadio
                key={c.name}
                label={c.name}
                count={c.count}
                checked={category === c.name}
                onChange={() => { setCategory(c.name); setPage(1); }}
              />
            ))}
          </FilterSection>

          {/* Level */}
          <FilterSection title="Level">
            {LEVELS.map((l) => (
              <FilterRadio
                key={l} label={l}
                checked={level === l}
                onChange={() => { setLevel(l); setPage(1); }}
              />
            ))}
          </FilterSection>

          {/* Type */}
          <FilterSection title="Project Type">
            {TYPES.map((t) => (
              <FilterRadio
                key={t} label={t}
                checked={type === t}
                onChange={() => { setType(t); setPage(1); }}
              />
            ))}
          </FilterSection>

          {/* Price */}
          <FilterSection title="Price Range">
            {PRICE_RANGES.map((pr, i) => (
              <FilterRadio
                key={pr.label} label={pr.label}
                checked={priceIdx === i}
                onChange={() => { setPriceIdx(i); setPage(1); }}
              />
            ))}
          </FilterSection>
        </aside>

        {/* ── Project Grid ──────────────────────────────── */}
        <div>
          {paginated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◈</div>
              <p className="empty-title">No projects found</p>
              <p>Try adjusting your filters or search query.</p>
              <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
              }}
            >
              {paginated.map((p) => (
                <ProjectCard key={p.id} project={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 32,
              }}
            >
              <button
                className="btn btn-outline btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className="btn btn-sm"
                  style={{
                    background: page === n ? "var(--accent)" : "transparent",
                    color: page === n ? "#fff" : "var(--text-2)",
                    border: `1px solid ${page === n ? "var(--accent)" : "var(--border)"}`,
                  }}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="btn btn-outline btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Sub-Components ──────────────────────────────────────────
const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          color: "var(--text-1)",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          padding: "0 0 8px",
          borderBottom: "1px solid var(--border-soft)",
          marginBottom: 10,
        }}
      >
        {title} <span style={{ color: "var(--text-3)" }}>{open ? "▾" : "▸"}</span>
      </button>
      {open && <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>}
    </div>
  );
};

const FilterRadio = ({ label, count, checked, onChange }) => (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      fontSize: 13,
      color: checked ? "var(--text-1)" : "var(--text-2)",
    }}
  >
    <input type="radio" checked={checked} onChange={onChange} style={{ accentColor: "var(--accent)" }} />
    <span style={{ flex: 1 }}>{label}</span>
    {count !== undefined && (
      <span style={{ fontSize: 11, color: "var(--text-3)" }}>{count}</span>
    )}
  </label>
);

export default BrowseProjects;