import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from '../../components/SectionTitle'
import DashboardCard from '../../components/DashboardCard'
import Reveal from '../../components/Reveal'

type Severity = 'Critical' | 'High' | 'Medium' | 'Low'
type Remediation = 'Open' | 'In progress' | 'Fixed'
interface Row { asset: string; type: string; vulns: number; severity: Severity; risk: number; status: Remediation }

const ROWS: Row[] = [
  { asset: 'Web server 01', type: 'Server', vulns: 7, severity: 'Critical', risk: 92, status: 'In progress' },
  { asset: 'Customer portal', type: 'Application', vulns: 5, severity: 'High', risk: 78, status: 'Open' },
  { asset: 'Finance database', type: 'Database', vulns: 3, severity: 'High', risk: 71, status: 'In progress' },
  { asset: 'Office firewall', type: 'Network', vulns: 4, severity: 'Medium', risk: 52, status: 'Open' },
  { asset: 'HR laptop fleet', type: 'Endpoint', vulns: 9, severity: 'Medium', risk: 46, status: 'Fixed' },
  { asset: 'Guest Wi-Fi', type: 'Network', vulns: 2, severity: 'Low', risk: 21, status: 'Fixed' },
]
const COLORS: Record<Severity, string> = { Critical: '#f87171', High: '#fb923c', Medium: '#facc15', Low: '#4ade80' }
const STATUS_COLORS: Record<Remediation, string> = { Open: '#f87171', 'In progress': '#facc15', Fixed: '#4ade80' }
const FILTERS: ('All' | Severity)[] = ['All', 'Critical', 'High', 'Medium', 'Low']

export default function VulnAssessment() {
  const [filter, setFilter] = useState<'All' | Severity>('All')
  const rows = filter === 'All' ? ROWS : ROWS.filter((r) => r.severity === filter)

  return (
    <section id="assess" className="section-y scroll-mt-32" aria-labelledby="vuln-title">
      <div className="container-x">
        <SectionTitle id="vuln-title" eyebrow="Assess" title="Vulnerability Assessment" subtitle="Know which assets are exposed, how serious each weakness is and where fixes stand." />
        <div className="mt-12">
          <Reveal>
            <DashboardCard title="Vulnerability register" status="Last scan 2 hours ago" accent="#fb923c">
              <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by severity">
                {FILTERS.map((f) => (
                  <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${filter === f ? 'border-white/40 bg-white/15 text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}>
                    {f !== 'All' && <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: COLORS[f] }} />}{f}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <caption className="sr-only">Assets with vulnerabilities, severity, risk score and remediation status</caption>
                  <thead className="text-xs text-slate-500">
                    <tr><th scope="col" className="pb-3 font-medium">Asset</th><th scope="col" className="pb-3 font-medium">Vulnerabilities</th><th scope="col" className="pb-3 font-medium">Severity</th><th scope="col" className="w-48 pb-3 font-medium">Risk score</th><th scope="col" className="pb-3 font-medium">Remediation</th></tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false} mode="popLayout">
                      {rows.map((r) => (
                        <motion.tr key={r.asset} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-white/5">
                          <th scope="row" className="py-3.5 pr-4 font-medium text-white">{r.asset}<span className="block text-xs font-normal text-slate-500">{r.type}</span></th>
                          <td className="py-3.5 pr-4 text-slate-300">{r.vulns}</td>
                          <td className="py-3.5 pr-4"><span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium" style={{ color: COLORS[r.severity], background: `${COLORS[r.severity]}1a` }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS[r.severity] }} />{r.severity}</span></td>
                          <td className="py-3.5 pr-6">
                            <div className="flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full" style={{ background: COLORS[r.severity] }} initial={{ width: 0 }} animate={{ width: `${r.risk}%` }} transition={{ duration: 0.8 }} /></div><span className="w-7 text-xs text-slate-400">{r.risk}</span></div>
                          </td>
                          <td className="py-3.5"><span className="text-xs font-medium" style={{ color: STATUS_COLORS[r.status] }}>{r.status}</span></td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
