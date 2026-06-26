import { useEffect, useState } from 'react'
import { Link } from 'wouter'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-[200] mx-auto max-w-2xl rounded-lg border border-gold/20 bg-surface px-5 py-4 shadow-xl"
    >
      <p className="text-sm text-on-surface-variant">
        This site uses cookies to keep things running smoothly. We never sell your data.{' '}
        <Link href="/privacy" className="underline hover:text-gold transition-colors">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={accept}
          className="rounded bg-gold px-4 py-1.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90"
        >
          Sounds Good
        </button>
        <button
          onClick={decline}
          className="rounded border border-gold/40 px-4 py-1.5 text-sm font-semibold text-on-surface-variant transition-colors hover:border-gold hover:text-gold"
        >
          No Thanks
        </button>
      </div>
    </div>
  )
}
