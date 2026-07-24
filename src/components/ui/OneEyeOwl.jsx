"use client";

import { motion, useReducedMotion } from "framer-motion";

export const OneEyeOwl = ({ className, color = "var(--theme-accent)" }) => {
    const prefersReducedMotion = useReducedMotion();

    // Smooth Path Draw Variant
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.08, type: "spring", duration: 1.8, bounce: 0 },
                opacity: { delay: i * 0.08, duration: 0.2 }
            }
        })
    };

    return (
        <div className={`relative flex items-center justify-center select-none ${className}`} style={{ color }}>
            {/* Soft Ambient Radial Light Halo */}
            <motion.div
                className="absolute inset-0 blur-[35px] opacity-25 rounded-full"
                style={{ backgroundColor: "currentColor" }}
                animate={prefersReducedMotion ? { opacity: 0.2 } : { opacity: [0.15, 0.35, 0.15], scale: [0.92, 1.08, 0.92] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate="visible"
                className="drop-shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.3)] relative z-10"
            >
                <defs>
                    <linearGradient id="owlStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
                    </linearGradient>

                    <radialGradient id="eyeLensGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="currentColor" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* 1. Organic Bezier Head Silhouette */}
                <motion.path
                    d="M 120 28 C 92 28 52 48 42 88 C 34 122 48 162 82 198 C 102 218 120 224 120 224 C 120 224 138 218 158 198 C 192 162 206 122 198 88 C 188 48 148 28 120 28 Z"
                    stroke="url(#owlStrokeGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={draw}
                    custom={0}
                />

                {/* 2. Elegant Feather Crest / Ear Tuft Curves */}
                <motion.path
                    d="M 120 28 C 105 45 75 42 55 35 C 70 55 82 72 90 90"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                    variants={draw}
                    custom={0.5}
                />
                <motion.path
                    d="M 120 28 C 135 45 165 42 185 35 C 170 55 158 72 150 90"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                    variants={draw}
                    custom={0.5}
                />

                {/* 3. Outer Curved Wing Framing Lines */}
                <motion.path
                    d="M 42 88 C 55 120 70 155 100 180 M 198 88 C 185 120 170 155 140 180"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    strokeDasharray="4 4"
                    variants={draw}
                    custom={1}
                />

                {/* 4. The Iconic Central "One Eye" Luminous Lens */}
                {/* 4.a Outer Concentric Ring */}
                <motion.circle
                    cx="120"
                    cy="110"
                    r="44"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    variants={draw}
                    custom={1.2}
                />

                {/* 4.b Rotating Orbital Ring */}
                <motion.g style={{ originX: "120px", originY: "110px" }}>
                    <motion.circle
                        cx="120"
                        cy="110"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeDasharray="16 40 8 30"
                        strokeLinecap="round"
                        strokeOpacity="0.85"
                        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                        cx="120"
                        cy="110"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeDasharray="4 8"
                        strokeOpacity="0.5"
                        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 14, repeat: Infinity, ease: "linear" }}
                    />
                </motion.g>

                {/* 4.c Luminous Core Pupil & Iris */}
                <motion.g
                    variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            transition: { delay: 0.8, type: "spring", stiffness: 200, damping: 20 }
                        }
                    }}
                >
                    {/* Glowing Radial Core */}
                    <circle cx="120" cy="110" r="18" fill="url(#eyeLensGlow)" />

                    {/* Central Hexagonal Core */}
                    <path
                        d="M 120 98 L 131 104 L 131 116 L 120 122 L 109 116 L 109 104 Z"
                        fill="currentColor"
                        fillOpacity="0.15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />

                    {/* Pupil Data Dot */}
                    <circle cx="120" cy="110" r="5" fill="currentColor" />

                    {/* Pulsing Beacon Ring */}
                    {!prefersReducedMotion && (
                        <circle cx="120" cy="110" r="14" stroke="currentColor" strokeWidth="0.8" opacity="0.4">
                            <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                    )}
                </motion.g>

                {/* 5. Minimalist Beak Contour */}
                <motion.path
                    d="M 114 148 C 117 160 120 165 120 165 C 120 165 123 160 126 148"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    variants={draw}
                    custom={1.8}
                />

                {/* 6. Subtle Floating Synaptic Nodes */}
                {[
                    [42, 88], [82, 198], [158, 198], [198, 88], [120, 28]
                ].map((p, i) => (
                    <motion.circle
                        key={`node-${i}`}
                        cx={p[0]}
                        cy={p[1]}
                        r="2.5"
                        fill="currentColor"
                        variants={{
                            hidden: { scale: 0 },
                            visible: { scale: 1, transition: { delay: 1.2 + i * 0.08 } }
                        }}
                    />
                ))}
            </motion.svg>
        </div>
    );
};

export default OneEyeOwl;
