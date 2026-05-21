'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/portfolio/Navbar'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { CTASection } from '@/components/portfolio/CTASection'
import { Footer } from '@/components/portfolio/Footer'
import { StatsBar } from '@/components/portfolio/StatsBar'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          greeting={t('hero.greeting')}
          profession={t('hero.profession')}
          bio={t('hero.bio')}
          ctaWork={t('hero.cta.work')}
          ctaResume={t('hero.cta.resume')}
          t={t}
        />
        <StatsBar
          stats={[
            { value: '2+', label: 'Years Experience' },
            { value: '10+', label: 'Projects' },
            { value: '15+', label: 'Tech Stack' },
          ]}
        />
        <SkillsSection
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />
        <hr className="border-zinc-800" />
        <ProjectsSection
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          t={t}
        />
        <hr className="border-zinc-800" />
        <ExperienceSection
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
          t={t}
        />
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          contactLabel={t('cta.contact')}
          resumeLabel={t('cta.resume')}
        />
      </main>
      <Footer
        copyright={t('footer.copyright')}
        rights={t('footer.rights')}
      />
    </>
  )
}
