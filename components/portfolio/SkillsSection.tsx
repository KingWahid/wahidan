'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getHomeFeaturedSkills } from '@/lib/data'
import { SkillCard } from '@/components/portfolio/SkillCard'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'

interface SkillsSectionProps {
  title: string
  subtitle: string
}

export function SkillsSection({ title, subtitle }: SkillsSectionProps) {
  const featuredSkills = getHomeFeaturedSkills()

  return (
    <section id="skills" className="py-20 px-8 md:px-32">
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
            <p className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
              {subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
              {title}
            </h2>
          </div>
          <Link
            href="/skills"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-black bg-accent-portfolio rounded-full px-3.5 py-1.5 hover:bg-accent-portfolio/90 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Show All Skills
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>

        {/* Skills grid — stagger cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {featuredSkills.map((skill) => (
            <motion.div key={skill.id} variants={fadeUp}>
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
