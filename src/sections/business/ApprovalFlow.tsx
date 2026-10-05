import { CheckCheck, ClipboardList, Eye, Radar, Scale } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import Workflow, { type WorkflowStep } from '../../components/Workflow'
import Reveal from '../../components/Reveal'

const STEPS: WorkflowStep[] = [
  { label: 'Request', icon: ClipboardList, detail: 'Anyone submits a request through a structured form, so the right details arrive the first time.' },
  { label: 'Review', icon: Eye, detail: 'The request routes automatically to the right reviewer, with the full history in one place.' },
  { label: 'Approve / Reject', icon: Scale, detail: 'Approvers decide in a click. Approved requests move on; rejected ones return with a reason.' },
  { label: 'Track', icon: Radar, detail: 'Requesters and managers see live status at every step, with no chasing by email.' },
  { label: 'Complete', icon: CheckCheck, detail: 'The outcome is recorded automatically, giving you a clean audit trail for every decision.' },
]

export default function ApprovalFlow() {
  return (
    <section className="section-y" aria-labelledby="approval-title">
      <div className="container-x">
        <SectionTitle id="approval-title" eyebrow="Approval management" title="Approvals that work across every department" subtitle="Approval management can be built into any department workflow. Select a step to see how it works." accent="#22d3ee" />
        <Reveal className="mt-14"><Workflow steps={STEPS} accent="#22d3ee" interactive intervalMs={3000} /></Reveal>
      </div>
    </section>
  )
}
