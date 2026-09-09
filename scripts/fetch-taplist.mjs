// Build-time bake. Pulls the live tap list (what the manager last published)
// into src/data/taplist.json so the prerendered HTML matches the site people
// see after hydration. Any failure keeps the checked-in seed; never fails the build.
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = (process.env.VITE_SITE_URL || process.env.TAPLIST_SOURCE || 'https://boardroom-at-arena.netlify.app').replace(/\/$/, '')

try {
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), 12000)
  const r = await fetch(`${SITE}/.netlify/functions/taplist`, { signal: ctl.signal })
  clearTimeout(t)
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const d = await r.json()
  if (d.source !== 'live' || !Array.isArray(d.beers) || !d.beers.length) {
    console.log('[taplist] no published list yet; keeping the seed')
  } else {
    const doc = { updatedAt: d.updatedAt, beers: d.beers }
    writeFileSync(join(ROOT, 'src/data/taplist.json'), JSON.stringify(doc, null, 2) + '\n')
    console.log(`[taplist] baked ${d.beers.length} beers (published ${d.updatedAt})`)
  }
} catch (e) {
  console.log(`[taplist] could not reach the live list (${e.message}); keeping the seed`)
}
