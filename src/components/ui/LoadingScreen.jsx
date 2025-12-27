"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("INIT"); // INIT, SYNC, READY
    const [loadingText, setLoadingText] = useState("INITIALIZING_CORE");

    // Canvas for neural generation visualization
    const canvasRef = useRef(null);

    useEffect(() => {
        const duration = 2500; // 2.5s total load
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / duration) * 100, 100);

            setProgress(p);

            // Phase logic
            if (p < 30) {
                setLoadingText("LOADING_NEURO_SYMBOLIC_KERNELS");
                setPhase("INIT");
            } else if (p < 70) {
                setLoadingText("TRAINING_MIXTURE_OF_EXPERTS");
                setPhase("SYNC");
            } else {
                setLoadingText("SYSTEM_READY");
                setPhase("READY");
            }

            if (p >= 100) {
                clearInterval(interval);
            }
        }, 16); // 60fps update

        return () => clearInterval(interval);
    }, []);

    // Canvas Matrix Rain / Grid Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = Array(columns).fill(1).map(() => Math.random() * -100);

        const draw = () => {
            // Translucent black background for trail effect
            ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "rgba(20, 184, 166, 0.35)"; // Cyan Accent
            ctx.font = "12px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96); // Random Katakana
                const x = i * 20;
                const y = drops[i] * 20;

                // Draw only if "active" (based on progress)
                if (Math.random() > 0.98) {
                    ctx.fillText(text, x, y);
                }

                // Reset or move
                if (y > height && Math.random() > 0.99) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 50);

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] text-white overflow-hidden"
        >
            {/* Background Matrix/Grid Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6">

                {/* Logo / Symbol */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 bg-cyan-accent blur-2xl opacity-20 animate-pulse" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                        className="w-24 h-24 border border-cyan-accent/30 rounded-full flex items-center justify-center relative"
                    >
                        <div className="absolute top-0 left-1/2 -ml-0.5 w-1 h-2 bg-cyan-accent/50" />
                        <div className="absolute bottom-0 left-1/2 -ml-0.5 w-1 h-2 bg-cyan-accent/50" />
                        <div className="absolute left-0 top-1/2 -mt-0.5 h-1 w-2 bg-cyan-accent/50" />
                        <div className="absolute right-0 top-1/2 -mt-0.5 h-1 w-2 bg-cyan-accent/50" />
                    </motion.div>

                    {/* Inner Symbol */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-xl md:text-2xl font-bold text-cyan-accent tracking-tighter">
                            {Math.floor(progress)}%
                        </span>
                    </div>
                </div>

                {/* Text Readout */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="font-mono text-xs text-cyan-accent/70 tracking-widest uppercase">
                            {loadingText}
                        </span>
                        <span className="font-mono text-xs text-white/30">
                            v2.5.0-RC
                        </span>
                    </div>

                    {/* Technical Progress Bar */}
                    <div className="h-1 w-full bg-white/5 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-cyan-accent"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }} // Instant updates via state
                        />
                        {/* Scanning highlight */}
                        <motion.div
                            animate={{ left: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent"
                        />
                    </div>

                    {/* Sub-text */}
                    <div className="flex justify-between font-mono text-[10px] text-white/20 pt-1">
                        <span>MEM: {Math.floor(progress * 12.4)}MB OK</span>
                        <span>NET: DETECTED</span>
                    </div>
                </div>
            </div>

            {/* Corner Info */}
            <div className="absolute bottom-8 left-8 font-mono text-[10px] text-white/10 hidden md:block">
                SYS.ID: 0x938AA<br />
                LOC: FUKUOKA, JP
            </div>
        </motion.div>
    );
}
