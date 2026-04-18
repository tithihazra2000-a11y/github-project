// app/download/page.tsx
'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/lib/projects'
import styles from './download.module.css'
 
function DownloadInner() {
  const params = useSearchParams()
  const id = Number(params.get('id')) || 1
  const p  = PROJECTS.find(pr => pr.id === id) || PROJECTS[0]
  const fee = Math.round(p.price * 0.05)
  const gst = Math.round(p.price * 0.18)
  const total = p.price + fee + gst
  const orderId = `#DM-2025-${(id * 9841).toString().slice(0,5)}`
  const [dlDone, setDlDone] = useState(false)
 
  return (
    <div className={styles.wrap}>
      <div className={styles.successHero}>
        <div className={styles.confetti}>🎉 🎊 🎉</div>
        <div className={styles.checkCircle}>✓</div>
        <h1>Purchase successful!</h1>
        <p>Your payment is confirmed. Download your project below.</p>
      </div>
 
      <div className={styles.dlCard}>
        <h3>Your download</h3>
        <div className={styles.fileRow}>
          <div className={styles.fileIcon}>📦</div>
          <div className={styles.fileMeta}>
            <div className={styles.fileName}>{p.title.toLowerCase().replace(/\s+/g,'-')}-source.zip</div>
            <div className={styles.fileSize}>Source code + documentation</div>
          </div>
          <button className={`${styles.dlBtn} ${dlDone ? styles.dlDone : ''}`}
            onClick={() => setDlDone(true)}>
            {dlDone ? '✓ Downloaded' : '⬇ Download'}
          </button>
        </div>
        <div className={styles.fileRow}>
          <div className={styles.fileIcon}>📄</div>
          <div className={styles.fileMeta}>
            <div className={styles.fileName}>README-setup-guide.pdf</div>
            <div className={styles.fileSize}>Setup &amp; deployment guide</div>
          </div>
          <button className={styles.dlBtnSec}>⬇ Download</button>
        </div>
      </div>
 
      <div className={styles.orderCard}>
        <h3>Order details</h3>
        <div className={styles.detailRow}><span>Project</span><strong>{p.title}</strong></div>
        <div className={styles.detailRow}><span>Order ID</span><code>{orderId}</code></div>
        <div className={styles.detailRow}><span>Amount paid</span><strong style={{color:'var(--green)'}}>₹{total.toLocaleString()}</strong></div>
        <div className={styles.detailRow}><span>Receipt</span>
          <button className={styles.receiptBtn} onClick={() => alert('Receipt emailed! (demo)')}>📧 Email receipt</button>
        </div>
      </div>
 
      <div className={styles.actions}>
        <Link href="/browse" className={styles.btn}>Browse more projects</Link>
        <Link href="/dashboard" className={`${styles.btn} ${styles.btnPrimary}`}>Go to my purchases</Link>
      </div>
    </div>
  )
}
 
export default function DownloadPage() {
  return (
    <Suspense fallback={<div style={{padding:'4rem',textAlign:'center',color:'var(--text3)'}}>Loading…</div>}>
      <DownloadInner />
    </Suspense>
  )
}