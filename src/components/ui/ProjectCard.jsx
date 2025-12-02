import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

export function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden bg-theme-card border border-theme-text/5 hover:border-cyan-accent/50 transition-colors"
        >
            <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent z-10 opacity-60" />
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-6 relative z-20">
                <h3 className="text-2xl font-bold font-heading text-theme-text mb-2 group-hover:text-cyan-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-theme-text/60 mb-4 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-accent/10 text-cyan-accent"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    <Link
                        href={project.github}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-medium text-theme-text hover:text-cyan-accent transition-colors"
                    >
                        <Github className="w-4 h-4" /> Code
                    </Link>
                    <Link
                        href={project.demo}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-medium text-theme-text hover:text-cyan-accent transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
