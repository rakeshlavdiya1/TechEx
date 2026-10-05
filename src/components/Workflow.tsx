import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface WorkflowStep {
  label: string
  icon: LucideIcon
  detail?: string
}

interface WorkflowProps {
  steps: WorkflowStep[]
  accent?: string
  /** Steps are clickable and show their `detail`. Auto-play stops once the user interacts. */
  interactive?: boolean
  intervalMs?: number
}

/** Animated horizontal (desktop) / vertical (mobile) process flow. */
export default function Workflow({ steps, accent = '#3b82f6', interactive = false, intervalMs = 2200 }: WorkflowProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (manual || reduce) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % steps.length), intervalMs)
    return () => window.clearInterval(id)
  }, [manual, reduce, steps.length, intervalMs])

  const select = (i: number) => { setManual(true); setActive(i) }
  const current = steps[active]

  return (
    <div>
      <ol className="grid gap-3 md:grid-cols-[repeat(var(--n),minmax(0,1fr))] md:gap-0" style={{ ['--n' as string]: steps.length }}>
        {steps.map((step, i) => {
          const Icon = step.icon
          const isActive = i === active
          const isDone = i < active
          const body = (
            <>
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500" style={{ borderColor: isActive || isDone ? accent : 'rgba(148,163,184,0.2)', background: isActive ? `${accent}26` : 'rgba(255,255,255,0.03)', color: isActive || isDone ? '#fff' : '#94a3b8', boxShadow: isActive ? `0 0 28px -4px ${accent}` : 'none' }}>
                <Icon size={24} aria-hidden />
                {isActive && <span className="absolute inset-0 animate-pulse-ring rounded-2xl border" style={{ borderColor: accent }} aria-hidden />}
              </span>
              <span className={`text-sm font-medium transition-colors md:mt-3 md:text-center ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.label}</span>
            </>
          )
          return (
            <li key={step.label} className="relative flex items-center gap-4 md:flex-col md:gap-0">
              {i < steps.length - 1 && (
                <>
                  <span aria-hidden className="absolute left-7 top-14 h-[calc(100%-2rem)] w-px md:hidden" style={{ background: i < active ? accent : 'rgba(148,163,184,0.2)' }} />
                  <span aria-hidden className="absolute left-[calc(50%+2.25rem)] right-[calc(-50%+2.25rem)] top-7 hidden h-px md:block" style={{ background: 'rgba(148,163,184,0.2)' }}>
                    <motion.span className="absolute inset-y-0 left-0 block" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} animate={{ width: i < active ? '100%' : '0%' }} transition={{ duration: 0.5 }} />
                  </span>
                </>
              )}
              {interactive ? (
                <button type="button" onClick={() => select(i)} aria-pressed={isActive} className="flex items-center gap-4 rounded-2xl text-left md:flex-col md:gap-0">{body}</button>
              ) : (
                <div className="flex items-center gap-4 md:flex-col md:gap-0">{body}</div>
              )}
            </li>
          )
        })}
      </ol>
      {interactive && current.detail && (
        <div className="glass mt-8 rounded-2xl p-5 sm:p-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <p className="text-sm font-medium" style={{ color: accent }}>Step {active + 1} of {steps.length}</p>
              <h4 className="mt-1 text-xl font-semibold">{current.label}</h4>
              <p className="mt-2 max-w-2xl text-slate-400">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
