import { useEffect } from 'react'

// Observes every `.reveal` / `.reveal-group` / `.gold-rule` element on the page
// and adds `is-visible` as they scroll into view. Re-runs on route change so a
// freshly rendered page's elements get wired up. Resting CSS is fully visible,
// so this is purely additive — if the observer never runs, nothing is hidden.
export function useScrollReveal(deps: string) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-group, .gold-rule'),
    )
    if (els.length === 0) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    // Arm the animations only now, with a live observer in hand. The hiding
    // CSS is gated behind this class, so a visitor with no JS, a crashed
    // hydration, or a missing observer sees everything: fail open, always.
    document.documentElement.classList.add('reveal-ready')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    // If the page loaded already scrolled (reload mid-page, restored position),
    // anything scrolled past the top is shown immediately; the rest animate in.
    els.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    })
    // Belt and braces: IntersectionObserver is throttled in hidden and
    // restored background tabs, which can strand armed elements at opacity 0.
    // A plain geometry sweep shows anything whose top has entered the
    // viewport, whether or not an observer callback ever arrives.
    const sweep = () => {
      for (const el of els) {
        if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < window.innerHeight * 0.94) {
          el.classList.add('is-visible')
          io.unobserve(el)
        }
      }
    }
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        sweep()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', sweep)
    const ticks = [400, 1500, 4000].map((ms) => window.setTimeout(sweep, ms))

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', sweep)
      if (frame) cancelAnimationFrame(frame)
      ticks.forEach(clearTimeout)
    }
  }, [deps])
}
