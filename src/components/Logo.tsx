import { Link } from 'react-router-dom'
import { SITE } from '../data/site'

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label={`${SITE.name} home`} className="group flex items-center gap-2.5">
      <span className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-cyan-glow to-electric-500 transition-all duration-300 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}>
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden>
          <path d="M8 9h16M16 9v15M8 24h6" stroke="#03060f" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </svg>
        <span className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity group-hover:opacity-70" style={{ background: '#22d3ee' }} aria-hidden />
      </span>
      <span className={`font-display font-semibold tracking-tight text-white transition-all duration-300 ${compact ? 'text-lg' : 'text-xl'}`}>{SITE.name}</span>
    </Link>
  )
}
