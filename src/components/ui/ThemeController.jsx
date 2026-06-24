"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Moon, Sun, X, Monitor, Github, Grid, Network, Sparkles, Maximize2, Cpu, Ghost, Snowflake, Disc, BookOpen, Terminal, BrainCircuit, Ruler, Binary, Microscope, Languages, Settings } from 'lucide-react';
import { useTheme, accents, backgroundStyles } from '@/context/ThemeContext';

const DraggableScroll = ({ children, className, style }) => {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        ref.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={ref}
            className={`${className} cursor-grab active:cursor-grabbing`}
            style={style}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children}
        </div>
    );
};

export function ThemeController() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        themeMode, setThemeMode,
        accent, setAccent,
        backgroundStyle, setBackgroundStyle,
        language, setLanguage,
        mounted, isDark
    } = useTheme();

    const bgDescriptions = {
        'scientific': 'Particle connections',
        'ai-network': 'Neural node graph',
        'particles': 'Floating space dust',
        'grid': 'Cyber perspective',
        'blueprint': 'Technical grid',
        'algorithm': 'Binary code matrix',
        'research': 'Focused dot field',
        'minimal': 'No visual effect',
    };

    if (!mounted) return null;

    const getBgIcon = (id) => {
        switch (id) {
            case 'scientific': return <Network size={16} />;
            case 'ai-network': return <BrainCircuit size={16} />;
            case 'particles': return <Sparkles size={16} />;
            case 'grid': return <Grid size={16} />;
            case 'blueprint': return <Ruler size={16} />;
            case 'algorithm': return <Binary size={16} />;
            case 'research': return <Microscope size={16} />;
            case 'minimal': return <Maximize2 size={16} />;
            default: return <Grid size={16} />;
        }
    };

    // Dynamic panel styles based on theme
    const panelBg = isDark ? 'bg-[#0a0a0a]/90 border-white/10' : 'bg-white/90 border-black/5';
    const textColor = isDark ? 'text-white' : 'text-zinc-900';
    const subTextColor = isDark ? 'text-white/50' : 'text-zinc-500';
    const cardBg = isDark ? 'bg-zinc-900' : 'bg-zinc-100';
    const borderColor = isDark ? 'border-white/10' : 'border-black/10';

    const themeOptions = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'github-dark', icon: Github, label: 'Github' },
        { id: 'dracula', icon: Ghost, label: 'Dracula' },
        { id: 'nord', icon: Snowflake, label: 'Nord' },
        { id: 'obsidian', icon: Disc, label: 'Obsidian' }, // Using Disc as a simple geometric shape
        { id: 'paper', icon: BookOpen, label: 'Research' },
        { id: 'terminal', icon: Terminal, label: 'Terminal' },
    ];

    return (
        <div className="fixed right-4 top-4 md:right-6 md:top-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
            <style>{`
                @keyframes panGrid {
                    0% { background-position: 0 0; }
                    100% { background-position: 16px 16px; }
                }
                @keyframes scanLine {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-pan-grid {
                    animation: panGrid 4s linear infinite;
                }
                .animate-scan {
                    animation: scanLine 2.5s ease-in-out infinite;
                }
            `}</style>
            <div className="flex items-center gap-3">
                {/* Command Palette Trigger - Smaller & Left */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.dispatchEvent(new CustomEvent('open-command-menu'))}
                    className={`
                        pointer-events-auto
                        w-8 h-8 rounded-lg flex items-center justify-center 
                        backdrop-blur-xl border shadow-lg transition-all duration-300
                        ${isDark ? 'bg-zinc-900/60 border-white/10 text-white/50 hover:text-white hover:bg-zinc-800'
                            : 'bg-white/60 border-black/10 text-zinc-500 hover:text-zinc-900 hover:bg-white'}
                    `}
                    title="Command Palette (Cmd+K)"
                >
                    <span className="text-[10px] font-mono font-bold">⌘</span>
                </motion.button>

                {/* Enhanced Floating Trigger Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        pointer-events-auto
                        w-12 h-12 rounded-xl flex items-center justify-center 
                        backdrop-blur-xl border shadow-2xl transition-all duration-300
                        ${isOpen
                            ? 'bg-zinc-900/95 text-white'
                            : isDark ? 'bg-zinc-900/60 border-white/10 text-white/70 hover:bg-zinc-800 hover:border-white/30 hover:text-white'
                                : 'bg-white/60 border-black/10 text-zinc-700 hover:bg-white hover:text-black'}
                    `}
                    style={{
                        borderColor: isOpen ? accent.value : '',
                        color: isOpen ? accent.value : '',
                        boxShadow: isOpen ? `0 0 20px -5px ${accent.value}` : '0 10px 30px -10px rgba(0,0,0,0.1)'
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        {isOpen ? <X size={20} /> : <Settings size={22} />}
                    </motion.div>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                        className={`
                            pointer-events-auto
                            relative p-5 rounded-2xl backdrop-blur-2xl border
                            w-80 max-w-[calc(100vw-2rem)] origin-top-right h-auto max-h-[85vh] overflow-y-auto
                            scrollbar-none transition-all duration-300
                            ${isDark ? 'bg-zinc-950/85 border-zinc-800/40 text-white' : 'bg-white/85 border-zinc-200/50 text-zinc-900'}
                        `}
                        style={{
                            boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.4), 0 0 40px -20px ${accent.value}33`
                        }}
                    >
                        {/* Decorative Premium Glow Line */}
                        <div 
                            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-75"
                            style={{ 
                                background: `linear-gradient(90deg, transparent 15%, ${accent.value} 50%, transparent 85%)` 
                            }}
                        />

                        <div className={`flex items-center justify-between mb-6 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                            <div className="flex items-center gap-2">
                                <Monitor size={16} style={{ color: accent.value }} />
                                <span className={`text-xs font-mono tracking-widest uppercase font-bold ${textColor}`}>System Config</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`${subTextColor} hover:${textColor} transition-colors`}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-6">

                            {/* Language Switcher */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest pl-1 font-bold opacity-80">
                                    <Languages size={13} className={subTextColor} />
                                    <span className={subTextColor}>Language Region</span>
                                </div>
                                <div className={`relative flex items-center p-1 rounded-xl border ${borderColor} ${isDark ? 'bg-black/40' : 'bg-black/5'}`}>
                                    {['en', 'jp'].map((lang) => {
                                        const isSelected = language === lang;
                                        return (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                className={`relative flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${isSelected
                                                    ? 'text-white'
                                                    : `${subTextColor} opacity-60 hover:opacity-100`
                                                }`}
                                            >
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="activeLanguagePill"
                                                        className="absolute inset-0 rounded-lg shadow-sm z-0"
                                                        style={{ backgroundColor: accent.value }}
                                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                                <span className="relative z-10 uppercase tracking-wider">{lang === 'en' ? 'English' : '日本語'}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Interface Mode Grid */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest pl-1 font-bold opacity-80">
                                    <Palette size={13} className={subTextColor} />
                                    <span className={subTextColor}>Interface Mode</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {themeOptions.map(({ id, icon: Icon, label }) => {
                                        const isSelected = themeMode === id;
                                        return (
                                            <motion.button
                                                key={id}
                                                onClick={() => setThemeMode(id)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`
                                                    relative flex flex-col items-center justify-center gap-1.5 py-2 rounded-xl border transition-all duration-300
                                                    ${isSelected
                                                        ? 'border-transparent text-white shadow-md'
                                                        : `border-zinc-200/5 hover:border-zinc-200/20 text-zinc-400 hover:text-zinc-200 ${isDark ? 'bg-white/5' : 'bg-black/5'}`
                                                    }
                                                `}
                                                style={{
                                                    boxShadow: isSelected ? `0 4px 12px -4px ${accent.value}88` : ''
                                                }}
                                            >
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="activeThemeMode"
                                                        className="absolute inset-0 rounded-xl z-0"
                                                        style={{ backgroundColor: accent.value }}
                                                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                                    />
                                                )}
                                                <Icon size={15} className={`relative z-10 ${isSelected ? 'text-white' : subTextColor}`} />
                                                <span className={`relative z-10 capitalize whitespace-nowrap text-[8px] font-mono tracking-wider ${isSelected ? 'text-white font-bold' : subTextColor}`}>{label}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Background Engine Grid */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest pl-1 font-bold opacity-80">
                                    <Cpu size={13} className={subTextColor} />
                                    <span className={subTextColor}>Background Engine</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {backgroundStyles.map((bg) => {
                                        const isSelected = backgroundStyle === bg.id;
                                        return (
                                            <motion.button
                                                key={bg.id}
                                                onClick={() => setBackgroundStyle(bg.id)}
                                                whileHover={{ scale: 1.02, y: -1 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`
                                                    relative h-16 rounded-xl border overflow-hidden flex items-center gap-3 px-3.5 transition-all duration-300
                                                    ${isSelected
                                                        ? 'border-transparent text-white shadow-lg'
                                                        : `border-zinc-200/5 hover:border-zinc-200/20 text-zinc-400 hover:text-zinc-200 ${isDark ? 'bg-white/5' : 'bg-black/5'}`
                                                    }
                                                `}
                                                style={{
                                                    boxShadow: isSelected ? `0 6px 20px -5px ${accent.value}aa` : ''
                                                }}
                                            >
                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="activeBgStyle"
                                                        className="absolute inset-0 rounded-xl z-0"
                                                        style={{ backgroundColor: accent.value }}
                                                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                                    />
                                                )}
                                                
                                                {/* Advanced Background Engine Preview */}
                                                <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0">
                                                    {bg.id === 'scientific' && (
                                                        <div className="absolute inset-0 animate-pan-grid" style={{ 
                                                            backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
                                                            backgroundSize: '8px 8px' 
                                                        }} />
                                                    )}
                                                    {bg.id === 'ai-network' && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-10 h-10 rounded-full border border-current animate-ping opacity-30" />
                                                            <div className="w-6 h-6 rounded-full border border-current animate-pulse" />
                                                        </div>
                                                    )}
                                                    {bg.id === 'particles' && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-1 h-1 bg-current animate-ping animate-pulse" />
                                                            <div className="w-2 h-2 rounded-full border border-current animate-pulse opacity-40" />
                                                        </div>
                                                    )}
                                                    {bg.id === 'grid' && (
                                                        <div className="absolute inset-0 animate-pan-grid" style={{ 
                                                            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px)`, 
                                                            backgroundSize: '12px 12px' 
                                                        }} />
                                                    )}
                                                    {bg.id === 'blueprint' && (
                                                        <div className="absolute inset-0 animate-pan-grid" style={{ 
                                                            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px)`, 
                                                            backgroundSize: '6px 6px' 
                                                        }} />
                                                    )}
                                                    {bg.id === 'algorithm' && (
                                                        <div className="absolute inset-0 flex flex-col justify-center items-center gap-0.5 text-[4px] font-mono leading-none overflow-hidden select-none opacity-40">
                                                            <div className="animate-pulse">10101</div>
                                                            <div className="animate-pulse delay-75">01010</div>
                                                        </div>
                                                    )}
                                                    {bg.id === 'research' && (
                                                        <div className="absolute inset-0 animate-pan-grid" style={{
                                                            backgroundImage: `radial-gradient(circle, ${isDark ? '#fff' : '#000'} 0.8px, transparent 0.8px)`,
                                                            backgroundSize: '10px 10px',
                                                        }} />
                                                    )}
                                                </div>

                                                {/* Active Indicator Scanline */}
                                                {isSelected && (
                                                    <div 
                                                        className="absolute left-0 right-0 h-[1.5px] bg-white/40 animate-scan z-10 pointer-events-none"
                                                        style={{ mixBlendMode: 'overlay' }}
                                                    />
                                                )}

                                                <div className={`relative z-10 p-2 rounded-lg transition-colors ${isSelected ? 'bg-white/20 text-white' : (isDark ? 'bg-black/30 text-zinc-400' : 'bg-white/50 text-zinc-700')}`}>
                                                    {getBgIcon(bg.id)}
                                                </div>
                                                <div className="relative z-10 flex flex-col items-start leading-none gap-1">
                                                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-white' : (isDark ? 'text-zinc-200' : 'text-zinc-800')}`}>{bg.name.split(' ')[0]}</span>
                                                    <span className={`text-[7px] font-mono opacity-65 tracking-normal text-left ${isSelected ? 'text-white/80' : subTextColor}`}>
                                                        {bgDescriptions[bg.id]}
                                                    </span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Accent Picker Grid */}
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest pl-1 font-bold opacity-80">
                                    <Sparkles size={13} className={subTextColor} />
                                    <span className={subTextColor}>System Accent</span>
                                </div>
                                <div className="grid grid-cols-6 gap-2 justify-items-center">
                                    {accents.map((c) => {
                                        const isSelected = accent.value === c.value;
                                        return (
                                            <motion.button
                                                key={c.name}
                                                onClick={() => setAccent(c)}
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="group relative w-9 h-9 rounded-full flex items-center justify-center focus:outline-none"
                                                title={c.name}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-full opacity-10 transition-opacity group-hover:opacity-60"
                                                    style={{ backgroundColor: c.value, boxShadow: `0 0 12px ${c.value}` }}
                                                />
                                                <div
                                                    className={`relative w-7 h-7 rounded-full border overflow-hidden transition-all duration-300 ${isDark ? 'border-white/10' : 'border-black/5'}`}
                                                    style={{ backgroundColor: c.value }}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                                                            <motion.div
                                                                layoutId="activeAccentCheck"
                                                                className="w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
