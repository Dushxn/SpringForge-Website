'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, scalePop, staggerContainer } from '@/lib/variants'

// Static particle positions — no Math.random() to avoid hydration mismatch
const PARTICLES = [
  { top: '18%', left: '9%',  size: 3, duration: 3.2, delay: 0.0 },
  { top: '62%', left: '7%',  size: 2, duration: 4.0, delay: 0.8 },
  { top: '33%', left: '87%', size: 4, duration: 3.5, delay: 0.3 },
  { top: '74%', left: '84%', size: 2, duration: 4.8, delay: 1.2 },
  { top: '14%', left: '54%', size: 3, duration: 3.8, delay: 0.5 },
  { top: '82%', left: '41%', size: 2, duration: 5.0, delay: 1.8 },
  { top: '51%', left: '91%', size: 3, duration: 3.1, delay: 0.9 },
  { top: '26%', left: '76%', size: 2, duration: 4.3, delay: 2.1 },
]

const buttonVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.55 + i * 0.12, ease: 'easeOut' },
  }),
}

export default function AnimatedHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-28 text-center">

      {/* Breathing glow orb */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
        <motion.div
          className="h-[500px] w-[700px] rounded-full bg-accent blur-[120px]"
          animate={reduceMotion ? {} : { opacity: [0.04, 0.10, 0.04] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ opacity: 0.04 }}
        />
      </div>

      {/* Floating particles */}
      {!reduceMotion && PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-accent"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: 0.25 }}
          animate={{ y: ['0px', '-12px', '0px'], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative mx-auto max-w-3xl">

        {/* Badge */}
        <motion.span
          className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent"
          variants={scalePop}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          IntelliJ IDEA Plugin · Intelligent Development Ecosystem
        </motion.span>

        {/* Title — word-by-word stagger */}
        <motion.h1
          className="mb-5 text-6xl font-extrabold leading-none tracking-tight md:text-7xl"
          variants={staggerContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          {(['Spring', 'Forge'] as const).map((word, i) => (
            <motion.span
              key={word}
              className={word === 'Forge' ? 'text-accent' : undefined}
              custom={i}
              variants={fadeUp}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-content-secondary"
          custom={3}
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          An Intelligent Spring Boot Development Ecosystem — powered by Machine Learning,
          RAG-based debugging, and architecture-aware code generation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={staggerContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.div custom={0} variants={buttonVariants} whileHover={{ scale: 1.04 }}>
            <Link
              href="#download"
              className="flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-black transition hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(0,255,170,0.35)]"
            >
              ↓ Download Plugin
            </Link>
          </motion.div>
          <motion.div custom={1} variants={buttonVariants} whileHover={{ scale: 1.04 }}>
            <Link
              href="#features"
              className="rounded-xl border border-dark-border px-7 py-3.5 text-base font-semibold text-content-primary transition hover:border-accent/40 hover:text-accent"
            >
              Explore Features
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
