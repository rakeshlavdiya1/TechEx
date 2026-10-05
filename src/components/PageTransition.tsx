import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { pageVariants } from '../animations/variants'

export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div variants={pageVariants} initial={reduce ? false : 'initial'} animate="animate">
      {children}
    </motion.div>
  )
}
