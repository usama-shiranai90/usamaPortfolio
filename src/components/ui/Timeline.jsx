"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/ui/Tag";
import {
    Briefcase,
    Building2,
    Calendar,
    MapPin,
    CheckCircle2,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    Layers
} from "lucide-react";

export function Timeline({ items }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeIndex, setActiveIndex] = useState(0);

    const categories = useMemo(() => {
        const cats = new Set(["All"]);
        items?.forEach((item) => {
            if (item.category) cats.add(item.category);
        });
        return Array.from(cats);
    }, [items]);

    const filteredItems = useMemo(() => {
        if (!items) return [];
        if (selectedCategory === "All") return items;
        return items.filter((item) => item.category === selectedCategory);
    }, [items, selectedCategory]);

    const currentItem = filteredItems[activeIndex] || filteredItems[0] || items?.[0];

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setActiveIndex(0);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full space-y-6 py-2">
            {/* Top Control Bar & Category Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-theme-card/40 border border-theme-border/80 backdrop-blur-xl shadow-lg">
                {/* Category Pills */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest mr-2 hidden md:inline">
                            [ DOMAIN FILTER ]
                        </span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 uppercase ${
                                    selectedCategory === cat
                                        ? "bg-cyan-accent text-theme-bg font-bold shadow-glow-accent scale-105"
                                        : "bg-theme-bg/60 text-theme-text/70 border border-theme-border hover:border-cyan-accent/50 hover:text-cyan-accent"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Quick Counter Badge */}
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-accent ml-auto">
                    <span className="px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 font-bold">
                        ROLE {activeIndex + 1} / {filteredItems.length}
                    </span>
                </div>
            </div>

            {/* HCI Executive Split-Pane (Master Selector + Detailed Showcase) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Master Pane: Compact Interactive Role Cards */}
                <div className="lg:col-span-4 space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredItems.map((item, idx) => {
                        const isSelected = activeIndex === idx;
                        const isCurrent = item.period?.includes("Present") || item.period?.includes("Continue");

                        return (
                            <motion.button
                                key={item.id || idx}
                                onClick={() => setActiveIndex(idx)}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between gap-3 cursor-pointer backdrop-blur-xl ${
                                    isSelected
                                        ? "bg-cyan-accent/15 border-cyan-accent text-theme-text shadow-glow-accent ring-1 ring-cyan-accent/40"
                                        : "bg-theme-card/40 border-theme-border/60 hover:border-cyan-accent/40 hover:bg-theme-card/70 text-theme-text/80"
                                }`}
                            >
                                <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[11px] font-mono text-cyan-accent font-bold truncate">
                                            {item.period?.split(" – ")[0] || item.period?.split(" - ")[0]}
                                        </span>
                                        {isCurrent && (
                                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                PRESENT
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-bold font-heading text-sm md:text-base text-theme-text truncate">
                                        {item.role}
                                    </h4>
                                    <p className="text-xs text-theme-text/60 font-body truncate">
                                        {item.company}
                                    </p>
                                </div>

                                <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                                    isSelected ? "bg-cyan-accent text-theme-bg border-cyan-accent shadow-sm" : "bg-theme-bg/60 border-theme-border text-theme-text/40"
                                }`}>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Right Detail Showcase Pane */}
                <div className="lg:col-span-8">
                    {currentItem && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.id || activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="rounded-3xl p-6 md:p-8 bg-theme-card/70 backdrop-blur-xl border border-cyan-accent/30 shadow-2xl space-y-6 relative overflow-hidden min-h-[520px] flex flex-col justify-between"
                            >
                                {/* Accent Glow backdrop */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="space-y-6">
                                    {/* Header Row */}
                                    <div className="space-y-3 pb-4 border-b border-theme-border/60">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                {currentItem.category && (
                                                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-cyan-accent/15 border border-cyan-accent/30 text-cyan-accent font-semibold">
                                                        {currentItem.category}
                                                    </span>
                                                )}
                                                {currentItem.period?.includes("Present") && (
                                                    <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                                                        Active Position
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-accent font-bold">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{currentItem.period}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-theme-text leading-tight">
                                            {currentItem.role}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-theme-text/70 pt-1">
                                            <div className="flex items-center gap-1.5 font-bold text-cyan-accent">
                                                <Building2 className="w-4 h-4" />
                                                <span>{currentItem.company}</span>
                                            </div>
                                            {currentItem.location && (
                                                <div className="flex items-center gap-1.5 text-theme-text/60">
                                                    <MapPin className="w-3.5 h-3.5 text-cyan-accent" />
                                                    <span>{currentItem.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Overview Summary */}
                                    {currentItem.summary && (
                                        <p className="text-theme-text/85 text-sm md:text-base leading-relaxed font-light">
                                            {currentItem.summary}
                                        </p>
                                    )}

                                    {/* Achievements List */}
                                    {Array.isArray(currentItem.description) && currentItem.description.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-accent uppercase tracking-widest">
                                                <Sparkles className="w-3.5 h-3.5 text-cyan-accent" />
                                                <span>Engineering Highlights & Impact</span>
                                            </div>

                                            <ul className="space-y-2">
                                                {currentItem.description.map((bullet, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-3 p-3 rounded-2xl bg-theme-bg/50 border border-theme-border/60 text-theme-text/90 text-xs md:text-sm leading-relaxed font-light"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Tech Stack Pills */}
                                    {currentItem.tags && (
                                        <div className="pt-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {currentItem.tags.map((tag) => (
                                                    <Tag key={tag} className="hover:text-cyan-accent bg-theme-bg/60">
                                                        {tag}
                                                    </Tag>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center justify-between pt-4 border-t border-theme-border/50 mt-4">
                                    <button
                                        onClick={handlePrev}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-theme-text/70 bg-theme-bg/60 border border-theme-border hover:border-cyan-accent/50 hover:text-cyan-accent transition-all cursor-pointer"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        <span>PREV ROLE</span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/30 hover:bg-cyan-accent/20 transition-all cursor-pointer font-bold"
                                    >
                                        <span>NEXT ROLE</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
