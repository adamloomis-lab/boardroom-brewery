import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Beer as BeerIcon, MapPin, Check } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { company, events } from '../data/site'
import ImageAutoSlider from '../components/ImageAutoSlider'
import Reviews from '../components/Reviews'
import Marquee from '../components/Marquee'
import CrossfadeImage from '../components/CrossfadeImage'
import BeerShowcase from '../components/BeerShowcase'
import Faq from '../components/Faq'

const encode = (d: Record<string, string>) =>
  Object.keys(d).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`).join('&')

function Newsletter() {
  const [sent, setSent] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'newsletter', ...data }) })
      setSent(true); form.reset()
    } catch { setSent(true) }
  }
  return (
    <section className="bg-gold">
      <div className="container-x flex flex-col items-center justify-between gap-8 py-16 md:flex-row">
        <div className="max-w-xl">
          <h2 className="font-display text-headline-lg font-bold text-on-gold">Join the Boardroom.</h2>
          <p className="mt-2 text-body-md text-on-gold/80">Get first word on new beer & wine releases, event invites, and secret tappings.</p>
        </div>
        {sent ? (
          <p className="inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-[0.14em] text-on-gold"><Check size={18} /> You're on the list. Cheers!</p>
        ) : (
          <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="flex w-full gap-2 md:w-auto">
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden"><label>Don't fill this out: <input name="bot-field" /></label></p>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" name="email" required placeholder="YOUR EMAIL" className="w-full border-b-2 border-on-gold/30 bg-on-gold/10 px-4 py-3 font-label text-sm uppercase tracking-wide text-on-gold placeholder:text-on-gold/50 focus:border-on-gold focus-visible:outline-none md:w-64" />
            <button type="submit" className="shrink-0 bg-background px-7 py-3 font-label text-[12px] font-bold uppercase tracking-[0.14em] text-cream transition-opacity hover:opacity-80">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover brightness-[1.18] contrast-[1.03]" autoPlay muted loop playsInline poster="/media/gallery/br-01.jpg" aria-hidden="true">
          <source src="/media/video/brewery-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="container-x relative z-10 pt-24 text-center [text-shadow:0_2px_28px_rgba(0,0,0,0.6)]">
          <img src="/media/boardroom-logo-white.png" alt="Boardroom Brewery" className="rise rise-1 mx-auto mb-7 h-12 w-auto max-w-[82%] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:h-16" />
          <p className="eyebrow rise rise-1">El Segundo, California · Near LAX</p>
          <h1 className="rise rise-2 mx-auto mt-6 max-w-4xl font-display text-display-lg-mobile font-extrabold text-cream md:text-display-xl">Crafted at the Arena.</h1>
          <p className="rise rise-3 mx-auto mt-6 max-w-2xl text-body-lg text-on-surface">{company.shortBlurb}</p>
          <div className="rise rise-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/beer" variant="gold">See What's On Tap <ArrowRight size={16} /></Button>
            <Button href="/taproom" variant="ghost">Explore the Taproom</Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-label text-label-sm uppercase tracking-[0.24em] text-cream/60">Scroll to explore</div>
      </section>

      {/* OFFERINGS MARQUEE */}
      <Marquee />

      {/* STORY */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Since 2024</p>
            <h2 className="mt-4 font-display text-headline-lg font-bold text-cream md:text-[46px]">Brewed with Local Soul.</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-body-lg text-on-surface-variant">At Boardroom Brewery, beer is a structural art form. Every batch is brewed right here on Arena Street with high-quality, locally sourced ingredients. From our flagship heavy-hitters to rotating seasonal experiments, we balance industrial precision with a craftsman's heart.</p>
            <p className="mt-4 text-body-lg text-on-surface-variant">Add house-crafted hard seltzers and natural-style California wines, and you've got a modern South Bay taproom built for great nights.</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-gold pl-6"><span className="block font-display text-headline-md font-bold text-cream">On-Site</span><span className="font-label text-label-sm uppercase tracking-[0.16em] text-on-surface-variant">Brewed on Arena St.</span></div>
              <div className="border-l-2 border-gold pl-6"><span className="block font-display text-headline-md font-bold text-cream">Local</span><span className="font-label text-label-sm uppercase tracking-[0.16em] text-on-surface-variant">Ingredient Sourcing</span></div>
            </div>
          </div>
          <div className="reveal relative">
            <CrossfadeImage images={['/media/gallery/br-48.webp', '/media/gallery/taproom.jpg', '/media/beer/beer-photo-1.jpg', '/media/gallery/br-44.webp', '/media/gallery/br-46.webp', '/media/events/img-1116.png']} alt="Inside Boardroom Brewery in El Segundo" className="aspect-[4/3] w-full rounded-lg shadow-2xl" />
            <div className="absolute -bottom-5 left-5 rounded-lg border border-gold/40 bg-background/90 px-6 py-3 font-label text-label-sm uppercase tracking-[0.16em] text-gold backdrop-blur">El Segundo, CA</div>
          </div>
        </div>
      </section>

      {/* ON TAP PREVIEW */}
      <section className="bg-surface-container-lowest bg-surface py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Now Pouring" title="On Tap" intro="A live selection of structural brews, crisp seltzers, and natural wines. The full list updates daily on our Untappd menu." />
          <div className="mt-14"><BeerShowcase /></div>
          <div className="mt-8 text-center"><Button href="/beer" variant="outline"><BeerIcon size={16} /> View the Full Tap List</Button></div>
        </div>
      </section>

      {/* FOOD & EVENTS */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-start gap-16 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="font-display text-display-lg-mobile font-bold leading-none text-cream md:text-[54px]">The Social Infrastructure.</h2>
            <div className="mt-10 space-y-6">
              {events.map((e) => (
                <div key={e.title} className="flex gap-5 border-b border-white/5 pb-6">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded border-t-2 border-gold bg-surface-card font-label text-[10px] uppercase text-gold">{e.tag}</div>
                  <div><h4 className="font-display text-headline-sm font-semibold text-cream">{e.title}</h4><p className="mt-1 text-sm text-on-surface-variant">{e.desc}</p><span className="mt-2 inline-block font-label text-[11px] uppercase tracking-widest text-gold">{e.when}</span></div>
                </div>
              ))}
              <Button href="/events" variant="outline">View All Events <ArrowRight size={15} /></Button>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-5">
            <img src="/media/gallery/br-20.jpg" alt="The Boardroom Brewery taproom" className="mt-10 h-72 w-full rounded-lg object-cover" loading="lazy" />
            <img src="/media/gallery/br-25.jpg" alt="Food trucks and patio at Boardroom Brewery" className="h-72 w-full rounded-lg object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* WATCH — clickable videos */}
      <section className="border-y border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Watch" title="Inside the Boardroom" intro="A few moments from the taproom and the brews. Tap any video to play." />
          <div className="mx-auto mt-12 max-w-3xl reveal">
            <video className="aspect-video w-full rounded-lg border border-outline-variant bg-black object-cover brightness-105" controls preload="metadata" poster="/media/gallery/br-44.webp">
              <source src="/media/video/brewery-1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* GALLERY — infinite slider of every photo */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Inside Boardroom" title="A Look Around" align="left" />
        </div>
        <div className="mt-10"><ImageAutoSlider /></div>
        <div className="container-x mt-8"><Button href="/gallery" variant="ghost">See the Full Gallery <ArrowRight size={15} /></Button></div>
      </section>

      <Reviews />

      <Faq />

      {/* VISIT BAND */}
      <section className="relative overflow-hidden">
        <img src="/media/br-wide-1920w.png" alt="" className="parallax absolute -inset-y-[14%] h-[128%] w-full object-cover" style={{ ['--p-amt' as string]: '32px' }} loading="lazy" />
        <div className="absolute inset-0 bg-background/88" />
        <div className="container-x relative z-10 py-24 text-center md:py-28">
          <p className="eyebrow">Come Visit</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-headline-lg font-bold text-cream md:text-[46px]">211 Arena Street, El Segundo</h2>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-on-surface-variant">{company.nearLax} Come for the beer, stay for the architecture.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={company.mapsDir} variant="gold"><MapPin size={16} /> Get Directions</Button>
            <Button href="/private-events" variant="outline">Book the Space</Button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="border-t border-outline-variant">
        <iframe title="Boardroom Brewery location map" src={company.mapsEmbed} className="h-[420px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>

      <Newsletter />
    </>
  )
}
