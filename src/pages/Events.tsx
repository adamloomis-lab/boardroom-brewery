import { ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { events, gallery, pageImages } from '../data/site'
import ImageAutoSlider from '../components/ImageAutoSlider'
import { useUpcoming } from '../hooks/useUpcoming'
import { fmtEventWhen } from '../lib/dates'

const eventsScroll = ['/media/events/img-1116.png', '/media/events/img-1107.png', ...gallery.slice(0, 18).map((g) => g.src)]

export default function Events() {
  const { events: dated } = useUpcoming()
  // Featured events lead; the sort is stable so date order holds within each group.
  const upcoming = [...dated].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  return (
    <>
      <section className="relative flex min-h-[48vh] items-center overflow-hidden">
        <img src={pageImages.events || '/media/gallery/br-44.webp'} alt="Events at Boardroom Brewery" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="container-x relative z-10 pt-24 text-center">
          <h1 className="rise rise-2 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Events &amp; Food Trucks</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Run club, rotating food trucks, trivia and comedy, and big-screen watch parties. There's almost always something happening at the Boardroom.</p>
        </div>
      </section>

      {/* Dated events the taproom posts from its dashboard. Nothing renders
          when the list is empty, so the recurring program stands alone. */}
      {upcoming.length > 0 && (
        <section className="pt-20 md:pt-24">
          <div className="container-x">
            <SectionHeading title="Upcoming" align="left" />
            <div className="mt-10 divide-y divide-outline-variant border-y border-outline-variant reveal-group">
              {upcoming.map((e) => (
                <article key={e.id} className={`grid gap-6 py-10 md:gap-10 md:py-12 ${e.image_url ? 'md:grid-cols-[1fr_300px]' : ''}`}>
                  <div className="min-w-0">
                    <p className="font-display text-body-md font-semibold uppercase tracking-[0.06em] text-gold">{fmtEventWhen(e.starts_at, e.ends_at)}</p>
                    <h3 className="mt-2 font-display text-headline-md font-bold text-cream">{e.title}</h3>
                    {e.description && <p className="mt-3 max-w-2xl whitespace-pre-line text-body-lg text-on-surface-variant">{e.description}</p>}
                  </div>
                  {e.image_url && (
                    <img src={e.image_url} alt={e.title} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover md:aspect-square" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The weekly program as a ledger, not a row of matching cards. The
          cadence column does the organising; the divider rhythm does the
          separating; nothing needs a tag or an icon. */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <div className="reveal-group divide-y divide-outline-variant border-y border-outline-variant">
            {events.map((e) => (
              <article key={e.title} className="grid gap-2 py-10 md:grid-cols-[1fr_220px] md:gap-10 md:py-12">
                <div>
                  <h3 className="font-display text-headline-md font-bold text-cream">{e.title}</h3>
                  <p className="mt-3 max-w-2xl text-body-lg text-on-surface-variant">{e.desc}</p>
                </div>
                <p className="font-display text-body-md font-semibold uppercase tracking-[0.06em] text-gold md:text-right">{e.when}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x">
          <a href="/run-club" className="group flex flex-col gap-4 border border-outline-variant bg-surface-card p-8 transition-colors hover:border-gold sm:flex-row sm:items-center sm:justify-between md:p-10">
            <div>
              <h3 className="font-display text-headline-sm font-bold text-cream">Run with us Wednesday</h3>
              <p className="mt-2 text-body-md text-on-surface-variant">5K to The Strand and back at 6 pm. Walkers welcome, beers at the finish.</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-label text-[13px] font-bold uppercase tracking-[0.14em] text-gold">Join the Run <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
          </a>
        </div>
        <div className="container-x mt-14">
          <h3 className="font-display text-headline-sm font-bold text-cream">From the Boardroom</h3>
        </div>
        <div className="mt-8"><ImageAutoSlider images={eventsScroll} /></div>
        <div className="container-x mt-10 text-center"><Button href="/private-events" variant="gold">Host Your Own Event</Button></div>
      </section>
    </>
  )
}
