// ---------------------------------------------------------------------------
// Boardroom Brewery at Arena: single source of truth for all site content.
// El Segundo, CA. Craft beer, hard seltzer, natural-style wine, brewed on-site.
// Anything the taproom edits from its ALM Hub dashboard lives in
// src/site-content.json and is derived below; the rest is fixed copy.
// ---------------------------------------------------------------------------
import content from '../site-content.json'
import { todayLA } from '../lib/dates'

export type HourRow = { day: string; short: string; dow: number; time: string }
export type HolidayHour = { date: string; label: string; time: string }
export type Banner = { enabled: boolean; message: string; link: string }
export type SiteEvent = {
  id: string
  title: string
  starts_at: string
  ends_at?: string | null
  description?: string | null
  image_url?: string | null
  featured?: boolean
}
export type Beer = {
  id: string
  name: string
  abv: string
  tag: string
  style: string
  notes: string
  flavors: string[]
  image?: string
  featured?: boolean
  price?: string
  soldOut?: boolean
}
export type Wine = { id: string; name: string; released: string; status: string; soldOut: boolean; notes: string; price?: string }
export type GalleryImage = { src: string; alt: string }
export type PageImageKey = 'home' | 'beer' | 'wine' | 'taproom' | 'events' | 'runClub' | 'privateEvents' | 'gallery'

type SiteContent = {
  banner: Banner
  hours: HourRow[]
  hoursOverride: HourRow[] | null
  holidayHours: HolidayHour[]
  events: SiteEvent[]
  taplist: { updatedAt: string; beers: Beer[] }
  menu: { wines: Wine[] }
  gallery: GalleryImage[]
  pageImages: Partial<Record<PageImageKey, string>>
}
// The JSON's literal types (a null override, empty arrays) are narrower than
// what the dashboard can write, so it is typed by the contract above.
const site = content as unknown as SiteContent

export const company = {
  name: 'Boardroom Brewery',
  legalName: 'Boardroom Brewery at Arena',
  tagline: 'Crafted at the Arena',
  seoTagline: 'Craft Brewery & Event Space in El Segundo, CA',
  shortBlurb:
    'Small-batch beer, natural-style wines, and hard seltzers with clean flavors. A modern South Bay taproom near LAX, built for great nights and private events.',
  nearLax: 'In El Segundo, just minutes from LAX and the South Bay.',
  phone: '(310) 510-6698 ext. 211',
  phoneHref: 'tel:+13105106698',
  textHref: 'sms:+13105106698',
  email: 'forchi@boardroomatarena.com',
  emailHref: 'mailto:forchi@boardroomatarena.com',
  address: {
    street: '211 Arena Street',
    city: 'El Segundo',
    state: 'CA',
    zip: '90245',
  },
  addressOneLine: '211 Arena Street, El Segundo, CA 90245',
  geo: { lat: 33.9192, lng: -118.4165 },
  mapsDir: 'https://maps.app.goo.gl/7wNnWiNimctZMNYd8',
  mapsEmbed:
    'https://www.google.com/maps?q=Boardroom+Brewery+211+Arena+Street+El+Segundo+CA+90245&output=embed',
  social: {
    instagram: 'https://www.instagram.com/boardroomatarena/',
    facebook: 'https://www.facebook.com/profile.php?id=100084601670077',
  },
} as const

// Taproom hours. The dashboard's temporary override wins when it is set.
export type Hour = HourRow & { closed: boolean }
const isClosed = (t: string) => /^\s*closed\s*$/i.test(t)
const activeHours: HourRow[] = site.hoursOverride && site.hoursOverride.length ? site.hoursOverride : site.hours
export const hours: Hour[] = activeHours.map((h) => ({ ...h, closed: isClosed(h.time) }))

// "4:00 pm" -> "16:00". Returns null for anything that does not parse.
function to24h(s: string): string | null {
  const m = s.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i)
  if (!m) return null
  let hh = Number(m[1]) % 12
  if (m[3].toLowerCase() === 'pm') hh += 12
  return `${String(hh).padStart(2, '0')}:${m[2] || '00'}`
}
// "4:00 pm - 8:00 pm" -> { opens: '16:00', closes: '20:00' }.
function parseRange(time: string): { opens: string; closes: string } | null {
  const parts = time.split(/\s*(?:-|to)\s*/i)
  if (parts.length !== 2) return null
  const opens = to24h(parts[0])
  const closes = to24h(parts[1])
  return opens && closes ? { opens, closes } : null
}
// "4:00 pm" -> "4 PM", "4:30 pm" -> "4:30 PM".
const compactTime = (t: string) =>
  isClosed(t) ? 'Closed' : t.replace(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/gi, (_, h, m, ap) => `${h}${m && m !== '00' ? `:${m}` : ''} ${ap.toUpperCase()}`)

// Consecutive days with the same hours collapse into one row ("Wed - Thu").
function groupConsecutive<T>(rows: Hour[], key: (h: Hour) => T | null): { days: Hour[]; value: T }[] {
  const out: { days: Hour[]; value: T }[] = []
  for (const h of rows) {
    const v = key(h)
    if (v === null) continue
    const last = out[out.length - 1]
    const lastDow = last ? last.days[last.days.length - 1].dow : null
    const consecutive = lastDow !== null && (h.dow === (lastDow + 1) % 7)
    if (last && consecutive && JSON.stringify(last.value) === JSON.stringify(v)) last.days.push(h)
    else out.push({ days: [h], value: v })
  }
  return out
}

export const hoursCompact: { day: string; time: string }[] = groupConsecutive(hours, (h) => compactTime(h.time)).map((g) => ({
  day: g.days.length === 1 ? g.days[0].day : `${g.days[0].short} - ${g.days[g.days.length - 1].short}`,
  time: g.value,
}))

// Schema.org openingHoursSpecification (closed days omitted).
export const openingHours: { days: string[]; opens: string; closes: string }[] = groupConsecutive(hours, (h) =>
  h.closed ? null : parseRange(h.time),
).map((g) => ({ days: g.days.map((d) => d.day), opens: g.value.opens, closes: g.value.closes }))

// Holiday exceptions. Only dates still ahead of us, soonest first.
const allHolidayHours: HolidayHour[] = [...site.holidayHours].sort((a, b) => a.date.localeCompare(b.date))
export const upcomingHolidayHours = (now: Date = new Date()): HolidayHour[] => {
  const today = todayLA(now)
  return allHolidayHours.filter((h) => h.date >= today)
}
export const holidayHours: HolidayHour[] = upcomingHolidayHours()

// Announcement bar the taproom switches on from the dashboard.
export const banner: Banner = site.banner

// Dated events the taproom posts. Ones still running today stay listed.
const eventEnd = (e: SiteEvent) => new Date(e.ends_at || e.starts_at).getTime()
export const filterUpcomingEvents = (now: Date = new Date()): SiteEvent[] =>
  site.events
    .filter((e) => !Number.isNaN(eventEnd(e)) && eventEnd(e) >= now.getTime())
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at))
export const upcomingEvents: SiteEvent[] = filterUpcomingEvents()

// Hero image per page. Pages fall back to their original photo when unset.
export const pageImages: Partial<Record<PageImageKey, string>> = site.pageImages || {}

export const distinctions = [
  '100% brewed on-site on Arena Street',
  'Locally sourced, high-quality ingredients',
  'Rotating food trucks + private event space',
]

// Untappd live menu embed (their real beer list). Used on the Beer page.
export const untappd = { menuId: 49131, sectionId: 174855 }

// Flagship + rotating pours, as the taproom last published them.
export const beers: Beer[] = site.taplist.beers

// ---------------------------------------------------------------------------
// Wine program: natural-style, low-intervention wines (Lodi AVA, Ripon CA).
// ---------------------------------------------------------------------------
export const wineIntro =
  'At Boardroom Brewery in El Segundo, our wines reflect the same creativity and care that define our craft beers and seltzers. We focus on natural-style, low-intervention wines, thoughtfully sourced from independent producers across California. Every pour is guided by the same philosophy: minimal additives, maximum character, and an experience rooted in authenticity.'

export const wineRegion = {
  name: 'Lodi AVA, Ripon, California',
  blurb:
    'Grown in the sandy-loam soils of the Lodi region, where warm Central Valley days meet cool Delta breezes. These conditions shape expressive, balanced, low-intervention wines of real character.',
}

export const wines: Wine[] = site.menu.wines

// ---------------------------------------------------------------------------
// Run / walk club: Wednesdays from the taproom.
// ---------------------------------------------------------------------------
export const runClub = {
  day: 'Wednesdays',
  time: '6:00 PM',
  distance: 'Roughly 5 kilometers',
  route:
    'From Boardroom down to the jetty / blue barrels area on The Strand, and back. Roughly 5 kilometers round trip.',
  leader:
    'Runs are led by club lead Daniel, who is on his way to running 50 marathons by the time he turns 50.',
  walkers:
    'Walkers welcome! We understand walking might be the right pace. We welcome you and have a walking crew too. The beers will be waiting.',
}

// ---------------------------------------------------------------------------
// Private events / book the space.
// ---------------------------------------------------------------------------
export const privateEvents = {
  headline: 'Brewery Event Space in Los Angeles, Near LAX',
  blurb:
    'Host your next event at Boardroom Brewery, a modern craft brewery and event space in El Segundo, just minutes from LAX and the South Bay. A unique alternative to traditional event venues.',
  eventTypes: [
    'Corporate events & team offsites',
    'Birthday parties & celebrations',
    'Networking events & meetups',
    'Holiday parties',
    'Baby & wedding showers',
    'Graduation parties',
    'Bachelor & bachelorette parties',
    'Happy hours',
    'Club meetings',
    'Private gatherings',
  ],
  features: [
    { title: 'Indoor + Outdoor', desc: 'Private and semi-private indoor and outdoor areas, together or apart.' },
    { title: 'Flexible Layouts', desc: 'Flexible seating and layouts for small groups or large parties.' },
    { title: 'Dedicated Bar', desc: 'Dedicated bar service, hosted bar tabs, and craft beer & beverage packages.' },
    { title: 'Reserved Space', desc: 'Reserved space options and custom event configurations to fit your night.' },
  ],
  pricing: 'Contact us for pricing and availability.',
}

// Why-visit feature list, verbatim from their taproom page.
export const taproomFeatures = [
  'Brewery + event space hybrid',
  'Minutes from LAX',
  'Rotating craft beer & seltzers',
  'Perfect for groups & private events',
  'Relaxed, modern atmosphere',
  'Kid- & dog-friendly',
]

// ---------------------------------------------------------------------------
// Recurring / featured events (food trucks rotate daily).
// ---------------------------------------------------------------------------
export const events = [
  {
    title: 'Wednesday Run Club',
    when: 'Wednesdays · 6:00 PM',
    tag: 'Weekly',
    desc: 'A 5K out to The Strand and back, led by club lead Daniel. Walkers welcome, beers waiting at the finish.',
  },
  {
    title: 'Rotating Food Trucks',
    when: 'Most days · see schedule',
    tag: 'Kitchen',
    desc: 'A different food truck nearly every day, from Beachside Tacos to Freddy’s Birria. Check the calendar for who’s parked.',
  },
  {
    title: 'Trivia & Comedy Nights',
    when: 'Select nights',
    tag: 'Taproom',
    desc: 'Hard Tech Trivia, comedy shows, and game nights through the month. Kid- and dog-friendly, always.',
  },
]

// ---------------------------------------------------------------------------
// Gallery: every photo, in the order the taproom arranges it. Sources may be
// site paths or absolute URLs from dashboard uploads.
// ---------------------------------------------------------------------------
export const gallery: GalleryImage[] = site.gallery

// Hero / feature videos (client footage).
export const videos = ['/media/video/brewery-1.mp4', '/media/video/brewery-2.mp4']

// Their real Events-page images (pulled from boardroomatarena.com/EVENTS).
export const eventsGallery = [
  { src: '/media/events/img-1116.png', alt: 'Boardroom Brewery run club along the El Segundo strand' },
  { src: '/media/events/img-1107.png', alt: 'Boardroom Brewery event' },
  { src: '/media/events/ig-post.png', alt: 'Boardroom Brewery event announcement' },
  { src: '/media/events/design-34.png', alt: 'Boardroom Brewery event' },
  { src: '/media/events/design-77.png', alt: 'Boardroom Brewery event' },
  { src: '/media/events/design-36.png', alt: 'Boardroom Brewery' },
]

// Real Google reviews (from their site). Social proof on the QR landing page.
export const reviews = [
  {
    quote:
      "One of my favorites here in El Segundo. I visit from AZ monthly, and it's always one of my go-to breweries. Great beer and service, I definitely recommend!",
    author: 'Google Review',
  },
  {
    quote:
      'We had a few beers there and loved it. Simple hidden gem in the Gundo, great beer for $8 or so, with a nice back area for more private gatherings.',
    author: 'Google Review',
  },
  {
    quote:
      'The space is very retro and has a laid back vibe. Beer is ice cold and very good, and the hard seltzers are tasty and refreshing, especially on a hot summer day. I highly recommend this establishment!',
    author: 'Google Review',
  },
]

// General beer shots for the beer-page scroller. Photos of specific beers come
// from the tap list itself (useTapList), so a retired beer leaves with its picture.
export const beerGallery = [
  '/media/gallery/beerpic.jpg',
  '/media/beer/beer-photo-1.jpg',
  '/media/beer/beer-photo-2.jpg',
  '/media/beer/beer-photo-3.jpg',
  '/media/beer/beer-photo-4.jpg',
]
