import type { Transition, Variants } from 'framer-motion';

/**
 * Unified motion curves and durations following unslop & framer-motion-animator tokens.
 * GPU-accelerated properties only (opacity, transform).
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const TRANSITIONS = {
  fast: {
    type: 'tween',
    duration: 0.16,
    ease: EASE_OUT,
  } satisfies Transition,
  base: {
    type: 'tween',
    duration: 0.28,
    ease: EASE_OUT,
  } satisfies Transition,
  enter: {
    type: 'tween',
    duration: 0.4,
    ease: EASE_OUT,
  } satisfies Transition,
  spring: {
    type: 'spring',
    stiffness: 340,
    damping: 30,
  } satisfies Transition,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  margin: '-48px',
} as const;

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.enter,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.enter,
  },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.fast,
  },
  exit: {
    opacity: 0,
    y: 4,
    transition: { duration: 0.12, ease: EASE_OUT },
  },
};
