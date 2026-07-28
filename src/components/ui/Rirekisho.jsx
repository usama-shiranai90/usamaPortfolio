import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { fadeUp } from '@/lib/motion';

export function Rirekisho({ data, photo }) {
    const { profile, education, experience, licenses, skills, requests } = data;
    const { accent, isDark } = useTheme();

    // Helper to render timeline rows (year/month/content)
    const TimelineRows = ({ items, minRows = 16, title }) => {
        const rows = [...items];
        // Fill empty rows to maintain layout structure
        while (rows.length < minRows) {
            rows.push({ year: '', month: '', content: '' });
        }

        return (
            <div className="w-full border-t border-theme-border print:border-black">
                {/* Header */}
                <div className="flex border-b border-theme-border font-bold text-xs bg-theme-elevated text-theme-text transition-colors print:border-black print:bg-gray-100 print:text-black">
                    <div className="w-16 border-r border-theme-border py-1 text-center print:border-black">年</div>
                    <div className="w-12 border-r border-theme-border py-1 text-center print:border-black">月</div>
                    <div className="flex-1 py-1 text-center">{title}</div>
                </div>
                {/* Rows */}
                {rows.map((row, i) => (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.02 }}
                        key={i}
                        className={`flex ${i === rows.length - 1 ? '' : 'border-b border-dashed border-theme-border print:border-gray-400'} min-h-[28px] hover:bg-theme-text/5 transition-colors print:hover:bg-transparent`}
                    >
                        <div className="w-16 border-r border-theme-border font-mono text-center flex items-center justify-center text-sm text-theme-text print:border-black print:text-black">{row.year}</div>
                        <div className="w-12 border-r border-theme-border font-mono text-center flex items-center justify-center text-sm text-theme-text print:border-black print:text-black">{row.month}</div>
                        <div className="flex-1 px-2 py-1 text-sm flex items-center whitespace-pre-wrap text-theme-text print:text-black">{row.content}</div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[210mm] mx-auto bg-theme-card text-theme-text font-serif border border-theme-border shadow-2xl dark:shadow-black/50 overflow-hidden relative print:shadow-none print:border-black print:bg-white print:text-black print:m-0 print:w-full"
            style={{ borderColor: !isDark ? undefined : `rgba(${accent.rgb}, 0.2)` }}
        >
            {/* Corner Accent for Screen only */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-theme-text/5 to-transparent pointer-events-none print:hidden" />

            {/* Header: Name, Photo, Basic Info */}
            <div id="basic-info" className="flex border-b border-theme-border h-[140px] print:border-black scroll-mt-24">
                {/* Left: Info */}
                <div className="flex-1 flex flex-col">
                    {/* Name Row */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex border-b border-dotted border-theme-border h-8 print:border-gray-400">
                            <div className="w-20 p-1 text-[10px] items-end pb-1 flex px-2 whitespace-nowrap text-theme-muted print:text-black">ふりがな</div>
                            <div className="flex-1 p-1 items-end pb-1 flex text-xs text-theme-text print:text-black">{profile.furigana}</div>
                        </div>
                        <div className="flex-1 flex items-center px-4">
                            <h1 className="text-3xl font-bold tracking-[0.2em] text-theme-text print:text-black">{profile.name}</h1>
                        </div>
                    </div>
                    {/* DOB & Gender */}
                    <div className="h-10 border-t border-theme-border flex print:border-black">
                        <div className="flex-1 flex items-center px-4 text-sm border-r border-theme-border print:border-black">
                            {profile.dob} (満 {profile.age} 歳)
                        </div>
                        <div className="w-24 flex items-center justify-center text-sm">
                            {profile.gender}
                        </div>
                    </div>
                </div>

                {/* Right: Photo Placeholder */}
                <div className="w-[100px] md:w-[40mm] border-l border-theme-border p-2 flex flex-col items-center justify-center gap-1 bg-theme-elevated/30 print:border-black print:bg-transparent">
                    {photo ? (
                        <div className="relative w-full h-full overflow-hidden border border-theme-border shadow-inner print:border-gray-200">
                            <Image
                                src={photo}
                                alt="Profile"
                                fill
                                sizes="(min-width: 768px) 151px, 100px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div
                            className="text-[10px] text-theme-muted text-center leading-none border-2 border-dashed border-theme-border w-full h-full flex flex-col items-center justify-center rounded print:border-gray-400"
                            style={{ borderColor: !isDark ? undefined : `rgba(${accent.rgb}, 0.2)` }}
                        >
                            写真を貼る位置<br />(縦 36-40mm)<br />(横 24-30mm)
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Info */}
            <div className="border-b border-theme-border print:border-black">
                <div className="flex border-b border-dotted border-theme-border h-6 print:border-gray-400">
                    <div className="w-20 p-1 text-[10px] flex items-center px-2 text-theme-muted print:text-black">ふりがな</div>
                    <div className="flex-1 p-1 text-xs flex items-center text-theme-text print:text-black">{profile.addressFurigana}</div>
                </div>
                <div className="flex h-16">
                    <div className="w-20 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-medium text-theme-muted print:border-black print:bg-gray-100 print:text-black">
                        現住所 〒 {profile.postalCode}
                    </div>
                    <div className="flex-1 p-2 text-sm flex items-center leading-tight">
                        {profile.address}
                    </div>
                </div>
                <div className="flex border-t border-theme-border h-10 print:border-black">
                    <div className="flex-1 flex border-r border-theme-border print:border-black">
                        <div className="w-20 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-medium text-theme-muted print:border-black print:bg-gray-100 print:text-black">電話</div>
                        <div className="flex-1 flex items-center px-2 text-sm font-mono">{profile.phone}</div>
                    </div>
                    <div className="flex-1 flex">
                        <div className="w-20 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-medium text-theme-muted print:border-black print:bg-gray-100 print:text-black">Email</div>
                        <div className="flex-1 flex items-center px-2 text-sm font-mono text-[11px] truncate print:text-black" style={{ color: accent.value }}>{profile.email}</div>
                    </div>
                </div>
            </div>

            {/* Education & Work History */}
            <div id="history" className="border-b border-theme-border print:border-black scroll-mt-24">
                <TimelineRows
                    title="学歴・職歴"
                    items={[
                        { content: <div className="font-bold text-center w-full text-theme-text print:text-black">学歴</div> },
                        ...education,
                        { content: <div className="font-bold text-center w-full mt-2 text-theme-text print:text-black">職歴</div> },
                        ...experience,
                        { content: <div className="text-right w-full mr-4">以上</div> }
                    ]}
                    minRows={18}
                />
            </div>

            {/* Licenses & Qualifications */}
            <div id="licenses" className="border-b border-theme-border print:border-black scroll-mt-24">
                <TimelineRows
                    title="免許・資格"
                    items={licenses}
                    minRows={6}
                />
            </div>

            {/* Skills / PR / Requests */}
            <div id="pr-skills" className="flex flex-col h-auto min-h-[200px] scroll-mt-24">
                {/* PR Section */}
                <div className="flex-1 flex border-b border-theme-border print:border-black">
                    <div className="w-24 bg-theme-elevated border-r border-theme-border p-4 flex items-center justify-center text-xs font-bold text-theme-muted print:border-black print:bg-gray-100 print:text-black">
                        志望動機<br />特技<br />アピールポイント
                    </div>
                    <div className="flex-1 p-4 text-xs leading-relaxed whitespace-pre-wrap text-theme-text print:text-black">
                        {skills ? (
                            <>
                                <div className="mb-2 font-bold" style={{ color: isDark ? accent.value : undefined }}>[技術スキル]</div>
                                <div className="mb-4">{skills}</div>
                                <div className="mb-2 font-bold" style={{ color: isDark ? accent.value : undefined }}>[自己PR]</div>
                                <div>{profile.pr}</div>
                            </>
                        ) : profile.pr}
                    </div>
                </div>

                {/* Commute */}
                <div className="flex border-b border-theme-border h-14 print:border-black">
                    <div className="w-1/2 flex border-r border-theme-border print:border-black">
                        <div className="w-24 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-bold text-theme-muted print:border-black print:bg-gray-100 print:text-black">通勤時間</div>
                        <div className="flex-1 flex items-center px-4 text-sm">約 30 分</div>
                    </div>
                    <div className="w-1/2 flex">
                        <div className="w-24 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-bold text-theme-muted print:border-black print:bg-gray-100 print:text-black">扶養家族数</div>
                        <div className="flex-1 flex items-center px-4 text-sm">0 人</div>
                    </div>
                </div>

                {/* Requests */}
                <div className="flex-1 flex h-[100px]">
                    <div className="w-24 bg-theme-elevated border-r border-theme-border p-2 flex items-center justify-center text-xs font-bold text-theme-muted print:border-black print:bg-gray-100 print:text-black">
                        本人希望記入欄
                    </div>
                    <div className="flex-1 p-2 text-xs leading-relaxed whitespace-pre-wrap text-theme-text print:text-black">
                        {requests || "特になし (貴社の規定に従います。)"}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-theme-elevated border-t border-theme-border text-[10px] text-theme-muted text-right px-4 py-1 print:bg-gray-100 print:border-black print:text-black">
                JIS規格履歴書準拠フォーマット
            </div>
        </motion.div>
    );
}

// Default export if needed, mostly used as named import
export default Rirekisho;
