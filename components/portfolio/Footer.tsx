import { SocialLinks } from '@/components/portfolio/SocialLinks'
import { ownerInfo } from '@/lib/data'

interface FooterProps {
  copyright: string
  rights: string
}

export function Footer({ copyright, rights }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-8 md:px-32 bg-zinc-100/80 dark:bg-zinc-900/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          {copyright} {year} {ownerInfo.name}. {rights}
        </p>
        <SocialLinks />
      </div>
    </footer>
  )
}
