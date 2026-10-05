import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import GlowCard from './GlowCard'

interface MetricCardProps {
  label: string
  value: number
  suffix?: string
  decimals?: number
  icon: LucideIcon
  color?: string
  hint?: string
}

export default function MetricCard({ label, value, suffix = '', decimals = 0, icon: Icon, color = '#22d3ee', hint }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, inView)
  return (
    <div ref={ref}>
      <GlowCard accent={color} className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate-400">{label}</p>
          <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `${color}1f`, color }}><Icon size={18} aria-hidden /></span>
        </div>
        <p className="mt-3 font-display text-3xl font-semibold text-white tabular-nums">
          {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
        </p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      </GlowCard>
    </div>
  )
}
