"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock } from "lucide-react";
import { TerminalShell } from "@/components/ui/TerminalShell";
import { Hanko } from './Hanko';

// Helper for progress bar
const getProgressBar = (progress) => {
    const total = 20;
    const filled = Math.floor((progress / 100) * total);
    return `[${'='.repeat(filled)}${' '.repeat(total - filled)}]`;
};

// Deterministic tilt from the entry id so SSR and client render the same
// rotation (Math.random() here would cause a hydration mismatch).
const emaTilt = (id) => {
    const s = String(id);
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return ((Math.abs(h) % 100) / 100 - 0.5) * 5;
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative">
                            <Hanko text="受領" color="#d00" animated className="text-9xl opacity-90" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 rounded-lg px-4 py-2 text-red-600 font-black text-2xl uppercase tracking-widest rotate-[-5deg]">
                                RECEIVED
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <TerminalShell path="/var/log/visitors.log" status="LIVE" scanlines>
                <div
                    ref={terminalBodyRef}
                    className="h-[600px] bg-black/90 overflow-y-auto scrollbar-thin backdrop-blur-sm relative"
                >
                    <div className="relative z-10 p-6">
                        <div className="mb-8 p-4 border-l-2 border-cyan-accent bg-cyan-accent/10 text-cyan-accent text-xs font-mono">
                            <p>ACCESS_LEVEL: PUBLIC</p>
                            <p>PROTOCOL: GUEST_EMA_V1</p>
                            <p>ENCRYPTION: NONE</p>
                            <p className="mt-2 text-theme-muted">Leave your digital wish on the Ema data-wall.</p>
                        </div>

                        {/* Ema Wall Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 px-4 py-8">
                            <AnimatePresence>
                                {entries.map((entry) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 50, rotate: emaTilt(entry.id) }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative group"
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
                        <div className="mt-8 pt-4 flex items-center gap-3 group bg-black/50 p-4 sticky bottom-0 rounded-xl backdrop-blur-md border border-theme-border">
                            <div className="flex-1 flex flex-col justify-center">
                                {stage === 'name' ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-cyan-accent text-xs uppercase tracking-wider whitespace-nowrap bg-cyan-accent/10 px-2 py-0.5 rounded">Identity</span>
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
                                        <span className="text-zinc-500 text-xs whitespace-nowrap bg-white/5 px-2 py-0.5 rounded border border-theme-border">{name}</span>
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
                                className="p-2 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
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
            </TerminalShell>
        </div>
    );
}

export default GuestbookTerminal;
