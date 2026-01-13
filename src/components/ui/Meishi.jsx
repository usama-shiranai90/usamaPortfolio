'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Mail, MapPin, Phone, Globe, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export function Meishi({ data }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Default data structure fallback
    const {
        name = "Syed Usama Bukhari",
        furigana = "サイド ウサマ ブカリ",
        title = "Software Engineer",
        titleJp = "学術研究員",
        company = "Kyushu University",
        companyJp = "国立大学法人 九州大学",
        department = "SocialTech Lab",
        departmentJp = "ソーシャルテックラボ",
        postalCode = "819-0395",
        address = "Fukuoka, Japan",
        addressEn = "744 Motooka, Nishi-ku, Fukuoka",
        phone = "080-xxxx-xxxx",
        email = "email@example.com",
        website = "one-eye-owl.res",
    } = data || {};

    const activeColor = data.color || "#A6192E";

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8" style={{ perspective: '2000px' }}>
            <div
                className="relative w-[550px] aspect-[91/55] cursor-pointer group"
                onClick={handleFlip}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <motion.div
                    className="w-full h-full relative transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    initial={{ rotateY: 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* 
                      FRONT SIDE: Japanese (Traditional/Formal)
                      Bg: Pure White Paper
                      Text: Sumi Black (#1a1a1a) & Kyushu Wine Red (#A6192E)
                    */}
                    <div
                        className="absolute inset-0 bg-[#fbfbfb] text-[#1a1a1a] overflow-hidden shadow-xl rounded-sm border border-zinc-100/50 flex flex-col"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Content Container - Strict Grid */}
                        <div className="flex-1 p-[40px] flex flex-col justify-between relative z-10">

                            {/* Header: Logo & Company */}
                            <div className="flex items-start justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        {/* Official Logo */}
                                        <div className="relative w-12 h-12 shrink-0">
                                            <Image
                                                src="/images/kyushu.1.png"
                                                alt="Kyushu University"
                                                fill
                                                className="object-contain"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="flex flex-col border-l border-zinc-200 pl-4 py-0.5">
                                            <h2 className="text-sm font-serif font-bold text-[#1a1a1a] tracking-[0.15em] leading-tight">{companyJp}</h2>
                                            <p className="text-[10px] font-serif text-[#555] tracking-wider leading-tight mt-0.5">{departmentJp}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Center: Name Block */}
                            <div className="flex-1 flex flex-col justify-center items-center mt-2">
                                <div className="text-center w-full">
                                    <p className="text-[10px] text-[#666] tracking-[0.2em] mb-4 block font-serif uppercase">{titleJp}</p>
                                    <div className="relative inline-block pb-6">
                                        <div className="flex items-end justify-center gap-3">
                                            <h1 className="text-4xl font-serif font-medium text-[#1a1a1a] tracking-[0.2em] whitespace-nowrap leading-none">
                                                {name.split(' ')[0]}
                                            </h1>
                                            <span className="text-2xl font-serif font-light text-[#444] tracking-[0.15em] leading-none mb-[2px]">
                                                {name.split(' ').slice(1).join(' ')}
                                            </span>
                                        </div>
                                        {/* Underline with Accent Color */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-30" style={{ color: activeColor }} />
                                        <p className="absolute -top-4 w-full text-center text-[9px] text-[#888] tracking-[0.15em] font-serif">{furigana}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Address & Contact */}
                            <div className="flex justify-between items-end border-t border-zinc-100 pt-3 mt-auto">
                                <div className="text-[9px] font-serif leading-loose text-[#555] tracking-wide">
                                    <p>〒{postalCode} {address}</p>
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1.5 group text-[#555]">
                                            <Phone size={10} style={{ color: activeColor }} />
                                            {phone}
                                        </span>
                                        <span className="flex items-center gap-1.5 group text-[#555]">
                                            <Mail size={10} style={{ color: activeColor }} />
                                            {email}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 
                      BACK SIDE: English (Corporate/Clean)
                      Bg: Pure White / Off-White
                      Text: Dark Grey
                    */}
                    <div
                        className="absolute inset-0 bg-[#fbfbfb] text-[#1a1a1a] overflow-hidden shadow-xl rounded-sm border border-zinc-100/50 flex flex-col"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="flex-1 p-[40px] flex flex-col justify-between relative z-10">
                            {/* Header: English Company */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3
                                        className="text-sm font-bold uppercase tracking-[0.15em] mb-1 leading-none"
                                        style={{ color: activeColor }}
                                    >
                                        {company}
                                    </h3>
                                    <p className="text-[10px] text-[#666] tracking-wider font-serif italic">
                                        {department}
                                    </p>
                                </div>
                                {/* Official Logo Small */}
                                <div className="relative w-8 h-8 opacity-80 mix-blend-multiply">
                                    <Image
                                        src="/images/kyushu.1.png"
                                        alt="KU Logo"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Center: Name English */}
                            <div className="flex-1 flex flex-col justify-center items-start">
                                <p className="text-[9px] text-[#666] uppercase tracking-[0.2em] mb-2 font-medium">{title}</p>
                                <h2 className="text-3xl font-serif font-bold tracking-tight text-[#111] mb-2">
                                    {name}
                                </h2>
                                <div className="w-12 h-[2px]" style={{ backgroundColor: activeColor }} />
                            </div>

                            {/* Footer: English Address & Links */}
                            <div className="flex justify-between items-end mt-auto">
                                <div className="space-y-1 text-[9px] font-medium tracking-wide text-[#555] font-sans">
                                    <p className="leading-relaxed whitespace-pre-line">{addressEn}</p>
                                    <div className="pt-2 flex flex-col gap-1 opacity-80">
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={9} strokeWidth={2} />
                                            <p>{email}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={9} strokeWidth={2} />
                                            <p>{phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[8px] uppercase tracking-widest text-[#888] mb-1">Portfolio</p>
                                        <p className="text-[9px] font-bold" style={{ color: activeColor }}>{website}</p>
                                    </div>
                                    <div className="p-1 bg-white rounded-sm border border-zinc-100 relative w-12 h-12">
                                        {/* Dynamic QR Code */}
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://${website}&color=${activeColor.replace('#', '')}&bgcolor=ffffff`}
                                            alt="QR Code"
                                            fill
                                            className="mix-blend-multiply opacity-90 object-contain"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* High-end Realistic Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/10 blur-xl rounded-[100%]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity"
            >
                <div className="h-[1px] w-8 bg-zinc-300" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-serif">Flip Card</span>
                <div className="h-[1px] w-8 bg-zinc-300" />
            </motion.div>
        </div>
    );
}

// Named export as well as default
export default Meishi;
