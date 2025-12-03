"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("INITIALIZING_SYSTEM");

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random increment for realistic feel
                return Math.min(prev + Math.random() * 5, 100);
            });
        }, 100);

        // Cycle loading texts
        const textTimeout1 = setTimeout(() => setLoadingText("LOADING_MODULES"), 800);
        const textTimeout2 = setTimeout(() => setLoadingText("VERIFYING_ASSETS"), 1600);
        const textTimeout3 = setTimeout(() => setLoadingText("ESTABLISHING_UPLINK"), 2400);

        return () => {
            clearInterval(interval);
            clearTimeout(textTimeout1);
            clearTimeout(textTimeout2);
            clearTimeout(textTimeout3);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
        >
            {/* Background Grid - Subtle Tech Effect */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-10">
                {/* Logo Section with Tech Rings */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* Outer Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-cyan-accent/20 rounded-full border-t-cyan-accent/60 border-r-cyan-accent/60"
                    />

                    {/* Inner Ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-cyan-accent/10 rounded-full border-b-cyan-accent/40 border-l-cyan-accent/40"
                    />

                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cyan-accent/5 rounded-full blur-xl"
                    />

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-20 h-20 md:w-24 md:h-24 z-10"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Loading Status */}
                <div className="flex flex-col items-center gap-3 w-72">
                    <div className="flex justify-between w-full text-[10px] font-mono tracking-[0.2em] text-cyan-accent/70">
                        <span className="uppercase">{loadingText}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-cyan-accent shadow-[0_0_10px_currentColor]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 p-8 opacity-50">
                <div className="w-20 h-[1px] bg-gradient-to-r from-cyan-accent to-transparent" />
                <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-accent to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 p-8 opacity-50 rotate-180">
                <div className="w-20 h-[1px] bg-gradient-to-r from-cyan-accent to-transparent" />
                <div className="w-[1px] h-20 bg-gradient-to-b from-cyan-accent to-transparent" />
            </div>
        </motion.div>
    );
}
