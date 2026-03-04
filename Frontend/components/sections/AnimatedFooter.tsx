'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function AnimatedFooter() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      className="border-t border-dark-border px-6 py-8 text-center text-sm text-content-muted"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <p>© 2026 SpringForge · Research Project 25-26J-451 · SLIIT</p>
    </motion.footer>
  )
}
