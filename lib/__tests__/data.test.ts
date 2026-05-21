import {
  formatDateRange,
  getStatusBadgeProps,
  sortExperiences,
  buildPageTitle,
  toggleTheme,
} from '@/lib/data'
import type { Experience } from '@/lib/data'

// ============================================================================
// 25.1 formatDateRange
// ============================================================================
describe('formatDateRange', () => {
  it('contains startDate in output', () => {
    expect(formatDateRange('Jan 2022', 'Dec 2023')).toContain('Jan 2022')
  })

  it('contains endDate when endDate is a string', () => {
    expect(formatDateRange('Jan 2022', 'Dec 2023')).toContain('Dec 2023')
  })

  it('contains "Present" when endDate is null', () => {
    expect(formatDateRange('Jan 2022', null)).toContain('Present')
  })

  it('does not contain "Present" when endDate is a string', () => {
    expect(formatDateRange('Jan 2022', 'Dec 2023')).not.toContain('Present')
  })

  it('returns non-empty string for any valid input', () => {
    expect(formatDateRange('2020', null).length).toBeGreaterThan(0)
    expect(formatDateRange('2020', '2021').length).toBeGreaterThan(0)
  })
})

// ============================================================================
// 25.2 getStatusBadgeProps
// ============================================================================
describe('getStatusBadgeProps', () => {
  it('Live status returns className containing accent-portfolio', () => {
    const props = getStatusBadgeProps('Live')
    expect(props.className).toContain('accent-portfolio')
  })

  it('Dev status returns className NOT containing accent-portfolio', () => {
    const props = getStatusBadgeProps('Dev')
    expect(props.className).not.toContain('accent-portfolio')
  })

  it('Live and Dev return different classNames', () => {
    const liveProps = getStatusBadgeProps('Live')
    const devProps = getStatusBadgeProps('Dev')
    expect(liveProps.className).not.toBe(devProps.className)
  })

  it('returns an object with className property', () => {
    expect(getStatusBadgeProps('Live')).toHaveProperty('className')
    expect(getStatusBadgeProps('Dev')).toHaveProperty('className')
  })
})

// ============================================================================
// 25.3 sortExperiences
// ============================================================================
describe('sortExperiences', () => {
  const mockExperiences: Experience[] = [
    { id: 'old', company: 'Old Co', positionKey: 'pos', startDate: '2019', endDate: '2020' },
    { id: 'recent', company: 'Recent Co', positionKey: 'pos', startDate: '2021', endDate: '2022' },
    { id: 'current', company: 'Current Co', positionKey: 'pos', startDate: '2023', endDate: null },
  ]

  it('places current job (endDate: null) at index 0', () => {
    const sorted = sortExperiences(mockExperiences)
    expect(sorted[0].endDate).toBeNull()
  })

  it('does not mutate the original array', () => {
    const original = [...mockExperiences]
    sortExperiences(mockExperiences)
    expect(mockExperiences).toEqual(original)
  })

  it('returns all items', () => {
    const sorted = sortExperiences(mockExperiences)
    expect(sorted).toHaveLength(mockExperiences.length)
  })

  it('sorts remaining items by startDate descending', () => {
    const sorted = sortExperiences(mockExperiences)
    // After current (index 0), recent (2021) should come before old (2019)
    const nonCurrent = sorted.filter(e => e.endDate !== null)
    expect(nonCurrent[0].startDate >= nonCurrent[1].startDate).toBe(true)
  })
})

// ============================================================================
// 25.4 buildPageTitle
// ============================================================================
describe('buildPageTitle', () => {
  it('contains name in output', () => {
    expect(buildPageTitle('Alice', 'Developer')).toContain('Alice')
  })

  it('contains profession in output', () => {
    expect(buildPageTitle('Alice', 'Developer')).toContain('Developer')
  })

  it('returns non-empty string for non-empty inputs', () => {
    expect(buildPageTitle('Alice', 'Developer').length).toBeGreaterThan(0)
  })

  it('different names produce different titles', () => {
    expect(buildPageTitle('Alice', 'Dev')).not.toBe(buildPageTitle('Bob', 'Dev'))
  })
})

// ============================================================================
// 25.5 toggleTheme
// ============================================================================
describe('toggleTheme', () => {
  it('dark → light', () => {
    expect(toggleTheme('dark')).toBe('light')
  })

  it('light → dark', () => {
    expect(toggleTheme('light')).toBe('dark')
  })

  it('result is always different from input', () => {
    expect(toggleTheme('dark')).not.toBe('dark')
    expect(toggleTheme('light')).not.toBe('light')
  })

  it('result is always a valid theme value', () => {
    const validThemes = ['dark', 'light']
    expect(validThemes).toContain(toggleTheme('dark'))
    expect(validThemes).toContain(toggleTheme('light'))
  })
})
