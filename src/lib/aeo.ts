import { SITE_URL, pageUrl } from './seo'
import { company, openingHours, beers, events, privateEvents, runClub } from '../data/site'
import { faqs } from '../data/faq'

// Plain-text surfaces for AI crawlers. Everything here derives from the same
// data modules the pages render, so it cannot drift from what the site says.
// Facts only: no rankings talk, no claims the data does not back.

const PAGES: { path: string; label: string }[] = [
  { path: '/', label: 'Home' },
  { path: '/beer', label: 'Beer and seltzer' },
  { path: '/wine', label: 'Natural-style wine' },
  { path: '/taproom', label: 'The taproom' },
  { path: '/events', label: 'Events and food trucks' },
  { path: '/run-club', label: 'Wednesday run club' },
  { path: '/private-events', label: 'Private events and buyouts' },
  { path: '/gallery', label: 'Photo gallery' },
  { path: '/contact', label: 'Contact, hours, and directions' },
]

export function llmsTxt(): string {
  return `# ${company.name}

> ${company.shortBlurb}

Craft brewery and taproom at ${company.addressOneLine}, minutes from LAX.
Phone: ${company.phone}. Email: ${company.email}.

## Pages

${PAGES.map((p) => `- [${p.label}](${pageUrl(p.path)})`).join('\n')}

## More detail

- [Full business information](${SITE_URL}/llms-full.txt)
`
}

export function llmsFullTxt(): string {
  const hours = openingHours
    .map((o) => `- ${Array.isArray(o.days) ? o.days.join(', ') : o.days}: ${o.opens} to ${o.closes}`)
    .join('\n')
  const beerList = beers
    .map((b) => `- ${b.name} (${b.style}, ${b.abv} ABV): ${b.notes}`)
    .join('\n')
  const eventList = events.map((e) => `- ${e.title} (${e.when}): ${e.desc}`).join('\n')
  const faqList = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')

  return `# ${company.name}: full business information

${company.shortBlurb}

## Location and contact

- Address: ${company.addressOneLine}
- Phone: ${company.phone}
- Email: ${company.email}
- ${company.nearLax}

## Hours

${hours}

Hours can change on holidays and for private events; the website and Google profile carry the current schedule.

## Beer and drinks

${beerList}

The full, live tap list is on the beer page via our Untappd menu. We also pour natural-style wines and hard seltzers.

## Events

${eventList}

## Run club

${runClub.day} at ${runClub.time}. ${runClub.route} ${runClub.leader} ${runClub.walkers}

## Private events

${privateEvents.blurb}

Suited for: ${privateEvents.eventTypes.join(', ')}.

${privateEvents.pricing}

## Frequently asked questions

${faqList}

## Pages

${PAGES.map((p) => `- ${p.label}: ${pageUrl(p.path)}`).join('\n')}
`
}
