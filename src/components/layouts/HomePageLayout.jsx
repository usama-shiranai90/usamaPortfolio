"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SiJavascript, SiPython, SiMongodb, SiPostgresql, SiGooglecloud } from 'react-icons/si';

import image1 from '/public/images/photos/image-1.jpg';
import image2 from '/public/images/photos/image-2.jpg';
import image3 from '/public/images/photos/image-3.jpg';
import image4 from '/public/images/photos/image-4.jpg';

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
        description: "Conducting research on advanced algorithms and machine learning applications."
    },
    {
        company: "Carecloud",
        role: "Software Engineer",
        period: "Feb 2023 - Sept 2023",
        description: "Developed and maintained healthcare software solutions using .NET and Angular."
    },
    {
        company: "Immentia",
        role: "Software Engineer",
        period: "Aug 2022 - Jan 2023",
        description: "Worked on full-stack web development projects for international clients."
    }
];

const tools = [
    { icon: SiJavascript, label: "JavaScript", color: "hover:text-yellow-400" },
    { icon: SiPython, label: "Python", color: "hover:text-blue-400" },
    { icon: SiMongodb, label: "MongoDB", color: "hover:text-green-500" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "hover:text-cyan-400" },
    { icon: SiGooglecloud, label: "Google Cloud", color: "hover:text-red-400" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 1.5
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
};

function RightTools() {
    const [hovered, setHovered] = useState(null);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2"
        >
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 100 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mb-2"
            />

            <div className="flex flex-col gap-3">
                {tools.map((Tool, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className={`
                            relative w-10 h-10 rounded-full 
                            bg-theme-card/40 backdrop-blur-md 
                            border border-theme-text/5 
                            flex items-center justify-center 
                            text-theme-text/40 transition-all duration-300
                            hover:border-cyan-accent/50 hover:bg-theme-card/80
                            hover:-translate-x-1 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]
                            group
                            ${Tool.color}
                        `}
                    >
                        <Tool.icon className="w-5 h-5" />
                        {hovered === i && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute right-full mr-4 py-1 px-2 bg-theme-bg/90 border border-theme-text/10 rounded text-[10px] font-body whitespace-nowrap text-theme-text"
                            >
                                {Tool.label}
                            </motion.span>
                        )}
                    </motion.div>
                ))}

                <motion.div
                    variants={itemVariants}
                    className="
                        w-10 h-10 rounded-full 
                        bg-theme-card/40 backdrop-blur-md 
                        border border-theme-text/5 
                        flex items-center justify-center 
                        cursor-pointer group
                        hover:border-cyan-accent/50 hover:bg-cyan-accent/10 transition-all duration-300
                    "
                >
                    <span className="text-[10px] font-body font-bold text-cyan-accent group-hover:text-theme-text transition-colors">
                        +12
                    </span>
                </motion.div>
            </div>

            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 40 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-[1px] bg-gradient-to-b from-theme-text/10 to-transparent mt-2"
            />
        </motion.div>
    );
}

export default function HomePageLayout() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

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
                    <RightTools />

                    <div className="h-screen overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth relative z-10 no-scrollbar">
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
                                    <a href="#contact" className="group relative px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-body text-sm overflow-hidden">
                                        <div className="absolute inset-0 bg-theme-text translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative group-hover:text-theme-bg transition-colors">INITIATE_CONTACT</span>
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

                        {/* Projects Section */}
                        <section id="projects" className="snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 py-20 min-h-[1600px] md:min-h-[1100px] lg:min-h-screen">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-4xl md:text-6xl font-bold font-heading text-theme-text"
                                >
                                    Selected <br /> <span className="text-cyan-accent">Works</span>
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

                        {/* Experience Section */}
                        <section id="experience" className="min-h-screen snap-start flex flex-col justify-center max-w-4xl mx-auto w-full px-4 md:px-8">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-theme-text mb-16">Experience</h2>
                            <div className="space-y-0 border-l border-theme-text/10 ml-3">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="relative pl-12 py-8 group hover:bg-theme-text/5 transition-colors pr-4 rounded-r-xl"
                                    >
                                        <div className="absolute -left-[5px] top-10 w-[9px] h-[9px] rounded-full bg-theme-bg border-2 border-cyan-accent group-hover:bg-cyan-accent transition-colors"></div>
                                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                            <h3 className="text-2xl font-bold font-heading text-theme-text group-hover:text-cyan-accent transition-colors">{exp.role}</h3>
                                            <span className="font-body text-sm text-cyan-accent/70">{exp.period}</span>
                                        </div>
                                        <p className="text-lg text-theme-text/80 mb-2">{exp.company}</p>
                                        <p className="text-theme-text/60 max-w-xl">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
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