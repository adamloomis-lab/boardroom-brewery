import { useState } from 'react'
import type { FormEvent } from 'react'
import { Beer, Grape, Truck, PartyPopper, Footprints, Trophy, MapPin, Instagram, Star, Check, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'
import { company, reviews } from '../data/site'

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

const links = [
  { label: 'See the Beer Menu', icon: Beer, href: '/beer', primary: true },
  { label: 'Wine List', icon: Grape, href: '/wine' },
  { label: 'Food Truck Schedule', icon: Truck, href: '/events' },
  { label: 'Book an Event', icon: PartyPopper, href: '/private-events' },
  { label: 'Run Club', icon: Footprints, href: '/run-club' },
  { label: 'World Cup Schedule', icon: Trophy, href: '/world-cup' },
]

function isExternal(h: string) { return /^https?:/.test(h) }

export default function QRScan() {
  const [sent, setSent] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'newsletter', ...data }) })
      setSent(true); form.reset()
    } catch { setSent(true) }
  }

  const Btn = ({ label, icon: Icon, href, primary }: { label: string; icon: typeof Beer; href: string; primary?: boolean }) => {
    const cls = `flex items-center gap-4 rounded-xl px-5 py-4 font-display text-headline-sm font-semibold transition-all active:scale-[0.98] ${primary ? 'bg-gold text-on-gold hover:bg-gold-light' : 'border border-outline bg-surface-card text-cream hover:border-gold'}`
    const inner = (<><Icon size={24} className={primary ? '' : 'text-gold'} /><span className="flex-1">{label}</span><ArrowRight size={18} className="opacity-60" /></>)
    return isExternal(href)
      ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
      : <a href={href} className={cls}>{inner}</a>
  }

  return (
    <section className="min-h-[100svh] bg-background px-5 pb-20 pt-28">
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Logo variant="stacked" />
          <p className="eyebrow mt-6">Now Pouring at Boardroom</p>
          <h1 className="mt-3 font-display text-headline-lg font-extrabold text-cream">Welcome In.</h1>
          <p className="mt-2 text-body-md text-on-surface-variant">Tap below for our menu, what's on, and how to find us. {company.nearLax}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {links.map((l) => (<Btn key={l.label} {...l} />))}
          <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-outline bg-surface-card px-5 py-4 font-display text-headline-sm font-semibold text-cream transition-all hover:border-gold active:scale-[0.98]"><MapPin size={24} className="text-gold" /><span className="flex-1">Get Directions</span><ArrowRight size={18} className="opacity-60" /></a>
          <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-outline bg-surface-card px-5 py-4 font-display text-headline-sm font-semibold text-cream transition-all hover:border-gold active:scale-[0.98]"><Instagram size={24} className="text-gold" /><span className="flex-1">Follow on Instagram</span><ArrowRight size={18} className="opacity-60" /></a>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <p className="eyebrow text-center">What People Say</p>
          <div className="mt-5 flex flex-col gap-4">
            {reviews.map((r) => (
              <figure key={r.quote} className="rounded-xl border border-outline-variant bg-surface-card p-5">
                <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={14} className="fill-gold text-gold" />))}</div>
                <blockquote className="mt-3 text-body-md text-on-surface">{r.quote}</blockquote>
                <figcaption className="mt-2 font-label text-[11px] uppercase tracking-[0.16em] text-gold">{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Signup */}
        <div className="mt-12 rounded-xl border border-gold/40 bg-surface-card p-6 text-center">
          <h2 className="font-display text-headline-sm font-bold text-cream">Stay in the Loop</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Be first to hear about special events and new beer.</p>
          {sent ? (
            <p className="mt-4 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.14em] text-gold"><Check size={18} /> You're in. Cheers!</p>
          ) : (
            <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
              <label htmlFor="qr-newsletter-email" className="sr-only">Email address</label>
              <input id="qr-newsletter-email" type="email" name="email" required placeholder="Your email" className="w-full rounded border border-outline bg-surface px-4 py-3 text-body-md text-cream placeholder:text-muted focus:border-gold focus-visible:outline-none focus:ring-2 focus:ring-gold/60" />
              <button type="submit" className="shrink-0 rounded bg-gold px-6 py-3 font-label text-[12px] font-bold uppercase tracking-[0.14em] text-on-gold hover:bg-gold-light">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
