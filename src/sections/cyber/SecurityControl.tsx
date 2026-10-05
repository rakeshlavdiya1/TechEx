import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Lock, RefreshCw, ScanSearch, ShieldAlert, Siren } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import DashboardCard from '../../components/DashboardCard'
import { Donut, ProgressBar, Sparkline } from '../../components/Charts'
import Reveal from '../../components/Reveal'

const INCIDENTS = [
  { id: 'INC-2041', title: 'Suspicious login from new region', status: 'Investigating', color: '#fb923c' },
  { id: 'INC-2039', title: 'Endpoint malware contained', status: 'Contained', color: '#facc15' },
  { id: 'INC-2036', title: 'Phishing campaign blocked', status: 'Resolved', color: '#4ade80' },
]
const ACTIONS = [
  { label: 'Isolate device', icon: ShieldAlert },
  { label: 'Reset credentials', icon: Lock },
  { label: 'Run vulnerability scan', icon: ScanSearch },
  { label: 'Escalate incident', icon: Siren },
]

export default function SecurityControl() {
  const [toast, setToast] = useState<string | null>(null)
  const trigger = (label: string) => { setToast(`${label} queued`); window.setTimeout(() => setToast(null), 2200) }

  return (
    <section id="control" className="section-y scroll-mt-32" aria-labelledby="ctrl-title">
      <div className="container-x">
        <SectionTitle id="ctrl-title" eyebrow="Control" title="Security Operation Control" subtitle="Incidents, response, compliance and activity in a single control center." />
        <Reveal className="mt-12">
          <DashboardCard title="Control center" status="Monitoring" accent="#22d3ee">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl bg-white/5 p-4">
                <h4 className="mb-3 font-sans text-sm font-semibold text-slate-200">Incidents</h4>
                <ul className="space-y-2.5">
                  {INCIDENTS.map((i) => (
                    <li key={i.id} className="rounded-lg bg-ink-900/60 p-3"><div className="flex justify-between text-xs"><span className="text-slate-500">{i.id}</span><span style={{ color: i.color }}>{i.status}</span></div><p className="mt-1 text-sm text-slate-100">{i.title}</p></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <h4 className="mb-3 font-sans text-sm font-semibold text-slate-200">Response status</h4>
                <div className="flex items-center gap-5"><Donut value={78} color="#22d3ee" label="Resolved" size={112} />
                  <ul className="space-y-1.5 text-sm text-slate-300"><li>Open <b className="text-white">6</b></li><li>Contained <b className="text-white">4</b></li><li>Resolved <b className="text-white">21</b></li></ul></div>
                <p className="mt-4 text-xs text-slate-500">Active alerts: 14 · Mean time to respond: 18 min</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <h4 className="mb-3 font-sans text-sm font-semibold text-slate-200">Compliance</h4>
                <div className="space-y-3.5"><ProgressBar value={94} label="Policy compliance" color="#4ade80" /><ProgressBar value={86} label="Patch compliance" color="#22d3ee" /><ProgressBar value={72} label="Access reviews" color="#facc15" /></div>
              </div>
              <div className="rounded-xl bg-white/5 p-4 lg:col-span-2">
                <h4 className="mb-2 font-sans text-sm font-semibold text-slate-200">Security activity</h4>
                <Sparkline data={[20, 34, 28, 46, 40, 58, 44, 62, 50, 41, 36, 30]} color="#8b5cf6" height={80} />
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <h4 className="mb-3 font-sans text-sm font-semibold text-slate-200">Action center</h4>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIONS.map(({ label, icon: Icon }) => (
                    <button key={label} type="button" onClick={() => trigger(label)} className="flex flex-col items-start gap-2 rounded-lg border border-white/10 bg-ink-900/60 p-3 text-left text-sm text-slate-200 transition hover:border-cyan-glow/60 hover:text-white active:scale-95"><Icon size={17} className="text-cyan-glow" aria-hidden />{label}</button>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </Reveal>
        <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <AnimatePresence>
            {toast && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="glass flex items-center gap-2 rounded-full bg-ink-800/90 px-5 py-3 text-sm text-white"><CheckCircle2 size={16} className="text-emerald-300" aria-hidden />{toast}<RefreshCw size={14} className="animate-spin text-slate-400" aria-hidden /></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
