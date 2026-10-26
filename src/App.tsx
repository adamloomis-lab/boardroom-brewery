import { useEffect } from 'react'
import { Route, Switch, Router, useLocation } from 'wouter'
import Seo from './components/Seo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'
import AgeGate from './components/AgeGate'
import CookieBanner from './components/CookieBanner'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useParallax } from './hooks/useParallax'
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll'
import Home from './pages/Home'
import Beer from './pages/Beer'
import Wine from './pages/Wine'
import Taproom from './pages/Taproom'
import Events from './pages/Events'
import RunClub from './pages/RunClub'
import PrivateEvents from './pages/PrivateEvents'
import Gallery from './pages/Gallery'
import QRScan from './pages/QRScan'
import Contact from './pages/Contact'
import Accessibility from './pages/Accessibility'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function scrollToHash(): boolean {
  if (typeof window === 'undefined') return false
  const id = decodeURIComponent(window.location.hash.slice(1))
  const el = id ? document.getElementById(id) : null
  if (!el) return false
  const l = getLenis()
  if (l) l.scrollTo(el, { offset: -96 })
  else el.scrollIntoView()
  return true
}

function Shell() {
  const [location] = useLocation()
  useSmoothScroll()
  // Route changes land at the top, or at the #hash target when the link
  // carries one (the "Reserve a Table" link points at /taproom#reserve).
  useEffect(() => {
    if (scrollToHash()) return
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location])
  // Same-page hash links do not change wouter's location, so listen for the
  // pushState wouter fires and the browser's own hashchange.
  useEffect(() => {
    const onNav = () => { scrollToHash() }
    window.addEventListener('pushState', onNav)
    window.addEventListener('hashchange', onNav)
    return () => {
      window.removeEventListener('pushState', onNav)
      window.removeEventListener('hashchange', onNav)
    }
  }, [])
  useScrollReveal(location)
  useParallax(location)
  return (
    <>
      <Seo path={location} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:text-gray-900">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/beer" component={Beer} />
          <Route path="/wine" component={Wine} />
          <Route path="/taproom" component={Taproom} />
          <Route path="/events" component={Events} />
          <Route path="/run-club" component={RunClub} />
          <Route path="/private-events" component={PrivateEvents} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/qrscan" component={QRScan} />
          <Route path="/contact" component={Contact} />
          <Route path="/accessibility" component={Accessibility} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <MobileActionBar />
      <AgeGate />
      <CookieBanner />
    </>
  )
}

function Root() {
  return <Shell />
}

export default function App({ ssrPath }: { readonly ssrPath?: string }) {
  return (
    <Router ssrPath={ssrPath}>
      <Root />
    </Router>
  )
}
