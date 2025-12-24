"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { AppContext } from '@/app/providers';
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { PublicationCard } from '@/components/ui/PublicationCard';
import { TechStack } from '@/components/ui/TechStack';
import { Timeline } from '@/components/ui/Timeline';


import image1 from '/public/images/photos/image-1.jpg';
import image2 from '/public/images/photos/image-2.jpg';
import image3 from '/public/images/photos/image-3.jpg';
import image4 from '/public/images/photos/image-4.jpg';

const publications = [
    {
        title: "Optimizing Neural Networks for Medical Imaging Diagnosis using Evolutionary Algorithms",
        authors: ["Usama Bukhari", "Satoshi Hori"],
        venue: "IEEE International Conference on Bioinformatics and Biomedicine (BIBM)",
        year: "2024",
        type: "Conference",
        abstract: "This paper proposes a novel evolutionary strategy for hyperparameter optimization in deep convolutional neural networks, specifically tailored for detecting anomalies in high-resolution MRI scans. Our approach reduces computational cost by 40% while maintaining state-of-the-art accuracy.",
        links: {
            pdf: "#",
            code: "https://github.com",
            project: "#"
        }
    },
    {
        title: "Graph Neural Networks in Predictive Healthcare: A Survey",
        authors: ["Usama Bukhari", "Research Group A"],
        venue: "Journal of Biomedical Informatics",
        year: "2023",
        type: "Journal",
        abstract: "A comprehensive survey on the application of GNNs in healthcare, focusing on patient outcome prediction, drug discovery, and disease usage patterns. We categorize existing methods and propose future research directions.",
        links: {
            pdf: "#"
        }
    }
];

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
    // If intro has been shown in this session (context), skip loading.
    const [isLoading, setIsLoading] = useState(!introShown);
    const [activeCategory, setActiveCategory] = useState("All");

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
                                        <span className="font-body text-[10px] tracking-widest text-cyan-accent uppercase">OneEyeOwl Online</span>
                                    </div>
                                    <div className="h-[1px] w-12 bg-theme-text/10"></div>
                                </div>

                                {/* Name & Titles */}
                                <div className="space-y-6">
                                    <p className="font-body text-xl md:text-2xl tracking-[0.2em] text-cyan-accent uppercase">
                                        I'm Syed Usama Bukhari
                                    </p>

                                    <div className="flex flex-col gap-2 relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-accent via-cyan-accent/50 to-transparent" />
                                        <div className="pl-6 space-y-1 text-4xl md:text-6xl lg:text-8xl font-bold font-heading leading-[0.95] tracking-tight">
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                                className="block text-2xl md:text-4xl text-cyan-accent"
                                            >
                                                Software Engineer
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                                className="block text-2xl md:text-4xl text-theme-text/80"
                                            >
                                                Data Scientist
                                            </motion.span>
                                            <motion.span
                                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                                className="block text-2xl md:text-4xl text-theme-text/60"
                                            >
                                                PhD Researcher
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
                                            <span className="font-body text-[10px] text-theme-text/50">[ ABSTRACT_01 ]</span>
                                        </div>
                                        <p className="text-theme-text/80 text-lg leading-relaxed font-light">
                                            <strong className="text-theme-text font-normal">Web & Desktop Application Developer.</strong> Result-oriented individual with a strong aptitude to solve complex problems. Capable of showing firm and positive response to work while under pressure. Firm grip in numerous programming languages incl.
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
                                        <span className="relative group-hover:text-theme-bg transition-colors">DOWNLOAD_RESUME</span>
                                    </a>
                                    <a href="#projects" className="group px-8 py-3 border border-theme-text/20 text-theme-text font-bold font-body text-sm hover:border-cyan-accent transition-colors flex items-center gap-2">
                                        <span>VIEW_RESEARCH_DATA</span>
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
                                About <span className="text-cyan-accent">Me</span>
                            </motion.h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="space-y-6 text-theme-text/80 leading-relaxed"
                                >
                                    <p>
                                        I am a <strong className="text-theme-text">Software Engineer</strong> and <strong className="text-theme-text">PhD Researcher</strong> with a passion for bridging the gap between theoretical computer science and practical application.
                                    </p>
                                    <p>
                                        My research focuses on <span className="text-cyan-accent">Advanced Algorithms</span> and <span className="text-cyan-accent">Machine Learning</span>, while my professional work involves building robust, scalable web and desktop applications.
                                    </p>
                                    <p>
                                        I thrive in challenging environments where I can apply my technical expertise to solve complex problems and create meaningful digital experiences.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="relative"
                                >
                                    {/* Decorative Technical Card */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-accent/20 to-transparent rounded-xl blur-xl opacity-50"></div>
                                    <div className="relative bg-theme-card/50 backdrop-blur-sm border border-theme-text/10 p-6 rounded-xl space-y-6">
                                        <div className="flex justify-between items-center border-b border-theme-text/10 pb-4">
                                            <span className="font-body text-xs text-cyan-accent tracking-widest">SYSTEM_STATS</span>
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 font-body text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">Location</span>
                                                <span className="text-theme-text">Fukuoka, Japan</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">Degree</span>
                                                <span className="text-theme-text">PhD (In Progress)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">Experience</span>
                                                <span className="text-theme-text">3+ Years</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-theme-text/60">Status</span>
                                                <span className="text-cyan-accent animate-pulse">Available for Hire</span>
                                            </div>
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
                                Selected <span className="text-cyan-accent">Publications</span>
                            </motion.h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {publications.map((pub, index) => (
                                    <PublicationCard key={index} publication={pub} />
                                ))}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section id="projects" className="snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 min-h-[1600px] md:min-h-[1100px] lg:min-h-screen">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-4xl md:text-5xl font-bold font-heading text-theme-text">
                                    Project <span className="text-cyan-accent">Works</span>
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
                                Technical <span className="text-cyan-accent">Arsenal</span>
                            </motion.h2>
                            <TechStack />
                        </section>

                        {/* Experience Section */}
                        <section id="experience" className="min-h-screen snap-start flex flex-col justify-center max-w-5xl mx-auto w-full px-4 md:px-8">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-16">Experience <span className="text-cyan-accent">Timeline</span></h2>
                            <Timeline items={experiences} />
                        </section>

                        {/* Contact Section */}
                        <section id="contact" className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 pb-32">
                            <div className="bg-gradient-to-br from-theme-text/5 to-transparent p-8 md:p-12 rounded-3xl border border-theme-text/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-6">Let's work together</h2>
                                        <p className="text-theme-text/60 mb-8">
                                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                        </p>
                                        {/* <a href="mailto:john@example.com" className="text-2xl font-bold font-heading text-cyan-accent hover:underline">
                                            john@example.com
                                        </a> */}
                                    </div>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors" />
                                            <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors" />
                                        </div>
                                        <textarea placeholder="Message" rows="4" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-body transition-colors"></textarea>
                                        <button type="submit" className="px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-body rounded-lg hover:bg-cyan-400 transition-colors w-full">
                                            Send Message
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