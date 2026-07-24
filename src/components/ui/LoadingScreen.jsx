"use client";

import { motion, useMotionValue, useTransform, animate, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { OneEyeOwl } from "@/components/ui/OneEyeOwl";
import { useTheme } from "@/context/ThemeContext";
import { EASE } from "@/lib/motion";

const GREETINGS = [
    { text: "Welcome", sub: "Digital Portfolio Experience" },
    { text: "こんにちは", sub: "ポートフォリオへようこそ" },
    { text: "Salam", sub: "Software & AI Research" },
    { text: "Usama Bukhari", sub: "Crafting Digital Architecture" },
];

const getHumanReadout = (p) => {
    if (p < 35) return "Initializing personal portfolio experience...";
    if (p < 75) return "Curating engineering projects & AI research...";
    return "Welcome to Usama Bukhari's digital workspace.";
};

export function LoadingScreen({ onComplete }) {
    const { accent } = useTheme();
    const prefersReducedMotion = useReducedMotion();
    const [progress, setProgress] = useState(prefersReducedMotion ? 100 : 0);
    const [greetingIndex, setGreetingIndex] = useState(0);

    const progressValue = useMotionValue(prefersReducedMotion ? 100 : 0);
    const barWidth = useTransform(progressValue, (v) => `${v}%`);

    // Canvas for smooth fluid aurora light field
    const canvasRef = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion) {
            onComplete?.();
            return;
        }

        const controls = animate(progressValue, 100, {
            duration: 2.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => {
                setProgress((prev) => {
                    const next = Math.floor(v);
                    return next === prev ? prev : next;
                });
            },
            onComplete: () => onComplete?.(),
        });

        return () => controls.stop();
    }, [prefersReducedMotion, progressValue, onComplete]);

    // Greeting rotation timer
    useEffect(() => {
        if (prefersReducedMotion) return;
        const interval = setInterval(() => {
            setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        }, 700);
        return () => clearInterval(interval);
    }, [prefersReducedMotion]);

    // Canvas Aurora Light Field Effect
    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const orbs = Array.from({ length: 18 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 180 + 100,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.2 + 0.08,
        }));

        let animationFrameId;
        const renderFrame = () => {
            ctx.clearRect(0, 0, width, height);

            orbs.forEach((orb) => {
                orb.x += orb.vx;
                orb.y += orb.vy;

                if (orb.x < -orb.radius) orb.x = width + orb.radius;
                if (orb.x > width + orb.radius) orb.x = -orb.radius;
                if (orb.y < -orb.radius) orb.y = height + orb.radius;
                if (orb.y > height + orb.radius) orb.y = -orb.radius;

                const grad = ctx.createRadialGradient(
                    orb.x,
                    orb.y,
                    0,
                    orb.x,
                    orb.y,
                    orb.radius
                );
                grad.addColorStop(0, `rgba(${accent.rgb}, ${orb.alpha})`);
                grad.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(renderFrame);
        };

        animationFrameId = requestAnimationFrame(renderFrame);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        };
    }, [accent, prefersReducedMotion]);

    const currentGreeting = GREETINGS[greetingIndex];
    const readoutText = getHumanReadout(progress);

    return (
        <motion.div
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070c] text-white overflow-hidden"
        >
            {/* Aurora Light Field Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

            {/* Ambient Radial Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(5,7,12,0.95)_100%)] pointer-events-none" />

            {/* Central Glassmorphic Stage Card */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6">
                <div className="w-full p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-6">

                    {/* Redesigned Organic OneEyeOwl Emblem */}
                    <div className="relative flex items-center justify-center py-2">
                        <OneEyeOwl
                            className="w-44 h-44 md:w-56 md:h-56 relative z-10"
                            color={accent.value}
                        />
                    </div>

                    {/* Dynamic Greeting Carousel */}
                    <div className="h-16 flex flex-col items-center justify-center overflow-hidden w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={greetingIndex}
                                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -14, scale: 0.95 }}
                                transition={{ duration: 0.45, ease: EASE }}
                                className="flex flex-col items-center justify-center space-y-1"
                            >
                                <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
                                    {currentGreeting.text}
                                </span>
                                <span className="font-body text-xs text-white/50 tracking-widest uppercase">
                                    {currentGreeting.sub}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Glass Progress Panel */}
                    <div className="w-full space-y-3 pt-2">
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-body text-cyan-accent/90 font-medium tracking-wide text-[11px] truncate max-w-[260px]">
                                {readoutText}
                            </span>
                            <span className="font-mono text-sm font-bold text-white tracking-tight ml-2">
                                {progress}%
                            </span>
                        </div>

                        {/* Fluid Progress Bar */}
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full rounded-full shadow-glow-accent"
                                style={{
                                    width: barWidth,
                                    backgroundColor: accent.value,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitle Footer */}
                <div className="mt-8 font-body text-[10px] sm:text-[11px] text-white/40 tracking-[0.25em] uppercase text-center">
                    Syed Usama Bukhari &bull; Software Engineer & Research Student
                </div>
            </div>
        </motion.div>
    );
}
