import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { PRODUCTS } from '../data/products'
import Logo from './Logo'

const columns = [
  { title: 'Solutions', links: PRODUCTS.map((p) => ({ label: p.name, to: p.path })) },
  { title: 'Company', links: [{ label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }] },
  { title: 'Resources', links: [{ label: 'Privacy Policy', to: '/about#privacy' }, { label: 'Terms', to: '/about#terms' }] },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">Technology that works around your business — security, operations and intelligent workspaces as one connected experience.</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}><Link to={l.to} className="text-sm text-slate-400 transition-colors hover:text-cyan-glow">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/5">
        <p className="container-x py-6 text-sm text-slate-500">© {SITE.year} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
