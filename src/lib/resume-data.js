import { Code, Database, Terminal, Layers, Cloud, BookOpen } from "lucide-react";

export const PDF_TABS = [
    { id: 'english', label: 'English Resume', download: '/docs/Usama Bukhari Resume.pdf', filename: 'UsamaBukhari-Resume.pdf' },
    { id: 'japanese', label: 'Japanese Resume', download: '/docs/Syed Usama Bukhari EU.pdf', filename: 'UsamaBukhari-Resume-JP.pdf' },
]

export const INTERACTIVE_TABS = [
    { id: 'english', label: 'English Resume' },
    { id: 'japanese', label: 'Japanese Resume (履歴書)' },
]

export const SUMMARY = "Software Engineer with experience building data-intensive, healthcare-oriented applications across backend, web, and data engineering stacks. I have shipped production features using Laravel, .NET, modern JavaScript frameworks, and Python, and have hands-on project experience in Java. I am actively strengthening my skills in the Java ecosystem (JavaSE, Vaadin, Spring Boot) through hospital and Portable Health Clinic (PHC)–related projects. At SocialTech Lab, Kyushu University, I work on ETL pipelines (Airflow, dbt, Snowflake), FHIR-based interoperability, and analytics for real-world clinical data. I am currently researching trajectory-aware polypharmacy patients using Retrieval Augmented Generation within learning health systems (LHS), with a focus on delivering scalable, interoperable, and clinician-friendly solutions.";

export const SKILLS_DATA = {
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

export const EXPERIENCE_DATA = [
    {
        id: "addo-ai",
        period: "Jun 2026 – Present",
        company: "Addo AI",
        role: "Data Engineer",
        category: "Data & AI",
        location: "Internship · Remote · San Francisco, CA",
        summary: "Data Engineer contributing to a large-scale legacy-system migration for an enterprise banking client — moving an Oracle Analytics Server / OBIEE reporting estate of roughly 1,600 reports onto Teradata and Tableau, while continuing PhD research in explainable clinical AI in parallel.",
        description: [
            "Engineered a metadata-driven consolidation framework — separating shared base views from per-report macros — that cut overall migration scope by more than 25% while preserving exact result-set equivalence for every report.",
            "Built a Python-based generation pipeline that parses legacy SQL, extracts projection and predicate metadata, and auto-emits Teradata views, macros, and validation scripts at scale.",
            "Designed and ran an equivalence-testing protocol — row-count and column-level checksum comparisons — to certify migration correctness ahead of cutover sign-off.",
            "Identified and corrected a critical shared-predicate error in a report cluster that would have silently altered results across multiple downstream reports."
        ],
        tags: ["SQL", "Teradata", "Python", "Tableau", "ETL/data migration", "metadata-driven code generation"]
    },
    {
        id: "kyushu-ta-ra",
        period: "Oct 2025 – Present",
        company: "Kyushu University",
        role: "Teaching Assistant / Research Assistant",
        category: "Research & Academia",
        location: "Part-time (TA) + Research Assistant · Fukuoka, Japan",
        summary: "Supports Computer Science instruction while conducting doctoral research on explainable prescription recommendation using EHR data (MIMIC-IV as primary infrastructure).",
        description: [
            "Teaching Assistant for Assembly Language and Programming Fundamentals coursework, guiding 30+ students through systems-level and introductory programming concepts, holding office hours, and grading with structured feedback.",
            "Administers course infrastructure on the Moodle LMS, organizing lecture materials and assignments for the teaching team.",
            "As Research Assistant, designs a RAG + LLM framework for explainable prescription recommendation over EHR and FHIR data, and contributes to real-time clinical data pipeline work for the lab's Portable Health Clinic platform.",
            "Brings a research-informed teaching lens, connecting foundational CS concepts to real-world clinical systems design."
        ],
        tags: ["Python", "SQL", "RAG/LLM frameworks", "FHIR/HL7", "MIMIC-IV", "Moodle"]
    },
    {
        id: "kyushu-research-student",
        period: "Mar 2024 – Sep 2025",
        company: "Kyushu University",
        role: "Research Student, Information Technology",
        category: "Research & Academia",
        location: "Graduate School of Information Science and Electrical Engineering · Fukuoka, Japan",
        summary: "Pre-doctoral research affiliation preparing the ground for full PhD enrollment — building early technical prototypes and research foundations in retrieval-augmented generation and clinical data systems ahead of formally starting the doctoral program.",
        description: [
            "Prototyped Retrieval-Augmented Generation (RAG) components for clinical decision support use cases, evaluating retrieval and grounding strategies against EHR-derived data.",
            "Built React Native prototype interfaces for clinic-facing data collection and patient interaction workflows.",
            "Developed foundational familiarity with MIMIC-IV, FHIR/HL7 standards, and clinical NLP pipelines that became the direct basis for the current doctoral thesis, \"A Study on Patient Context for Explainable Prescription Recommendation.\"",
            "Transitioned directly into the PhD program (Oct 2025) on the strength of this preparatory research."
        ],
        tags: ["Python", "RAG/LLM tooling", "React Native", "FHIR", "MIMIC-IV"]
    },
    {
        id: "carecloud",
        period: "Oct 2022 – Sep 2023",
        company: "CareCloud",
        role: "Software Engineer",
        category: "Software Engineering",
        location: "Full-time · Somerset County, NJ · Hybrid",
        summary: "Software Engineer building backend systems for a healthcare SaaS platform processing over 1 million clinical records.",
        description: [
            "Engineered dynamic, multi-condition search by integrating the Elastic Stack, replacing rigid prefix-based matching and improving query response performance by approximately 35%.",
            "Designed HIPAA-compliant prompt-engineering pipelines using GPT and Vertex AI (GCP) to auto-generate structured medical summaries from unstructured clinical notes, deployed via serverless GCP Cloud Functions.",
            "Built Python/FastAPI ETL pipelines incorporating NLP (spaCy) for clinical text processing.",
            "Containerized services with Docker and supported Helm-based Kubernetes deployment pipelines for production healthcare modules.",
            "Modernized back-end and front-end integration using .NET and Angular Material, and collaborated cross-functionally with DevOps via Git and CI/CD to maintain high code quality."
        ],
        tags: ["Python", "FastAPI", "spaCy", "Elasticsearch", "GPT/Vertex AI (GCP)", "GCP Cloud Functions", "Docker", "Kubernetes/Helm", ".NET", "Angular Material", "Git/CI-CD"]
    },
    {
        id: "immentia",
        period: "Aug 2022 – Feb 2023",
        company: "Immentia",
        role: "Software Engineer",
        category: "Software Engineering",
        location: "Contract · Islamabad, Pakistan · Remote",
        summary: "Software Engineer at Immentia, a digital agency delivering custom web and software solutions for e-commerce, mobile, and small-business clients.",
        description: [
            "Engineered and maintained relational database schemas in MySQL to support web application data models across multiple client projects.",
            "Developed and extended REST API backends using the Laravel (PHP) framework, including Progressive Web App (PWA) features for improved offline access and responsiveness on client-facing platforms.",
            "Automated repetitive backend processes and data workflows using Python, reducing manual overhead across delivery cycles.",
            "Collaborated in a cross-functional, Git-based development environment, contributing to full-stack feature delivery across client engagements end-to-end."
        ],
        tags: ["Laravel", "PHP", "MySQL", "Python", "REST APIs", "PWAs", "Git"]
    },
    {
        id: "devsiom",
        period: "Aug 2021 – Sep 2021",
        company: "Devsiom Technologies",
        role: "Android Developer Intern",
        category: "Software Engineering",
        location: "Pakistan",
        summary: "Android Developer Intern contributing to native Android application development in Java under senior engineering guidance.",
        description: [
            "Implemented and tested UI components and application logic using core Android SDK building blocks, including Activities, Fragments, and lifecycle management.",
            "Collaborated within an agile team, participating in code reviews and Git-based version control to deliver incremental feature updates.",
            "Built a foundation in mobile application architecture and debugging that carried directly into later production Android work in Kotlin and Jetpack Compose."
        ],
        tags: ["Java", "Android SDK", "Git"]
    }
];

export const EDUCATION_DATA = [
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

export const PROJECTS_DATA = [
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

export const CERTIFICATES_DATA = [
    { title: "Certified Data Scientist Associate", link: "https://www.datacamp.com/certificate/DSA0012637301766" },
    { title: "Certified Data Scientist with Python", link: "https://www.datacamp.com/certificate/PDA0014190164566" },
    { title: "Associate Data Engineer (SQL)", link: "#" },
    { title: "Data Engineer (Python)", link: "#" },
]

export const ACHIEVEMENTS_DATA = [
    { title: "FUSST Open House - 3rd Position", description: "Secured third position at the Foundation University Open House competition." },
    { title: "Volunteer Thesis Contribution", description: "Explored machine learning methodologies to enhance predictive analytics in academic research for University of Hull." },
    { title: "TOEIC Score", description: "860/990" },
]

export const LANGUAGES_DATA = [
    { language: "English", proficiency: "Business Proficiency" },
    { language: "Japanese", proficiency: "Basic Conversational (JLPT N4)" },
    { language: "Urdu", proficiency: "Native" },
]

export const DATA_JP = {
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
        { year: "2021", month: "8", content: "Devsiom Technologies (Android Developer Intern) 入社" },
        { year: "2021", month: "9", content: "Devsiom Technologies 退社" },
        { year: "2022", month: "8", content: "Immentia (Software Engineer - Contract/Remote) 入社" },
        { year: "2022", month: "10", content: "CareCloud (Software Engineer - Full-time/Hybrid) 入社" },
        { year: "2023", month: "2", content: "Immentia 退社" },
        { year: "2023", month: "9", content: "CareCloud 退社" },
        { year: "2024", month: "3", content: "九州大学 情報理工学府 研究生 着任" },
        { year: "2025", month: "9", content: "九州大学 研究生 修了" },
        { year: "2025", month: "10", content: "九州大学 ティーチングアシスタント / 研究助手 (TA/RA) 着任" },
        { year: "2026", month: "6", content: "Addo AI (Data Engineer Intern) インターン開始" }
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
