import {
  Building2,
  Cog,
  Headset,
  Monitor,
  Puzzle,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export interface Department {
  id: string
  name: string
  title: string
  icon: LucideIcon
  description: string
  features: string[]
  highlight: string
  metrics: { label: string; value: string }[]
  addons?: string[]
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'hr',
    name: 'HR',
    title: 'Employee Management',
    icon: Users,
    description: 'Keep every employee record, request and change in one dependable place.',
    features: ['Manage all employee details in one place', 'Joiner / Mover / Leaver management', 'Employee requests', 'Employee information'],
    highlight: 'One place for the complete employee lifecycle.',
    metrics: [{ label: 'Active employees', value: '248' }, { label: 'Open requests', value: '12' }, { label: 'Joiners this month', value: '6' }],
  },
  {
    id: 'it',
    name: 'IT',
    title: 'IT Workspace',
    icon: Monitor,
    description: 'Give IT and the business a shared view of requests, tasks and projects.',
    features: ['IT Ticketing Management', 'Project Management', 'IT requests', 'Task visibility', 'Project status'],
    highlight: 'Bring IT requests, projects and support into one workspace.',
    metrics: [{ label: 'Open tickets', value: '31' }, { label: 'Avg. resolution', value: '4.2h' }, { label: 'Active projects', value: '9' }],
  },
  {
    id: 'accounts',
    name: 'Accounts',
    title: 'Finance & Accounts',
    icon: Wallet,
    description: 'Keep payments, vendors and approvals connected and easy to audit.',
    features: ['Accounting and payment information management', 'Payment vendor management', 'Record management', 'Approval workflows'],
    highlight: 'Improve financial visibility and reduce fragmented records.',
    metrics: [{ label: 'Pending payments', value: '18' }, { label: 'Active vendors', value: '64' }, { label: 'Awaiting approval', value: '7' }],
  },
  {
    id: 'admin',
    name: 'Admin',
    title: 'Administration Workspace',
    icon: Building2,
    description: 'Handle administration through requests, approvals and records that stay organised.',
    features: ['Administrator management', 'Admin support management', 'Requests', 'Approvals', 'Records'],
    highlight: 'Manage administration through structured digital workflows.',
    metrics: [{ label: 'Open requests', value: '22' }, { label: 'Approved today', value: '14' }, { label: 'Records filed', value: '1.2k' }],
  },
  {
    id: 'sales',
    name: 'Sales',
    title: 'Sales Workspace',
    icon: TrendingUp,
    description: 'Follow every lead from first contact to closed deal with the whole team.',
    features: ['Sales lead management', 'Sales distribution management', 'Sales management dashboard', 'Pipeline visibility', 'Sales activity'],
    highlight: 'Give sales teams one connected view of opportunities and performance.',
    metrics: [{ label: 'Open leads', value: '86' }, { label: 'Pipeline stages', value: '5' }, { label: 'Won this month', value: '11' }],
  },
  {
    id: 'customer-care',
    name: 'Customer Care',
    title: 'Customer Care Workspace',
    icon: Headset,
    description: 'See every customer request and call in one live view.',
    features: ['Customer request management', 'Call records management', 'Live dashboard', 'Request tracking', 'Customer activity'],
    highlight: 'Centralize customer requests and service visibility.',
    metrics: [{ label: 'Open requests', value: '43' }, { label: 'Calls today', value: '128' }, { label: 'Resolved', value: '92%' }],
  },
  {
    id: 'operations',
    name: 'Operations',
    title: 'Operations Workspace',
    icon: Cog,
    description: 'Replace scattered files with one web-based workplace for daily operations.',
    features: ['Operations management dashboard', 'Reduce dependency on Excel', 'Reduce dependency on Word', 'Web-based workplace', 'Digital workflows', 'Operational visibility'],
    highlight: 'Move everyday operations from scattered documents into one web-based workplace.',
    metrics: [{ label: 'Live workflows', value: '27' }, { label: 'Tasks on track', value: '94%' }, { label: 'Files replaced', value: '140+' }],
  },
  {
    id: 'custom',
    name: 'Custom Add-ons',
    title: 'Your Business. Your Workflow.',
    icon: Puzzle,
    description: "Build additional modules around your organization's specific processes and requirements.",
    features: ['Modules shaped around your processes', 'Connected to the same workspace', 'Same approvals and dashboards'],
    highlight: 'Your Business. Your Workflow.',
    metrics: [{ label: 'Core modules', value: '7' }, { label: 'Add-ons', value: '∞' }, { label: 'One workspace', value: '1' }],
    addons: ['Asset Register', 'Visitor Management', 'Procurement', 'Training Tracker', 'Vehicle Requests', 'Compliance Log'],
  },
]
