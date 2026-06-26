import { Check, MapPin, Clock } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/Button'
import HoursList from '../components/HoursList'
import { company, taproomFeatures, gallery } from '../data/site'

export default function Taproom() {
  return (
    <>
      <section className="relative flex min-h-[56vh] items-center overflow-hidden">
        <img src="/media/gallery/br-22.jpg" alt="The Boardroom Brewery taproom in El Segundo" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/65" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">The Taproom</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Come and Visit</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">{company.nearLax} Whether you're a local or visiting Los Angeles, our taproom is a convenient and unique brewery experience.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Why Visit" title="A Brewery + Event-Space Hybrid" intro="We're open six days a week with rotating beer & seltzers and a relaxed, modern atmosphere." />
          <div className="mt-12 grid gap-4 reveal-group sm:grid-cols-2 lg:grid-cols-3">
            {taproomFeatures.map((f) => (
              <div key={f} className="flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-card px-6 py-5">
                <Check size={20} className="shrink-0 text-gold" />
                <span className="font-display text-headline-sm font-semibold text-cream">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="reveal rounded-lg border border-outline-variant bg-surface-card p-8">
            <div className="flex items-center gap-3"><Clock size={22} className="text-gold" /><h3 className="font-display text-headline-sm font-bold text-cream">Hours</h3></div>
            <p className="mt-2 text-body-md text-on-surface-variant">Open six days a week. Closed Mondays.</p>
            <HoursList className="mt-5 -mx-2" />
          </div>
          <div className="reveal rounded-lg border border-outline-variant bg-surface-card p-8">
            <div className="flex items-center gap-3"><MapPin size={22} className="text-gold" /><h3 className="font-display text-headline-sm font-bold text-cream">Find Us</h3></div>
            <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="mt-3 block text-body-lg text-on-surface-variant hover:text-gold">{company.addressOneLine}</a>
            <p className="mt-2 text-body-md text-on-surface-variant">Minutes from LAX and the South Bay, with rideshare and street parking nearby.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={company.mapsDir} variant="gold"><MapPin size={16} /> Directions</Button>
              <Button href="/private-events" variant="outline">Book the Space</Button>
            </div>
          </div>
        </div>
        <div className="container-x mt-12 grid grid-cols-2 gap-3 reveal-group sm:grid-cols-4">
          {[{ src: '/media/gallery/taproom.jpg', alt: 'Inside the Boardroom brewhouse' }, { src: '/media/gallery/beerpic.jpg', alt: 'A Boardroom pour out front' }, ...gallery.slice(18, 24)].map((g) => (<img key={g.src} src={g.src} alt={g.alt} className="aspect-square w-full rounded object-cover" loading="lazy" />))}
        </div>
      </section>
    </>
  )
}
