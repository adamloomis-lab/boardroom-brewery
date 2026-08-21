import { useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { beers, untappd, beerGallery } from '../data/site'
import CountUp from '../components/CountUp'
import ImageAutoSlider from '../components/ImageAutoSlider'

declare global { interface Window { PreloadEmbedMenu?: (id: string, a: number, b: number) => void } }

export default function Beer() {
  useEffect(() => {
    const load = () => { try { window.PreloadEmbedMenu?.('menu-container', untappd.menuId, untappd.sectionId) } catch { /* ignore */ } }
    if (window.PreloadEmbedMenu) { load(); return }
    const s = document.createElement('script')
    s.src = 'https://embed-menu-preloader.untappdapi.com/embed-menu-preloader.min.js'
    s.async = true
    s.onload = load
    document.body.appendChild(s)
  }, [])

  return (
    <>
      <section className="relative flex min-h-[48vh] items-center overflow-hidden">
        <img src="/media/beer/beer-photo-1.jpg" alt="A Boardroom-branded glass of craft beer in the El Segundo taproom" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="container-x relative z-10 pt-24 text-center">
          <h1 className="rise rise-2 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Beer &amp; Seltzer</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Small-batch craft beer and house-crafted hard seltzers, brewed on-site in El Segundo. Our live tap list updates in real time below.</p>
        </div>
      </section>

      {/* Flagships: the brewhouse itself anchors the section, the lineup
          reads as a tap list beside it. The lead pour gets the big slot;
          the rest are ledger rows with ABV in a tabular right column. */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading title="Flagships &amp; Rotating Pours" align="left" />
          <div className="mt-12 grid items-stretch gap-10 reveal-group lg:grid-cols-[440px_1fr] lg:gap-14">
            <figure className="relative min-h-[420px] overflow-hidden rounded-[3px] lg:min-h-0">
              <img
                src="/media/brewhouse-taps.webp"
                alt="The Boardroom brewhouse: tanks, tap handles, and the surfboard over the bar"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="flex flex-col">
              {beers.filter((b) => b.featured).map((b) => (
                <article key={b.name} className="border-b border-outline-variant pb-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-headline-md font-bold text-cream">{b.name}</h3>
                    <span className="font-display text-headline-md font-bold text-gold"><CountUp value={b.abv} /></span>
                  </div>
                  <p className="mt-1 font-label text-[11px] uppercase tracking-[0.16em] text-gold">{b.tag} · {b.style}</p>
                  <p className="mt-4 max-w-xl text-body-lg text-on-surface-variant">{b.notes}</p>
                  <p className="mt-3 font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{b.flavors.join(' · ')}</p>
                </article>
              ))}
              <div className="divide-y divide-outline-variant">
                {beers.filter((b) => !b.featured).map((b) => (
                  <article key={b.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 py-6">
                    <div>
                      <h3 className="font-display text-headline-sm font-bold text-cream">{b.name}</h3>
                      <p className="mt-0.5 font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{b.style}</p>
                      <p className="mt-2 max-w-xl text-body-md text-on-surface-variant">{b.notes}</p>
                    </div>
                    <span className="font-display text-headline-sm font-bold text-gold"><CountUp value={b.abv} /></span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The pours — scrolling gallery of their beer photos */}
      <section className="border-t border-outline-variant py-16 md:py-20">
        <div className="container-x">
          <SectionHeading title="Straight From the Tap" align="left" />
        </div>
        <div className="mt-10"><ImageAutoSlider images={beerGallery} /></div>
      </section>

      {/* Live Untappd menu */}
      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x">
          <SectionHeading title="What's On Tap Right Now" intro="Pulled straight from our Untappd menu, always current." />
          <div className="mx-auto mt-12 max-w-3xl rounded-[3px] border border-outline-variant bg-surface-card p-4 md:p-8">
            <div id="menu-container" className="untappd-embed min-h-[200px]" />
            <noscript><p className="text-center text-body-md text-on-surface-variant">Enable JavaScript to view our live tap list, or check us out on Untappd.</p></noscript>
          </div>
          <div className="mt-8 text-center"><Button href="https://untappd.com/" variant="outline">View on Untappd <ExternalLink size={15} /></Button></div>
        </div>
      </section>
    </>
  )
}
