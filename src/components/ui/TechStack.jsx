"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Globe, Layers, Code, Terminal } from "lucide-react";

const skills = {
    "AI & ML": {
        icon: Cpu,
        items: ["PyTorch", "TensorFlow", "Transformers", "Computer Vision", "NLP", "Reinforcement Learning", "Scikit-learn", "Pandas"]
    },
    "Data Engineering": {
        icon: Database,
        items: ["SQL", "MongoDB", "Redis", "Apache Spark", "Docker", "Kubernetes", "AWS", "Google Cloud"]
    },
    "Full Stack": {
        icon: Globe,
        items: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL", "REST APIs"]
    },
    "Languages": {
        icon: Code,
        items: ["Python", "JavaScript", "C++", "C#", "SQL", "R", "Bash"]
    }
};

export function TechStack() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, { icon: Icon, items }], index) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-theme-card/20 backdrop-blur-sm border border-theme-text/10 rounded-xl p-6 hover:bg-theme-card/30 transition-colors group"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-accent/10 text-cyan-accent group-hover:scale-110 transition-transform">
                            <Icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold font-heading text-theme-text">{category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 text-xs font-mono text-theme-text/70 bg-theme-bg/50 border border-theme-text/5 rounded hover:border-cyan-accent/30 hover:text-cyan-accent transition-colors cursor-default"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
