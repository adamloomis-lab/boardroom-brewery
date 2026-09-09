// The tap list. GET is public and returns the current list (Netlify Blobs,
// falling back to the seed that ships in the repo). PUT replaces it (signed-in
// only), then asks GitHub to rebuild the site so the prerendered HTML matches.
import { getStore } from '@netlify/blobs'
import seed from '../../src/data/taplist.json' with { type: 'json' }
import { isSignedIn, json } from './_lib/session.mjs'

const STORE = 'taplist'
const KEY = 'beers'
const MAX_BEERS = 24
const TAGS = ['Featured Pour', 'Core', 'Seasonal', 'Limited', 'Rotating', 'Seltzer', 'Collab']

const str = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

// Normalize whatever the manager sent into the shape the pages render.
function clean(input) {
  if (!Array.isArray(input)) return null
  const seen = new Set()
  const out = []
  for (const raw of input.slice(0, MAX_BEERS)) {
    if (!raw || typeof raw !== 'object') continue
    const name = str(raw.name, 60)
    const style = str(raw.style, 60)
    const abv = str(raw.abv, 8)
    if (!name || !style || !abv) continue
    let id = str(raw.id, 48).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '')
    if (!id) id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    while (seen.has(id)) id = `${id}-2`
    seen.add(id)
    const image = str(raw.image, 200)
    const okImage = /^\/(media|tap-photos)\/[a-z0-9._/-]+$/i.test(image) ? image : ''
    out.push({
      id,
      name,
      abv: /%$/.test(abv) ? abv : `${abv}%`,
      tag: TAGS.includes(raw.tag) ? raw.tag : 'Core',
      style,
      notes: str(raw.notes, 320),
      flavors: (Array.isArray(raw.flavors) ? raw.flavors : String(raw.flavors || '').split(','))
        .map((f) => str(f, 18))
        .filter(Boolean)
        .slice(0, 3),
      image: okImage,
      featured: !!raw.featured,
    })
  }
  if (!out.length) return null
  // Exactly one lead pour: the first flagged, else the first in the list.
  const lead = out.findIndex((b) => b.featured)
  out.forEach((b, i) => (b.featured = i === (lead < 0 ? 0 : lead)))
  return out
}

async function requestRebuild() {
  const token = process.env.GH_DISPATCH_TOKEN
  const repo = process.env.GH_REPO
  if (!token || !repo) return false
  try {
    const r = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'boardroom-taplist',
      },
      body: JSON.stringify({ event_type: 'taplist-published' }),
    })
    return r.status === 204
  } catch {
    return false
  }
}

export default async (req) => {
  if (req.method === 'GET') {
    try {
      const saved = await getStore(STORE).get(KEY, { type: 'json', consistency: 'strong' })
      if (saved && Array.isArray(saved.beers) && saved.beers.length) return json({ ...saved, source: 'live' })
    } catch {
      /* fall through to the seed */
    }
    return json({ ...seed, source: 'seed' })
  }

  if (req.method !== 'PUT') return json({ error: 'Method not allowed' }, 405)
  if (!isSignedIn(req)) return json({ error: 'Please sign in first.' }, 401)

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }
  const beers = clean(body.beers)
  if (!beers) return json({ error: 'Every beer needs a name, a style, and an ABV. Keep at least one beer on the list.' }, 400)

  const doc = { updatedAt: new Date().toISOString(), beers }
  try {
    await getStore(STORE).setJSON(KEY, doc)
  } catch {
    return json({ error: 'Could not save right now. Try again in a minute.' }, 502)
  }
  const rebuild = await requestRebuild()
  return json({ ok: true, ...doc, rebuild })
}
