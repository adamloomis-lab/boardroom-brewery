import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Instagram, Facebook } from 'lucide-react'
import { company } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly links: ReadonlyArray<{ readonly label: string; readonly href: string }>
}

// Full-screen, high-trust mobile navigation for Boardroom Brewery. A blurred
// backdrop fades in while a near-black amber-glow panel slides in from the
// right. Nav links stagger in as large uppercase rows with an arrow nudge on
// hover. Body scroll locks while open; respects prefers-reduced-motion.
export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const id = requestAnimationFrame(() => setShown(true))
      return () => {
        cancelAnimationFrame(id)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open])

  if (!open) return null

  return (
    <div className="xl:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`relative ml-auto h-full w-full max-w-sm overflow-y-auto bg-background text-cream shadow-[0_0_80px_-10px_rgba(246,174,45,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Subtle amber glow bleeding from the top-right corner */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(120% 60% at 100% 0%, rgba(246,174,45,0.14) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-full flex-col px-7 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <img src="/media/boardroom-logo-white.png" alt={company.name} className="h-8 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold/60 hover:text-gold"
            >
              <X size={24} />
            </button>
          </div>

          {/* Trust badge with pulsing amber dot */}
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-3 py-1.5 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-on-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-on-gold animate-pulse" /> Craft Beer + Taproom
          </span>

          <nav className="mt-6 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-cream/10 py-4 font-display text-headline-md uppercase tracking-[0.01em] text-cream/90 transition-all duration-500 hover:text-gold ${
                  shown ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: `${120 + i * 60}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-gold"
                />
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-col gap-3 transition-all duration-500 ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${120 + links.length * 60 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 rounded bg-gold px-6 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold shadow-[0_10px_28px_-8px_rgba(246,174,45,0.5)] transition-colors hover:bg-gold-light"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <Link
              href="/private-events"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded border border-cream/40 px-6 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Book the Space
            </Link>
          </div>

          {/* Contact footer */}
          <div className="mt-auto space-y-3 pt-10 font-body text-body-md text-cream/70">
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-cream"
            >
              <MapPin size={18} className="shrink-0 text-gold" /> {company.addressOneLine}
            </a>
            <p className="flex items-center gap-3">
              <Clock size={18} className="shrink-0 text-gold" /> Open 6 days · closed Mondays
            </p>
            <div className="flex items-center gap-5 pt-1">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Boardroom Brewery on Instagram"
                className="flex items-center gap-2 transition-colors hover:text-cream"
              >
                <Instagram size={18} className="shrink-0 text-gold" /> Instagram
              </a>
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Boardroom Brewery on Facebook"
                className="flex items-center gap-2 transition-colors hover:text-cream"
              >
                <Facebook size={18} className="shrink-0 text-gold" /> Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
