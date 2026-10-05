import Hero from '../sections/Hero'
import ProductShowcase from '../sections/ProductShowcase'
import SplitBanner from '../sections/SplitBanner'
import WhyConnected from '../sections/WhyConnected'
import AboutSection from '../sections/AboutSection'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <SplitBanner />
      <WhyConnected />
      <AboutSection />
      <CTASection title="Ready to build a workspace that fits your business?" text="Tell us where you are today and we will show you where to start." cta="Let's Build Your Workspace" to="/contact" />
    </>
  )
}
