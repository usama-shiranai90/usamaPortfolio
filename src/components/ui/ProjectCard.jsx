import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

export function ProjectCard({ project }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col bg-theme-card/30 backdrop-blur-sm border border-theme-text/10 rounded-xl overflow-hidden hover:border-cyan-accent/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.05)] h-full"
        >
            {/* Image Area - Compact */}
            <div className="relative h-32 md:h-40 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-theme-bg/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Links - Visible on Hover */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-theme-bg/80 backdrop-blur-[2px]">
                    {project.github !== "#" && (
                        <Link
                            href={project.github}
                            target="_blank"
                            className="p-2 rounded-full bg-theme-card border border-theme-text/10 text-theme-text hover:text-cyan-accent hover:border-cyan-accent transition-all transform hover:scale-110"
                            title="View Code"
                        >
                            <Github size={18} />
                        </Link>
                    )}
                    {project.demo !== "#" && (
                        <Link
                            href={project.demo}
                            target="_blank"
                            className="p-2 rounded-full bg-theme-card border border-theme-text/10 text-theme-text hover:text-cyan-accent hover:border-cyan-accent transition-all transform hover:scale-110"
                            title="Live Demo"
                        >
                            <ExternalLink size={18} />
                        </Link>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">
                <h3 className="text-base font-bold font-heading text-theme-text group-hover:text-cyan-accent transition-colors line-clamp-1">
                    {project.title}
                </h3>

                <p className="text-theme-text/60 text-xs leading-relaxed line-clamp-2 mb-2">
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded bg-theme-text/5 text-theme-text/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
