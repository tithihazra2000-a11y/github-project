// pages/CheckoutPage.js
import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import PROJECTS from "../src/data/projects";

const STEPS = ["Details", "Payment", "Download"];

export default function CheckoutPage() {
  const { navigate, selectedProject, showToast } = useContext(AppContext);
  const p = selectedProject || PROJECTS[0];
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("card");

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  const basePrice = parseInt(p.price.replace(/[^0-9]/g, ""));
  const fee       = Math.round(basePrice * 0.05);
  const gst       = Math.round(basePrice * 0.18);
  const total     = basePrice + fee + gst;

  const handlePay = () => {
    showToast("✅ Payment successful! Redirecting...");
    setTimeout(() => navigate("download"), 1200);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 28px" }}>
      <button className="back-btn" onClick={() => navigate("detail")}>← Back to Project</button>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: "32px" }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", position: "relative" }}>
            {i < STEPS.length - 1 && (
              <div style={{ position: "absolute", top: "14px", left: "50%", width: "100%", height: "1px", background: "var(--border)", zIndex: 0 }} />
            )}
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", fontWeight: 700, margin: "0 auto 6px",
              position: "relative", zIndex: 1,
              background: i < step ? "var(--success)" : i === step ? "var(--purple)" : "var(--bg3)",
              color: i <= step ? "#fff" : "var(--text3)",
              border: i > step ? "1px solid var(--border)" : "none",
            }}>
              {i < step ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: "11px", color: i === step ? "var(--purple3)" : "var(--text3)" }}>{s}</div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>Order Summary</div>
        {[
          [p.title.length > 40 ? p.title.slice(0,40) + "..." : p.title, `₹${basePrice}`],
          ["Platform fee (5%)", `₹${fee}`],
          ["GST (18%)", `₹${gst}`],
        ].map(([label, val]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "13px", borderBottom: "1px solid var(--border)", color: "var(--text2)" }}>
            <span>{label}</span><span style={{ color: "var(--text)" }}>{val}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontWeight: 600, fontSize: "15px" }}>
          <span>Total</span>
          <span style={{ color: "var(--purple3)" }}>₹{total}</span>
        </div>
      </div>

      {/* Billing Details */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "20px" }}>Billing Details</div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-input" type="text" placeholder="Rahul" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-input" type="text" placeholder="Sharma" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
      </div>

      {/* Payment Method */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", marginBottom: "24px" }}>
        <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "15px", marginBottom: "20px" }}>Payment Method</div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[["card","💳 Card"],["upi","📱 UPI"],["netbanking","🏦 NetBanking"],["wallet","💰 Wallet"]].map(([val, label]) => (
            <button key={val} className={`chip ${payMethod === val ? "active" : ""}`} style={{ flex: 1, padding: "10px" }} onClick={() => setPayMethod(val)}>
              {label}
            </button>
          ))}
        </div>

        {payMethod === "card" && (
          <>
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input className="form-input" type="text" placeholder="4242  4242  4242  4242" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry</label>
                <input className="form-input" type="text" placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input className="form-input" type="password" placeholder="•••" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
              </div>
            </div>
          </>
        )}

        {payMethod === "upi" && (
          <div className="form-group">
            <label className="form-label">UPI ID</label>
            <input className="form-input" type="text" placeholder="yourname@upi" />
          </div>
        )}
      </div>

      <button className="btn btn-primary" style={{ width: "100%", padding: "14px", fontSize: "16px" }} onClick={handlePay}>
        Pay ₹{total} Securely →
      </button>
      <p style={{ textAlign: "center", color: "var(--text3)", fontSize: "12px", marginTop: "12px" }}>
        🔒 Secured by Razorpay · 256-bit SSL encrypted
      </p>
    </div>
  );
}