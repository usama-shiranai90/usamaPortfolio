// Shared motion vocabulary. Every animated component should pull its easing,
// durations, and variants from here so the site moves as one system.

export const EASE = [0.22, 1, 0.36, 1]

export const DURATION = {
    fast: 0.3,
    base: 0.5,
    slow: 0.7,
}

export const VIEWPORT = { once: true, margin: '-80px' }

export const springSnappy = { type: 'spring', stiffness: 350, damping: 28 }
export const springGentle = { type: 'spring', stiffness: 200, damping: 24 }

export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE },
    },
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: DURATION.base, ease: EASE },
    },
}

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: DURATION.fast, ease: EASE },
    },
}

// Parent wrapper for staggered lists of fadeUp/fadeIn/scaleIn children.
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
}

// The repeated whileInView section-heading reveal.
export const sectionReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: DURATION.base, ease: EASE },
    },
}
