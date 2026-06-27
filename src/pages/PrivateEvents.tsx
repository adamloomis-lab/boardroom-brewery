import { useState } from 'react'
import type { FormEvent } from 'react'
import { PartyPopper, Send, ArrowRight, Loader2, Phone,
  Cake, Briefcase, Users, GlassWater, HeartHandshake, MessageCircle, type LucideIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { company, privateEvents } from '../data/site'
import { FloatField, IconCardSelect, SuccessCheck } from '../components/FluidField'

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

// Single-select icon cards for event type — submits as `event-type`.
const EVENT_TYPE_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Birthday', label: 'Birthday', icon: Cake },
  { value: 'Corporate', label: 'Corporate', icon: Briefcase },
  { value: 'Group Outing', label: 'Group outing', icon: Users },
  { value: 'Celebration', label: 'Celebration', icon: GlassWater },
  { value: 'Fundraiser', label: 'Fundraiser', icon: HeartHandshake },
  { value: 'Something Else', label: 'Something else', icon: MessageCircle },
]

export default function PrivateEvents() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [details, setDetails] = useState('')

  const reset = () => {
    setName(''); setEmail(''); setPhone(''); setEventName(''); setEventType('')
    setEventDate(''); setStartTime(''); setGuestCount(''); setDetails('')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(false); setSending(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'private-events', ...data }) })
      if (!res.ok) throw new Error()
      setFirstName((name.trim().split(' ')[0]) || '')
      setSent(true); form.reset(); reset()
    } catch { setError(true) } finally { setSending(false) }
  }
  const field = 'w-full rounded border border-outline bg-surface px-4 py-3.5 text-body-md text-cream placeholder:text-muted focus:border-gold focus-visible:outline-none focus:ring-2 focus:ring-gold/60'

  return (
    <>
      <section className="relative flex min-h-[52vh] items-center overflow-hidden">
        <img src="/media/gallery/br-12.jpg" alt="Private event space at Boardroom Brewery near LAX" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Private Events</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">{privateEvents.headline}</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">{privateEvents.blurb}</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What's Included" title="A Space That Flexes to Your Night" />
          <div className="mt-12 grid gap-6 reveal-group sm:grid-cols-2 lg:grid-cols-4">
            {privateEvents.features.map((f) => (
              <div key={f.title} className="rounded-lg border border-outline-variant bg-surface-card p-7">
                <h3 className="font-display text-headline-sm font-bold text-cream">{f.title}</h3>
                <p className="mt-2 text-body-md text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-lg border border-outline-variant bg-surface-card p-8">
            <div className="flex items-center gap-3"><PartyPopper size={22} className="text-gold" /><h3 className="font-display text-headline-sm font-bold text-cream">Perfect For</h3></div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {privateEvents.eventTypes.map((t) => (<span key={t} className="rounded-full border border-outline px-4 py-1.5 font-label text-[12px] uppercase tracking-wide text-on-surface-variant">{t}</span>))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Request a Date</p>
            <h2 className="mt-4 font-display text-headline-lg font-bold text-cream">Tell Us About Your Event</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-body-lg text-on-surface-variant">{privateEvents.pricing} Send us the details and we'll get right back to you with options and a quote. Prefer to talk it through? Call {company.phone}.</p>
            <p className="mt-4 text-body-md text-on-surface-variant">Or visit us at {company.addressOneLine}.</p>
          </div>
          <div className="reveal rounded-lg border border-outline-variant bg-surface-card p-8 md:p-10">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center" style={{ animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) both' }}>
                <span className="flex items-center justify-center" style={{ animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                  <SuccessCheck />
                </span>
                <p className="font-display text-headline-sm font-bold text-cream">
                  {firstName ? `Thank You, ${firstName}!` : 'Request received!'}
                </p>
                <p className="max-w-md text-body-md text-on-surface-variant">
                  We've got your event request and will reach out shortly with availability and pricing. Want to talk it through now? Give us a call.
                </p>
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
                  Send another request
                </button>
              </div>
            ) : (
              <form name="private-events" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-4">
                <input type="hidden" name="form-name" value="private-events" />
                <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
                <input type="hidden" name="event-type" value={eventType} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatField idPrefix="pe" name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <FloatField idPrefix="pe" name="phone" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <FloatField idPrefix="pe" name="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <FloatField idPrefix="pe" name="event-name" label="Event name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />

                <fieldset>
                  <legend className="mb-3 block font-label text-[11px] font-medium uppercase tracking-[0.16em] text-on-surface-variant">Event type</legend>
                  <IconCardSelect options={EVENT_TYPE_OPTIONS} value={eventType} onChange={setEventType} />
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Event date</span><input className={field} type="date" name="event-date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} /></label>
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Start time</span><input className={field} type="time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></label>
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Guests</span><input className={field} type="number" min="1" name="guest-count" placeholder="e.g. 40" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} /></label>
                </div>
                <FloatField idPrefix="pe" name="details" label="Tell us more about your event (optional)" value={details} onChange={(e) => setDetails(e.target.value)} textarea rows={4} />
                {error && (<p className="text-body-md text-error">Something went wrong sending your request. Please try again, or call {company.phone}.</p>)}
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-gold px-8 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-all hover:bg-gold-light active:scale-[0.99] disabled:opacity-70"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                  {sending ? (<><Loader2 size={16} className="animate-spin" /> Sending</>) : (<><Send size={14} /> Request Your Event <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
