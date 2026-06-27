import { company, openingHours } from '../data/site'
import { faqs } from '../data/faq'

// Staging host for now; cut over to their production domain on launch and the
// canonicals/sitemap/OG/schema all follow.
export const SITE_URL = 'https://boardroom-at-arena.netlify.app'

const OG_IMAGE = '/media/gallery/br-01.jpg'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

export function localBusinessSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': ['Brewery', 'BarOrPub', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: company.name,
    alternateName: company.legalName,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/media/logo.jpg'),
    telephone: company.phone,
    email: company.email,
    priceRange: '$$',
    description: company.shortBlurb,
    slogan: company.tagline,
    servesCuisine: ['Craft Beer', 'Hard Seltzer', 'Natural Wine'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lng },
    areaServed: [
      { '@type': 'City', name: 'El Segundo, CA' },
      { '@type': 'AdministrativeArea', name: 'South Bay, Los Angeles' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    hasMenu: `${SITE_URL}/beer/`,
    sameAs: [company.social.facebook, company.social.instagram],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

const crumb = (name: string, path: string) =>
  breadcrumb([{ name: 'Home', path: '/' }, { name, path }])

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)
  const base = [localBusinessSchema()]

  switch (path) {
    case '/':
      return {
        title: 'Boardroom Brewery | Craft Beer, Seltzer & Natural Wine in El Segundo',
        description: `${company.shortBlurb} ${company.nearLax} Call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [localBusinessSchema(), websiteSchema(), faqSchema()],
      }
    case '/beer':
      return {
        title: 'Beer & Seltzer on Tap | Boardroom Brewery, El Segundo',
        description: 'Our live tap list: small-batch craft beer and house-crafted hard seltzers, brewed on-site in El Segundo. See what is pouring right now.',
        canonical: pageUrl('/beer'),
        ogImage,
        jsonLd: [...base, { '@context': 'https://schema.org', '@type': 'Menu', name: 'Boardroom Brewery Tap List', url: pageUrl('/beer') }, crumb('Beer', '/beer')],
      }
    case '/wine':
      return {
        title: 'Natural-Style Wine | Boardroom Brewery, El Segundo',
        description: 'Natural-style, low-intervention California wines from the Lodi AVA near Ripon: minimal additives, maximum character. Now pouring our Cabernet Sauvignon offerings.',
        canonical: pageUrl('/wine'),
        ogImage,
        jsonLd: [...base, crumb('Wine', '/wine')],
      }
    case '/taproom':
      return {
        title: 'The Taproom | Boardroom Brewery, El Segundo (Near LAX)',
        description: 'A modern South Bay taproom in El Segundo, minutes from LAX, with rotating craft beer & seltzers, a relaxed atmosphere, kid- and dog-friendly. Open six days a week.',
        canonical: pageUrl('/taproom'),
        ogImage,
        jsonLd: [...base, crumb('Taproom', '/taproom')],
      }
    case '/events':
      return {
        title: 'Events & Food Trucks | Boardroom Brewery, El Segundo',
        description: 'Run club, rotating food trucks, trivia and comedy nights, and World Cup watch parties at Boardroom Brewery in El Segundo. See what is on.',
        canonical: pageUrl('/events'),
        ogImage,
        jsonLd: [...base, crumb('Events', '/events')],
      }
    case '/run-club':
      return {
        title: 'Run Club | Boardroom Brewery, El Segundo, Wednesdays 6PM',
        description: 'Boardroom Run Club: every Wednesday at 6PM, a 5K out to The Strand and back, led by club lead Daniel. Walkers welcome, and the beers will be waiting.',
        canonical: pageUrl('/run-club'),
        ogImage,
        jsonLd: [...base, crumb('Run Club', '/run-club')],
      }
    case '/world-cup':
      return {
        title: 'World Cup Watch Parties | Boardroom Brewery, El Segundo',
        description: 'Every 2026 World Cup match on the big screen all June, with daily food trucks and special events. Minutes from SoFi Stadium. See the full June schedule.',
        canonical: pageUrl('/world-cup'),
        ogImage,
        jsonLd: [...base, crumb('World Cup', '/world-cup')],
      }
    case '/private-events':
      return {
        title: 'Private Events & Brewery Event Space Near LAX | Boardroom Brewery',
        description: 'Book your next event at Boardroom Brewery in El Segundo, minutes from LAX. Corporate offsites, birthdays, showers, holiday parties and more, with indoor & outdoor space.',
        canonical: pageUrl('/private-events'),
        ogImage,
        jsonLd: [...base, crumb('Private Events', '/private-events')],
      }
    case '/gallery':
      return {
        title: 'Gallery | Boardroom Brewery, El Segundo',
        description: 'Inside Boardroom Brewery: the taproom, the beer, the patio, the events. A look around our El Segundo craft brewery and event space.',
        canonical: pageUrl('/gallery'),
        ogImage,
        jsonLd: [...base, { '@context': 'https://schema.org', '@type': 'ImageGallery', name: 'Boardroom Brewery Gallery', url: pageUrl('/gallery') }, crumb('Gallery', '/gallery')],
      }
    case '/qrscan':
      return {
        title: 'Welcome | Boardroom Brewery: Menu, Events & Directions',
        description: 'Tap through to the Boardroom Brewery menu, wine list, food-truck schedule, events, and directions. A craft brewery and event space in El Segundo, near LAX.',
        canonical: pageUrl('/qrscan'),
        ogImage,
        jsonLd: [...base, crumb('Welcome', '/qrscan')],
      }
    case '/contact':
      return {
        title: 'Contact & Visit | Boardroom Brewery, El Segundo',
        description: `Visit Boardroom Brewery at ${company.addressOneLine}. Hours, directions, and contact. Call ${company.phone} or email ${company.email}.`,
        canonical: pageUrl('/contact'),
        ogImage,
        jsonLd: [...base, { '@context': 'https://schema.org', '@type': 'ContactPage', url: pageUrl('/contact'), about: { '@id': `${SITE_URL}/#business` } }, crumb('Contact', '/contact')],
      }
    default:
      return {
        title: 'Page Not Found | Boardroom Brewery',
        description: 'Sorry, we could not find that page. Boardroom Brewery is a craft brewery and event space in El Segundo, CA.',
        canonical: pageUrl(path),
        ogImage,
        jsonLd: base,
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/', '/beer', '/wine', '/taproom', '/events', '/run-club', '/world-cup', '/private-events', '/gallery', '/qrscan', '/contact',
]
