export const Hanko = ({ text = "ウサマ", className = "", color = "#cc0000" }) => {
    return (
        <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: '1em', height: '1em' }}>
            {/* SVG Seal */}
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.1))" }}
            >
                <defs>
                    <filter id="ink-texture">
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
                    filter="url(#ink-texture)"
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
                    filter="url(#ink-texture)"
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
        </div>
    );
};
