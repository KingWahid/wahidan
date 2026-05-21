'use client'

import { ArrowRight, Download, Mail, Phone, MapPin, GraduationCap, BookOpen, Award, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { ownerInfo, educations } from '@/lib/data'
import type { Education } from '@/lib/data'
import { fadeUp, slideInRight, staggerContainer, viewport } from '@/lib/animations'

const contactCardClass =
  'flex items-start gap-4 p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]'

/** Parse bio2 — replaces <react>, <next>, <flutter> tags with highlighted spans */
function HighlightedBio({ text }: { text: string }) {
  const parts = text.split(/(<react>.*?<\/react>|<next>.*?<\/next>|<flutter>.*?<\/flutter>)/g)
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<(react|next|flutter)>(.*?)<\/(react|next|flutter)>$/)
        if (match) {
          return (
            <span key={i} className="text-accent-portfolio font-semibold">
              {match[2]}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function EducationIcon({ type }: { type: Education['type'] }) {
  if (type === 'formal') return <GraduationCap className="size-4" />
  if (type === 'certification') return <Award className="size-4" />
  return <BookOpen className="size-4" />
}

export function AboutPageContent() {
  const { t } = useTranslation()

  return (
    <main className="pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <motion.div
          className="mb-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            variants={fadeUp}
          >
            {t('about.label')}
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            variants={fadeUp}
          >
            {t('about.title')}
          </motion.h1>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

          {/* Left: Bio text + CTA buttons */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div className="space-y-5 mb-10" variants={fadeUp}>
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {t('about.bio1')}
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                <HighlightedBio text={t('about.bio2')} />
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {t('about.bio3')}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
              <a
                href="mailto:wahidann765@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-portfolio text-black text-sm font-normal hover:bg-accent-portfolio/90 transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {t('about.cta.contact')}
                <ArrowRight className="size-4" />
              </a>
              <a
                href={ownerInfo.resumeUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-foreground text-sm font-normal hover:border-zinc-500 transition-colors bg-transparent dark:border-zinc-600 dark:hover:border-zinc-400"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                <Download className="size-4" />
                {t('about.cta.resume')}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Contact info cards + Education */}
          <div className="flex flex-col gap-6">

            {/* Education card */}
            <motion.div
              className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117] p-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <p
                className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {t('about.education.title')}
              </p>

              <div className="flex flex-col gap-4">
                {educations.map((edu, index) => (
                  <div key={edu.id}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 size-7 rounded-md bg-accent-portfolio/10 border border-accent-portfolio/20 flex items-center justify-center text-accent-portfolio">
                        <EducationIcon type={edu.type} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-semibold text-accent-portfolio mb-0.5"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          {edu.institution}
                        </p>
                        <p
                          className="text-sm font-medium text-foreground leading-snug"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          {t(edu.titleKey)}
                        </p>
                        <p
                          className="text-[11px] text-zinc-500 mt-1"
                          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                        >
                          {edu.period}
                        </p>
                        {edu.certificateUrl && (
                          <a
                            href={edu.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-accent-portfolio hover:underline mt-1"
                            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                          >
                            View Certificate
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    {index < educations.length - 1 && (
                      <div className="mt-4 border-t border-zinc-200 dark:border-zinc-800" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact cards */}
            <motion.div
              className="flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {/* Email */}
              <motion.div className={contactCardClass} variants={slideInRight}>
                <div className="mt-0.5 shrink-0 text-accent-portfolio">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {t('about.contact.email.label')}
                  </p>
                  <a
                    href="mailto:wahidann765@gmail.com"
                    className="text-sm font-medium text-foreground hover:text-accent-portfolio transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    wahidann765@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div className={contactCardClass} variants={slideInRight}>
                <div className="mt-0.5 shrink-0 text-accent-portfolio">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {t('about.contact.phone.label')}
                  </p>
                  <a
                    href="tel:+6285669170171"
                    className="text-sm font-medium text-foreground hover:text-accent-portfolio transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    +62 85669170171
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div className={contactCardClass} variants={slideInRight}>
                <div className="mt-0.5 shrink-0 text-accent-portfolio">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {t('about.contact.location.label')}
                  </p>
                  <p
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Bandung, Indonesia
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  )
}
