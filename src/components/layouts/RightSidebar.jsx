"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiJavascript, SiPython, SiMongodb, SiPostgresql, SiGooglecloud,
    SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiDocker,
    SiAmazon, SiGit, SiFigma, SiTailwindcss, SiGraphql,
    SiRedux, SiLinux, SiRust
} from 'react-icons/si';
import { X } from 'lucide-react';

const mainTools = [
    { icon: SiJavascript, label: "JavaScript", color: "text-[#F7DF1E]" },
    { icon: SiPython, label: "Python", color: "text-[#3776AB]" },
    { icon: SiMongodb, label: "MongoDB", color: "text-[#47A248]" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "text-[#336791]" },
    { icon: SiGooglecloud, label: "Google Cloud", color: "text-[#4285F4]" },
];

const extraTools = [
    { icon: SiReact, label: "React", color: "text-[#61DAFB]" },
    { icon: SiNextdotjs, label: "Next.js", color: "text-white" },
    { icon: SiTypescript, label: "TypeScript", color: "text-[#3178C6]" },
    { icon: SiNodedotjs, label: "Node.js", color: "text-[#339933]" },
    { icon: SiDocker, label: "Docker", color: "text-[#2496ED]" },
    { icon: SiAmazon, label: "AWS", color: "text-[#FF9900]" },
    { icon: SiGit, label: "Git", color: "text-[#F05032]" },
    { icon: SiFigma, label: "Figma", color: "text-[#F24E1E]" },
    { icon: SiTailwindcss, label: "Tailwind", color: "text-[#06B6D4]" },
    { icon: SiGraphql, label: "GraphQL", color: "text-[#E10098]" },
    { icon: SiRedux, label: "Redux", color: "text-[#764ABC]" },
    { icon: SiLinux, label: "Linux", color: "text-[#FCC624]" },
];

const sidebarVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
};

export function RightSidebar() {
    const [hovered, setHovered] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <motion.aside
            ref={sidebarRef}
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="fixed right-0 top-0 h-screen w-24 flex flex-col items-center justify-center py-12 z-50 hidden lg:flex pointer-events-none"
        >
            {/* Extended Hit Area for Mouse Interaction */}
            <div className="absolute inset-y-0 right-0 w-48 pointer-events-auto -z-20" />

            {/* Top Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "30vh" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] bg-gradient-to-b from-transparent via-cyan-accent/20 to-transparent absolute top-0"
            />

            <div className="flex flex-col gap-4 pointer-events-auto z-10 relative">
                {mainTools.map((Tool, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.2, x: -5 }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className={`
                            relative w-10 h-10 rounded-full 
                            bg-theme-bg/40 backdrop-blur-md 
                            border border-theme-text/10 
                            flex items-center justify-center 
                            text-theme-text/40 transition-colors duration-300
                            hover:border-cyan-accent hover:bg-theme-bg
                            hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]
                            cursor-pointer group
                            ${Tool.color}
                        `}
                    >
                        <Tool.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

                        {/* Tooltip */}
                        <AnimatePresence>
                            {hovered === i && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 10, scale: 0.8 }}
                                    className="absolute right-full mr-4 py-1.5 px-3 bg-[#0a0a0a] border border-cyan-accent/30 rounded-lg shadow-xl"
                                >
                                    <span className="text-[10px] font-mono tracking-wider text-cyan-accent whitespace-nowrap">
                                        {Tool.label}
                                    </span>
                                    {/* Arrow */}
                                    <div className="absolute top-1/2 -right-1 -mt-1 w-2 h-2 bg-[#0a0a0a] border-t border-r border-cyan-accent/30 transform rotate-45" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

                {/* Expand Button */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`
                        w-10 h-10 rounded-full 
                        bg-cyan-accent/10 backdrop-blur-md 
                        border flex items-center justify-center 
                        cursor-pointer transition-all duration-300
                        ${isExpanded
                            ? "border-cyan-accent bg-cyan-accent text-theme-bg shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                            : "border-cyan-accent/30 text-cyan-accent hover:border-cyan-accent"}
                    `}
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={16} />
                            </motion.div>
                        ) : (
                            <motion.span
                                key="open"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="text-[10px] font-bold font-mono"
                            >
                                +{extraTools.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Expanded Tools Panel */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute right-16 bottom-0 w-64 p-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-cyan-accent/20 rounded-2xl shadow-2xl grid grid-cols-4 gap-3 z-50 origin-bottom-right"
                        >
                            {/* Decorative Header */}
                            <div className="col-span-4 flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                                <span className="text-[10px] font-mono text-cyan-accent/50 uppercase tracking-widest">
                                    Full Arsenal
                                </span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-cyan-accent animate-pulse" />
                                    <div className="w-1 h-1 rounded-full bg-cyan-accent/50" />
                                </div>
                            </div>

                            {extraTools.map((Tool, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    whileHover={{ scale: 1.2, zIndex: 10 }}
                                    className="relative group flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <Tool.icon className={`w-5 h-5 ${Tool.color} opacity-70 group-hover:opacity-100 transition-opacity`} />

                                    {/* Float Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-accent text-black text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        {Tool.label}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-cyan-accent" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "30vh" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-[1px] bg-gradient-to-b from-theme-text/10 to-transparent absolute bottom-0"
            />
        </motion.aside>
    );
}
