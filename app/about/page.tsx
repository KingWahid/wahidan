'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { AboutPageContent } from '@/components/portfolio/AboutPageContent'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <AboutPageContent />
      <Footer
        copyright={t('footer.copyright')}
        rights={t('footer.rights')}
      />
    </>
  )
}
