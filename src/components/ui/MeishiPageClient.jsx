'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Meishi } from '@/components/ui/Meishi';
import { useTheme } from '@/context/ThemeContext';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check, Camera } from 'lucide-react';

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
    address: "福岡県福岡市西区元岡744",
    addressEn: "744 Motooka, Nishi-ku, Fukuoka",
    building: "ウエスト2号館",
    phone: "080-3982-1234",
    email: "hub@one-eye-owl.res",
    website: "one-eye-owl.res"
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
                <div className="w-full flex justify-center mb-16 perspective-container relative">
                    {/* Capture Target */}
                    <div id="meishi-container" className="p-4 rounded-xl">
                        <div className="scale-[0.85] sm:scale-100 transition-transform duration-500 hover:scale-[1.02]">
                            {/* Bind to Global Accent */}
                            <Meishi data={{ ...MEISHI_DATA, color: accent.value }} />
                        </div>
                    </div>

                    {/* Floating Action for Capture */}
                    <button
                        onClick={handleDownloadImage}
                        className="absolute right-0 top-0 lg:right-20 lg:top-10 p-3 bg-[var(--theme-card)] text-[var(--theme-text)] rounded-full shadow-lg hover:scale-110 transition-transform border border-zinc-100 dark:border-zinc-700 tooltip-trigger"
                        title="Download as Image"
                    >
                        <Camera size={20} />
                    </button>
                </div>

                {/* Controls & Actions */}
                <div className="w-full max-w-md mx-auto grid gap-4 relative">
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

            </Container>
        </div>
    );
}
