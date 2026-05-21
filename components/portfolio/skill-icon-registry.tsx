import type { ComponentType } from 'react'
import { Icon } from '@iconify/react'
import { GinGonicIcon } from '@/components/portfolio/official-svgs/gin-gonic'
import { JotaiIcon } from '@/components/portfolio/official-svgs/jotai'
import { EchoIcon } from '@/components/portfolio/official-svgs/echo'
import { BlocIcon } from '@/components/portfolio/official-svgs/bloc'

export type SkillIconConfig =
  | { type: 'iconify'; icon: string }
  | { type: 'component'; Component: ComponentType<{ className?: string }> }

/** Dark logos that need a white tile in dark mode */
export const skillIconWhiteBgInDark = new Set(['express', 'gin', 'github', 'pandas', 'jupyter', 'scikitlearn'])

export function getSkillIconContainerClass(skillId: string): string {
  return skillIconWhiteBgInDark.has(skillId)
    ? 'bg-white'
    : 'bg-white dark:bg-zinc-900'
}

export const skillIconRegistry: Record<string, SkillIconConfig> = {
  // Language
  html: { type: 'iconify', icon: 'devicon:html5' },
  css: { type: 'iconify', icon: 'devicon:css3' },
  javascript: { type: 'iconify', icon: 'devicon:javascript' },
  typescript: { type: 'iconify', icon: 'devicon:typescript' },
  java: { type: 'iconify', icon: 'devicon:java' },
  go: { type: 'iconify', icon: 'devicon:go' },
  dart: { type: 'iconify', icon: 'devicon:dart' },
  python: { type: 'iconify', icon: 'devicon:python' },
  // Frontend
  react: { type: 'iconify', icon: 'devicon:react' },
  nextjs: { type: 'iconify', icon: 'devicon:nextjs' },
  // Mobile
  flutter: { type: 'iconify', icon: 'devicon:flutter' },
  // Styling
  tailwind: { type: 'iconify', icon: 'devicon:tailwindcss' },
  bootstrap: { type: 'iconify', icon: 'devicon:bootstrap' },
  shadcn: { type: 'iconify', icon: 'simple-icons:shadcnui' },
  sass: { type: 'iconify', icon: 'devicon:sass' },
  scss: { type: 'iconify', icon: 'devicon:sass' },
  // State
  contextapi: { type: 'iconify', icon: 'devicon:react' },
  zustand: { type: 'iconify', icon: 'devicon:zustand' },
  jotai: { type: 'component', Component: JotaiIcon },
  redux: { type: 'iconify', icon: 'devicon:redux' },
  bloc: { type: 'component', Component: BlocIcon },
  // Backend
  restapi: { type: 'iconify', icon: 'carbon:api' },
  express: { type: 'iconify', icon: 'devicon:express' },
  gin: { type: 'component', Component: GinGonicIcon },
  echo: { type: 'component', Component: EchoIcon },
  redis: { type: 'iconify', icon: 'devicon:redis' },
  redisstream: { type: 'iconify', icon: 'devicon:redis' },
  mqtt: { type: 'iconify', icon: 'simple-icons:mqtt' },
  docker: { type: 'iconify', icon: 'devicon:docker' },
  postgresql: { type: 'iconify', icon: 'devicon:postgresql' },
  mysql: { type: 'iconify', icon: 'devicon:mysql' },
  // Tools
  git: { type: 'iconify', icon: 'devicon:git' },
  github: { type: 'iconify', icon: 'devicon:github' },
  // Design
  figma: { type: 'iconify', icon: 'devicon:figma' },
  // Machine Learning
  anaconda: { type: 'iconify', icon: 'devicon:anaconda' },
  jupyter: { type: 'iconify', icon: 'devicon:jupyter' },
  numpy: { type: 'iconify', icon: 'devicon:numpy' },
  pandas: { type: 'iconify', icon: 'devicon:pandas' },
  scikitlearn: { type: 'iconify', icon: 'devicon:scikitlearn' },
  tensorflow: { type: 'iconify', icon: 'devicon:tensorflow' },
}

interface SkillIconProps {
  skillId: string
  className?: string
}

export function SkillIcon({ skillId, className = 'size-6' }: SkillIconProps) {
  const config = skillIconRegistry[skillId]

  if (!config) {
    return <div className={className} aria-hidden />
  }

  if (config.type === 'iconify') {
    return <Icon icon={config.icon} className={className} aria-hidden />
  }

  const { Component } = config
  return <Component className={className} />
}
