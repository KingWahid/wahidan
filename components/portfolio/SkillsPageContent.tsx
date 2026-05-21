'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { SkillCard } from '@/components/portfolio/SkillCard'
import { getSkillsByCategory, skillCategoryOrder } from '@/lib/data'
import { fadeUp, staggerContainer, viewport } from '@/lib/animations'

export function SkillsPageContent() {
  const { t } = useTranslation()

  return (
    <main className="pt-28 pb-16 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Page header */}
        <motion.header
          className="mb-14 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            variants={fadeUp}
          >
            {t('skills.subtitle')}
          </motion.p>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            variants={fadeUp}
          >
            {t('skills.title')}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            variants={fadeUp}
          >
            {t('skills.page.description')}
          </motion.p>
        </motion.header>

        {/* Categories — each section animates independently via whileInView */}
        <div className="space-y-12 md:space-y-14">
          {skillCategoryOrder.map(({ category, labelKey }) => {
            const categorySkills = getSkillsByCategory(category)
            if (categorySkills.length === 0) return null

            return (
              <motion.section
                key={category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <h2
                  className="flex items-center gap-2 text-sm font-medium text-accent-portfolio mb-5"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  <span aria-hidden className="text-accent-portfolio">—</span>
                  {t(labelKey)}
                </h2>

                {/* Skill cards grid — stagger within each category */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  {categorySkills.map((skill) => (
                    <motion.div key={skill.id} variants={fadeUp}>
                      <SkillCard skill={skill} variant="compact" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )
          })}
        </div>

      </div>
    </main>
  )
}
