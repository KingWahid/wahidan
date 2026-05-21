'use client'

import { useTranslation } from '@/contexts/LanguageContext'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ContactPageContent } from '@/components/portfolio/ContactPageContent'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <Navbar />
      <ContactPageContent />
      <Footer
        copyright={t('footer.copyright')}
        rights={t('footer.rights')}
      />
    </>
  )
}
