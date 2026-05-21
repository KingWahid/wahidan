'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/LanguageContext'
import { socialLinks } from '@/lib/data'
import { fadeUp, slideInRight, staggerContainer, viewport } from '@/lib/animations'
import { SocialLinks } from '@/components/portfolio/SocialLinks'

const contactCardClass =
  'flex items-center gap-4 p-4 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]'

const inputClass =
  'w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-zinc-400 focus:outline-none focus:border-accent-portfolio/60 transition-colors dark:bg-[#0d1117] dark:border-zinc-800 dark:placeholder:text-zinc-500'

export function ContactPageContent() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/wahidann765@gmail.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _captcha: 'false',
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <motion.div
          className="mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            variants={fadeUp}
          >
            {t('contact.label')}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            variants={fadeUp}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            variants={fadeUp}
          >
            {t('contact.description')}
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14 items-start">

          {/* Left: contact info + social */}
          <motion.div
            className="flex flex-col gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {/* Email */}
            <motion.div className={contactCardClass} variants={fadeUp}>
              <div className="shrink-0 size-10 rounded-lg bg-accent-portfolio/15 border border-accent-portfolio/25 flex items-center justify-center text-accent-portfolio">
                <Mail className="size-5" />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {t('about.contact.email.label')}
                </p>
                <a
                  href="mailto:wahidann765@gmail.com"
                  className="text-sm font-medium text-foreground hover:text-accent-portfolio transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  wahidann765@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div className={contactCardClass} variants={fadeUp}>
              <div className="shrink-0 size-10 rounded-lg bg-accent-portfolio/15 border border-accent-portfolio/25 flex items-center justify-center text-accent-portfolio">
                <Phone className="size-5" />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {t('about.contact.phone.label')}
                </p>
                <a
                  href="tel:+6285669170171"
                  className="text-sm font-medium text-foreground hover:text-accent-portfolio transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  +62 85669170171
                </a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div className={contactCardClass} variants={fadeUp}>
              <div className="shrink-0 size-10 rounded-lg bg-accent-portfolio/15 border border-accent-portfolio/25 flex items-center justify-center text-accent-portfolio">
                <MapPin className="size-5" />
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {t('about.contact.location.label')}
                </p>
                <p
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Bandung, Indonesia
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div className="mt-2" variants={fadeUp}>
              <p
                className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-3"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {t('contact.find.me')}
              </p>
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117] p-6 flex flex-col gap-4"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.name')}
                  className={inputClass}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.email')}
                  className={inputClass}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder={t('contact.form.subject')}
                className={inputClass}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              />

              {/* Message */}
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={t('contact.form.message')}
                className={`${inputClass} resize-none`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              />

              {/* Status message */}
              {status === 'success' && (
                <p className="text-sm text-accent-portfolio" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {t('contact.form.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {t('contact.form.error')}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-portfolio text-black text-sm font-normal hover:bg-accent-portfolio/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                {status !== 'sending' && <Send className="size-4" />}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
