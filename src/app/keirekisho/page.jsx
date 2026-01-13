"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Printer } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Container } from '@/components/ui/Container';

// --- DATA: Technical Dossier ---
// This would typically come from a separate data file, but defined here for the component structure.
const KEIREKI_DATA = {
    header: {
        date: "2026年 1月 14日 現在",
        name: "Syed Usama Bukhari",
        title: "職務経歴書 (Shokumu Keirekisho)"
    },
    summary: {
        title: "【職務要約】",
        text: "ソフトウェアエンジニアとして、Java、Python、PHP等の言語を用い、バックエンドからフロントエンド、データエンジニアリングまで幅広い開発経験を有します。特に医療・ヘルスケア分野におけるデータ集約型アプリケーションの構築、FHIR規格を用いた相互運用性の実装、ETLパイプラインの設計・構築（Airflow, dbt, Snowflake）に強みを持ちます。現在は九州大学にて、Retrieval Augmented Generation (RAG) を活用した処方最適化の研究に従事し、技術力と研究開発能力を兼ね備えています。"
    },
    skills: {
        title: "【活かせる経験・知識・技術】",
        items: [
            "Java (Spring Boot) を用いた堅牢なバックエンドAPI設計・開発経験",
            "Python (Django, FastAPI) によるAI/MLモデルのAPI化およびデータ分析基盤の構築",
            "クラウドインフラ (AWS, GCP) 上でのDocker/Kubernetesを用いたコンテナ運用経験",
            "医療情報規格 (FHIR, HL7) および ICD-10/11 コードセットの取り扱い知識",
            "英語でのビジネスコミュニケーションおよび技術文書作成能力"
        ]
    },
    projects: [
        {
            period: "2023年 11月 - 2025年 1月",
            company: "Reboot Era Technologies (Remote)",
            project: "社内向けCRMポータルおよび分析ダッシュボード開発",
            role: "バックエンドエンジニア",
            teamSize: "5名",
            description: "社内業務効率化のためのCRMおよびデータ分析基盤のバックエンド開発を担当。Laravelを用いたAPI設計から実装、パフォーマンスチューニングまでを主導。",
            tasks: [
                "JWT/OAuth2を用いたセキュアなRESTful/GraphQL APIの設計・構築",
                "RedisとLaravel Horizonを用いた非同期ジョブキュー（大量メール送信、PDF生成）の実装",
                "MySQLデータベースの正規化およびクエリ最適化によるレスポンス速度向上"
            ],
            tech: {
                os: "Linux (Ubuntu)",
                lang: "PHP 8, SQL",
                fw: "Laravel 8",
                db: "MySQL, Redis",
                tools: "Git, Docker, Postman"
            }
        },
        {
            period: "2023年 2月 - 2023年 9月",
            company: "CareCloud (New Jersey/Remote)",
            project: "EHR (電子健康記録) システムの検索機能強化およびAI要約モジュール開発",
            role: "ソフトウェアエンジニア",
            teamSize: "10名以上",
            description: "大規模EHRシステムの検索性能向上および生成AIを用いた診療記録要約機能の開発に従事。レガシーシステムからの移行およびマイクロサービス化を担当。",
            tasks: [
                "Elasticsearch導入による検索機能の刷新（プレフィックス一致から複数条件検索への移行）",
                "GPTおよびVertex AIを用いた診療記録要約のためのプロンプトエンジニアリング設計",
                "Docker/Kubernetes (Helm) を用いたマイクロサービスのコンテナ化とデプロイパイプライン構築",
                ".NETおよびAngular Materialを用いたUI/UXのモダナイズ"
            ],
            tech: {
                os: "Linux, Windows Server",
                lang: "C# (.NET), Python, TypeScript",
                fw: "Angular, FastAPI",
                db: "SQL Server, Elasticsearch",
                tools: "Azure DevOps, Kubernetes, Helm, Vertex AI"
            }
        },
        {
            period: "2024年 4月 - 現在",
            company: "九州大学 ソーシャルテックラボ",
            project: "Portable Health Clinic (PHC) 2.0 および FHIRアダプター開発",
            role: "リサーチャー / エンジニア",
            teamSize: "4名",
            description: "遠隔医療システム「Portable Health Clinic」の次世代版開発および国際標準規格FHIRへの対応。",
            tasks: [
                "DjangoとPostgreSQLを用いたセキュアな医療記録管理バックエンドの再設計",
                "Spring Data JPAを用いたPHC独自テーブルからFHIRリソースへのマッピングロジック実装",
                "Swaggerを用いたAPIドキュメント整備とJUnitによる単体テスト自動化",
                "Zoom API連携によるオンライン診療予約システムの構築"
            ],
            tech: {
                os: "Linux",
                lang: "Python, Java 17",
                fw: "Django, Spring Boot",
                db: "PostgreSQL",
                tools: "Docker, GitHub Actions, Airflow"
            }
        }
    ]
};

export default function KeirekishoPage() {
    const { accent } = useTheme();

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container className="py-16 md:py-24">
            {/* Page Controls (Screen Only) */}
            <div className="mb-8 flex justify-between items-center print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--theme-text)]">職務経歴書 (Technical Dossier)</h1>
                    <p className="text-sm text-zinc-500">Professional History for Engineering Roles</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-md font-bold text-sm hover:opacity-80 transition-opacity"
                    >
                        <Printer size={16} /> Print / Save PDF
                    </button>
                </div>
            </div>

            {/* A4 Paper Layout */}
            <div className="bg-white text-black font-serif p-8 md:p-12 max-w-[210mm] mx-auto shadow-2xl min-h-[297mm] print:shadow-none print:w-full print:max-w-none print:p-0">

                {/* Header */}
                <div className="text-right text-xs mb-4">
                    <p>{KEIREKI_DATA.header.date}</p>
                    <p className="font-bold text-lg mt-2 underline">{KEIREKI_DATA.header.name}</p>
                </div>

                <h1 className="text-center text-2xl font-bold border-b-2 border-black pb-2 mb-8 tracking-widest">
                    職務経歴書
                </h1>

                {/* Summary */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-black pl-2 mb-2 text-sm">{KEIREKI_DATA.summary.title}</h2>
                    <p className="text-xs leading-relaxed text-justify">
                        {KEIREKI_DATA.summary.text}
                    </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-black pl-2 mb-2 text-sm">{KEIREKI_DATA.skills.title}</h2>
                    <ul className="list-disc list-inside text-xs leading-relaxed space-y-1">
                        {KEIREKI_DATA.skills.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Projects Table */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-black pl-2 mb-4 text-sm">【職務経歴詳細】</h2>

                    <div className="space-y-8">
                        {KEIREKI_DATA.projects.map((proj, i) => (
                            <div key={i} className="break-inside-avoid">
                                {/* Project Header Line */}
                                <div className="flex justify-between items-baseline mb-1 border-b border-black/50 pb-1">
                                    <h3 className="font-bold text-sm">{proj.project}</h3>
                                    <span className="text-xs font-mono">{proj.period}</span>
                                </div>

                                <div className="grid grid-cols-12 gap-0 text-xs border border-black/20">
                                    {/* Company/Role Info */}
                                    <div className="col-span-12 bg-gray-50 p-2 border-b border-black/20 flex gap-4">
                                        <span className="font-bold">所属:</span> {proj.company}
                                        <span className="mx-2">|</span>
                                        <span className="font-bold">役割:</span> {proj.role}
                                        <span className="mx-2">|</span>
                                        <span className="font-bold">チーム規模:</span> {proj.teamSize}
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-12 p-3 border-b border-black/20 leading-relaxed">
                                        <p className="mb-2">{proj.description}</p>
                                        <ul className="list-disc list-inside space-y-0.5 pl-2 text-black/80">
                                            {proj.tasks.map((task, t) => (
                                                <li key={t}>{task}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack Grid */}
                                    <div className="col-span-3 bg-gray-50 p-2 border-r border-black/20 font-bold flex items-center justify-center text-center">
                                        環境・言語・ツール
                                    </div>
                                    <div className="col-span-9 p-2">
                                        <table className="w-full text-xs">
                                            <tbody>
                                                <tr>
                                                    <td className="w-16 font-semibold text-gray-500 py-0.5">OS/DB</td>
                                                    <td className="py-0.5">: {proj.tech.os} / {proj.tech.db}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-gray-500 py-0.5">言語</td>
                                                    <td className="py-0.5">: {proj.tech.lang}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-gray-500 py-0.5">FW</td>
                                                    <td className="py-0.5">: {proj.tech.fw}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-gray-500 py-0.5">Tools</td>
                                                    <td className="py-0.5">: {proj.tech.tools}</td>
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
                    <h2 className="font-bold border-l-4 border-black pl-2 mb-2 text-sm">【自己PR】</h2>
                    <div className="border border-black/20 p-4 text-xs leading-relaxed text-justify bg-gray-50">
                        <p className="mb-2">
                            <strong>[技術的探究心と適応力]</strong><br />
                            新しい技術スタックや未経験のドメインであっても、基礎理論（CS）に立ち返り迅速に習得・実践する能力があります。特にLLMやRAGなどの最先端技術を、実用的な医療アプリケーションに落とし込む実装力を強みとしています。
                        </p>
                        <p>
                            <strong>[グローバルな包括的視点]</strong><br />
                            パキスタン、米国企業のリモート、そして日本の大学研究室と、多文化・多言語環境での開発経験が豊富です。多様なバックグラウンドを持つチームメンバーと円滑に連携し、プロジェクトを推進することができます。
                        </p>
                    </div>
                </div>

            </div>
        </Container>
    );
}
