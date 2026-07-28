"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from 'p/images/logo.png';
import { Command, Menu, X, Github, Linkedin, Twitter, Bookmark, Globe, FileText, CreditCard, Send, Languages, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const routes = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Research', href: '/research' },
    { label: 'Resume', href: '/resume' },
    { label: 'Guestbook', href: '/guestbook' },
    { label: 'Meishi', href: '/meishi' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/usama-shiranai90', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/syed-usama-bukhari-0a6373175', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/_oneeyeowl', label: 'Twitter' },
    { icon: Bookmark, href: 'https://medium.com/@syedusama78', label: 'Medium' },
    { icon: Globe, href: 'https://scholar.google.com/citations?user=n5GPnEIAAAAJ&hl=en', label: 'Scholar' },
    { icon: FileText, href: '/resume', label: 'Resume' },
    { icon: CreditCard, href: '/meishi', label: 'Meishi' },
    { icon: Send, href: 'mailto:syedusamahussain@addo.ai', label: 'Email' },
];

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { themeMode, setThemeMode, language, setLanguage } = useTheme();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <>
            <div className="fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 bg-theme-bg/85 backdrop-blur-md border-b border-theme-border lg:hidden transition-colors duration-300">
                <Link href="/" aria-label="Home" className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-theme-card/60 transition-colors">
                    <span
                        className="block h-8 w-8 bg-cyan-accent"
                        style={{
                            maskImage: `url(${logo.src})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${logo.src})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                        }}
                    />
                </Link>

                <div className="flex items-center gap-2">
                    {/* Quick Language Toggle on Mobile Top Bar */}
                    <button
                        type="button"
                        aria-label="Switch Language"
                        onClick={() => setLanguage(language === 'en' ? 'jp' : 'en')}
                        className="flex h-9 px-2.5 items-center justify-center gap-1 rounded-lg border border-theme-border bg-theme-card text-xs font-mono font-bold text-cyan-accent transition-colors hover:border-cyan-accent/50"
                    >
                        <Languages size={13} />
                        <span>{language.toUpperCase()}</span>
                    </button>

                    <button
                        type="button"
                        aria-label="Open command menu"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-command-menu'))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border bg-theme-card text-theme-muted transition-colors hover:border-cyan-accent/50 hover:text-cyan-accent"
                    >
                        <Command size={16} strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        aria-label="Open navigation menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-theme-border bg-theme-card text-theme-muted transition-colors hover:border-cyan-accent/50 hover:text-cyan-accent"
                    >
                        <Menu size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                />
            )}

            {/* Drawer */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!open}
                style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
                className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-theme-border bg-theme-bg/95 backdrop-blur-xl p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
                    open ? '' : 'pointer-events-none'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-theme-border pb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-accent font-bold">
                            Menu ・ メニュー
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Quick Theme Toggle */}
                        <button
                            type="button"
                            aria-label="Toggle dark/light mode"
                            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-theme-border text-theme-muted hover:text-cyan-accent hover:border-cyan-accent/50 transition-colors"
                        >
                            {themeMode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                        </button>
                        <button
                            type="button"
                            aria-label="Close navigation menu"
                            tabIndex={open ? 0 : -1}
                            onClick={() => setOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-theme-border text-theme-muted transition-colors hover:border-cyan-accent/50 hover:text-cyan-accent"
                        >
                            <X size={16} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <ul className="mt-4 flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-none pr-1">
                    {routes.map((route, i) => {
                        const isActive = pathname === route.href;
                        return (
                            <li key={route.href}>
                                <Link
                                    href={route.href}
                                    onClick={() => setOpen(false)}
                                    tabIndex={open ? 0 : -1}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex items-center justify-between rounded-xl px-3.5 py-3 transition-all ${
                                        isActive
                                            ? 'bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 font-bold shadow-sm'
                                            : 'text-theme-text hover:bg-theme-card hover:text-cyan-accent border border-transparent'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[10px] text-cyan-accent/70">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="font-heading text-lg tracking-tight">{route.label}</span>
                                    </div>
                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shadow-glow-accent" />}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Drawer Footer: Social Links */}
                <div className="mt-auto pt-4 border-t border-theme-border">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-theme-muted mb-2.5">
                        Connect & Profiles
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {socialLinks.map((link) => {
                            const isInternal = link.href.startsWith('/');
                            const Icon = link.icon;
                            if (isInternal) {
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-theme-card/60 border border-theme-border text-theme-muted hover:text-cyan-accent hover:border-cyan-accent/50 transition-all"
                                        title={link.label}
                                    >
                                        <Icon size={16} />
                                        <span className="text-[9px] font-mono mt-1 truncate max-w-full">{link.label}</span>
                                    </Link>
                                );
                            }
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-theme-card/60 border border-theme-border text-theme-muted hover:text-cyan-accent hover:border-cyan-accent/50 transition-all"
                                    title={link.label}
                                >
                                    <Icon size={16} />
                                    <span className="text-[9px] font-mono mt-1 truncate max-w-full">{link.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

