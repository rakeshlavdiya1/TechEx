import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionTitleProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: string
  align?: 'left' | 'center'
  accent?: string
  id?: string
}

export default function SectionTitle({ title, subtitle, eyebrow, align = 'center', accent = '#22d3ee', id }: SectionTitleProps) {
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium" style={{ color: accent }}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  )
}
