import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronsDown } from 'lucide-react'
import AnimatedNetwork from '../components/AnimatedNetwork'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import BusinessHub from '../sections/business/BusinessHub'
import DepartmentSection from '../sections/business/DepartmentSection'
import EmailReduction from '../sections/business/EmailReduction'
import ApprovalFlow from '../sections/business/ApprovalFlow'

export default function BusinessOne() {
  const [activeId, setActiveId] = useState('hr')
  const reduce = useReducedMotion()

  const chooseFromHub = (id: string) => {
    setActiveId(id)
    document.getElementById('departments')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <section className="relative isolate overflow-hidden pb-16 pt-32 lg:min-h-[100svh]">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -left-20 top-1/4 h-96 w-96 animate-blob rounded-full bg-electric-500/25 blur-[110px]" />
          <AnimatedNetwork color="96,165,250" density={0.7} />
        </div>
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.h1 initial={reduce ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-semibold sm:text-7xl">Business One</motion.h1>
            <motion.p initial={reduce ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-5 font-display text-2xl leading-snug text-gradient sm:text-3xl">One Workspace. Every Department. One Connected Business.</motion.p>
            <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-lg text-lg text-slate-400">A single digital workspace connecting people, processes, approvals, information and daily business operations.</motion.p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button href="#departments" size="lg">Explore the departments</Button><Button to="/contact" variant="secondary" size="lg">Talk to us</Button></div>
          </div>
          <BusinessHub activeId={activeId} onSelect={chooseFromHub} />
        </div>
        <a href="#departments" aria-label="Scroll to departments" className="mx-auto mt-10 hidden w-fit flex-col items-center gap-1 text-xs text-slate-500 lg:flex"><span>Follow the path</span><ChevronsDown className="animate-bounce text-cyan-glow" size={22} aria-hidden /></a>
      </section>

      <DepartmentSection activeId={activeId} onChange={setActiveId} />
      <EmailReduction />
      <ApprovalFlow />
      <CTASection title="Bring every department into one workspace." text="Start with one team or connect them all — Business One grows with your business." cta="Let's Build Your Workspace" to="/contact" accent="#3b82f6" />
    </>
  )
}
