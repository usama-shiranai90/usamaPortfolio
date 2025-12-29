
import image1 from '/public/images/photos/image-1.jpg';
import image2 from '/public/images/photos/image-2.jpg';
import image3 from '/public/images/photos/image-3.jpg';
import image4 from '/public/images/photos/image-4.jpg';

export const publications = [
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

export const projects = [
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
