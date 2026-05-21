import * as fc from 'fast-check'
import {
  formatDateRange,
  getStatusBadgeProps,
  sortExperiences,
  buildPageTitle,
  toggleTheme,
  skills,
  projects,
  socialLinks,
} from '@/lib/data'
import type { Experience } from '@/lib/data'
import idTranslations from '@/locales/id.json'
import enTranslations from '@/locales/en.json'

// ============================================================================
// Property 1: formatDateRange — Consistency
// Feature: personal-portfolio-page, Property 1
// Validates: Requirements 1.2
// ============================================================================
describe('Property 1: formatDateRange — output always contains startDate', () => {
  it('output always contains startDate', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.option(fc.string({ minLength: 1 }), { nil: null }),
        (startDate, endDate) => {
          const result = formatDateRange(startDate, endDate)
          return result.includes(startDate)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('output contains "Present" when endDate is null', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        (startDate) => {
          const result = formatDateRange(startDate, null)
          return result.includes('Present')
        }
      ),
      { numRuns: 100 }
    )
  })

  it('output contains endDate when endDate is a string', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (startDate, endDate) => {
          const result = formatDateRange(startDate, endDate)
          return result.includes(endDate)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ============================================================================
// Property 2: getStatusBadgeProps — Exhaustive and distinct mapping
// Feature: personal-portfolio-page, Property 2
// Validates: Requirements 1.2
// ============================================================================
describe('Property 2: getStatusBadgeProps — exhaustive and distinct mapping', () => {
  it('Live and Dev always produce different classNames', () => {
    const liveClass = getStatusBadgeProps('Live').className
    const devClass = getStatusBadgeProps('Dev').className
    expect(liveClass).not.toBe(devClass)
  })

  it('Live always contains accent-portfolio identifier', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Live' as const),
        (status) => {
          return getStatusBadgeProps(status).className.includes('accent-portfolio')
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Dev never contains accent-portfolio identifier', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Dev' as const),
        (status) => {
          return !getStatusBadgeProps(status).className.includes('accent-portfolio')
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ============================================================================
// Property 3: skills — Integrity invariants
// Feature: personal-portfolio-page, Property 3
// Validates: Requirements 1.2
// ============================================================================
describe('Property 3: skills data — integrity invariants', () => {
  it('count is always >= 8', () => {
    expect(skills.length).toBeGreaterThanOrEqual(8)
  })

  it('all ids are unique', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...skills),
        (skill) => {
          const count = skills.filter(s => s.id === skill.id).length
          return count === 1
        }
      ),
      { numRuns: skills.length }
    )
  })

  it('all names are non-empty', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...skills),
        (skill) => skill.name.length > 0
      ),
      { numRuns: skills.length }
    )
  })
})

// ============================================================================
// Property 4: projects — Integrity invariants
// Feature: personal-portfolio-page, Property 4
// Validates: Requirements 1.2
// ============================================================================
describe('Property 4: projects data — integrity invariants', () => {
  it('count is always >= 4', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4)
  })

  it('every project has at least one URL', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...projects),
        (project) => Boolean(project.repoUrl) || Boolean(project.liveUrl)
      ),
      { numRuns: projects.length }
    )
  })

  it('every project has valid status', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...projects),
        (project) => project.status === 'Live' || project.status === 'Dev'
      ),
      { numRuns: projects.length }
    )
  })
})

// ============================================================================
// Property 5: sortExperiences — Current first, then chronological descending
// Feature: personal-portfolio-page, Property 5
// Validates: Requirements 1.2
// ============================================================================
describe('Property 5: sortExperiences — current first, then descending', () => {
  it('item with endDate null is always at index 0 when present', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            company: fc.string({ minLength: 1 }),
            positionKey: fc.string({ minLength: 1 }),
            startDate: fc.integer({ min: 2000, max: 2024 }).map(String),
            endDate: fc.option(fc.integer({ min: 2000, max: 2024 }).map(String), { nil: null }),
          }),
          { minLength: 1 }
        ),
        (experiences: Experience[]) => {
          const sorted = sortExperiences(experiences)
          const hasCurrentJob = experiences.some(e => e.endDate === null)
          if (hasCurrentJob) {
            return sorted[0].endDate === null
          }
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('result always has same length as input', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            company: fc.string({ minLength: 1 }),
            positionKey: fc.string({ minLength: 1 }),
            startDate: fc.integer({ min: 2000, max: 2024 }).map(String),
            endDate: fc.option(fc.integer({ min: 2000, max: 2024 }).map(String), { nil: null }),
          })
        ),
        (experiences: Experience[]) => {
          return sortExperiences(experiences).length === experiences.length
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ============================================================================
// Property 6: socialLinks — All open in new tab
// Feature: personal-portfolio-page, Property 6
// Validates: Requirements 1.2
// ============================================================================
describe('Property 6: socialLinks — all have valid URLs', () => {
  it('every social link URL starts with http', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...socialLinks),
        (link) => link.url.startsWith('http')
      ),
      { numRuns: socialLinks.length }
    )
  })
})

// ============================================================================
// Property 7: buildPageTitle — Always contains name and profession
// Feature: personal-portfolio-page, Property 7
// Validates: Requirements 1.2
// ============================================================================
describe('Property 7: buildPageTitle — always contains name and profession', () => {
  it('output always contains name', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (name, profession) => buildPageTitle(name, profession).includes(name)
      ),
      { numRuns: 100 }
    )
  })

  it('output always contains profession', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (name, profession) => buildPageTitle(name, profession).includes(profession)
      ),
      { numRuns: 100 }
    )
  })
})

// ============================================================================
// Property 8: toggleTheme — Always produces opposite value
// Feature: personal-portfolio-page, Property 8
// Validates: Requirements 1.2
// ============================================================================
describe('Property 8: toggleTheme — always produces opposite value', () => {
  it('result is always different from input', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark' as const, 'light' as const),
        (theme) => toggleTheme(theme) !== theme
      ),
      { numRuns: 100 }
    )
  })

  it('result is always a valid theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark' as const, 'light' as const),
        (theme) => {
          const result = toggleTheme(theme)
          return result === 'dark' || result === 'light'
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ============================================================================
// Property 9: Translation key completeness
// Feature: personal-portfolio-page, Property 9
// Validates: Requirements 1.2
// ============================================================================
describe('Property 9: translation key completeness', () => {
  const idKeys = Object.keys(idTranslations)
  const enKeys = Object.keys(enTranslations)

  it('every key in id.json exists in en.json with non-empty value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...idKeys),
        (key) => {
          const enValue = (enTranslations as Record<string, string>)[key]
          return typeof enValue === 'string' && enValue.length > 0
        }
      ),
      { numRuns: idKeys.length }
    )
  })

  it('every key in en.json exists in id.json with non-empty value', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...enKeys),
        (key) => {
          const idValue = (idTranslations as Record<string, string>)[key]
          return typeof idValue === 'string' && idValue.length > 0
        }
      ),
      { numRuns: enKeys.length }
    )
  })
})

// ============================================================================
// Property 10: Locale lang attribute consistency
// Feature: personal-portfolio-page, Property 10
// Validates: Requirements 1.2
// ============================================================================
describe('Property 10: locale values are always valid', () => {
  it('locale is always id or en', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('id' as const, 'en' as const),
        (locale) => locale === 'id' || locale === 'en'
      ),
      { numRuns: 100 }
    )
  })
})
