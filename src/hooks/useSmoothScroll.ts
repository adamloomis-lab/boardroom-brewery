import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null
export const getLenis = () => instance

// High-end momentum/smooth scrolling. Disabled entirely for reduced-motion users
// and never runs during SSR. Works alongside the IntersectionObserver scroll
// reveals and the rAF parallax (both read the real scroll position Lenis drives).
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    instance = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}
