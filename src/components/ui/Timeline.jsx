"use client";

import { motion } from "framer-motion";

export function Timeline({ items }) {
    return (
        <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-theme-text/10 md:left-1/2 md:-ml-[1px]" />

            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-100px" }}
                    className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Timestamp for Desktop */}
                    <div className="hidden md:flex flex-1 justify-center md:justify-end items-center md:items-start group">
                        <div className={`flex flex-col ${index % 2 === 0 ? "items-start text-left pl-8" : "items-end text-right pr-8"}`}>
                            <span className="text-2xl font-bold font-heading text-cyan-accent/80 group-hover:text-cyan-accent transition-colors">{item.period}</span>
                            <span className="text-sm font-mono text-theme-text/50">{item.company}</span>
                        </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 -ml-2 rounded-full border-2 border-cyan-accent bg-theme-bg z-10 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                        <div className="w-full h-full rounded-full bg-cyan-accent/30 animate-pulse" />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 ml-16 md:ml-0">
                        <div className={`flex flex-col ${index % 2 === 0 ? "md:items-end md:text-right md:pr-12" : "md:items-start md:text-left md:pl-12"}`}>

                            {/* Mobile Period Display */}
                            <div className="md:hidden flex flex-col mb-2">
                                <span className="text-lg font-bold font-heading text-cyan-accent">{item.period}</span>
                                <span className="text-xs font-mono text-theme-text/50">{item.company}</span>
                            </div>

                            <div className="bg-theme-card/30 backdrop-blur-sm p-6 rounded-xl border border-theme-text/10 hover:border-cyan-accent/30 transition-all group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-bold font-heading text-theme-text relative z-10">{item.role}</h3>
                                <p className="text-theme-text/70 mt-3 text-sm leading-relaxed relative z-10">
                                    {item.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 relative z-10 justify-start">
                                    {item.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-theme-bg/50 border border-theme-text/10 text-theme-text/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spacer for Flex Alignment */}
                    <div className="hidden md:block flex-1" />
                </motion.div>
            ))}
        </div>
    );
}
