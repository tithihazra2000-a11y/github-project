import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── About Page ───────────────────────────────────────────────────────────────
export const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { val: "500+", label: "Projects Listed" },
    { val: "3,400+", label: "Happy Buyers" },
    { val: "89", label: "Active Sellers" },
    { val: "4.8★", label: "Avg Rating" },
  ];

  const howItWorks = [
    { step: 1, icon: "◈", title: "Browse Projects", desc: "Explore 500+ projects organized by tech stack, category, difficulty, and price range." },
    { step: 2, icon: "◉", title: "Choose & Buy", desc: "Select your project, review details, and pay securely with card, UPI, or net banking." },
    { step: 3, icon: "↓", title: "Instant Download", desc: "Get immediate access to full source code, documentation, and 30-day seller support." },
  ];

  const sellerSteps = [
    { step: 1, title: "Create Account", desc: "Sign up as a seller for free. No upfront costs." },
    { step: 2, title: "Upload Your Project", desc: "Submit your project with source code, docs, and screenshots." },
    { step: 3, title: "Get Reviewed", desc: "Our team reviews your submission within 24–48 hours." },
    { step: 4, title: "Start Earning", desc: "Once approved, earn 80% of every sale. Payouts every 2 weeks." },
  ];

  const faqs = [
    { q: "What's included with every project?", a: "Full source code, setup documentation, database schema, sample data, and 30-day seller support." },
    { q: "Can I use the project for commercial purposes?", a: "Projects come with a single-use license for academic and personal use. Commercial licenses are available separately." },
    { q: "What if the project doesn't work?", a: "Contact the seller within 7 days of purchase. If unresolved, we offer a full refund under our buyer protection policy." },
    { q: "How do sellers get paid?", a: "Sellers receive 80% of each sale, paid out bi-weekly via UPI or bank transfer. Minimum payout is ₹500." },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          padding: "64px 0 48px",
          borderBottom: "1px solid var(--border)",
          background: "linear-gradient(160deg, var(--bg) 0%, var(--bg-card) 100%)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.5px" }}>
            The Marketplace Built for{" "}
            <span style={{ color: "var(--accent)" }}>Developers & Students</span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 28 }}>
            DevMarket connects buyers who need quality code with sellers who build it.
            From final year projects to production-ready solutions — everything is one click away.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/browse")}>
              Browse Projects
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate("/seller/dashboard")}>
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "24px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, textAlign: "center" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: 26, fontWeight: 700, color: "var(--accent)" }}>{s.val}</p>
                <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        {/* How it Works – Buyers */}
        <section style={{ marginBottom: 56 }}>
          <h2 className="section-title" style={{ textAlign: "center" }}>How It Works for Buyers</h2>
          <p className="section-sub" style={{ textAlign: "center" }}>Get your project in 3 simple steps</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 8 }}>
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="card"
                style={{ padding: "24px 20px", textAlign: "center" }}
              >
                <div
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "var(--accent-dim)", color: "var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, margin: "0 auto 14px",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seller CTA */}
        <section style={{ marginBottom: 56 }}>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 48px",
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Become a Seller</h2>
            <p style={{ color: "var(--text-2)", fontSize: 14, marginBottom: 28, maxWidth: 500 }}>
              Turn your projects into income. Upload once, earn forever.
              Join 89+ developers already selling on DevMarket.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 520, marginBottom: 28 }}>
              {sellerSteps.map((s) => (
                <div key={s.step} style={{ display: "flex", gap: 12 }}>
                  <span
                    style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "var(--accent)", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
                    }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13 }}>{s.title}</p>
                    <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("/seller/upload")}>
              Start Selling Free →
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="section-title" style={{ marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq) => (
              <details
                key={faq.q}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "0",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {faq.q}
                  <span style={{ color: "var(--text-3)", fontWeight: 400 }}>▾</span>
                </summary>
                <p
                  style={{
                    padding: "0 20px 16px",
                    fontSize: 13,
                    color: "var(--text-2)",
                    lineHeight: 1.7,
                    borderTop: "1px solid var(--border-soft)",
                    paddingTop: 12,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ─── Contact Page ─────────────────────────────────────────────────────────────
export const ContactPage = () => {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 880 }}>
      <div className="page-header">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">We're here to help. Reach out and we'll get back to you within 24 hours.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32 }}>
        {/* Info */}
        <div>
          {[
            { icon: "✉", title: "Email Support", val: "support@devmarket.in", sub: "Mon–Fri, 9am–6pm IST" },
            { icon: "◉", title: "Seller Queries", val: "sellers@devmarket.in", sub: "For upload & payment issues" },
            { icon: "⚠", title: "Report an Issue", val: "report@devmarket.in", sub: "Copyright or abuse concerns" },
          ].map((c) => (
            <div
              key={c.title}
              style={{
                display: "flex",
                gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid var(--border-soft)",
              }}
            >
              <div
                style={{
                  width: 38, height: 38, borderRadius: "var(--radius)",
                  background: "var(--accent-dim)", color: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 16,
                }}
              >
                {c.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13 }}>{c.title}</p>
                <p style={{ color: "var(--accent)", fontSize: 13 }}>{c.val}</p>
                <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{c.sub}</p>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 24,
              padding: "16px 18px",
              background: "rgba(47,129,247,0.06)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(47,129,247,0.2)",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Response Time</p>
            <p style={{ fontSize: 12, color: "var(--text-2)", lineHeight: 1.6 }}>
              General queries: within 24 hours.
              Payment issues: within 4 hours.
              Technical support: within 48 hours.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="card" style={{ padding: 28 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 12, color: "var(--green)" }}>✓</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ fontSize: 13, color: "var(--text-2)" }}>
                We've received your message and will reply within 24 hours.
              </p>
              <button
                className="btn btn-outline"
                style={{ marginTop: 20 }}
                onClick={() => { setSubmitted(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input className="input" required value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="input" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject *</label>
                <select className="select" required value={form.subject} onChange={(e) => update("subject", e.target.value)}>
                  <option value="">Select a topic...</option>
                  <option>Purchase Issue</option>
                  <option>Download Problem</option>
                  <option>Seller Payout</option>
                  <option>Report Copyright</option>
                  <option>Technical Support</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="textarea"
                  rows={5}
                  required
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Legal Page ───────────────────────────────────────────────────────────────
export const LegalPage = () => {
  const [activeSection, setActiveSection] = useState("terms");

  const sections = [
    { key: "terms",   label: "Terms of Service" },
    { key: "privacy", label: "Privacy Policy" },
    { key: "refund",  label: "Refund Policy" },
    { key: "seller",  label: "Seller Agreement" },
  ];

  const content = {
    terms: {
      title: "Terms of Service",
      lastUpdated: "April 1, 2024",
      sections: [
        { heading: "1. Acceptance of Terms", body: "By accessing and using DevMarket, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform." },
        { heading: "2. User Accounts", body: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account." },
        { heading: "3. Intellectual Property", body: "All projects sold on DevMarket are licensed for single-use unless stated otherwise. Buyers may not resell, redistribute, or sub-license purchased projects. Sellers retain original ownership of uploaded projects." },
        { heading: "4. Prohibited Activities", body: "Users may not upload malicious code, infringe on copyrights, misrepresent project capabilities, or engage in fraudulent transactions. Violations may result in immediate account suspension." },
        { heading: "5. Liability", body: "DevMarket acts as a marketplace intermediary. We are not responsible for the quality, functionality, or suitability of individual projects. All sales are final after the 7-day dispute window." },
        { heading: "6. Changes to Terms", body: "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms." },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "April 1, 2024",
      sections: [
        { heading: "1. Information We Collect", body: "We collect information you provide directly (name, email, payment details) and automatically (IP address, browser type, pages visited, transaction history)." },
        { heading: "2. How We Use Your Information", body: "Your information is used to process transactions, provide customer support, send transactional emails, prevent fraud, and improve our platform. We never sell personal data to third parties." },
        { heading: "3. Data Storage & Security", body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Payment details are handled by PCI-DSS compliant payment processors. We never store card numbers." },
        { heading: "4. Cookies", body: "We use essential cookies for authentication, and optional analytics cookies (with consent) to understand usage patterns. You may disable non-essential cookies in your browser settings." },
        { heading: "5. Your Rights", body: "You have the right to access, correct, export, or delete your personal data. Contact privacy@devmarket.in to exercise these rights. We will respond within 30 days." },
      ],
    },
    refund: {
      title: "Refund Policy",
      lastUpdated: "April 1, 2024",
      sections: [
        { heading: "Eligible Refunds", body: "Refunds are available within 7 days of purchase in the following cases: the project does not match its description, the source code fails to run despite following documented setup, or the seller fails to provide promised support." },
        { heading: "Non-Eligible Situations", body: "Refunds are not provided if you have already downloaded the project and it works as described, if the issue is due to your own environment configuration, or if 7 days have passed since purchase." },
        { heading: "How to Request a Refund", body: "Open a dispute via your User Dashboard → Order History → Open Dispute. Provide details and evidence. Our team will investigate within 48 hours and mediate between buyer and seller." },
        { heading: "Processing Time", body: "Approved refunds are processed within 5–7 business days back to the original payment method. UPI refunds typically complete within 2–3 business days." },
      ],
    },
    seller: {
      title: "Seller Agreement",
      lastUpdated: "April 1, 2024",
      sections: [
        { heading: "1. Eligibility", body: "Any registered user may become a seller. By uploading a project, you confirm that you are the original author or have full rights to sell the work." },
        { heading: "2. Commission Structure", body: "DevMarket retains 20% of each sale as a platform fee. Sellers receive 80% of the listed price. GST is charged to buyers separately and remitted by DevMarket." },
        { heading: "3. Payout Schedule", body: "Payouts are processed bi-weekly (every 2 weeks). Minimum payout threshold is ₹500. Payments are made via UPI or bank transfer to your registered account." },
        { heading: "4. Content Standards", body: "All projects must include working source code, a setup guide, and accurate descriptions. Plagiarized projects or those containing malicious code will be removed and may result in account termination." },
        { heading: "5. Support Obligation", body: "Sellers are expected to provide reasonable support for 30 days after a buyer's purchase. Failure to respond to support requests within 72 hours may affect seller rating." },
      ],
    },
  };

  const current = content[activeSection];

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 880 }}>
      <div className="page-header">
        <h1 className="page-title">Legal</h1>
        <p className="page-subtitle">Please read our policies carefully before using DevMarket.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 28 }}>
        {/* Sidebar Nav */}
        <nav>
          <ul style={{ listStyle: "none" }}>
            {sections.map((s) => (
              <li key={s.key} style={{ marginBottom: 4 }}>
                <button
                  onClick={() => setActiveSection(s.key)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: "var(--radius)",
                    background: activeSection === s.key ? "rgba(47,129,247,0.1)" : "transparent",
                    border: "none",
                    color: activeSection === s.key ? "var(--accent)" : "var(--text-2)",
                    fontSize: 13,
                    fontWeight: activeSection === s.key ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 24,
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{current.title}</h2>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>
              Last updated: {current.lastUpdated}
            </span>
          </div>

          {current.sections.map((section) => (
            <div key={section.heading} style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  paddingLeft: 12,
                  borderLeft: "3px solid var(--accent)",
                }}
              >
                {section.heading}
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>
                {section.body}
              </p>
            </div>
          ))}

          <div
            style={{
              marginTop: 32,
              padding: "14px 18px",
              background: "rgba(47,129,247,0.05)",
              borderRadius: "var(--radius)",
              border: "1px solid rgba(47,129,247,0.15)",
              fontSize: 12,
              color: "var(--text-2)",
            }}
          >
            Questions about our policies? Contact us at{" "}
            <a href="mailto:legal@devmarket.in">legal@devmarket.in</a>
          </div>
        </div>
      </div>
    </div>
  );
};