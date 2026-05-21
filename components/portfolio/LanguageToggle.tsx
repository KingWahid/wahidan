'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation, type Locale } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation()

  const languages: { value: Locale; label: string; labelKey: string }[] = [
    { value: 'id', label: 'ID', labelKey: 'language.id' },
    { value: 'en', label: 'EN', labelKey: 'language.en' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="w-14 font-medium"
            aria-label={t('language.toggle')}
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          />
        }
      >
        {locale.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLocale(lang.value)}
            className="flex items-center justify-between gap-2 px-4 py-2.5 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {t(lang.labelKey)}
            {locale === lang.value && <Check className="size-3.5 text-accent-portfolio" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
