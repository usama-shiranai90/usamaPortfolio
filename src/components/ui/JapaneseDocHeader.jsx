"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, FileText, Printer, Download, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { MEISHI_DATA } from "@/lib/japanese-docs-data";

export function JapaneseDocHeader({
    activeDoc = "meishi",
    onPrint = null,
    onDownloadVCard = null,
    onCopyEmail = null,
    onShare = null,
    copied = false,
}) {
    const pathname = usePathname();

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 px-4 flex justify-center items-center print:hidden">
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-theme-card/80 backdrop-blur-md border border-theme-border rounded-2xl shadow-xl w-full">
                {/* Document Type Selector Tabs */}
                <div className="flex items-center gap-2 bg-theme-bg/60 p-1 rounded-xl border border-theme-text/5 w-full sm:w-auto">
                    <Link
                        href="/meishi"
                        className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                            activeDoc === "meishi"
                                ? "bg-cyan-accent text-theme-bg font-bold shadow-glow-accent"
                                : "text-theme-text/70 hover:text-theme-text hover:bg-theme-text/5"
                        }`}
                    >
                        <CreditCard size={15} />
                        <span>Meishi (名刺)</span>
                    </Link>

                    <Link
                        href="/keirekisho"
                        className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                            activeDoc === "keirekisho"
                                ? "bg-cyan-accent text-theme-bg font-bold shadow-glow-accent"
                                : "text-theme-text/70 hover:text-theme-text hover:bg-theme-text/5"
                        }`}
                    >
                        <FileText size={15} />
                        <span>Keirekisho (職務経歴書)</span>
                    </Link>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {activeDoc === "keirekisho" && onPrint && (
                        <button
                            onClick={onPrint}
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-accent text-theme-bg rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-glow-accent"
                        >
                            <Printer size={14} />
                            <span>Print / Save PDF</span>
                        </button>
                    )}

                    {activeDoc === "meishi" && (
                        <>
                            {onDownloadVCard && (
                                <button
                                    onClick={onDownloadVCard}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-cyan-accent text-theme-bg rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-glow-accent"
                                >
                                    <Download size={14} />
                                    <span>vCard</span>
                                </button>
                            )}

                            {onCopyEmail && (
                                <button
                                    onClick={onCopyEmail}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-theme-bg border border-theme-border text-theme-text rounded-lg font-mono text-xs hover:border-cyan-accent/50 transition-colors"
                                >
                                    {copied ? (
                                        <Check size={14} className="text-green-500" />
                                    ) : (
                                        <Copy size={14} className="text-theme-text/60" />
                                    )}
                                    <span>{copied ? "Copied" : "Email"}</span>
                                </button>
                            )}

                            {onShare && (
                                <button
                                    onClick={onShare}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-theme-bg border border-theme-border text-theme-text rounded-lg font-mono text-xs hover:border-cyan-accent/50 transition-colors"
                                >
                                    <Share2 size={14} className="text-theme-text/60" />
                                    <span>Share</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
