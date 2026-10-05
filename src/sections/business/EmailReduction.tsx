import { CheckCheck, GitBranch, Mail, Send, ThumbsUp } from 'lucide-react'
import SectionTitle from '../../components/SectionTitle'
import Workflow, { type WorkflowStep } from '../../components/Workflow'
import Reveal from '../../components/Reveal'

const STEPS: WorkflowStep[] = [
  { label: 'Email', icon: Mail },
  { label: 'Request', icon: Send },
  { label: 'Workflow', icon: GitBranch },
  { label: 'Approval', icon: ThumbsUp },
  { label: 'Completion', icon: CheckCheck },
]

export default function EmailReduction() {
  return (
    <section className="section-y" aria-labelledby="email-title">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 sm:px-14 sm:py-20" style={{ boxShadow: '0 0 90px -40px #3b82f6' }}>
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-electric-500/25 blur-3xl" />
            <div className="relative">
              <SectionTitle id="email-title" title="Less Email. More Workflow." subtitle="Business One is designed to reduce unnecessary email-based communication by moving requests, approvals, records and workflow activities into structured digital processes." accent="#3b82f6" />
              <div className="mt-14"><Workflow steps={STEPS} accent="#3b82f6" /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
