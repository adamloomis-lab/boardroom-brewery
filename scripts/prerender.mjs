// Build-time static prerender. Runs after `vite build` (client) and
// `vite build --ssr` (server bundle). For every route it server-renders the
// React tree, bakes the route's <title>, meta, canonical, OG/Twitter and
// JSON-LD into <head>, and writes dist/<route>/index.html. Then emits
// sitemap.xml and robots.txt.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const { render, getPageMeta, ALL_ROUTES, SITE_URL, llmsTxt, llmsFullTxt } = await import(
  join(ROOT, 'dist-server', 'entry-server.js')
)

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function headBlock(meta) {
  const tags = [
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Boardroom Brewery" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta property="og:image" content="${esc(meta.ogImage)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.ogImage)}" />`,
  ]
  for (const node of meta.jsonLd) {
    tags.push(
      `<script type="application/ld+json" data-seo="jsonld">${JSON.stringify(node).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return tags.join('\n    ')
}

let count = 0
for (const route of ALL_ROUTES) {
  const meta = getPageMeta(route)
  const appHtml = render(route)

  const page = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${esc(meta.description)}" />`,
    )
    .replace('<!--SEO_HEAD-->', headBlock(meta))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, page)
  count++
}

// lastmod comes from each page's real last content change in git, so a
// deploy that touches nothing does not re-date the whole sitemap.
import { execSync } from 'node:child_process'
const PAGE_SRC = {
  '/': 'src/pages/Home.tsx', '/beer': 'src/pages/Beer.tsx', '/wine': 'src/pages/Wine.tsx',
  '/taproom': 'src/pages/Taproom.tsx', '/events': 'src/pages/Events.tsx',
  '/run-club': 'src/pages/RunClub.tsx', '/private-events': 'src/pages/PrivateEvents.tsx',
  '/gallery': 'src/pages/Gallery.tsx', '/contact': 'src/pages/Contact.tsx',
  '/privacy': 'src/pages/Privacy.tsx', '/terms': 'src/pages/Terms.tsx',
  '/accessibility': 'src/pages/Accessibility.tsx',
}
function lastmodFor(route) {
  try {
    const files = [PAGE_SRC[route], 'src/data/site.ts'].filter(Boolean).join(' ')
    const out = execSync(`git log -1 --format=%cs -- ${files}`, { cwd: ROOT }).toString().trim()
    if (out) return out
  } catch { /* no git in CI checkout depth 0: fall back */ }
  return new Date().toISOString().slice(0, 10)
}
// /qrscan is a utility surface for people already in the room: prerendered,
// but not something search should list.
const SITEMAP_ROUTES = ALL_ROUTES.filter((r) => r !== '/qrscan')
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  SITEMAP_ROUTES.map((r) => {
    const loc = `${SITE_URL}${r === '/' ? '/' : `${r}/`}`
    const priority = r === '/' ? '1.0' : '0.8'
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(r)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  }).join('\n') +
  `\n</urlset>\n`
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

writeFileSync(join(DIST, 'llms.txt'), llmsTxt())
writeFileSync(join(DIST, 'llms-full.txt'), llmsFullTxt())

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
writeFileSync(join(DIST, 'robots.txt'), robots)

console.log(`✓ Prerendered ${count} routes + sitemap.xml + robots.txt + llms.txt + llms-full.txt`)
