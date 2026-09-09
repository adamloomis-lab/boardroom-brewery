// Beer photos uploaded from the tap-list manager. POST {dataUrl} (signed in)
// stores the image in Netlify Blobs and returns its public path
// (/tap-photos/<id>.<ext>, served by GET ?id= via the netlify.toml redirect).
import { getStore } from '@netlify/blobs'
import { randomBytes } from 'node:crypto'
import { isSignedIn, json } from './_lib/session.mjs'

const STORE = 'tap-photos'
const MAX_BYTES = 4 * 1024 * 1024
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }

export default async (req) => {
  if (req.method === 'GET') {
    const id = (new URL(req.url).searchParams.get('id') || '').replace(/\.(jpg|png|webp)$/i, '')
    if (!/^[a-z0-9]{16,32}$/i.test(id)) return new Response('Not found', { status: 404 })
    let res
    try {
      res = await getStore(STORE).getWithMetadata(id, { type: 'arrayBuffer' })
    } catch {
      res = null
    }
    if (!res || !res.data) return new Response('Not found', { status: 404 })
    return new Response(res.data, {
      status: 200,
      headers: {
        'Content-Type': (res.metadata && res.metadata.type) || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  if (!isSignedIn(req)) return json({ error: 'Please sign in first.' }, 401)

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(body.dataUrl || ''))
  if (!m) return json({ error: 'Please choose a JPG, PNG, or WebP photo.' }, 400)
  const bytes = Buffer.from(m[2], 'base64')
  if (!bytes.length || bytes.length > MAX_BYTES) return json({ error: 'That photo is too large. Keep it under 4 MB.' }, 413)

  const type = m[1]
  const id = randomBytes(12).toString('hex')
  try {
    await getStore(STORE).set(id, bytes, { metadata: { type } })
  } catch {
    return json({ error: 'Could not save the photo right now. Try again in a minute.' }, 502)
  }
  return json({ ok: true, url: `/tap-photos/${id}.${TYPES[type]}` })
}
