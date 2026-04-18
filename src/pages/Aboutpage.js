// pages/AboutPage.js
import React, { useContext } from "react";
import { AppContext } from "../App";

const MISSION = [
  { icon: "🎯", title: "Our Mission",     text: "To democratize software development by connecting developers who build with those who need quality code." },
  { icon: "🔒", title: "Secure Platform", text: "Every project is reviewed before listing. Payments are secured via Razorpay with escrow protection for buyers." },
  { icon: "💰", title: "Fair Commission", text: "Sellers keep 90% of every sale. We only charge a 10% platform fee to maintain and grow the marketplace." },
];

const FAQS = [
  { q: "How does GitMarket work?",                a: "Buyers browse and purchase projects. Upon payment, they receive instant download access to all source files." },
  { q: "Can I sell my college final year project?", a: "Yes! Final year projects are one of our most popular categories. Upload your project and start earning." },
  { q: "What commission does GitMarket take?",    a: "We charge a 10% platform fee per sale. You keep the remaining 90%." },
  { q: "How long does project review take?",      a: "Our team reviews submissions within 24-48 hours. You'll get an email once approved or rejected." },
  { q: "Is there buyer protection?",              a: "Yes. If a project doesn't match its description, buyers can request a refund within 7 days." },
];

export default function AboutPage() {
  const { navigate } = useContext(AppContext);

  return (
    <>
      <div style={{ padding: "60px 40px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(124,58,237,0.15)", border: "1px solid var(--border2)", borderRadius: "99px", padding: "4px 14px", fontSize: "12px", color: "var(--purple3)", marginBottom: "16px" }}>
          ✦ Built for Developers
        </div>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, marginBottom: "12px" }}>
          About <span style={{ color: "var(--purple2)" }}>GitMarket</span>
        </h1>
        <p style={{ color: "var(--text2)", maxWidth: "520px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
          GitMarket is India's fastest growing marketplace for buying and selling GitHub projects, ready-made web apps, and final year projects.
        </p>
      </div>

      <div className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {MISSION.map(({ icon, title, text }) => (
            <div key={title} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(124,58,237,0.1)", border: "1px solid var(--border)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "20px" }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{title}</div>
              <div style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.7 }}>{text}</div>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "32px 0" }} />

        <div style={{ fontFamily: "var(--font-head)", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Frequently Asked Questions</div>
        {FAQS.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: "1px solid var(--border)", padding: "18px 0" }}>
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
              {q} <span style={{ color: "var(--purple3)" }}>+</span>
            </div>
            <div style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.7 }}>{a}</div>
          </div>
        ))}
      </div>
    </>
  );
}