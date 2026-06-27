import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ArrowRight, CalendarCheck } from 'lucide-react'

// Desktop-only floating "Book Your Event" pill, shown once the visitor scrolls
// past the hero. A glowing, sheened amber capsule that reads as premium.
export default function StickyBookEvent() {
  const [show, setShow] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold =
        hero && hero.offsetHeight > 0
          ? hero.offsetTop + hero.offsetHeight - 80
          : window.innerHeight * 0.6
      setShow(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  // Hide on the private-events page — the request form is already there.
  if (location === '/private-events') return null

  return (
    <Link
      href="/private-events"
      className={`group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-gold to-gold-dark px-7 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold shadow-[0_16px_44px_-8px_rgba(246,174,45,0.55)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.04] lg:flex ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_1s_ease]"
        aria-hidden="true"
      />
      <CalendarCheck size={18} /> Book Your Event
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
