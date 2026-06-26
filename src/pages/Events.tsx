import { ArrowRight, Truck, Trophy, Footprints } from 'lucide-react'
import Button from '../components/Button'
import { events, gallery } from '../data/site'
import ImageAutoSlider from '../components/ImageAutoSlider'

const eventsScroll = ['/media/events/img-1116.png', '/media/events/img-1107.png', ...gallery.slice(0, 18).map((g) => g.src)]

export default function Events() {
  return (
    <>
      <section className="relative flex min-h-[48vh] items-center overflow-hidden">
        <img src="/media/gallery/br-44.webp" alt="Events at Boardroom Brewery" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">What's On</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Events &amp; Food Trucks</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Run club, rotating food trucks, trivia and comedy, and big-screen watch parties. There's almost always something happening at the Boardroom.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x grid gap-6 reveal-group sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <article key={e.title} className="rounded-lg border border-outline-variant bg-surface-card p-8">
              <span className="font-label text-[10px] font-bold uppercase tracking-widest text-gold">{e.tag}</span>
              <h3 className="mt-3 font-display text-headline-sm font-bold text-cream">{e.title}</h3>
              <p className="mt-1 font-label text-[12px] uppercase tracking-[0.14em] text-on-surface-variant">{e.when}</p>
              <p className="mt-4 text-body-md text-on-surface-variant">{e.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <a href="/world-cup" className="group flex flex-col justify-between rounded-lg border border-gold/40 bg-surface-card p-8 transition-colors hover:border-gold">
            <Trophy size={28} className="text-gold" />
            <div className="mt-6"><h3 className="font-display text-headline-sm font-bold text-cream">World Cup Watch Parties</h3><p className="mt-2 text-sm text-on-surface-variant">Every June match on the big screen. Minutes from SoFi.</p></div>
            <span className="mt-5 inline-flex items-center gap-2 font-label text-[12px] font-bold uppercase tracking-widest text-gold">June Schedule <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
          </a>
          <a href="/run-club" className="group flex flex-col justify-between rounded-lg border border-outline-variant bg-surface-card p-8 transition-colors hover:border-gold">
            <Footprints size={28} className="text-gold" />
            <div className="mt-6"><h3 className="font-display text-headline-sm font-bold text-cream">Wednesday Run Club</h3><p className="mt-2 text-sm text-on-surface-variant">6PM, 5K to The Strand and back. Walkers welcome.</p></div>
            <span className="mt-5 inline-flex items-center gap-2 font-label text-[12px] font-bold uppercase tracking-widest text-gold">Join the Run <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
          </a>
          <div className="flex flex-col justify-between rounded-lg border border-outline-variant bg-surface-card p-8">
            <Truck size={28} className="text-gold" />
            <div className="mt-6"><h3 className="font-display text-headline-sm font-bold text-cream">Rotating Food Trucks</h3><p className="mt-2 text-sm text-on-surface-variant">A different truck nearly every day — from Beachside Tacos to Freddy's Birria. Follow along on Instagram for the daily lineup.</p></div>
          </div>
        </div>
        <div className="container-x mt-14">
          <p className="eyebrow">From the Boardroom</p>
        </div>
        <div className="mt-8"><ImageAutoSlider images={eventsScroll} /></div>
        <div className="container-x mt-10 text-center"><Button href="/private-events" variant="gold">Host Your Own Event</Button></div>
      </section>
    </>
  )
}
