// Tap-list manager sessions: a signed httpOnly cookie, nothing stored
// server-side. Payload = base64url({exp}).HMAC(TAPLIST_SESSION_SECRET).
import { createHmac, timingSafeEqual } from 'node:crypto'

export const COOKIE = 'br_manage'
const SESSION_MS = 30 * 24 * 60 * 60 * 1000

const secret = () => process.env.TAPLIST_SESSION_SECRET || ''
const sign = (payload) => createHmac('sha256', secret()).update(payload).digest('base64url')

export function safeEq(a, b) {
  try {
    const A = Buffer.from(String(a))
    const B = Buffer.from(String(b))
    return A.length === B.length && timingSafeEqual(A, B)
  } catch {
    return false
  }
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MS })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySession(token) {
  if (!secret() || !token || typeof token !== 'string') return false
  const dot = token.indexOf('.')
  if (dot < 0) return false
  const payload = token.slice(0, dot)
  if (!safeEq(token.slice(dot + 1), sign(payload))) return false
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return !!data && !!data.exp && Date.now() < data.exp
  } catch {
    return false
  }
}

export function readCookie(req) {
  const header = req.headers.get('cookie') || ''
  const m = header.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))
  return m ? decodeURIComponent(m[1]) : null
}

export const isSignedIn = (req) => verifySession(readCookie(req))

export function cookieHeader(value, maxAgeSec) {
  return `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSec}`
}

export const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra },
  })
