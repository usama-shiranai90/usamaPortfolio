'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Meishi } from '@/components/ui/Meishi';
import { useTheme } from '@/context/ThemeContext';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check, Camera, RefreshCw, Sparkles, Cpu } from 'lucide-react';
import { Omikuji } from '@/components/ui/Omikuji';
import { JapaneseDocHeader } from '@/components/ui/JapaneseDocHeader';
import { MEISHI_DATA } from '@/lib/japanese-docs-data';

export default function MeishiPageClient() {
    const { accent } = useTheme();
    const [copied, setCopied] = useState(false);
    const [styleMode, setStyleMode] = useState('washi'); // 'washi' | 'cyber'
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(MEISHI_DATA.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Syed Usama Bukhari - Digital Business Card',
                    text: 'Connect with Syed Usama Bukhari',
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            handleCopyEmail();
        }
    };

    const generateVCard = () => {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${MEISHI_DATA.name}
N:${MEISHI_DATA.name.split(' ').slice(1).join(' ')};${MEISHI_DATA.name.split(' ')[0]};;;
ORG:${MEISHI_DATA.company};${MEISHI_DATA.department}
TITLE:${MEISHI_DATA.title}
TEL;TYPE=CELL:${MEISHI_DATA.phone}
EMAIL:${MEISHI_DATA.email}
URL:${MEISHI_DATA.website}
ADR;TYPE=WORK:;;${MEISHI_DATA.addressEn.split(',')[0]};${MEISHI_DATA.addressEn.split(',')[2] || "Fukuoka"};;${MEISHI_DATA.postalCode};Japan
END:VCARD`;

        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contact.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadImage = async () => {
        const node = document.getElementById('meishi-capture-node');
        if (!node) return;

        try {
            const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 3 });
            const link = document.createElement('a');
            link.download = `meishi-${styleMode}-${isFlipped ? 'back' : 'front'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen text-[var(--theme-text)] w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 py-8 md:py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(${accent.value} 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Shared Centralized Document Header */}
            <JapaneseDocHeader
                activeDoc="meishi"
                onDownloadVCard={generateVCard}
                onCopyEmail={handleCopyEmail}
                onShare={handleShare}
                copied={copied}
            />

            <Container className="flex-1 w-full flex flex-col items-center justify-center text-center relative z-10">

                {/* Header Section */}
                <div className="text-center mb-8 space-y-3 max-w-2xl mx-auto">
                    <span
                        className="text-xs font-bold tracking-[0.3em] uppercase block mb-1 transition-colors duration-300"
                        style={{ color: accent.value }}
                    >Digital Identity</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        Meishi <span className="text-theme-muted font-light">名刺</span>
                    </h1>
                    <p className="text-sm opacity-60 leading-relaxed font-serif tracking-wide max-w-md mx-auto">
                        An interactive digital business card with 3D tilt physics, dual aesthetic modes, and vCard export.
                    </p>
                </div>

                {/* Card Aesthetic Switcher & Flip Controls */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6 relative z-20">
                    <div className="flex items-center gap-1.5 p-1 bg-theme-card/80 border border-theme-border rounded-xl backdrop-blur-md shadow-md">
                        <button
                            onClick={() => setStyleMode('washi')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                                styleMode === 'washi'
                                    ? "bg-amber-700/20 text-amber-500 border border-amber-600/40 font-bold"
                                    : "text-theme-text/60 hover:text-theme-text"
                            }`}
                        >
                            <Sparkles size={13} />
                            <span>Washi Paper (和紙)</span>
                        </button>

                        <button
                            onClick={() => setStyleMode('cyber')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                                styleMode === 'cyber'
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold shadow-glow-accent"
                                    : "text-theme-text/60 hover:text-theme-text"
                            }`}
                        >
                            <Cpu size={13} />
                            <span>Cyber Glass (現代)</span>
                        </button>
                    </div>

                    {/* 3D Flip Toggle */}
                    <button
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="flex items-center gap-2 px-4 py-2 bg-theme-card border border-theme-border rounded-xl text-xs font-mono text-cyan-accent hover:border-cyan-accent/50 hover:bg-theme-card/80 transition-all shadow-md group"
                    >
                        <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span>Flip Card ({isFlipped ? "Back EN" : "Front JP"})</span>
                    </button>
                </div>

                {/* Main Stage: The Card */}
                <div className="w-full flex justify-center mb-6 md:mb-12 relative px-4">
                    <div id="meishi-capture-node" className="relative p-2">
                        <Meishi
                            data={{ ...MEISHI_DATA, color: accent.value }}
                            styleMode={styleMode}
                            isFlipped={isFlipped}
                            onFlip={setIsFlipped}
                        />
                    </div>

                    {/* Floating Action for Capture */}
                    <button
                        onClick={handleDownloadImage}
                        className="absolute right-4 top-2 lg:right-16 lg:top-6 p-3 bg-theme-card text-theme-text rounded-full shadow-xl hover:scale-110 transition-transform border border-theme-border tooltip-trigger z-30"
                        title="Download High-Res PNG Image"
                    >
                        <Camera size={20} />
                    </button>
                </div>

                {/* Controls & Actions */}
                <div className="w-full max-w-[90vw] md:max-w-md mx-auto grid gap-3 md:gap-4 relative z-20">
                    <button
                        onClick={generateVCard}
                        className="w-full group relative flex items-center justify-center gap-4 py-3 md:py-4 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            style={{ backgroundColor: accent.value }}
                        />
                        <Download size={18} className="relative z-10" />
                        <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase">Save to Contacts (vCard)</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <button
                            onClick={handleCopyEmail}
                            className="flex items-center justify-center gap-2 md:gap-3 py-3 bg-theme-card border border-theme-text/10 rounded-xl hover:bg-theme-text/5 hover:border-cyan-accent/50 transition-all duration-200 group"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-theme-text/40 group-hover:text-theme-text transition-colors" />}
                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-theme-text/80 whitespace-nowrap">
                                {copied ? "Copied" : "Copy Email"}
                            </span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-2 md:gap-3 py-3 bg-theme-card border border-theme-text/10 rounded-xl hover:bg-theme-text/5 hover:border-cyan-accent/50 transition-all duration-200 group"
                        >
                            <Share2 size={16} className="text-theme-text/40 group-hover:text-theme-text transition-colors" />
                            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-theme-text/80">
                                Share
                            </span>
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-[9px] md:text-[10px] text-theme-muted tracking-widest uppercase">
                            Kyushu University &bull; Fukuoka, Japan
                        </p>
                    </div>
                </div>

                {/* Omikuji Widget */}
                <div className="mt-12 xl:mt-20 w-full flex justify-center pb-12">
                    <div className="max-w-md w-full">
                        <Omikuji />
                    </div>
                </div>

            </Container>
        </div>
    );
}
