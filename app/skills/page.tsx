'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { SkillsPageContent } from '@/components/portfolio/SkillsPageContent'

export default function SkillsPage() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <SkillsPageContent />
      <Footer
        copyright={t('footer.copyright')}
        rights={t('footer.rights')}
      />
    </>
  )
}
