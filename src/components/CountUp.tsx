import { useEffect, useRef } from 'react'

// Number that counts up when it scrolls into view. The REAL value is what
// renders on the server and stays if JavaScript, the observer, or reduced
// motion says no: the animation only ever borrows the number, so nothing can
// strand a zero on the page.
export default function CountUp({ value }: { readonly value: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = /^([\d.]+)(.*)$/.exec(value)
    if (!match) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const target = parseFloat(match[1])
    const suffix = match[2]
    const decimals = (match[1].split('.')[1] || '').length
    let raf = 0

    const run = () => {
      const t0 = performance.now()
      const dur = 900
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        el.textContent = (target * eased).toFixed(decimals) + suffix
        if (p < 1) raf = requestAnimationFrame(tick)
        else el.textContent = value
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    // Fail open: if the observer never fires within a beat and the element is
    // on screen, run anyway; and whatever happens, the final frame is `value`.
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        io.disconnect()
        run()
      }
    }, 1200)
    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
      if (raf) cancelAnimationFrame(raf)
      el.textContent = value
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}
