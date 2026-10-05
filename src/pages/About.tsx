import AboutSection from '../sections/AboutSection'
import CTASection from '../components/CTASection'
import { SITE } from '../data/site'

export default function About() {
  return (
    <>
      <div className="pt-24"><AboutSection id="about-main" /></div>
      <section className="pb-10">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <article id="privacy" className="glass scroll-mt-24 rounded-2xl p-7">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">Replace this placeholder with {SITE.name}&apos;s privacy policy. The contact form on this site does not send data anywhere until you connect a backend.</p>
          </article>
          <article id="terms" className="glass scroll-mt-24 rounded-2xl p-7">
            <h2 className="text-xl font-semibold">Terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">Replace this placeholder with your terms of use before publishing the site.</p>
          </article>
        </div>
      </section>
      <CTASection title="Let's talk about how your business works." cta="Contact Us" to="/contact" accent="#8b5cf6" />
    </>
  )
}
