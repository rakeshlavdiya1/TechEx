import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  arrow?: boolean
  className?: string
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60'
const variants = {
  primary:
    'bg-gradient-to-r from-electric-500 to-cyan-glow text-ink-950 shadow-[0_0_28px_-6px_rgba(34,211,238,0.7)] hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.9)] hover:-translate-y-0.5',
  secondary:
    'glass text-white hover:border-cyan-glow/60 hover:bg-white/10 hover:-translate-y-0.5',
  ghost: 'text-slate-300 hover:text-white',
}
const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  arrow = true,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={size === 'lg' ? 18 : 16}
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </>
  )
  if (to) return <Link to={to} className={classes}>{content}</Link>
  if (href) return <a href={href} className={classes}>{content}</a>
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}
