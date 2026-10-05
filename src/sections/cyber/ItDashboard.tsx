import { Activity, AlertTriangle, Bug, Laptop, ShieldCheck, Wifi } from 'lucide-react'
import MetricCard from '../../components/MetricCard'
import DashboardCard from '../../components/DashboardCard'
import { BarChart, Donut, Sparkline } from '../../components/Charts'
import SectionTitle from '../../components/SectionTitle'
import Reveal from '../../components/Reveal'

export default function ItDashboard() {
  return (
    <section id="monitor" className="section-y scroll-mt-32" aria-labelledby="itd-title">
      <div className="container-x">
        <SectionTitle id="itd-title" eyebrow="Monitor" title="IT Security Dashboard" subtitle="Your security posture at a glance — scores, alerts, devices and vulnerabilities in one view." />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <MetricCard label="Security Score" value={87} suffix="/100" icon={ShieldCheck} color="#4ade80" hint="+3 this week" />
          <MetricCard label="Active Alerts" value={14} icon={AlertTriangle} color="#fb923c" hint="4 need review" />
          <MetricCard label="Devices Protected" value={1248} icon={Laptop} color="#22d3ee" hint="of 1,262 devices" />
          <MetricCard label="Critical Events" value={3} icon={Activity} color="#f87171" hint="Last 24 hours" />
          <MetricCard label="Vulnerabilities" value={42} icon={Bug} color="#facc15" hint="9 high severity" />
          <MetricCard label="Network Status" value={99.98} decimals={2} suffix="%" icon={Wifi} color="#3b82f6" hint="Healthy · uptime" />
        </div>
        <Reveal className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_0.8fr]">
            <DashboardCard title="Security events · 7 days" accent="#22d3ee">
              <Sparkline data={[42, 55, 38, 61, 47, 72, 58, 44, 51, 39, 33, 41]} />
              <p className="mt-2 text-xs text-slate-500">Events trending down over the last week.</p>
            </DashboardCard>
            <DashboardCard title="Alerts by category" accent="#3b82f6">
              <BarChart data={[{ label: 'Email', value: 32 }, { label: 'Endpoint', value: 24 }, { label: 'Network', value: 18 }, { label: 'Identity', value: 27 }, { label: 'Cloud', value: 12 }]} />
            </DashboardCard>
            <DashboardCard title="Coverage" accent="#4ade80">
              <div className="grid place-items-center"><Donut value={98} color="#4ade80" label="Protected" size={130} /></div>
            </DashboardCard>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
