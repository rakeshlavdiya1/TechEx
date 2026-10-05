import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import AnimatedNetwork from '../components/AnimatedNetwork'
import FiberPath from '../components/FiberPath'
import StoryRail from '../components/StoryRail'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import SocSection from '../sections/cyber/SocSection'
import ItDashboard from '../sections/cyber/ItDashboard'
import VulnAssessment from '../sections/cyber/VulnAssessment'
import PenTesting from '../sections/cyber/PenTesting'
import SecurityControl from '../sections/cyber/SecurityControl'

const STEPS = [
  { id: 'entry', label: 'Entry' },
  { id: 'detect', label: 'Detect' },
  { id: 'monitor', label: 'Monitor' },
  { id: 'assess', label: 'Assess' },
  { id: 'test', label: 'Test' },
  { id: 'control', label: 'Control' },
]
const WORDS = ['See.', 'Detect.', 'Assess.', 'Respond.', 'Protect.']

export default function CybersecurityOne() {
  const reduce = useReducedMotion()
  return (
    <>
      <section id="entry" className="relative isolate flex min-h-[88svh] items-center overflow-hidden pb-16 pt-32">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-glow/15 blur-[120px]" />
          <AnimatedNetwork density={1.2} />
          <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyan-glow/10 to-transparent" />
        </div>
        <div className="container-x text-center">
          <motion.span initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="mx-auto mb-7 grid h-20 w-20 place-items-center rounded-3xl bg-cyan-glow/10 text-cyan-glow shadow-[0_0_60px_-6px_#22d3ee]"><ShieldCheck size={40} aria-hidden /></motion.span>
          <h1 className="text-5xl font-semibold sm:text-7xl">Cybersecurity One</h1>
          <p className="mt-6 flex flex-wrap justify-center gap-x-3 text-xl text-slate-300 sm:text-3xl" aria-label="See. Detect. Assess. Respond. Protect.">
            {WORDS.map((w, i) => (
              <motion.span key={w} aria-hidden initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.18 }} className={i === 4 ? 'text-cyan-glow' : ''}>{w}</motion.span>
            ))}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Step into your Security Operations Center: monitoring, assessment, testing and response, connected by one line of sight.</p>
          <div className="mt-9 flex justify-center"><Button href="#detect" size="lg">Follow the signal</Button></div>
        </div>
      </section>

      <StoryRail steps={STEPS} accent="#22d3ee" />

      <FiberPath color="#22d3ee">
        <SocSection />
        <ItDashboard />
        <VulnAssessment />
        <PenTesting />
        <SecurityControl />
      </FiberPath>

      <CTASection title="Secure Your Digital Workspace" text="Talk to us about monitoring, assessment and response for your environment." cta="Secure Your Digital Workspace" to="/contact" accent="#22d3ee" />
    </>
  )
}
