'use client'
import Link from 'next/link'

export default function ProjectCard({ p }) {
  return (
    <Link href={`/project/${p.id}`} style={{textDecoration:'none', color:'inherit'}}>
      <div style={{
        background:'#12121a', border:'1px solid #2e2e3e',
        borderRadius:'16px', overflow:'hidden',
        transition:'all .2s', cursor:'pointer'
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor='#7c6cf8'}
        onMouseLeave={e => e.currentTarget.style.borderColor='#2e2e3e'}
      >
        <div style={{height:'150px', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'54px', position:'relative'}}>
          {p.thumb}
          {p.tag === 'Final Year' && (
            <span style={{position:'absolute', top:'10px', right:'10px', background:'#7c6cf8', color:'#fff', fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'20px'}}>FYP</span>
          )}
        </div>
        <div style={{padding:'1rem'}}>
          <div style={{fontWeight:700, fontSize:'15px', marginBottom:'4px'}}>{p.title}</div>
          <div style={{color:'#a0a0b8', fontSize:'12px', marginBottom:'10px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>{p.desc}</div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:'18px', fontWeight:800, color:'#22d3a0'}}>₹{p.price.toLocaleString()}</span>
            <span style={{color:'#f5a623', fontSize:'12px'}}>★★★★★</span>
          </div>
          <div style={{display:'flex', gap:'5px', flexWrap:'wrap', marginTop:'8px'}}>
            {p.stack.slice(0,3).map(t => (
              <span key={t} style={{background:'#1a1a26', border:'1px solid #2e2e3e', borderRadius:'20px', fontSize:'11px', color:'#606078', padding:'2px 9px'}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}