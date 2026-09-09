import { useEffect, useState } from 'react'
import { beers as baked, beerGallery as generic, type Beer } from '../data/site'

// The tap list the pages render. Starts with the list baked in at build time
// (so server HTML and first paint agree), then swaps to what the manager last
// published. The gallery is every current beer photo plus the general shots.
let cache: Beer[] | null = null

export function useTapList() {
  const [beers, setBeers] = useState<Beer[]>(cache || baked)

  useEffect(() => {
    if (cache) return
    let alive = true
    fetch('/.netlify/functions/taplist')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.beers) || !d.beers.length) return
        cache = d.beers as Beer[]
        setBeers(cache)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const featured = beers.find((b) => b.featured) || beers[0]
  const rest = beers.filter((b) => b !== featured)
  const photos = beers.map((b) => b.image).filter((s): s is string => !!s)
  const gallery = [...photos, ...generic.filter((g) => !photos.includes(g))]
  return { beers, featured, rest, gallery }
}
