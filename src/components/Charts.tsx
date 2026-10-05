import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/** Animated line/area chart. `data` values are plotted evenly across the width. */
export function Sparkline({ data, color = '#22d3ee', height = 90 }: { data: number[]; color?: string; height?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data.map((v, i) => [(i / (data.length - 1)) * 300, 8 + (1 - (v - min) / (max - min || 1)) * (height - 16)])
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L300 ${height} L0 ${height} Z`
  const id = `spark-${color.replace('#', '')}`
  return (
    <svg ref={ref} viewBox={`0 0 300 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} role="img" aria-label="Trend chart">
      <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <motion.path d={area} fill={`url(#${id})`} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }} />
      <motion.path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 1.4, ease: 'easeOut' }} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
    </svg>
  )
}

/** Animated vertical bar chart. */
export function BarChart({ data, color = '#3b82f6', height = 120 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div ref={ref} className="flex items-end gap-2 sm:gap-3" style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <motion.div className="w-full rounded-t-md" style={{ background: `linear-gradient(to top, ${color}55, ${color})` }} initial={{ height: 0 }} animate={inView ? { height: `${(d.value / max) * 100}%` } : {}} transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }} />
          <span className="text-[10px] text-slate-500 sm:text-xs">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

/** Animated ring gauge (0–100). */
export function Donut({ value, color = '#22d3ee', size = 120, label }: { value: number; color?: string; size?: number; label?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const r = 44
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg ref={ref} viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`${label ?? 'Score'} ${value} percent`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c * (1 - value / 100) } : {}} transition={{ duration: 1.4, ease: 'easeOut' }} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><p className="font-display text-2xl font-semibold text-white">{value}</p>{label && <p className="text-[11px] text-slate-400">{label}</p>}</div>
      </div>
    </div>
  )
}

/** Horizontal progress bar. */
export function ProgressBar({ value, color = '#22d3ee', label }: { value: number; color?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex justify-between text-xs"><span className="text-slate-300">{label}</span><span className="text-slate-400">{value}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <motion.div className="h-full rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} initial={{ width: 0 }} animate={inView ? { width: `${value}%` } : {}} transition={{ duration: 1.1, ease: 'easeOut' }} />
      </div>
    </div>
  )
}
