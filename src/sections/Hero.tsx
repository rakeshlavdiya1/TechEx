import { motion, useReducedMotion } from 'framer-motion'
import { Layers, ShieldCheck, BrainCircuit } from 'lucide-react'
import AnimatedNetwork from '../components/AnimatedNetwork'
import Button from '../components/Button'

const orbitNodes = [
  { Icon: ShieldCheck, color: '#22d3ee', ring: 'inset-0', anim: 'animate-spin-mid', pos: 'left-1/2 top-0' },
  { Icon: Layers, color: '#3b82f6', ring: 'inset-[14%]', anim: 'animate-spin-rev', pos: 'left-1/2 top-0' },
  { Icon: BrainCircuit, color: '#8b5cf6', ring: 'inset-[28%]', anim: 'animate-spin-mid', pos: 'left-1/2 top-0' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const item = (delay: number) => reduce ? {} : ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } })

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-24 top-10 h-96 w-96 animate-blob rounded-full bg-electric-500/25 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] animate-blob rounded-full bg-cyan-glow/20 blur-[120px]" style={{ animationDelay: '-5s' }} />
        <div className="absolute left-1/3 top-1/2 h-72 w-72 animate-blob rounded-full bg-violet-glow/20 blur-[110px]" style={{ animationDelay: '-9s' }} />
        <AnimatedNetwork />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p {...item(0)} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_10px_#22d3ee]" />
            Security. Operations. Intelligent workspaces.
          </motion.p>
          <motion.h1 {...item(0.08)} className="text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Technology That Works <span className="text-gradient">Around Your Business</span>
          </motion.h1>
          <motion.p {...item(0.18)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            Cybersecurity, business operations and intelligent digital workspaces — designed as one connected experience.
          </motion.p>
          <motion.div {...item(0.28)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#solutions" size="lg">Explore Our Solutions</Button>
            <Button to="/smart-think-center" variant="secondary" size="lg">Build Your Smart Workspace</Button>
          </motion.div>
        </div>

        {/* Orbit visual: three products around one connected core */}
        <motion.div {...item(0.2)} aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[440px] lg:block">
          <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-cyan-glow to-electric-500 opacity-90 blur-xl" />
          <div className="absolute inset-[38%] grid place-items-center rounded-full border border-white/30 bg-ink-900/80">
            <svg viewBox="0 0 32 32" className="h-1/2 w-1/2"><path d="M8 9h16M16 9v15M8 24h6" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" /></svg>
          </div>
          {orbitNodes.map(({ Icon, color, ring, anim, pos }) => (
            <div key={color} className={`absolute ${ring} rounded-full border border-dashed ${anim}`} style={{ borderColor: `${color}55` }}>
              <div className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2`}>
                <div className={`${anim === 'animate-spin-mid' ? 'animate-spin-rev' : 'animate-spin-mid'}`}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border bg-ink-800" style={{ borderColor: color, color, boxShadow: `0 0 26px -2px ${color}` }}><Icon size={22} /></span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
