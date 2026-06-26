const offerings = [
  'Craft Beer',
  'Hard Seltzer',
  'Natural-Style Wine',
  'Brewed On-Site',
  'Rotating Food Trucks',
  'Private Events',
  'Run Club',
  'World Cup Watch Parties',
  'Trivia & Comedy',
  'Locally Sourced',
  'Dog & Kid Friendly',
]

export default function Marquee() {
  const doubled = [...offerings, ...offerings]
  return (
    <div className="relative overflow-hidden border-y border-outline-variant bg-surface py-6">
      <style>{`
        @keyframes br-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .br-marquee { animation: br-marquee 45s linear infinite; }
        .br-marquee:hover { animation-play-state: paused; }
      `}</style>
      <div className="br-marquee flex w-max items-center">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display text-2xl font-bold text-cream md:text-[28px]">{t}</span>
            <span className="text-xl text-gold" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
