// Date formatting pinned to the taproom's time zone and a fixed locale, so the
// prerendered HTML and the hydrated client produce the same strings.
const TZ = 'America/Los_Angeles'
const LOCALE = 'en-US'

// Today's date in El Segundo as YYYY-MM-DD, comparable with holiday dates.
export function todayLA(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

// "Thu, Nov 26" from a YYYY-MM-DD string. Noon UTC lands on the same calendar
// day in Los Angeles, so the date never slides.
export function fmtHolidayDate(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return ymd
  return new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric' }).format(d)
}

const dayFmt = new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, weekday: 'short', month: 'short', day: 'numeric' })
const timeFmt = new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, hour: 'numeric', minute: '2-digit' })

// "Fri, Nov 14 · 6:00 PM - 9:00 PM" (end only when it is set and still that day).
export function fmtEventWhen(startsAt: string, endsAt?: string | null): string {
  const s = new Date(startsAt)
  if (Number.isNaN(s.getTime())) return ''
  let out = `${dayFmt.format(s)} · ${timeFmt.format(s)}`
  if (endsAt) {
    const e = new Date(endsAt)
    if (!Number.isNaN(e.getTime()) && e > s && dayFmt.format(e) === dayFmt.format(s)) out += ` - ${timeFmt.format(e)}`
  }
  return out
}

// "NOV 14" for the small date block on the home page.
export function fmtEventTag(startsAt: string): string {
  const s = new Date(startsAt)
  if (Number.isNaN(s.getTime())) return ''
  return new Intl.DateTimeFormat(LOCALE, { timeZone: TZ, month: 'short', day: 'numeric' }).format(s).toUpperCase()
}
