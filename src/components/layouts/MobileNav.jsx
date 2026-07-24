"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from 'p/images/logo.png';
import { Command, Menu, X } from 'lucide-react';

const routes = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Research', href: '/research' },
    { label: 'Articles', href: '/articles' },
    { label: 'Resume', href: '/resume' },
    { label: 'Guestbook', href: '/guestbook' },
    { label: 'Meishi', href: '/meishi' },
];

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

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
            <div className="fixed top-0 inset-x-0 z-40 h-14 flex items-center justify-between px-4 bg-theme-bg/80 backdrop-blur border-b border-theme-border lg:hidden">
                <Link href="/" aria-label="Home" className="flex h-9 w-9 items-center justify-center">
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
                    className="fixed inset-0 z-50 bg-theme-bg/60 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Drawer — inline transform with a direct value so positioning is
                applied unconditionally (Tailwind's translate-x-* var indirection
                can leave the transform stale). */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!open}
                style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
                className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col border-l border-theme-border bg-theme-bg p-6 shadow-2xl lg:hidden ${
                    open ? '' : 'pointer-events-none'
                }`}
            >
                <div className="flex items-center justify-between border-b border-theme-border pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-theme-muted">
                        Menu ・ メニュー
                    </span>
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

                <ul className="mt-6 flex flex-col gap-1 overflow-y-auto scrollbar-none">
                    {routes.map((route, i) => {
                        const isActive = pathname === route.href;
                        return (
                            <li key={route.href}>
                                <Link
                                    href={route.href}
                                    onClick={() => setOpen(false)}
                                    tabIndex={open ? 0 : -1}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex items-baseline gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                                        isActive
                                            ? 'bg-cyan-accent/10 text-cyan-accent'
                                            : 'text-theme-text hover:bg-theme-card hover:text-cyan-accent'
                                    }`}
                                >
                                    <span className="font-mono text-[10px] text-cyan-accent/70">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-heading text-lg tracking-tight">{route.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
