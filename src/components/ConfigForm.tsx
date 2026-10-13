import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send, ArrowRight, Loader2, Phone,
  Cake, Briefcase, Users, GlassWater, HeartHandshake, MessageCircle, HelpCircle, CalendarDays, PartyPopper, CircleDot,
  type LucideIcon } from 'lucide-react'
import content from '../site-content.json'
import { company } from '../data/site'
import { FloatField, IconCardSelect, SuccessCheck } from './FluidField'

// Lead forms drawn from src/site-content.json, which the taproom edits from
// its ALM dashboard (Manage my site > Forms). Saving there commits the JSON
// and redeploys, so the prerendered HTML always carries the current fields
// and Netlify Forms detects them.

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'date' | 'time' | 'number' | 'choice'
export interface FormField {
  id: string
  label: string
  type: FieldType
  required?: boolean
  width?: 'full' | 'half' | 'third'
  options?: string[]
  placeholder?: string
}
export interface FormConfig {
  submitLabel: string
  successTitle: string
  successMessage: string
  fields: FormField[]
}

export const forms = (content as unknown as { forms: Record<string, FormConfig> }).forms

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

// Choice cards keep their icons for the options we know; new ones get a dot.
const ICONS: Record<string, LucideIcon> = {
  birthday: Cake, corporate: Briefcase, 'group outing': Users, celebration: GlassWater,
  fundraiser: HeartHandshake, 'something else': MessageCircle, 'general question': HelpCircle,
  'private event': CalendarDays, 'beer & taproom': GlassWater, 'group visit': PartyPopper,
}
const iconFor = (o: string) => ICONS[o.trim().toLowerCase()] || CircleDot

// Consecutive half or third width fields share a row.
function rows(fields: FormField[]) {
  const out: FormField[][] = []
  for (const f of fields) {
    const w = f.type === 'choice' || f.type === 'textarea' ? 'full' : f.width || 'full'
    const last = out[out.length - 1]
    const lastW = last && (last[0].width || 'full')
    const cap = w === 'half' ? 2 : 3
    if (w !== 'full' && last && lastW === w && last.length < cap) last.push(f)
    else out.push([f])
  }
  return out
}

const small = 'w-full rounded border border-outline bg-surface px-4 py-3.5 text-body-md text-cream placeholder:text-muted focus:border-gold focus-visible:outline-none focus:ring-2 focus:ring-gold/60'

export default function ConfigForm({ name, idPrefix, boxed = false }: { name: string; idPrefix: string; boxed?: boolean }) {
  const cfg = forms[name]
  const [values, setValues] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  if (!cfg) return null

  const set = (id: string, v: string) => setValues((s) => ({ ...s, [id]: v }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError('')
    const missing = cfg.fields.find((f) => f.type === 'choice' && f.required && !values[f.id])
    if (missing) { setError(`Please choose an option for "${missing.label}".`); return }
    setSending(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': name, ...data }) })
      if (!res.ok) throw new Error()
      setFirstName(((values.name || '').trim().split(' ')[0]) || '')
      setSent(true); form.reset(); setValues({})
    } catch { setError(`Something went wrong sending this. Please try again, or call ${company.phone}.`) } finally { setSending(false) }
  }

  if (sent) {
    return (
      <div
        className={`flex flex-col items-center gap-4 text-center ${boxed ? 'mt-8 rounded-[3px] border border-gold/40 bg-gold/5 px-6 py-12' : 'py-12'}`}
        style={{ animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) both' }}
      >
        <span className="flex items-center justify-center" style={{ animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <SuccessCheck />
        </span>
        <p className="font-display text-headline-sm font-bold text-cream">
          {firstName ? `Thank You, ${firstName}!` : cfg.successTitle}
        </p>
        <p className="max-w-md text-body-md text-on-surface-variant">{cfg.successMessage}</p>
        <a
          href={company.phoneHref}
          className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded bg-gold px-7 py-3.5 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-colors hover:bg-gold-light"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
          <Phone size={16} /> {company.phone}
        </a>
        <button
          onClick={() => { setSent(false); setFirstName('') }}
          className="mt-2 font-body text-[13px] text-muted transition-colors hover:text-cream"
        >
          Send another
        </button>
      </div>
    )
  }

  const renderField = (f: FormField) => {
    const v = values[f.id] || ''
    if (f.type === 'choice') {
      return (
        <fieldset key={f.id}>
          <legend className="mb-3 block font-label text-[11px] font-medium uppercase tracking-[0.16em] text-on-surface-variant">
            {f.label}{f.required && <span className="ml-1 text-gold">*</span>}
          </legend>
          <input type="hidden" name={f.id} value={v} />
          <IconCardSelect options={(f.options || []).map((o) => ({ value: o, label: o, icon: iconFor(o) }))} value={v} onChange={(x) => set(f.id, x)} />
        </fieldset>
      )
    }
    if (f.type === 'date' || f.type === 'time' || f.type === 'number') {
      return (
        <label key={f.id} className="flex flex-col gap-1">
          <span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">
            {f.label}{f.required && <span className="ml-1 text-gold">*</span>}
          </span>
          <input className={small} type={f.type} name={f.id} required={f.required} min={f.type === 'number' ? '1' : undefined}
            placeholder={f.placeholder} value={v} onChange={(e) => set(f.id, e.target.value)} />
        </label>
      )
    }
    return (
      <FloatField key={f.id} idPrefix={idPrefix} name={f.id} label={f.label} type={f.type === 'textarea' ? 'text' : f.type}
        textarea={f.type === 'textarea'} rows={name === 'contact' ? 5 : 4} required={f.required} value={v} onChange={(e) => set(f.id, e.target.value)} />
    )
  }

  return (
    <form name={name} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className={`${boxed ? 'mt-7 ' : ''}space-y-4`}>
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
      {rows(cfg.fields).map((row) => row.length === 1
        ? renderField(row[0])
        : <div key={row[0].id} className={`grid gap-4 ${row[0].width === 'third' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>{row.map(renderField)}</div>)}
      {error && (<p className="text-body-md text-error">{error}</p>)}
      <button
        type="submit"
        disabled={sending}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-gold px-8 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-all hover:bg-gold-light active:scale-[0.99] disabled:opacity-70"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
        {sending ? (<><Loader2 size={16} className="animate-spin" /> Sending</>) : (<><Send size={14} /> {cfg.submitLabel} <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>)}
      </button>
    </form>
  )
}
