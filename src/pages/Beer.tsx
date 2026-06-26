import { useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import { beers, untappd, beerGallery } from '../data/site'
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
          <p className="eyebrow rise rise-1">Now Pouring</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Beer &amp; Seltzer</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Small-batch craft beer and house-crafted hard seltzers, brewed on-site in El Segundo. Our live tap list updates in real time below.</p>
        </div>
      </section>

      {/* Flagship + rotating cards */}
      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="The Lineup" title="Flagships &amp; Rotating Pours" align="left" />
          <div className="mt-12 grid gap-6 reveal-group md:grid-cols-2 lg:grid-cols-3">
            {beers.map((b) => (
              <article key={b.name} className={`rounded-lg border p-7 ${b.featured ? 'border-gold/50 bg-surface-card' : 'border-outline-variant bg-surface-card'}`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gold/15 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest text-gold">{b.tag}</span>
                  <span className="font-display text-headline-sm font-bold text-gold">{b.abv}</span>
                </div>
                <h3 className="mt-4 font-display text-headline-sm font-bold text-cream">{b.name}</h3>
                <p className="font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{b.style}</p>
                <p className="mt-3 text-body-md text-on-surface-variant">{b.notes}</p>
                <div className="mt-4 flex flex-wrap gap-2">{b.flavors.map((f) => (<span key={f} className="border border-outline px-3 py-1 font-label text-[10px] uppercase tracking-wide text-on-surface-variant">{f}</span>))}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The pours — scrolling gallery of their beer photos */}
      <section className="border-t border-outline-variant py-16 md:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="The Pours" title="Straight From the Tap" align="left" />
        </div>
        <div className="mt-10"><ImageAutoSlider images={beerGallery} /></div>
      </section>

      {/* Live Untappd menu */}
      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Live Menu" title="What's On Tap Right Now" intro="Pulled straight from our Untappd menu — always current." />
          <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-outline-variant bg-surface-card p-4 md:p-8">
            <div id="menu-container" className="untappd-embed min-h-[200px]" />
            <noscript><p className="text-center text-body-md text-on-surface-variant">Enable JavaScript to view our live tap list, or check us out on Untappd.</p></noscript>
          </div>
          <div className="mt-8 text-center"><Button href="https://untappd.com/" variant="outline">View on Untappd <ExternalLink size={15} /></Button></div>
        </div>
      </section>
    </>
  )
}
