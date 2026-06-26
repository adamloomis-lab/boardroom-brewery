import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

// Condensed desktop set; full list shows in the mobile drawer.
const primary = [
  { label: 'Beer', href: '/beer' },
  { label: 'Wine', href: '/wine' },
  { label: 'Taproom', href: '/taproom' },
  { label: 'Events', href: '/events' },
  { label: 'Run Club', href: '/run-club' },
  { label: 'World Cup', href: '/world-cup' },
]
const all = [
  ...primary,
  { label: 'Private Events', href: '/private-events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)
  const solid = scrolled || open
  const linkBase = 'font-label text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-gold'

  return (
    <header className={`fixed top-0 z-50 w-full transition-colors duration-300 ${solid ? 'border-b border-gold/15 bg-surface-container/95 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.75)] backdrop-blur-md' : 'border-b border-transparent bg-gradient-to-b from-black/60 to-transparent'}`}>
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-7 xl:flex">
          {primary.map((l) => {
            const active = l.href === location
            return (
              <Link key={l.href} href={l.href} className={`${linkBase} ${active ? 'text-gold' : 'text-cream'}`}>{l.label}</Link>
            )
          })}
          <a href={company.phoneHref} className="inline-flex items-center gap-2 font-label text-[12px] font-semibold uppercase tracking-[0.1em] text-cream transition-colors hover:text-gold">
            <Phone size={15} className="text-gold" /> Call
          </a>
          <Link href="/private-events" className="inline-flex items-center rounded bg-gold px-5 py-2.5 font-label text-[12px] font-bold uppercase tracking-[0.14em] text-on-gold transition-colors hover:bg-gold-light">
            Book Space
          </Link>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-cream xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-outline-variant bg-background xl:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {all.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded px-2 py-3 font-label text-sm font-semibold uppercase tracking-[0.12em] text-cream hover:bg-surface-container">{l.label}</Link>
            ))}
            <a href={company.phoneHref} className="mt-2 inline-flex items-center justify-center gap-2 rounded border border-gold/50 px-5 py-3 font-label text-sm font-semibold uppercase tracking-[0.12em] text-gold">
              <Phone size={17} /> {company.phone}
            </a>
            <Link href="/private-events" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded bg-gold px-5 py-3 font-label text-sm font-bold uppercase tracking-[0.12em] text-on-gold">Book the Space</Link>
          </div>
        </div>
      )}
    </header>
  )
}
