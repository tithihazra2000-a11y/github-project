'use client'
import { useState } from 'react'
import Link from 'next/link'

const PURCHASES = [
  { id:1, thumb:'🛒', title:'E-Commerce Platform', seller:'DevMaster',  date:'12 Apr 2025', amount:1229 },
  { id:3, thumb:'💬', title:'Chat App (MERN)',       seller:'DevMaster',  date:'3 Mar 2025',  amount:979 },
  { id:6, thumb:'✨', title:'Portfolio Template',    seller:'ui_pro',     date:'14 Jan 2025', amount:389 },
]

const WISHLIST = [
  { id:2, thumb:'🏥', title:'Hospital Mgmt System', seller:'med_coder', price:1499 },
  { id:4, thumb:'🌱', title:'ML Crop Predictor',     seller:'ml_farm',   price:1299 },
]

export default function DashboardPage() {
  const [tab, setTab] = useState('purchases')
  const [stars, setStars] = useState(0)

  const menuStyle = (t) => ({
    display:'flex', alignItems:'center', gap:'8px', width:'100%',
    padding:'9px 12px', borderRadius:'10px', fontFamily:'inherit',
    fontSize:'13px', cursor:'pointer', border:'none', textAlign:'left',
    marginBottom:'2px', transition:'all .15s',
    background: tab===t ? '#1a1a26' : 'none',
    color: tab===t ? '#f0f0f8' : '#a0a0b8',
  })

  return (
    <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2.5rem 2rem 4rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'2rem', marginBottom:'4px'}}>My dashboard</h1>
        <p style={{color:'#a0a0b8'}}>Purchases, wishlist, reviews and settings</p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:'2rem', alignItems:'start'}}>

        {/* Sidebar */}
        <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1rem'}}>
          <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'.5rem .5rem 1.25rem', borderBottom:'1px solid #2e2e3e', marginBottom:'.75rem'}}>
            <div style={{width:'52px', height:'52px', borderRadius:'50%', background:'rgba(124,108,248,.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:700, color:'#a594fa'}}>RS</div>
            <div>
              <div style={{fontSize:'14px', fontWeight:500}}>Rohan Sharma</div>
              <div style={{fontSize:'12px', color:'#606078'}}>rohan@email.com</div>
            </div>
          </div>
          {[
            {id:'purchases', icon:'📦', label:'My purchases'},
            {id:'wishlist',  icon:'♡',  label:'Wishlist'},
            {id:'reviews',   icon:'★',  label:'My reviews'},
            {id:'settings',  icon:'⚙',  label:'Settings'},
          ].map(m => (
            <button key={m.id} style={menuStyle(m.id)} onClick={() => setTab(m.id)}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* PURCHASES */}
          {tab === 'purchases' && (
            <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.5rem'}}>
              <h3 style={{fontSize:'14px', fontWeight:700, color:'#a0a0b8', marginBottom:'1rem', paddingBottom:'.75rem', borderBottom:'1px solid #2e2e3e'}}>Purchased projects</h3>
              {PURCHASES.map(p => (
                <div key={p.id} style={{display:'flex', alignItems:'center', gap:'14px', padding:'12px 0', borderBottom:'1px solid #2e2e3e', flexWrap:'wrap'}}>
                  <div style={{width:'48px', height:'48px', borderRadius:'10px', background:'#1a1a26', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px'}}>{p.thumb}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'14px', fontWeight:500}}>{p.title}</div>
                    <div style={{fontSize:'12px', color:'#606078'}}>Purchased {p.date} · ₹{p.amount.toLocaleString()} · by {p.seller}</div>
                  </div>
                  <Link href={`/download?id=${p.id}`} style={{background:'#7c6cf8', color:'#fff', padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:600, textDecoration:'none'}}>⬇ Download</Link>
                </div>
              ))}
            </div>
          )}

          {/* WISHLIST */}
          {tab === 'wishlist' && (
            <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.5rem'}}>
              <h3 style={{fontSize:'14px', fontWeight:700, color:'#a0a0b8', marginBottom:'1rem', paddingBottom:'.75rem', borderBottom:'1px solid #2e2e3e'}}>Saved projects</h3>
              {WISHLIST.map(p => (
                <div key={p.id} style={{display:'flex', alignItems:'center', gap:'14px', padding:'12px 0', borderBottom:'1px solid #2e2e3e', flexWrap:'wrap'}}>
                  <div style={{width:'48px', height:'48px', borderRadius:'10px', background:'#1a1a26', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px'}}>{p.thumb}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'14px', fontWeight:500}}>{p.title}</div>
                    <div style={{fontSize:'12px', color:'#606078'}}>₹{p.price.toLocaleString()} · by {p.seller}</div>
                  </div>
                  <Link href={`/checkout?id=${p.id}`} style={{background:'#7c6cf8', color:'#fff', padding:'7px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:600, textDecoration:'none'}}>Buy now</Link>
                </div>
              ))}
            </div>
          )}

          {/* REVIEWS */}
          {tab === 'reviews' && (
            <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.5rem'}}>
              <h3 style={{fontSize:'14px', fontWeight:700, color:'#a0a0b8', marginBottom:'1rem', paddingBottom:'.75rem', borderBottom:'1px solid #2e2e3e'}}>Leave a review</h3>
              <div style={{marginBottom:'1rem'}}>
                <label style={{fontSize:'13px', color:'#a0a0b8', display:'block', marginBottom:'5px'}}>Select project</label>
                <select style={{width:'100%', background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'10px', padding:'10px 14px', color:'#f0f0f8', fontSize:'14px', outline:'none'}}>
                  <option>Portfolio Template</option>
                </select>
              </div>
              <div style={{marginBottom:'1rem'}}>
                <label style={{fontSize:'13px', color:'#a0a0b8', display:'block', marginBottom:'5px'}}>Rating</label>
                <div style={{display:'flex', gap:'6px'}}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setStars(n)} style={{background:'none', border:'1px solid', borderRadius:'4px', fontSize:'20px', cursor:'pointer', padding:'2px 6px', borderColor: stars>=n ? '#f5a623' : '#2e2e3e', color: stars>=n ? '#f5a623' : '#606078'}}>★</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:'1rem'}}>
                <label style={{fontSize:'13px', color:'#a0a0b8', display:'block', marginBottom:'5px'}}>Review</label>
                <textarea style={{width:'100%', background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'10px', padding:'10px 14px', color:'#f0f0f8', fontSize:'14px', outline:'none', height:'90px', resize:'vertical'}} placeholder="Share your experience…" />
              </div>
              <button style={{background:'#7c6cf8', border:'none', borderRadius:'10px', color:'#fff', padding:'10px 22px', fontSize:'14px', fontWeight:600, cursor:'pointer'}} onClick={() => alert('Review submitted! (demo)')}>Submit review →</button>
            </div>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.5rem'}}>
              <h3 style={{fontSize:'14px', fontWeight:700, color:'#a0a0b8', marginBottom:'1rem', paddingBottom:'.75rem', borderBottom:'1px solid #2e2e3e'}}>Profile settings</h3>
              {[{l:'First name',v:'Rohan'},{l:'Last name',v:'Sharma'},{l:'Email',v:'rohan@email.com'},{l:'Phone',v:'+91 98765 43210'}].map(f => (
                <div key={f.l} style={{marginBottom:'1rem'}}>
                  <label style={{fontSize:'13px', color:'#a0a0b8', display:'block', marginBottom:'5px'}}>{f.l}</label>
                  <input defaultValue={f.v} style={{width:'100%', background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'10px', padding:'10px 14px', color:'#f0f0f8', fontSize:'14px', outline:'none'}} />
                </div>
              ))}
              <button style={{background:'#7c6cf8', border:'none', borderRadius:'10px', color:'#fff', padding:'10px 22px', fontSize:'14px', fontWeight:600, cursor:'pointer'}} onClick={() => alert('Saved! (demo)')}>Save changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}