import { useUpcoming } from '../hooks/useUpcoming'
import { fmtHolidayDate } from '../lib/dates'

// Upcoming holiday exceptions, listed under the regular hours. Renders
// nothing when the taproom has none posted.
export default function HolidayHours({ className = '' }: { readonly className?: string }) {
  const { holidays } = useUpcoming()
  if (!holidays.length) return null
  return (
    <div className={className}>
      <p className="px-3 font-label text-[11px] uppercase tracking-[0.16em] text-gold">Holiday hours</p>
      <ul className="mt-2 text-sm">
        {holidays.map((h) => (
          <li key={`${h.date}-${h.label}`} className="flex items-center justify-between gap-3 rounded-[3px] px-3 py-2">
            <span className="min-w-0 text-on-surface-variant">
              <span className="text-cream">{fmtHolidayDate(h.date)}</span>
              {h.label ? <> · {h.label}</> : null}
            </span>
            <span className="shrink-0 whitespace-nowrap tabular-nums text-cream/80">{h.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
