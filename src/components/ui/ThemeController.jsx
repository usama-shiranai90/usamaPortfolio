"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Moon, Sun, X, Monitor, Github, Grid, Network, Sparkles, Maximize2, Cpu, Ghost, Snowflake, Disc, BookOpen, Terminal, BrainCircuit, Ruler, Binary, Microscope, Languages } from 'lucide-react';
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
                        ? 'bg-zinc-900 border-cyan-accent text-cyan-accent rotate-90'
                        : isDark ? 'bg-zinc-900/60 border-white/10 text-white/70 hover:bg-zinc-800 hover:border-white/30 hover:text-white'
                            : 'bg-white/60 border-black/10 text-zinc-700 hover:bg-white hover:text-black'}
                `}
                style={{
                    boxShadow: isOpen ? `0 0 20px -5px ${accent.value}` : '0 10px 30px -10px rgba(0,0,0,0.1)'
                }}
            >
                {isOpen ? <X size={20} /> : <Cpu size={22} />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
                        className={`
                            pointer-events-auto
                            ${panelBg} p-5 rounded-2xl shadow-2xl backdrop-blur-2xl border
                            w-80 max-w-[calc(100vw-2rem)] origin-top-right h-auto max-h-[80vh] overflow-y-auto
                            scrollbar-none
                        `}
                    >
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

                        <div className="space-y-8">

                            {/* Language Switcher */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest pl-1 font-semibold opacity-80">
                                    <Languages size={14} className={subTextColor} />
                                    <span className={subTextColor}>Language Region</span>
                                </div>
                                <div className={`flex items-center gap-2 p-1 rounded-xl border ${borderColor} ${isDark ? 'bg-black/20' : 'bg-black/5'}`}>
                                    {['en', 'jp'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => setLanguage(lang)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${language === lang
                                                ? `${isDark ? 'bg-zinc-800 text-white shadow-lg shadow-black/20' : 'bg-white text-black shadow-sm'} `
                                                : `${subTextColor} opacity-50 hover:opacity-100 hover:bg-white/5`
                                                }`}
                                        >
                                            <span className="text-xs uppercase tracking-wider">{lang === 'en' ? 'English' : '日本語'}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Interface Mode Toggle - Horizontal Scroll */}
                            <div className="space-y-3">
                                <span className={`text-[10px] font-mono uppercase tracking-widest pl-1 font-semibold ${subTextColor}`}>Interface Mode</span>
                                <div className="relative group/scroll -mx-2">
                                    {/* Gradient Masks */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-r ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />
                                    <div className={`absolute right-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-l ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />

                                    <DraggableScroll
                                        className="flex gap-2 overflow-x-auto pb-4 -mb-4 px-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {themeOptions.map(({ id, icon: Icon, label }) => (
                                            <motion.button
                                                key={id}
                                                // Prevent click if dragging happens inside the wrapper logic, 
                                                // but for simplicity we rely on 'pointer-events-none' class toggle if needed, or just standard behavior.
                                                // React events fire on MouseUp. If we dragged, we don't want to trigger.
                                                // But usually a small drag is okay.
                                                onClick={() => setThemeMode(id)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`
                                                    group flex flex-col items-center justify-center gap-2 py-3 px-4 min-w-[70px] rounded-xl text-[10px] font-medium transition-all border
                                                    ${themeMode === id
                                                        ? `${isDark ? 'bg-white text-black border-transparent' : 'bg-black text-white border-transparent'} shadow-lg scale-100`
                                                        : `${subTextColor} hover:${textColor} border-transparent ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
                                                `}
                                            >
                                                <Icon size={18} className={themeMode === id ? 'fill-current' : ''} />
                                                <span className="capitalize whitespace-nowrap">{label}</span>
                                            </motion.button>
                                        ))}
                                    </DraggableScroll>
                                </div>
                            </div>

                            {/* Background Style - Horizontal Scroll */}
                            <div className="space-y-3">
                                <span className={`text-[10px] font-mono uppercase tracking-widest pl-1 font-semibold ${subTextColor}`}>Background Engine</span>
                                <div className="relative group/scroll -mx-2">
                                    {/* Gradient Masks */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-r ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />
                                    <div className={`absolute right-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-l ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />

                                    <DraggableScroll
                                        className="flex gap-3 overflow-x-auto pb-6 -mb-6 px-4 snap-x [&::-webkit-scrollbar]:hidden"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {backgroundStyles.map((bg) => (
                                            <motion.button
                                                key={bg.id}
                                                onClick={() => setBackgroundStyle(bg.id)}
                                                whileHover={{ y: -2, scale: 1.02 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`
                                                    relative min-w-[100px] h-24 rounded-xl border transition-all duration-300 snap-start flex-shrink-0 overflow-hidden
                                                    ${backgroundStyle === bg.id
                                                        ? 'border-opacity-100 shadow-lg scale-100 ring-1'
                                                        : `border-transparent scale-95 opacity-70 hover:opacity-100 hover:scale-[0.98] ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
                                                `}
                                                style={{
                                                    borderColor: backgroundStyle === bg.id ? accent.value : 'transparent',
                                                    backgroundColor: backgroundStyle === bg.id ? 'transparent' : '',
                                                    ringColor: backgroundStyle === bg.id ? accent.value : 'transparent',
                                                    boxShadow: backgroundStyle === bg.id ? `0 0 20px -10px ${accent.value}` : ''
                                                }}
                                            >
                                                {/* Mini Preview Background */}
                                                <div className={`absolute inset-0 ${cardBg}`}>
                                                    {bg.id === 'scientific' && <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '8px 8px' }} />}
                                                    {bg.id === 'ai-network' && (
                                                        <div className="absolute inset-0 opacity-20" style={{
                                                            backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1.5px, transparent 1.5px)`,
                                                            backgroundSize: '15px 15px'
                                                        }} />
                                                    )}
                                                    {bg.id === 'particles' && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                            <div className={`w-1 h-1 rounded-full shadow-[0_0_10px_currentColor,20px_-10px_0_currentColor,-15px_15px_0_currentColor] ${textColor}`} />
                                                        </div>
                                                    )}
                                                    {bg.id === 'grid' && (
                                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                                                    )}
                                                    {bg.id === 'blueprint' && (
                                                        <div className="absolute inset-0 opacity-15" style={{
                                                            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 0.5px, transparent 0.5px)`,
                                                            backgroundSize: '6px 6px'
                                                        }} />
                                                    )}
                                                    {bg.id === 'algorithm' && (
                                                        <div className="absolute inset-0 opacity-10 flex flex-col justify-center items-center gap-0.5 text-[5px] font-mono leading-none overflow-hidden select-none">
                                                            <div>10110</div>
                                                            <div>01001</div>
                                                            <div>11100</div>
                                                        </div>
                                                    )}
                                                    {bg.id === 'research' && (
                                                        <div className="absolute inset-0 opacity-20" style={{
                                                            backgroundImage: `radial-gradient(circle, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
                                                            backgroundSize: '12px 12px',
                                                            maskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
                                                        }} />
                                                    )}
                                                </div>

                                                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2 p-2">
                                                    <div className={`p-1.5 rounded-full transition-colors ${backgroundStyle === bg.id ? (isDark ? 'bg-white text-black' : 'bg-black text-white') : (isDark ? 'bg-black/40 text-white' : 'bg-white/60 text-black')}`}>
                                                        {getBgIcon(bg.id)}
                                                    </div>
                                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${textColor}`}>{bg.name.split(' ')[0]}</span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </DraggableScroll>
                                </div>
                            </div>

                            {/* Accent Picker - Horizontal Scroll */}
                            <div className="space-y-3">
                                <span className={`text-[10px] font-mono uppercase tracking-widest pl-1 font-semibold ${subTextColor}`}>System Accent</span>
                                <div className="relative -mx-2">
                                    {/* Gradient Masks */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-r ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />
                                    <div className={`absolute right-0 top-0 bottom-0 w-4 z-10 bg-gradient-to-l ${isDark ? 'from-[#0a0a0a]/90' : 'from-white/90'} to-transparent pointer-events-none`} />

                                    <DraggableScroll
                                        className="flex gap-3 overflow-x-auto pb-4 -mb-4 px-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {accents.map((c) => (
                                            <motion.button
                                                key={c.name}
                                                onClick={() => setAccent(c)}
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="group relative min-w-[40px] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 focus:outline-none"
                                                title={c.name}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-full opacity-20 transition-opacity group-hover:opacity-100"
                                                    style={{ backgroundColor: c.value, boxShadow: `0 0 10px ${c.value}` }}
                                                />
                                                <div
                                                    className={`relative w-full h-full rounded-full border overflow-hidden transition-all duration-300 ${isDark ? 'border-white/10' : 'border-black/5'}`}
                                                    style={{ backgroundColor: c.value }}
                                                >
                                                    {accent.value === c.value && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <motion.div
                                                                layoutId="activeAccentCheck"
                                                                className="w-1.5 h-1.5 bg-white rounded-full shadow-lg"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.button>
                                        ))}
                                    </DraggableScroll>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
