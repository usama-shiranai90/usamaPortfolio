"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Server, User, Clock, Hash, AlertTriangle } from "lucide-react";

export function GuestbookTerminal() {
    const [entries, setEntries] = useState([
        { id: 1, name: "Dr. Satoshi", message: "Impressive research on neural architecture!", date: "2024-12-28 14:20", type: "remote" },
        { id: 2, name: "Alice_Dev", message: "Love the terminal aesthetics.", date: "2024-12-29 09:15", type: "remote" },
        { id: 3, name: "Guest_User", message: "Looking forward to more articles.", date: "2024-12-30 01:05", type: "remote" },
    ]);
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [stage, setStage] = useState("name"); // 'name' | 'message'
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Scroll to bottom on new entry
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [entries, stage]);

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
            // Submit Message
            const newEntry = {
                id: Date.now(),
                name: name || "Anonymous",
                message: input.trim(),
                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                type: "local"
            };

            setIsTyping(true);

            // Artificial delay for "Network Transmission"
            setTimeout(() => {
                setEntries(prev => [...prev, newEntry]);
                setInput("");
                setName("");
                setStage("name");
                setIsTyping(false);
            }, 800);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-mono text-sm md:text-base">
            <div className="relative rounded-t-xl bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-zinc-500 text-xs">
                        <Server size={12} />
                        <span>/var/log/visitors.log</span>
                    </div>
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
                ref={scrollRef}
                className="h-[500px] bg-black/90 border-x border-b border-zinc-800 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent backdrop-blur-sm relative"
            >
                {/* Background Noise/Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

                <div className="space-y-4 relative z-10">
                    {/* Access Banner */}
                    <div className="mb-8 p-4 border-l-2 border-cyan-500 bg-cyan-950/10 text-cyan-400 text-xs font-mono">
                        <p>ACCESS_LEVEL: PUBLIC</p>
                        <p>PROTOCOL: GUEST_SIGNATURE_V2</p>
                        <p>ENCRYPTION: NONE</p>
                        <p className="mt-2 text-zinc-500">Welcome to the visitor log. Please leave your digital signature for the archives.</p>
                    </div>

                    {/* Entries */}
                    <AnimatePresence>
                        {entries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group relative pl-4 border-l border-zinc-800 hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="flex flex-wrap items-baseline gap-x-3 text-xs text-zinc-500 mb-1">
                                    <span className="text-cyan-600/70">[{entry.date}]</span>
                                    <span className={`font-bold ${entry.type === 'local' ? 'text-green-500' : 'text-purple-400'}`}>
                                        {entry.type === 'local' ? 'root@guest' : 'remote@user'}
                                    </span>
                                    <span className="opacity-50 text-[10px]">{entry.id.toString().slice(-4)}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-zinc-600 select-none">{'>'}</span>
                                    <div className="flex flex-col">
                                        <span className="text-cyan-200 font-bold text-sm mb-0.5">{entry.name}</span>
                                        <div className="text-zinc-300">
                                            {/* Only animate local (new) entries for effect, remote ones static for performance/UX */}
                                            {entry.type === 'local' ? <Typewriter text={entry.message} /> : entry.message}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Current Input Line */}
                    <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center gap-3 group">
                        <span className="text-green-500 animate-pulse">➜</span>
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
                                        placeholder="Write signature... (Press Enter)"
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
                        <div className="text-xs text-green-500 pl-6 flex items-center gap-2 font-mono">
                            <span>{getProgressBar(progress)}</span>
                            <span className="animate-pulse">UPLOADING_BLOCK...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GuestbookTerminal;
