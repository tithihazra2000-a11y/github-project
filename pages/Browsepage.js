// pages/BrowsePage.js
import React, { useState } from "react";
import { ProjectCard } from "../components/SharedComponents";
import PROJECTS from "../data/projects";

const CATEGORIES = ["", "Web Apps", "Mobile", "ML/AI", "Blockchain", "Final Year", "APIs"];

export default function BrowsePage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort]         = useState("popular");
  const [priceFilter, setPriceFilter] = useState("all");

  // Parse price string to number
  const parsePrice = (p) => parseInt(p.replace(/[^0-9]/g, ""));

  let filtered = PROJECTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat    = category ? p.tag === category : true;
    const price       = parsePrice(p.price);
    const matchPrice  = priceFilter === "free"    ? price === 0
                      : priceFilter === "under499" ? price <= 499
                      : priceFilter === "final"    ? p.tag === "Final Year"
                      : true;
    return matchSearch && matchCat && matchPrice;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === "popular")   return b.downloads - a.downloads;
    if (sort === "newest")    return b.id - a.id;
    if (sort === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sort === "price-desc")return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  return (
    <>
      {/* Filter Bar */}
      <div style={{
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        padding: "12px 28px",
        display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center",
      }}>
        <input
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "7px 14px",
            color: "var(--text)", fontFamily: "var(--font-body)", fontSize: "13px",
            width: "220px", outline: "none",
          }}
          type="text"
          placeholder="🔍  Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "7px 12px",
            color: "var(--text2)", fontFamily: "var(--font-body)", fontSize: "13px", outline: "none",
          }}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {CATEGORIES.filter(Boolean).map(c => <option key={c}>{c}</option>)}
        </select>

        <select
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)", padding: "7px 12px",
            color: "var(--text2)", fontFamily: "var(--font-body)", fontSize: "13px", outline: "none",
          }}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="popular">Sort: Popular</option>
          <option value="newest">Sort: Newest</option>
          <option value="price-asc">Sort: Price ↑</option>
          <option value="price-desc">Sort: Price ↓</option>
        </select>

        {[
          { label: "All",        value: "all"      },
          { label: "Free",       value: "free"      },
          { label: "Under ₹499", value: "under499"  },
          { label: "Final Year", value: "final"     },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={`chip ${priceFilter === value ? "active" : ""}`}
            onClick={() => setPriceFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">
            All Projects{" "}
            <span style={{ color: "var(--text3)", fontSize: "14px" }}>({filtered.length})</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text3)" }}>
            No projects found. Try a different search or filter.
          </div>
        ) : (
          <div className="cards-grid">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </>
  );
}