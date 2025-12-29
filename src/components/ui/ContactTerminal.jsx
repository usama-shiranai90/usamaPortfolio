"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Loader2, CheckCircle, AlertCircle, Copy, Mail, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const TerminalLine = ({ text, delay = 0, type = "info", accent }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`flex items-start gap-2 text-xs md:text-sm font-mono mb-1 ${type === 'error' ? 'text-red-500' : ''}`}
        style={type !== 'error' ? { color: accent?.value } : {}}
    >
        <span
            className={type === 'error' ? 'text-red-500' : ''}
            style={type !== 'error' ? { color: `rgba(${accent?.rgb}, 0.5)` } : {}}
        >
            {type === 'error' ? '✖' : '➜'}
        </span>
        <span>{text}</span>
    </motion.div>
);

export function ContactTerminal({ t }) {
    const { accent } = useTheme();
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle, sending, success, error
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const initialLogs = [
            { text: "Initializing contact interface...", type: "info" },
            { text: "Connecting to secure server...", type: "info" },
            { text: "Ready for inquiry transmission.", type: "info" },
        ];
        setLogs(initialLogs);
    }, []);

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formState.name.trim() || formState.name.length < 2) {
            newErrors.name = "Please enter your full name.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formState.email.trim() || !emailRegex.test(formState.email)) {
            newErrors.email = "Please enter a valid academic or professional email.";
            isValid = false;
        }

        if (!formState.message.trim() || formState.message.length < 10) {
            newErrors.message = "Message content is too short (min 10 chars).";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            setStatus("error");
            setLogs(prev => [...prev, { text: "Validation Failed: Corrupt Data Packets Detected.", type: "error" }]);
            setTimeout(() => setStatus("idle"), 2000); // Reset status to allow retry
            return;
        }

        setStatus("sending");
        setErrors({});
        setLogs(prev => [...prev,
        { text: `Encrypting payload [${formState.message.length} bytes]...`, type: "info" },
        { text: "Transmitting data packets...", type: "info" }
        ]);

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setLogs(prev => [...prev,
            { text: "Transmission Acknowledged.", type: "info" },
            { text: "Closing stream...", type: "info" }
            ]);
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 2000);
    };

    const handleInputChange = (field, value) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-zinc-800 backdrop-blur-xl shadow-2xl">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                            <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                            <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                        </div>
                        <div className="h-4 w-[1px] bg-zinc-700 mx-2" />
                        <span className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                            <Terminal size={12} />
                            research_lab/contact_interface
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600">
                        Status: Active
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: Terminal Output & Info */}
                    <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30 flex flex-col justify-between relative overflow-hidden">
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

                        <div className="space-y-6 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold font-heading text-white mb-2">
                                    RESEARCH_<span style={{ color: accent.value }}>INQUIRY</span>
                                </h3>
                                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                    Open for collaboration on AI research, software engineering projects, or academic discussions.
                                </p>
                            </div>

                            <div
                                className="font-mono text-xs space-y-2 p-4 rounded-lg bg-black/40 border shadow-inner min-h-[150px]"
                                style={{ borderColor: `rgba(${accent.rgb}, 0.1)` }}
                            >
                                {logs.map((log, i) => (
                                    <TerminalLine key={i} text={log.text} type={log.type} delay={i * 0.1} accent={accent} />
                                ))}
                                {status === "sending" && (
                                    <motion.div
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="text-indigo-500/50"
                                        style={{ color: `rgba(${accent.rgb}, 0.5)` }}
                                    >
                                        _
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <div className="p-2 rounded-lg bg-zinc-800/50" style={{ color: accent.value }}>
                                        <Mail size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-600">Email Address</span>
                                        <span className="font-sans hover:text-white transition-colors cursor-pointer select-all">bukhari.453 (domain) s.kyushu-u.ac.jp</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <div className="p-2 rounded-lg bg-zinc-800/50" style={{ color: accent.value }}>
                                        <MapPin size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-600">Location</span>
                                        <span className="font-sans">33.5902° N, 130.4017° E</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Interactive Form */}
                    <div className="p-6 md:p-10 flex flex-col justify-center relative bg-gradient-to-b from-zinc-900/10 to-transparent">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-4">
                                <FormInput
                                    label="FULL NAME"
                                    placeholder={t.contact.form.name}
                                    value={formState.name}
                                    onChange={e => handleInputChange('name', e.target.value)}
                                    error={errors.name}
                                    accent={accent}
                                />
                                <FormInput
                                    label="ACADEMIC / WORK EMAIL"
                                    type="email"
                                    placeholder={t.contact.form.email}
                                    value={formState.email}
                                    onChange={e => handleInputChange('email', e.target.value)}
                                    error={errors.email}
                                    accent={accent}
                                />
                                <div className="space-y-2 group">
                                    <div className="flex justify-between items-center">
                                        <label
                                            className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${errors.message ? 'text-red-500' : ''}`}
                                            style={!errors.message ? { color: accent?.value } : {}}
                                        >
                                            MESSAGE CONTENT
                                        </label>
                                        {errors.message && <span className="text-[10px] text-red-500 font-mono tracking-tighter">{errors.message}</span>}
                                    </div>
                                    <textarea
                                        rows={4}
                                        placeholder={t.contact.form.message}
                                        value={formState.message}
                                        onChange={e => handleInputChange('message', e.target.value)}
                                        className={`w-full bg-black/20 border-b px-0 py-2 text-zinc-300 font-sans text-sm placeholder:text-zinc-600 transition-all outline-none resize-none pl-2
                                            ${errors.message ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-zinc-700'}
                                        `}
                                        style={!errors.message ? {
                                            borderColor: status === 'idle' ? undefined : accent?.value,
                                            '--focus-border': `rgba(${accent?.rgb}, 0.5)`,
                                            '--focus-bg': `rgba(${accent?.rgb}, 0.05)`
                                        } : {}}
                                        onFocus={(e) => {
                                            if (!errors.message) {
                                                e.target.style.borderColor = `rgba(${accent?.rgb}, 0.5)`;
                                                e.target.style.backgroundColor = `rgba(${accent?.rgb}, 0.05)`;
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.message) {
                                                e.target.style.borderColor = ''; // Reset to class styles (border-zinc-700)
                                                e.target.style.backgroundColor = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`
                                    w-full py-4 rounded-lg font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group
                                    ${status === 'success'
                                        ? 'bg-green-500/20 text-green-500 border border-green-500/50'
                                        : status === 'error'
                                            ? 'bg-red-500/20 text-red-500 border border-red-500/50 cursor-not-allowed'
                                            : `bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30 hover:bg-[var(--theme-accent)] hover:text-white`}
                                `}
                                style={status === 'idle' ? {
                                    backgroundColor: `rgba(${accent?.rgb}, 0.1)`,
                                    color: accent?.value,
                                    borderColor: `rgba(${accent?.rgb}, 0.3)`,
                                    '--hover-shadow': `0 0 20px rgba(${accent?.rgb}, 0.4)`
                                } : {}}
                                onMouseEnter={(e) => {
                                    if (status === 'idle') {
                                        e.currentTarget.style.backgroundColor = accent?.value;
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.boxShadow = `0 0 20px rgba(${accent?.rgb}, 0.4)`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (status === 'idle') {
                                        e.currentTarget.style.backgroundColor = `rgba(${accent?.rgb}, 0.1)`;
                                        e.currentTarget.style.color = accent?.value;
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> ESTABLISHING_UPLINK...
                                        </>
                                    ) : status === 'success' ? (
                                        <>
                                            <CheckCircle size={16} /> TRANSMISSION_COMPLETE
                                        </>
                                    ) : status === 'error' ? (
                                        <>
                                            <AlertCircle size={16} /> UPLINK_FAILED
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} className="group-hover:translate-x-1 transition-transform" /> SEND_INQUIRY
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Subcomponent for inputs
const FormInput = ({ label, type = "text", placeholder, value, onChange, error, accent }) => (
    <div className="space-y-2 group">
        <div className="flex justify-between items-center">
            <label
                className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${error ? 'text-red-500' : ''}`}
                style={!error ? { color: accent?.value } : {}}
            >
                {label}
            </label>
            {error && <span className="text-[10px] text-red-500 font-mono tracking-tighter">{error}</span>}
        </div>
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-black/20 border-b px-0 py-2 text-zinc-300 font-sans text-sm placeholder:text-zinc-600 transition-all outline-none pl-2
                ${error ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-zinc-700'}
            `}
                style={!error ? {
                    '--focus-border': `rgba(${accent?.rgb}, 0.5)`,
                    '--focus-bg': `rgba(${accent?.rgb}, 0.05)`
                } : {}}
                onFocus={(e) => {
                    if (!error) {
                        e.target.style.borderColor = `rgba(${accent?.rgb}, 0.5)`;
                        e.target.style.backgroundColor = `rgba(${accent?.rgb}, 0.05)`;
                    }
                }}
                onBlur={(e) => {
                    if (!error) {
                        e.target.style.borderColor = '';
                        e.target.style.backgroundColor = '';
                    }
                }}
            />
            <div
                className={`absolute bottom-0 left-0 w-0 h-[1px] group-focus-within:w-full transition-all duration-500 ${error ? 'bg-red-500' : ''}`}
                style={!error ? { backgroundColor: accent?.value } : {}}
            />
        </div>
    </div>
);
