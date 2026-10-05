import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Check } from 'lucide-react'
import { DEPARTMENTS } from '../../data/departments'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import SectionTitle from '../../components/SectionTitle'

interface DepartmentSectionProps {
  activeId: string
  onChange: (id: string) => void
}

/**
 * Desktop: the panel is pinned while scrolling, and each department activates in turn.
 * Mobile/tablet: content stacks vertically and departments are chosen with tabs.
 */
export default function DepartmentSection({ activeId, onChange }: DepartmentSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const count = DEPARTMENTS.length
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const [lastScrollIndex, setLastScrollIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!isDesktop) return
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    if (idx !== lastScrollIndex) {
      setLastScrollIndex(idx)
      onChange(DEPARTMENTS[idx].id)
    }
  })

  const activeIndex = Math.max(0, DEPARTMENTS.findIndex((d) => d.id === activeId))
  const dept = DEPARTMENTS[activeIndex]
  const Icon = dept.icon

  const select = (i: number) => {
    onChange(DEPARTMENTS[i].id)
    setLastScrollIndex(i)
    if (isDesktop && wrapRef.current) {
      const top = wrapRef.current.getBoundingClientRect().top + window.scrollY
      const travel = wrapRef.current.offsetHeight - window.innerHeight
      window.scrollTo({ top: top + ((i + 0.5) / count) * travel, behavior: 'smooth' })
    }
  }

  return (
    <section id="departments" className="scroll-mt-20" aria-labelledby="dept-title">
      <div className="container-x pt-20 sm:pt-28">
        <SectionTitle id="dept-title" eyebrow="Every department" title="Each team gets a workspace of its own" subtitle="Scroll to move through the departments, or choose one directly." accent="#3b82f6" />
      </div>

      <div ref={wrapRef} style={isDesktop ? { height: `${count * 60}vh` } : undefined} className="relative">
        <div className="flex flex-col justify-center py-10 lg:sticky lg:top-0 lg:h-screen lg:justify-start lg:py-0 lg:pt-28">
          <div className="container-x">
            {/* Selector */}
            <div role="tablist" aria-label="Departments" className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1 lg:mb-10 lg:flex-wrap lg:justify-center lg:overflow-visible">
              {DEPARTMENTS.map((d, i) => {
                const TabIcon = d.icon
                const on = i === activeIndex
                return (
                  <button key={d.id} role="tab" id={`tab-${d.id}`} aria-selected={on} aria-controls="dept-panel" type="button" onClick={() => select(i)} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${on ? 'border-cyan-glow bg-cyan-glow/10 text-white shadow-[0_0_20px_-6px_#22d3ee]' : 'border-white/10 text-slate-400 hover:text-white'}`}>
                    <TabIcon size={15} aria-hidden />{d.name}
                  </button>
                )
              })}
            </div>

            <div id="dept-panel" role="tabpanel" aria-labelledby={`tab-${dept.id}`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* LEFT: icon + animated visual */}
              <AnimatePresence mode="wait">
                <motion.div key={`v-${dept.id}`} initial={{ opacity: 0, x: -30, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
                  <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
                  <div className="relative flex flex-col items-center text-center">
                    <span className="relative grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br from-electric-500/30 to-cyan-glow/20 text-cyan-glow shadow-[0_0_70px_-8px_#3b82f6] sm:h-36 sm:w-36">
                      <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-[2rem] border border-cyan-glow/50" />
                      <Icon size={60} aria-hidden />
                    </span>
                    <div className="mt-8 grid w-full grid-cols-3 gap-3">
                      {dept.metrics.map((m, i) => (
                        <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="rounded-xl bg-white/5 px-2 py-3">
                          <p className="font-display text-xl font-semibold text-white sm:text-2xl">{m.value}</p>
                          <p className="mt-0.5 text-[11px] leading-tight text-slate-400">{m.label}</p>
                        </motion.div>
                      ))}
                    </div>
                    {dept.addons && (
                      <ul className="mt-6 flex flex-wrap justify-center gap-2">
                        {dept.addons.map((a, i) => <motion.li key={a} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.06 }} className="rounded-full border border-dashed border-cyan-glow/50 px-3 py-1 text-xs text-cyan-100">+ {a}</motion.li>)}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* RIGHT: name + description */}
              <AnimatePresence mode="wait">
                <motion.div key={`c-${dept.id}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.35 }}>
                  <p className="text-sm font-medium text-electric-400">{dept.name}</p>
                  <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">{dept.title}</h3>
                  <p className="mt-4 max-w-lg text-lg text-slate-400">{dept.description}</p>
                  <ul className="mt-6 space-y-3">
                    {dept.features.map((f) => <li key={f} className="flex items-start gap-3 text-slate-200"><Check size={18} className="mt-0.5 shrink-0 text-cyan-glow" aria-hidden />{f}</li>)}
                  </ul>
                  <p className="mt-8 border-l-2 border-cyan-glow bg-gradient-to-r from-cyan-glow/10 to-transparent py-3 pl-5 font-display text-lg font-medium text-white">{dept.highlight}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
