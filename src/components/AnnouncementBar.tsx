import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { X } from 'lucide-react'
import { banner } from '../data/site'

// Gold announcement strip under the nav, switched on from the dashboard.
// Dismissal is remembered for the session, keyed by the message, so a new
// message shows again. The server always renders it visible; sessionStorage
// is only read after mount to keep hydration clean.
export default function AnnouncementBar() {
  const message = (banner.message || '').trim()
  const link = (banner.link || '').trim()
  const storageKey = `br-banner:${message}`
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === '1') setDismissed(true)
    } catch {
      /* storage blocked: the bar simply stays visible */
    }
  }, [storageKey])

  if (!banner.enabled || !message || dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(storageKey, '1')
    } catch {
      /* ignore */
    }
  }

  const textClass = 'font-label text-[13px] font-semibold uppercase tracking-[0.1em] text-on-gold'
  const external = /^https?:\/\//i.test(link)
  const body = !link ? (
    <span className={textClass}>{message}</span>
  ) : external ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`${textClass} underline-offset-4 hover:underline`}>{message}</a>
  ) : (
    <Link href={link} className={`${textClass} underline-offset-4 hover:underline`}>{message}</Link>
  )

  return (
    <div role="region" aria-label="Announcement" className="w-full bg-gold text-on-gold">
      <div className="container-x relative flex min-h-9 items-center justify-center py-1.5 pr-10">
        <p className="min-w-0 text-center leading-snug [overflow-wrap:anywhere]">{body}</p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-0 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-on-gold/80 transition-colors hover:text-on-gold"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
