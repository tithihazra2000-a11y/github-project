'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      background:'#12121a',
      borderBottom:'1px solid #2e2e3e',
      padding:'0 2rem',
      height:'56px',
      display:'flex',
      alignItems:'center',
      gap:'2rem',
      position:'sticky',
      top:0,
      zIndex:200
    }}>
      <Link href="/" style={{color:'#a594fa', fontWeight:800, fontSize:'18px', textDecoration:'none'}}>
        Dev<span style={{color:'#f0f0f8'}}>Market</span>
      </Link>
      <Link href="/browse" style={{color:'#a0a0b8', fontSize:'13px', textDecoration:'none'}}>Browse</Link>
      <Link href="/sell" style={{color:'#a0a0b8', fontSize:'13px', textDecoration:'none'}}>Sell</Link>
      <Link href="/about" style={{color:'#a0a0b8', fontSize:'13px', textDecoration:'none'}}>About</Link>
      <div style={{marginLeft:'auto', display:'flex', gap:'8px'}}>
        <Link href="/dashboard" style={{color:'#a0a0b8', fontSize:'13px', border:'1px solid #3a3a4e', padding:'6px 14px', borderRadius:'8px', textDecoration:'none'}}>Dashboard</Link>
        <Link href="/sell" style={{background:'#7c6cf8', color:'#fff', fontSize:'13px', padding:'6px 14px', borderRadius:'8px', textDecoration:'none'}}>Start Selling</Link>
      </div>
    </nav>
  )
}