'use client'

import { ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { ownerInfo } from '@/lib/data'
import { fadeUp, slideInRight, staggerContainer, viewport } from '@/lib/animations'

interface CTASectionProps {
  title: string
  subtitle: string
  contactLabel: string
  resumeLabel: string
}

export function CTASection({ title, subtitle, contactLabel, resumeLabel }: CTASectionProps) {
  return (
    <>
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <section id="contact" className="py-16 px-4 sm:px-8 md:px-32 bg-zinc-50 dark:bg-[#080c12]">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Left: text */}
          <motion.div variants={fadeUp}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              {title}
            </h2>
            <p
              className="text-sm text-muted-foreground mt-2"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {subtitle}
            </p>
          </motion.div>

          {/* Right: buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 shrink-0"
            variants={slideInRight}
          >
            <a
              href="https://wa.me/6285669170171"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-portfolio text-black text-sm font-normal hover:bg-accent-portfolio/90 transition-colors"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {contactLabel}
              <ArrowRight className="size-4" />
            </a>
            <a
              href={ownerInfo.resumeUrl}
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-foreground text-sm font-normal hover:border-zinc-500 transition-colors bg-transparent dark:border-zinc-600 dark:hover:border-zinc-400"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <Download className="size-4" />
              {resumeLabel}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
