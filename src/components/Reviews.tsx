import { useEffect, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { reviews as staticReviews } from '../data/site'

// Live Google reviews as a horizontal auto-scrolling marquee of cards (design ref:
// Firehouse Tavern). SSR-safe static fallback swaps to live data on mount.
const PLACE_MAPS = 'https://www.google.com/maps/place/?q=place_id:ChIJ6QWZmemxwoARv5kXmXvfps4'
const STATIC = { rating: 4.5, count: 57 }
type Card = { author: string; rating: number; text: string; when?: string; photo?: string | null }
const FALLBACK: Card[] = staticReviews.map((r) => ({ author: r.author, rating: 5, text: r.quote }))

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(n) ? 'fill-gold text-gold' : 'text-cream/20'} aria-hidden="true" />
      ))}
    </span>
  )
}

export default function Reviews() {
  const [cards, setCards] = useState<Card[]>(FALLBACK)
  const [rating, setRating] = useState(STATIC.rating)
  const [count, setCount] = useState(STATIC.count)
  const [url, setUrl] = useState(PLACE_MAPS)

  useEffect(() => {
    let alive = true
    fetch('/.netlify/functions/reviews')
      .then((r) => r.json())
      .then((d) => {
        if (!alive || !d || !d.configured) return
        if (d.rating) setRating(d.rating)
        if (d.count) setCount(d.count)
        if (d.url) setUrl(d.url)
        if (Array.isArray(d.reviews) && d.reviews.length) {
          const live: Card[] = d.reviews.map((r: Card) => ({ author: r.author, rating: r.rating, text: r.text, when: r.when, photo: r.photo }))
          const seen = new Set(live.map((c) => c.author.toLowerCase()))
          const merged = [...live]
          for (const c of FALLBACK) {
            if (merged.length >= 6) break
            if (!seen.has(c.author.toLowerCase())) merged.push(c)
          }
          setCards(merged)
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <p className="eyebrow text-center">From Our Guests</p>
        <h2 className="mt-4 text-center font-display text-headline-lg font-bold text-cream md:text-[46px]">Loved in the Gundo</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-display text-headline-md font-bold text-gold">{rating.toFixed(1)}</span>
          <Stars n={rating} size={20} />
          <span className="font-label text-[12px] uppercase tracking-[0.16em] text-on-surface-variant">{count.toLocaleString()} Google reviews</span>
        </div>
      </div>

      <style>{`
        @keyframes rev-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .rev-track { animation: rev-scroll 60s linear infinite; }
        .rev-marquee:hover .rev-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .rev-track { animation: none; } }
        .rev-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
        }
      `}</style>
      <div className="rev-marquee rev-mask mt-12 overflow-hidden">
        <div className="rev-track flex w-max gap-5">
          {[...cards, ...cards].map((r, i) => (
            <figure key={i} className="flex w-[300px] shrink-0 flex-col rounded-xl border border-outline-variant bg-surface-card p-6 md:w-[360px]">
              <div className="mb-3 flex items-center justify-between">
                <Stars n={r.rating} />
                {r.when && <span className="font-label text-[10px] uppercase tracking-[0.12em] text-muted">{r.when}</span>}
              </div>
              <blockquote className="line-clamp-5 flex-1 text-body-md leading-relaxed text-on-surface">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {r.photo && <img src={r.photo} alt="" className="h-8 w-8 rounded-full" loading="lazy" />}
                <span className="font-label text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">{r.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-label text-[12px] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light">
          Read all reviews on Google <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
