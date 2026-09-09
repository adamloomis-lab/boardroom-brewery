import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { ArrowDown, ArrowUp, Camera, Check, Eye, EyeOff, Loader2, LogOut, Pencil, Plus, Star, Trash2, X, ExternalLink } from 'lucide-react'
import type { Beer } from '../data/site'
import { beers as baked } from '../data/site'
import { FloatField } from '../components/FluidField'

// The taproom's own tap-list manager (/manage). Passcode sign-in, then edit,
// reorder, add, or retire beers and their photos. Publish writes to the site
// immediately; the prerendered copy refreshes on the rebuild that follows.
const TAGS = ['Featured Pour', 'Core', 'Seasonal', 'Limited', 'Rotating', 'Seltzer', 'Collab']
const AUTH = '/.netlify/functions/taplist-auth'
const LIST = '/.netlify/functions/taplist'
const PHOTO = '/.netlify/functions/taplist-photo'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const newId = () => `b${Date.now().toString(36)}`

// Shrink a chosen photo in the browser so uploads stay quick on a phone.
async function shrinkPhoto(file: File): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image()
      i.onload = () => res(i)
      i.onerror = () => rej(new Error('That file could not be read as a photo.'))
      i.src = url
    })
    const max = 1600
    const scale = Math.min(1, max / Math.max(img.width, img.height))
    const c = document.createElement('canvas')
    c.width = Math.round(img.width * scale)
    c.height = Math.round(img.height * scale)
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.86)
  } finally {
    URL.revokeObjectURL(url)
  }
}

const btnPrimary =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded bg-gold px-6 py-3.5 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-all hover:bg-gold-light active:scale-[0.99] disabled:opacity-60'
const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded border border-outline px-4 py-2.5 font-label text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold hover:text-gold disabled:opacity-50'
const iconBtn =
  'inline-flex h-10 w-10 items-center justify-center rounded border border-outline text-on-surface-variant transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-outline disabled:hover:text-on-surface-variant'
const sheen = <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />

function Frame({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="border-b border-outline-variant bg-surface">
        <div className="container-x flex items-center justify-between py-4">
          <a href="/" className="inline-flex" aria-label="Boardroom Brewery, home">
            <img src="/media/boardroom-logo-white.png" alt="Boardroom Brewery" className="h-7 w-auto sm:h-8" />
          </a>
          <span className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Tap List Manager</span>
        </div>
      </header>
      <main id="main-content">{children}</main>
    </div>
  )
}

function Login({ onDone }: { readonly onDone: () => void }) {
  const [code, setCode] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const r = await fetch(AUTH, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ passcode: code }) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.error || 'Could not sign in.')
      onDone()
    } catch (x) {
      setErr((x as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <section className="container-x flex min-h-[70vh] items-center justify-center py-16">
      <form onSubmit={submit} className="w-full max-w-md rounded-[3px] border border-outline-variant bg-surface-card p-8 md:p-10">
        <h1 className="font-display text-headline-md font-bold text-cream">Sign in</h1>
        <p className="mt-2 text-body-md text-on-surface-variant">Enter the passcode to update what's pouring on the website.</p>
        <div className="relative mt-7">
          <FloatField idPrefix="mg" name="passcode" label="Passcode" type={show ? 'text' : 'password'} value={code} onChange={(e) => setCode(e.target.value)} required />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide passcode' : 'Show passcode'}
            aria-pressed={show}
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-on-surface-variant transition-colors hover:text-gold"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {err && <p className="mt-4 text-body-md text-error" role="alert">{err}</p>}
        <button type="submit" disabled={busy || !code} className={`${btnPrimary} mt-6 w-full`}>
          {sheen}
          {busy ? <><Loader2 size={16} className="animate-spin" /> Checking</> : 'Sign in'}
        </button>
      </form>
    </section>
  )
}

type Draft = Omit<Beer, 'flavors'> & { flavors: string }
const toDraft = (b: Beer): Draft => ({ ...b, flavors: b.flavors.join(', ') })
const fromDraft = (d: Draft): Beer => ({
  ...d,
  name: d.name.trim(),
  style: d.style.trim(),
  abv: d.abv.trim().replace(/%?$/, '%'),
  notes: d.notes.trim(),
  flavors: d.flavors.split(',').map((f) => f.trim()).filter(Boolean).slice(0, 3),
})
const blank = (): Draft => ({ id: newId(), name: '', abv: '', tag: 'Core', style: '', notes: '', flavors: '', image: '', featured: false })

function BeerForm({ initial, onSave, onCancel }: { readonly initial: Draft; readonly onSave: (b: Beer) => void; readonly onCancel: () => void }) {
  const [d, setD] = useState<Draft>(initial)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const set = (k: keyof Draft) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setD((p) => ({ ...p, [k]: e.target.value }))

  const pick = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setErr('')
    setUploading(true)
    try {
      const dataUrl = await shrinkPhoto(f)
      const r = await fetch(PHOTO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl }) })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || 'Upload failed.')
      setD((p) => ({ ...p, image: j.url }))
    } catch (x) {
      setErr((x as Error).message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!d.name.trim() || !d.style.trim() || !d.abv.trim()) {
      setErr('Name, style, and ABV are required.')
      return
    }
    onSave(fromDraft({ ...d, id: d.id || slug(d.name) || newId() }))
  }

  return (
    <form onSubmit={submit} className="rounded-[3px] border border-gold/50 bg-surface-card p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-display text-headline-sm font-bold text-cream">{initial.name ? `Edit ${initial.name}` : 'Add a beer'}</h2>
        <button type="button" onClick={onCancel} aria-label="Close" className={iconBtn}><X size={18} /></button>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-outline bg-surface-container-high">
            {d.image ? (
              <img src={d.image} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-muted"><Camera size={28} strokeWidth={1.5} /><span className="font-label text-[11px] uppercase tracking-[0.16em]">No photo</span></div>
            )}
            {uploading && <div className="absolute inset-0 flex items-center justify-center bg-background/70"><Loader2 className="animate-spin text-gold" /></div>}
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" id="beer-photo" onChange={pick} />
          <div className="mt-3 flex flex-wrap gap-2">
            <label htmlFor="beer-photo" className={`${btnGhost} cursor-pointer`}><Camera size={14} /> {d.image ? 'Replace photo' : 'Add photo'}</label>
            {d.image && <button type="button" onClick={() => setD((p) => ({ ...p, image: '' }))} className={btnGhost}>Remove</button>}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">A portrait shot of the pour works best. JPG or PNG.</p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatField idPrefix="bf" name="name" label="Beer name" value={d.name} onChange={set('name')} required />
            <FloatField idPrefix="bf" name="abv" label="ABV (e.g. 6.5%)" value={d.abv} onChange={set('abv')} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatField idPrefix="bf" name="style" label="Style (e.g. West Coast IPA)" value={d.style} onChange={set('style')} required />
            <div className="relative rounded border border-outline bg-surface focus-within:border-gold/70">
              <label htmlFor="bf-tag" className="pointer-events-none absolute left-4 top-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">Label</label>
              <select id="bf-tag" value={d.tag} onChange={set('tag')} className="w-full appearance-none bg-transparent px-4 pb-2 pt-6 font-body text-body-md text-cream outline-none">
                {TAGS.map((t) => <option key={t} value={t} className="bg-surface text-cream">{t}</option>)}
              </select>
            </div>
          </div>
          <FloatField idPrefix="bf" name="flavors" label="Three words (e.g. Juicy, Tropical, Soft)" value={d.flavors} onChange={set('flavors')} />
          <FloatField idPrefix="bf" name="notes" label="Tasting notes" value={d.notes} onChange={set('notes')} textarea rows={3} />
        </div>
      </div>
      {err && <p className="mt-4 text-body-md text-error" role="alert">{err}</p>}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onCancel} className={btnGhost}>Cancel</button>
        <button type="submit" disabled={uploading} className={btnPrimary}>{sheen}<Check size={16} /> {initial.name ? 'Save changes' : 'Add to list'}</button>
      </div>
    </form>
  )
}

function Editor({ onSignOut }: { readonly onSignOut: () => void }) {
  const [beers, setBeers] = useState<Beer[]>(baked)
  const [saved, setSaved] = useState<string>(JSON.stringify(baked))
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Draft | null>(null)
  const [confirm, setConfirm] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [note, setNote] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const dirty = JSON.stringify(beers) !== saved

  useEffect(() => {
    fetch(LIST)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.beers) && d.beers.length) {
          setBeers(d.beers)
          setSaved(JSON.stringify(d.beers))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!dirty) return
    const h = (e: BeforeUnloadEvent) => { e.preventDefault() }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const update = (list: Beer[]) => {
    // Keep exactly one lead pour.
    const lead = list.findIndex((b) => b.featured)
    setBeers(list.map((b, i) => ({ ...b, featured: i === (lead < 0 ? 0 : lead) })))
    setNote(null)
  }
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= beers.length) return
    const next = [...beers]
    ;[next[i], next[j]] = [next[j], next[i]]
    update(next)
  }
  const saveBeer = (b: Beer) => {
    const idx = beers.findIndex((x) => x.id === b.id)
    update(idx < 0 ? [...beers, b] : beers.map((x, i) => (i === idx ? b : x)))
    setEditing(null)
  }
  const remove = (id: string) => {
    update(beers.filter((b) => b.id !== id))
    setConfirm(null)
  }

  const publish = async () => {
    setPublishing(true)
    setNote(null)
    try {
      const r = await fetch(LIST, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ beers }) })
      const d = await r.json().catch(() => ({}))
      if (r.status === 401) { onSignOut(); return }
      if (!r.ok) throw new Error(d.error || 'Could not publish.')
      setBeers(d.beers)
      setSaved(JSON.stringify(d.beers))
      setNote({ kind: 'ok', text: 'Published. The site shows this list now. Search engines pick up the refreshed pages within a few minutes.' })
    } catch (x) {
      setNote({ kind: 'err', text: (x as Error).message })
    } finally {
      setPublishing(false)
    }
  }

  return (
    <>
      <section className="container-x py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-headline-md font-bold text-cream md:text-headline-lg">What's pouring</h1>
            <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">This list drives the On Tap section on the home page and the Flagships list on the beer page. Retire a beer and its photo leaves with it. The starred beer is the lead pour.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/beer" target="_blank" rel="noopener noreferrer" className={btnGhost}>View beer page <ExternalLink size={13} /></a>
            <button type="button" onClick={onSignOut} className={btnGhost}><LogOut size={14} /> Sign out</button>
          </div>
        </div>

        {loading ? (
          <p className="mt-10 flex items-center gap-2 text-on-surface-variant"><Loader2 size={16} className="animate-spin text-gold" /> Loading the list</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {beers.map((b, i) => (
              <li key={b.id} className={`rounded-[3px] border bg-surface-card ${b.featured ? 'border-gold/50' : 'border-outline-variant'}`}>
                {editing && editing.id === b.id ? (
                  <BeerForm initial={editing} onSave={saveBeer} onCancel={() => setEditing(null)} />
                ) : (
                  <div className="flex items-center gap-4 p-3 sm:p-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-[3px] bg-surface-container-high">
                      {b.image ? <img src={b.image} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted"><Camera size={18} strokeWidth={1.5} /></div>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h2 className="font-display text-[18px] font-bold leading-tight text-cream sm:text-[20px]">{b.name}</h2>
                        {b.featured && <span className="border border-gold/60 px-2 py-0.5 font-label text-[10px] font-bold uppercase tracking-widest text-gold">Lead pour</span>}
                      </div>
                      <p className="mt-1 font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{b.tag} · {b.style} · {b.abv}</p>
                      {b.flavors.length > 0 && <p className="mt-1 hidden text-[13px] text-muted sm:block">{b.flavors.join(' · ')}</p>}
                    </div>
                    <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                      <button type="button" onClick={() => update(beers.map((x) => ({ ...x, featured: x.id === b.id })))} aria-label={`Make ${b.name} the lead pour`} aria-pressed={b.featured} className={`${iconBtn} ${b.featured ? 'border-gold text-gold' : ''}`}><Star size={16} className={b.featured ? 'fill-gold' : ''} /></button>
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${b.name} up`} className={`${iconBtn} max-sm:hidden`}><ArrowUp size={16} /></button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === beers.length - 1} aria-label={`Move ${b.name} down`} className={`${iconBtn} max-sm:hidden`}><ArrowDown size={16} /></button>
                      <button type="button" onClick={() => { setConfirm(null); setEditing(toDraft(b)) }} aria-label={`Edit ${b.name}`} className={iconBtn}><Pencil size={16} /></button>
                      <button type="button" onClick={() => setConfirm(b.id)} aria-label={`Remove ${b.name}`} className={`${iconBtn} hover:border-error hover:text-error`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                )}
                {confirm === b.id && (
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant px-4 py-3">
                    <p className="text-body-md text-on-surface">Take {b.name} off the website?</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setConfirm(null)} className={btnGhost}>Keep it</button>
                      <button type="button" onClick={() => remove(b.id)} className={`${btnGhost} border-error text-error hover:border-error hover:text-error`}><Trash2 size={14} /> Remove</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
            {editing && !beers.some((b) => b.id === editing.id) && (
              <li><BeerForm initial={editing} onSave={saveBeer} onCancel={() => setEditing(null)} /></li>
            )}
          </ul>
        )}

        {!loading && !editing && (
          <button type="button" onClick={() => { setConfirm(null); setEditing(blank()) }} className={`${btnGhost} mt-5 w-full py-4 sm:w-auto`}><Plus size={15} /> Add a beer</button>
        )}
        <p className="mt-8 text-[13px] leading-relaxed text-muted">The "What's On Tap Right Now" menu lower on the beer page comes from your Untappd menu and updates on its own.</p>
      </section>

      <div className={`sticky bottom-0 z-30 border-t bg-surface/95 backdrop-blur transition-colors ${dirty ? 'border-gold/50' : 'border-outline-variant'}`}>
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-3">
          <p className={`text-body-md ${note ? (note.kind === 'ok' ? 'text-cream' : 'text-error') : dirty ? 'text-gold' : 'text-muted'}`} role="status" aria-live="polite">
            {note ? note.text : dirty ? 'You have unpublished changes.' : 'Everything here is live on the site.'}
          </p>
          <button type="button" onClick={publish} disabled={!dirty || publishing || !!editing} className={btnPrimary}>
            {sheen}
            {publishing ? <><Loader2 size={16} className="animate-spin" /> Publishing</> : <><Check size={16} /> Publish to site</>}
          </button>
        </div>
      </div>
    </>
  )
}

export default function Manage() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null)
  useEffect(() => {
    fetch(AUTH)
      .then((r) => r.json())
      .then((d) => setSignedIn(!!d.signedIn))
      .catch(() => setSignedIn(false))
  }, [])
  const signOut = async () => {
    await fetch(AUTH, { method: 'DELETE' }).catch(() => {})
    setSignedIn(false)
  }
  return (
    <Frame>
      {signedIn === null ? (
        <p className="container-x flex items-center gap-2 py-20 text-on-surface-variant"><Loader2 size={16} className="animate-spin text-gold" /> One moment</p>
      ) : signedIn ? (
        <Editor onSignOut={signOut} />
      ) : (
        <Login onDone={() => setSignedIn(true)} />
      )}
    </Frame>
  )
}
