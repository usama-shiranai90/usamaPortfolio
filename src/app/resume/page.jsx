'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Layers, BookOpen, Award, Globe, Briefcase, FileText, Server, Download, Printer, ExternalLink } from "lucide-react";

import { Timeline } from '@/components/ui/Timeline'
import { TechStack } from '@/components/ui/TechStack'
import { Rirekisho } from '@/components/ui/Rirekisho'
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

const VIEW_MODES = [
    { id: 'interactive', label: 'Interactive', icon: Layers },
]

export default function Resume() {
    const [viewMode, setViewMode] = useState('interactive')
    const [activeInteractiveTab, setActiveInteractiveTab] = useState(INTERACTIVE_TABS[0].id)

    const currentInteractiveDownload = PDF_TABS.find((tab) => tab.id === activeInteractiveTab)

    const handlePrint = () => {
        window.print()
    }

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
                <div className="hidden mt-8 flex flex-col flex-wrap items-center justify-center gap-4">
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
                                                { id: 'projects', label: 'Projects', icon: Server },
                                                { id: 'experience', label: 'Experience', icon: Briefcase },
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
                                            <Timeline items={PROJECTS_DATA} label="Projects" />
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
                                            <Timeline items={EXPERIENCE_DATA} label="Experience" />
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
                                            <Timeline items={EDUCATION_DATA} label="Education" />
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
                                    {/* Sticky Navigation Sidebar */}
                                    <aside className="hidden lg:block lg:col-span-3">
                                        <nav className="sticky top-24 space-y-2">
                                            <p className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-4 pl-3">Contents</p>
                                            {[
                                                { id: 'rirekisho', label: '履歴書 (Rirekisho)', icon: FileText },
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
                </AnimatePresence>
            </div>
        </Container>
    )
}
