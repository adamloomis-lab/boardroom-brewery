import { useState } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send, ArrowRight, Loader2,
  HelpCircle, CalendarDays, GlassWater, PartyPopper, MessageCircle, type LucideIcon } from 'lucide-react'
import { company } from '../data/site'
import HoursList from '../components/HoursList'
import { FloatField, IconCardSelect, SuccessCheck } from '../components/FluidField'

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

// Single-select icon cards for "What's this about?" — submits as `subject`.
const SUBJECT_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'General Question', label: 'General question', icon: HelpCircle },
  { value: 'Private Event', label: 'Private event', icon: CalendarDays },
  { value: 'Beer & Taproom', label: 'Beer & taproom', icon: GlassWater },
  { value: 'Group Visit', label: 'Group visit', icon: PartyPopper },
  { value: 'Something Else', label: 'Something else', icon: MessageCircle },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [sending, setSending] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const reset = () => { setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('') }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(false); setSending(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...data }) })
      if (!res.ok) throw new Error()
      setFirstName((name.trim().split(' ')[0]) || '')
      setSent(true); form.reset(); reset()
    } catch { setError(true) } finally { setSending(false) }
  }

  return (
    <>
      <section className="relative flex min-h-[46vh] items-center overflow-hidden">
        <img src="/media/gallery/br-18.jpg" alt="Boardroom Brewery in El Segundo" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/68" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Come Visit</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Contact &amp; Directions</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Find us in El Segundo, minutes from LAX. Stop in, or send a note and we'll get right back to you.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Our Location</p>
            <h2 className="mt-4 font-display text-headline-lg font-bold text-cream">211 Arena Street</h2>
            <span className="gold-rule mt-5" />
            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4"><MapPin size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-on-surface hover:text-gold">{company.addressOneLine}</a></li>
              <li className="flex items-start gap-4"><Phone size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.phoneHref} className="text-on-surface hover:text-gold">{company.phone}</a></li>
              <li className="flex items-start gap-4"><Mail size={20} className="mt-0.5 shrink-0 text-gold" /><a href={company.emailHref} className="break-all text-on-surface hover:text-gold">{company.email}</a></li>
            </ul>
            <div className="mt-8 flex gap-3">
              <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded border border-outline text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded border border-outline text-cream transition-colors hover:border-gold hover:text-gold" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
            <div className="mt-10 rounded-lg border border-outline-variant bg-surface-card p-7">
              <div className="flex items-center gap-3"><Clock size={20} className="text-gold" /><h3 className="font-display text-headline-sm font-bold text-cream">Hours</h3></div>
              <HoursList className="mt-4 -mx-2" />
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-lg border border-outline-variant bg-surface-card p-8 md:p-10">
              <p className="eyebrow">Send a Message</p>
              <h2 className="mt-4 font-display text-headline-md font-bold text-cream">Get in Touch</h2>
              {sent ? (
                <div
                  className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-gold/40 bg-gold/5 px-6 py-12 text-center"
                  style={{ animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  <span className="flex items-center justify-center" style={{ animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                    <SuccessCheck />
                  </span>
                  <p className="font-display text-headline-sm font-bold text-cream">
                    {firstName ? `Thank You, ${firstName}!` : 'Thank You!'}
                  </p>
                  <p className="max-w-md text-body-md text-on-surface-variant">
                    We've got your message and will get back to you as soon as we can. Need an answer right now? Give us a call and we'll help you today.
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
                    Send another message
                  </button>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="mt-7 space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
                  <input type="hidden" name="subject" value={subject} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatField idPrefix="contact" name="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <FloatField idPrefix="contact" name="phone" label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <FloatField idPrefix="contact" name="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                  <fieldset>
                    <legend className="mb-3 block font-label text-[11px] font-medium uppercase tracking-[0.16em] text-on-surface-variant">What's this about?</legend>
                    <IconCardSelect options={SUBJECT_OPTIONS} value={subject} onChange={setSubject} />
                  </fieldset>

                  <FloatField idPrefix="contact" name="message" label="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} required textarea rows={5} />
                  {error && (<p className="text-body-md text-error">Oops, there was an error sending your message. Please try again, or call {company.phone}.</p>)}
                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-gold px-8 py-4 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-on-gold transition-all hover:bg-gold-light active:scale-[0.99] disabled:opacity-70"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                    {sending ? (<><Loader2 size={16} className="animate-spin" /> Sending</>) : (<><Send size={14} /> Send Message <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant">
        <iframe title="Boardroom Brewery location map" src={company.mapsEmbed} className="h-[460px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </>
  )
}
