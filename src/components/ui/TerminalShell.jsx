'use client'

import clsx from 'clsx'
import { Terminal } from 'lucide-react'

// Shared terminal window chrome: traffic-light dots, mono path label, status
// readout, optional CRT scanline overlay. Extracted from the duplicated
// headers in ContactTerminal and GuestbookTerminal.
export function TerminalShell({
    path = 'research_lab/terminal',
    status = 'Active',
    scanlines = false,
    className,
    children,
}) {
    return (
        <div
            className={clsx(
                'relative overflow-hidden rounded-2xl border border-theme-border bg-black/80 shadow-2xl backdrop-blur-xl dark:bg-black/80',
                className,
            )}
        >
            <div className="flex items-center justify-between border-b border-theme-border bg-theme-card/50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2" aria-hidden="true">
                        <div className="h-3 w-3 rounded-full bg-theme-text/20" />
                        <div className="h-3 w-3 rounded-full bg-theme-text/20" />
                        <div className="h-3 w-3 rounded-full bg-theme-text/20" />
                    </div>
                    <div className="mx-2 h-4 w-px bg-theme-border" />
                    <span className="flex items-center gap-2 font-mono text-xs text-theme-muted">
                        <Terminal size={12} aria-hidden="true" />
                        {path}
                    </span>
                </div>
                {status ? (
                    <div className="font-mono text-[10px] text-theme-muted">Status: {status}</div>
                ) : null}
            </div>

            <div className="relative">
                {scanlines && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] opacity-[0.03]"
                        style={{ backgroundSize: '100% 2px, 3px 100%' }}
                    />
                )}
                {children}
            </div>
        </div>
    )
}
