import { useState } from 'react'
import { X } from 'lucide-react'
import { gallery, videos } from '../data/site'

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center overflow-hidden">
        <img src="/media/gallery/br-08.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="container-x relative z-10 pt-24 text-center">
          <p className="eyebrow rise rise-1">Inside Boardroom</p>
          <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-extrabold text-cream md:text-display-lg">Gallery</h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-2xl text-body-lg text-on-surface">The taproom, the beer, the patio, the people. A look around our El Segundo brewery.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          {/* Videos first */}
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            {videos.map((v) => (
              <video key={v} className="aspect-video w-full rounded-lg object-cover" controls muted loop playsInline preload="metadata">
                <source src={v} type="video/mp4" />
              </video>
            ))}
          </div>
          {/* All photos */}
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
            {gallery.map((g) => (
              <button key={g.src} type="button" onClick={() => setActive(g.src)} className="block w-full overflow-hidden rounded-lg">
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-5 backdrop-blur" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button type="button" className="absolute right-5 top-5 text-cream hover:text-gold" aria-label="Close"><X size={32} /></button>
          <img src={active} alt="" className="max-h-[90vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </>
  )
}
