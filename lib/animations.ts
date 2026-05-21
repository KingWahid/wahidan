import type { Variants } from 'framer-motion'

/** Fade up — used for most section content */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Fade in — no movement, used for subtle reveals */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

/** Slide in from the right — used for the hero profile card */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Slide in from the left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Stagger container — wraps children that use fadeUp / fadeIn.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container with a slightly longer delay — for page-level sections */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
}

/** Scale-up on hover — used for cards */
export const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.25, ease: 'easeOut' } },
}

/** Shared viewport config — trigger once when 20 % of element is visible */
export const viewport = { once: true, amount: 0.2 } as const
