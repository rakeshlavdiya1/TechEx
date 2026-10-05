import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import Reveal from '../components/Reveal'

export default function ProductShowcase() {
  return (
    <section id="solutions" className="section-y scroll-mt-16" aria-labelledby="solutions-title">
      <div className="container-x">
        <SectionTitle id="solutions-title" eyebrow="Choose your starting point" title="Three products. One connected experience." subtitle="Select a product to step into its story — from security operations to department workspaces to custom-built solutions." />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.1} className="h-full"><ProductCard product={product} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
