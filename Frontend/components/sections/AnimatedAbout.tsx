'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface TeamMember {
  name: string
  role: string
  module: string
  moduleIcon: string
  moduleColor: string
  moduleBg: string
  moduleBorder: string
  avatar: string
  github?: string
}

const team: TeamMember[] = [
  {
    name: 'Tharindu',
    role: 'Code Generation Engineer',
    module: 'Code Generator',
    moduleIcon: '🔧',
    moduleColor: 'text-blue-400',
    moduleBg: 'bg-blue-500/10',
    moduleBorder: 'border-blue-500/30',
    avatar: '/team/Tharindu.png',
  },
  {
    name: 'Madhini',
    role: 'Debugger & Runtime Engineer',
    module: 'Runtime Debugger',
    moduleIcon: '🐞',
    moduleColor: 'text-red-400',
    moduleBg: 'bg-red-500/10',
    moduleBorder: 'border-red-500/30',
    avatar: '/team/Madhini.jpg',
  },
  {
    name: 'Jameela',
    role: 'Code Quality Engineer',
    module: 'Quality Analyzer',
    moduleIcon: '📊',
    moduleColor: 'text-purple-400',
    moduleBg: 'bg-purple-500/10',
    moduleBorder: 'border-purple-500/30',
    avatar: '/team/Jameela.jpg',
  },
  {
    name: 'Udula',
    role: 'DevOps & CI/CD Engineer',
    module: 'CI/CD Generator',
    moduleIcon: '🚀',
    moduleColor: 'text-yellow-400',
    moduleBg: 'bg-yellow-500/10',
    moduleBorder: 'border-yellow-500/30',
    avatar: '/team/Udula.png',
  },
]

function MemberCard({ member, index, reduceMotion }: { member: TeamMember; index: number; reduceMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card p-6 transition-colors hover:border-accent/30"
    >
      {/* Subtle shimmer on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-300 group-hover:via-accent/40" />

      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <motion.div
          whileHover={reduceMotion ? {} : { scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-dark-border shadow-lg transition-colors group-hover:border-accent/40"
        >
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            className="object-cover object-top"
            unoptimized
          />
        </motion.div>
      </div>

      {/* Name + role */}
      <div className="mb-3 text-center">
        <h3 className="text-base font-bold text-content-primary">{member.name}</h3>
        <p className="mt-0.5 text-[12px] text-content-secondary/60">{member.role}</p>
      </div>

      {/* Module badge */}
      <div className="flex justify-center">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${member.moduleColor} ${member.moduleBg} ${member.moduleBorder}`}>
          <span>{member.moduleIcon}</span>
          {member.module}
        </span>
      </div>
    </motion.div>
  )
}

export default function AnimatedAbout() {
  const heroRef = useRef<HTMLDivElement>(null)
  const inView = useInView(heroRef, { once: true })
  const reduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-dark-base">

      {/* Hero */}
      <section className="px-6 pb-16 pt-24 text-center" ref={heroRef}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto max-w-2xl"
        >
          {/* Pill */}
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Team
          </motion.span>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-content-primary md:text-5xl">
            Built by developers,<br />
            <span className="text-accent">for developers</span>
          </h1>
          <p className="text-lg leading-relaxed text-content-secondary">
            Four engineers from SLIIT, each owning one core module of the SpringForge IntelliJ plugin.
          </p>
        </motion.div>
      </section>

      {/* Team grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </section>

      {/* Why we built this */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="mb-10 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Our Story
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-content-primary">
              Why we built SpringForge
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: '😩',
                title: 'Tired of boilerplate',
                body: 'Every new Spring Boot project meant writing the same controllers, services, and repositories by hand. We wanted to eliminate that grunt work so we could focus on actual business logic.',
              },
              {
                icon: '🔍',
                title: 'Debugging was painful',
                body: 'Chasing bugs across a deep call stack with no context is exhausting. We wanted a debugger view that shows you exactly where things broke and what the variables look like — right inside the IDE.',
              },
              {
                icon: '📉',
                title: 'Quality slipped through',
                body: "Code reviews don't always catch coverage gaps or maintainability issues early enough. An inline quality scanner means problems surface before they hit the main branch.",
              },
              {
                icon: '🚢',
                title: 'Deployment was an afterthought',
                body: 'Writing GitHub Actions workflows from scratch is error-prone and repetitive. We wanted a one-click generator that produces a production-ready deploy pipeline tailored to your project.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                className="rounded-2xl border border-dark-border bg-dark-card p-5"
              >
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="mb-1.5 text-sm font-semibold text-content-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-content-secondary">{item.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing quote */}
          <motion.blockquote
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 px-6 py-5 text-center"
          >
            <p className="text-base font-medium leading-relaxed text-content-primary">
              &ldquo;SpringForge exists because we were the developers who needed it most — and we built the tool we always wished existed.&rdquo;
            </p>
            <p className="mt-2 text-xs text-content-secondary/50">— The SpringForge Team</p>
          </motion.blockquote>
        </div>
      </section>

      {/* Module ownership table */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-dark-border bg-dark-card"
          >
            <div className="border-b border-dark-border px-5 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-content-secondary/50">Module Ownership</p>
            </div>
            <div className="divide-y divide-dark-border">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-dark-border">
                      <Image src={m.avatar} alt={m.name} fill className="object-cover object-top" unoptimized />
                    </div>
                    <span className="text-sm font-medium text-content-primary">{m.name}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${m.moduleColor} ${m.moduleBg} ${m.moduleBorder}`}>
                    {m.moduleIcon} {m.module}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
