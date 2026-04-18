'use client'
import { useState } from 'react'

const FAQS = [
  { q:'How do I sell my project?', a:'Go to Seller Dashboard, click Upload project, fill details and submit for review. Approved within 1-2 business days.' },
  { q:"What's the commission?", a:'DevMarket charges 10% per sale. You keep 90%. Payouts on the 1st of every month.' },
  { q:'Is my purchase protected?', a:'Yes — 30-day buyer protection on all purchases. Raise a dispute if code is non-functional.' },
  { q:'Can I use projects commercially?', a:'Yes — single-user perpetual licence for personal and commercial use. No reselling.' },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2.5rem 2rem 4rem'}}>

      {/* Hero */}
      <div style={{padding:'4rem 0 3rem', borderBottom:'1px solid #2e2e3e', marginBottom:'3rem'}}>
        <div style={{display:'inline-block', background:'rgba(124,108,248,.12)', border:'1px solid rgba(124,108,248,.3)', borderRadius:'20px', padding:'4px 14px', fontSize:'12px', color:'#c4b8fc', marginBottom:'1.25rem'}}>👋 About DevMarket</div>
        <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, lineHeight:1.1, letterSpacing:'-1.5px', marginBottom:'1rem'}}>Built for developers,<br/>by developers</h1>
        <p style={{color:'#a0a0b8', fontSize:'17px', maxWidth:'560px', lineHeight:1.7}}>We connect student developers and indie hackers with buyers who need quality source code.</p>
      </div>

      {/* Cards */}
      <h2 style={{fontSize:'1.3rem', fontWeight:700, marginBottom:'1rem'}}>Why we exist</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'14px', marginBottom:'3rem'}}>
        {[
          {icon:'🎯', title:'Our mission',      body:'Make it easy for developers to monetize their work at fair prices.'},
          {icon:'🔒', title:'Buyer protection', body:'30-day protection on every purchase. We make it right if code fails.'},
          {icon:'💰', title:'Seller earnings',  body:'Sellers keep 90% of every sale. Flat 10% commission, no hidden fees.'},
          {icon:'✅', title:'Verified code',    body:'Every upload goes through manual review. No plagiarism, no broken code.'},
          {icon:'🎓', title:'Student-friendly', body:'Final year projects and college assignments all have a home here.'},
          {icon:'🚀', title:'Instant delivery', body:'Payments processed instantly, downloads available immediately.'},
        ].map(c => (
          <div key={c.title} style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.5rem'}}>
            <div style={{fontSize:'28px', marginBottom:'.75rem'}}>{c.icon}</div>
            <h3 style={{fontSize:'15px', marginBottom:'.4rem'}}>{c.title}</h3>
            <p style={{color:'#a0a0b8', fontSize:'13px', lineHeight:1.65}}>{c.body}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{fontSize:'1.3rem', fontWeight:700, marginBottom:'1rem'}}>FAQ</h2>
      <div style={{marginBottom:'3rem'}}>
        {FAQS.map((f, i) => (
          <div key={i} style={{borderBottom:'1px solid #2e2e3e'}}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
              width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'1.1rem 0', background:'none', border:'none', color:'#f0f0f8',
              fontSize:'15px', fontWeight:500, cursor:'pointer', textAlign:'left', gap:'12px'
            }}>
              <span>{f.q}</span>
              <span style={{color:'#606078', transform: openFaq === i ? 'rotate(90deg)' : 'none', transition:'transform .2s'}}>▶</span>
            </button>
            {openFaq === i && <p style={{color:'#a0a0b8', fontSize:'14px', lineHeight:1.7, paddingBottom:'1.1rem'}}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* Contact */}
      <h2 style={{fontSize:'1.3rem', fontWeight:700, marginBottom:'1.5rem'}}>Contact us</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
        <div>
          {[
            {icon:'📧', lbl:'Email', val:'support@devmarket.in'},
            {icon:'💬', lbl:'Live chat', val:'Mon–Sat, 10 AM – 7 PM IST'},
            {icon:'📍', lbl:'Office', val:'Kolkata, West Bengal, India'},
          ].map(c => (
            <div key={c.lbl} style={{display:'flex', gap:'12px', padding:'.75rem 0', borderBottom:'1px solid #2e2e3e', fontSize:'14px', color:'#a0a0b8'}}>
              <span style={{fontSize:'18px'}}>{c.icon}</span>
              <div><div style={{fontSize:'11px', color:'#606078', marginBottom:'2px'}}>{c.lbl}</div>{c.val}</div>
            </div>
          ))}
        </div>
        <div>
          {['Your name', 'Email', 'Message'].map(f => (
            <div key={f} style={{marginBottom:'1rem'}}>
              <label style={{display:'block', fontSize:'13px', color:'#a0a0b8', marginBottom:'5px'}}>{f}</label>
              {f === 'Message'
                ? <textarea style={{width:'100%', background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'10px', padding:'10px 14px', color:'#f0f0f8', fontSize:'14px', outline:'none', height:'100px', resize:'vertical'}} placeholder={`Your ${f.toLowerCase()}…`} />
                : <input type={f==='Email'?'email':'text'} style={{width:'100%', background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'10px', padding:'10px 14px', color:'#f0f0f8', fontSize:'14px', outline:'none'}} placeholder={`Your ${f.toLowerCase()}…`} />
              }
            </div>
          ))}
          <button style={{background:'#7c6cf8', border:'none', borderRadius:'10px', color:'#fff', padding:'10px 22px', fontSize:'14px', fontWeight:600, cursor:'pointer'}}
            onClick={() => alert('Message sent! (demo)')}>Send message →</button>
        </div>
      </div>

    </div>
  )
}