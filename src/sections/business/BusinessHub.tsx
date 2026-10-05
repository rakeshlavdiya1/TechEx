import { motion, useReducedMotion } from 'framer-motion'
import { DEPARTMENTS } from '../../data/departments'

interface BusinessHubProps {
  activeId: string
  onSelect: (id: string) => void
}

/** Central glowing workspace with every department connected around it. */
export default function BusinessHub({ activeId, onSelect }: BusinessHubProps) {
  const reduce = useReducedMotion()
  const count = DEPARTMENTS.length
  const nodes = DEPARTMENTS.map((d, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    return { d, x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 }
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeOpacity="0.15" strokeDasharray="0.6 1.4" />
        {nodes.map(({ d, x, y }, i) => (
          <g key={d.id}>
            <line x1="50" y1="50" x2={x} y2={y} stroke="#3b82f6" strokeOpacity="0.25" strokeWidth="0.4" />
            <motion.line x1="50" y1="50" x2={x} y2={y} stroke={activeId === d.id ? '#22d3ee' : '#60a5fa'} strokeWidth={activeId === d.id ? 0.9 : 0.5} strokeDasharray="1.5 2.5" className="animate-flow" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }} style={{ filter: 'drop-shadow(0 0 1.2px #3b82f6)' }} />
          </g>
        ))}
      </svg>

      <motion.div initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }} style={{ x: '-50%', y: '-50%' }} className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] place-items-center rounded-full border border-cyan-glow/60 bg-ink-800 text-center shadow-[0_0_60px_8px_rgba(59,130,246,0.5)]">
        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan-glow/60" aria-hidden />
        <span className="px-2 font-display text-[11px] font-semibold leading-tight text-white sm:text-sm">Business<br />One</span>
      </motion.div>

      {nodes.map(({ d, x, y }, i) => {
        const Icon = d.icon
        const active = activeId === d.id
        return (
          <motion.button
            key={d.id}
            type="button"
            onClick={() => onSelect(d.id)}
            aria-label={`${d.name} — ${d.title}`}
            aria-pressed={active}
            initial={reduce ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: active ? 1.12 : 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: `${x}%`, top: `${y}%`, x: '-50%', y: '-50%' }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl border bg-ink-800 transition-all sm:h-14 sm:w-14" style={{ borderColor: active ? '#22d3ee' : 'rgba(96,165,250,0.35)', color: active ? '#22d3ee' : '#93c5fd', boxShadow: active ? '0 0 26px -2px #22d3ee' : 'none' }}><Icon size={22} aria-hidden /></span>
            <span className={`hidden text-xs font-medium sm:block ${active ? 'text-white' : 'text-slate-400'}`}>{d.name}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
