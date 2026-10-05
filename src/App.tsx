import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import { StoryTransitionProvider } from './components/ProductStoryTransition'
import Home from './pages/Home'

const CybersecurityOne = lazy(() => import('./pages/CybersecurityOne'))
const BusinessOne = lazy(() => import('./pages/BusinessOne'))
const SmartThinkCenter = lazy(() => import('./pages/SmartThinkCenter'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  return (
    <StoryTransitionProvider>
      <a href="#main" className="sr-only z-[200] rounded-full bg-cyan-glow px-4 py-2 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="min-h-screen">
        <Suspense fallback={<div className="grid min-h-screen place-items-center" role="status" aria-label="Loading"><span className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-glow/30 border-t-cyan-glow" /></div>}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/cybersecurity-one" element={<CybersecurityOne />} />
              <Route path="/business-one" element={<BusinessOne />} />
              <Route path="/smart-think-center" element={<SmartThinkCenter />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      <Footer />
    </StoryTransitionProvider>
  )
}
