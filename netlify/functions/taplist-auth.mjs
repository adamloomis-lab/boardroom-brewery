// Sign in to the tap-list manager with the shared passcode (TAPLIST_PASSCODE).
// POST {passcode} -> sets the session cookie. GET -> {signedIn}. DELETE -> clears it.
import { createSession, isSignedIn, cookieHeader, safeEq, json } from './_lib/session.mjs'

export default async (req) => {
  if (req.method === 'GET') return json({ signedIn: isSignedIn(req) })

  if (req.method === 'DELETE') return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader('', 0) })

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const expected = process.env.TAPLIST_PASSCODE || ''
  if (!expected || !process.env.TAPLIST_SESSION_SECRET) return json({ error: 'The manager is not set up yet.' }, 503)

  let body = {}
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Bad request' }, 400)
  }
  const given = String(body.passcode || '').trim()
  if (!given || !safeEq(given, expected)) {
    // Slow the guessers down a touch without punishing a typo.
    await new Promise((r) => setTimeout(r, 600))
    return json({ error: 'That passcode did not match.' }, 401)
  }
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader(createSession(), 30 * 24 * 60 * 60) })
}
