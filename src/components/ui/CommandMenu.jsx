"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, FileText, Home, Monitor, Moon, Sun, Laptop,
    Github, Code, FlaskConical, Command as CommandIcon,
    CreditCard, Mail, Printer, Globe, Twitter, Linkedin
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { projects, publications } from "@/utils/data";
import { OneEyeOwl } from "@/components/ui/OneEyeOwl";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { setThemeMode } = useTheme();

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
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

    // Prevent scrolling when open
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [open]);

    return (
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
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
                    >
                        <Command
                            loop
                            className="bg-transparent w-full"
                            label="Command Menu"
                        >
                            <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-4 relative">
                                <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mr-3" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="w-full h-14 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-mono text-sm"
                                    autoFocus
                                />
                                <div className="absolute right-4 flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                                    <span>ESC</span>
                                </div>
                            </div>

                            <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-2 scrollbar-none">
                                <Command.Empty className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                                    <div className="inline-block p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-3">
                                        <Search className="w-6 h-6 opacity-30" />
                                    </div>
                                    <p>No matching results found.</p>
                                </Command.Empty>

                                <Command.Group heading="NAVIGATION" className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2 mt-2">
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

                                <Command.Group heading="QUICK ACTIONS" className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Mail} onSelect={() => runCommand(() => {
                                        navigator.clipboard.writeText("bukhari.453@s.kyushu-u.ac.jp");
                                        // Ideally show a toast here, but simple alert or silent copy is fine for now
                                    })}>
                                        copy_email()
                                    </CommandItem>
                                    <CommandItem icon={Printer} onSelect={() => runCommand(() => window.print())}>
                                        print_page()
                                    </CommandItem>
                                </Command.Group>

                                <Command.Group heading="CONNECT" className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2 mt-2">
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

                                <Command.Group heading="SYSTEM THEME" className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-widest mb-2 px-2 mt-2">
                                    <CommandItem icon={Sun} onSelect={() => runCommand(() => setThemeMode("light"))}>
                                        set_theme(light)
                                    </CommandItem>
                                    <CommandItem icon={Moon} onSelect={() => runCommand(() => setThemeMode("dark"))}>
                                        set_theme(dark)
                                    </CommandItem>
                                </Command.Group>

                            </Command.List>

                            <div className="border-t border-zinc-200 dark:border-zinc-800 p-2 px-4 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 text-zinc-400 dark:text-zinc-600">
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
    );
}

function CommandItem({ children, icon: Icon, onSelect }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="group flex items-center px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 rounded-lg cursor-pointer transition-all duration-200 
            aria-selected:bg-cyan-500/10 aria-selected:text-cyan-600 dark:aria-selected:text-cyan-400 aria-selected:border-l-2 aria-selected:border-cyan-500
            data-[selected='true']:bg-cyan-500/10 data-[selected='true']:text-cyan-600 dark:data-[selected='true']:text-cyan-400"
        >
            {Icon && <Icon className="w-4 h-4 mr-3 opacity-50 group-aria-selected:opacity-100 transition-opacity" />}
            <span className="font-mono">{children}</span>
            <div className="ml-auto opacity-0 group-aria-selected:opacity-100 text-cyan-500/50 text-[10px] uppercase tracking-wider font-bold">
                Run
            </div>
        </Command.Item>
    );
}
