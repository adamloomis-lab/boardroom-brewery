import { Link } from 'wouter'
import { MoveRight } from 'lucide-react'
import { beers } from '../data/site'

// Image-card bento grid (design ref: the blog-posts component) using their beer
// photos. Featured pour = tall left card; the rest fill the 2x2 on the right.
export default function BeerShowcase() {
  return (
    <div className="grid auto-rows-[280px] gap-4 md:grid-cols-2 lg:grid-cols-3">
      {beers.map((b) => {
        const featured = b.featured
        return (
          <Link
            key={b.name}
            href="/beer"
            style={{ backgroundImage: `url(${b.image})` }}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-outline-variant bg-cover bg-center p-6 text-white transition-transform duration-300 hover:scale-[0.99] ${featured ? 'lg:row-span-2' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95" />
            <div className="relative flex items-end justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-block rounded-full bg-white/15 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">{b.tag}</span>
                <h3 className={`mt-3 font-display font-bold leading-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{b.name}</h3>
                <p className="mt-1 font-label text-[11px] uppercase tracking-[0.16em] text-gold">{b.style} · {b.abv} ABV</p>
                {featured && <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{b.notes}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {b.flavors.map((f) => (
                    <span key={f} className="border border-white/25 px-2.5 py-1 font-label text-[10px] uppercase tracking-wide text-white/80">{f}</span>
                  ))}
                </div>
              </div>
              <MoveRight className="shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1.5" size={30} strokeWidth={1.5} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
