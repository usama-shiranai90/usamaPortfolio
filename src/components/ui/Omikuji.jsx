"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const FORTUNES = [
    { label: "大吉", reading: "Daikichi", title: "Great Blessing", text: "Your code will compile without errors today. Deploy with confidence.", color: "#ef4444" },
    { label: "中吉", reading: "Chukichi", title: "Middle Blessing", text: "A complex bug will resolve itself after a coffee break.", color: "#f97316" },
    { label: "小吉", reading: "Shokichi", title: "Small Blessing", text: "You will find the missing semicolon immediately.", color: "#eab308" },
    { label: "吉", reading: "Kichi", title: "Blessing", text: "Documentation will be surprisingly clear today.", color: "#22c55e" },
    { label: "末吉", reading: "Sue-kichi", title: "Future Blessing", text: "Refactoring is difficult now, but technical debt will be repaid.", color: "#3b82f6" },
    { label: "凶", reading: "Kyo", title: "Curse", text: "Merge conflicts ahead. Back up your work.", color: "#71717a" }, // Playful warning
];

export function Omikuji() {
    const { accent } = useTheme();
    const [state, setState] = useState('idle'); // idle, shaking, result
    const [fortune, setFortune] = useState(null);

    const drawFortune = () => {
        setState('shaking');
        setTimeout(() => {
            const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
            setFortune(random);
            setState('result');
        }, 2000);
    };

    const reset = () => {
        setState('idle');
        setFortune(null);
    };

    return (
        <div className="relative font-sans text-[var(--theme-text)]">
            <AnimatePresence mode="wait">
                {state === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <button
                            onClick={drawFortune}
                            className="group relative flex flex-col items-center gap-4 p-8 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[var(--theme-accent)] transition-colors bg-[var(--theme-card)]/50"
                        >
                            <div className="text-4xl">⛩️</div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold font-serif mb-1">Tech Omikuji</h3>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest">Draw your fortune</p>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ '--theme-accent': accent.value }} />
                        </button>
                    </motion.div>
                )}

                {state === 'shaking' && (
                    <motion.div
                        key="shaking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center p-8"
                    >
                        <motion.div
                            animate={{
                                x: [-2, 2, -2, 2, 0],
                                rotate: [-5, 5, -5, 5, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="text-6xl mb-4"
                        >
                            🗳️
                        </motion.div>
                        <p className="text-sm font-mono animate-pulse">Consulting the algorithm...</p>
                    </motion.div>
                )}

                {state === 'result' && fortune && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        className="w-full max-w-sm bg-theme-card border-2 border-zinc-800 p-6 relative shadow-xl flex flex-col items-center text-center"
                        style={{ borderColor: fortune.color }}
                    >
                        {/* Decorative Holes (Ticket style) */}
                        <div className="absolute -left-2 top-1/2 w-4 h-4 bg-theme-bg rounded-full" />
                        <div className="absolute -right-2 top-1/2 w-4 h-4 bg-theme-bg rounded-full" />

                        <div className="mb-4">
                            <span className="text-xs font-mono text-theme-text/40 uppercase tracking-widest">Result</span>
                            <h2 className="text-5xl font-black font-serif my-2" style={{ color: fortune.color }}>{fortune.label}</h2>
                            <p className="text-sm font-bold uppercase tracking-widest text-theme-text/50">{fortune.reading} • {fortune.title}</p>
                        </div>

                        <div className="w-full h-[1px] bg-theme-text/10 my-4" />

                        <p className="font-serif text-lg leading-relaxed text-theme-text/80 mb-6">
                            "{fortune.text}"
                        </p>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[var(--theme-accent)] transition-colors text-zinc-400"
                            style={{ '--theme-accent': accent.value }}
                        >
                            <RefreshCw size={12} /> Draw Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
