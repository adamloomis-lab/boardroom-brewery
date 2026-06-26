import { useEffect, useState } from 'react'
import { hours } from '../data/site'

// Evenly-aligned hours list (day left, time right, never wrapping) that
// highlights the current day. "Today" is resolved client-side after mount, so
// the prerendered HTML carries no highlight (no hydration mismatch, and it
// always reflects the visitor's real current day rather than build time).
//
// `short` uses uniform 3-letter day labels (Mon, Tue, …) — best for narrow
// cards/footer where full names + nowrap times would overflow; the uniform
// width also makes the time column line up perfectly.
export default function HoursList({
  short = false,
  className = '',
}: {
  readonly short?: boolean
  readonly className?: string
}) {
  const [todayDow, setTodayDow] = useState<number | null>(null)

  useEffect(() => {
    setTodayDow(new Date().getDay())
  }, [])

  return (
    <ul className={`text-sm ${className}`}>
      {hours.map((h) => {
        const isToday = h.dow === todayDow
        return (
          <li
            key={h.day}
            aria-current={isToday ? 'date' : undefined}
            className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors ${
              isToday ? 'bg-gold/10 ring-1 ring-inset ring-gold/30' : ''
            }`}
          >
            <span
              className={`flex min-w-0 items-center gap-2 ${
                isToday ? 'font-medium text-gold' : 'text-on-surface-variant'
              }`}
            >
              {isToday && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              )}
              {short ? h.short : h.day}
              {isToday && !short && (
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                  Today
                </span>
              )}
            </span>
            <span
              className={`shrink-0 whitespace-nowrap tabular-nums ${
                isToday ? 'text-cream' : 'text-cream/80'
              }`}
            >
              {h.time}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
