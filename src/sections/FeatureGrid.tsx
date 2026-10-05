import type { Feature } from '../data/features'
import GlowCard from '../components/GlowCard'
import Reveal from '../components/Reveal'

interface FeatureGridProps {
  features: Feature[]
  accent?: string
  columns?: string
}

export default function FeatureGrid({ features, accent = '#3b82f6', columns = 'sm:grid-cols-2 lg:grid-cols-4' }: FeatureGridProps) {
  return (
    <ul className={`grid gap-4 ${columns}`}>
      {features.map(({ title, text, icon: Icon }, i) => (
        <li key={title}>
          <Reveal delay={(i % 4) * 0.07} className="h-full">
            <GlowCard accent={accent} className="h-full p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${accent}1f`, color: accent }}><Icon size={22} aria-hidden /></span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
            </GlowCard>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
