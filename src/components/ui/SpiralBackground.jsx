// components/ui/SpiralBackground.jsx
"use client";

export function SpiralBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-dark-bg">
            {/* Deep radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(4,20,25,1)_0%,rgba(2,6,9,1)_100%)]" />

            {/* The Spiral Mesh (SVG) */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[150vh] h-[150vh] opacity-40 animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d3b45" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0d3b45" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Concentric / Spiral Paths */}
                {[...Array(20)].map((_, i) => (
                    <ellipse
                        key={i}
                        cx="50" cy="50"
                        rx={10 + i * 2.5} ry={10 + i * 2}
                        fill="none"
                        stroke="url(#spiral-gradient)"
                        strokeWidth="0.1"
                        transform={`rotate(${i * 10} 50 50)`}
                    />
                ))}
                {[...Array(20)].map((_, i) => (
                    <ellipse
                        key={`b-${i}`}
                        cx="50" cy="50"
                        rx={10 + i * 2.5} ry={5 + i * 2}
                        fill="none"
                        stroke="url(#spiral-gradient)"
                        strokeWidth="0.1"
                        transform={`rotate(${i * -15} 50 50)`}
                    />
                ))}
            </svg>

            {/* Grainy Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>
    );
}