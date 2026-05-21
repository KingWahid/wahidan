import { skills, projects, socialLinks } from '@/lib/data'
import { skillIconRegistry } from '@/components/portfolio/skill-icon-registry'

const VALID_SKILL_CATEGORIES = ['language', 'framework', 'mobile', 'tool', 'styling', 'state', 'backend', 'design'] as const
const VALID_PROJECT_STATUSES = ['Live', 'Dev'] as const

// ============================================================================
// 26.1 skills array validation
// ============================================================================
describe('skills data validation', () => {
  it('has at least 8 skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(8)
  })

  it('every skill has a unique id', () => {
    const ids = skills.map(s => s.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('every skill has a non-empty name', () => {
    skills.forEach(skill => {
      expect(skill.name.trim().length).toBeGreaterThan(0)
    })
  })

  it('every skill has a registered icon', () => {
    skills.forEach(skill => {
      expect(skillIconRegistry[skill.id]).toBeDefined()
    })
  })

  it('every skill has a valid category', () => {
    skills.forEach(skill => {
      expect(VALID_SKILL_CATEGORIES).toContain(skill.category)
    })
  })

  it('includes required technologies', () => {
    const names = skills.map(s => s.name)
    const required = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Next.js', 'Flutter', 'Python']
    required.forEach(tech => {
      expect(names).toContain(tech)
    })
  })
})

// ============================================================================
// 26.2 projects array validation
// ============================================================================
describe('projects data validation', () => {
  it('has at least 4 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(4)
  })

  it('every project has a non-empty name', () => {
    projects.forEach(project => {
      expect(project.name.trim().length).toBeGreaterThan(0)
    })
  })

  it('every project has a non-empty descriptionKey', () => {
    projects.forEach(project => {
      expect(project.descriptionKey.trim().length).toBeGreaterThan(0)
    })
  })

  it('every project has a non-empty techStack', () => {
    projects.forEach(project => {
      expect(project.techStack.length).toBeGreaterThan(0)
    })
  })

  it('every project has a valid status', () => {
    projects.forEach(project => {
      expect(VALID_PROJECT_STATUSES).toContain(project.status)
    })
  })

  it('every project has at least one URL (repoUrl or liveUrl)', () => {
    projects.forEach(project => {
      const hasUrl = Boolean(project.repoUrl) || Boolean(project.liveUrl)
      expect(hasUrl).toBe(true)
    })
  })

  it('every project has a unique id', () => {
    const ids = projects.map(p => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

// ============================================================================
// 26.3 socialLinks array validation
// ============================================================================
describe('socialLinks data validation', () => {
  it('has at least one social link', () => {
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  it('every link has a valid URL starting with http', () => {
    socialLinks.forEach(link => {
      expect(link.url.startsWith('http')).toBe(true)
    })
  })

  it('every link has a non-empty label for aria-label', () => {
    socialLinks.forEach(link => {
      expect(link.label.trim().length).toBeGreaterThan(0)
    })
  })

  it('every link has a valid platform value', () => {
    const validPlatforms = ['github', 'linkedin', 'twitter', 'instagram', 'email']
    socialLinks.forEach(link => {
      expect(validPlatforms).toContain(link.platform)
    })
  })
})
