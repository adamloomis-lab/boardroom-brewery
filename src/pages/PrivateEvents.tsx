import SectionHeading from '../components/SectionHeading'
import { company, privateEvents, pageImages } from '../data/site'
import ConfigForm from '../components/ConfigForm'

export default function PrivateEvents() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-center overflow-hidden">
        <img src={pageImages.privateEvents || '/media/gallery/br-12.jpg'} alt="Private event space at Boardroom Brewery near LAX" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="container-x relative z-10 pt-24 text-center">
          <h1 className="rise rise-2 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">{privateEvents.headline}</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">{privateEvents.blurb}</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading title="A Space That Flexes to Your Night" />
          {/* The space, as a ledger: same rhythm as the events program. Four
              matching cards said "template"; the divider list says "read on". */}
          <div className="mt-12 divide-y divide-outline-variant border-y border-outline-variant reveal-group">
            {privateEvents.features.map((f) => (
              <div key={f.title} className="grid gap-2 py-8 md:grid-cols-[280px_1fr] md:gap-10 md:py-9">
                <h3 className="font-display text-headline-sm font-bold text-cream">{f.title}</h3>
                <p className="max-w-2xl text-body-lg text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <h3 className="font-display text-headline-sm font-bold text-cream">Perfect for</h3>
            <div className="mt-5 flex max-w-4xl flex-wrap gap-2.5">
              {privateEvents.eventTypes.map((t) => (<span key={t} className="rounded-[3px] border border-outline px-4 py-1.5 font-label text-[12px] uppercase tracking-wide text-on-surface-variant">{t}</span>))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="font-display text-headline-lg font-bold text-cream">Tell Us About Your Event</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-body-lg text-on-surface-variant">{privateEvents.pricing} Send us the details and we'll get right back to you with options and a quote. Prefer to talk it through? Call {company.phone}.</p>
            <p className="mt-4 text-body-md text-on-surface-variant">Or visit us at {company.addressOneLine}.</p>
          </div>
          <div className="reveal rounded-[3px] border border-outline-variant bg-surface-card p-8 md:p-10">
            <ConfigForm name="private-events" idPrefix="pe" />
          </div>
        </div>
      </section>
    </>
  )
}
