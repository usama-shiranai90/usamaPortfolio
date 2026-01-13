'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Meishi } from '@/components/ui/Meishi';
import { useTheme } from '@/context/ThemeContext';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check, Camera } from 'lucide-react';
import { Omikuji } from '@/components/ui/Omikuji';

// Data for the Meishi
const MEISHI_DATA = {
    name: "Syed Usama Bukhari",
    furigana: "サイド ウサマ ブカリ",
    title: "Software Engineer / Researcher",
    titleJp: "ソフトウェアエンジニア / 研究員",
    company: "Kyushu University",
    companyJp: "国立大学法人 九州大学",
    department: "SocialTech Lab",
    departmentJp: "ソーシャルテックラボ",
    postalCode: "819-0395",
    address: "福岡県福岡市西区元岡744 ウエスト2号館 648",
    addressEn: "W2-648, Ito Campus, Kyushu University\n744 Moto’oka, Nishi-Ku, Fukuoka 819-0395\nJapan",
    building: "ウエスト2号館",
    phone: "070-92##-####",
    email: "bukhari.453@s.kyushu-u.ac.jp",
    website: "usamabukhari.netlify.app"
};

export default function MeishiPageClient() {
    const { accent, themeMode } = useTheme();
    const [copied, setCopied] = useState(false);

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
            handleCopyEmail(); // Fallback
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
        const node = document.getElementById('meishi-container');
        if (!node) return;

        try {
            const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 3 });
            const link = document.createElement('a');
            link.download = `meishi-${accent.name.toLowerCase()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] w-full flex flex-col relative overflow-hidden transition-colors duration-500">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(${accent.value} 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <Container className="flex-1 flex flex-col items-center justify-center py-20 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                    <span
                        className="text-xs font-bold tracking-[0.3em] uppercase block mb-2 transition-colors duration-300"
                        style={{ color: accent.value }}
                    >Digital Identity</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                        Meishi <span className="text-zinc-400 font-light">名刺</span>
                    </h1>
                    <p className="text-sm opacity-60 leading-relaxed font-serif tracking-wide max-w-md mx-auto">
                        A digital representation of professional affiliation and personal identity.
                    </p>
                </div>

                {/* Main Stage: The Card */}
                <div className="w-full flex justify-center mb-8 md:mb-16 perspective-container relative px-4">
                    {/* Capture Target */}
                    <div id="meishi-container" className="p-4 rounded-xl">
                        <div className="scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-500 hover:scale-[0.57] sm:hover:scale-[0.72] md:hover:scale-[0.87] lg:hover:scale-[1.02] origin-center">
                            {/* Bind to Global Accent */}
                            <Meishi data={{ ...MEISHI_DATA, color: accent.value }} />
                        </div>
                    </div>

                    {/* Floating Action for Capture (Mobile optimized position) */}
                    <button
                        onClick={handleDownloadImage}
                        className="absolute right-4 top-4 lg:right-20 lg:top-10 p-3 bg-[var(--theme-card)] text-[var(--theme-text)] rounded-full shadow-lg hover:scale-110 transition-transform border border-zinc-100 dark:border-zinc-700 tooltip-trigger z-20"
                        title="Download as Image"
                    >
                        <Camera size={20} />
                    </button>
                </div>

                {/* Controls & Actions */}
                <div className="w-full max-w-md mx-auto grid gap-4 relative z-20">
                    <button
                        onClick={generateVCard}
                        className="w-full group relative flex items-center justify-center gap-4 py-4 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            style={{ backgroundColor: accent.value }}
                        />
                        <Download size={18} className="relative z-10" />
                        <span className="relative z-10 text-xs font-bold tracking-[0.2em] uppercase">Save to Contacts</span>
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleCopyEmail}
                            className="flex items-center justify-center gap-3 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                        >
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />}
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-600 dark:text-zinc-300">
                                {copied ? "Copied" : "Copy Email"}
                            </span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center gap-3 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                        >
                            <Share2 size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-600 dark:text-zinc-300">
                                Share
                            </span>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
                            Kyushu University &bull; Fukuoka, Japan
                        </p>
                    </div>
                </div>

                {/* --- Japanese Cultural Elements --- */}

                {/* 1. Vertical Philosophy Section (Genkou Youshi / Manuscript Style) */}
                <div className="xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:left-16 z-10 my-16 xl:my-0 w-full xl:w-auto flex justify-center xl:block">
                    <div className="relative p-6 bg-[#fffdf5] text-zinc-800 shadow-xl border border-zinc-200 dark:border-zinc-700/50 rounded-sm">

                        {/* Genkou Youshi Grid Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                            style={{
                                backgroundImage: `
                                     linear-gradient(to right, #d4d4d4 1px, transparent 1px),
                                     linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)
                                 `,
                                backgroundSize: '40px 40px'
                            }}
                        />

                        <div className="relative z-10 flex xl:flex-row flex-col gap-8 items-center xl:[writing-mode:vertical-rl]">
                            <div className="space-y-4 font-serif">
                                <h2 className="text-2xl font-bold tracking-[0.3em] leading-loose text-center xl:text-right border-b xl:border-b-0 xl:border-l border-zinc-300 pb-4 xl:pb-0 xl:pl-4">
                                    研究理念
                                </h2>
                                <p className="text-lg font-medium tracking-[0.25em] leading-[3rem] whitespace-nowrap">
                                    AIと人間性の<br className="xl:hidden" />交差点を探求する
                                </p>
                            </div>

                            {/* Hanko Seal */}
                            <div className="mt-4 xl:mt-0 opacity-90 mix-blend-multiply">
                                <div className="border-2 border-[#d00] rounded-full p-0.5 inline-block">
                                    <div className="border border-[#d00] rounded-full w-12 h-12 flex items-center justify-center bg-[#d00] text-[#fffdf5] font-serif font-bold text-xs shadow-sm">
                                        研究
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Omikuji Widget */}
                <div className="mt-24 w-full flex justify-center">
                    <div className="max-w-md w-full">
                        <Omikuji />
                    </div>
                </div>

            </Container>
        </div>
    );
}
