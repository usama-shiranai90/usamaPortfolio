"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Server, User, Clock, Hash, AlertTriangle, Loader2 } from "lucide-react";
import { Hanko } from './Hanko';

// Helper Component for Typed Text
const Typewriter = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayedText}</span>;
};

// Helper for progress bar
const getProgressBar = (progress) => {
    const total = 20;
    const filled = Math.floor((progress / 100) * total);
    return `[${'='.repeat(filled)}${' '.repeat(total - filled)}]`;
};

export function GuestbookTerminal() {
    const [entries, setEntries] = useState([
        { id: 1, name: "Dr. Satoshi", message: "Impressive research on neural architecture!", date: "2024-12-28 14:20", type: "remote" },
        { id: 2, name: "Alice_Dev", message: "Love the Ema style guestbook!", date: "2024-12-29 09:15", type: "remote" },
        { id: 3, name: "Guest_User", message: "Wishing you success in your research.", date: "2024-12-30 01:05", type: "remote" },
    ]);
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [stage, setStage] = useState("name"); // 'name' | 'message'
    const [isTyping, setIsTyping] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("idle"); // 'idle' | 'success'
    const terminalBodyRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (!input.trim()) return;

        if (stage === "name") {
            setName(input.trim());
            setInput("");
            setStage("message");
        } else {
            const newEntry = {
                id: Date.now(),
                name: name || "Anonymous",
                message: input.trim(),
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                type: "local"
            };

            setIsTyping(true);
            setProgress(0);

            // Simulate Upload
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 80);

            setTimeout(() => {
                setEntries(prev => [...prev, newEntry]);
                setInput("");
                setName("");
                setStage("name");
                setIsTyping(false);
                setProgress(0);
                setStatus("success");

                // Reset success status after animation
                setTimeout(() => setStatus("idle"), 2000);

            }, 800);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base relative">
            {/* Success Stamp Overlay */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 2, rotate: -30 }}
                        animate={{ opacity: 1, scale: 1, rotate: -15 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative">
                            <Hanko text="受領" className="text-9xl text-red-600 mix-blend-multiply opacity-90" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 rounded-lg px-4 py-2 text-red-600 font-black text-2xl uppercase tracking-widest rotate-[-5deg]">
                                RECEIVED
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative rounded-t-xl bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between shadow-2xl">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <Server size={12} />
                    <span>/var/log/visitors.log</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-500/70">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    LIVE_CONNECTION
                </div>
            </div>

            <div
                ref={terminalBodyRef}
                className="h-[600px] bg-black/90 border-x border-b border-zinc-800 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent backdrop-blur-sm relative"
            >
                {/* Background Noise */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

                <div className="relative z-10 p-6">
                    <div className="mb-8 p-4 border-l-2 border-cyan-500 bg-cyan-950/10 text-cyan-400 text-xs font-mono">
                        <p>ACCESS_LEVEL: PUBLIC</p>
                        <p>PROTOCOL: GUEST_EMA_V1</p>
                        <p>ENCRYPTION: NONE</p>
                        <p className="mt-2 text-zinc-500">Leave your digital wish on the Ema data-wall.</p>
                    </div>

                    {/* Ema Wall Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 px-4 py-8">
                        <AnimatePresence>
                            {entries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 50, rotate: (Math.random() - 0.5) * 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative group perspective-container"
                                >
                                    {/* String holding the Ema */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-red-800/40 z-0 after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-zinc-800/50 after:rounded-full" />

                                    {/* Ema Tablet Body */}
                                    <div className="relative z-10 bg-[#f4e4bc] text-zinc-900 px-6 py-8 rounded-t-3xl rounded-b-md shadow-lg border-4 border-[#8B4513] overflow-hidden transform transition-transform duration-500 hover:rotate-2 hover:scale-105 origin-top min-h-[160px] flex flex-col items-center text-center">

                                        {/* Wood Texture Overlay (CSS Pattern) */}
                                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:8px_8px]"></div>

                                        {/* Content */}
                                        <div className="relative z-20 w-full flex-1 flex flex-col">
                                            <div className="text-[10px] font-bold text-[#8B4513] uppercase tracking-widest mb-3 border-b border-[#8B4513]/20 pb-2 w-full truncate">
                                                {entry.name || 'Anonymous'}
                                            </div>

                                            <p className="text-sm font-medium leading-relaxed font-serif text-zinc-900 line-clamp-4 flex-1 flex items-center justify-center">
                                                "{entry.message}"
                                            </p>

                                            <div className="pt-4 text-[9px] text-[#8B4513]/60 font-mono w-full text-right">
                                                {entry.date}
                                            </div>
                                        </div>

                                        {/* Decorative Stamp */}
                                        <div className="absolute bottom-2 left-2 opacity-50 rotate-[-15deg]">
                                            <div className="border border-red-700 text-red-700 text-[10px] font-bold px-1 rounded-sm">奉納</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Input Line */}
                    <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center gap-3 group bg-black/50 p-4 sticky bottom-0 rounded-xl backdrop-blur-md border border-zinc-800">
                        <div className="flex-1 flex flex-col justify-center">
                            {stage === 'name' ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-cyan-500 text-xs uppercase tracking-wider whitespace-nowrap bg-cyan-950/30 px-2 py-0.5 rounded">Identity</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        placeholder="Identify yourself..."
                                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-zinc-700 font-mono"
                                        autoComplete="off"
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-500 text-xs whitespace-nowrap bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">{name}</span>
                                    <span className="text-purple-500 text-xs uppercase tracking-wider whitespace-nowrap bg-purple-950/30 px-2 py-0.5 rounded">Message</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        placeholder="Write your wish... (Press Enter)"
                                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder-zinc-700 font-mono"
                                        autoComplete="off"
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!input.trim() || isTyping}
                            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            {isTyping ? <Clock size={16} className="animate-spin" /> : <Send size={16} />}
                        </button>
                    </div>

                    {isTyping && (
                        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-full border border-green-900 text-xs text-green-500 flex items-center gap-2 font-mono z-50">
                            <span>{getProgressBar(progress)}</span>
                            <span className="animate-pulse">HANGING_EMA...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GuestbookTerminal;
