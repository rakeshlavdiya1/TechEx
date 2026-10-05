import { BUSINESS_FEATURES, CYBER_FEATURES } from '../data/features'
import SectionTitle from '../components/SectionTitle'
import FeatureGrid from './FeatureGrid'

export default function WhyConnected() {
  return (
    <section className="section-y" aria-labelledby="why-title">
      <div className="container-x">
        <SectionTitle id="why-title" eyebrow="Why one workspace" title="Why Businesses Need One Connected Workspace" subtitle="When requests, records and approvals live in different places, work slows down. A connected workspace brings them back together." accent="#3b82f6" />
        <div className="mt-14"><FeatureGrid features={BUSINESS_FEATURES} accent="#3b82f6" /></div>
        <div className="mt-20">
          <SectionTitle title="And security that keeps pace" subtitle="Protection works best when it is part of the same picture as your operations." accent="#22d3ee" />
          <div className="mt-10"><FeatureGrid features={CYBER_FEATURES} accent="#22d3ee" /></div>
        </div>
      </div>
    </section>
  )
}
