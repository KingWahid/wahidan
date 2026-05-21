import idTranslations from '@/locales/id.json'
import enTranslations from '@/locales/en.json'

type Locale = 'id' | 'en'
type Translations = Record<string, string>

// Replicate the t() function logic from LanguageContext for isolated testing
function createT(locale: Locale) {
  const translations: Record<Locale, Translations> = {
    id: idTranslations,
    en: enTranslations,
  }
  return (key: string): string => {
    return translations[locale]?.[key] ?? translations['id']?.[key] ?? key
  }
}

// ============================================================================
// 27.1 t() function behavior
// ============================================================================
describe('t() translation function', () => {
  it('returns correct translation for id locale', () => {
    const t = createT('id')
    expect(t('nav.about')).toBe(idTranslations['nav.about'])
  })

  it('returns correct translation for en locale', () => {
    const t = createT('en')
    expect(t('nav.about')).toBe(enTranslations['nav.about'])
  })

  it('returns the key itself when key does not exist in any locale', () => {
    const t = createT('id')
    expect(t('nonexistent.key.xyz')).toBe('nonexistent.key.xyz')
  })

  it('id and en translations for same key are different (for translatable keys)', () => {
    const tId = createT('id')
    const tEn = createT('en')
    // nav.about should differ between locales
    expect(tId('nav.about')).not.toBe(tEn('nav.about'))
  })

  it('returns non-empty string for all known keys in id locale', () => {
    const t = createT('id')
    Object.keys(idTranslations).forEach(key => {
      expect(t(key).length).toBeGreaterThan(0)
    })
  })

  it('returns non-empty string for all known keys in en locale', () => {
    const t = createT('en')
    Object.keys(enTranslations).forEach(key => {
      expect(t(key).length).toBeGreaterThan(0)
    })
  })
})

// ============================================================================
// 27.2 Translation key completeness
// ============================================================================
describe('translation key completeness', () => {
  const idKeys = Object.keys(idTranslations)
  const enKeys = Object.keys(enTranslations)

  it('id.json and en.json have the same number of keys', () => {
    expect(idKeys.length).toBe(enKeys.length)
  })

  it('every key in id.json exists in en.json', () => {
    idKeys.forEach(key => {
      expect(enKeys).toContain(key)
    })
  })

  it('every key in en.json exists in id.json', () => {
    enKeys.forEach(key => {
      expect(idKeys).toContain(key)
    })
  })

  it('every value in id.json is non-empty', () => {
    Object.entries(idTranslations).forEach(([key, value]) => {
      expect(value.trim().length, `id.json key "${key}" is empty`).toBeGreaterThan(0)
    })
  })

  it('every value in en.json is non-empty', () => {
    Object.entries(enTranslations).forEach(([key, value]) => {
      expect(value.trim().length, `en.json key "${key}" is empty`).toBeGreaterThan(0)
    })
  })

  it('has all required navigation keys', () => {
    const requiredKeys = ['nav.about', 'nav.skills', 'nav.projects', 'nav.experience', 'nav.contact']
    requiredKeys.forEach(key => {
      expect(idKeys).toContain(key)
      expect(enKeys).toContain(key)
    })
  })

  it('has all required hero keys', () => {
    const requiredKeys = ['hero.greeting', 'hero.profession', 'hero.bio', 'hero.cta.work', 'hero.cta.resume']
    requiredKeys.forEach(key => {
      expect(idKeys).toContain(key)
      expect(enKeys).toContain(key)
    })
  })
})
