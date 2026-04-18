// pages/ContactPage.js
import React, { useContext } from "react";
import { AppContext } from "../App";

const CONTACTS = [
  { icon: "📧", label: "Email",         value: "support@gitmarket.in"        },
  { icon: "💬", label: "WhatsApp",      value: "+91 98765 43210"             },
  { icon: "🕐", label: "Working Hours", value: "Mon–Fri, 9AM–6PM IST"       },
  { icon: "📍", label: "Address",       value: "Bangalore, Karnataka, India" },
];

export default function ContactPage() {
  const { showToast } = useContext(AppContext);

  return (
    <div className="section">
      <div style={{ fontFamily: "var(--font-head)", fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>Contact Us</div>
      <p style={{ color: "var(--text2)", marginBottom: "32px" }}>We're here to help. Fill the form or reach us directly.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Form */}
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px" }}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-input">
              <option>General Inquiry</option>
              <option>Buyer Support</option>
              <option>Seller Support</option>
              <option>Report Issue</option>
              <option>Partnership</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" rows={5} placeholder="Describe your issue or question..." style={{ resize: "vertical" }} />
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px" }}
            onClick={() => showToast("Message sent! We'll reply within 24 hours.")}
          >
            Send Message
          </button>
        </div>

        {/* Contact Info */}
        <div>
          {CONTACTS.map(({ icon, label, value }) => (
            <div key={label} style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", padding: "18px",
              marginBottom: "12px", display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "40px", height: "40px",
                background: "rgba(124,58,237,0.12)", border: "1px solid var(--border)",
                borderRadius: "10px", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "18px", flexShrink: 0,
              }}>{icon}</div>
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