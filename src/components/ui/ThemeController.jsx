"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Moon, Sun, Check, X, Monitor } from 'lucide-react';
import { useTheme, accents } from '@/context/ThemeContext';

export function ThemeController() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDark, setIsDark, accent, setAccent, mounted } = useTheme();

    if (!mounted) return null;

    return (
        <div className="fixed z-0 right-6 top-6 z-[60] flex flex-col items-end gap-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-12 h-12 rounded-full flex items-center justify-center 
                    backdrop-blur-md border border-white/10 shadow-lg
                    transition-all duration-300
                    ${isOpen ? 'bg-cyan-accent text-black rotate-90' : 'bg-zinc-900/80 text-white hover:bg-zinc-800'}
                `}
            >
                {isOpen ? <X size={20} /> : <Palette size={20} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-zinc-900/90 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-xl w-72 origin-top-right"
                    >
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2">
                                <Monitor size={16} className="text-cyan-accent" />
                                <span className="text-xs font-mono tracking-widest text-white/80 uppercase">System Config</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Mode Toggle */}
                            <div className="space-y-3">
                                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Interface Mode</span>
                                <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                                    <button
                                        onClick={() => setIsDark(false)}
                                        className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${!isDark
                                            ? 'bg-white text-black shadow-lg'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Sun size={14} />
                                        <span>Light</span>
                                    </button>
                                    <button
                                        onClick={() => setIsDark(true)}
                                        className={`flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-all ${isDark
                                            ? 'bg-zinc-800 text-white shadow-lg border border-white/10'
                                            : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Moon size={14} />
                                        <span>Dark</span>
                                    </button>
                                </div>
                            </div>

                            {/* Accent Picker */}
                            <div className="space-y-3">
                                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">System Accent</span>
                                <div className="grid grid-cols-5 gap-2">
                                    {accents.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setAccent(c)}
                                            className="group relative w-full aspect-square rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                                            title={c.name}
                                        >
                                            <div
                                                className="absolute inset-0 rounded-full opacity-20 transition-opacity group-hover:opacity-100"
                                                style={{ backgroundColor: c.value, boxShadow: `0 0 10px ${c.value}` }}
                                            />
                                            <div
                                                className="relative w-4 h-4 rounded-full border border-white/20"
                                                style={{ backgroundColor: c.value }}
                                            />
                                            {accent.value === c.value && (
                                                <motion.div
                                                    layoutId="activeAccent"
                                                    className="absolute inset-0 border-2 border-white/20 rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
