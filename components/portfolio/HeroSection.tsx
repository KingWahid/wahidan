'use client'

import { ArrowRight, Download, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { SocialLinks } from '@/components/portfolio/SocialLinks'
import { ownerInfo } from '@/lib/data'
import { cn } from '@/lib/utils'
import { fadeUp, slideInRight, staggerContainer } from '@/lib/animations'

const heroCardClass =
  'border shadow-sm bg-white border-zinc-200 shadow-zinc-200/50 dark:bg-[#10151c] dark:border-zinc-800 dark:shadow-black/50'

interface HeroSectionProps {
  greeting: string
  profession: string
  bio: string
  ctaWork: string
  ctaResume: string
  t: (key: string) => string
}

export function HeroSection({ greeting, profession, bio, ctaWork, ctaResume, t }: HeroSectionProps) {
  const initials = ownerInfo.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 px-8 md:px-16 relative">
      {/* Vertical divider — desktop only, full height, close to card */}
      <div className="hidden md:block absolute top-0 bottom-0 w-px bg-border" style={{ left: 'calc(50% + 220px)' }} />
      <div className="max-w-6xl mx-auto w-full py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">

          {/* Left: Text content — stagger children */}
          <motion.div
            className="flex flex-col gap-3 text-center md:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div variants={fadeUp}>
              <p className="text-sm font-medium text-accent-portfolio tracking-wider mb-3 font-space-mono flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent-portfolio animate-pulse inline-block" />
                {t('hero.available')}
              </p>
              <p className="text-xs font-bold text-muted-foreground tracking-[0.3em] mb-4 font-jetbrains-mono">
                {t('hero.role.label')}
              </p>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
              >
                <span className="block text-foreground">{greeting},</span>
                <span className="block text-foreground">Wahidan</span>
                <span
                  className="block"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '2px var(--color-accent-portfolio)',
                  }}
                >
                  Nashrullah
                </span>
              </h1>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-muted-foreground text-base leading-relaxed max-w-lg mx-auto md:mx-0"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              variants={fadeUp}
            >
              {bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center md:justify-start mt-2"
              variants={fadeUp}
            >
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-accent-portfolio text-black hover:bg-accent-portfolio/90 font-normal text-sm px-6 py-2.5 rounded-md transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {ctaWork}
                <ArrowRight className="size-4" />
              </a>
              <a
                href={ownerInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-normal text-sm px-6 py-2.5 rounded-md transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                <Download className="size-4" />
                {ctaResume}
              </a>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="flex flex-col gap-1.5 mt-2"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              variants={fadeUp}
            >
              <a
                href="mailto:wahidann765@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-portfolio transition-colors justify-center md:justify-start"
              >
                <Mail className="size-4 shrink-0" />
                wahidann765@gmail.com
              </a>
              <a
                href="tel:+6285669170171"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-portfolio transition-colors justify-center md:justify-start"
              >
                <Phone className="size-4 shrink-0" />
                +62 85669170171
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                <MapPin className="size-4 shrink-0" />
                Bandung, Indonesia
              </span>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp}>
              <SocialLinks className="justify-center md:justify-start" />
            </motion.div>
          </motion.div>

          {/* Right: Profile Card — slides in from right */}
          <motion.div
            className="flex justify-center md:justify-end md:-mt-20"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
          >
            <div className={cn('relative w-72 rounded-3xl p-6 flex flex-col items-center gap-4', heroCardClass)}>
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-accent-portfolio" />

              {/* Profile photo with outer ring */}
              <div className="relative mt-2 mb-8">
                {/* Static outer ring */}
                <div className="absolute rounded-full border border-accent-portfolio/30"
                  style={{ inset: '-16px' }}
                />
                {/* Orbit wrapper */}
                <div
                  className="absolute rounded-full"
                  style={{ inset: '-16px', animation: 'orbit 25s linear infinite' }}
                >
                  <span
                    className="absolute size-3 rounded-full bg-accent-portfolio border-2 border-white dark:border-[#10151c]"                    style={{ top: '-4px', left: '50%', transform: 'translateX(-50%)' }}
                  />
                </div>
                <Avatar className="size-40 ring-2 ring-accent-portfolio">
                  <AvatarImage
                    src={ownerInfo.profileImageUrl}
                    alt={`${ownerInfo.name} profile photo`}
                  />
                  <AvatarFallback className="text-3xl font-bold bg-accent-portfolio/10 text-accent-portfolio">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Name & profession */}
              <div className="text-center">
                <p className="font-bold text-foreground text-lg" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                  Wahidan Nashrullah
                </p>
                <p className="text-sm text-muted-foreground mt-0.5" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  Fullstack Developer · Bandung, ID
                </p>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['React.js', 'Next.js', 'Flutter', 'Go', 'Tailwind', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className={cn('px-3 py-1 rounded-full text-sm text-muted-foreground dark:text-zinc-400', heroCardClass)}
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
