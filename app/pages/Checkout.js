import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLATFORM_FEE_PCT = 0.05;
const GST_PCT          = 0.18;

const Checkout = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1); // 1=Cart, 2=Payment, 3=Confirm
  const [coupon, setCoupon]     = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [payMethod, setPayMethod]   = useState("card");

  const [cardData, setCardData] = useState({
    name: "", number: "", expiry: "", cvv: "",
  });

  const subtotal     = cart.reduce((s, p) => s + p.price, 0);
  const platformFee  = Math.round(subtotal * PLATFORM_FEE_PCT);
  const gst          = Math.round((subtotal + platformFee - discount) * GST_PCT);
  const total        = subtotal + platformFee + gst - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE100") {
      setDiscount(100); setCouponMsg({ type: "success", text: "Coupon applied! ₹100 off." });
    } else if (coupon.toUpperCase() === "FIRST50") {
      setDiscount(Math.round(subtotal * 0.1)); setCouponMsg({ type: "success", text: "10% off applied!" });
    } else {
      setDiscount(0); setCouponMsg({ type: "error", text: "Invalid coupon code." });
    }
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onClearCart?.();
      navigate("/download?order=ORD-2024-" + Math.floor(Math.random() * 9000 + 1000));
    }, 2000);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="container empty-state" style={{ paddingTop: 80 }}>
        <div className="empty-icon">◫</div>
        <p className="empty-title">Your cart is empty</p>
        <p>Browse our projects and add something to get started.</p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/browse")}>
          Browse Projects
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64, maxWidth: 960 }}>
      <h1 className="page-title" style={{ marginBottom: 8 }}>Checkout</h1>

      {/* Step Indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32, position: "relative" }}>
        {["Cart", "Payment", "Confirm"].map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? "var(--green)" : active ? "var(--accent)" : "var(--bg-hover)",
                    border: `2px solid ${done ? "var(--green)" : active ? "var(--accent)" : "var(--border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600,
                    color: done || active ? "#fff" : "var(--text-3)",
                  }}
                >
                  {done ? "✓" : n}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "var(--text-1)" : "var(--text-2)" }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1, height: 1, background: step > n ? "var(--green)" : "var(--border)",
                    margin: "0 12px",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
        {/* ── Main Panel ───────────────────────────────── */}
        <div>
          {/* Step 1 – Cart */}
          {step === 1 && (
            <div className="card">
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                <h2 style={{ fontSize: 16, fontWeight: 600 }}>Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})</h2>
              </div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex", gap: 16, padding: "16px 20px",
                    borderBottom: "1px solid var(--border-soft)",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: "var(--radius)",
                      background: "var(--accent-dim)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: 14, flexShrink: 0,
                    }}
                  >
                    &lt;/&gt;
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{item.title}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {item.tech.slice(0, 3).map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)" }}>₹{item.price}</p>
                    <p style={{ fontSize: 11, color: "var(--text-3)", textDecoration: "line-through" }}>
                      ₹{item.originalPrice}
                    </p>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Apply Coupon</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-outline" onClick={applyCoupon}>Apply</button>
                </div>
                {couponMsg && (
                  <p style={{ fontSize: 12, marginTop: 6, color: couponMsg.type === "success" ? "var(--green)" : "var(--red)" }}>
                    {couponMsg.text}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2 – Payment */}
          {step === 2 && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Payment Method</h2>

              {/* Method Tabs */}
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                {[
                  { val: "card", label: "Credit / Debit Card" },
                  { val: "upi",  label: "UPI" },
                  { val: "net",  label: "Net Banking" },
                ].map((m) => (
                  <button
                    key={m.val}
                    onClick={() => setPayMethod(m.val)}
                    style={{
                      flex: 1, padding: "10px 8px", borderRadius: "var(--radius)",
                      border: `1px solid ${payMethod === m.val ? "var(--accent)" : "var(--border)"}`,
                      background: payMethod === m.val ? "rgba(47,129,247,0.1)" : "var(--bg)",
                      color: payMethod === m.val ? "var(--accent)" : "var(--text-2)",
                      cursor: "pointer", fontSize: 12, fontWeight: 500,
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {payMethod === "card" && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      className="input"
                      placeholder="As on card"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      className="input"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
                        setCardData({ ...cardData, number: v });
                      }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        className="input"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        className="input"
                        placeholder="•••"
                        maxLength={3}
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {payMethod === "upi" && (
                <div className="form-group">
                  <label className="form-label">UPI ID</label>
                  <input className="input" placeholder="yourname@upi" />
                  <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6 }}>
                    A payment request will be sent to your UPI app.
                  </p>
                </div>
              )}

              {payMethod === "net" && (
                <div className="form-group">
                  <label className="form-label">Select Bank</label>
                  <select className="select">
                    <option value="">-- Choose Bank --</option>
                    {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              )}

              <div
                style={{
                  marginTop: 16,
                  padding: "10px 14px",
                  background: "rgba(63,185,80,0.07)",
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(63,185,80,0.2)",
                  fontSize: 12,
                  color: "var(--green)",
                }}
              >
                🔒 Your payment is secured by 256-bit SSL encryption
              </div>
            </div>
          )}

          {/* Step 3 – Confirm */}
          {step === 3 && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14 }}>
                  <span style={{ color: "var(--text-2)" }}>{item.title}</span>
                  <span style={{ fontWeight: 600 }}>₹{item.price}</span>
                </div>
              ))}
              <hr className="divider" />
              {[
                { label: "Subtotal", val: subtotal },
                { label: "Platform Fee (5%)", val: platformFee },
                { label: "GST (18%)", val: gst },
                ...(discount > 0 ? [{ label: "Coupon Discount", val: -discount }] : []),
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                  <span style={{ color: "var(--text-2)" }}>{row.label}</span>
                  <span style={{ color: row.val < 0 ? "var(--green)" : "var(--text-1)" }}>
                    {row.val < 0 ? "-" : ""}₹{Math.abs(row.val)}
                  </span>
                </div>
              ))}
              <hr className="divider" />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: "var(--accent)" }}>₹{total}</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            )}
            {step < 3 && (
              <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => setStep((s) => s + 1)}>
                Continue →
              </button>
            )}
            {step === 3 && (
              <button
                className="btn btn-success btn-lg"
                style={{ marginLeft: "auto", minWidth: 160, justifyContent: "center" }}
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="spinner" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                    Processing...
                  </span>
                ) : (
                  `Pay ₹${total}`
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── Order Summary Sidebar ─────────────────────── */}
        <div className="card" style={{ padding: 20, position: "sticky", top: 80 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Price Summary</h3>
          {[
            { label: "Subtotal", val: `₹${subtotal}` },
            { label: "Platform Fee", val: `₹${platformFee}` },
            { label: "GST (18%)", val: `₹${gst}` },
            ...(discount > 0 ? [{ label: "Discount", val: `-₹${discount}`, green: true }] : []),
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 13, marginBottom: 10,
              }}
            >
              <span style={{ color: "var(--text-2)" }}>{row.label}</span>
              <span style={{ color: row.green ? "var(--green)" : "var(--text-1)" }}>{row.val}</span>
            </div>
          ))}
          <hr className="divider" />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
            <span>Total</span>
            <span style={{ color: "var(--accent)" }}>₹{total}</span>
          </div>
          <p style={{ fontSize: 11, color: "var(--text-3)", marginTop: 12, lineHeight: 1.6 }}>
            By completing your purchase, you agree to our Terms of Service and Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;