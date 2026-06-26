import { Trophy, Truck, CalendarDays, Star } from 'lucide-react'
import Button from '../components/Button'
import { worldCup, worldCupTitle, worldCupIntro } from '../data/worldcup'
import { company } from '../data/site'

export default function WorldCup() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-center overflow-hidden">
        <img src="/media/worldcup-hero.avif" alt="World Cup watch parties at Boardroom Brewery" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/75" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">2026 · Minutes from SoFi Stadium</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">{worldCupTitle}</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">{worldCupIntro}</p>
          <div className="rise rise-4 mt-8"><Button href="/contact" variant="gold"><Trophy size={16} /> Reserve a Watch-Party Table</Button></div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x space-y-5">
          {worldCup.map((d) => {
            const closed = /closed/i.test(d.open)
            return (
              <article key={d.date} className="reveal overflow-hidden rounded-lg border border-outline-variant bg-surface-card">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant bg-surface px-6 py-4">
                  <div className="flex items-center gap-3"><CalendarDays size={18} className="text-gold" /><h2 className="font-display text-headline-sm font-bold text-cream">{d.date}</h2></div>
                  <span className={`font-label text-[11px] font-bold uppercase tracking-[0.14em] ${closed ? 'text-muted' : 'text-gold'}`}>{d.open}</span>
                </header>
                <div className="px-6 py-5">
                  {(d.foodVendors || d.events) && (
                    <div className="mb-4 flex flex-col gap-2">
                      {d.foodVendors && (<p className="inline-flex items-center gap-2 text-sm text-on-surface-variant"><Truck size={15} className="text-gold" /> <span className="font-semibold text-cream">Food:</span> {d.foodVendors}</p>)}
                      {d.events?.map((e) => (<p key={e} className="inline-flex items-center gap-2 text-sm text-on-surface-variant"><Star size={15} className="text-gold" /> <span className="font-semibold text-cream">Event:</span> {e}</p>))}
                    </div>
                  )}
                  <ul className="divide-y divide-white/5">
                    {d.matches.map((m) => (
                      <li key={m.teams} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                        <span className="font-display text-body-lg font-semibold text-cream">{m.teams}</span>
                        <span className="font-label text-[11px] uppercase tracking-[0.12em] text-on-surface-variant">{m.group} · {m.venue} · <span className="text-gold">{m.time}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
        <div className="container-x mt-12 rounded-lg border border-gold/40 bg-surface-card p-8 text-center">
          <h2 className="font-display text-headline-md font-bold text-cream">Watch the World Cup at Boardroom</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-on-surface-variant">Big screens, cold pours, and a different food truck most days. {company.nearLax}</p>
          <div className="mt-6"><Button href="/private-events" variant="gold">Book a Group Watch Party</Button></div>
        </div>
      </section>
    </>
  )
}
