import type { Variants } from 'framer-motion'

/** Fade up — pass `custom={index}` on the child for stagger delays */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  }),
}

/** Slide in from the left — pass `custom={index}` for stagger delays */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
}

/** Stagger container — drives staggerChildren on child variants */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

/** Scale pop — badge / icon entrance with backOut spring */
export const scalePop: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
}
