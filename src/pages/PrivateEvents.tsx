import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, PartyPopper } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { company, privateEvents } from '../data/site'

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

export default function PrivateEvents() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'private-events', ...data }) })
      if (!res.ok) throw new Error()
      setSent(true); form.reset()
    } catch { setError(true) }
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
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-on-gold"><Check size={28} /></span>
                <p className="font-display text-headline-sm font-bold text-cream">Request received!</p>
                <p className="text-body-md text-on-surface-variant">Thanks — we've got your event request and will reach out shortly with availability and pricing.</p>
              </div>
            ) : (
              <form name="private-events" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-4">
                <input type="hidden" name="form-name" value="private-events" />
                <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label htmlFor="pe-name" className="sr-only">Name</label>
                  <input id="pe-name" className={field} type="text" name="name" placeholder="Name" required />
                  <label htmlFor="pe-phone" className="sr-only">Phone</label>
                  <input id="pe-phone" className={field} type="tel" name="phone" placeholder="Phone" required />
                </div>
                <label htmlFor="pe-email" className="sr-only">Email</label>
                <input id="pe-email" className={field} type="email" name="email" placeholder="Email" required />
                <label htmlFor="pe-event-name" className="sr-only">Event name or type</label>
                <input id="pe-event-name" className={field} type="text" name="event-name" placeholder="Event name / type" required />
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Event date</span><input className={field} type="date" name="event-date" /></label>
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Start time</span><input className={field} type="time" name="start-time" /></label>
                  <label className="flex flex-col gap-1"><span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-variant">Guests</span><input className={field} type="number" min="1" name="guest-count" placeholder="e.g. 40" /></label>
                </div>
                <label htmlFor="pe-details" className="sr-only">Event details</label>
                <textarea id="pe-details" className={field} name="details" rows={4} placeholder="Tell us more about your event (optional)" />
                {error && (<p className="text-body-md text-error">Something went wrong sending your request. Please try again, or call {company.phone}.</p>)}
                <button type="submit" className="w-full rounded bg-gold px-8 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-colors hover:bg-gold-light">Request Your Event</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
