'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Layers, BookOpen, Award, Globe, Briefcase, FileText, Server, Download, Printer, ExternalLink } from "lucide-react";

import { Timeline } from '@/components/ui/Timeline'
import { TechStack } from '@/components/ui/TechStack'
import { Rirekisho } from '@/components/ui/Rirekisho'
import { LaTeXResumeRenderer } from '@/lib/latex-renderer'
import { DURATION, EASE, springSnappy } from '@/lib/motion'
import {
    PDF_TABS,
    INTERACTIVE_TABS,
    SUMMARY,
    SKILLS_DATA,
    EXPERIENCE_DATA,
    EDUCATION_DATA,
    PROJECTS_DATA,
    CERTIFICATES_DATA,
    ACHIEVEMENTS_DATA,
    LANGUAGES_DATA,
    DATA_JP,
} from '@/lib/resume-data'

import resumeImage1 from 'p/images/resume/Syed Usama Bukhari Resume_Page_1.png'
import resumeImage2 from 'p/images/resume/Syed Usama Bukhari Resume_Page_2.png'

import resumeImage11 from 'p/images/resume/Syed Usama Bukhari EU_Page_1.png'
import resumeImage12 from 'p/images/resume/Syed Usama Bukhari EU_Page_2.png'

const VIEW_MODES = [
    { id: 'interactive', label: 'Interactive', icon: Layers },
    { id: 'pdf', label: 'PDF View', icon: BookOpen },
    { id: 'latex', label: 'LaTeX / Overleaf', icon: FileText },
]

export default function Resume() {
    const [viewMode, setViewMode] = useState('interactive')
    const [activeInteractiveTab, setActiveInteractiveTab] = useState(INTERACTIVE_TABS[0].id)
    const [activePdfTab, setActivePdfTab] = useState(PDF_TABS[0].id)
    const [zoomLevel, setZoomLevel] = useState(1);
    const [selectedTexTemplate, setSelectedTexTemplate] = useState('infrastructure')
    const [latexCode, setLatexCode] = useState('')

    useEffect(() => {
        if (viewMode === 'latex') {
            const fileToFetch = selectedTexTemplate === 'general'
                ? '/docs/UsamaBukhari-Resume.tex'
                : '/docs/UsamaBukhari-Infrastructure-Resume.tex';

            fetch(fileToFetch)
                .then(res => res.text())
                .then(text => setLatexCode(text))
                .catch(err => console.error("Error loading LaTeX source:", err));
        }
    }, [viewMode, selectedTexTemplate])

    const currentPdfTab = PDF_TABS.find((tab) => tab.id === activePdfTab)
    const currentInteractiveDownload = PDF_TABS.find((tab) => tab.id === activeInteractiveTab)

    const handlePrint = () => {
        window.print()
    }

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <Container className="mt-16 sm:mt-32">
            {/* Page Header */}
            <header className="max-w-2xl mx-auto lg:max-w-none flex flex-col items-center text-center mb-16 print:hidden">
                <h1 className="text-4xl font-extrabold tracking-tight text-theme-text sm:text-5xl lg:text-6xl">
                    <span className="block text-cyan-accent text-lg font-mono font-medium tracking-wider mb-2 uppercase">Curriculum Vitae</span>
                    Syed Usama Bukhari
                </h1>
                <p className="mt-4 text-xl text-theme-text/80 max-w-2xl">
                    Software Engineer & Data Science Researcher building scalable, healthcare-oriented solutions.
                </p>

                {/* Controls Toolbar */}
                <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-4">
                    {/* View Mode Switcher */}
                    <div className="flex space-x-1 rounded-full bg-theme-card p-1 shadow-sm border border-theme-border">
                        {VIEW_MODES.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id)}
                                className={clsx(
                                    'relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors',
                                    viewMode === mode.id
                                        ? 'text-theme-text'
                                        : 'text-theme-text/50 hover:text-theme-text'
                                )}>

                                {viewMode === mode.id && (
                                    <motion.div
                                        layoutId="active-view-pill"
                                        className="absolute inset-0 bg-theme-bg shadow-sm border border-theme-border rounded-full"
                                        transition={springSnappy}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <mode.icon className="w-4 h-4" />
                                    {mode.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="">
                <AnimatePresence>
                    {viewMode === 'interactive' && (
                        <motion.div
                            key="interactive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.base, ease: EASE }}
                            className="space-y-8"
                        >
                            {/* Interactive Tab Switcher & Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-theme-card p-2 rounded-2xl border border-theme-border">
                                <div className="flex p-1">
                                    {INTERACTIVE_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveInteractiveTab(tab.id)}
                                            className={clsx(
                                                'relative rounded-xl px-6 py-2 text-sm font-medium transition-all duration-200',
                                                activeInteractiveTab === tab.id
                                                    ? 'text-theme-text bg-theme-bg shadow-md border border-theme-border'
                                                    : 'text-theme-text/50 hover:text-theme-text hover:bg-theme-text/5'
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 pr-2">
                                    <Button
                                        href={currentInteractiveDownload?.download}
                                        download={currentInteractiveDownload?.filename}
                                        variant="secondary"
                                        aria-label="Download resume PDF"
                                        className="h-9 px-4 text-xs font-medium gap-2"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        onClick={handlePrint}
                                        variant="secondary"
                                        aria-label="Print resume"
                                        className="h-9 px-4 text-xs font-medium gap-2"
                                    >
                                        <Printer className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            {activeInteractiveTab === 'english' ? (
                                <motion.div
                                    key="english-interactive"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: DURATION.fast, ease: EASE }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                                >
                                    {/* Sticky Navigation Sidebar */}
                                    <aside className="hidden lg:block lg:col-span-3">
                                        <nav className="sticky top-24 space-y-2">
                                            <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-4 pl-3">Contents</p>
                                            {[
                                                { id: 'summary', label: 'Summary', icon: FileText },
                                                { id: 'skills', label: 'Skills', icon: Layers },
                                                { id: 'experience', label: 'Experience', icon: Briefcase },
                                                { id: 'projects', label: 'Projects', icon: Server },
                                                { id: 'education', label: 'Education', icon: BookOpen },
                                                { id: 'certifications', label: 'Certifications', icon: Award },
                                            ].map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-theme-muted hover:text-cyan-accent hover:bg-theme-text/5 rounded-lg transition-all"
                                                >
                                                    <item.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    {item.label}
                                                </a>
                                            ))}
                                        </nav>
                                    </aside>

                                    {/* Main Content Area */}
                                    <div className="lg:col-span-9 space-y-24">
                                        {/* Summary Section */}
                                        <section id="summary" className="scroll-mt-32">
                                            <div className="relative bg-gradient-to-br from-cyan-accent/10 via-theme-card to-theme-bg p-8 rounded-3xl border border-cyan-accent/20 shadow-sm">
                                                <h2 className="text-2xl font-bold text-theme-text mb-6 flex items-center gap-3">
                                                    <div className="p-2 bg-cyan-accent rounded-xl text-[var(--theme-bg)] shadow-glow-accent">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    Professional Summary
                                                </h2>
                                                <p className="text-lg text-theme-text/80 leading-relaxed font-light">
                                                    {SUMMARY}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Skills Section */}
                                        <section id="skills" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-px bg-theme-border flex-1" />
                                                <h2 className="text-2xl font-bold text-theme-text flex items-center gap-2">
                                                    <span className="text-cyan-accent">#</span> Technical Skills
                                                </h2>
                                                <div className="h-px bg-theme-border flex-1" />
                                            </div>
                                            <div className="bg-theme-card/50 rounded-3xl p-6 border border-theme-border">
                                                <TechStack data={SKILLS_DATA} />
                                            </div>
                                        </section>

                                        {/* Experience Section */}
                                        <section id="experience" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-theme-elevated rounded-xl">
                                                    <Briefcase className="w-6 h-6 text-theme-muted" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-theme-text">
                                                    Experience
                                                </h2>
                                            </div>
                                            <Timeline items={EXPERIENCE_DATA} />
                                        </section>

                                        {/* Projects Section */}
                                        <section id="projects" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-theme-elevated rounded-xl">
                                                    <Server className="w-6 h-6 text-theme-muted" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-theme-text">
                                                    Projects
                                                </h2>
                                            </div>
                                            <Timeline items={PROJECTS_DATA} />
                                        </section>

                                        {/* Education Section */}
                                        <section id="education" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-theme-elevated rounded-xl">
                                                    <BookOpen className="w-6 h-6 text-theme-muted" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-theme-text">
                                                    Education
                                                </h2>
                                            </div>
                                            <Timeline items={EDUCATION_DATA} />
                                        </section>

                                        {/* Certificates, Achievements, Languages Grid */}
                                        <div id="certifications" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-12">
                                            {/* Certificates Column */}
                                            <section>
                                                <div className="flex items-center gap-4 mb-6">
                                                     <div className="p-2 bg-cyan-accent/10 rounded-lg">
                                                         <Award className="w-6 h-6 text-cyan-accent" />
                                                     </div>
                                                    <h2 className="text-2xl font-bold text-theme-text">
                                                        Certificates
                                                    </h2>
                                                </div>
                                                <ul className="grid grid-cols-1 gap-4">
                                                    {CERTIFICATES_DATA.map((cert, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            whileHover={{ scale: 1.02, y: -2 }}
                                                            className="group relative flex flex-col gap-2 bg-theme-card p-5 rounded-2xl border border-theme-border shadow-sm hover:shadow-md transition-all"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <span className="font-semibold text-theme-text pr-4">{cert.title}</span>
                                                                {cert.link !== '#' && (
                                                                    <a
                                                                        href={cert.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        aria-label={`View certificate: ${cert.title}`}
                                                                        className="text-theme-muted hover:text-cyan-accent transition-colors"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <div className="h-1 w-12 bg-cyan-accent/30 rounded-full group-hover:w-full group-hover:bg-cyan-accent transition-all duration-500" />
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </section>

                                            {/* Achievements & Languages Column */}
                                            <div className="space-y-12">
                                                {/* Achievements */}
                                                <section>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                                            <Award className="w-6 h-6 text-amber-500" />
                                                        </div>
                                                        <h2 className="text-2xl font-bold text-theme-text">
                                                            Achievements
                                                        </h2>
                                                    </div>
                                                    <ul className="space-y-4">
                                                        {ACHIEVEMENTS_DATA.map((item, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: 20 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.1, duration: DURATION.fast, ease: EASE }}
                                                                className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-amber-500"
                                                            >
                                                                <h3 className="font-semibold text-theme-text">{item.title}</h3>
                                                                <p className="text-sm text-theme-muted mt-1 leading-relaxed">{item.description}</p>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </section>

                                                {/* Languages */}
                                                <section>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                                                            <Globe className="w-6 h-6 text-indigo-500" />
                                                        </div>
                                                        <h2 className="text-2xl font-bold text-theme-text">
                                                            Languages
                                                        </h2>
                                                    </div>
                                                    <ul className="space-y-6">
                                                        {[
                                                            { ...LANGUAGES_DATA[0], percent: 85, color: 'bg-indigo-500' }, // English
                                                            { ...LANGUAGES_DATA[1], percent: 40, color: 'bg-pink-500' },   // Japanese
                                                            { ...LANGUAGES_DATA[2], percent: 100, color: 'bg-emerald-500' } // Urdu
                                                        ].map((lang, idx) => (
                                                            <li key={idx}>
                                                                <div className="flex justify-between items-end mb-2">
                                                                    <span className="font-medium text-theme-text">{lang.language}</span>
                                                                    <span className="text-xs font-medium text-theme-muted">{lang.proficiency}</span>
                                                                </div>
                                                                <div className="h-2 w-full bg-theme-text/10 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        whileInView={{ width: `${lang.percent}%` }}
                                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                                        className={`h-full ${lang.color} rounded-full`}
                                                                    />
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="japanese-interactive"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: DURATION.fast, ease: EASE }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                                >
                                    {/* Sticky Navigation Sidebar (Japanese) */}
                                    <aside className="hidden lg:block lg:col-span-3">
                                        <nav className="sticky top-24 space-y-2">
                                            <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-4 pl-3">目次 (Contents)</p>
                                            {[
                                                { id: 'basic-info', label: '基本情報 (Basic Info)', icon: FileText },
                                                { id: 'history', label: '学歴・職歴 (History)', icon: Briefcase },
                                                { id: 'licenses', label: '免許・資格 (Licenses)', icon: Award },
                                                { id: 'pr-skills', label: 'PR・スキル (PR/Skills)', icon: Layers },
                                            ].map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-theme-muted hover:text-cyan-accent hover:bg-theme-text/5 rounded-lg transition-all"
                                                >
                                                    <item.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    {item.label}
                                                </a>
                                            ))}
                                        </nav>
                                    </aside>

                                    {/* Main Content Area */}
                                    <div className="lg:col-span-9">
                                        <div className="flex justify-center xl:justify-start">
                                            <div className="w-full max-w-[210mm]">
                                                <Rirekisho data={DATA_JP} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {viewMode === 'pdf' && (
                        <motion.div
                            key="pdf"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.base, ease: EASE }}
                            className="bg-theme-card/30 rounded-3xl border border-theme-border shadow-2xl relative"
                        >
                            {/* PDF Viewer Toolbar */}
                            <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-theme-card/90 backdrop-blur-md border-b border-theme-border rounded-t-3xl">
                                {/* Left: Language Selector */}
                                <div className="flex space-x-1 rounded-lg bg-theme-bg p-1 border border-theme-border">
                                    {PDF_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActivePdfTab(tab.id)}
                                            aria-label={`Show ${tab.label}`}
                                            className={clsx(
                                                'relative rounded-md px-4 py-1.5 text-xs font-medium transition-colors',
                                                activePdfTab === tab.id
                                                    ? 'text-theme-text bg-theme-card border border-theme-border shadow-sm'
                                                    : 'text-theme-text/50 hover:text-theme-text'
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Center: Zoom Controls */}
                                <div className="flex items-center gap-2 bg-theme-bg rounded-lg p-1 border border-theme-border">
                                    <button
                                        onClick={handleZoomOut}
                                        className="p-1.5 hover:bg-theme-card rounded-md text-theme-text/60 hover:text-theme-text transition"
                                        aria-label="Zoom Out"
                                        disabled={zoomLevel <= 0.5}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                                    </button>
                                    <span className="text-xs font-mono font-medium text-theme-text/60 w-12 text-center">
                                        {Math.round(zoomLevel * 100)}%
                                    </span>
                                    <button
                                        onClick={handleZoomIn}
                                        className="p-1.5 hover:bg-theme-card rounded-md text-theme-text/60 hover:text-theme-text transition"
                                        aria-label="Zoom In"
                                        disabled={zoomLevel >= 2.5}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                                    </button>
                                    <button
                                        onClick={handleResetZoom}
                                        aria-label="Reset zoom"
                                        className="px-2 py-1.5 text-xs hover:bg-theme-card rounded-md text-theme-text/50 hover:text-theme-text transition ml-1"
                                    >
                                        Reset
                                    </button>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={currentPdfTab.download}
                                        download={currentPdfTab.filename}
                                        aria-label="Download PDF"
                                        className="p-2 hover:bg-theme-card rounded-full text-theme-text/60 hover:text-theme-text transition border border-transparent hover:border-theme-border"
                                        title="Download PDF"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={currentPdfTab.download}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Open PDF in new tab"
                                        className="p-2 hover:bg-theme-card rounded-full text-theme-text/60 hover:text-theme-text transition border border-transparent hover:border-theme-border"
                                        title="Open in New Tab"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Viewer Area - Natural Flow (No max-h) */}
                            <div className="p-8 md:p-12 lg:p-16 flex justify-center bg-theme-bg/60 rounded-b-3xl">
                                <motion.div
                                    key={activePdfTab}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: DURATION.fast, ease: EASE }}
                                    className="origin-top flex flex-col gap-8 shadow-2xl transition-all duration-300 ease-out will-change-transform"
                                    style={{ width: '100%', maxWidth: `${850 * zoomLevel}px` }}
                                >
                                    {activePdfTab === 'english' && (
                                        <>
                                            <ResumePageImage src={resumeImage1} alt="English Resume Page 1" priority />
                                            <ResumePageImage src={resumeImage2} alt="English Resume Page 2" />
                                        </>
                                    )}
                                    {activePdfTab === 'japanese' && (
                                        <>
                                            <ResumePageImage src={resumeImage11} alt="Japanese Resume Page 1" priority />
                                            <ResumePageImage src={resumeImage12} alt="Japanese Resume Page 2" />
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {viewMode === 'latex' && (
                        <motion.div
                            key="latex"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: DURATION.base, ease: EASE }}
                            className="space-y-6 print:space-y-0"
                        >
                            {/* Toolbar (Hidden when printing) */}
                            <div className="bg-theme-card/90 backdrop-blur-md border border-theme-border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                                {/* Left: Template Selector */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-cyan-accent/10 text-cyan-accent rounded-xl">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex rounded-xl bg-theme-bg p-1 border border-theme-border">
                                            {[
                                                { id: 'infrastructure', label: 'Infrastructure CV' },
                                                { id: 'general', label: 'Software Engineer CV' }
                                            ].map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setSelectedTexTemplate(t.id)}
                                                    className={clsx(
                                                        'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                                                        selectedTexTemplate === t.id
                                                            ? 'text-theme-text bg-theme-card border border-theme-border shadow-sm'
                                                            : 'text-theme-text/50 hover:text-theme-text'
                                                    )}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                                    {/* Print Button */}
                                    <button
                                        onClick={handlePrint}
                                        className="flex items-center justify-center h-9 px-4 rounded-xl text-xs font-semibold bg-cyan-accent hover:opacity-90 text-[var(--theme-bg)] gap-2 transition-all shadow-sm"
                                    >
                                        <Printer className="w-3.5 h-3.5" />
                                        <span>Print Resume</span>
                                    </button>

                                    {/* Open in Overleaf button */}
                                    <Button
                                        href={`https://www.overleaf.com/docs?snip_uri=${encodeURIComponent(
                                            typeof window !== 'undefined'
                                                ? `${window.location.origin}/docs/UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`
                                                : `https://usamabukhari.com/docs/UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="secondary"
                                        className="h-9 px-4 text-xs font-semibold gap-2 border-theme-border hover:bg-theme-text/5 transition-all text-theme-text"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
                                        <span>Open in Overleaf</span>
                                    </Button>

                                    {/* Download */}
                                    <a
                                        href={`/docs/UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`}
                                        download={`UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`}
                                        className="flex items-center justify-center h-9 px-4 rounded-xl text-xs font-medium transition-all bg-theme-bg border border-theme-border hover:bg-theme-card/85 text-theme-text gap-2 shadow-sm"
                                    >
                                        <Download className="w-3.5 h-3.5 text-theme-text/60" />
                                        <span>Download .tex</span>
                                    </a>
                                </div>
                            </div>

                            {/* Rendered Resume Preview */}
                            <div className="flex justify-center items-start print:block">
                                <div className="w-full xl:overflow-y-auto print:overflow-visible bg-theme-bg/60 p-4 xl:p-8 rounded-3xl border border-theme-border print:border-none print:bg-transparent print:p-0">
                                    <LaTeXResumeRenderer latex={latexCode} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div >
        </Container >
    )
}

function ResumePageImage({ src, alt, priority = false }) {
    return (
        <div className="relative w-full bg-white shadow-lg overflow-hidden ring-1 ring-theme-border">
            <Image
                src={src}
                alt={alt || "Usama Bukhari Resume Page"}
                className="w-full h-auto"
                sizes="(min-width: 1280px) 50rem, (min-width: 1024px) 45rem, 100vw"
                priority={priority}
                placeholder="blur"
            />
        </div>
    )
}
