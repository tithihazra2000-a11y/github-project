'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROJECTS = [
  { id:1, title:'E-Commerce Platform', thumb:'🛒', price:999,  tag:'Web App',    stack:['React','Node.js','MongoDB'], bg:'#12102a', desc:'Full e-commerce with cart, checkout & Stripe payments.' },
  { id:2, title:'Hospital Mgmt FYP',   thumb:'🏥', price:1499, tag:'Final Year', stack:['Django','PostgreSQL'],       bg:'#0d1f1a', desc:'Patient records, appointments & billing system.' },
  { id:3, title:'Chat App (MERN)',      thumb:'💬', price:799,  tag:'Web App',    stack:['React','Socket.io'],         bg:'#16122e', desc:'Real-time chat with rooms, DMs & file sharing.' },
  { id:4, title:'ML Crop Predictor',   thumb:'🌱', price:1299, tag:'Final Year', stack:['Python','Flask'],            bg:'#0f1f10', desc:'Predicts optimal crops from soil & weather data.' },
  { id:5, title:'Food Delivery App',   thumb:'🍕', price:1899, tag:'Mobile',     stack:['React Native','Firebase'],   bg:'#201510', desc:'Food delivery app with tracking & payments.' },
  { id:6, title:'Portfolio Template',  thumb:'✨', price:299,  tag:'Template',   stack:['HTML','CSS','GSAP'],         bg:'#10102a', desc:'Animated portfolio with smooth scroll & 3D bg.' },
]

const CATS = ['All','Web App','Final Year','Mobile','Template']

export default function Home() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === cat)

  return (
    <div style={{maxWidth:'1100px', margin:'0 auto', padding:'0 2rem 4rem'}}>

      {/* Hero */}
      <div style={{textAlign:'center', padding:'5rem 1rem 3rem'}}>
        <div style={{display:'inline-block', background:'rgba(124,108,248,.12)', border:'1px solid rgba(124,108,248,.3)', borderRadius:'20px', padding:'4px 14px', fontSize:'12px', color:'#c4b8fc', marginBottom:'1.5rem'}}>
          🚀 2,400+ projects listed
        </div>
        <h1 style={{fontFamily:'sans-serif', fontSize:'clamp(2.4rem,6vw,4rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-2px', marginBottom:'1.25rem'}}>
          The marketplace for<br/>
          <span style={{background:'linear-gradient(135deg,#a594fa,#f06292)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            developer projects
          </span>
        </h1>
        <p style={{color:'#a0a0b8', fontSize:'17px', marginBottom:'2.5rem'}}>
          Buy ready-made apps, final year projects & source code.
        </p>
        <div style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap'}}>
          <Link href="/browse" style={{background:'#7c6cf8', color:'#fff', padding:'12px 24px', borderRadius:'10px', textDecoration:'none', fontWeight:600, fontSize:'15px'}}>Browse Projects →</Link>
          <Link href="/sell" style={{background:'#1a1a26', color:'#a0a0b8', padding:'12px 24px', borderRadius:'10px', textDecoration:'none', border:'1px solid #3a3a4e', fontSize:'15px'}}>Sell Your Code</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'14px', margin:'3rem 0'}}>
        {[{n:'2,400+',l:'Projects listed'},{n:'840+',l:'Active sellers'},{n:'₹18L+',l:'Paid to sellers'}].map(s => (
          <div key={s.l} style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.75rem', textAlign:'center'}}>
            <div style={{fontFamily:'sans-serif', fontSize:'2.2rem', fontWeight:800, color:'#a594fa'}}>{s.n}</div>
            <div style={{color:'#606078', fontSize:'13px', marginTop:'5px'}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Category tabs */}
      <h2 style={{fontSize:'1.3rem', fontWeight:700, marginBottom:'1rem'}}>Browse by category</h2>
      <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'2rem'}}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:'7px 16px', borderRadius:'20px', border:'1px solid', cursor:'pointer',
            borderColor: cat===c ? '#7c6cf8' : '#2e2e3e',
            background: cat===c ? 'rgba(124,108,248,.1)' : '#12121a',
            color: cat===c ? '#a594fa' : '#a0a0b8',
            fontSize:'13px'
          }}>{c}</button>
        ))}
      </div>

      {/* Cards */}
      <h2 style={{fontSize:'1.3rem', fontWeight:700, marginBottom:'1rem'}}>Featured projects</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px'}}>
        {filtered.map(p => (
          <Link key={p.id} href={`/project/${p.id}`} style={{textDecoration:'none', color:'inherit'}}>
            <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', overflow:'hidden', transition:'all .2s', cursor:'pointer'}}>
              <div style={{height:'150px', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'54px'}}>
                {p.thumb}
                {p.tag==='Final Year' && <span style={{position:'absolute', background:'#7c6cf8', color:'#fff', fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'20px'}}>FYP</span>}
              </div>
              <div style={{padding:'1rem'}}>
                <div style={{fontWeight:700, fontSize:'15px', marginBottom:'4px'}}>{p.title}</div>
                <div style={{color:'#a0a0b8', fontSize:'12px', marginBottom:'10px'}}>{p.desc}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize:'18px', fontWeight:800, color:'#22d3a0'}}>₹{p.price.toLocaleString()}</span>
                  <span style={{color:'#f5a623', fontSize:'12px'}}>★★★★★</span>
                </div>
                <div style={{display:'flex', gap:'5px', flexWrap:'wrap', marginTop:'8px'}}>
                  {p.stack.map(t => <span key={t} style={{background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'20px', fontSize:'11px', color:'#606078', padding:'2px 9px'}}>{t}</span>)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}