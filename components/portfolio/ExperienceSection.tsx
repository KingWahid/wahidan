'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { experiences, sortExperiences } from '@/lib/data'
import { ExperienceItem } from '@/components/portfolio/ExperienceItem'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'

interface ExperienceSectionProps {
  title: string
  subtitle: string
  t: (key: string) => string
}

export function ExperienceSection({ title, subtitle, t }: ExperienceSectionProps) {
  const sortedExperiences = sortExperiences(experiences)

  return (
    <section id="experience" className="py-20 px-8 md:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <p
              className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-2"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {subtitle}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href="/experience"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-black bg-accent-portfolio rounded-full px-3.5 py-1.5 hover:bg-accent-portfolio/90 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Show All Experience
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>

        {/* Experience list — stagger items */}
        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {sortedExperiences.map((experience, index) => (
            <motion.div key={experience.id} variants={fadeUp}>
              <ExperienceItem
                experience={experience}
                isLast={index === sortedExperiences.length - 1}
                t={t}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: show all button */}
        <motion.div
          className="mt-6 flex justify-center md:hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <Link
            href="/experience"
            className="flex items-center gap-1.5 text-xs font-medium text-black bg-accent-portfolio rounded-full px-4 py-2 hover:bg-accent-portfolio/90 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Show All Experience
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
