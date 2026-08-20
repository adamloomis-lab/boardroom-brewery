import { company, openingHours } from '../data/site'
import { faqs } from '../data/faq'

// One switch for the whole site. Set VITE_SITE_URL in Netlify env at cutover
// and canonicals, OG, schema, sitemap, robots, and llms files all follow.
export const SITE_URL = ((import.meta.env?.VITE_SITE_URL as string | undefined) || 'https://boardroom-at-arena.netlify.app').replace(/\/$/, '')

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
    telephone: '+1-310-510-6698',
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
        description: 'Craft brewery and taproom in El Segundo, minutes from LAX. Small-batch beer, seltzers, natural wines, food trucks, and private events on Arena Street.',
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
        description: 'Run club, rotating food trucks, trivia and comedy nights, and big-screen game days at Boardroom Brewery in El Segundo. See what is on.',
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
    case '/privacy':
      return {
        title: 'Privacy Policy | Boardroom Brewery',
        description: 'How Boardroom Brewery handles the information you share through our website, forms, and newsletter.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [...base, crumb('Privacy Policy', '/privacy')],
      }
    case '/terms':
      return {
        title: 'Terms of Use | Boardroom Brewery',
        description: 'The terms that apply when you use the Boardroom Brewery website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [...base, crumb('Terms of Use', '/terms')],
      }
    case '/accessibility':
      return {
        title: 'Accessibility Statement | Boardroom Brewery',
        description: 'What we do to keep the Boardroom Brewery website usable for everyone, and how to reach us if something is in your way.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [...base, crumb('Accessibility', '/accessibility')],
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
  '/', '/beer', '/wine', '/taproom', '/events', '/run-club', '/private-events', '/gallery', '/qrscan', '/contact', '/privacy', '/terms', '/accessibility',
]
