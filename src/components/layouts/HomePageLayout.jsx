"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { AppContext } from '@/app/providers';
import Link from 'next/link';
import Image from 'next/image';
import { GithubProjectCard } from '@/components/ui/GithubProjectCard';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PublicationCard } from '@/components/ui/PublicationCard';
import { TechStack } from '@/components/ui/TechStack';
import { Timeline } from '@/components/ui/Timeline';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/utils/translations';
import { OneEyeOwl } from '@/components/ui/OneEyeOwl';
import { ContactTerminal } from '@/components/ui/ContactTerminal';
import { SectionProgressIndicator } from '@/components/ui/SectionProgressIndicator';
import { AlertTriangle, X, CreditCard } from 'lucide-react';
import avatar_1 from '/public/images/avatars/avatar_1.jpg';
import { EASE, DURATION, VIEWPORT, springSnappy, sectionReveal, fadeUp, staggerContainer } from '@/lib/motion';

import { publications } from '@/utils/data';
import { EXPERIENCE_DATA } from '@/lib/resume-data';

const publicationCategories = ["Journal", "Conference", "Poster"];

const ITEMS_PER_PAGE = 6;

export default function HomePageLayout({ githubProjects = [] }) {
    const { introShown, setIntroShown } = useContext(AppContext);
    const { language } = useTheme(); // Get language
    const t = translations[language] || translations.en;

    // If intro has been shown in this session (context), skip loading.
    const [isLoading, setIsLoading] = useState(!introShown);
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);
    const [showWarning, setShowWarning] = useState(true);
    const [activeSection, setActiveSection] = useState("hero");
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 250;
            const sectionIds = ["hero", "about", "research", "projects", "skills", "experience", "contact"];
            let current = "hero";

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                if (id === "hero" && window.scrollY < 300) {
                    current = "hero";
                    break;
                }
                const el = document.getElementById(id);
                if (el && scrollPos >= el.offsetTop) {
                    current = id;
                    break;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [activeCategory]);

    const finishIntro = useCallback(() => {
        setIsLoading(false);
        setIntroShown(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('introShown', 'true');
        }
    }, [setIntroShown]);

    useEffect(() => {
        // If context says it's done, ensure we stick to that (though initial state handles it)
        if (introShown) {
            return;
        }

        // Check sessionStorage for refresh persistence
        const hasShownSession = typeof window !== 'undefined' && sessionStorage.getItem('introShown');

        if (hasShownSession) {
            finishIntro();
        } else {
            // Reduced-motion users skip the boot sequence entirely.
            const timer = setTimeout(finishIntro, prefersReducedMotion ? 0 : 2500);
            return () => clearTimeout(timer);
        }
    }, [introShown, finishIntro, prefersReducedMotion]);

    const dynamicCategories = useMemo(() => {
        const allTags = githubProjects.flatMap(p => p.tags || []);
        const tagCounts = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        const topTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(entry => entry[0]);

        return ["All", ...topTags];
    }, [githubProjects]);

    const filteredProjects = useMemo(() => (
        activeCategory === "All"
            ? githubProjects
            : githubProjects.filter(p => p.tags && p.tags.includes(activeCategory))
    ), [githubProjects, activeCategory]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const currentProjects = useMemo(() => filteredProjects.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    ), [filteredProjects, currentPage]);

    return (
        <div className="relative text-theme-text transition-colors duration-500 min-h-screen">
            <ScientificBackground />

            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <>
                    <SectionProgressIndicator activeSection={activeSection} />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: DURATION.slow, ease: EASE }}
                        className="relative z-10 w-full"
                    >
                        {/* --- HERO SECTION --- */}
                        <section id="hero" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full pt-20 pb-12 px-4 md:px-8 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-10 relative"
                            >
                                {/* Grid Lines */}
                                <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-theme-text/5 hidden xl:block" />
                                <div className="absolute -top-12 left-0 right-0 h-[1px] bg-theme-text/5 hidden xl:block" />

                                {/* Status Indicator */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-accent"></span>
                                        </span>
                                        <span className="font-body text-[10px] tracking-widest text-cyan-accent uppercase">{t.status}</span>
                                    </div>
                                    <div className="h-[1px] w-12 bg-theme-text/10"></div>
                                </div>

                                {/* Under Development Warning - Flowing & Removable */}
                                <AnimatePresence>
                                    {showWarning && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            className="relative overflow-hidden"
                                        >
                                            <div className="flex items-center gap-3 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg backdrop-blur-sm max-w-md w-fit">
                                                <AlertTriangle size={16} className="text-yellow-500 shrink-0 animate-pulse" />

                                                {/* Marquee/Flowing Text */}
                                                <div className="overflow-hidden w-[200px] sm:w-[260px] relative h-4 flex items-center">
                                                    <motion.div
                                                        animate={{ x: [0, -200] }} // simple slide
                                                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                                        className="whitespace-nowrap font-mono text-xs text-yellow-500/90 tracking-widest uppercase glow-text-yellow flex gap-8"
                                                    >
                                                        <span>{t.underDev}</span>
                                                        <span>{t.underDev}</span>
                                                    </motion.div>
                                                </div>

                                                <button
                                                    onClick={() => setShowWarning(false)}
                                                    className="ml-auto pl-2 hover:bg-yellow-500/20 p-1 rounded-full transition-colors text-yellow-500/50 hover:text-yellow-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Name & Titles */}
                                <div className="space-y-6">
                                    <p className="font-body text-xl md:text-2xl tracking-[0.2em] text-cyan-accent uppercase">
                                        {t.greeting}
                                    </p>

                                    <div className="flex flex-col gap-2 relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-accent via-cyan-accent/50 to-transparent" />
                                        <div className="pl-6 space-y-1 text-4xl md:text-6xl lg:text-8xl font-bold font-heading leading-[0.95] tracking-tight">
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                                className="block text-2xl md:text-4xl text-cyan-accent"
                                            >
                                                {t.roles.software}
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                                className="block text-2xl md:text-4xl text-theme-text/80"
                                            >
                                                {t.roles.data}
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                                className="block text-2xl md:text-4xl text-theme-text/60"
                                            >
                                                {t.roles.researcher}
                                            </motion.span>
                                        </div>
                                    </div>
                                </div>

                                {/* Abstract / Bio */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                    className="max-w-3xl mt-8 relative group"
                                >
                                    <div className="absolute inset-0 bg-cyan-accent/5 skew-x-[-10deg] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative border-l border-t border-theme-text/10 p-6 backdrop-blur-sm bg-theme-card/30">
                                        <div className="absolute top-0 right-0 p-2">
                                            <span className="font-body text-[10px] text-theme-text/50">[ {t.abstract.title} ]</span>
                                        </div>
                                        <p className="text-theme-text/80 text-lg leading-relaxed font-light">
                                            {t.abstract.text}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                    className="flex flex-wrap gap-4 pt-4"
                                >
                                    <Link href="/resume" className="group relative px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-body text-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-theme-text translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative group-hover:text-theme-bg transition-colors">{t.buttons.resume}</span>
                                    </Link>
                                    <Link href="/research" className="group px-8 py-3 border border-theme-text/20 text-theme-text font-bold font-body text-sm hover:border-cyan-accent transition-colors flex items-center gap-2">
                                        <span>{t.buttons.research}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                    <Link href="/meishi" className="group px-8 py-3 border border-theme-text/20 text-theme-text font-bold font-body text-sm hover:border-cyan-accent transition-colors flex items-center gap-2">
                                        <span>{t.buttons.meishi}</span>
                                        <CreditCard size={16} className="group-hover:text-cyan-accent transition-colors" />
                                    </Link>
                                </motion.div>

                                {/* Human Persona Scroll Prompt */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="pt-12 flex items-center gap-3 text-theme-text/40 hover:text-cyan-accent cursor-pointer transition-colors group"
                                    onClick={() => {
                                        const about = document.getElementById('about');
                                        if (about) about.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <div className="w-5 h-9 rounded-full border-2 border-current flex justify-center p-1">
                                        <motion.div
                                            animate={{ y: [0, 12, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                            className="w-1 h-2 bg-cyan-accent rounded-full"
                                        />
                                    </div>
                                    <span className="font-mono text-xs tracking-widest uppercase group-hover:translate-x-1 transition-transform">
                                        SCROLL TO EXPLORE ↓
                                    </span>
                                </motion.div>
                            </motion.div>
                        </section>

                        {/* About Section */}
                        <section id="about" className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto w-full px-4 md:px-8 py-24 md:py-32 relative border-t border-theme-text/5">
                            <motion.h2
                                variants={sectionReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-3xl md:text-5xl font-bold font-heading text-theme-text mb-8 md:mb-12"
                            >
                                {t.about.title} <span className="text-cyan-accent">{t.about.highlight}</span>
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT}
                                    className="space-y-6 text-theme-text/80 leading-relaxed"
                                >
                                    <p>
                                        {t.about.p1}
                                    </p>
                                    <p>
                                        {t.about.p2}
                                    </p>
                                    <p>
                                        {t.about.p3}
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT}
                                    className="relative group h-[300px]"
                                >
                                    {/* SYSTEM_STATS (Default View) */}
                                    <div className="absolute inset-0 bg-theme-card/50 backdrop-blur-sm border border-theme-text/10 p-6 rounded-xl space-y-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:blur-sm z-10">
                                        <div className="flex justify-between items-center border-b border-theme-text/10 pb-4">
                                            <span className="font-body text-xs text-cyan-accent tracking-widest">{t.about.stats.title}</span>
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 font-body text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">{t.about.stats.location}</span>
                                                <span className="text-theme-text">{t.about.stats.locationVal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">{t.about.stats.degree}</span>
                                                <span className="text-theme-text">{t.about.stats.degreeVal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">{t.about.stats.experience}</span>
                                                <span className="text-theme-text">{t.about.stats.experienceVal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">{t.about.stats.status}</span>
                                                <span className="text-cyan-accent animate-pulse">{t.about.stats.statusVal}</span>
                                            </div>
                                        </div>

                                        {/* Hover Hint */}
                                        <div className="absolute bottom-4 right-6 text-[10px] text-theme-text/30 font-mono animate-pulse">
                                            HOVER_TO_DECRYPT
                                        </div>
                                    </div>

                                    {/* IDENTITY_CARD (Hover View) */}
                                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform group-hover:scale-100 scale-105 pointer-events-none group-hover:pointer-events-auto">
                                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-cyan-accent/30 bg-black/90 shadow-glow-accent-lg">
                                            {/* Photo */}
                                            <Image
                                                src={avatar_1}
                                                alt="Profile"
                                                fill
                                                sizes="(min-width: 512px) 480px, 100vw"
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                            />

                                            {/* Cyber Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />

                                            {/* HUD Elements */}
                                            <div className="absolute top-4 left-4 border-l-2 border-cyan-accent pl-2">
                                                <p className="text-[10px] font-mono text-cyan-accent leading-none mb-1">ID_VERIFIED</p>
                                                <p className="text-[10px] font-mono text-white/60 leading-none">0x14041999</p>
                                            </div>

                                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="mb-2">
                                                    <OneEyeOwl className="w-48 h-12 -ml-8" color="white" />
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded bg-cyan-accent/20 border border-cyan-accent/30 text-[10px] text-cyan-accent font-mono">DEV</span>
                                                    <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] text-purple-400 font-mono">RESEARCHER</span>
                                                </div>
                                            </div>

                                            {/* Scanning Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-accent/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[1.5s] ease-in-out" />

                                            {/* Corner Accents */}
                                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-accent/50" />
                                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-accent/50" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </section>

                        {/* Research Section */}
                        <section id="research" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-24 md:py-32 relative border-t border-theme-text/5">
                            <motion.h2
                                variants={sectionReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-3xl md:text-5xl font-bold font-heading text-theme-text mb-8 md:mb-12"
                            >
                                {t.research.title} <span className="text-cyan-accent">{t.research.highlight}</span>
                            </motion.h2>

                            <div className="space-y-16">
                                {publicationCategories.map(category => {
                                    const categoryPubs = publications.filter(p => p.type === category);
                                    if (categoryPubs.length === 0) return null;

                                    return (
                                        <div key={category} className="space-y-8">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-2xl font-bold font-heading text-theme-text/90 tracking-wider uppercase border-l-4 border-cyan-accent pl-4">
                                                    {category} <span className="text-cyan-accent/60">Section</span>
                                                </h3>
                                                <div className="h-[1px] flex-1 bg-gradient-to-r from-theme-text/10 to-transparent"></div>
                                            </div>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                {categoryPubs.map((pub, index) => (
                                                    <PublicationCard key={index} publication={pub} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section id="projects" className="flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 md:py-28 relative border-t border-theme-text/5">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <motion.h2
                                    variants={sectionReveal}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT}
                                    className="text-3xl md:text-5xl font-bold font-heading text-theme-text">
                                    {t.projects.title} <span className="text-cyan-accent">{t.projects.highlight}</span>
                                </motion.h2>

                                {/* Category Filter */}
                                {githubProjects.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {dynamicCategories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                aria-pressed={activeCategory === cat}
                                                className={`
                                                    px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300
                                                    ${activeCategory === cat
                                                        ? 'bg-cyan-accent text-theme-bg font-bold shadow-glow-accent'
                                                        : 'bg-theme-card border border-theme-text/10 text-theme-text/60 hover:border-cyan-accent/50 hover:text-cyan-accent'}
                                                `}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-full relative min-h-[400px]">
                                {githubProjects.length === 0 ? (
                                    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-theme-border bg-theme-card/30 text-center font-mono backdrop-blur-sm">
                                        <span className="text-xs uppercase tracking-[0.3em] text-theme-muted">[ SIGNAL_LOST ]</span>
                                        <p className="text-sm text-theme-muted px-6">
                                            No project telemetry received from GitHub.
                                        </p>
                                        <a
                                            href="https://github.com/usama-shiranai90"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs uppercase tracking-widest text-cyan-accent hover:underline"
                                        >
                                            github.com/usama-shiranai90 →
                                        </a>
                                    </div>
                                ) : (
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentPage + activeCategory}
                                            variants={staggerContainer}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, transition: { duration: DURATION.fast / 2 } }}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                            {currentProjects.map((project) => (
                                                <motion.div key={project.id} variants={fadeUp} className="h-full min-h-[380px]">
                                                    <GithubProjectCard project={project} />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </div>

                            {/* Pagination Dots */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12 relative z-10 pb-8">
                                    {Array.from({ length: totalPages }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(idx)}
                                            className={`relative block w-3 h-3 min-w-[12px] min-h-[12px] rounded-full transition-colors duration-300 ${
                                                currentPage === idx
                                                    ? 'bg-cyan-accent shadow-glow-accent'
                                                    : 'bg-theme-text/40 hover:bg-theme-text/80'
                                            }`}
                                            aria-label={`Go to page ${idx + 1}`}
                                            aria-current={currentPage === idx ? 'page' : undefined}
                                        >
                                            {currentPage === idx && (
                                                <motion.span
                                                    layoutId="projects-active-dot"
                                                    transition={springSnappy}
                                                    className="absolute -inset-1.5 rounded-full border border-cyan-accent/50"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Skills Section */}
                        <section id="skills" className="flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 md:py-28 relative border-t border-theme-text/5">
                            <motion.h2
                                variants={sectionReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                className="text-3xl md:text-5xl font-bold font-heading text-theme-text mb-8 md:mb-12"
                            >
                                {t.skills.title} <span className="text-cyan-accent">{t.skills.highlight}</span>
                            </motion.h2>
                            <TechStack />
                        </section>

                        {/* Experience Section */}
                        <section id="experience" className="flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 md:py-28 relative border-t border-theme-text/5">
                            <div className="space-y-4 mb-8">
                                <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest">[ CAREER TELEMETRY & TIMELINE ]</span>
                                <h2 className="text-3xl md:text-5xl font-bold font-heading text-theme-text">{t.experience.title} <span className="text-cyan-accent">{t.experience.highlight}</span></h2>
                                <p className="text-theme-text/70 text-base md:text-lg max-w-3xl font-light">
                                    A track record of building high-concurrency backend services, engineering scalable data migration pipelines, and advancing explainable AI research in healthcare.
                                </p>
                            </div>
                            <Timeline items={EXPERIENCE_DATA} label="Experience" />
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-24 md:py-32 pb-32 relative border-t border-theme-text/5">
                            <ContactTerminal t={t} />
                        </section>
                    </motion.div>
                </>
            )}
        </div>
    );
}