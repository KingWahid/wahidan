'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Skill } from '@/lib/data'
import { SkillIcon, getSkillIconContainerClass } from '@/components/portfolio/skill-icon-registry'

interface SkillCardProps {
  skill: Skill
  variant?: 'default' | 'compact'
}

export function SkillCard({ skill, variant = 'default' }: SkillCardProps) {
  const categoryLabel: Record<string, string> = {
    language: 'LANGUAGE',
    framework: 'FRONTEND',
    tool: 'TOOL',
    styling: 'STYLING',
    mobile: 'MOBILE',
    state: 'STATE',
    backend: 'BACKEND',
    design: 'DESIGN',
    ml: 'ML',
  }

  const isCompact = variant === 'compact'

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Card className={cn(
        'flex flex-col items-center justify-center gap-0 cursor-default',
        'border transition-colors duration-200 shadow-sm',
        'bg-white border-zinc-200 shadow-zinc-200/50',
        'dark:bg-[#10151c] dark:border-zinc-800 dark:shadow-black/50',
        'hover:border-accent-portfolio/50 hover:bg-zinc-50 dark:hover:bg-[#141a22]',
        isCompact ? 'p-4 min-h-[120px]' : 'p-5 min-h-[140px]'
      )}>
        <CardContent className={cn('flex flex-col items-center p-0 w-full text-center', isCompact ? 'gap-2.5' : 'gap-3')}>
          <div className={cn('size-10 rounded-lg flex items-center justify-center', getSkillIconContainerClass(skill.id))}>
            <SkillIcon skillId={skill.id} className="size-6" />
          </div>
          <p
            className={cn(
              'font-semibold text-foreground',
              isCompact ? 'text-xs' : 'text-sm'
            )}
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {skill.name}
          </p>
          {!isCompact && (
            <p
              className="text-[10px] font-medium text-muted-foreground dark:text-zinc-400 tracking-widest uppercase mt-0.5"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {categoryLabel[skill.category] ?? skill.category.toUpperCase()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
