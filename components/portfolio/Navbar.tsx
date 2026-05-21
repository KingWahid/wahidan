'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/portfolio/ThemeToggle'
import { LanguageToggle } from '@/components/portfolio/LanguageToggle'
import { useTranslation } from '@/contexts/LanguageContext'
import { navLinks } from '@/lib/data'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <nav className="px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-bold text-lg text-foreground hover:text-accent-portfolio transition-colors"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          Wahidan.
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {t(link.labelKey)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border last:border-0"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {t(link.labelKey)}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
