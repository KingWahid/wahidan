'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'

interface ProjectsSectionProps {
  title: string
  subtitle: string
  t: (key: string) => string
}

export function ProjectsSection({ title, subtitle, t }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 px-8 md:px-32 bg-zinc-50 dark:bg-[#080c12]">
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
            href="/projects"
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-black bg-accent-portfolio rounded-full px-3.5 py-1.5 hover:bg-accent-portfolio/90 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Show All Projects
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>

        {/* Projects grid — stagger cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {projects.slice(0, 4).map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} t={t} />
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
            href="/projects"
            className="flex items-center gap-1.5 text-xs font-medium text-black bg-accent-portfolio rounded-full px-4 py-2 hover:bg-accent-portfolio/90 transition-colors"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Show All Projects
            <ArrowUpRight className="size-3" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
