// pages/LegalPage.js
import React from "react";

const POLICIES = [
  {
    title: "Terms of Service",
    content: "These Terms govern your use of GitMarket. By accessing the service, you agree to be bound by these terms and all applicable laws.",
  },
  {
    title: "1. Acceptable Use",
    content: "You may use GitMarket to buy or sell software projects. You may not upload projects containing malware, illegal content, or content that infringes third-party intellectual property rights.",
  },
  {
    title: "2. Intellectual Property",
    content: "Sellers certify that they own the right to sell what they upload. Buyers receive a non-exclusive license for personal or commercial use of the purchased project.",
  },
  {
    title: "3. Payments & Commissions",
    content: "GitMarket charges a 10% commission per sale. Payments are processed securely via Razorpay. Seller payouts are processed within 7 business days of a withdrawal request.",
  },
  {
    title: "4. Refund Policy",
    content: "Buyers may request a refund within 7 days of purchase if the project significantly differs from its description. Refunds are reviewed and processed within 3–5 business days.",
  },
  {
    title: "5. Account Termination",
    content: "GitMarket reserves the right to terminate accounts that violate these terms, engage in fraudulent activity, or repeatedly receive justified complaints.",
  },
  {
    title: "Privacy Policy",
    content: "We collect only the information necessary to provide our service: name, email, and payment details. We never sell your personal data to third parties. All data is stored securely and encrypted.",
  },
  {
    title: "Seller Agreement",
    content: "By listing a project on GitMarket, you confirm that you are the original author or have full rights to redistribute the project. GitMarket reserves the right to remove listings that violate our policies without prior notice.",
  },
];

export default function LegalPage() {
  return (
    <div className="section" style={{ maxWidth: "720px" }}>
      <div style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>
        Legal & Policies
      </div>

      {/* Policy Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        {["Terms of Service", "Privacy Policy", "Refund Policy", "Seller Agreement"].map(t => (
          <button key={t} className="chip">{t}</button>
        ))}
      </div>

      {/* Policy Content */}
      {POLICIES.map(({ title, content }) => (
        <div key={title} style={{ marginBottom: "24px" }}>
          <div style={{
            fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700,
            marginBottom: "8px", color: "var(--purple3)",
          }}>
            {title}
          </div>
          <p style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.8 }}>{content}</p>
        </div>
      ))}

      <div style={{
        background: "rgba(124,58,237,0.08)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)", padding: "16px", marginTop: "16px",
        fontSize: "13px", color: "var(--text2)",
      }}>
        📩 For legal inquiries, contact us at{" "}
        <span style={{ color: "var(--purple3)" }}>legal@gitmarket.in</span>
      </div>
    </div>
  );
}