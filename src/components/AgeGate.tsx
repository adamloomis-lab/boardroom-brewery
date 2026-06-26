import { useEffect, useState } from 'react'
import Logo from './Logo'

const KEY = 'boardroom-age-verified'

// 21+ verification overlay. Renders nothing during SSR/prerender and for already-
// verified or no-JS visitors, so it never blocks crawlers or content — it only
// mounts client-side when verification is missing.
export default function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== 'yes') setShow(true)
    } catch {
      /* storage blocked — don't gate */
    }
  }, [])

  if (!show) return null

  const confirm = () => {
    try {
      localStorage.setItem(KEY, 'yes')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 px-5 backdrop-blur" role="dialog" aria-modal="true" aria-labelledby="agegate-title">
      <div className="w-full max-w-md rounded-xl border border-outline-variant bg-surface-card p-8 text-center shadow-2xl sm:p-10">
        <div className="flex justify-center"><Logo variant="stacked" /></div>
        <h2 id="agegate-title" className="mt-6 font-display text-headline-md font-bold text-cream">Are You 21 or Older?</h2>
        <p className="mt-3 text-body-md text-on-surface-variant">You must be of legal drinking age to enter Boardroom Brewery. Please verify your age to continue.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={confirm} className="flex-1 rounded bg-gold px-6 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-colors hover:bg-gold-light">Yes, I am 21+</button>
          <a href="https://www.google.com" className="flex-1 rounded border border-cream/25 px-6 py-4 font-label text-[13px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-cream/5">No, exit</a>
        </div>
      </div>
    </div>
  )
}
