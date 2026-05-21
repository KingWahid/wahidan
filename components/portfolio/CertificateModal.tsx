'use client'

import { useEffect, useCallback } from 'react'
import { X, Download, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certificateUrl: string
  title: string
  company: string
}

export function CertificateModal({
  isOpen,
  onClose,
  certificateUrl,
  title,
  company,
}: CertificateModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${title} at ${company}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className="pointer-events-auto w-full max-w-4xl flex flex-col rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-[#0d1117] shadow-2xl overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 2rem)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold text-accent-portfolio uppercase tracking-widest truncate"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    Certificate
                  </p>
                  <h2
                    className="text-base font-bold text-foreground truncate"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    {title} — {company}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Download button */}
                  <a
                    href={certificateUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:bg-zinc-700/60 dark:hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    aria-label="Download certificate"
                  >
                    <Download className="size-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  {/* Open in new tab */}
                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 border border-zinc-200 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:bg-zinc-700/60 dark:hover:text-white transition-colors"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    aria-label="Open certificate in new tab"
                  >
                    <ExternalLink className="size-3.5" />
                    <span className="hidden sm:inline">Open</span>
                  </a>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center size-8 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Close certificate modal"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* PDF viewer */}
              <div className="flex-1 overflow-hidden bg-zinc-100 dark:bg-zinc-950 min-h-0">
                <iframe
                  src={`${certificateUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full"
                  style={{ minHeight: '60vh' }}
                  title={`Certificate: ${title} at ${company}`}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
