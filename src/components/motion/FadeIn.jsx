'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, VIEWPORT, staggerContainer } from '@/lib/motion'

// Client-side entrance wrapper so async server pages (articles, research,
// guestbook, …) get scroll-triggered motion without becoming client components.
export function FadeIn({ children, className, delay = 0, y = 24, duration = DURATION.base, ...props }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration, delay, ease: EASE }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Staggers direct FadeInItem children as they enter the viewport.
export function FadeInStagger({ children, className, ...props }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerContainer}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export function FadeInItem({ children, className, y = 24, ...props }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y },
                visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
            }}
            {...props}
        >
            {children}
        </motion.div>
    )
}
