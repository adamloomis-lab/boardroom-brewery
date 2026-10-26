import { beers, beerGallery as generic } from '../data/site'

// The tap list the pages render. It is baked in from src/site-content.json at
// build time (the taproom publishes from its dashboard, which redeploys), so
// server HTML and the client always agree. The gallery is every current beer
// photo plus the general shots.
export function useTapList() {
  const featured = beers.find((b) => b.featured) || beers[0]
  const rest = beers.filter((b) => b !== featured)
  const photos = beers.map((b) => b.image).filter((s): s is string => !!s)
  const gallery = [...photos, ...generic.filter((g) => !photos.includes(g))]
  return { beers, featured, rest, gallery }
}
