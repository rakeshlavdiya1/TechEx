import { useActiveSection } from '../hooks/useActiveSection'

interface StoryRailProps {
  steps: { id: string; label: string }[]
  accent?: string
}

/** Sticky progress rail: Entry → Detect → Monitor ... activates as sections scroll into view. */
export default function StoryRail({ steps, accent = '#22d3ee' }: StoryRailProps) {
  const active = useActiveSection(steps.map((s) => s.id))
  const activeIndex = steps.findIndex((s) => s.id === active)
  return (
    <nav aria-label="Story progress" className="sticky top-16 z-30 border-y border-white/5 bg-ink-900/80 backdrop-blur-md">
      <ol className="container-x no-scrollbar flex items-center gap-1 overflow-x-auto py-3 sm:justify-center sm:gap-3">
        {steps.map((step, i) => {
          const done = i <= activeIndex
          return (
            <li key={step.id} className="flex shrink-0 items-center gap-1 sm:gap-3">
              <a
                href={`#${step.id}`}
                aria-current={i === activeIndex ? 'step' : undefined}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors"
                style={{ color: done ? '#fff' : '#64748b', background: i === activeIndex ? `${accent}22` : 'transparent' }}
              >
                <span className="h-2 w-2 rounded-full transition-all" style={{ background: done ? accent : '#334155', boxShadow: done ? `0 0 10px ${accent}` : 'none' }} />
                {step.label}
              </a>
              {i < steps.length - 1 && <span aria-hidden className="h-px w-4 sm:w-8" style={{ background: i < activeIndex ? accent : '#1e293b' }} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
