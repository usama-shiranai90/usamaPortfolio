"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { springGentle, EASE } from "@/lib/motion";

const SECTIONS = [
    { id: "hero", label: "HERO", num: "01" },
    { id: "about", label: "ABOUT", num: "02" },
    { id: "research", label: "RESEARCH", num: "03" },
    { id: "projects", label: "PROJECTS", num: "04" },
    { id: "skills", label: "SKILLS", num: "05" },
    { id: "experience", label: "EXPERIENCE", num: "06" },
    { id: "contact", label: "CONTACT", num: "07" },
];

export function SectionProgressIndicator({ activeSection = "hero" }) {
    const [scrollPercent, setScrollPercent] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const activeIndex = Math.max(
        0,
        SECTIONS.findIndex((s) => s.id === activeSection)
    );
    const activeItem = SECTIONS[activeIndex] || SECTIONS[0];

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) return;
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setScrollPercent(Math.min(100, Math.max(0, currentProgress)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (id === "hero") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navigateSection = (direction) => {
        const targetIndex =
            direction === "next"
                ? Math.min(SECTIONS.length - 1, activeIndex + 1)
                : Math.max(0, activeIndex - 1);

        scrollToSection(SECTIONS[targetIndex].id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed right-6 bottom-8 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Expanded Quick Selector */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={springGentle}
                        className="bg-theme-card/90 backdrop-blur-xl border border-cyan-accent/20 rounded-2xl p-3 shadow-2xl space-y-1.5 min-w-[170px]"
                    >
                        <div className="flex items-center justify-between px-2 pb-2 border-b border-theme-text/10 mb-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-accent/70">
                                NAVIGATION SPY
                            </span>
                            <span className="font-mono text-[9px] text-theme-text/50">
                                {Math.round(scrollPercent)}%
                            </span>
                        </div>

                        {SECTIONS.map((sec, idx) => {
                            const isActive = sec.id === activeSection;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => scrollToSection(sec.id)}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 text-left
                                        ${
                                            isActive
                                                ? "bg-cyan-accent/15 border border-cyan-accent/40 text-cyan-accent font-bold"
                                                : "text-theme-text/60 hover:bg-theme-text/5 hover:text-theme-text"
                                        }
                                    `}
                                >
                                    <span className="text-[10px] text-theme-text/40 mr-2">
                                        {sec.num}
                                    </span>
                                    <span className="truncate">{sec.label}</span>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-glow-accent ml-2" />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Floating Status Pill */}
            <div className="flex items-center gap-3 bg-theme-card/85 backdrop-blur-md border border-cyan-accent/20 rounded-full px-4 py-2 shadow-xl hover:border-cyan-accent/50 transition-colors group cursor-pointer">
                {/* Scroll Track */}
                <div className="relative w-1 h-6 bg-theme-text/15 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-cyan-accent rounded-full"
                        style={{ height: `${scrollPercent}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                {/* Counter & Active Label */}
                <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-cyan-accent font-bold">
                        {activeItem.num}
                    </span>
                    <span className="text-theme-text/40">/</span>
                    <span className="text-theme-text/80 font-medium tracking-wider uppercase text-[11px]">
                        {activeItem.label}
                    </span>
                </div>

                {/* Mini Quick Nav Arrows */}
                <div className="flex flex-col gap-0.5 border-l border-theme-text/15 pl-2 ml-1 text-theme-text/50 group-hover:text-cyan-accent">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateSection("prev");
                        }}
                        disabled={activeIndex === 0}
                        className="hover:scale-125 transition-transform disabled:opacity-20"
                        title="Previous section"
                    >
                        <ChevronUp size={12} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateSection("next");
                        }}
                        disabled={activeIndex === SECTIONS.length - 1}
                        className="hover:scale-125 transition-transform disabled:opacity-20"
                        title="Next section"
                    >
                        <ChevronDown size={12} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
