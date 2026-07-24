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
