import type { CSSProperties, MouseEvent, ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  accent?: string
  as?: 'div' | 'li' | 'article'
}

/** Glass card with a cursor-following spotlight and glowing border on hover. */
export default function GlowCard({ children, className = '', accent = '#22d3ee', as: Tag = 'div' }: GlowCardProps) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  const style = { '--glow': `${accent}29`, '--accent': accent } as CSSProperties
  return (
    <Tag
      onMouseMove={onMove}
      style={style}
      className={`spotlight glass relative overflow-hidden rounded-2xl transition-colors duration-300 hover:border-[color:var(--accent)] ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}
