'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ExperiencePageContent } from '@/components/portfolio/ExperiencePageContent'

export default function ExperiencePage() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <ExperiencePageContent />
      <Footer
        copyright={t('footer.copyright')}
        rights={t('footer.rights')}
      />
    </>
  )
}
