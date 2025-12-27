"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { AppContext } from '@/app/providers';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PublicationCard } from '@/components/ui/PublicationCard';
import { TechStack } from '@/components/ui/TechStack';
import { Timeline } from '@/components/ui/Timeline';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/utils/translations';
import { AlertTriangle, X } from 'lucide-react';


import avatar_1 from '/public/images/avatars/avatar_1.jpg';
import image1 from '/public/images/photos/image-1.jpg';
import image2 from '/public/images/photos/image-2.jpg';
import image3 from '/public/images/photos/image-3.jpg';
import image4 from '/public/images/photos/image-4.jpg';

const publications = [
    {
        title: "Real-Time Data Retrieval from Life-long Medical History Using Small Language Model",
        authors: ["Syed Usama Hussain Shah Bukhari", "Forhad Hossain", "Ashir Ahmed"],
        venue: "SocialTech Summit 2024",
        year: "Aug 2024",
        type: "Conference",
        abstract: "This study addresses the challenges of managing and visualizing comprehensive medical histories in resource-limited healthcare settings. The Smart Health Gantt Chart (SHGC) system is introduced to improve healthcare delivery by enabling efficient management and sharing of digital medical records. However, current systems face significant obstacles in extracting relevant information from large volumes of data for clinical decision-making. To overcome these issues, the paper proposes a novel approach for the integration of Small Language Models and custom CoVeMedRAG technique to generate real-time, contextual insights from patient histories.",
        links: {
            pdf: "https://www.researchgate.net/publication/385831791_Real-Time_Data_Retrieval_from_Life-long_Medical_History_Using_Small_Language_Model"
        }
    },
    {
        title: "A Proposed Framework for Integrating Digital Triage with 3D Human Model for Intuitive Health Visualization and Monitoring",
        authors: ["Md Jobayer Hossain Chowdhury", "Mohamed Mehfoud Bouh", "Abdullah Al Noman", "Syed Usama Hussain Shah Bukhari", "Ashir Ahmed"],
        venue: "15th International Conference on Simulation and Modeling Methodologies, Technologies and Applications",
        year: "Jan 2025",
        type: "Conference",
        doi: "10.5220/0013567200003970",
        abstract: "This paper presents a novel integration of digital triage protocols with three-dimensional human digital twin models to enhance patient assessment and clinical decision-making in healthcare. We investigate how Electronic Health Record (EHR) data can be transformed into intuitive, anatomically-relevant visualizations that map health parameters to specific body regions using color-coded indicators. Building upon the B-logic framework from Portable Health Clinic systems, our approach creates personalized 3D patient models that dynamically represent health status through targeted visual cues.",
        links: {
            pdf: "https://www.researchgate.net/publication/392998990_A_Proposed_Framework_for_Integrating_Digital_Triage_with_3D_Human_Model_for_Intuitive_Health_Visualization_and_Monitoring"
        }
    }
];

const publicationCategories = ["Journal", "Conference", "Poster"];

const projects = [
    {
        title: "Catalyst - A Web Solution For OBE",
        description: "A web application made for foundation university to automate progressive course profile, manage respective users and track student performance.",
        tags: ["Web App", "Education", "Management"],
        category: "Web Dev",
        image: image1,
        github: "https://github.com",
        demo: "#"
    },
    {
        title: "Portable Health Clinic 2.0",
        description: "Portable Health Clinic (PHC) aims to build an affordable, usable, and sustainable preventive healthcare system for unreached people.",
        tags: ["Healthcare", "Preventive System", "Global Health"],
        category: "Healthcare",
        image: image2,
        github: "#",
        demo: "https://portable-health.org"
    },
    {
        title: "Smart Health Gantt Chart",
        description: "Portable Health Clinic (PHC) aims to build an affordable, usable, and sustainable preventive healthcare system for unreached people.",
        tags: ["Data Visualization", "Healthcare", "Analytics"],
        category: "Healthcare",
        image: image3,
        github: "#",
        demo: "https://shgchart.com"
    },
    {
        title: "Advance SMTP Sender",
        description: "Real-time SMTP based sender using python and streamlit.",
        tags: ["Python", "Streamlit", "SMTP"],
        category: "Python",
        image: image4,
        github: "https://github.com",
        demo: "#"
    },
    {
        title: "OllamaMedVoice",
        description: "The project that integrates the Ollama-based models and ChatGPT with audio recognition technology to provide accurate and efficient medical question answering.",
        tags: ["AI", "Ollama", "Voice Recognition", "Medical"],
        category: "AI/ML",
        image: image1,
        github: "https://github.com",
        demo: "#"
    }
];

const categories = ["All", "Web Dev", "Healthcare", "AI/ML", "Python"];

const experiences = [
    {
        company: "Kyushu University",
        role: "Research Student",
        period: "2024 - Present",
        description: "Conducting research on advanced algorithms and machine learning applications. Focusing on evolutionary strategies for neural architecture search.",
        tags: ["Machine Learning", "Python", "Research"]
    },
    {
        company: "Carecloud",
        role: "Software Engineer",
        period: "Feb 2023 - Sept 2023",
        description: "Developed and maintained healthcare software solutions using .NET and Angular. Implemented FHIR standards for interoperability.",
        tags: [".NET", "Angular", "Healthcare IT"]
    },
    {
        company: "Immentia",
        role: "Software Engineer",
        period: "Aug 2022 - Jan 2023",
        description: "Worked on full-stack web development projects for international clients. Built scalable APIs and responsive front-end interfaces.",
        tags: ["React", "Node.js", "Full Stack"]
    }
];

export default function HomePageLayout() {
    const { introShown, setIntroShown } = useContext(AppContext);
    const { language } = useTheme(); // Get language
    const t = translations[language] || translations.en;

    // If intro has been shown in this session (context), skip loading.
    const [isLoading, setIsLoading] = useState(!introShown);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showWarning, setShowWarning] = useState(true);

    useEffect(() => {
        // If context says it's done, ensure we stick to that (though initial state handles it)
        if (introShown) {
            return;
        }

        // Check sessionStorage for refresh persistence
        const hasShownSession = typeof window !== 'undefined' && sessionStorage.getItem('introShown');

        if (hasShownSession) {
            setIntroShown(true);
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setIntroShown(true);
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('introShown', 'true');
                }
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [introShown, setIntroShown]);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="relative text-theme-text transition-colors duration-500 min-h-screen">
            <ScientificBackground />

            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="contents"
                >


                    <div
                        className="h-screen overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth relative z-10"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {/* --- HERO SECTION --- */}
                        <section className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full pt-20 px-4 md:px-8">
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
                                    <a href="/resume" className="group relative px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-body text-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-theme-text translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative group-hover:text-theme-bg transition-colors">{t.buttons.resume}</span>
                                    </a>
                                    <a href="#projects" className="group px-8 py-3 border border-theme-text/20 text-theme-text font-bold font-body text-sm hover:border-cyan-accent transition-colors flex items-center gap-2">
                                        <span>{t.buttons.research}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </section>

                        {/* About Section */}
                        <section id="about" className="min-h-screen snap-start flex flex-col justify-center max-w-5xl mx-auto w-full px-4 md:px-8">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-12"
                            >
                                {t.about.title} <span className="text-cyan-accent">{t.about.highlight}</span>
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
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
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
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
                                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-cyan-accent/30 bg-black/90 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                            {/* Photo */}
                                            <Image
                                                src={avatar_1}
                                                alt="Profile"
                                                fill
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
                                                <h3 className="text-2xl font-bold font-heading text-white mb-2">OneEyeOwl</h3>
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
                        <section id="research" className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-12"
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
                        <section id="projects" className="snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 min-h-[1600px] md:min-h-[1100px] lg:min-h-screen">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-4xl md:text-5xl font-bold font-heading text-theme-text">
                                    {t.projects.title} <span className="text-cyan-accent">{t.projects.highlight}</span>
                                </motion.h2>

                                {/* Category Filter */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat, i) => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`
                                                px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300
                                                ${activeCategory === cat
                                                    ? 'bg-cyan-accent text-theme-bg font-bold shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                                                    : 'bg-theme-card border border-theme-text/10 text-theme-text/60 hover:border-cyan-accent/50 hover:text-cyan-accent'}
                                            `}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.map((project) => (
                                        <ProjectCard key={project.title} project={project} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </section>

                        {/* Skills Section */}
                        <section id="skills" className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-12"
                            >
                                {t.skills.title} <span className="text-cyan-accent">{t.skills.highlight}</span>
                            </motion.h2>
                            <TechStack />
                        </section>

                        {/* Experience Section */}
                        <section id="experience" className="min-h-screen snap-start flex flex-col justify-center max-w-5xl mx-auto w-full px-4 md:px-8">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-16">{t.experience.title} <span className="text-cyan-accent">{t.experience.highlight}</span></h2>
                            <Timeline items={experiences} />
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 pb-32">
                            <div className="bg-gradient-to-br from-theme-text/5 to-transparent p-8 md:p-12 rounded-3xl border border-theme-text/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-6">{t.contact.title}</h2>
                                        <p className="text-theme-text/60 mb-8">
                                            {t.contact.desc}
                                        </p>
                                        {/* <a href="mailto:john@example.com" className="text-2xl font-bold font-heading text-cyan-accent hover:underline">
                                            john@example.com
                                        </a> */}
                                    </div>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder={t.contact.form.name} className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors" />
                                            <input type="email" placeholder={t.contact.form.email} className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors" />
                                        </div>
                                        <textarea placeholder={t.contact.form.message} rows="4" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors"></textarea>
                                        <button type="submit" className="px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-body rounded-lg hover:bg-cyan-400 transition-colors w-full">
                                            {t.contact.form.send}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </motion.div>
            )}
        </div>
    );
}