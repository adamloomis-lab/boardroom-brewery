import { gallery } from '../data/site'

// Infinite auto-scrolling image strip. Pass `images` to scope it (e.g. beer-only),
// or omit to use the full gallery. Adapted from the marketplace component to our stack.
export default function ImageAutoSlider({ images }: { readonly images?: readonly string[] }) {
  const imgs = images ?? gallery.map((g) => g.src)
  const doubled = [...imgs, ...imgs]
  return (
    <div className="relative w-full overflow-hidden py-2">
      <style>{`
        @keyframes br-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .br-infinite { animation: br-scroll 80s linear infinite; }
        .br-infinite:hover { animation-play-state: paused; }
        .br-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
        }
      `}</style>
      <div className="br-mask w-full">
        <div className="br-infinite flex w-max gap-4">
          {doubled.map((src, i) => (
            <div key={i} className="h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-outline-variant shadow-2xl md:h-60 md:w-60">
              <img src={src} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
