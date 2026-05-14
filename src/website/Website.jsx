import { GrainOverlay } from '../components/GrainOverlay'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Pillars from './sections/Pillars'
import AdaptiveLoop from './sections/AdaptiveLoop'
import Metrics from './sections/Metrics'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'

export default function Website() {
  return (
    <div className="relative w-screen h-screen overflow-y-auto bg-forest text-cream">
      <Nav />

      <main className="relative z-10 px-6">
        <Hero />
        <Pillars />
        <AdaptiveLoop />
        <Metrics />
        <Testimonials />
        <CTA />
        <Footer />
      </main>

      <GrainOverlay opacity={0.025} />
    </div>
  )
}
