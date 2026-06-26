import { useEffect } from 'react'
import { Route, Switch, Router, useLocation } from 'wouter'
import Seo from './components/Seo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileActionBar from './components/MobileActionBar'
import AgeGate from './components/AgeGate'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useParallax } from './hooks/useParallax'
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll'
import Home from './pages/Home'
import Beer from './pages/Beer'
import Wine from './pages/Wine'
import Taproom from './pages/Taproom'
import Events from './pages/Events'
import RunClub from './pages/RunClub'
import WorldCup from './pages/WorldCup'
import PrivateEvents from './pages/PrivateEvents'
import Gallery from './pages/Gallery'
import QRScan from './pages/QRScan'
import Contact from './pages/Contact'
import Accessibility from './pages/Accessibility'
import NotFound from './pages/NotFound'

function Shell() {
  const [location] = useLocation()
  useSmoothScroll()
  useEffect(() => {
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location])
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
          <Route path="/world-cup" component={WorldCup} />
          <Route path="/private-events" component={PrivateEvents} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/qrscan" component={QRScan} />
          <Route path="/contact" component={Contact} />
          <Route path="/accessibility" component={Accessibility} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <MobileActionBar />
      <AgeGate />
    </>
  )
}

export default function App({ ssrPath }: { readonly ssrPath?: string }) {
  return (
    <Router ssrPath={ssrPath}>
      <Shell />
    </Router>
  )
}
