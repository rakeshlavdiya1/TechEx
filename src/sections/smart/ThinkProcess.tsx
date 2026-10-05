import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Hammer, Lightbulb, Link2, PencilRuler, RefreshCw, Search } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'

const STEPS = [
  { n: '01', title: 'Understand', text: 'We understand the business problem.', icon: Lightbulb },
  { n: '02', title: 'Discover', text: 'We study the existing process, people and challenges.', icon: Search },
  { n: '03', title: 'Design', text: 'We design the ideal user experience and workflow.', icon: PencilRuler },
  { n: '04', title: 'Build', text: 'We create the digital workspace.', icon: Hammer },
  { n: '05', title: 'Connect', text: 'We connect the relevant business functions.', icon: Link2 },
  { n: '06', title: 'Improve', text: 'We continuously improve the workspace based on business needs.', icon: RefreshCw },
]

export default function ThinkProcess() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="process" className="section-y scroll-mt-20" aria-labelledby="process-title">
      <div className="container-x">
        <SectionTitle id="process-title" eyebrow="How we work" title="From problem to working workspace in six steps" accent="#8b5cf6" />
        <ol ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          <div aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-white/10 md:left-1/2">
            <motion.div className="h-full w-px origin-top bg-violet-glow shadow-[0_0_14px_2px_#8b5cf6]" style={{ scaleY: reduce ? 1 : scaleY }} />
          </div>
          {STEPS.map(({ n, title, text, icon: Icon }, i) => {
            const left = i % 2 === 0
            return (
              <li key={n} className="relative pb-12 pl-16 last:pb-0 md:pl-0">
                <motion.div
                  initial={reduce ? false : { opacity: 0.25, x: left ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: '-30% 0px -30% 0px' }}
                  transition={{ duration: 0.5 }}
                  className={`md:w-1/2 ${left ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'}`}
                >
                  <div className="glass rounded-2xl p-6 transition-colors hover:border-violet-glow/60">
                    <div className={`flex items-center gap-3 ${left ? 'md:flex-row-reverse' : ''}`}>
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-glow/15 text-violet-300"><Icon size={22} aria-hidden /></span>
                      <span className="font-display text-sm text-violet-300">{n}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 text-slate-400">{text}</p>
                  </div>
                </motion.div>
                <span aria-hidden className="absolute left-6 top-8 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-violet-glow bg-ink-900 shadow-[0_0_12px_#8b5cf6] md:left-1/2" />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
