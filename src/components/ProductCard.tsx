import type { CSSProperties, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Product } from '../data/products'
import { useStoryTransition } from './ProductStoryTransition'

const iconVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: [0, -10, 8, 0], scale: 1.15, transition: { duration: 0.6 } },
}

export default function ProductCard({ product }: { product: Product }) {
  const { start } = useStoryTransition()
  const reduce = useReducedMotion()
  const Icon = product.icon

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    start(product, e.currentTarget.getBoundingClientRect())
  }

  const vars = { '--accent': product.accent } as CSSProperties

  return (
    <motion.div initial="rest" whileHover={reduce ? undefined : 'hover'} animate="rest" className="h-full">
      <motion.div variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="h-full">
        <Link
          to={product.path}
          onClick={onClick}
          style={vars}
          aria-label={`Explore ${product.name}`}
          className="group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-7 backdrop-blur-xl transition-all duration-500 hover:border-[color:var(--accent)] hover:bg-ink-700/70 hover:shadow-[0_0_60px_-12px_var(--accent)] focus-visible:border-[color:var(--accent)] sm:p-8"
        >
          {/* background wash */}
          <div aria-hidden className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 20% 0%, ${product.accent}2e, transparent 60%)` }} />
          {/* moving light lines + particles (only on hover) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {[12, 30, 52, 74, 90].map((left, i) => (
              <span key={left} className="absolute bottom-0 block w-px animate-rise" style={{ left: `${left}%`, height: 46 + i * 8, background: `linear-gradient(to top, transparent, ${product.accent})`, animationDelay: `${i * 0.45}s` }} />
            ))}
            {[20, 62, 84].map((left, i) => (
              <span key={left} className="absolute bottom-6 block h-1 w-1 animate-rise rounded-full" style={{ left: `${left}%`, background: product.accent, animationDelay: `${0.3 + i * 0.6}s` }} />
            ))}
          </div>

          <div className="relative flex flex-1 flex-col">
            <motion.span variants={iconVariants} className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: `${product.accent}1f`, color: product.accent, boxShadow: `0 0 30px -6px ${product.accent}` }}>
              <Icon size={32} aria-hidden />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{product.name}</h3>
            <p className="mt-3 leading-relaxed text-slate-400">{product.short}</p>
            <ul className="mt-6 space-y-2">
              {product.points.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-slate-300"><Check size={15} style={{ color: product.accent }} aria-hidden />{point}</li>
              ))}
            </ul>
            <span className="mt-auto flex translate-y-2 items-center gap-2 pt-8 text-sm font-medium opacity-100 transition-all duration-300 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100" style={{ color: product.accent }}>
              Enter the story <ArrowUpRight size={18} aria-hidden />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}
