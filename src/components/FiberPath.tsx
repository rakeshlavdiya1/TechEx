import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

interface FiberPathProps {
  children: ReactNode
  color?: string
  className?: string
}

const CURVE = 'M50 0 C50 80 12 120 12 220 S88 340 88 460 S12 580 12 700 S50 820 50 1000'

/**
 * Wraps a story. A thick, embossed glowing fibre is drawn down the wrapper as the user
 * scrolls. It is built from stacked strokes (dark edge, body, soft highlight, bright core)
 * so it reads as a raised tube. Curvy on desktop, a straight rail on mobile.
 */
export default function FiberPath({ children, color = '#22d3ee', className = '' }: FiberPathProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const pathLength = reduce ? 1 : draw

  // Filter lives on the <svg> (CSS px) so offsets are not distorted by the stretched viewBox.
  const raised = `drop-shadow(0 5px 4px rgba(0,0,0,0.65)) drop-shadow(0 0 14px ${color}88)`

  const common = { fill: 'none', strokeLinecap: 'round' as const, vectorEffect: 'non-scaling-stroke' as const }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Desktop curve */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 1000" preserveAspectRatio="none" style={{ filter: raised }}>
        {/* groove the fibre sits in */}
        <path d={CURVE} {...common} stroke="#02050c" strokeOpacity="0.7" strokeWidth="12" />
        <path d={CURVE} {...common} stroke={color} strokeOpacity="0.14" strokeWidth="8" />
        {/* drawn fibre: edge -> body -> highlight -> core */}
        <motion.path d={CURVE} {...common} stroke="#031018" strokeWidth="12" style={{ pathLength }} />
        <motion.path d={CURVE} {...common} stroke={color} strokeWidth="9" style={{ pathLength }} />
        <motion.path d={CURVE} {...common} stroke="#ffffff" strokeOpacity="0.38" strokeWidth="4.5" style={{ pathLength }} />
        <motion.path d={CURVE} {...common} stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.6" style={{ pathLength }} />
      </svg>

      {/* Mobile rail */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-2.5 top-0 w-2 rounded-full lg:hidden" style={{ background: '#02050c', boxShadow: `inset 0 0 0 1px ${color}33` }}>
        <motion.div
          className="h-full w-2 origin-top rounded-full"
          style={{
            scaleY: pathLength,
            background: `linear-gradient(to right, ${color}, #ffffff66 45%, ${color} 60%, #00000055)`,
            boxShadow: `0 0 12px ${color}aa, 2px 3px 4px rgba(0,0,0,0.6), inset 1px 0 0 rgba(255,255,255,0.6)`,
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
