"use client";

import { useState } from 'react';
import logo from 'p/images/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Share2, Twitter, Globe, Send, Bookmark } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const socialLinks = [
    { icon: Github, href: 'https://github.com/usama-shiranai90', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/syed-usama-bukhari-0a6373175', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/_oneeyeowl', label: 'Twitter' },
    { icon: Bookmark, href: 'https://medium.com/@oneeyeowl', label: 'Medium' },
    { icon: Globe, href: 'https://google-scholar.com', label: 'Scholar' },
    { icon: FileText, href: '/resume', label: 'Resume' },
    { icon: Send, href: 'mailto:john@example.com', label: 'Contact' },
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
    const { accent } = useTheme();

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="fixed bg-theme-bg left-0 top-0 h-screen w-24 flex flex-col items-center justify-between py-12 z-50 hidden lg:flex pointer-events-none"
        >
            {/* Background blur for better visibility */}
            <div className="absolute inset-0 w-full h-full bg-theme-bg/0 backdrop-blur-[2px] -z-10" />

            {/* 1. Logo Section */}
            <motion.div
                variants={itemVariants}
                className="relative group cursor-pointer pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <a href="/" className="block relative w-16 h-16 flex items-center justify-center">
                    {/* Masked Logo for Color Control */}
                    <div
                        className="w-full h-full transition-colors duration-300"
                        style={{
                            maskImage: `url(${logo.src})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${logo.src})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            backgroundColor: accent.value
                        }}
                    />
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
                    <div className="flex flex-row gap-4 [writing-mode:vertical-lr] rotate-180 items-center">
                        {[...navItems].reverse().map((item, i) => (
                            <motion.div key={item.label} variants={itemVariants} custom={i} className="relative group">
                                <a
                                    href={item.href}
                                    className="relative text-[10px] font-body font-bold tracking-[0.25em] text-theme-text/50 hover:text-cyan-accent transition-all uppercase py-4 px-2 no-underline flex items-center justify-center bg-theme-bg/80 backdrop-blur-sm border border-transparent hover:border-cyan-accent/30 rounded-full"
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

            {/* 3. Social Icons - Absolute Extended Slider */}
            <div
                className="relative z-50 mb-8 pointer-events-auto"
                onMouseEnter={() => setIsSocialHovered(true)}
                onMouseLeave={() => setIsSocialHovered(false)}
            >
                <div className="relative flex items-center justify-center">
                    {/* Trigger Button - Permanent Hub */}
                    <div
                        className={`
                            relative z-20 w-12 h-12 
                            flex items-center justify-center 
                            rounded-xl bg-[#0a0a0a] border border-theme-text/10 
                            transition-all duration-300
                            ${isSocialHovered ? 'border-cyan-accent text-cyan-accent shadow-[0_0_20px_rgba(0,255,255,0.2)]' : 'text-theme-text/50'}
                        `}
                    >
                        <Share2 size={18} strokeWidth={1.5} />
                    </div>

                    {/* The "Slider" Drawer - Absolutely Positioned Right */}
                    <AnimatePresence>
                        {isSocialHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: -15, width: 0 }}
                                animate={{ opacity: 1, x: 0, width: "auto" }}
                                exit={{ opacity: 0, x: -15, width: 0 }}
                                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                className="absolute left-10 top-1/2 -translate-y-1/2 ml-4 flex items-center z-10"
                            >
                                {/* Visual Connector Bridge */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    className="w-6 h-[1px] bg-cyan-accent/40 origin-left"
                                />

                                {/* The Glass Drawer Content */}
                                <div className="
                                    flex items-center gap-1 p-2
                                    bg-[#0a0a0a]/95 backdrop-blur-xl 
                                    border border-theme-text/10 rounded-xl shadow-2xl overflow-hidden
                                ">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                            className="
                                                relative group/icon p-2 rounded-lg 
                                                text-theme-text/60 
                                                hover:text-cyan-accent hover:bg-white/5 
                                                transition-all duration-200
                                            "
                                        >
                                            <link.icon size={18} strokeWidth={1.5} />

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-cyan-accent text-black text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none rounded whitespace-nowrap shadow-lg">
                                                {link.label}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-cyan-accent" />
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Vertical Line Anchor */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[1px] h-12 bg-gradient-to-b from-theme-text/10 to-transparent mt-4 -z-10" />
            </div>
        </motion.aside>
    );
}
