"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Check } from 'lucide-react';
import { useTheme, accents } from '@/context/ThemeContext';

export function ThemeController() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDark, setIsDark, accent, setAccent, mounted } = useTheme();

    if (!mounted) return null;

    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-theme-card border border-theme-text/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl w-64"
                    >
                        <div className="space-y-6">
                            {/* Mode Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-mono text-theme-text/70">THEME_MODE</span>
                                <button
                                    onClick={() => setIsDark(!isDark)}
                                    className="relative w-14 h-7 bg-theme-text/10 rounded-full p-1 transition-colors hover:bg-theme-text/20"
                                >
                                    <motion.div
                                        animate={{ x: isDark ? 28 : 0 }}
                                        className="w-5 h-5 bg-theme-accent rounded-full flex items-center justify-center text-theme-bg"
                                    >
                                        {isDark ? <Moon size={12} /> : <Sun size={12} />}
                                    </motion.div>
                                </button>
                            </div>

                            {/* Accent Picker */}
                            <div className="space-y-3">
                                <span className="text-sm font-mono text-theme-text/70">ACCENT_COLOR</span>
                                <div className="flex flex-wrap gap-2">
                                    {accents.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setAccent(c)}
                                            className="w-8 h-8 rounded-full border border-theme-text/10 flex items-center justify-center transition-transform hover:scale-110"
                                            style={{ backgroundColor: c.value }}
                                            title={c.name}
                                        >
                                            {accent.value === c.value && <Check size={14} className="text-theme-bg font-bold" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-theme-card border border-theme-accent/50 rounded-full flex items-center justify-center text-theme-accent shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_var(--theme-accent)] transition-shadow"
            >
                <Settings size={24} />
            </motion.button>
        </div>
    );
}
