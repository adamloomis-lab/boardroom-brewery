// ---------------------------------------------------------------------------
// Boardroom Brewery at Arena — single source of truth for all site content.
// El Segundo, CA. Craft beer, hard seltzer, natural-style wine, brewed on-site.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Boardroom Brewery',
  legalName: 'Boardroom Brewery at Arena',
  tagline: 'Crafted at the Arena',
  seoTagline: 'Craft Brewery & Event Space in El Segundo, CA',
  shortBlurb:
    'Small-batch beer, natural-style wines, and hard seltzers with clean flavors — a modern South Bay taproom near LAX, built for great nights and private events.',
  nearLax: 'In El Segundo, just minutes from LAX and the South Bay.',
  phone: '(310) 510-6698 ext. 211',
  phoneHref: 'tel:+13105106698,211',
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

// Real taproom hours (open 6 days, closed Mondays). The World Cup window in June
// runs its own daily schedule — see worldcup.ts.
export const hours = [
  { day: 'Monday', short: 'Mon', dow: 1, time: 'Closed', closed: true },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '4:00 pm – 8:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '4:00 pm – 9:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '4:00 pm – 9:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '3:00 pm – 10:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '12:00 pm – 10:00 pm' },
  { day: 'Sunday', short: 'Sun', dow: 0, time: '12:00 pm – 8:00 pm' },
]

export const hoursCompact = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tue', time: '4 PM – 8 PM' },
  { day: 'Wed – Thu', time: '4 PM – 9 PM' },
  { day: 'Friday', time: '3 PM – 10 PM' },
  { day: 'Saturday', time: '12 PM – 10 PM' },
  { day: 'Sunday', time: '12 PM – 8 PM' },
]

// Schema.org openingHoursSpecification (Monday omitted = closed)
export const openingHours = [
  { days: ['Tuesday'], opens: '16:00', closes: '20:00' },
  { days: ['Wednesday', 'Thursday'], opens: '16:00', closes: '21:00' },
  { days: ['Friday'], opens: '15:00', closes: '22:00' },
  { days: ['Saturday'], opens: '12:00', closes: '22:00' },
  { days: ['Sunday'], opens: '12:00', closes: '20:00' },
]

export const distinctions = [
  '100% brewed on-site on Arena Street',
  'Locally sourced, high-quality ingredients',
  'Rotating food trucks + private event space',
]

// Untappd live menu embed (their real beer list). Used on the Beer page.
export const untappd = { menuId: 49131, sectionId: 174855 }

// Flagship + rotating pours (from the taproom menu). Untappd is the live source.
export type Beer = { name: string; abv: string; tag: string; style: string; notes: string; flavors: string[]; image?: string; featured?: boolean }
// Curated preview of the lineup (photos are theirs). The Untappd embed is the
// live source of truth for exactly what's pouring today.
export const beers: Beer[] = [
  {
    name: 'Hazy Juicy IPA',
    abv: '6.5%',
    tag: 'Featured Pour',
    style: 'New England IPA',
    notes:
      'Soft, juicy, and tropical — a pillowy mouthfeel loaded with citrus and stone-fruit hop character. Our most-poured hazy and the quintessential El Segundo pour.',
    flavors: ['Juicy', 'Tropical', 'Soft'],
    image: '/media/beer/hazy-juicy-ipa.jpg',
    featured: true,
  },
  {
    name: 'BBA Golden Stout',
    abv: '7.2%',
    tag: 'Seasonal',
    style: 'Barrel-Aged Golden Stout',
    notes: 'A smooth golden stout with vanilla, caramel, and a warm barrel finish. Rich without the heaviness.',
    flavors: ['Smooth', 'Vanilla', 'Rich'],
    image: '/media/beer/golden-stout.jpg',
  },
  {
    name: 'Baja Lager',
    abv: '4.2%',
    tag: 'Core',
    style: 'Mexican-Style Lager',
    notes: 'Easy, crushable Mexican-style lager with a wedge of lime. The patio pour.',
    flavors: ['Light', 'Crisp', 'Lime'],
    image: '/media/beer/baja-lager.jpg',
  },
  {
    name: 'Tropic Mango Sour',
    abv: '5.6%',
    tag: 'Core',
    style: 'Fruited Kettle Sour',
    notes: 'A bright kettle sour bursting with ripe mango. Tart, refreshing, and made for the sun.',
    flavors: ['Mango', 'Tart', 'Bright'],
    image: '/media/beer/mango-sour.jpg',
  },
  {
    name: 'Pilsner',
    abv: '4.7%',
    tag: 'Core',
    style: 'Czech-Style Pilsner',
    notes: 'Crisp, clean, and classic. Soft bready malt with a snappy noble-hop bite. Always on.',
    flavors: ['Crisp', 'Clean', 'Classic'],
    image: '/media/beer/pilsner.jpg',
  },
]

// ---------------------------------------------------------------------------
// Wine program — natural-style, low-intervention wines (Lodi AVA, Ripon CA).
// ---------------------------------------------------------------------------
export const wineIntro =
  'At Boardroom Brewery in El Segundo, our wines reflect the same creativity and care that define our craft beers and seltzers. We focus on natural-style, low-intervention wines — thoughtfully sourced from independent producers across California. Every pour is guided by the same philosophy: minimal additives, maximum character, and an experience rooted in authenticity.'

export const wineRegion = {
  name: 'Lodi AVA — Ripon, California',
  blurb:
    'Grown in the sandy-loam soils of the Lodi region, where warm Central Valley days meet cool Delta breezes. These conditions shape expressive, balanced, low-intervention wines of real character.',
}

export const wines = [
  {
    name: '1st Offering — Cabernet Sauvignon',
    released: 'Released October 23, 2025',
    status: 'Sold out — only 108 bottles',
    soldOut: true,
    notes:
      'A 100% California Cabernet Sauvignon. Fruit-forward, easy to drink and fun to enjoy, with notes of stone fruit, cherry, even cranberry. Let it open up and you find violet florals. Slightly jammy, very drinkable, with low tannin — none of that dry mouth so traditional to California Cabernet.',
  },
  {
    name: '2nd Offering — Cabernet Sauvignon',
    released: 'Released February 3, 2026',
    status: '600 bottles in this batch — don’t miss it',
    soldOut: false,
    notes:
      'Another 100% California Cabernet that hits classic big-Cali Cab on the nose — ripe blackberry jam, dark cherry, and plum compote leap from the glass. Subtle vanilla and baking spice from American-oak aging, with delicate hints of cassis and dried herbs. Inviting and fruit-forward without crossing into cloying territory. Finishes dry and leaves you wanting more.',
  },
] as const

// ---------------------------------------------------------------------------
// Run / walk club — Wednesdays from the taproom.
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
    'Walkers welcome! We understand walking might be the right pace — we welcome you and have a walking crew too. The beers will be waiting.',
}

// ---------------------------------------------------------------------------
// Private events / book the space.
// ---------------------------------------------------------------------------
export const privateEvents = {
  headline: 'Brewery Event Space in Los Angeles, Near LAX',
  blurb:
    'Host your next event at Boardroom Brewery — a modern craft brewery and event space in El Segundo, just minutes from LAX and the South Bay. A unique alternative to traditional event venues.',
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
// Recurring / featured events (food trucks rotate daily; see World Cup page).
// ---------------------------------------------------------------------------
export const events = [
  {
    title: 'Wednesday Run Club',
    when: 'Wednesdays · 6:00 PM',
    tag: 'Weekly',
    desc: 'A 5K out to The Strand and back, led by club lead Daniel. Walkers welcome — beers waiting at the finish.',
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
  {
    title: 'World Cup Watch Parties',
    when: 'June 2026',
    tag: 'Featured',
    desc: 'Every match on the big screen all month, with daily food trucks and special events. Minutes from SoFi Stadium.',
  },
]

// ---------------------------------------------------------------------------
// Gallery — every photo provided by the client (49 images), used in full.
// ---------------------------------------------------------------------------
const galleryExt = (n: number) =>
  n <= 31 ? 'jpg' : n <= 36 ? 'jpeg' : n <= 39 ? 'png' : 'webp'
export const gallery = [
  { src: '/media/gallery/taproom.jpg', alt: 'Inside the Boardroom Brewery brewhouse in El Segundo' },
  { src: '/media/gallery/beerpic.jpg', alt: 'A fresh Boardroom Brewery pour out front in El Segundo' },
  ...Array.from({ length: 49 }, (_, i) => {
    const n = i + 1
    return {
      src: `/media/gallery/br-${String(n).padStart(2, '0')}.${galleryExt(n)}`,
      alt: `Boardroom Brewery taproom, beer, and events in El Segundo (${n})`,
    }
  }),
]

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

// Beer pictures pulled from their /BEER page — used in the beer-page scroller.
export const beerGallery = [
  '/media/gallery/beerpic.jpg',
  '/media/beer/pilsner.jpg',
  '/media/beer/baja-lager.jpg',
  '/media/beer/hazy-juicy-ipa.jpg',
  '/media/beer/golden-stout.jpg',
  '/media/beer/mango-sour.jpg',
  '/media/beer/beer-photo-1.jpg',
  '/media/beer/beer-photo-2.jpg',
  '/media/beer/beer-photo-3.jpg',
  '/media/beer/beer-photo-4.jpg',
]
