import { ABOUT_FOCUS } from '../data/features'
import { SITE } from '../data/site'
import SectionTitle from '../components/SectionTitle'
import FeatureGrid from './FeatureGrid'

export default function AboutSection({ id = 'about' }: { id?: string }) {
  return (
    <section id={id} className="section-y scroll-mt-16" aria-labelledby="about-title">
      <div className="container-x">
        <SectionTitle id="about-title" eyebrow={`About ${SITE.name}`} title="We build technology solutions around real business needs." subtitle="Every product starts with how your people actually work. We combine security, digital workflows and custom-built workspaces so technology supports the business, not the other way round." accent="#8b5cf6" />
        <div className="mt-14"><FeatureGrid features={ABOUT_FOCUS} accent="#8b5cf6" columns="sm:grid-cols-2 lg:grid-cols-3" /></div>
      </div>
    </section>
  )
}
