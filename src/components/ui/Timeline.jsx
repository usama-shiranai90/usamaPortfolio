"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { Tag } from "@/components/ui/Tag";

export function Timeline({ items }) {
    return (
        <div className="relative space-y-24 py-20">
            {/* Elegant Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-theme-border to-transparent md:left-1/2 md:-ml-px" />

            {items.map((item, index) => (
                <motion.div
                    key={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    className={`relative flex flex-col md:flex-row gap-12 md:gap-24 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Year / Period Section */}
                    <div className="flex-1 flex md:items-center justify-start md:justify-end">
                        <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"} pl-12 md:pl-0`}>
                            <h3 className="text-5xl md:text-7xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-br from-cyan-accent via-cyan-accent/50 to-transparent opacity-80 mb-2">
                                {item.period.split(" ")[0]}
                                {/* Assuming format "2024 - Present" or similar, grabbing first year/word for impact */}
                            </h3>
                            <span className="text-lg font-mono text-cyan-accent tracking-widest uppercase opacity-80">
                                {item.period.replace(item.period.split(" ")[0], "").trim()}
                            </span>
                            <span className="text-sm font-body text-theme-muted mt-1 uppercase tracking-wider">
                                {item.company}
                            </span>
                        </div>
                    </div>

                    {/* Central Node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center pt-2 md:pt-0 h-full md:h-auto top-0">
                        <div className="relative w-4 h-4">
                            <div className="absolute inset-0 bg-theme-bg rounded-full border border-theme-border z-10" />
                            <div className="absolute inset-0 bg-cyan-accent blur-md opacity-50 motion-safe:animate-pulse" />
                            <div className="absolute inset-[3px] bg-cyan-accent rounded-full z-20" />
                        </div>
                    </div>

                    {/* Content Card Section */}
                    <div className="flex-1 pl-12 md:pl-0">
                        <div className={`relative group ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                            <div className={`hidden md:block absolute top-8 ${index % 2 === 0 ? "right-full mr-6" : "left-full ml-6"} w-12 h-px bg-theme-border`} />

                            <h4 className="text-3xl font-bold font-heading text-theme-text mb-4 group-hover:text-cyan-accent transition-colors duration-300">
                                {item.role}
                            </h4>
                            {Array.isArray(item.description) ? (
                                <ul className="list-disc pl-5 space-y-2 text-theme-muted font-light text-lg mb-6 max-w-lg">
                                    {item.description.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-theme-muted leading-relaxed font-light text-lg mb-6 max-w-lg">
                                    {item.description}
                                </p>
                            )}

                            <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                {item.tags?.map((tag) => (
                                    <Tag
                                        key={tag}
                                        className="hover:text-cyan-accent hover:ring-cyan-accent/40"
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
