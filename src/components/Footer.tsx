import { Link } from 'wouter'
import { Phone, MapPin, Mail } from 'lucide-react'
import Logo from './Logo'
import HoursList from './HoursList'
import SocialDock from './SocialDock'
import { company } from '../data/site'

const explore = [
  { label: 'Beer', href: '/beer' },
  { label: 'Wine', href: '/wine' },
  { label: 'Taproom', href: '/taproom' },
  { label: 'Events', href: '/events' },
  { label: 'Run Club', href: '/run-club' },
  { label: 'World Cup', href: '/world-cup' },
  { label: 'Private Events', href: '/private-events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-surface text-on-surface-variant">
      {/* warm amber glow accents on black */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo variant="stacked" className="h-auto" />
          <p className="mt-5 max-w-xs text-body-md">{company.shortBlurb}</p>
          <SocialDock className="mt-6" />
        </div>

        <div>
          <h3 className="font-label text-[12px] font-bold uppercase tracking-[0.18em] text-gold">Visit</h3>
          <ul className="mt-5 space-y-4 text-body-md">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-start gap-3 hover:text-gold">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{company.phone}</span>
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="flex items-start gap-3 hover:text-gold">
                <Mail size={18} className="mt-0.5 shrink-0 text-gold" />
                <span className="break-all">{company.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-label text-[12px] font-bold uppercase tracking-[0.18em] text-gold">Hours</h3>
          <HoursList short className="mt-4" />
        </div>

        <div>
          <h3 className="font-label text-[12px] font-bold uppercase tracking-[0.18em] text-gold">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-body-md">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-outline-variant">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-label-sm uppercase tracking-[0.16em] text-muted sm:flex-row">
          <span>© {year} {company.legalName}. All rights reserved.</span>
          <span className="flex items-center gap-4 text-center">
            <span>You must be 21 or older. Please enjoy responsibly.</span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <Link href="/privacy" className="transition-colors hover:text-gold">Privacy</Link>
            <span className="hidden sm:inline text-outline-variant">·</span>
            <Link href="/terms" className="transition-colors hover:text-gold">Terms</Link>
            <span className="hidden sm:inline text-outline-variant">·</span>
            <Link href="/accessibility" className="transition-colors hover:text-gold">Accessibility</Link>
          </span>
          <span>
            Website by{' '}
            <a href="https://adamloomismarketing.com" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant transition-colors hover:text-gold">
              Adam Loomis Marketing
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
