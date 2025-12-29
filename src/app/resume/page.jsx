'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Code, Database, Terminal, Layers, Cloud, BookOpen, Award, Globe, Briefcase, FileText, Cpu, Server, Download, Printer } from "lucide-react";


import { Timeline } from '@/components/ui/Timeline'
import { TechStack } from '@/components/ui/TechStack'

import resumeImage1 from 'p/images/resume/Syed Usama Bukhari Resume_Page_1.png'
import resumeImage2 from 'p/images/resume/Syed Usama Bukhari Resume_Page_2.png'

import resumeImage11 from 'p/images/resume/Syed Usama Bukhari EU_Page_1.png'
import resumeImage12 from 'p/images/resume/Syed Usama Bukhari EU_Page_2.png'

const PDF_TABS = [
    { id: 'english', label: 'English Resume', download: '/docs/Usama Bukhari Resume.pdf', filename: 'UsamaBukhari-Resume.pdf' },
    { id: 'japanese', label: 'Japanese Resume', download: '/docs/Syed Usama Bukhari EU.pdf', filename: 'UsamaBukhari-Resume-JP.pdf' },
]

const VIEW_MODES = [
    { id: 'interactive', label: 'Interactive', icon: Layers },
    { id: 'pdf', label: 'PDF View', icon: BookOpen },
]


const SUMMARY = "Software Engineer with experience building data-intensive, healthcare-oriented applications across backend, web, and data engineering stacks. I have shipped production features using Laravel, .NET, modern JavaScript frameworks, and Python, and have hands-on project experience in Java. I am actively strengthening my skills in the Java ecosystem (JavaSE, Vaadin, Spring Boot) through hospital and Portable Health Clinic (PHC)–related projects. At SocialTech Lab, Kyushu University, I work on ETL pipelines (Airflow, dbt, Snowflake), FHIR-based interoperability, and analytics for real-world clinical data. I am currently researching trajectory-aware polypharmacy patients using Retrieval Augmented Generation within learning health systems (LHS), with a focus on delivering scalable, interoperable, and clinician-friendly solutions.";

const SKILLS_DATA = {
    "Programming Languages": {
        icon: Code,
        items: ["JavaSE", "JavaEE", "Python", "PHP", "JavaScript", "React", "Angular"]
    },
    "Frameworks": {
        icon: Layers,
        items: ["Spring Boot", "Vaadin", "Laravel", "Django", "FastAPI"]
    },
    "Technologies & Tools": {
        icon: Terminal,
        items: ["NumPy", "Pandas", "Matplotlib", "Elastic Stack", "Docker", "Kubernetes", "Helm", "Git", "Jira"]
    },
    "Databases": {
        icon: Database,
        items: ["MySQL", "Microsoft SQL Server", "Oracle", "Elasticsearch", "Firebase"]
    },
    "Cloud & DevOps": {
        icon: Cloud,
        items: ["GCP (GKE, Vertex AI)", "AWS (EC2, S3, Lambda)", "GitHub Actions", "CI/CD"]
    },
    "Methodologies": {
        icon: BookOpen,
        items: ["Agile", "TDD", "ITIL"]
    }
};

const EXPERIENCE_DATA = [
    {
        period: "October 2025 - Present",
        company: "Kyushu University, Fukuoka, Japan",
        role: "Teaching Assistant (TA)",
        description: [
            "Supported graduate courses in Data Analytics, and Assembly Language.",
            "Managed Moodle LMS: uploaded materials, tracked progress, and resolved technical issues."
        ],
        tags: ["Data Analytics", "Education", "LMS"]
    },
    {
        period: "November 2023 - January 2025",
        company: "Reboot Era Technologies, Lahore (Remote)",
        role: "Backend Developer",
        description: [
            "Designed and developed RESTful and GraphQL APIs with JWT/OAuth2 authentication using Laravel 8 and MySQL, for in-house platforms (CRM portal, analytics dashboard).",
            "Implemented Redis with Laravel Horizon job queues for async tasks (bulk emails, PDF generation)."
        ],
        tags: ["Laravel", "MySQL", "Redis", "GraphQL", "Remote"]
    },
    {
        period: "February 2023 - September 2023",
        company: "CareCloud, New Jersey, United States",
        role: "Software Engineer",
        description: [
            "Enhanced search functionality by integrating the Elastic Stack, enabling dynamic searches based on singular and multi-conditions instead of relying on prefix matching.",
            "Designed prompt engineering for GPT and Vertex AI to generate medical summaries.",
            "Containerized services using Docker and assisted in Helm-based Kubernetes deployment pipelines for healthcare modules.",
            "Modernized back-end operations by optimizing user interfaces with .NET and Angular Material.",
            "Collaborated cross-functionally using Git and CI/CD tools with DevOps team to ensure smooth DevOps workflows and maintain high code quality."
        ],
        tags: [".NET", "Elastic Stack", "Docker", "Kubernetes", "Vertex AI", "Angular"]
    },
    {
        period: "August 2022 - January 2023",
        company: "Immentia, Islamabad, Pakistan",
        role: "Software Developer",
        description: [
            "Developed matchmaking features, user profiling, and real-time communication for an Islamic matchmaking app.",
            "Built a CMS with multimedia support and SEO optimization.",
            "Performed sentiment analysis on customer feedback using Python to enhance service quality.",
            "Used Git for version control in a team setting to manage collaborative development and ensure code integrity."
        ],
        tags: ["Python", "CMS", "SEO", "Real-time"]
    }
];

const EDUCATION_DATA = [
    {
        period: "April 2024 - Continue",
        company: "Kyushu University, Fukuoka, Japan",
        role: "Research Student",
        description: [
            "Conducting research on Retrieval Augmented Generation for medical prescriptions and learning health systems.",
            "Collaborating with Kyushu University Hospital to improve health data analysis and decision-making tools.",
            "Developing advanced courses in machine learning, natural language processing, and healthcare informatics."
        ],
        tags: ["Research", "Healthcare", "NLP", "Machine Learning"]
    },
    {
        period: "August 2022",
        company: "Foundation University, Islamabad, Pakistan",
        role: "Bachelor of Computer Software Engineering",
        description: [
            "Graduated with a 3.5+ CGPA; coursework included Software Engineering, Database Management, and Software Architecture.",
            "Completed a capstone project on a healthcare management system focused on user-friendly interfaces and robust back-end architecture.",
            "Participated in software development competitions, earning recognition for innovative solutions."
        ],
        tags: ["Software Engineering", "Healthcare", "Capstone"]
    }
]

const PROJECTS_DATA = [
    {
        period: "SocialTech Lab",
        company: "Kyushu University",
        role: "Portable Health Clinic 2.0",
        description: [
            "Designed and implemented a scalable back-end using Django and PostgreSQL for secure medical record management.",
            "Modernized UI/UX with React and Tailwind, enhancing clinician workflow and usability.",
            "Developed a dynamic prescription generation module integrated with live medication databases for dosage accuracy.",
            "Integrated ICD-10/11 code sets using a NoSQL search engine for efficient disease code retrieval.",
            "Implemented Zoom API for doctor-patient teleconsultations with real-time scheduling."
        ],
        tags: ["React", "Tailwind", "Django", "PostgreSQL", "Docker", "JavaEE", "FHIR"]
    },
    {
        period: "SocialTech Lab",
        company: "Kyushu University",
        role: "PHC FHIR Adapter",
        description: [
            "Modeled core PHC tables using Spring Data JPA and designed REST endpoints for FHIR-like Patient and Observation resources.",
            "Implemented Java mapping logic to transform legacy records into FHIR R4–shaped JSON using DTOs and standardized vital signs.",
            "Added Swagger documentation and basic tests (JUnit + MockMvc) to demonstrate clean API contracts and testable Spring Boot code."
        ],
        tags: ["Java 17", "Spring Boot", "JPA", "PostgreSQL", "Swagger", "JUnit"]
    },
    {
        period: "CareCloud",
        company: "Healthcare Solutions",
        role: "TalkEHR",
        description: [
            "Implemented advanced query optimization strategies and indexing techniques to improve SQL performance and reduce latency.",
            "Migrated legacy AngularJS components to current versions to boost maintainability and performance.",
            "Performed unit testing to ensure system stability."
        ],
        tags: [".NET", "SQL Server", "Angular", "REST APIs", "Typescript"]
    },
    {
        period: "CareCloud",
        company: "Internal R&D",
        role: "LLM-Powered Medical Summary Generator",
        description: [
            "Developed prompt templates fine-tuned for medical language understanding and hallucination mitigation.",
            "Developed a mask layer for patient privacy and HIPPA regulation in collaboration with the medical team.",
            "Deployed and tested summaries on anonymized EHR data with active feedback loops from clinical staff."
        ],
        tags: ["Vertex AI", "Python", "FastAPI", "Prompt Engineering"]
    },
    {
        period: "Semester Project",
        company: "Undergraduate",
        role: "Hospital Management System",
        description: [
            "Implemented patient registration, appointment scheduling, and basic ward/bed management using JavaSE and Vaadin.",
            "Built report-based features (daily admission reports, doctor-wise appointment summaries) with dynamic filtering."
        ],
        tags: ["Java", "Vaadin", "SQL", "MVC"]
    }
]

const CERTIFICATES_DATA = [
    { title: "Certified Data Scientist Associate", link: "https://www.datacamp.com/certificate/DSA0012637301766" },
    { title: "Certified Data Scientist with Python", link: "https://www.datacamp.com/certificate/PDA0014190164566" },
    { title: "Associate Data Engineer (SQL)", link: "#" },
    { title: "Data Engineer (Python)", link: "#" },
]

const ACHIEVEMENTS_DATA = [
    { title: "FUSST Open House - 3rd Position", description: "Secured third position at the Foundation University Open House competition." },
    { title: "Volunteer Thesis Contribution", description: "Explored machine learning methodologies to enhance predictive analytics in academic research for University of Hull." },
    { title: "TOEIC Score", description: "860/990" },
]

const LANGUAGES_DATA = [
    { language: "English", proficiency: "Business Proficiency" },
    { language: "Japanese", proficiency: "Basic Conversational (JLPT N4)" },
    { language: "Urdu", proficiency: "Native" },
]


export default function Resume() {
    const [viewMode, setViewMode] = useState('interactive')
    const [activePdfTab, setActivePdfTab] = useState(PDF_TABS[0].id)
    const [zoomLevel, setZoomLevel] = useState(1);

    const currentPdfTab = PDF_TABS.find((tab) => tab.id === activePdfTab)

    const handlePrint = () => {
        window.print()
    }

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <Container className="mt-16 sm:mt-32">
            <div className="flex flex-col items-center gap-6 text-center print:hidden">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
                    Curriculum <span className="text-teal-500">Vitae</span>
                </h1>
                <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
                    My professional journey, qualifications, and skills.
                </p>

                {/* View Mode Switcher */}
                <div className="flex space-x-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800/50 shadow-sm border border-zinc-200 dark:border-zinc-700/50">
                    {VIEW_MODES.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setViewMode(mode.id)}
                            className={clsx(
                                'relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2',
                                viewMode === mode.id
                                    ? 'text-zinc-900 dark:text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                            )}
                        >
                            {viewMode === mode.id && (
                                <motion.div
                                    layoutId="active-view-pill"
                                    className="absolute inset-0 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-700 dark:ring-white/10 rounded-full"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <mode.icon className="w-4 h-4" />
                                {mode.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Global Actions (visible for Interactive, hidden for PDF as it has its own toolbar) */}
                {viewMode === 'interactive' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex flex-wrap w-full max-w-sm justify-center gap-4"
                    >
                        <Button
                            href={currentPdfTab.download}
                            download={currentPdfTab.filename}
                            variant="primary"
                            className="w-full sm:w-auto flex items-center gap-2 justify-center shadow-lg shadow-teal-500/10"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </Button>
                        <Button
                            onClick={handlePrint}
                            variant="secondary"
                            className="w-full sm:w-auto flex items-center gap-2 justify-center"
                        >
                            <Printer className="w-4 h-4" />
                            Print
                        </Button>
                    </motion.div>
                )}
            </div>

            <div className="mt-12">
                <AnimatePresence mode='wait'>
                    {viewMode === 'interactive' && (
                        <motion.div
                            key="interactive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-24"
                        >
                            {/* Summary Section */}
                            <section className="max-w-4xl mx-auto">
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-teal-500" />
                                        Summary
                                    </h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                </div>
                                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                                    {SUMMARY}
                                </p>
                            </section>

                            {/* Skills Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                        <Layers className="w-6 h-6 text-teal-500" />
                                        Technical Skills
                                    </h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                </div>
                                <TechStack data={SKILLS_DATA} />
                            </section>

                            {/* Experience Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                        <Briefcase className="w-6 h-6 text-teal-500" />
                                        Experience
                                    </h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                </div>
                                <Timeline items={EXPERIENCE_DATA} />
                            </section>

                            {/* Projects Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                        <Server className="w-6 h-6 text-teal-500" />
                                        Projects
                                    </h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                </div>
                                <Timeline items={PROJECTS_DATA} />
                            </section>


                            {/* Education Section */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-teal-500" />
                                        Education
                                    </h2>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
                                </div>
                                <Timeline items={EDUCATION_DATA} />
                            </section>

                            {/* Certificates, Achievements, Languages Grid */}
                            {/* Certificates, Achievements, Languages Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                {/* Certificates Column */}
                                <section>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-2 bg-teal-500/10 rounded-lg">
                                            <Award className="w-6 h-6 text-teal-500" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                                            Certificates
                                        </h2>
                                    </div>
                                    <ul className="grid grid-cols-1 gap-4">
                                        {CERTIFICATES_DATA.map((cert, idx) => (
                                            <motion.li
                                                key={idx}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                className="group relative flex flex-col gap-2 bg-white dark:bg-zinc-800/60 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-zinc-800 dark:text-zinc-100 pr-4">{cert.title}</span>
                                                    {cert.link !== '#' && (
                                                        <a
                                                            href={cert.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-zinc-400 hover:text-teal-500 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="h-1 w-12 bg-teal-500/30 rounded-full group-hover:w-full group-hover:bg-teal-500 transition-all duration-500" />
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
                                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                                                Achievements
                                            </h2>
                                        </div>
                                        <ul className="space-y-4">
                                            {ACHIEVEMENTS_DATA.map((item, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-amber-500"
                                                >
                                                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">{item.title}</h3>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
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
                                            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
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
                                                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{lang.language}</span>
                                                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{lang.proficiency}</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
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
                        </motion.div>
                    )}

                    {viewMode === 'pdf' && (
                        <motion.div
                            key="pdf"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="bg-zinc-100 dark:bg-black/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative"
                        >
                            {/* PDF Viewer Toolbar */}
                            <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 rounded-t-3xl">
                                {/* Left: Language Selector */}
                                <div className="flex space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                                    {PDF_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActivePdfTab(tab.id)}
                                            className={clsx(
                                                'relative rounded-md px-4 py-1.5 text-xs font-medium transition-colors',
                                                activePdfTab === tab.id
                                                    ? 'text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-700 shadow-sm'
                                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Center: Zoom Controls */}
                                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                    <button
                                        onClick={handleZoomOut}
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-zinc-600 dark:text-zinc-400 transition"
                                        aria-label="Zoom Out"
                                        disabled={zoomLevel <= 0.5}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                                    </button>
                                    <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 w-12 text-center">
                                        {Math.round(zoomLevel * 100)}%
                                    </span>
                                    <button
                                        onClick={handleZoomIn}
                                        className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-zinc-600 dark:text-zinc-400 transition"
                                        aria-label="Zoom In"
                                        disabled={zoomLevel >= 2.5}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" /></svg>
                                    </button>
                                    <button
                                        onClick={handleResetZoom}
                                        className="px-2 py-1.5 text-xs hover:bg-white dark:hover:bg-zinc-700 rounded-md text-zinc-500 dark:text-zinc-400 transition ml-1"
                                    >
                                        Reset
                                    </button>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-2">
                                    <a
                                        href={currentPdfTab.download}
                                        download={currentPdfTab.filename}
                                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                                        title="Download PDF"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={currentPdfTab.download}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                                        title="Open in New Tab"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Viewer Area - Natural Flow (No max-h) */}
                            <div className="p-8 md:p-12 lg:p-16 flex justify-center bg-zinc-100/50 dark:bg-zinc-950/50 rounded-b-3xl">
                                <motion.div
                                    key={activePdfTab}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
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
                </AnimatePresence>
            </div>
        </Container>
    )
}

function ResumePageImage({ src, alt, priority = false }) {
    return (
        <div className="relative w-full bg-white shadow-lg shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
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
