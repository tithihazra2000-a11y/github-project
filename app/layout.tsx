import type { Metadata } from 'next'
import './globals.css'
import Navbar from '../components/Navbar.js'

export const metadata: Metadata = {
  title: 'DevMarket — Buy & Sell Developer Projects',
  description: 'Buy ready-made apps, final year projects & source code.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}