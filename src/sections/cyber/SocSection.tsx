import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Activity, AlertTriangle, Radar, ShieldAlert } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import SectionTitle from '../../components/SectionTitle'
import Reveal from '../../components/Reveal'

interface SocEvent { id: number; text: string; source: string; level: 'Critical' | 'High' | 'Medium' | 'Low' }

const FEED: Omit<SocEvent, 'id'>[] = [
  { text: 'Multiple failed logins detected', source: 'Identity', level: 'High' },
  { text: 'Unusual outbound traffic blocked', source: 'Firewall', level: 'Medium' },
  { text: 'Malware signature quarantined', source: 'Endpoint', level: 'Critical' },
  { text: 'New device joined network', source: 'Network', level: 'Low' },
  { text: 'Privilege change flagged for review', source: 'Directory', level: 'Medium' },
  { text: 'Phishing link reported by user', source: 'Email', level: 'High' },
]
const LEVEL_COLOR = { Critical: '#f87171', High: '#fb923c', Medium: '#facc15', Low: '#4ade80' } as const
const BLIPS = [{ x: 30, y: 34 }, { x: 68, y: 26 }, { x: 58, y: 66 }, { x: 24, y: 70 }]

export default function SocSection() {
  const reduce = useReducedMotion()
  const [events, setEvents] = useState<SocEvent[]>(() => FEED.slice(0, 4).map((e, i) => ({ ...e, id: i })))
  const counter = useRef(4)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      const c = counter.current++
      const next = FEED[c % FEED.length]
      setEvents((list) => [{ ...next, id: c }, ...list].slice(0, 4))
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <section id="detect" className="section-y scroll-mt-32" aria-labelledby="soc-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionTitle id="soc-title" align="left" eyebrow="Detect" title="Security Operations Center" subtitle="Centralized security monitoring and incident visibility designed to help teams identify and respond to threats." />
          <Reveal delay={0.1}>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-slate-300">
              {[['Threat monitoring', Radar], ['Alerts', AlertTriangle], ['Incident overview', ShieldAlert], ['Security events', Activity]].map(([label, Icon]) => {
                const I = Icon as typeof Radar
                return <li key={label as string} className="glass flex items-center gap-2.5 rounded-xl px-3.5 py-3"><I size={16} className="text-cyan-glow" aria-hidden />{label as string}</li>
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal x={30}>
          <DashboardCard title="SOC · Live overview" status="All sensors online">
            <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
              {/* radar */}
              <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-full border border-cyan-glow/30 bg-ink-950/60" role="img" aria-label="Threat radar showing four detected signals">
                {[25, 50, 75].map((s) => <span key={s} className="absolute rounded-full border border-cyan-glow/20" style={{ inset: `${(100 - s) / 2}%` }} />)}
                <span className="absolute inset-x-0 top-1/2 h-px bg-cyan-glow/20" /><span className="absolute inset-y-0 left-1/2 w-px bg-cyan-glow/20" />
                <span className="absolute inset-0 animate-sweep rounded-full" style={{ background: 'conic-gradient(from 0deg, rgba(34,211,238,0.45), transparent 22%)' }} />
                {BLIPS.map((b, i) => (
                  <span key={i} className="absolute h-2.5 w-2.5" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red-400" style={{ animationDelay: `${i * 0.6}s` }} />
                    <span className="absolute inset-0 rounded-full bg-red-400" />
                  </span>
                ))}
              </div>
              {/* alerts */}
              <div>
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  {[['Open incidents', '6', '#fb923c'], ['Alerts today', '142', '#22d3ee'], ['Blocked', '1.9k', '#4ade80']].map(([l, v, c]) => (
                    <div key={l} className="rounded-lg bg-white/5 px-2 py-2.5"><p className="font-display text-xl font-semibold" style={{ color: c }}>{v}</p><p className="text-[11px] text-slate-400">{l}</p></div>
                  ))}
                </div>
                <ul className="relative h-[15.5rem] space-y-2 overflow-hidden" aria-live="polite" aria-label="Recent security events">
                  <AnimatePresence initial={false}>
                    {events.map((e) => (
                      <motion.li key={e.id} layout initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex h-14 items-center gap-3 rounded-lg bg-white/5 px-3">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: LEVEL_COLOR[e.level], boxShadow: `0 0 8px ${LEVEL_COLOR[e.level]}` }} />
                        <div className="min-w-0 flex-1"><p className="truncate text-sm text-slate-100">{e.text}</p><p className="text-xs text-slate-500">{e.source}</p></div>
                        <span className="shrink-0 text-xs font-medium" style={{ color: LEVEL_COLOR[e.level] }}>{e.level}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          </DashboardCard>
        </Reveal>
      </div>
    </section>
  )
}
