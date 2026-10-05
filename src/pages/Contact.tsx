import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '../sections/ContactForm'
import SectionTitle from '../components/SectionTitle'
import { SITE } from '../data/site'

export default function Contact() {
  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: SITE.location },
  ]
  return (
    <section className="section-y pt-36" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionTitle id="contact-title" eyebrow="Contact" title="Start with your requirement." subtitle="Tell us how your business works today. We will help you find the right first step." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <ul className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="glass flex items-center gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-glow/10 text-cyan-glow"><Icon size={20} aria-hidden /></span>
                <div><p className="text-sm text-slate-400">{label}</p>{href ? <a className="font-medium text-white hover:text-cyan-glow" href={href}>{value}</a> : <p className="font-medium text-white">{value}</p>}</div>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
