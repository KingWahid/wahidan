'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import idTranslations from '@/locales/id.json'
import enTranslations from '@/locales/en.json'

export type Locale = 'id' | 'en'

type Translations = Record<string, string>

const translations: Record<Locale, Translations> = {
  id: idTranslations,
  en: enTranslations,
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'id',
  setLocale: () => {},
  t: (key: string) => key,
})

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'id'
  const saved = localStorage.getItem('portfolio-locale')
  if (saved === 'id' || saved === 'en') return saved
  return 'id'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read from localStorage only on client after mount
    setLocaleState(getInitialLocale())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.lang = locale
    localStorage.setItem('portfolio-locale', locale)
  }, [locale, mounted])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
  }

  // Use correct locale for translation — before mount always use stored value
  // but since we can't know it server-side, we suppress flash by using
  // the locale state which will be correct after the first useEffect fires
  const t = (key: string): string => {
    return translations[locale]?.[key] ?? translations['id']?.[key] ?? key
  }

  // Prevent hydration mismatch: render children with a visibility trick
  // so layout is preserved but text doesn't flash
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      <div style={mounted ? undefined : { visibility: 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
