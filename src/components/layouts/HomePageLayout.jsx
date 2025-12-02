"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from 'next/link';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { SiJavascript, SiPython, SiMongodb, SiPostgresql, SiGooglecloud } from 'react-icons/si';

import image1 from '/public/images/photos/image-1.jpg';
import image2 from '/public/images/photos/image-2.jpg';
import image3 from '/public/images/photos/image-3.jpg';
import image4 from '/public/images/photos/image-4.jpg';

const projects = [
    {
        title: "Project One",
        description: "A description of the first project. It does amazing things.",
        tags: ["React", "Next.js", "Tailwind"],
        image: image1,
        github: "#",
        demo: "#"
    },
    // ... add other projects
];

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

const JsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" className="w-5 h-5">
        <path fill="currentColor" d="M3 3h18v18H3V3zm13.5 13.5c.3 0 .6-.1.8-.3.2-.2.3-.5.3-.9v-3.5h-1.5v3.4c0 .3-.1.5-.2.6-.1.1-.4.2-.7.2-.3 0-.6-.1-.9-.4l-1 1c.5.6 1.2.9 2.2.9zM8.5 16.5c.6 0 1.1-.1 1.6-.4l-.8-1.1c-.2.2-.5.3-.8.3-.3 0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.9V11H6v3.3c0 .8.3 1.5.8 1.9.5.4 1.1.6 1.7.6z" />
    </svg>
);

const PythonIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77V9.7l.09.4.15.38.2.34.25.29.28.24.32.18.33.14.34.09.34.05.32.02h2.5l.38.03.35.08.31.14.27.18.22.23.17.27.12.3.07.33.03.34v2.96l-.03.35-.07.34-.12.3-.17.26-.22.23-.27.18-.31.14-.35.08-.38.03h-2.5l-.63-.05-.55-.13-.46-.21-.38-.26-.31-.3-.25-.33-.19-.35-.14-.35-.1-.33-.07-.3-.04-.26-.02-.21v-3.6l.04-.37.1-.34.16-.31.2-.27.25-.23.28-.18.31-.13.34-.09.35-.05.34-.02h4.77V8.5l-.09-.4-.15-.38-.2-.34-.25-.29-.28-.24-.32-.18-.33-.14-.34-.09-.34-.05-.32-.02H9.25l-.38-.03-.35-.08-.31-.14-.27-.18-.22-.23-.17-.27-.12-.3-.07-.33-.03-.34V2.22l.03-.35.07-.34.12-.3.17-.26.22-.23.27-.18.31-.14.35-.08.38-.03h5.08z" />
    </svg>
);

const MongoIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.16 11.23c-.15-2.61-.1-5.12.1-7.53 1.05 3.3 2.15 6.45 2.15 10.05 0 2.2-.5 4.15-1.45 5.85-.9-2.05-1.15-4.2-1.15-6.35.1.7.2 1.35.35 2.05V11.23zM12.1 23.33c-.1 0-.15 0-.25-.05-3.3-1.85-5.2-4.9-5.2-8.55 0-3.3 1.1-6 2.75-8.3.15-.2.3-.3.45-.45.05.15.15.35.2.5.55 2.15.7 4.6.65 7.15-1.05-3.15-1.7-6.05-1.6-8.9.05-1.25.3-2.65.65-4.05.05-.2.15-.3.2-.3h.25c.05 0 .15.1.2.3.4 1.5.65 2.95.7 4.3.1 2.95-.5 5.9-1.5 9 .05-2.25.2-4.45-.45-6.45-.1-.3-.2-.6-.35-.9-.25 2.55-.25 5.15-.1 7.6 1.45-3.4 2.8-7.3 2.55-12.2 2.65 3.25 4.35 6.6 4.35 10.65 0 4.1-2.2 7.7-6.1 9.55-.55.25-1.1.45-1.65.6z" />
    </svg>
);

const SqlIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4z" />
        <path d="M4 7v5c0 2.21 3.58 4 8 4s8-1.79 8-4V7" />
        <path d="M4 12v5c0 2.21 3.58 4 8 4s8-1.79 8-4v-5" />
    </svg>
);

const CloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10c-.15 0-.297.008-.442.023C16.51 6.945 13.97 4.5 10.5 4.5 6.91 4.5 4 7.41 4 11c0 .17.009.338.026.504C2.315 12.387 1 14.368 1 16.5 1 19.538 3.462 22 6.5 22h11c2.485 0 4.5-2.015 4.5-4.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const tools = [
    { icon: JsIcon, label: "JavaScript", color: "hover:text-yellow-400" },
    { icon: PythonIcon, label: "Python", color: "hover:text-blue-400" },
    { icon: MongoIcon, label: "MongoDB", color: "hover:text-green-500" },
    { icon: SqlIcon, label: "PostgreSQL", color: "hover:text-cyan-400" },
    { icon: CloudIcon, label: "Google Cloud", color: "hover:text-red-400" },
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
                        <Tool.icon />
                        {hovered === i && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute right-full mr-4 py-1 px-2 bg-theme-bg/90 border border-theme-text/10 rounded text-[10px] font-mono whitespace-nowrap text-theme-text"
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
                    <span className="text-[10px] font-mono font-bold text-cyan-accent group-hover:text-theme-text transition-colors">
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
    return (
        <div className="relative text-theme-text transition-colors duration-500 min-h-screen">
            <ScientificBackground />
            <RightTools />

            <div className="flex flex-col h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10 no-scrollbar">
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
                                <span className="font-mono text-[10px] tracking-widest text-cyan-accent uppercase">OneEyeOwl Online</span>
                            </div>
                            <div className="h-[1px] w-12 bg-theme-text/10"></div>
                        </div>

                        {/* Name & Titles */}
                        <div className="space-y-6">
                            <p className="font-mono text-xl md:text-2xl tracking-[0.2em] text-cyan-accent uppercase">
                                I'm Syed Usama Bukhari
                            </p>

                            <div className="flex flex-col gap-2 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-accent via-cyan-accent/50 to-transparent" />
                                <div className="pl-6 space-y-1 text-4xl md:text-6xl lg:text-8xl font-bold font-syne leading-[0.95] tracking-tight">
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
                                    <span className="font-mono text-[10px] text-theme-text/50">[ ABSTRACT_01 ]</span>
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
                            <a href="#contact" className="group relative px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-mono text-sm overflow-hidden">
                                <div className="absolute inset-0 bg-theme-text translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative group-hover:text-theme-bg transition-colors">INITIATE_CONTACT</span>
                            </a>
                            <a href="#projects" className="group px-8 py-3 border border-theme-text/20 text-theme-text font-bold font-mono text-sm hover:border-cyan-accent transition-colors flex items-center gap-2">
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
                        className="text-4xl md:text-5xl font-bold font-syne text-theme-text mb-12"
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
                                    <span className="font-mono text-xs text-cyan-accent tracking-widest">SYSTEM_STATS</span>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    </div>
                                </div>

                                <div className="space-y-4 font-mono text-sm">
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
                <section id="projects" className="min-h-screen snap-start flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8">
                    <div className="flex items-end justify-between mb-16">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-bold font-syne text-theme-text"
                        >
                            Selected <br /> <span className="text-cyan-accent">Works</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                        {projects.map((project, index) => (
                            <div key={index} className={index % 2 !== 0 ? "md:mt-20" : ""}>
                                <ProjectCard project={project} index={index} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="min-h-screen snap-start flex flex-col justify-center max-w-4xl mx-auto w-full px-4 md:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-syne text-theme-text mb-16">Experience</h2>
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
                                    <h3 className="text-2xl font-bold font-syne text-theme-text group-hover:text-cyan-accent transition-colors">{exp.role}</h3>
                                    <span className="font-mono text-sm text-cyan-accent/70">{exp.period}</span>
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
                                <h2 className="text-4xl md:text-5xl font-bold font-syne text-theme-text mb-6">Let's work together</h2>
                                <p className="text-theme-text/60 mb-8">
                                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                </p>
                                {/* <a href="mailto:john@example.com" className="text-2xl font-bold font-syne text-cyan-accent hover:underline">
                                    john@example.com
                                </a> */}
                            </div>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-mono transition-colors" />
                                    <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-mono transition-colors" />
                                </div>
                                <textarea placeholder="Message" rows="4" className="w-full px-4 py-3 bg-theme-card/50 border border-theme-text/10 rounded-lg focus:border-cyan-accent focus:outline-none text-theme-text font-mono transition-colors"></textarea>
                                <button type="submit" className="px-8 py-3 bg-cyan-accent text-theme-bg font-bold font-mono rounded-lg hover:bg-cyan-400 transition-colors w-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}