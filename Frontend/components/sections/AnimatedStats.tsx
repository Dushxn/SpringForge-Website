'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { stats } from '@/lib/data'

interface CountUpProps {
  numeric: number
  format: (n: number) => string
  trigger: boolean
  duration?: number
}

function CountUp({ numeric, format, trigger, duration = 1.5 }: CountUpProps) {
  const motionVal = useMotionValue(0)
  const display = useTransform(motionVal, (v) => format(Math.round(v)))

  useEffect(() => {
    if (!trigger) return
    const controls = animate(motionVal, numeric, { duration, ease: 'easeOut' })
    return controls.stop
  }, [trigger, numeric, duration, motionVal])

  return <motion.span>{display}</motion.span>
}

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="border-y border-dark-border bg-dark-card">
      <motion.div
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10 px-6 py-8"
        initial={reduceMotion ? false : 'hidden'}
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            className="text-center"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
          >
            <div className="text-3xl font-extrabold text-accent">
              {reduceMotion ? (
                s.format(s.numeric)
              ) : (
                <CountUp numeric={s.numeric} format={s.format} trigger={isInView} />
              )}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-widest text-content-muted">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
