"use client";

import { motion } from "framer-motion";

export const OneEyeOwl = ({ className, color = "#14b8a6" }) => {
    // Cyber-Owl Geometry
    // ViewBox: 0 0 200 200
    // Centered at 100, 100

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: i * 0.05, type: "spring", duration: 0.8, bounce: 0 },
                opacity: { delay: i * 0.05, duration: 0.1 }
            }
        })
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Ambient Glow */}
            <motion.div
                className="absolute inset-0 blur-[40px] opacity-20"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial="hidden"
                animate="visible"
                className="drop-shadow-[0_0_10px_rgba(20,184,166,0.3)]"
            >
                {/* 1. Owl Silhouette / Face Frame */}
                {/* More distinct "owl" ears and curved cheeks */}
                <motion.path
                    d="M50 70 
                       Q 40 40 70 40 
                       L 90 55 
                       L 110 55 
                       L 130 40 
                       Q 160 40 150 70 
                       L 150 120 
                       Q 150 150 100 160 
                       Q 50 150 50 120 
                       Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="transparent"
                    variants={draw}
                    custom={0}
                />

                {/* 2. Inner Tech Detailing (Circuit lines) */}
                <motion.path
                    d="M50 70 L 70 90 M 150 70 L 130 90 M 100 160 L 100 135"
                    stroke={color}
                    strokeWidth="1"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                    variants={draw}
                    custom={1}
                />

                {/* 3. The "One Eye" (Central Lens) */}
                {/* Outer Ring */}
                <motion.circle
                    cx="100"
                    cy="95"
                    r="32"
                    stroke={color}
                    strokeWidth="2"
                    fill="rgba(0,0,0,0.2)"
                    variants={draw}
                    custom={2}
                />

                {/* Rotating Aperture Rings */}
                <motion.g style={{ originX: "100px", originY: "95px" }}>
                    <motion.circle
                        cx="100" cy="95" r="38"
                        stroke={color} strokeWidth="1"
                        strokeDasharray="20 15" strokeOpacity="0.4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.circle
                        cx="100" cy="95" r="44"
                        stroke={color} strokeWidth="0.5"
                        strokeDasharray="4 4" strokeOpacity="0.3"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </motion.g>

                {/* 4. The Iris / Lens Core */}
                <motion.circle
                    fill={color}
                    fillOpacity="0.3"
                    stroke={color}
                    strokeWidth="1"
                    variants={draw}
                    custom={3}
                />

                {/* 6. Text / Label below eye (Optional decorative) */}
                <motion.path
                    d="M 80 175 L 120 175"
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.5"
                    variants={draw}
                    custom={4}
                />
            </motion.svg>
        </div>
    );
};
