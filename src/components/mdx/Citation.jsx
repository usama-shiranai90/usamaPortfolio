"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const Citation = ({ index, title, authors, journal }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="relative inline-block align-super text-xs cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="text-cyan-accent font-bold hover:underline">[{index}]</span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50 pointer-events-none"
                    >
                        <div className="bg-theme-card border border-theme-text/10 rounded-lg p-3 shadow-xl backdrop-blur-md">
                            <div className="flex items-start gap-2 mb-1">
                                <BookOpen size={14} className="text-cyan-accent mt-0.5 shrink-0" />
                                <span className="text-xs font-bold text-theme-text leading-tight">{title}</span>
                            </div>
                            <div className="pl-6 text-[10px] text-theme-text/70 space-y-0.5">
                                <p className="italic">{authors}</p>
                                <p className="text-theme-text/50">{journal}</p>
                            </div>

                            {/* Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-theme-text/10" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
