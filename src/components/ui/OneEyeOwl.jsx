"use client";

import { motion, useReducedMotion } from "framer-motion";

export const OneEyeOwl = ({ className, color = "var(--theme-accent)" }) => {
    const prefersReducedMotion = useReducedMotion();

    // Neural-Owl Geometry
    // ViewBox: 0 0 200 200
    // Centered at 100, 100

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.05, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: i * 0.05, duration: 0.1 }
            }
        })
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ color }}>
            {/* Ambient Neural Pulse */}
            <motion.div
                className="absolute inset-0 blur-[30px] opacity-20"
                style={{ backgroundColor: "currentColor" }}
                animate={prefersReducedMotion ? { opacity: 0.15 } : { opacity: [0.1, 0.25, 0.1], scale: [0.95, 1.05, 0.95] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate="visible"
                className="drop-shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.2)]"
            >
                {/* 1. Neural Network Node Connections (The "Brain/Head" Structure) */}
                {/* Connecting nodes to form the owl silhouette */}
                <motion.path
                    d="M 50 60 L 30 90 L 50 140 L 100 170 L 150 140 L 170 90 L 150 60 L 130 30 L 70 30 Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="transparent"
                    variants={draw}
                    custom={0}
                />

                {/* 1.b Neural Nodes (Dots at vertices) */}
                {[
                    [50, 60], [30, 90], [50, 140], [100, 170],
                    [150, 140], [170, 90], [150, 60], [130, 30], [70, 30]
                ].map((p, i) => (
                    <motion.circle
                        key={i} cx={p[0]} cy={p[1]} r="2" fill="currentColor" opacity="0.8"
                        variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 0.5 + i * 0.05 } } }}
                    />
                ))}

                {/* 2. Synaptic Data Lines (Internal Wiring) */}
                <motion.path
                    d="M 50 60 L 70 30 M 150 60 L 130 30 M 30 90 L 100 95 M 170 90 L 100 95"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                    variants={draw}
                    custom={0.8}
                />

                {/* 3. The "One Eye" - The Lens of Analysis */}

                {/* 3.a Outer Focus Brackets */}
                <motion.path
                    d="M 70 70 L 60 70 L 60 120 L 70 120 M 130 70 L 140 70 L 140 120 L 130 120"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    variants={draw}
                    custom={1}
                />

                {/* 3.b Rotating Segmented Rings (Processing) */}
                <motion.g style={{ originX: "100px", originY: "95px" }}>
                    <motion.circle
                        cx="100" cy="95" r="35"
                        stroke="currentColor" strokeWidth="1"
                        strokeDasharray="10 50 20 60" strokeLinecap="round"
                        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                        cx="100" cy="95" r="28"
                        stroke="currentColor" strokeWidth="0.5"
                        strokeDasharray="2 4"
                        opacity="0.5"
                        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                        transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                </motion.g>

                {/* 4. The Core Node (Iris/Pupil) */}
                <motion.g variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: {
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 0.6, type: "spring", stiffness: 150 }
                    }
                }}>
                    {/* Central Hexagon Node */}
                    <path
                        d="M 100 85 L 110 90 L 110 100 L 100 105 L 90 100 L 90 90 Z"
                        fill="currentColor"
                        fillOpacity="0.1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />

                    {/* Inner Data Core */}
                    <circle cx="100" cy="95" r="5" fill="currentColor" />

                    {/* Active State Indicator (Small pulse ring) */}
                    <circle cx="100" cy="95" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                        {!prefersReducedMotion && (
                            <>
                                <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                            </>
                        )}
                    </circle>
                </motion.g>


                {/* 5. Beak -> Data Input Point */}
                <motion.path
                    d="M 95 130 L 100 145 L 105 130"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="transparent"
                    variants={draw}
                    custom={2}
                />

                {/* 6. Machine Learning Graph Elements (Background Accents) */}
                <motion.path
                    d="M 160 120 L 175 110 L 185 130 M 40 120 L 25 110 L 15 130"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    fill="transparent"
                    variants={draw}
                    custom={3}
                />
                {[
                    [175, 110], [185, 130], [25, 110], [15, 130]
                ].map((p, i) => (
                    <motion.circle
                        key={`graph-${i}`} cx={p[0]} cy={p[1]} r="1.5" fill="currentColor" opacity="0.4"
                        variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 1 + i * 0.1 } } }}
                    />
                ))}
            </motion.svg>
        </div>
    );
};
