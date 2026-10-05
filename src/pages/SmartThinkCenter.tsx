import { motion, useReducedMotion } from 'framer-motion'
import AnimatedNetwork from '../components/AnimatedNetwork'
import Button from '../components/Button'
import CTASection from '../components/CTASection'
import StoryRail from '../components/StoryRail'
import ProblemConverge from '../sections/smart/ProblemConverge'
import ThinkProcess from '../sections/smart/ThinkProcess'
import LiveWorkspace from '../sections/smart/LiveWorkspace'

const STEPS = [
  { id: 'intro', label: 'Problem' },
  { id: 'process', label: 'Process' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'talk', label: 'Talk to us' },
]

export default function SmartThinkCenter() {
  const reduce = useReducedMotion()
  return (
    <>
      <section id="intro" className="relative isolate overflow-hidden pb-20 pt-32 lg:min-h-[92svh] lg:pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute right-0 top-1/4 h-96 w-96 animate-blob rounded-full bg-violet-glow/25 blur-[120px]" />
          <AnimatedNetwork color="167,139,250" density={0.7} />
        </div>
        <div className="container-x grid items-center gap-16 lg:min-h-[70svh] lg:grid-cols-2">
          <div>
            <motion.h1 initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-semibold sm:text-7xl">Smart Think Center</motion.h1>
            <motion.p initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 font-display text-2xl leading-snug text-gradient sm:text-3xl">You Bring the Problem. We Build the Workspace.</motion.p>
            <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-lg text-lg text-slate-400">We understand your business problem, map the process and create a practical digital workspace designed around the way your business actually works.</motion.p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button to="/contact" size="lg">Start With Your Problem</Button><Button href="#process" variant="secondary" size="lg">See how we work</Button></div>
          </div>
          <ProblemConverge />
        </div>
      </section>

      <StoryRail steps={STEPS} accent="#8b5cf6" />
      <ThinkProcess />
      <LiveWorkspace />

      <div id="talk">
        <CTASection title="What problem are you trying to solve?" text="Tell us how your business works today. We'll help turn the problem into a practical digital workspace." cta="Talk to Us" to="/contact" accent="#8b5cf6" />
      </div>
    </>
  )
}
