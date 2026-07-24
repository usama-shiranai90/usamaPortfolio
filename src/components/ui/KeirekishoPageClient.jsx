"use client";

import { Printer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JapaneseDocHeader } from "@/components/ui/JapaneseDocHeader";
import { KEIREKI_DATA } from "@/lib/japanese-docs-data";

export default function KeirekishoPageClient() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen py-8 md:py-16 text-[var(--theme-text)] w-full flex flex-col items-center justify-center">
            {/* Shared Centralized Document Header */}
            <JapaneseDocHeader activeDoc="keirekisho" onPrint={handlePrint} />

            <Container className="w-full flex flex-col items-center justify-center pb-16 md:pb-24">
                {/* Page Controls Subheader (Screen Only) */}
                <div className="mb-8 text-center max-w-4xl mx-auto print:hidden">
                    <h1 className="text-2xl md:text-3xl font-bold font-heading text-theme-text">
                        職務経歴書 <span className="text-theme-muted font-normal text-lg">(Technical Dossier)</span>
                    </h1>
                    <p className="text-xs md:text-sm text-theme-muted mt-1">
                        Professional History & Technical Record for Engineering Roles
                    </p>
                </div>

                {/* A4 Paper Layout Container */}
                <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-serif p-8 md:p-12 max-w-[210mm] w-full mx-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:shadow-black/50 min-h-[297mm] print:shadow-none print:w-full print:max-w-none print:p-0 print:border-none print:bg-white print:text-black">
                    {/* Header */}
                    <div className="text-right text-xs mb-4">
                        <p>{KEIREKI_DATA.header.date}</p>
                        <p className="font-bold text-lg mt-2 underline">
                            {KEIREKI_DATA.header.name}
                        </p>
                    </div>

                    <h2 className="text-center text-2xl font-bold border-b-2 border-zinc-900 dark:border-zinc-100 pb-2 mb-8 tracking-widest print:border-black">
                        職務経歴書
                    </h2>

                    {/* Summary */}
                    <div className="mb-8">
                        <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">
                            {KEIREKI_DATA.summary.title}
                        </h2>
                        <p className="text-xs leading-relaxed text-justify text-zinc-700 dark:text-zinc-300 print:text-black">
                            {KEIREKI_DATA.summary.text}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                        <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">
                            {KEIREKI_DATA.skills.title}
                        </h2>
                        <ul className="list-disc list-inside text-xs leading-relaxed space-y-1 text-zinc-700 dark:text-zinc-300 print:text-black">
                            {KEIREKI_DATA.skills.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Projects Table */}
                    <div className="mb-8">
                        <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-4 text-sm print:border-black">
                            【職務経歴詳細】
                        </h2>

                        <div className="space-y-8">
                            {KEIREKI_DATA.projects.map((proj, i) => (
                                <div key={i} className="break-inside-avoid">
                                    {/* Project Header Line */}
                                    <div className="flex justify-between items-baseline mb-1 border-b border-zinc-300 dark:border-zinc-700 pb-1 print:border-black">
                                        <h3 className="font-bold text-sm text-zinc-900 dark:text-white print:text-black">
                                            {proj.project}
                                        </h3>
                                        <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 print:text-black">
                                            {proj.period}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-12 gap-0 text-xs border border-zinc-200 dark:border-zinc-800 print:border-black/20">
                                        {/* Company/Role Info */}
                                        <div className="col-span-12 bg-zinc-50 dark:bg-zinc-800/40 p-2 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 text-zinc-800 dark:text-zinc-200 print:bg-gray-50 print:border-black/20 print:text-black">
                                            <span>
                                                <strong className="font-bold">所属:</strong>{" "}
                                                {proj.company}
                                            </span>
                                            <span className="text-zinc-300 dark:text-zinc-700 print:text-black">
                                                |
                                            </span>
                                            <span>
                                                <strong className="font-bold">役割:</strong>{" "}
                                                {proj.role}
                                            </span>
                                            <span className="text-zinc-300 dark:text-zinc-700 print:text-black">
                                                |
                                            </span>
                                            <span>
                                                <strong className="font-bold">
                                                    チーム規模:
                                                </strong>{" "}
                                                {proj.teamSize}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-12 p-3 border-b border-zinc-200 dark:border-zinc-800 leading-relaxed text-zinc-700 dark:text-zinc-300 print:border-black/20 print:text-black">
                                            <p className="mb-2">{proj.description}</p>
                                            <ul className="list-disc list-inside space-y-0.5 pl-2 text-zinc-600 dark:text-zinc-400 print:text-black">
                                                {proj.tasks.map((task, t) => (
                                                    <li key={t}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Tech Stack Grid */}
                                        <div className="col-span-3 bg-zinc-50 dark:bg-zinc-800/40 p-2 border-r border-zinc-200 dark:border-zinc-800 font-bold flex items-center justify-center text-center text-zinc-800 dark:text-zinc-200 print:bg-gray-50 print:border-black/20 print:text-black">
                                            環境・言語・ツール
                                        </div>
                                        <div className="col-span-9 p-2">
                                            <table className="w-full text-xs">
                                                <tbody>
                                                    <tr>
                                                        <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">
                                                            OS/DB
                                                        </td>
                                                        <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">
                                                            : {proj.tech.os} /{" "}
                                                            {proj.tech.db}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">
                                                            言語
                                                        </td>
                                                        <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">
                                                            : {proj.tech.lang}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">
                                                            FW
                                                        </td>
                                                        <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">
                                                            : {proj.tech.fw}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">
                                                            Tools
                                                        </td>
                                                        <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">
                                                            : {proj.tech.tools}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Self PR */}
                    <div className="break-inside-avoid">
                        <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">
                            【自己PR】
                        </h2>
                        <div className="border border-zinc-200 dark:border-zinc-800 p-4 text-xs leading-relaxed text-justify bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 print:border-black/20 print:bg-gray-50 print:text-black">
                            <p className="mb-2">
                                <strong>[技術的探究心と適応力]</strong>
                                <br />
                                新しい技術スタックや未経験のドメインであっても、基礎理論（CS）に立ち返り迅速に習得・実践する能力があります。特にLLMやRAGなどの最先端技術を、実用的な医療アプリケーションに落とし込む実装力を強みとしています。
                            </p>
                            <p>
                                <strong>[グローバルな包括的視点]</strong>
                                <br />
                                パキスタン、米国企業のリモート、そして日本の大学研究室と、多文化・多言語環境での開発経験が豊富です。多様なバックグラウンドを持つチームメンバーと円滑に連携し、プロジェクトを推進することができます。
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
