"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

export const Hanko = ({ text = "ウサマ", className = "", color = "#cc0000", animated = false }) => {
    const rawId = useId();
    const filterId = `ink-texture-${rawId.replace(/:/g, "")}`;

    const Wrapper = animated ? motion.div : "div";
    const motionProps = animated
        ? {
            initial: { opacity: 0, scale: 2, rotate: -20 },
            animate: { opacity: 1, scale: 1, rotate: -15 },
            transition: springSnappy,
        }
        : {};

    return (
        <Wrapper
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: '1em', height: '1em' }}
            {...motionProps}
        >
            {/* SVG Seal */}
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.1))" }}
            >
                <defs>
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                    </filter>
                </defs>

                {/* Outer Ring with rough edges */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    filter={`url(#${filterId})`}
                    className="opacity-90"
                />

                {/* Second thinner ring */}
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    className="opacity-70"
                />

                {/* Text Layout - Vertical Stack if 2-3 chars, or Grid for 4 */}
                <text
                    x="50"
                    y="50"
                    fill={color}
                    fontFamily="serif" // Usually Tensho style, but Serif approximates
                    fontSize="32"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="select-none"
                    filter={`url(#${filterId})`}
                >
                    {/* Simple vertical split for 2-3 chars is standard for simple Hanko */}
                    {text.length <= 3 ? (
                        <>
                            {text.split('').map((char, i) => (
                                <tspan key={i} x="50" dy={i === 0 ? (text.length === 1 ? 0 : -(text.length - 1) * 16) : 32}>
                                    {char}
                                </tspan>
                            ))}
                        </>
                    ) : (
                        // Fallback for long text
                        <tspan fontSize="20">{text}</tspan>
                    )}
                </text>
            </svg>
        </Wrapper>
    );
};
