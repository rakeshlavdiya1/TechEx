import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Product } from '../data/products'

interface Snapshot {
  product: Product
  rect: { top: number; left: number; width: number; height: number }
  vw: number
  vh: number
}

interface StoryContextValue {
  start: (product: Product, rect: DOMRect) => void
}

const StoryContext = createContext<StoryContextValue>({ start: () => undefined })
export const useStoryTransition = () => useContext(StoryContext)

/**
 * Story transition: the chosen card lights up, a glowing fibre races out of it across the
 * screen, the card expands to fill the viewport, then the product page is revealed.
 * Total runtime is about 1.2 seconds.
 */
export function StoryTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const busy = useRef(false)

  const start = useCallback(
    (product: Product, rect: DOMRect) => {
      if (busy.current) return
      if (reduce) { navigate(product.path); return }
      busy.current = true
      setSnap({ product, rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }, vw: window.innerWidth, vh: window.innerHeight })
      window.setTimeout(() => navigate(product.path), 820)
      window.setTimeout(() => { setSnap(null); busy.current = false }, 1250)
    },
    [navigate, reduce],
  )

  const value = useMemo(() => ({ start }), [start])

  return (
    <StoryContext.Provider value={value}>
      {children}
      <AnimatePresence>{snap && <Overlay key="story" snap={snap} />}</AnimatePresence>
    </StoryContext.Provider>
  )
}

function Overlay({ snap }: { snap: Snapshot }) {
  const { product, rect, vw, vh } = snap
  const Icon = product.icon
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  // Fibre leaves the card, swoops through the screen and exits on the far side.
  const path = `M ${cx} ${cy} C ${cx + vw * 0.25} ${cy - vh * 0.35}, ${vw * 0.55} ${vh * 0.9}, ${vw * 1.1} ${vh * 0.45}`
  const glow = { filter: `drop-shadow(0 0 8px ${product.accent}) drop-shadow(0 0 20px ${product.accent})` }

  return (
    <motion.div className="fixed inset-0 z-[100] overflow-hidden" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} role="status" aria-label={`Opening ${product.name}`}>
      {/* highlighted card border */}
      <motion.div
        className="absolute rounded-3xl"
        style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, border: `2px solid ${product.accent}` }}
        initial={{ boxShadow: `0 0 0 0 ${product.accent}00` }}
        animate={{ boxShadow: [`0 0 0 0 ${product.accent}00`, `0 0 60px 6px ${product.accent}aa`, `0 0 60px 6px ${product.accent}aa`] }}
        transition={{ duration: 0.4 }}
      />
      {/* expanding panel */}
      <motion.div
        className="absolute grid place-items-center overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 45%, ${product.accent}55, #060b18 62%)` }}
        initial={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 24, opacity: 0.0 }}
        animate={{ top: 0, left: 0, width: vw, height: vh, borderRadius: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="flex flex-col items-center gap-4 text-center" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
          <span className="grid h-20 w-20 place-items-center rounded-3xl" style={{ background: `${product.accent}26`, color: product.accent, boxShadow: `0 0 50px ${product.accent}88` }}><Icon size={40} aria-hidden /></span>
          <span className="font-display text-3xl font-semibold text-white sm:text-5xl">{product.name}</span>
        </motion.div>
      </motion.div>
      {/* fibre line */}
      <svg className="pointer-events-none absolute inset-0" width={vw} height={vh} viewBox={`0 0 ${vw} ${vh}`} aria-hidden>
        <motion.path d={path} fill="none" stroke={product.accent} strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, opacity: 1 }} animate={{ pathLength: 1, opacity: [1, 1, 0.0] }} transition={{ duration: 0.7, ease: 'easeInOut', opacity: { duration: 0.9, times: [0, 0.8, 1] } }} style={glow} />
        <motion.path d={path} fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: 'easeInOut' }} />
      </svg>
    </motion.div>
  )
}
