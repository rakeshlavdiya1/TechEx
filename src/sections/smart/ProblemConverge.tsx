import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const CHIPS = [
  { label: 'Email threads', scatter: { x: -110, y: -90, r: -8 } },
  { label: 'Spreadsheets', scatter: { x: 100, y: -70, r: 6 } },
  { label: 'Paper forms', scatter: { x: -120, y: 10, r: 5 } },
  { label: 'Manual approvals', scatter: { x: 110, y: 30, r: -6 } },
  { label: 'Chasing status', scatter: { x: -70, y: 100, r: 9 } },
  { label: 'Lost files', scatter: { x: 80, y: 105, r: -9 } },
]
const ORDER = [{ x: -62, y: -62 }, { x: 62, y: -62 }, { x: -62, y: 0 }, { x: 62, y: 0 }, { x: -62, y: 62 }, { x: 62, y: 62 }]

/** Loops: scattered business problems → ordered workspace. */
export default function ProblemConverge() {
  const reduce = useReducedMotion()
  const [ordered, setOrdered] = useState(false)

  useEffect(() => {
    if (reduce) { setOrdered(true); return }
    const id = window.setInterval(() => setOrdered((o) => !o), 3400)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-md" role="img" aria-label="Animation: scattered problems like email threads and spreadsheets become one organised workspace">
      <motion.div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-3xl border" animate={{ borderColor: ordered ? 'rgba(139,92,246,0.7)' : 'rgba(139,92,246,0)', boxShadow: ordered ? '0 0 60px -10px rgba(139,92,246,0.7)' : '0 0 0 0 rgba(139,92,246,0)', opacity: ordered ? 1 : 0.4 }} transition={{ duration: 0.8 }} />
      {CHIPS.map((c, i) => (
        <motion.span
          key={c.label}
          className="absolute left-1/2 top-1/2 -ml-[52px] -mt-[18px] flex h-9 w-[104px] items-center justify-center rounded-lg border px-1 text-center text-[11px] font-medium leading-tight"
          animate={ordered ? { x: ORDER[i].x, y: ORDER[i].y, rotate: 0, backgroundColor: 'rgba(139,92,246,0.22)', borderColor: 'rgba(167,139,250,0.7)', color: '#ede9fe' } : { x: c.scatter.x, y: c.scatter.y, rotate: c.scatter.r, backgroundColor: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.4)', color: '#fecaca' }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.05 }}
        >
          {c.label}
        </motion.span>
      ))}
      <p className="absolute inset-x-0 -bottom-2 text-center text-sm text-slate-400">{ordered ? 'One workspace, built around the process' : 'The problem, as it looks today'}</p>
    </div>
  )
}
