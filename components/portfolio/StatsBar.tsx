'use client'

import { motion } from 'framer-motion'
import { fadeIn, fadeUp, staggerContainer, viewport } from '@/lib/animations'

interface StatItem {
  value: string
  label: string
}

interface StatsBarProps {
  stats: StatItem[]
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="border-y border-border py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center sm:gap-0 sm:divide-x divide-border"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center py-4 px-6 sm:px-12 text-center"
              variants={fadeUp}
            >
              <motion.span
                className="text-2xl md:text-3xl font-bold text-accent-portfolio"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                variants={fadeIn}
              >
                {stat.value}
              </motion.span>
              <span
                className="text-xs text-muted-foreground mt-1 tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
