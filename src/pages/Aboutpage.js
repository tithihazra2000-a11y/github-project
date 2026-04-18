// pages/AboutPage.js
import React, { useContext } from "react";
import { AppContext } from "../App";

const MISSION = [
  { icon: "🎯", title: "Our Mission",      text: "To democratize software development by connecting developers who build with those who need quality code." },
  { icon: "🔒", title: "Secure Platform",  text: "Every project is reviewed before listing. Payments are secured via Razorpay with escrow protection for buyers." },
  { icon: "💰", title: "Fair Commission",  text: "Sellers keep 90% of every sale. We only charge a 10% platform fee to maintain and grow the marketplace." },
];

const FAQS = [
  { q: "How does GitMarket work?",               a: "Buyers browse and purchase projects. Upon payment, they receive instant download access to all source files." },
  { q: "Can I sell my college final year project?", a: "Yes! Final year projects are one of our most popular categories. Upload your project and start earning." },
  { q: "What commission does GitMarket take?",   a: "We charge a 10% platform fee per sale. You keep the remaining 90%." },
  { q: "How long does project review take?",     a: "Our team reviews submissions within 24–48 hours. You'll get an email notification once approved or rejected." },
  { q: "Is there buyer protection?",             a: "Yes. If a project doesn't match its description, buyers can request a refund within 7 days." },
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
            <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {q}
              <span style={{ color: "var(--purple3)" }}>+</span>
            </div>
            <div style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.7 }}>{a}</div>
          </div>
        ))}
      </div>
    </>
  );
}


// pages/ContactPage.js
export function ContactPage() {
  const { showToast } = useContext(AppContext);
  const CONTACTS = [
    { icon: "📧", label: "Email",         value: "support@gitmarket.in"     },
    { icon: "💬", label: "WhatsApp",      value: "+91 98765 43210"          },
    { icon: "🕐", label: "Working Hours", value: "Mon–Fri, 9AM–6PM IST"    },
    { icon: "📍", label: "Address",       value: "Bangalore, Karnataka, India" },
  ];
  return (
    <div className="section">
      <div style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Contact Us</div>
      <p style={{ color: "var(--text2)", marginBottom: "32px" }}>We're here to help. Fill the form or reach us directly.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Form */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px" }}>
          <div className="form-group"><label className="form-label">Name</label><input className="form-input" type="text" placeholder="Your Name" /></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@example.com" /></div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-input">
              <option>General Inquiry</option><option>Buyer Support</option>
              <option>Seller Support</option><option>Report Issue</option><option>Partnership</option>
            </select>
          </div>
          <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} placeholder="Describe your issue..." style={{ resize: "vertical" }} /></div>
          <button className="btn btn-primary" style={{ width: "100%", padding: "12px" }} onClick={() => showToast("Message sent! We'll reply within 24 hours.")}>
            Send Message
          </button>
        </div>

        {/* Contact Info */}
        <div>
          {CONTACTS.map(({ icon, label, value }) => (
            <div key={label} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "18px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "40px", height: "40px", background: "rgba(124,58,237,0.12)", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".5px" }}>{label}</div>
                <div style={{ fontSize: "14px", color: "var(--text)", marginTop: "2px" }}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Need to import AppContext in ContactPage
import { useContext } from "react";
ContactPage.displayName = "ContactPage";
export { ContactPage as default };


// pages/LegalPage.js
export function LegalPage() {
  const POLICIES = [
    { title: "Terms of Service",   content: "These Terms govern your use of GitMarket. By accessing the service, you agree to be bound by these terms and all applicable laws." },
    { title: "1. Acceptable Use",  content: "You may use GitMarket to buy or sell software projects. You may not upload projects containing malware, illegal content, or content that infringes third-party IP rights." },
    { title: "2. Intellectual Property", content: "Sellers certify that they own the right to sell what they upload. Buyers receive a non-exclusive license for personal or commercial use." },
    { title: "3. Payments & Commissions", content: "GitMarket charges a 10% commission per sale. Payments are processed via Razorpay. Seller payouts are processed within 7 business days of withdrawal request." },
    { title: "4. Refund Policy",   content: "Buyers may request a refund within 7 days of purchase if the project significantly differs from its description. Refunds are reviewed and processed within 3–5 business days." },
    { title: "5. Account Termination", content: "GitMarket reserves the right to terminate accounts that violate these terms, engage in fraud, or repeatedly receive justified complaints." },
  ];
  return (
    <div className="section" style={{ maxWidth: "720px" }}>
      <div style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: "24px" }}>Legal & Policies</div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        {["Terms of Service","Privacy Policy","Refund Policy","Seller Agreement"].map(t => (
          <button key={t} className="chip">{t}</button>
        ))}
      </div>
      {POLICIES.map(({ title, content }) => (
        <div key={title} style={{ marginBottom: "24px" }}>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "15px", fontWeight: 700, marginBottom: "8px", color: "var(--purple3)" }}>{title}</div>
          <p style={{ color: "var(--text2)", fontSize: "13px", lineHeight: 1.8 }}>{content}</p>
        </div>
      ))}
    </div>
  );
}
export { LegalPage as default };