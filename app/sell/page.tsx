// app/sell/page.tsx
'use client'
import { useState } from 'react'
import styles from './sell.module.css'
 
type Tab = 'overview' | 'upload' | 'listings' | 'earnings'
 
const SALES = [
  { project:'E-Commerce Platform', buyer:'rohan_s',  date:'12 Apr', amount:999 },
  { project:'Hospital Mgmt FYP',   buyer:'priya_k',  date:'11 Apr', amount:1499 },
  { project:'Chat App (MERN)',      buyer:'amit_v',   date:'10 Apr', amount:799 },
  { project:'ML Crop Predictor',    buyer:'sneha_r',  date:'9 Apr',  amount:1299 },
]
 
export default function SellPage() {
  const [tab, setTab] = useState<Tab>('overview')
 
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h1>Seller dashboard</h1>
          <p>Welcome back, <strong>DevMaster</strong></p>
        </div>
        <button className={styles.uploadBtn} onClick={() => setTab('upload')}>+ Upload project</button>
      </div>
 
      <div className={styles.layout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {([
            { id:'overview',  label:'Overview',         icon:'📊' },
            { id:'upload',    label:'Upload project',   icon:'⬆' },
            { id:'listings',  label:'My listings',      icon:'📦' },
            { id:'earnings',  label:'Earnings',         icon:'💰' },
          ] as {id:Tab, label:string, icon:string}[]).map(item => (
            <button key={item.id} className={`${styles.menuItem} ${tab === item.id ? styles.active : ''}`}
              onClick={() => setTab(item.id)}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>
 
        {/* Content */}
        <div>
          {tab === 'overview' && (
            <>
              <div className={styles.kpiGrid}>
                <div className={styles.kpi}><div className={styles.kVal} style={{color:'var(--green)'}}>₹42,800</div><div className={styles.kLbl}>Total earnings</div><div className={styles.kChg}>↑ +12% this month</div></div>
                <div className={styles.kpi}><div className={styles.kVal}>18</div><div className={styles.kLbl}>Active listings</div><div className={styles.kChg}>↑ +2 new</div></div>
                <div className={styles.kpi}><div className={styles.kVal}>247</div><div className={styles.kLbl}>Total sales</div><div className={styles.kChg}>↑ +31 this month</div></div>
                <div className={styles.kpi}><div className={styles.kVal} style={{color:'var(--accent2)'}}>4.7★</div><div className={styles.kLbl}>Avg rating</div><div className={styles.kChg}>62 reviews</div></div>
              </div>
              <div className={styles.panel}>
                <h3>Recent sales</h3>
                <table className={styles.table}>
                  <thead><tr><th>Project</th><th>Buyer</th><th>Date</th><th>Amount</th></tr></thead>
                  <tbody>
                    {SALES.map((s,i) => (
                      <tr key={i}><td>{s.project}</td><td>{s.buyer}</td><td>{s.date}</td><td style={{color:'var(--green)'}}>₹{s.amount.toLocaleString()}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
 
          {tab === 'upload' && (
            <div className={styles.panel}>
              <h3>Upload a new project</h3>
              <div className={styles.uploadZone} onClick={() => alert('File picker (demo)')}>
                <div className={styles.uploadIc}>📁</div>
                <div>Drag &amp; drop your ZIP file here</div>
                <div className={styles.uploadHint}>or click to browse — max 200MB</div>
              </div>
              {[
                {label:'Project title', ph:'e.g. Hospital Management System (FYP)', type:'text'},
                {label:'Price (₹)',     ph:'999', type:'number'},
                {label:'Tech stack (comma separated)', ph:'React, Node.js, MongoDB', type:'text'},
              ].map(f => (
                <div key={f.label} className={styles.formGroup}>
                  <label>{f.label}</label>
                  <input className={styles.input} type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div className={styles.formGroup}>
                <label>Category</label>
                <select className={styles.input}>
                  <option>Web App</option><option>Mobile App</option><option>ML / AI</option>
                  <option>Final Year Project</option><option>API / Backend</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Detailed description</label>
                <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Describe features, tech stack, use cases…" />
              </div>
              <button className={styles.submitBtn} onClick={() => alert('Submitted for review! (demo)')}>Submit for review →</button>
            </div>
          )}
 
          {tab === 'listings' && (
            <div className={styles.panel}>
              <h3>My listings</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr><th>Title</th><th>Price</th><th>Sales</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>E-Commerce Platform</td><td>₹999</td><td>89</td><td><span className={`${styles.badge} ${styles.green}`}>Live</span></td></tr>
                    <tr><td>Hospital Mgmt FYP</td><td>₹1,499</td><td>54</td><td><span className={`${styles.badge} ${styles.green}`}>Live</span></td></tr>
                    <tr><td>Chat App (MERN)</td><td>₹799</td><td>72</td><td><span className={`${styles.badge} ${styles.green}`}>Live</span></td></tr>
                    <tr><td>IoT Smart Home FYP</td><td>₹2,199</td><td>—</td><td><span className={`${styles.badge} ${styles.purple}`}>In review</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
 
          {tab === 'earnings' && (
            <>
              <div className={styles.kpiGrid} style={{gridTemplateColumns:'repeat(3,1fr)'}}>
                <div className={styles.kpi}><div className={styles.kVal} style={{color:'var(--green)'}}>₹42,800</div><div className={styles.kLbl}>Lifetime earnings</div></div>
                <div className={styles.kpi}><div className={styles.kVal} style={{color:'var(--amber)'}}>₹6,240</div><div className={styles.kLbl}>Pending payout</div></div>
                <div className={styles.kpi}><div className={styles.kVal}>₹36,560</div><div className={styles.kLbl}>Paid out</div></div>
              </div>
              <div className={styles.panel}>
                <h3>Payout history</h3>
                <table className={styles.table}>
                  <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>15 Apr 2025</td><td style={{color:'var(--amber)'}}>₹6,240</td><td>UPI</td><td><span className={`${styles.badge} ${styles.amber}`}>Scheduled</span></td></tr>
                    <tr><td>1 Apr 2025</td><td style={{color:'var(--green)'}}>₹8,200</td><td>UPI</td><td><span className={`${styles.badge} ${styles.green}`}>Paid</span></td></tr>
                    <tr><td>1 Mar 2025</td><td style={{color:'var(--green)'}}>₹12,450</td><td>Bank</td><td><span className={`${styles.badge} ${styles.green}`}>Paid</span></td></tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}