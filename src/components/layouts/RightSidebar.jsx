"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SiJavascript, SiPython, SiMongodb, SiPostgresql, SiGooglecloud } from 'react-icons/si';

const tools = [
    { icon: SiJavascript, label: "JavaScript", color: "hover:text-yellow-400" },
    { icon: SiPython, label: "Python", color: "hover:text-blue-400" },
    { icon: SiMongodb, label: "MongoDB", color: "hover:text-green-500" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "hover:text-cyan-400" },
    { icon: SiGooglecloud, label: "Google Cloud", color: "hover:text-red-400" },
];

const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.15,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
};

export function RightSidebar() {
    const [hovered, setHovered] = useState(null);

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="fixed bg-theme-bg right-0 top-0 h-screen w-24 flex flex-col items-center justify-center py-12 z-50 hidden lg:flex pointer-events-none"
        >
            {/* Background blur */}
            <div className="absolute inset-0 w-full h-full bg-theme-bg/0 backdrop-blur-[2px] -z-10" />

            {/* Top Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 100 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mb-6 absolute top-0"
            />

            <div className="flex flex-col gap-3 pointer-events-auto z-10">
                {tools.map((Tool, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className={`
                            relative w-10 h-10 rounded-full 
                            bg-theme-card/40 backdrop-blur-md 
                            border border-theme-text/5 
                            flex items-center justify-center 
                            text-theme-text/40 transition-all duration-300
                            hover:border-cyan-accent/50 hover:bg-theme-card/80
                            hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]
                            group
                            ${Tool.color}
                        `}
                    >
                        <Tool.icon className="w-5 h-5" />
                        {hovered === i && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute right-full mr-4 py-1 px-2 bg-theme-bg/90 border border-theme-text/10 rounded text-[10px] font-body whitespace-nowrap text-theme-text"
                            >
                                {Tool.label}
                            </motion.span>
                        )}
                    </motion.div>
                ))}

                <motion.div
                    variants={itemVariants}
                    className="
                        w-10 h-10 rounded-full 
                        bg-theme-card/40 backdrop-blur-md 
                        border border-theme-text/5 
                        flex items-center justify-center 
                        cursor-pointer group
                        hover:border-cyan-accent/50 hover:bg-cyan-accent/10 transition-all duration-300
                    "
                >
                    <span className="text-[10px] font-body font-bold text-cyan-accent group-hover:text-theme-text transition-colors">
                        +12
                    </span>
                </motion.div>
            </div>

            {/* Bottom Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-[1px] bg-gradient-to-b from-theme-text/10 to-transparent mt-6 absolute bottom-0"
            />
        </motion.aside>
    );
}
