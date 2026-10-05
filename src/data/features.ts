import {
  Activity,
  Bug,
  ClipboardCheck,
  Eye,
  FileText,
  Inbox,
  Link2,
  Lock,
  Network,
  Radar,
  Route,
  ShieldAlert,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export interface Feature {
  title: string
  text: string
  icon: LucideIcon
}

export const BUSINESS_FEATURES: Feature[] = [
  { title: 'Reduce manual work', text: 'Replace repeated copying, chasing and re-typing with guided digital steps.', icon: Workflow },
  { title: 'Reduce dependency on email', text: 'Requests and decisions live in one place instead of long inbox threads.', icon: Inbox },
  { title: 'Centralize information', text: 'Records, files and history sit in one workspace everyone can trust.', icon: FileText },
  { title: 'Improve approvals', text: 'Every request has an owner, a status and a clear next step.', icon: ClipboardCheck },
  { title: 'Improve visibility', text: 'See what is pending, late or complete without asking around.', icon: Eye },
  { title: 'Connect departments', text: 'HR, IT, Accounts and Sales share context instead of passing files.', icon: Link2 },
  { title: 'Create digital workflows', text: 'Turn everyday processes into repeatable, trackable flows.', icon: Route },
  { title: 'Improve operational control', text: 'Dashboards give managers the numbers behind daily operations.', icon: SlidersHorizontal },
]

export const CYBER_FEATURES: Feature[] = [
  { title: 'Continuous monitoring', text: 'Watch security events across your environment as they happen.', icon: Radar },
  { title: 'Find weaknesses first', text: 'Assess assets and vulnerabilities before attackers do.', icon: Bug },
  { title: 'Respond with a plan', text: 'Track incidents from alert to resolution with clear ownership.', icon: ShieldAlert },
  { title: 'Protect access and data', text: 'Keep controls, compliance and activity in one security view.', icon: Lock },
]

export const ABOUT_FOCUS: Feature[] = [
  { title: 'Business transformation', text: 'Helping teams move from scattered tools to connected ways of working.', icon: Network },
  { title: 'Cybersecurity', text: 'Monitoring, assessment and response for modern digital environments.', icon: ShieldAlert },
  { title: 'Digital workflows', text: 'Requests, approvals and records that move without email chains.', icon: Workflow },
  { title: 'Business operations', text: 'Practical tools for the daily work of every department.', icon: Activity },
  { title: 'Intelligent workspaces', text: 'Web-based workplaces designed around how people actually work.', icon: Eye },
  { title: 'Custom solutions', text: 'Modules built around your processes, not the other way round.', icon: SlidersHorizontal },
]
