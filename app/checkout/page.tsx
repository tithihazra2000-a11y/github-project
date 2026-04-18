// app/checkout/page.tsx
'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'
import styles from './checkout.module.css'
 
function CheckoutInner() {
  const params  = useSearchParams()
  const router  = useRouter()
  const id      = Number(params.get('id')) || 1
  const p       = PROJECTS.find(pr => pr.id === id) || PROJECTS[0]
  const fee     = Math.round(p.price * 0.05)
  const gst     = Math.round(p.price * 0.18)
  const total   = p.price + fee + gst
 
  const [payTab, setPayTab] = useState<'card'|'upi'|'netbanking'>('card')
  const [loading, setLoading] = useState(false)
 
  function handlePurchase() {
    setLoading(true)
    setTimeout(() => router.push(`/download?id=${p.id}`), 1500)
  }
 
  return (
    <div className={styles.wrap}>
      <div className={styles.breadcrumb}>
        <Link href={`/project/${p.id}`}>{p.title}</Link> / Checkout
      </div>
      <h1 className={styles.h1}>Checkout</h1>
 
      <div className={styles.grid}>
        {/* LEFT */}
        <div>
          {/* Account */}
          <div className={styles.panel}>
            <h3>1 — Account details</h3>
            <div className={styles.formRow}>
              <div className={styles.formGroup}><label>First name</label><input className={styles.input} type="text" placeholder="Rohan" /></div>
              <div className={styles.formGroup}><label>Last name</label><input className={styles.input} type="text" placeholder="Sharma" /></div>
            </div>
            <div className={styles.formGroup}><label>Email</label><input className={styles.input} type="email" placeholder="you@email.com" /></div>
            <div className={styles.formGroup}><label>Phone</label><input className={styles.input} type="tel" placeholder="+91 98765 43210" /></div>
          </div>
 
          {/* Payment */}
          <div className={styles.panel}>
            <h3>2 — Payment method</h3>
            <div className={styles.notice}>🔒 Demo only — no real payment is processed.</div>
            <div className={styles.payTabs}>
              {(['card','upi','netbanking'] as const).map(t => (
                <button key={t} className={`${styles.payTab} ${payTab === t ? styles.payActive : ''}`} onClick={() => setPayTab(t)}>
                  {t === 'card' ? '💳 Card' : t === 'upi' ? '📲 UPI' : '🏦 Net Banking'}
                </button>
              ))}
            </div>
 
            {payTab === 'card' && (
              <>
                <div className={styles.formGroup}><label>Card number</label><input className={styles.input} type="text" placeholder="4242 4242 4242 4242" maxLength={19} /></div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>Expiry</label><input className={styles.input} type="text" placeholder="MM / YY" /></div>
                  <div className={styles.formGroup}><label>CVV</label><input className={styles.input} type="text" placeholder="•••" /></div>
                </div>
                <div className={styles.formGroup}><label>Name on card</label><input className={styles.input} type="text" placeholder="Rohan Sharma" /></div>
              </>
            )}
            {payTab === 'upi' && (
              <div className={styles.formGroup}><label>UPI ID</label><input className={styles.input} type="text" placeholder="yourname@upi" /></div>
            )}
            {payTab === 'netbanking' && (
              <div className={styles.formGroup}>
                <label>Select bank</label>
                <select className={styles.input}>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
          </div>
 
          <button className={styles.purchaseBtn} onClick={handlePurchase} disabled={loading}>
            {loading ? 'Processing…' : `Complete purchase — ₹${total.toLocaleString()}`}
          </button>
        </div>
 
        {/* RIGHT — Order summary */}
        <div className={styles.orderCard}>
          <h3>Order summary</h3>
          <div className={styles.orderItem}>
            <div className={styles.orderThumb}>{p.thumb}</div>
            <div>
              <div className={styles.orderTitle}>{p.title}</div>
              <div className={styles.orderSeller}>by {p.seller}</div>
            </div>
          </div>
          <div className={styles.orderRow}><span>Subtotal</span><span>₹{p.price.toLocaleString()}</span></div>
          <div className={styles.orderRow}><span>Platform fee (5%)</span><span>₹{fee.toLocaleString()}</span></div>
          <div className={styles.orderRow}><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
          <div className={`${styles.orderRow} ${styles.orderTotal}`}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  )
}
 
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{padding:'4rem',textAlign:'center',color:'var(--text3)'}}>Loading…</div>}>
      <CheckoutInner />
    </Suspense>
  )
}
 