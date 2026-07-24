"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Github, ExternalLink, BookOpen, Calendar, ChevronDown, Quote } from "lucide-react";
import { useId, useState } from "react";
import { fadeUp, VIEWPORT, EASE, DURATION } from "@/lib/motion";
import { Tag } from "@/components/ui/Tag";

export function PublicationCard({ publication }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const abstractId = useId();

    return (
        <motion.div
            layout
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="group relative flex flex-col items-start"
        >
            {/* Left Border Accent (Scientific Citation Style) */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-theme-text/10 group-hover:bg-cyan-accent/50 transition-colors duration-500" />

            <div className="pl-6 md:pl-8 py-2 w-full">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wide text-theme-muted mb-3">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-cyan-accent" />
                        {publication.year}
                    </span>
                    <Tag active className="uppercase">{publication.venue}</Tag>
                    <Tag>{publication.type}</Tag>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold font-heading text-theme-text leading-tight mb-3 group-hover:text-cyan-accent transition-colors duration-300">
                    {publication.title}
                </h3>

                {/* Authors */}
                <div className="flex flex-wrap gap-x-1 text-theme-muted text-sm font-light mb-4">
                    {publication.authors.map((author, i) => (
                        <span key={i} className={`flex items-center ${author.includes("Usama") ? "text-theme-text font-medium border-b border-cyan-accent/30" : ""}`}>
                            {author}{i < publication.authors.length - 1 ? "," : ""}
                        </span>
                    ))}
                </div>

                {/* Links & Expand */}
                <div className="flex items-center justify-between border-t border-theme-border pt-4 mt-2">
                    <div className="flex gap-4">
                        {publication.links.pdf && (
                            <a href={publication.links.pdf} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-theme-muted hover:text-cyan-accent transition-colors">
                                <FileText size={14} /> <span className="hidden sm:inline">PDF</span>
                            </a>
                        )}
                        {publication.links.code && (
                            <a href={publication.links.code} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-theme-muted hover:text-cyan-accent transition-colors">
                                <Github size={14} /> <span className="hidden sm:inline">CODE</span>
                            </a>
                        )}
                        {publication.links.project && (
                            <a href={publication.links.project} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-theme-muted hover:text-cyan-accent transition-colors">
                                <ExternalLink size={14} /> <span className="hidden sm:inline">PROJECT</span>
                            </a>
                        )}
                        {publication.doi && (
                            <a href={`https://doi.org/${publication.doi}`} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-theme-muted hover:text-cyan-accent transition-colors">
                                <BookOpen size={14} /> <span className="hidden sm:inline">DOI</span>
                            </a>
                        )}
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls={abstractId}
                        className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors px-3 py-1 rounded-full ${isExpanded ? "text-cyan-accent bg-cyan-accent/5" : "text-theme-muted hover:text-cyan-accent"
                            }`}
                    >
                        <span>Abstract</span>
                        <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                {/* Abstract Dropdown */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            id={abstractId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: DURATION.fast, ease: EASE }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 relative">
                                <Quote size={24} className="absolute left-0 top-6 text-cyan-accent/10 -translate-x-1" />
                                <p className="text-sm md:text-base text-theme-text/70 leading-relaxed font-light pl-8 italic border-l border-cyan-accent/10">
                                    {publication.abstract}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
