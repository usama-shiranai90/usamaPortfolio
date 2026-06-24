'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Code, Database, Terminal, Layers, Cloud, BookOpen, Award, Globe, Briefcase, FileText, Cpu, Server, Download, Printer, ExternalLink } from "lucide-react";


import { Timeline } from '@/components/ui/Timeline'
import { TechStack } from '@/components/ui/TechStack'
import { Rirekisho } from '@/components/ui/Rirekisho'

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
    { id: 'latex', label: 'LaTeX / Overleaf', icon: FileText },
]

const INTERACTIVE_TABS = [
    { id: 'english', label: 'English Resume' },
    { id: 'japanese', label: 'Japanese Resume (履歴書)' },
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
        period: "June 2026 - August 2026",
        company: "Addo AI, Singapore (Remote)",
        role: "Data Engineer Intern",
        description: [
            "Designed and optimized ETL pipelines and data processing workflows.",
            "Collaborated on data modeling and warehouse maintenance for analytical queries."
        ],
        tags: ["Data Engineering", "ETL", "Python", "SQL"]
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
    },
    {
        period: "Research Project",
        company: "SocialTech Lab",
        role: "Dawakhana",
        description: [
            "Developed Dawakhana, a multi-modal data annotation and collection platform for herbal medicine research.",
            "Designed labeling schemas and tools for annotating botanical images and herbal compounds."
        ],
        tags: ["Data Collection", "Data Annotation", "AI/ML", "Python"]
    },
    {
        period: "SocialTech Lab",
        company: "Kyushu University",
        role: "Lab Sync",
        description: [
            "Centralized progress reports, schedules, attendance, task assignments, announcements, events, and inventory into a unified system.",
            "Deployed the first version at the Social Tech Lab, Kyushu University.",
            "Validating system with active users to plan mobile support and customizable modules for other departments."
        ],
        tags: ["React", "Lab Management", "Collaboration", "Productivity"]
    },
    {
        period: "Personal Project",
        company: "Academic Tools",
        role: "ConferenceTracker",
        description: [
            "Created ConferenceTracker to organize academic conference submission cycles, tracking draft statuses, reviews, and submission deadlines."
        ],
        tags: ["Next.js", "React", "Academic tools"]
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

const DATA_JP = {
    profile: {
        name: "Syed Usama Bukhari",
        furigana: "サイド ウサマ ブカリ",
        dob: "1999年 5月 10日", // Assuming roughly based on graduation
        age: "25",
        gender: "男",
        postalCode: "819-0395",
        address: "福岡県福岡市西区元岡 744 (九州大学 伊都キャンパス)",
        addressFurigana: "ふくおかけん ふくおかし にしく もとおか",
        phone: "080-xxxx-xxxx",
        email: "hub@one-eye-owl.res",
        pr: "データ集約型およびヘルスケア指向のアプリケーション構築経験を持つソフトウェアエンジニア。バックエンド、ウェブ、データエンジニアリングスタックに精通。Laravel、.NET、最新のJavaScriptフレームワーク、Pythonを使用した本番機能の開発経験あり。現在は九州大学 ソーシャルテックラボにて、医療データ分析、ETLパイプライン(Airflow, dbt)、FHIR相互運用性の研究に従事。学習ヘルスシステム(LHS)内でのRAGを用いた処方最適化を研究中。"
    },
    education: [
        { year: "2018", month: "9", content: "Foundation University (パキスタン) 入学" },
        { year: "2022", month: "8", content: "Foundation University (ソフトウェア工学) 卒業 GPA: 3.5+" },
        { year: "2024", month: "4", content: "九州大学 統合新領域学府 研究生 入学" },
        { year: "2024", month: "4", content: "現在に至る (博士課程進学予定)" }
    ],
    experience: [
        { year: "2022", month: "8", content: "Immentia (Software Developer) 入社" },
        { year: "2023", month: "1", content: "Immentia 退社" },
        { year: "2023", month: "2", content: "CareCloud (Software Engineer) 入社" },
        { year: "2023", month: "9", content: "CareCloud 退社" },
        { year: "2023", month: "11", content: "Reboot Era Technologies (Backend Developer) 入社" },
        { year: "2026", month: "6", content: "Addo AI (Data Engineer Intern) インターン開始" },
        { year: "2024", month: "8", content: "Addo AI インターン修了" },
        { year: "2025", month: "1", content: "Reboot Era Technologies 退社" },
        { year: "2025", month: "10", content: "九州大学 ティーチングアシスタント (データ分析講義担当) 着任" }
    ],
    licenses: [
        { year: "2022", month: "8", content: "Bachelor of Computer Software Engineering 取得" },
        { year: "2023", month: "", content: "Certified Data Scientist Associate (DataCamp)" },
        { year: "2024", month: "", content: "JLPT N4 レレベル (基礎会話)" },
        { year: "2024", month: "", content: "TOEIC 860点" },
    ],
    skills: "言語: Java, Python, PHP, JavaScript/TypeScript\nフレームワーク: Spring Boot, Laravel, React, Next.js, Django\nインフラ/ツール: Docker, Kubernetes, AWS, GCP, Git\nデータベース: MySQL, PostgreSQL, ElasticSearch",
    requests: "職務内容: ソフトウェアエンジニア、データエンジニア、または研究開発職を希望します。\n勤務地: 福岡県内 または リモートワーク可\n\n貴社の規定に従います。"
};


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
                    <div className="flex space-x-1 rounded-full bg-theme-card p-1 shadow-sm border border-theme-text/10">
                        {VIEW_MODES.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id)}
                                className={clsx(
                                    'relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2',
                                    viewMode === mode.id
                                        ? 'text-theme-text'
                                        : 'text-theme-text/50 hover:text-theme-text'
                                )}>

                                {viewMode === mode.id && (
                                    <motion.div
                                        layoutId="active-view-pill"
                                        className="absolute inset-0 bg-theme-bg shadow-sm border border-theme-text/10 rounded-full"
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

                    {/* Action Buttons (Only for Interactive) */}
                    {/* {viewMode === 'interactive' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3"
                        >
                            <Button
                                href={currentPdfTab.download}
                                download={currentPdfTab.filename}
                                variant="primary"
                                className="group flex items-center gap-2"
                            >
                                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />

                            </Button>
                            <Button
                                onClick={handlePrint}
                                variant="secondary"
                                className="group flex items-center gap-2"
                            >
                                <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Button>
                        </motion.div>
                    )} */}
                </div>
            </header>

            <div className="">
                <AnimatePresence mode='wait'>
                    {viewMode === 'interactive' && (
                        <motion.div
                            key="interactive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Interactive Tab Switcher & Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-theme-card p-2 rounded-2xl border border-theme-text/10">
                                <div className="flex p-1">
                                    {INTERACTIVE_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveInteractiveTab(tab.id)}
                                            className={clsx(
                                                'relative rounded-xl px-6 py-2 text-sm font-medium transition-all duration-200',
                                                activeInteractiveTab === tab.id
                                                    ? 'text-theme-text bg-theme-bg shadow-md border border-theme-text/10'
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
                                        className="h-9 px-4 text-xs font-medium gap-2"
                                    >
                                        <Download className="w-3.5 h-3.5" />

                                    </Button>
                                    <Button
                                        onClick={handlePrint}
                                        variant="secondary"
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
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                                >
                                    {/* Sticky Navigation Sidebar */}
                                    <aside className="hidden lg:block lg:col-span-3">
                                        <nav className="sticky top-24 space-y-2">
                                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 pl-3">Contents</p>
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
                                                    className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-accent dark:hover:text-cyan-accent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-all"
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
                                            <div className="relative bg-gradient-to-br from-cyan-accent/5 via-zinc-50 to-white dark:from-cyan-accent/10 dark:via-zinc-900/50 dark:to-zinc-900 p-8 rounded-3xl border border-cyan-accent/10 dark:border-cyan-accent/20 shadow-sm">
                                                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 flex items-center gap-3">
                                                    <div className="p-2 bg-cyan-accent rounded-xl text-white shadow-lg shadow-cyan-accent/20">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    Professional Summary
                                                </h2>
                                                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                                                    {SUMMARY}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Skills Section */}
                                        <section id="skills" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                                                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                                                    <span className="text-cyan-accent">#</span> Technical Skills
                                                </h2>
                                                <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                                            </div>
                                            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800/50">
                                                <TechStack data={SKILLS_DATA} />
                                            </div>
                                        </section>

                                        {/* Experience Section */}
                                        <section id="experience" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                                                    <Briefcase className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                                                    Experience
                                                </h2>
                                            </div>
                                            <Timeline items={EXPERIENCE_DATA} />
                                        </section>

                                        {/* Projects Section */}
                                        <section id="projects" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                                                    <Server className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                                                    Projects
                                                </h2>
                                            </div>
                                            <Timeline items={PROJECTS_DATA} />
                                        </section>

                                        {/* Education Section */}
                                        <section id="education" className="scroll-mt-32">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                                                    <BookOpen className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
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
                                                                        className="text-zinc-400 hover:text-cyan-accent transition-colors"
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
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="japanese-interactive"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                                >
                                    {/* Sticky Navigation Sidebar (Japanese) */}
                                    <aside className="hidden lg:block lg:col-span-3">
                                        <nav className="sticky top-24 space-y-2">
                                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 pl-3">目次 (Contents)</p>
                                            {[
                                                { id: 'basic-info', label: '基本情報 (Basic Info)', icon: FileText },
                                                { id: 'history', label: '学歴・職歴 (History)', icon: Briefcase },
                                                { id: 'licenses', label: '免許・資格 (Licenses)', icon: Award },
                                                { id: 'pr-skills', label: 'PR・スキル (PR/Skills)', icon: Layers },
                                            ].map((item) => (
                                                <a
                                                    key={item.id}
                                                    href={`#${item.id}`}
                                                    className="group flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-cyan-accent dark:hover:text-cyan-accent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-all"
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
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="bg-theme-card/30 rounded-3xl border border-theme-text/10 shadow-2xl relative"
                        >
                            {/* PDF Viewer Toolbar */}
                            <div className="sticky top-0 z-30 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-theme-card/90 backdrop-blur-md border-b border-theme-text/10 rounded-t-3xl">
                                {/* Left: Language Selector */}
                                <div className="flex space-x-1 rounded-lg bg-theme-bg p-1 border border-theme-text/10">
                                    {PDF_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActivePdfTab(tab.id)}
                                            className={clsx(
                                                'relative rounded-md px-4 py-1.5 text-xs font-medium transition-colors',
                                                activePdfTab === tab.id
                                                    ? 'text-theme-text bg-theme-card border border-theme-text/10 shadow-sm'
                                                    : 'text-theme-text/50 hover:text-theme-text'
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Center: Zoom Controls */}
                                <div className="flex items-center gap-2 bg-theme-bg rounded-lg p-1 border border-theme-text/10">
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
                                        className="p-2 hover:bg-theme-card rounded-full text-theme-text/60 hover:text-theme-text transition border border-transparent hover:border-theme-text/10"
                                        title="Download PDF"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={currentPdfTab.download}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-theme-card rounded-full text-theme-text/60 hover:text-theme-text transition border border-transparent hover:border-theme-text/10"
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

                    {viewMode === 'latex' && (
                        <motion.div
                            key="latex"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6 print:space-y-0"
                        >
                            {/* Toolbar (Hidden when printing) */}
                            <div className="bg-theme-card/90 backdrop-blur-md border border-theme-text/10 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                                {/* Left: Template Selector */}
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-cyan-accent/10 text-cyan-accent rounded-xl">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex rounded-xl bg-theme-bg p-1 border border-theme-text/10">
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
                                                            ? 'text-theme-text bg-theme-card border border-theme-text/10 shadow-sm'
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
                                        className="flex items-center justify-center h-9 px-4 rounded-xl text-xs font-semibold bg-cyan-accent hover:opacity-90 text-zinc-950 gap-2 transition-all shadow-sm"
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
                                        className="h-9 px-4 text-xs font-semibold gap-2 border-theme-text/10 hover:bg-theme-text/5 transition-all text-theme-text"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5 text-cyan-accent" />
                                        <span>Open in Overleaf</span>
                                    </Button>

                                    {/* Download */}
                                    <a
                                        href={`/docs/UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`}
                                        download={`UsamaBukhari-${selectedTexTemplate === 'general' ? 'Resume' : 'Infrastructure-Resume'}.tex`}
                                        className="flex items-center justify-center h-9 px-4 rounded-xl text-xs font-medium transition-all bg-theme-bg border border-theme-text/10 hover:bg-theme-card/85 text-theme-text gap-2 shadow-sm"
                                    >
                                        <Download className="w-3.5 h-3.5 text-theme-text/60" />
                                        <span>Download .tex</span>
                                    </a>
                                </div>
                            </div>

                            {/* Rendered Resume Preview */}
                            <div className="flex justify-center items-start print:block">
                                <div className="w-full xl:overflow-y-auto print:overflow-visible bg-zinc-100/50 dark:bg-zinc-950/20 p-4 xl:p-8 rounded-3xl border border-theme-text/10 print:border-none print:bg-transparent print:p-0">
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

function LaTeXResumeRenderer({ latex }) {
    if (!latex) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-accent"></div>
                <p className="text-sm">Compiling LaTeX Document...</p>
            </div>
        );
    }

    let parsed;
    try {
        parsed = parseLaTeXDocument(latex);
    } catch (err) {
        return (
            <div className="bg-red-500/10 text-red-400 p-6 rounded-xl border border-red-500/20 text-sm text-left">
                <h4 className="font-bold mb-2">Compilation Error</h4>
                <p>Failed to parse the LaTeX syntax. Please check for unclosed brackets or invalid tags.</p>
                <pre className="mt-3 p-3 bg-black/30 rounded font-mono text-xs overflow-x-auto">{err.message}</pre>
            </div>
        );
    }

    if (parsed.error) {
        return (
            <div className="bg-amber-500/10 text-amber-400 p-6 rounded-xl border border-amber-500/20 text-sm text-left">
                <h4 className="font-bold mb-2">Parser Warning</h4>
                <p>{parsed.error}</p>
            </div>
        );
    }

    const { headerText, sections } = splitBody(parsed.body);

    return (
        <div className="bg-white text-zinc-900 shadow-xl border border-zinc-200/50 rounded-2xl p-6 sm:p-10 w-full max-w-[210mm] mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:rounded-none min-h-[297mm] font-serif text-left antialiased">
            {/* Render header */}
            {renderHeader(headerText)}

            {/* Render sections */}
            <div className="space-y-5">
                {sections.map((sec, i) => {
                    if (!sec.content.trim()) return null;
                    return (
                        <div key={i} className="group">
                            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-300 pb-0.5 mb-2 font-sans">
                                {sec.title}
                            </h2>
                            {renderSectionContent(sec.content)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function findMatchingBrace(str, openBraceIdx) {
    let depth = 1;
    for (let i = openBraceIdx + 1; i < str.length; i++) {
        if (str[i] === '{') {
            depth++;
        } else if (str[i] === '}') {
            depth--;
            if (depth === 0) {
                return i;
            }
        }
    }
    return -1;
}

function parseLaTeXDocument(latex) {
    // 1. Strip comments
    let clean = latex.replace(/^[ \t]*%.*$/gm, '');
    clean = clean.replace(/([^\\])%.*$/gm, '$1');

    // 2. Extract newcommands
    const newcommands = {};
    let pos = 0;
    
    while (true) {
        const index = clean.indexOf('\\newcommand', pos);
        if (index === -1) break;
        
        const firstBraceIdx = clean.indexOf('{', index);
        if (firstBraceIdx === -1) {
            pos = index + 11;
            continue;
        }
        
        const cmdNameCloseIdx = findMatchingBrace(clean, firstBraceIdx);
        if (cmdNameCloseIdx === -1) {
            pos = firstBraceIdx + 1;
            continue;
        }
        
        const cmdNameWithSlash = clean.substring(firstBraceIdx + 1, cmdNameCloseIdx).trim();
        const cmdName = cmdNameWithSlash.startsWith('\\') ? cmdNameWithSlash.substring(1) : cmdNameWithSlash;
        
        const defBraceIdx = clean.indexOf('{', cmdNameCloseIdx + 1);
        if (defBraceIdx === -1) {
            pos = cmdNameCloseIdx + 1;
            continue;
        }
        
        const defCloseIdx = findMatchingBrace(clean, defBraceIdx);
        if (defCloseIdx === -1) {
            pos = defBraceIdx + 1;
            continue;
        }
        
        const definition = clean.substring(defBraceIdx + 1, defCloseIdx);
        newcommands[cmdName] = definition;
        
        pos = defCloseIdx + 1;
    }

    // 3. Extract and resolve body
    const docStart = clean.indexOf('\\begin{document}');
    const docEnd = clean.indexOf('\\end{document}');
    if (docStart === -1 || docEnd === -1) {
        return { error: 'Invalid LaTeX document: Could not find \\begin{document} and \\end{document}.' };
    }
    
    let body = clean.substring(docStart + '\\begin{document}'.length, docEnd).trim();
    
    for (let pass = 0; pass < 3; pass++) {
        Object.keys(newcommands).forEach(cmd => {
            const def = newcommands[cmd];
            const regex1 = new RegExp('\\{\\\\' + cmd + '\\}', 'g');
            const regex2 = new RegExp('\\\\' + cmd + '\\b', 'g');
            body = body.replace(regex1, def).replace(regex2, def);
        });
    }

    return { body, newcommands };
}

function splitBody(body) {
    const sectionRegex = /\\section\*?\{([^\}]+)\}/g;
    const sections = [];
    let lastIndex = 0;
    let match;
    let headerText = '';

    while ((match = sectionRegex.exec(body)) !== null) {
        const title = match[1];
        const contentStart = sectionRegex.lastIndex;
        
        if (sections.length === 0) {
            headerText = body.substring(0, match.index).trim();
        } else {
            sections[sections.length - 1].content = body.substring(lastIndex, match.index).trim();
        }
        
        sections.push({ title, content: '' });
        lastIndex = contentStart;
    }

    if (sections.length > 0) {
        sections[sections.length - 1].content = body.substring(lastIndex).trim();
    } else {
        headerText = body;
    }

    return { headerText, sections };
}

function renderHeader(headerText) {
    let cleanHeader = headerText
        .replace(/\\begin\{center\}/g, '')
        .replace(/\\end\{center\}/g, '');
    
    const lineBreakRegex = /\\\\(?:\[\d+pt\]|\[\d+mm\])?/g;
    const lines = cleanHeader.split(lineBreakRegex);
    
    return (
        <div className="flex flex-col items-center text-center space-y-1 mb-4 border-b border-zinc-200 pb-3">
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                
                const isName = trimmed.includes('Syed Usama Bukhari') || i === 0;
                
                return (
                    <div 
                        key={i} 
                        className={clsx(
                            "w-full text-zinc-800",
                            isName ? "text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-sans" : "text-xs sm:text-sm font-medium opacity-90"
                        )}
                        dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(trimmed) }}
                    />
                );
            })}
        </div>
    );
}

function renderSectionContent(content) {
    const listPlaceholders = [];
    let processedText = content.replace(/\\begin\{itemize\}[\s\S]*?\\end\{itemize\}/g, (match) => {
        const id = `__LIST_PLACEHOLDER_${listPlaceholders.length}__`;
        listPlaceholders.push(match);
        return id;
    });

    const blocks = processedText.split(/\r?\n\r?\n/);
    
    return (
        <div className="space-y-2 font-serif text-left">
            {blocks.map((block, index) => {
                let trimmedBlock = block.trim();
                if (!trimmedBlock) return null;

                listPlaceholders.forEach((listHtml, i) => {
                    const placeholder = `__LIST_PLACEHOLDER_${i}__`;
                    if (trimmedBlock.includes(placeholder)) {
                        trimmedBlock = trimmedBlock.replace(placeholder, listHtml);
                    }
                });

                if (trimmedBlock.startsWith('\\begin{itemize}') || trimmedBlock.includes('\\begin{itemize}')) {
                    return (
                        <div 
                            key={index} 
                            dangerouslySetInnerHTML={{ __html: parseLists(trimmedBlock) }} 
                        />
                    );
                }

                const lines = trimmedBlock.split(/\\\\(?:\[\d+pt\])?/);
                
                return (
                    <div key={index} className="w-full text-zinc-800 text-xs sm:text-sm leading-relaxed">
                        {lines.map((line, lineIdx) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) return null;

                            if (trimmedLine.includes('\\hfill')) {
                                const parts = trimmedLine.split('\\hfill');
                                const left = parts[0].trim();
                                const right = parts[1].trim();

                                return (
                                    <div key={lineIdx} className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline w-full gap-1 mt-1 font-serif">
                                        <span className="font-bold text-zinc-900" dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(left) }} />
                                        <span className="text-xs text-zinc-600 font-semibold" dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(right) }} />
                                    </div>
                                );
                            }

                            return (
                                <p 
                                    key={lineIdx} 
                                    className="mt-0.5"
                                    dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(trimmedLine) }} 
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function parseLists(text) {
    const itemizeRegex = /\\begin\{itemize\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{itemize\}/g;
    return text.replace(itemizeRegex, (match, listContent) => {
        const items = listContent.split(/\\item/);
        const listItemsHtml = items
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => `<li class="mt-0.5 text-xs sm:text-sm leading-relaxed text-zinc-700 relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">${parseInlineLaTeX(item)}</li>`)
            .join('\n');
        return `<ul class="list-none my-0.5 space-y-0.5">${listItemsHtml}</ul>`;
    });
}

function parseInlineLaTeX(text) {
    let html = text;

    html = html
        .replace(/\\&/g, '&')
        .replace(/\\_/g, '_')
        .replace(/\\#/g, '#')
        .replace(/\\%/g, '%')
        .replace(/--/g, '–');

    html = html.replace(/\\href\{([^\}]+)\}\{([^\}]+)\}/g, (match, url, linkText) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-cyan-700 hover:text-cyan-800 hover:underline font-medium inline-flex items-center gap-0.5">${linkText}</a>`;
    });

    html = html.replace(/\\textbf\{([^\}]+)\}/g, '<strong>$1</strong>');
    html = html.replace(/\\textit\{([^\}]+)\}/g, '<em>$1</em>');
    html = html.replace(/\\emph\{([^\}]+)\}/g, '<em class="text-zinc-700 font-medium">$1</em>');
    html = html.replace(/\\texttt\{([^\}]+)\}/g, '<code class="bg-zinc-100 text-zinc-800 border border-zinc-200 px-1 py-0.5 rounded text-[11px] font-mono font-semibold">$1</code>');

    html = html.replace(/\\(huge|Large|large|small|normalsize)\b/g, '');

    html = html.replace(/\\faEnvelope\b/g, `<svg class="w-3 h-3 inline-block mr-1 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`);
    html = html.replace(/\\faPhone\b/g, `<svg class="w-3 h-3 inline-block mr-1 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`);
    html = html.replace(/\\faLinkedin\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`);
    html = html.replace(/\\faGithub\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`);
    html = html.replace(/\\faBriefcase\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`);

    html = html.replace(/\\hspace\{[^\}]+\}/g, '<span class="inline-block w-4"></span>');
    html = html.replace(/~/g, '&nbsp;');

    return html;
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
