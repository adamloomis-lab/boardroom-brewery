import { Grape, MapPin } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { wineIntro, wineRegion, wines } from '../data/site'

export default function Wine() {
  return (
    <>
      <section className="relative flex min-h-[48vh] items-center overflow-hidden">
        <img src="/media/gallery/br-15.jpg" alt="Natural wine at Boardroom Brewery" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Natural-Style Wine</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">The Wine List</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Minimal additives, maximum character. Low-intervention California wines, thoughtfully sourced.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-4 font-display text-headline-lg font-bold text-cream">Honest, Modern, Drinkable</h2>
            <span className="gold-rule mt-5" />
            <p className="mt-6 text-body-lg text-on-surface-variant">{wineIntro}</p>
          </div>
          <div className="reveal rounded-lg border border-outline-variant bg-surface-card p-8">
            <Grape size={30} className="text-gold" />
            <h3 className="mt-4 font-display text-headline-sm font-bold text-cream">{wineRegion.name}</h3>
            <p className="mt-3 text-body-md text-on-surface-variant">{wineRegion.blurb}</p>
            <div className="mt-5 inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.16em] text-gold"><MapPin size={14} /> Sandy-loam soils · Delta breezes</div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our Offerings" title="Now &amp; Coming Soon" />
          <div className="mt-12 grid gap-6 reveal-group md:grid-cols-2">
            {wines.map((w) => (
              <article key={w.name} className="relative rounded-lg border border-outline-variant bg-surface-card p-8">
                {w.soldOut && (<span className="absolute right-6 top-6 rounded-full border border-gold/40 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-gold/80">Sold Out</span>)}
                <h3 className="max-w-[80%] font-display text-headline-sm font-bold text-cream">{w.name}</h3>
                <p className="mt-1 font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{w.released}</p>
                <p className="mt-4 text-body-md text-on-surface-variant">{w.notes}</p>
                <p className="mt-5 font-label text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">{w.status}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-body-md text-on-surface-variant">Check back for more releases, or sign up to stay updated.</p>
          <div className="mt-6 text-center"><Button href="/contact" variant="outline">Get on the List</Button></div>
        </div>
      </section>
    </>
  )
}
