"use client";

import { motion } from "framer-motion";
import { FileText, Github, ExternalLink, BookOpen, Calendar } from "lucide-react";
import { useState } from "react";

export function PublicationCard({ publication }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-theme-card/30 backdrop-blur-sm border border-theme-text/10 rounded-xl p-6 hover:border-cyan-accent/30 transition-all duration-300"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={48} />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-accent mb-2">
                            <span className="px-2 py-1 rounded bg-cyan-accent/10 border border-cyan-accent/20">
                                {publication.type}
                            </span>
                            <span className="flex items-center gap-1 text-theme-text/60">
                                <Calendar size={12} />
                                {publication.year}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-theme-text group-hover:text-cyan-accent transition-colors">
                            {publication.title}
                        </h3>
                    </div>
                </div>

                {/* Authors */}
                <p className="text-theme-text/70 text-sm">
                    {publication.authors.map((author, i) => (
                        <span key={i} className={author === "Usama Bukhari" ? "text-cyan-accent font-semibold" : ""}>
                            {author}{i < publication.authors.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </p>

                {/* Venue */}
                <p className="text-sm font-semibold text-theme-text/90 italic">
                    {publication.venue}
                </p>

                {/* Abstract Toggle */}
                <div className="space-y-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-mono text-theme-text/50 hover:text-cyan-accent flex items-center gap-1 transition-colors"
                    >
                        [{isExpanded ? "HIDE_ABSTRACT" : "READ_ABSTRACT"}]
                    </button>
                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-theme-text/60 leading-relaxed border-l-2 border-theme-text/10 pl-4 py-2">
                            {publication.abstract}
                        </p>
                    </motion.div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    {publication.links.pdf && (
                        <a
                            href={publication.links.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-theme-text/80 hover:text-cyan-accent transition-colors px-3 py-2 rounded bg-theme-bg/50 border border-theme-text/10 hover:border-cyan-accent/50"
                        >
                            <FileText size={14} /> PDF
                        </a>
                    )}
                    {publication.links.code && (
                        <a
                            href={publication.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-theme-text/80 hover:text-cyan-accent transition-colors px-3 py-2 rounded bg-theme-bg/50 border border-theme-text/10 hover:border-cyan-accent/50"
                        >
                            <Github size={14} /> CODE
                        </a>
                    )}
                    {publication.links.project && (
                        <a
                            href={publication.links.project}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold text-theme-text/80 hover:text-cyan-accent transition-colors px-3 py-2 rounded bg-theme-bg/50 border border-theme-text/10 hover:border-cyan-accent/50"
                        >
                            <ExternalLink size={14} /> PROJECT
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
