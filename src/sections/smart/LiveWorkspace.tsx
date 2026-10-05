import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCircle2, ClipboardCheck, Clock, FileText, GitBranch, LayoutDashboard, ListChecks, Search, Users, XCircle } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import MetricCard from '../../components/MetricCard'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'
import { ProgressBar } from '../../components/Charts'

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Tasks', icon: ListChecks },
  { label: 'Requests', icon: FileText },
  { label: 'Approvals', icon: ClipboardCheck },
  { label: 'Teams', icon: Users },
]
const INITIAL_TASKS = [
  { id: 1, text: 'Review onboarding checklist', owner: 'HR', done: true },
  { id: 2, text: 'Approve vendor payment batch', owner: 'Accounts', done: false },
  { id: 3, text: 'Update weekly sales pipeline', owner: 'Sales', done: false },
  { id: 4, text: 'Close resolved support tickets', owner: 'Care', done: false },
]
const INITIAL_APPROVALS = [
  { id: 1, title: 'Laptop request · Design team', by: 'Priya S.' },
  { id: 2, title: 'Leave request · 3 days', by: 'Marco D.' },
  { id: 3, title: 'Purchase order · Office supplies', by: 'Lena K.' },
]
const STAGES = ['Submitted', 'In review', 'Approved', 'Done']

export default function LiveWorkspace() {
  const [view, setView] = useState('Dashboard')
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS)
  const [decided, setDecided] = useState<string | null>(null)

  const decide = (id: number, verdict: 'Approved' | 'Rejected') => {
    const item = approvals.find((a) => a.id === id)
    setApprovals((list) => list.filter((a) => a.id !== id))
    setDecided(`${verdict}: ${item?.title}`)
  }

  return (
    <section id="workspace" className="section-y scroll-mt-20" aria-labelledby="live-title">
      <div className="container-x">
        <SectionTitle id="live-title" eyebrow="A workspace in action" title="This is what your workspace could look like" subtitle="A sample workspace built around one business. Tick a task or decide an approval — it works." accent="#8b5cf6" />
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-800/80 shadow-[0_0_100px_-40px_#8b5cf6]">
            <div className="grid md:grid-cols-[13rem_1fr]">
              {/* sidebar */}
              <aside className="hidden border-r border-white/10 bg-ink-950/60 p-4 md:block" aria-label="Sample workspace navigation">
                <p className="mb-5 flex items-center gap-2 px-2 font-display font-semibold text-white"><span className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-glow to-electric-500" />Workspace</p>
                <ul className="space-y-1">
                  {NAV.map(({ label, icon: Icon }) => (
                    <li key={label}><button type="button" onClick={() => setView(label)} aria-current={view === label ? 'page' : undefined} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${view === label ? 'bg-violet-glow/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon size={16} aria-hidden />{label}</button></li>
                  ))}
                </ul>
              </aside>

              <div className="min-w-0 p-4 sm:p-6">
                {/* topbar */}
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div><h3 className="font-sans text-lg font-semibold text-white">Good morning, Alex</h3><p className="text-xs text-slate-500">Operations overview · {view}</p></div>
                  <div className="flex items-center gap-3">
                    <label className="relative hidden sm:block"><span className="sr-only">Search the sample workspace</span><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden /><input placeholder="Search" className="w-44 rounded-lg border border-white/10 bg-ink-900/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-glow focus:outline-none" /></label>
                    <button type="button" aria-label="3 new notifications" className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300"><Bell size={16} aria-hidden /><span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-violet-glow text-[10px] font-semibold text-white">3</span></button>
                    <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-glow to-violet-glow text-xs font-semibold text-ink-950">AX</span>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  <MetricCard label="Open tasks" value={38} icon={ListChecks} color="#8b5cf6" hint="12 due today" />
                  <MetricCard label="Requests" value={126} icon={FileText} color="#3b82f6" hint="+9% this week" />
                  <MetricCard label="Pending approvals" value={approvals.length} icon={ClipboardCheck} color="#facc15" hint="Awaiting decision" />
                  <MetricCard label="On-time rate" value={94} suffix="%" icon={Clock} color="#4ade80" hint="Across teams" />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {/* Tasks */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h4 className="mb-3 font-sans text-sm font-semibold text-white">My tasks</h4>
                    <ul className="space-y-2">
                      {tasks.map((t) => (
                        <li key={t.id}>
                          <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-ink-900/50 px-3 py-2.5 text-sm">
                            <input type="checkbox" checked={t.done} onChange={() => setTasks((l) => l.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} className="h-4 w-4 accent-violet-500" />
                            <span className={`flex-1 ${t.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.text}</span>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">{t.owner}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Approvals */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h4 className="mb-3 font-sans text-sm font-semibold text-white">Approvals</h4>
                    <ul className="space-y-2" aria-live="polite">
                      <AnimatePresence initial={false}>
                        {approvals.map((a) => (
                          <motion.li key={a.id} layout exit={{ opacity: 0, x: 40 }} className="flex items-center gap-3 rounded-lg bg-ink-900/50 px-3 py-2.5">
                            <div className="min-w-0 flex-1"><p className="truncate text-sm text-slate-100">{a.title}</p><p className="text-xs text-slate-500">from {a.by}</p></div>
                            <button type="button" onClick={() => decide(a.id, 'Approved')} aria-label={`Approve ${a.title}`} className="text-emerald-300 hover:text-emerald-200"><CheckCircle2 size={22} /></button>
                            <button type="button" onClick={() => decide(a.id, 'Rejected')} aria-label={`Reject ${a.title}`} className="text-red-300 hover:text-red-200"><XCircle size={22} /></button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                    {approvals.length === 0 && <p className="rounded-lg bg-ink-900/50 px-3 py-4 text-center text-sm text-slate-400">All caught up. No approvals waiting.</p>}
                    {decided && <p role="status" className="mt-3 text-xs text-slate-400">{decided}</p>}
                  </div>

                  {/* Department status */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h4 className="mb-3 font-sans text-sm font-semibold text-white">Department status</h4>
                    <div className="space-y-3"><ProgressBar label="HR" value={92} color="#8b5cf6" /><ProgressBar label="Accounts" value={78} color="#3b82f6" /><ProgressBar label="Sales" value={85} color="#22d3ee" /><ProgressBar label="Customer Care" value={96} color="#4ade80" /></div>
                  </div>

                  {/* Workflow + activity */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h4 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold text-white"><GitBranch size={15} aria-hidden />Workflow status · Purchase order</h4>
                    <ol className="mb-4 flex items-center">
                      {STAGES.map((s, i) => (
                        <li key={s} className="flex flex-1 items-center last:flex-none">
                          <span className="flex flex-col items-center gap-1"><span className={`h-3 w-3 rounded-full ${i <= 2 ? 'bg-violet-glow shadow-[0_0_10px_#8b5cf6]' : 'bg-white/15'}`} /><span className="text-[10px] text-slate-400">{s}</span></span>
                          {i < STAGES.length - 1 && <span className={`mx-1 mb-4 h-px flex-1 ${i < 2 ? 'bg-violet-glow' : 'bg-white/15'}`} />}
                        </li>
                      ))}
                    </ol>
                    <h4 className="mb-2 font-sans text-sm font-semibold text-white">Recent activity</h4>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      <li>• Marco approved a leave request · 5 min ago</li>
                      <li>• Priya added a laptop request · 22 min ago</li>
                      <li>• Payment batch #41 sent for review · 1 h ago</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center"><Button to="/contact" size="lg">Start With Your Problem</Button></div>
      </div>
    </section>
  )
}
