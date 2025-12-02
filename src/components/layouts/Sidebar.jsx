"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText, Share2 } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: 'https://github.com/usama-shiranai90', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/syed-usama-bukhari-0a6373175', label: 'LinkedIn' },
    { icon: FileText, href: '/resume.pdf', label: 'Resume' },
    { icon: Mail, href: 'mailto:john@example.com', label: 'Email' },
];

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

// Animation Variants
const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            staggerChildren: 0.15,
            ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth "mechanical" feel
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1.5, ease: "easeInOut" }
    }
};

export function Sidebar() {
    const [isSocialHovered, setIsSocialHovered] = useState(false);

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="fixed left-0 top-0 h-screen w-24 flex flex-col items-center justify-between py-12 z-50 hidden lg:flex pointer-events-none"
        >
            {/* Background blur for better visibility */}
            <div className="absolute inset-0 w-full h-full bg-theme-bg/0 backdrop-blur-[2px] -z-10" />

            {/* 1. Logo Section */}
            <motion.div variants={itemVariants} className="relative group cursor-pointer pointer-events-auto">
                <a href="/" className="text-2xl font-bold font-syne text-cyan-accent hover:text-theme-text transition-colors duration-300 no-underline flex flex-col items-center">
                    <span className="text-3xl">U</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-text mt-1 group-hover:bg-cyan-accent transition-colors"></span>
                </a>
            </motion.div>

            {/* 2. Navigation Section with Scientific Vertical Line */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full pointer-events-auto">
                {/* The vertical guide line with gradient */}
                <motion.div
                    variants={lineVariants}
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-theme-text/20 to-transparent"
                />

                <nav className="z-10 py-8">
                    <div className="flex flex-row gap-12 [writing-mode:vertical-lr] rotate-180 items-center">
                        {[...navItems].reverse().map((item, i) => (
                            <motion.div key={item.label} variants={itemVariants} custom={i} className="relative group">
                                <a
                                    href={item.href}
                                    className="relative text-[10px] font-mono font-bold tracking-[0.25em] text-theme-text/50 hover:text-cyan-accent transition-all uppercase py-4 px-2 no-underline flex items-center justify-center bg-theme-bg/80 backdrop-blur-sm border border-transparent hover:border-cyan-accent/30 rounded-full"
                                >
                                    {item.label}
                                </a>
                                {/* Hover Dot Indicator */}
                                <span className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(0,216,255,0.8)]"></span>
                            </motion.div>
                        ))}
                    </div>
                </nav>
            </div>

            {/* 3. Social Icons */}
            <motion.div
                variants={itemVariants}
                className="relative pointer-events-auto flex flex-col items-center"
                onMouseEnter={() => setIsSocialHovered(true)}
                onMouseLeave={() => setIsSocialHovered(false)}
            >
                {/* Common Share Icon */}
                <div className="p-3 rounded-full border border-theme-text/10 bg-theme-bg/50 backdrop-blur-sm text-theme-text/50 hover:text-cyan-accent hover:border-cyan-accent/50 transition-all duration-300 cursor-pointer group z-20 relative">
                    <Share2 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                </div>

                {/* Expanding Social Menu */}
                <AnimatePresence>
                    {isSocialHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' }}
                            animate={{ opacity: 1, x: 20, clipPath: 'inset(0 0 0 0)' }}
                            exit={{ opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute left-full top-0 flex items-center gap-4 px-5 py-3 bg-gray-900/95 backdrop-blur-xl border border-theme-text/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] ml-2 z-10"
                        >
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.2, color: '#00d8ff' }}
                                    className="text-gray-400 hover:text-cyan-accent transition-colors"
                                    title={link.label}
                                >
                                    <link.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom decorative element */}
                <motion.div
                    variants={{ hidden: { height: 0 }, visible: { height: 40, transition: { duration: 1, delay: 0.5 } } }}
                    className="w-[1px] bg-gradient-to-b from-cyan-accent to-transparent opacity-50 mt-6"
                />
            </motion.div>
        </motion.aside>
    );
}