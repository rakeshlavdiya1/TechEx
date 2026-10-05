import { BrainCircuit, Layers, ShieldCheck, type LucideIcon } from 'lucide-react'

export type ProductId = 'cybersecurity-one' | 'business-one' | 'smart-think-center'

export interface Product {
  id: ProductId
  name: string
  path: string
  short: string
  tagline: string
  icon: LucideIcon
  /** Hex colour used for glows, lines and highlights */
  accent: string
  points: string[]
}

/** Add a new product by adding an entry here, then a page + route (see README). */
export const PRODUCTS: Product[] = [
  {
    id: 'cybersecurity-one',
    name: 'Cybersecurity One',
    path: '/cybersecurity-one',
    short:
      'Protect your digital environment with intelligent security operations, monitoring, assessment and response.',
    tagline: 'See. Detect. Assess. Respond. Protect.',
    icon: ShieldCheck,
    accent: '#22d3ee',
    points: ['Security Operations Center', 'Vulnerability assessment', 'Penetration testing'],
  },
  {
    id: 'business-one',
    name: 'Business One',
    path: '/business-one',
    short:
      'One connected workspace for HR, IT, Accounts, Admin, Sales, Customer Care and Operations.',
    tagline: 'One Workspace. Every Department. One Connected Business.',
    icon: Layers,
    accent: '#3b82f6',
    points: ['Eight connected modules', 'Approvals and workflows', 'Less email, more clarity'],
  },
  {
    id: 'smart-think-center',
    name: 'Smart Think Center',
    path: '/smart-think-center',
    short: 'Turn your business problems into practical, intelligent digital workspaces.',
    tagline: 'You Bring the Problem. We Build the Workspace.',
    icon: BrainCircuit,
    accent: '#8b5cf6',
    points: ['Problem-first discovery', 'Custom workflow design', 'Continuous improvement'],
  },
]
