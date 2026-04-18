import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS } from '../../../lib/project.js'

export default function ProjectDetailPage({ params }) {
  const p = PROJECTS.find(p => p.id === Number(params.id))
  if (!p) return notFound()

  const fee   = Math.round(p.price * 0.05)
  const gst   = Math.round(p.price * 0.18)
  const total = p.price + fee + gst

  return (
    <div style={{maxWidth:'1100px', margin:'0 auto', padding:'2rem 2rem 4rem'}}>
      {/* Breadcrumb */}
      <div style={{display:'flex', gap:'6px', fontSize:'12px', color:'#606078', marginBottom:'1.5rem', flexWrap:'wrap'}}>
        <Link href="/" style={{color:'#a594fa'}}>Home</Link> /
        <Link href="/browse" style={{color:'#a594fa'}}>Browse</Link> /
        <span>{p.tag}</span> /
        <span style={{color:'#606078'}}>{p.title}</span>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:'2.5rem', alignItems:'start'}}>
        {/* LEFT */}
        <div>
          <div style={{height:'240px', borderRadius:'16px', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'90px', border:'1px solid #2e2e3e', marginBottom:'1.75rem'}}>
            {p.thumb}
          </div>
          <h1 style={{fontSize:'2.2rem', fontWeight:800, letterSpacing:'-1px', marginBottom:'.6rem'}}>{p.title}</h1>
          <div style={{display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap', marginBottom:'1.75rem', fontSize:'13px'}}>
            <span style={{color:'#f5a623'}}>★★★★★</span>
            <span style={{color:'#606078'}}>{p.rating} ({p.reviews} reviews)</span>
            <span style={{background:'rgba(124,108,248,.15)', color:'#a594fa', padding:'3px 10px', borderRadius:'20px', fontSize:'11px'}}>{p.tag}</span>
            <span style={{color:'#a0a0b8'}}>by <strong style={{color:'#f0f0f8'}}>{p.seller}</strong></span>
          </div>

          <div style={{marginBottom:'1.75rem'}}>
            <h3 style={{fontSize:'11px', color:'#606078', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:'.75rem'}}>About this project</h3>
            <p style={{color:'#a0a0b8', fontSize:'14px', lineHeight:1.75}}>{p.desc}</p>
          </div>

          <div style={{marginBottom:'1.75rem'}}>
            <h3 style={{fontSize:'11px', color:'#606078', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:'.75rem'}}>What's included</h3>
            <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'8px'}}>
              {['Complete source code','Database schema & migrations','Setup & deployment guide','6 months seller support','Free lifetime updates'].map(f => (
                <li key={f} style={{display:'flex', gap:'10px', color:'#a0a0b8', fontSize:'14px'}}>
                  <span style={{color:'#22d3a0', fontWeight:800}}>✓</span>{f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{fontSize:'11px', color:'#606078', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:'.75rem'}}>Tech stack</h3>
            <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
              {p.stack.map(t => <span key={t} style={{background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'20px', fontSize:'12px', color:'#606078', padding:'4px 10px'}}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* BUY CARD */}
        <div style={{background:'#12121a', border:'1px solid #2e2e3e', borderRadius:'16px', padding:'1.75rem', position:'sticky', top:'70px'}}>
          <div style={{fontFamily:'sans-serif', fontSize:'2.8rem', fontWeight:800, color:'#22d3a0', marginBottom:'1.25rem'}}>₹{p.price.toLocaleString()}</div>
          <ul style={{listStyle:'none', marginBottom:'1.5rem'}}>
            {['⬇ Instant download','🔒 Secure checkout','🔄 Lifetime updates','💬 6-month support','🛡 30-day protection'].map(perk => (
              <li key={perk} style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#a0a0b8', padding:'6px 0', borderBottom:'1px solid #2e2e3e'}}>{perk}</li>
            ))}
          </ul>
          <Link href={`/checkout?id=${p.id}`} style={{display:'block', width:'100%', textAlign:'center', background:'#7c6cf8', color:'#fff', borderRadius:'10px', padding:'13px', fontSize:'15px', fontWeight:600, textDecoration:'none'}}>
            Buy now — ₹{total.toLocaleString()}
          </Link>
          <div style={{fontSize:'11px', color:'#606078', textAlign:'center', marginTop:'.6rem'}}>Includes GST (18%) + platform fee</div>
        </div>
      </div>
    </div>
  )
}