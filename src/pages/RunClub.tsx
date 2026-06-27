import { Footprints, Clock, Route, Users } from 'lucide-react'
import Button from '../components/Button'
import { runClub, company } from '../data/site'

export default function RunClub() {
  const facts = [
    { icon: Clock, label: 'When', value: `${runClub.day} · ${runClub.time}` },
    { icon: Route, label: 'Distance', value: runClub.distance },
    { icon: Footprints, label: 'Start / Finish', value: 'Boardroom Brewery' },
    { icon: Users, label: 'Pace', value: 'Runners & walkers' },
  ]
  return (
    <>
      <section className="relative flex min-h-[52vh] items-center overflow-hidden">
        <img src="/media/events/img-1116.png" alt="Boardroom Brewery Run Club along the El Segundo strand" className="kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Wednesdays · 6PM</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Run Club</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">Lace up, log a few miles, and earn your pour. Everyone's welcome, and the beers will be waiting.</p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-x">
          <div className="grid gap-4 reveal-group sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-lg border border-outline-variant bg-surface-card p-7">
                <f.icon size={26} className="text-gold" />
                <p className="mt-4 font-label text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{f.label}</p>
                <p className="mt-1 font-display text-headline-sm font-semibold text-cream">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-8 text-center">
            <div className="reveal"><p className="eyebrow">The Route</p><p className="mt-3 text-body-lg text-on-surface-variant">{runClub.route}</p></div>
            <div className="reveal"><p className="eyebrow">Your Run Lead</p><p className="mt-3 text-body-lg text-on-surface-variant">{runClub.leader}</p></div>
            <div className="reveal rounded-lg border border-gold/40 bg-surface-card p-8"><p className="eyebrow text-gold">Walkers Welcome</p><p className="mt-3 text-body-lg text-on-surface-variant">{runClub.walkers}</p></div>
          </div>

          <div className="mt-12 text-center"><Button href={company.social.instagram} variant="gold">Follow for Weekly Updates</Button></div>
        </div>
      </section>
    </>
  )
}
