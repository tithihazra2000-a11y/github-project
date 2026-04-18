import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const DownloadPage = () => {
  const [searchParams]      = useSearchParams();
  const navigate            = useNavigate();
  const orderId             = searchParams.get("order") || "ORD-2024-XXXX";
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading]   = useState(false);
  const [downloaded, setDownloaded]     = useState(false);

  const files = [
    { name: "source-code.zip",        size: "18.4 MB", type: "Source Code" },
    { name: "documentation.pdf",      size: "2.1 MB",  type: "Documentation" },
    { name: "database-schema.sql",    size: "42 KB",   type: "Database" },
    { name: "env-sample.txt",         size: "1 KB",    type: "Config" },
  ];

  const handleDownload = (fileName) => {
    setDownloading(true);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setDownloading(false);
          setDownloaded(true);
          return 100;
        }
        return p + Math.floor(Math.random() * 12 + 4);
      });
    }, 120);
  };

  const handleDownloadAll = () => handleDownload("all");

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 680 }}>
      {/* Success Banner */}
      <div
        style={{
          background: "rgba(63,185,80,0.08)",
          border: "1px solid rgba(63,185,80,0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "24px 28px",
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(63,185,80,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
            fontSize: 24,
            color: "var(--green)",
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--green)", marginBottom: 6 }}>
          Payment Successful!
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 8 }}>
          Thank you for your purchase. Your files are ready to download.
        </p>
        <span
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "4px 14px",
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: "var(--text-2)",
          }}
        >
          Order ID: {orderId}
        </span>
      </div>

      {/* Download Card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Your Files</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDownloadAll}
            disabled={downloading}
          >
            ↓ Download All
          </button>
        </div>

        {files.map((file, i) => (
          <div
            key={file.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 20px",
              borderBottom: i < files.length - 1 ? "1px solid var(--border-soft)" : "none",
            }}
          >
            {/* File Icon */}
            <div
              style={{
                width: 38, height: 38, borderRadius: "var(--radius)",
                background: "var(--bg-hover)",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              {file.name.split(".").pop().toUpperCase()}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500 }}>{file.name}</p>
              <p style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2 }}>
                {file.type} · {file.size}
              </p>
            </div>

            {/* Action */}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleDownload(file.name)}
              disabled={downloading}
            >
              ↓ Download
            </button>
          </div>
        ))}

        {/* Progress Bar */}
        {downloading && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "var(--text-2)" }}>Downloading...</span>
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>{Math.min(progress, 100)}%</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>
          </div>
        )}

        {downloaded && (
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid var(--border)",
              background: "rgba(63,185,80,0.06)",
            }}
          >
            <p style={{ fontSize: 13, color: "var(--green)" }}>
              ✓ Download complete! Check your Downloads folder.
            </p>
          </div>
        )}
      </div>

      {/* Setup Instructions */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Quick Setup Guide</h3>
        {[
          { step: 1, title: "Extract the ZIP", desc: "Unzip source-code.zip to your preferred directory." },
          { step: 2, title: "Install Dependencies", desc: "Run npm install (or pip install -r requirements.txt for Python projects)." },
          { step: 3, title: "Configure Environment", desc: "Copy env-sample.txt to .env and fill in your credentials." },
          { step: 4, title: "Setup Database", desc: "Import database-schema.sql into your MySQL/PostgreSQL instance." },
          { step: 5, title: "Run the Project", desc: "Follow the documentation.pdf for final run instructions." },
        ].map((item) => (
          <div key={item.step} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
            <div
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--accent-dim)", color: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}
            >
              {item.step}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: "var(--text-2)" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Support & Next Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          className="card"
          style={{
            padding: "16px 20px",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Need Help?</p>
          <p style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 10 }}>
            30-day free seller support included.
          </p>
          <Link to="/contact" className="btn btn-outline btn-sm">
            Contact Seller
          </Link>
        </div>
        <div
          className="card"
          style={{
            padding: "16px 20px",
            borderLeft: "3px solid var(--purple)",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Leave a Review</p>
          <p style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 10 }}>
            Help other students find quality projects.
          </p>
          <button className="btn btn-outline btn-sm">Write Review</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
          View My Purchases
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/browse")}>
          Browse More Projects
        </button>
      </div>
    </div>
  );
};

export default DownloadPage;