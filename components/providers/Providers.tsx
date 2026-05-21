'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/contexts/LanguageContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
