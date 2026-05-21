import { formatDateRange } from '@/lib/data'
import type { Experience } from '@/lib/data'

interface ExperienceItemProps {
  experience: Experience
  isLast: boolean
  t: (key: string) => string
}

export function ExperienceItem({ experience, t }: ExperienceItemProps) {
  const isCurrent = experience.endDate === null

  return (
    <div className={[
      'flex items-start gap-4 p-5 rounded-xl',
      'border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]',
      'transition-colors duration-200 hover:border-accent-portfolio/40',
    ].join(' ')}>
      {/* Dot */}
      <div className="mt-1 shrink-0 size-2.5 rounded-full bg-accent-portfolio shadow-[0_0_6px_theme(colors.accent-portfolio)]" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="font-bold text-base text-foreground"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          {t(experience.positionKey)}
        </p>
        <p
          className="text-sm font-semibold text-accent-portfolio mt-0.5"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          {experience.company}
        </p>
        <p
          className="text-xs text-zinc-500 mt-1"          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {formatDateRange(experience.startDate, experience.endDate)}
        </p>
      </div>

      {/* Current badge */}
      {isCurrent && (
        <span
          className="shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent-portfolio/15 text-accent-portfolio border border-accent-portfolio/30"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {t('experience.badge.current')}
        </span>
      )}
    </div>
  )
}
