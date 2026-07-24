'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, Globe, Sparkles, Cpu } from 'lucide-react';
import Image from 'next/image';
import { springGentle } from '@/lib/motion';
import { Hanko } from './Hanko';

export function Meishi({ data, styleMode = 'washi', isFlipped: externalFlipped = null, onFlip = null }) {
    const [internalFlipped, setInternalFlipped] = useState(false);
    const isFlipped = externalFlipped !== null ? externalFlipped : internalFlipped;

    const cardRef = useRef(null);

    // Mouse 3D Parallax & Holographic Sheen Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

    const sheenX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const sheenY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleFlip = () => {
        if (onFlip) {
            onFlip(!isFlipped);
        } else {
            setInternalFlipped(!isFlipped);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
        }
    };

    const {
        name = "Syed Usama Bukhari",
        furigana = "サイド ウサマ ブカリ",
        title = "Software Engineer / Researcher",
        titleJp = "ソフトウェアエンジニア / 研究員",
        company = "Kyushu University",
        companyJp = "国立大学法人 九州大学",
        department = "SocialTech Lab",
        departmentJp = "ソーシャルテックラボ",
        postalCode = "819-0395",
        address = "福岡県福岡市西区元岡744 ウエスト2号館 648",
        addressEn = "W2-648, Ito Campus, Kyushu University\n744 Moto’oka, Nishi-Ku, Fukuoka 819-0395\nJapan",
        phone = "070-92##-####",
        email = "bukhari.453@s.kyushu-u.ac.jp",
        website = "usamabukhari.netlify.app",
    } = data || {};

    const activeColor = data?.color || "#A6192E";
    const isCyber = styleMode === 'cyber';

    return (
        <div
            className="flex flex-col items-center justify-center p-4 md:p-8 select-none"
            style={{ perspective: '1500px' }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleFlip}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label="Flip business card"
                style={{
                    rotateX: rotateXSpring,
                    rotateY: rotateYSpring,
                    transformStyle: 'preserve-3d',
                }}
                className="relative w-[320px] sm:w-[480px] md:w-[560px] aspect-[91/55] cursor-pointer group rounded-xl transition-shadow duration-300"
            >
                <motion.div
                    className="w-full h-full relative"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    initial={{ rotateY: 0 }}
                    transition={springGentle}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Dynamic Holographic Foil Sheen Overlay */}
                    <motion.div
                        className="absolute inset-0 z-30 pointer-events-none rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-color-dodge"
                        style={{
                            background: `radial-gradient(circle at ${sheenX.get()}% ${sheenY.get()}%, rgba(255,255,255,0.8) 0%, rgba(6,182,212,0.3) 30%, transparent 70%)`,
                        }}
                    />

                    {/* FRONT SIDE (Japanese / Formal) */}
                    <div
                        className={`absolute inset-0 overflow-hidden shadow-2xl rounded-xl border flex flex-col transition-colors duration-500 ${
                            isCyber
                                ? "bg-black/90 text-white border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                                : "bg-[#fdfbf7] text-[#111] border-amber-900/10 shadow-xl"
                        }`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                    >
                        {/* Background Textures */}
                        {isCyber ? (
                            <>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                            </>
                        ) : (
                            <>
                                <div
                                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
                                    }}
                                />
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600/40 via-amber-500 to-amber-600/40" />
                            </>
                        )}

                        {/* Front Content Grid */}
                        <div className="flex-1 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0">
                                        <Image
                                            src="/images/kyushu.1.png"
                                            alt="Kyushu University"
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex flex-col border-l border-current/20 pl-3 sm:pl-4 py-0.5">
                                        <h2 className="text-xs sm:text-sm font-serif font-bold tracking-[0.15em] leading-tight">
                                            {companyJp}
                                        </h2>
                                        <p className="text-[9px] sm:text-[10px] opacity-75 tracking-wider leading-tight mt-0.5 font-serif">
                                            {departmentJp}
                                        </p>
                                    </div>
                                </div>

                                {isCyber && (
                                    <div className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 flex items-center gap-1">
                                        <Cpu size={10} />
                                        <span>CYBER_MEISHI</span>
                                    </div>
                                )}
                            </div>

                            {/* Center Name & Title Block */}
                            <div className="flex-1 flex flex-col justify-center items-center my-2">
                                <div className="text-center w-full">
                                    <p className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-2 font-serif ${isCyber ? "text-cyan-400 font-mono" : "text-amber-900/80"}`}>
                                        {titleJp}
                                    </p>
                                    <div className="relative inline-block pb-3">
                                        <p className="absolute -top-3.5 w-full text-center text-[8px] sm:text-[9px] tracking-[0.2em] font-serif opacity-70">
                                            {furigana}
                                        </p>
                                        <div className="flex items-end justify-center gap-2 sm:gap-3">
                                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-[0.2em] whitespace-nowrap leading-none">
                                                {name.split(' ')[0]}
                                            </h1>
                                            <span className="text-lg sm:text-xl md:text-2xl font-serif font-light tracking-[0.15em] leading-none mb-[1px] opacity-90">
                                                {name.split(' ').slice(1).join(' ')}
                                            </span>

                                            {/* Hanko Seal */}
                                            <div className="absolute -right-9 sm:-right-12 top-0 bottom-0 flex items-center">
                                                <Hanko text="ウサマ" className={`text-3xl sm:text-4xl ${isCyber ? "text-cyan-400 opacity-90" : "text-red-600 opacity-85 mix-blend-multiply"}`} />
                                            </div>
                                        </div>

                                        {/* Underline */}
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                                            style={{ backgroundColor: isCyber ? "#06b6d4" : activeColor }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Contact & Address */}
                            <div className="flex justify-between items-end border-t border-current/10 pt-2 sm:pt-3">
                                <div className="text-[8px] sm:text-[9px] font-serif leading-relaxed opacity-80 space-y-0.5">
                                    <p>〒{postalCode} {address}</p>
                                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-0.5 font-mono">
                                        <span className="flex items-center gap-1">
                                            <Phone size={10} className={isCyber ? "text-cyan-400" : "text-amber-800"} />
                                            {phone}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Mail size={10} className={isCyber ? "text-cyan-400" : "text-amber-800"} />
                                            {email}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest hidden sm:block">
                                    FRONT [JP]
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BACK SIDE (English / Modern Corporate) */}
                    <div
                        className={`absolute inset-0 overflow-hidden shadow-2xl rounded-xl border flex flex-col transition-colors duration-500 ${
                            isCyber
                                ? "bg-black/95 text-white border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                                : "bg-[#fdfbf7] text-[#111] border-amber-900/10 shadow-xl"
                        }`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        {/* Background Textures */}
                        {isCyber ? (
                            <>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_50%)] pointer-events-none" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                            </>
                        ) : (
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
                                }}
                            />
                        )}

                        <div className="flex-1 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative z-10">
                            {/* Back Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3
                                        className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-0.5 leading-none"
                                        style={{ color: isCyber ? "#a855f7" : activeColor }}
                                    >
                                        {company}
                                    </h3>
                                    <p className="text-[9px] sm:text-[10px] opacity-70 tracking-wider font-serif italic">
                                        {department}
                                    </p>
                                </div>
                                <div className="relative w-7 h-7 sm:w-8 sm:h-8 opacity-90">
                                    <Image
                                        src="/images/kyushu.1.png"
                                        alt="KU Logo"
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Back Center Name Block */}
                            <div className="flex-1 flex flex-col justify-center items-start my-2">
                                <p className={`text-[8px] sm:text-[9px] uppercase tracking-[0.25em] mb-1 font-mono ${isCyber ? "text-purple-400" : "text-amber-900/80"}`}>
                                    {title}
                                </p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight mb-2">
                                    {name}
                                </h2>
                                <div
                                    className="w-12 h-[2px] rounded-full"
                                    style={{ backgroundColor: isCyber ? "#a855f7" : activeColor }}
                                />
                            </div>

                            {/* Back Footer: Address & QR Code */}
                            <div className="flex justify-between items-end mt-auto pt-2 border-t border-current/10">
                                <div className="space-y-1 text-[8px] sm:text-[9px] tracking-wide opacity-80 font-mono">
                                    <p className="leading-relaxed whitespace-pre-line">{addressEn}</p>
                                    <div className="pt-1 space-y-0.5">
                                        <p className="flex items-center gap-1">
                                            <Mail size={9} className={isCyber ? "text-purple-400" : "text-amber-800"} />
                                            <span>{email}</span>
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <Globe size={9} className={isCyber ? "text-purple-400" : "text-amber-800"} />
                                            <span>{website}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic QR Code Block */}
                                <div className="flex flex-col items-center gap-1">
                                    <div className={`p-1 rounded bg-white border ${isCyber ? "border-purple-500/50 shadow-glow-accent" : "border-zinc-200"} relative w-10 h-10 sm:w-12 sm:h-12`}>
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://${website}&color=${(isCyber ? "a855f7" : activeColor.replace('#', ''))}&bgcolor=ffffff`}
                                            alt="QR Code"
                                            fill
                                            crossOrigin="anonymous"
                                            className="mix-blend-multiply object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <span className="text-[7px] font-mono opacity-50 uppercase tracking-widest">BACK [EN]</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Soft Ambient Ground Glow */}
                <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-6 blur-xl rounded-[100%] transition-colors duration-500 pointer-events-none ${
                        isCyber ? "bg-cyan-500/20" : "bg-black/15"
                    }`}
                />
            </motion.div>
        </div>
    );
}

export default Meishi;
