import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Animates a number from 0 to `target` once `active` becomes true. */
export function useCountUp(target: number, active: boolean, duration = 1400): number {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduce) {
      setValue(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration, reduce])

  return value
}
