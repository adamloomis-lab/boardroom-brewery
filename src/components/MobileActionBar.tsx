import { Phone, MapPin, Beer } from 'lucide-react'
import { Link } from 'wouter'
import { company } from '../data/site'

// High-end floating action bar: an elevated, blurred near-black capsule that
// stands off the edge. Glassy Call + Directions secondaries and a glowing amber
// Menu primary. Mobile only (hidden on lg+).
const c = company as Record<string, any>
const directions =
  c.mapsDir ||
  'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(c.addressOneLine || (c.address ? c.address.street + ', ' + c.address.city : c.name || ''))
const phone = c.phoneHref || 'tel:' + String(c.phone || '').replace(/[^\d+]/g, '')

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a
          href={phone}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition-all active:scale-95"
        >
          <Phone size={18} className="text-gold" /> Call
        </a>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-cream transition-all active:scale-95"
        >
          <MapPin size={18} className="text-gold" /> Directions
        </a>
        <Link
          href="/beer"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gold py-3.5 font-label text-[11px] font-bold uppercase tracking-[0.14em] text-on-gold shadow-[0_8px_22px_rgba(246,174,45,0.3)] animate-glow-pulse transition-all active:scale-95"
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]"
            aria-hidden="true"
          />
          <Beer size={18} /> Menu
        </Link>
      </div>
    </nav>
  )
}
