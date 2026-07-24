"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, FileText, Home, Monitor, Moon, Sun,
    Github, Code, FlaskConical,
    CreditCard, Mail, Printer, Globe, Twitter, Linkedin
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { OneEyeOwl } from "@/components/ui/OneEyeOwl";
import { springSnappy, DURATION, EASE } from "@/lib/motion";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const [toast, setToast] = React.useState(null);
    const toastTimer = React.useRef(null);
    const previousFocus = React.useRef(null);
    const router = useRouter();
    const { setThemeMode } = useTheme();

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        const openMenu = () => setOpen(true);

        document.addEventListener("keydown", down);
        window.addEventListener("open-command-menu", openMenu);

        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-command-menu", openMenu);
        };
    }, []);

    const runCommand = React.useCallback((command) => {
        setOpen(false);
        command();
    }, []);

    const showToast = React.useCallback((message) => {
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 2000);
    }, []);

    React.useEffect(() => () => clearTimeout(toastTimer.current), []);

    // Return focus to whatever was focused before the palette opened
    React.useEffect(() => {
        if (open) {
            previousFocus.current = document.activeElement;
        } else if (previousFocus.current instanceof HTMLElement) {
            previousFocus.current.focus();
            previousFocus.current = null;
        }
    }, [open]);

    // Prevent scrolling when open
    React.useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={springSnappy}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command menu"
                        className="w-full max-w-2xl bg-theme-elevated border border-theme-border rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                    >
                        <Command
                            loop
                            className="bg-transparent w-full"
                            label="Command Menu"
                        >
                            <div className="flex items-center border-b border-theme-border px-4 relative">
                                <Search className="w-5 h-5 text-theme-muted mr-3" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="w-full h-14 bg-transparent outline-none text-theme-text placeholder:text-theme-muted font-mono text-sm"
                                    autoFocus
                                />
                                <div className="absolute right-4 flex items-center gap-1 text-[10px] text-theme-muted font-mono border border-theme-border px-1.5 py-0.5 rounded bg-theme-card">
                                    <span>ESC</span>
                                </div>
                            </div>

                            <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2 scrollbar-none">
                                <Command.Empty className="py-12 text-center text-sm text-theme-muted font-mono">
                                    <div className="inline-block p-3 rounded-full bg-theme-card mb-3">
                                        <Search className="w-6 h-6 opacity-30" />
                                    </div>
                                    <p>No matching results found.</p>
                                </Command.Empty>

                                <Command.Group heading="NAVIGATION" className="text-[10px] text-theme-muted font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Home} onSelect={() => runCommand(() => router.push("/"))}>
                                        /home
                                    </CommandItem>
                                    <CommandItem icon={FileText} onSelect={() => runCommand(() => router.push("/resume"))}>
                                        /resume <span className="opacity-50 ml-2 text-[10px] lowercase">(rirekisho)</span>
                                    </CommandItem>
                                    <CommandItem icon={FileText} onSelect={() => runCommand(() => router.push("/keirekisho"))}>
                                        /keirekisho <span className="opacity-50 ml-2 text-[10px] lowercase">(dossier)</span>
                                    </CommandItem>
                                    <CommandItem icon={CreditCard} onSelect={() => runCommand(() => router.push("/meishi"))}>
                                        /meishi <span className="opacity-50 ml-2 text-[10px] lowercase">(card)</span>
                                    </CommandItem>
                                    <CommandItem icon={Monitor} onSelect={() => runCommand(() => router.push("/guestbook"))}>
                                        /guestbook <span className="opacity-50 ml-2 text-[10px] lowercase">(log)</span>
                                    </CommandItem>
                                    <CommandItem icon={FlaskConical} onSelect={() => runCommand(() => router.push("/#research"))}>
                                        /research
                                    </CommandItem>
                                    <CommandItem icon={Code} onSelect={() => runCommand(() => router.push("/#projects"))}>
                                        /projects
                                    </CommandItem>
                                </Command.Group>

                                <Command.Group heading="QUICK ACTIONS" className="text-[10px] text-theme-muted font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Mail} onSelect={() => runCommand(() => {
                                        navigator.clipboard.writeText("bukhari.453@s.kyushu-u.ac.jp");
                                        showToast("email_copied → clipboard");
                                    })}>
                                        copy_email()
                                    </CommandItem>
                                    <CommandItem icon={Printer} onSelect={() => runCommand(() => window.print())}>
                                        print_page()
                                    </CommandItem>
                                </Command.Group>

                                <Command.Group heading="CONNECT" className="text-[10px] text-theme-muted font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Github} onSelect={() => runCommand(() => window.open('https://github.com/usama-shiranai90', '_blank'))}>
                                        github
                                    </CommandItem>
                                    <CommandItem icon={Linkedin} onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/syed-usama-bukhari-0a6373175', '_blank'))}>
                                        linkedin
                                    </CommandItem>
                                    <CommandItem icon={Globe} onSelect={() => runCommand(() => window.open('https://scholar.google.com/citations?user=n5GPnEIAAAAJ&hl=en', '_blank'))}>
                                        google_scholar
                                    </CommandItem>
                                    <CommandItem icon={Twitter} onSelect={() => runCommand(() => window.open('https://twitter.com/_oneeyeowl', '_blank'))}>
                                        twitter <span className="opacity-50 ml-2 text-[10px] lowercase">(@_oneeyeowl)</span>
                                    </CommandItem>
                                </Command.Group>

                                <Command.Group heading="SYSTEM THEME" className="text-[10px] text-theme-muted font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Sun} onSelect={() => runCommand(() => setThemeMode("light"))}>
                                        set_theme(light)
                                    </CommandItem>
                                    <CommandItem icon={Moon} onSelect={() => runCommand(() => setThemeMode("dark"))}>
                                        set_theme(dark)
                                    </CommandItem>
                                </Command.Group>

                            </Command.List>

                            <div className="border-t border-theme-border p-2 px-4 flex justify-between items-center bg-theme-card/50 text-theme-muted">
                                <div className="flex gap-4 text-[10px] font-mono">
                                    <span className="flex items-center gap-1">
                                        <span className="text-cyan-accent">↑↓</span> navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-cyan-accent">↵</span> select
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center text-[10px] font-mono">
                                    <OneEyeOwl className="w-5 h-5 opacity-50" color="currentColor" />
                                    <span>SYSTEM_V2.5</span>
                                </div>
                            </div>
                        </Command>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 12, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 8, x: "-50%" }}
                    transition={{ duration: DURATION.fast, ease: EASE }}
                    role="status"
                    className="fixed bottom-8 left-1/2 z-[10000] flex items-center gap-2 rounded-lg border border-cyan-accent/30 bg-theme-elevated px-4 py-2 font-mono text-xs text-cyan-accent shadow-glow-accent"
                >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{toast}</span>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
}

function CommandItem({ children, icon: Icon, onSelect }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="group flex items-center px-4 py-3 text-sm text-theme-muted rounded-lg cursor-pointer transition-all duration-200
            aria-selected:bg-cyan-accent/10 aria-selected:text-cyan-accent aria-selected:border-l-2 aria-selected:border-cyan-accent
            data-[selected='true']:bg-cyan-accent/10 data-[selected='true']:text-cyan-accent"
        >
            {Icon && <Icon className="w-4 h-4 mr-3 opacity-50 group-aria-selected:opacity-100 transition-opacity" />}
            <span className="font-mono">{children}</span>
            <div className="ml-auto opacity-0 group-aria-selected:opacity-100 text-cyan-accent/50 text-[10px] uppercase tracking-wider font-bold">
                Run
            </div>
        </Command.Item>
    );
}
