"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from 'p/images/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, FileText, Share2, Twitter, Globe, Send, Bookmark, CreditCard } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { EASE, DURATION } from '@/lib/motion';

const socialLinks = [
    { icon: Github, href: 'https://github.com/usama-shiranai90', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/syed-usama-bukhari-0a6373175', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/_oneeyeowl', label: 'Twitter' },
    { icon: Bookmark, href: 'https://medium.com/@syedusama78', label: 'Medium' },
    { icon: Globe, href: 'https://scholar.google.com/citations?user=n5GPnEIAAAAJ&hl=en', label: 'Scholar' },
    { icon: FileText, href: '/resume', label: 'Resume' },
    { icon: CreditCard, href: '/meishi', label: 'Meishi' },
    { icon: Send, href: 'mailto:syedusamahussain@addo.ai', label: 'Contact' },
];

const navItems = [
    { label: 'About', href: '/#about', id: 'about' },
    { label: 'Research', href: '/#research', id: 'research' },
    { label: 'Projects', href: '/#projects', id: 'projects' },
    { label: 'Experience', href: '/#experience', id: 'experience' },
    { label: 'Contact', href: '/#contact', id: 'contact' },
];

// Animation Variants
const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: DURATION.slow,
            staggerChildren: 0.1,
            ease: EASE
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
        transition: { duration: DURATION.slow, ease: EASE }
    }
};

export function Sidebar() {
    const [isSocialHovered, setIsSocialHovered] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { accent } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 250;
            const ids = ["about", "research", "projects", "skills", "experience", "contact"];
            let current = "";
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = document.getElementById(ids[i]);
                if (el && scrollPos >= el.offsetTop) {
                    current = ids[i];
                    break;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
            className="fixed bg-theme-bg left-0 top-0 h-screen w-24 flex flex-col items-center justify-between py-10 z-50 hidden lg:flex pointer-events-none border-r border-theme-border/30"
        >
            {/* 1. Logo Section */}
            <motion.div
                variants={itemVariants}
                className="relative group cursor-pointer pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <Link href="/" className="block relative w-14 h-14 flex items-center justify-center">
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
                </Link>
            </motion.div>

            {/* 2. Navigation Section with Scientific Vertical Line */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full pointer-events-auto my-4">
                {/* The vertical guide line with gradient */}
                <motion.div
                    variants={lineVariants}
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-accent/20 to-transparent"
                />

                <nav className="z-10 py-4">
                    <div className="flex flex-col gap-3 items-center">
                        {navItems.map((item, i) => {
                            const isActive = activeSection === item.id;
                            return (
                                <motion.div key={item.label} variants={itemVariants} custom={i} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={`relative text-[9px] font-body font-bold tracking-[0.2em] transition-all uppercase py-2 px-2.5 no-underline flex items-center justify-center rounded-lg backdrop-blur-sm [writing-mode:vertical-lr] rotate-180 ${
                                            isActive
                                                ? "text-cyan-accent bg-cyan-accent/15 border border-cyan-accent/40 shadow-glow-accent opacity-100 font-extrabold"
                                                : "text-theme-text opacity-50 hover:text-cyan-accent hover:opacity-100 bg-theme-bg/80 border border-transparent hover:border-cyan-accent/30"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                    {/* Active / Hover Dot Indicator */}
                                    <span
                                        className={`absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-accent rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(var(--theme-accent-rgb),0.8)] ${
                                            isActive ? "opacity-100 scale-125" : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </nav>
            </div>

            {/* 3. Social Icons - Absolute Extended Slider */}
            <div
                className="relative z-50 pointer-events-auto"
                onMouseEnter={() => setIsSocialHovered(true)}
                onMouseLeave={() => setIsSocialHovered(false)}
            >
                <div className="relative flex items-center justify-center">
                    {/* Trigger Button - Permanent Hub */}
                    <div
                        className={`
                            relative z-20 w-11 h-11
                            flex items-center justify-center
                            rounded-xl bg-theme-card border border-theme-border
                            transition-all duration-300 cursor-pointer
                            ${isSocialHovered ? 'border-cyan-accent text-cyan-accent shadow-glow-accent' : 'text-theme-text opacity-50'}
                        `}
                    >
                        <Share2 size={16} strokeWidth={1.5} />
                    </div>

                    {/* The "Slider" Drawer - Absolutely Positioned Right */}
                    <AnimatePresence>
                        {isSocialHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: -15, width: 0 }}
                                animate={{ opacity: 1, x: 0, width: "auto" }}
                                exit={{ opacity: 0, x: -15, width: 0 }}
                                transition={{ duration: DURATION.fast, ease: EASE }}
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
                                    bg-theme-card/95 backdrop-blur-xl
                                    border border-theme-border rounded-xl shadow-2xl overflow-hidden
                                ">
                                    {socialLinks.map((link, index) => {
                                        const isInternal = link.href.startsWith('/');
                                        const commonClasses = `
                                            relative group/icon p-2 rounded-lg 
                                            text-theme-text/60 
                                            hover:text-cyan-accent hover:bg-theme-text/5 
                                            transition-all duration-200 block
                                        `;
                                        const tooltip = (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-cyan-accent text-theme-bg text-[9px] font-bold tracking-widest uppercase opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none rounded whitespace-nowrap shadow-lg">
                                                {link.label}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-cyan-accent" />
                                            </div>
                                        );

                                        if (isInternal) {
                                            return (
                                                <motion.div
                                                    key={link.label}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.05 + index * 0.04 }}
                                                >
                                                    <Link href={link.href} className={commonClasses}>
                                                        <link.icon size={16} strokeWidth={1.5} />
                                                        {tooltip}
                                                    </Link>
                                                </motion.div>
                                            );
                                        }

                                        return (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.05 + index * 0.04 }}
                                                className={commonClasses}
                                            >
                                                <link.icon size={16} strokeWidth={1.5} />
                                                {tooltip}
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.aside>
    );
}
