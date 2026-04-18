// app/browse/page.tsx
'use client'
import { useState, useMemo } from 'react'
import ProjectCard from '../../components/ProjectCard.js'
import { PROJECTS } from '../../lib/project.js'
import styles from './browse.module.css'
 
const CATS = ['All','Web App','Final Year','Mobile','API','Template']
 
export default function BrowsePage() {
  const [q, setQ]       = useState('')
  const [cat, setCat]   = useState('All')
  const [sort, setSort] = useState('popular')
 
  const results = useMemo(() => {
    let list = PROJECTS.filter(p => {
      const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.stack.join(' ').toLowerCase().includes(q.toLowerCase())
      const matchC = cat === 'All' || p.tag === cat
      return matchQ && matchC
    })
    if (sort === 'price-asc')  list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'popular')    list = [...list].sort((a,b) => b.sales - a.sales)
    return list
  }, [q, cat, sort])
 
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1>Browse projects</h1>
        <p>Ready-made source code, apps &amp; final year projects</p>
      </div>
 
      {/* Filter bar */}
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search projects, tech, keywords…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="popular">Most popular</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
        </select>
      </div>
 
      {/* Cat tabs */}
      <div className={styles.catTabs}>
        {CATS.map(c => (
          <button key={c} className={`${styles.catTab} ${cat === c ? styles.catActive : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
 
      <div className={styles.resultsBar}>
        <span>{results.length} project{results.length !== 1 ? 's' : ''} found</span>
      </div>
 
      <div className={styles.grid}>
        {results.map(p => <ProjectCard key={p.id} p={p} />)}
        {results.length === 0 && (
          <div className={styles.empty}>No projects match your search.</div>
        )}
      </div>
    </div>
  )
}