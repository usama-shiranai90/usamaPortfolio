import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Swift out
            className="group relative flex flex-col h-full"
        >
            {/* Holographic Glow Behind */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-accent/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500" />

            <div className="relative flex flex-col h-full bg-theme-bg/80 backdrop-blur-xl border border-theme-text/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:bg-theme-bg/90 group-hover:border-theme-text/10">
                {/* Tech Corners (Top Left / Bottom Right) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-accent/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-accent/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent z-10 opacity-60" />
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-10 pointer-events-none bg-[linear-gradient(transparent_1px,rgba(0,0,0,0.1)_1px)] bg-[size:100%_4px]" />

                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />

                    {/* Floating Links Overlay */}
                    <div className="absolute top-4 right-4 z-30 flex gap-2">
                        {project.github !== "#" && (
                            <Link
                                href={project.github}
                                target="_blank"
                                className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-cyan-accent hover:border-cyan-accent hover:text-black transition-all duration-300"
                            >
                                <Github size={16} />
                            </Link>
                        )}
                        {project.demo !== "#" && (
                            <Link
                                href={project.demo}
                                target="_blank"
                                className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-cyan-accent hover:border-cyan-accent hover:text-black transition-all duration-300"
                            >
                                <ArrowUpRight size={16} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative z-20">
                    <div className="mb-4">
                        <span className="text-[10px] font-mono tracking-widest text-cyan-accent uppercase mb-2 block">
                            {project.category || "Development"}
                        </span>
                        <h3 className="text-xl font-bold font-heading text-theme-text group-hover:text-cyan-accent transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-theme-text/60 text-sm leading-relaxed mb-6 font-light">
                        {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-theme-text/5 flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-[10px] font-medium tracking-wide rounded-full bg-theme-text/5 text-theme-text/70 border border-transparent group-hover:border-cyan-accent/20 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
