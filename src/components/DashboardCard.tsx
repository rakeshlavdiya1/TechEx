import type { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  status?: string
  accent?: string
  children: ReactNode
  className?: string
}

/** Window-style panel used for dashboard mockups. */
export default function DashboardCard({ title, status, accent = '#22d3ee', children, className = '' }: DashboardCardProps) {
  return (
    <section aria-label={title} className={`glass overflow-hidden rounded-2xl ${className}`} style={{ boxShadow: `0 0 60px -30px ${accent}` }}>
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <h3 className="ml-2 font-sans text-sm font-medium text-slate-200">{title}</h3>
        </div>
        {status && (
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full" style={{ background: accent }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} /></span>
            {status}
          </span>
        )}
      </header>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  )
}
