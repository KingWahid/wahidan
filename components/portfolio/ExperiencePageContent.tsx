'use client'

import { useState } from 'react'
import { MapPin, Calendar, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { experiences, sortExperiences, formatDateRange } from '@/lib/data'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'
import { CertificateModal } from '@/components/portfolio/CertificateModal'

export function ExperiencePageContent() {
  const { t } = useTranslation()
  const sorted = sortExperiences(experiences)

  const [modalCert, setModalCert] = useState<{
    url: string
    title: string
    company: string
  } | null>(null)

  return (
    <>
    <main className="pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            variants={fadeUp}
          >
            {t('experience.label')}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            variants={fadeUp}
          >
            {t('experience.title')}
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            variants={fadeUp}
          >
            {t('experience.page.description')}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800" />

          <motion.div
            className="flex flex-col gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {sorted.map((exp) => {
              const isCurrent = exp.endDate === null

              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-10"
                  variants={fadeUp}
                >
                  {/* Timeline dot */}
                  <div className={[
                    'absolute left-0 top-1.5 size-[22px] rounded-full border-2 flex items-center justify-center',
                    isCurrent
                      ? 'border-accent-portfolio bg-accent-portfolio/20'
                      : 'border-zinc-300 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900',
                  ].join(' ')}>
                    <div className={[
                      'size-2 rounded-full',
                      isCurrent ? 'bg-accent-portfolio' : 'bg-zinc-400 dark:bg-zinc-500',
                    ].join(' ')} />
                  </div>

                  {/* Card */}
                  <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117] p-6">

                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h2
                          className="text-lg font-bold text-foreground"
                          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                        >
                          {t(exp.positionKey)}
                        </h2>
                        <p
                          className="text-sm font-semibold text-accent-portfolio mt-0.5"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      {isCurrent && (
                        <span
                          className="shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent-portfolio/15 text-accent-portfolio border border-accent-portfolio/30"
                          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                        >
                          {t('experience.badge.current')}
                        </span>
                      )}
                    </div>

                    {/* Meta: period + location */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span
                        className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500"
                        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                      >
                        <Calendar className="size-3.5 shrink-0" />
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                      {exp.locationKey && (
                        <span
                          className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          <MapPin className="size-3.5 shrink-0" />
                          {t(exp.locationKey)}
                        </span>
                      )}
                    </div>

                    {/* Description — only show if non-empty */}
                    {exp.descriptionKey && t(exp.descriptionKey) && (
                      <p
                        className="text-sm text-muted-foreground leading-relaxed mb-4"
                        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                      >
                        {t(exp.descriptionKey)}
                      </p>
                    )}

                    {/* Bullet points */}
                    {exp.bulletKeys && exp.bulletKeys.length > 0 && (
                      <ul className="flex flex-col gap-2 mb-5">
                        {exp.bulletKeys.map((key) => (
                          <li
                            key={key}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                          >
                            <span className="mt-1.5 shrink-0 size-1.5 rounded-full bg-accent-portfolio" />
                            {t(key)}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech stack — label style below bullets */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs text-zinc-600 border border-zinc-200 bg-zinc-100 dark:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/50"
                            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Certificate button */}
                    {exp.certificateUrl && (
                      <div className={[
                        'pt-4',
                        exp.techStack && exp.techStack.length > 0 ? '' : 'border-t border-zinc-200 dark:border-zinc-800',
                      ].join(' ')}>
                        <button
                          onClick={() =>
                            setModalCert({
                              url: exp.certificateUrl!,
                              title: t(exp.positionKey),
                              company: exp.company,
                            })
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-accent-portfolio border border-accent-portfolio/30 bg-accent-portfolio/10 hover:bg-accent-portfolio/20 transition-colors"
                          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                        >
                          <Award className="size-3.5 shrink-0" />
                          View Certificate
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </main>

    {/* Certificate modal */}
    {modalCert && (
      <CertificateModal
        isOpen={!!modalCert}
        onClose={() => setModalCert(null)}
        certificateUrl={modalCert.url}
        title={modalCert.title}
        company={modalCert.company}
      />
    )}
    </>
  )
}
