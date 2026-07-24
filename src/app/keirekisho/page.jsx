"use client";

import { Printer } from 'lucide-react';
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
        },
        {
            period: "2024年 6月 - 2024年 8月",
            company: "Addo AI (Singapore/Remote)",
            project: "データパイプラインおよび分析ワークフローの最適化 (インターンシップ)",
            role: "データエンジニアインターン",
            teamSize: "3名",
            description: "シンガポールを拠点とするAIコンサルティング企業におけるデータエンジニアリングインターン。データウェアハウスおよびETL処理の効率化に従事。",
            tasks: [
                "PythonとSQLを用いたETLデータパイプラインの設計・構築",
                "分析クエリ高速化のためのデータモデリングおよびスキーマ設計",
                "データ整合性チェックおよび品質保証プロセスの自動化"
            ],
            tech: {
                os: "Linux",
                lang: "Python, SQL",
                fw: "Apache Airflow",
                db: "Snowflake, PostgreSQL",
                tools: "Git, Docker, AWS"
            }
        },
        {
            period: "2024年 10月 - 現在",
            company: "九州大学 ソーシャルテックラボ",
            project: "Dawakhana: ハーブ・生薬のマルチモーダルアノテーション収集プラットフォーム",
            role: "データエンジニア / 研究員",
            teamSize: "3名",
            description: "ハーブや伝統生薬の識別精度向上のため、植物画像や成分テキストを紐づけるアノテーションおよびデータ収集プラットフォームを設計・構築。",
            tasks: [
                "植物画像データと成分テキストを効率的に対応付けるカスタムラベリングスキーマの設計",
                "アノテーター向けの直感的で入力しやすいウェブインターフェースの構築",
                "アノテーション済みデータの整合性検証スクリプトの実装"
            ],
            tech: {
                os: "Linux",
                lang: "Python, JavaScript",
                fw: "React, FastAPI",
                db: "PostgreSQL",
                tools: "Git, Docker, Label Studio"
            }
        },
        {
            period: "2024年 4月 - 現在",
            company: "九州大学 ソーシャルテックラボ",
            project: "Lab Sync: スマート研究室運用・研究進捗管理プラットフォーム開発",
            role: "フルスタックエンジニア / プロジェクトリーダー",
            teamSize: "3名",
            description: "研究室内の進捗報告、スケジュール、出席状況、タスク割り当て、お知らせ、イベント、備品在庫を一体化した管理プラットフォーム。九州大学ソーシャルテックラボに実導入。",
            tasks: [
                "研究室業務（週次報告、在庫管理、出席確認）を一元化するプラットフォームの要件定義と設計",
                "ユーザーによる検証フィードフィードバックに基づく機能改善、レスポンシブWebおよびモバイル対応の推進",
                "異なる研究室要件に適応可能なモジュールカスタマイズ機能の基本設計"
            ],
            tech: {
                os: "Linux",
                lang: "JavaScript, HTML5/CSS3",
                fw: "React, Next.js, Node.js",
                db: "MongoDB / PostgreSQL",
                tools: "Git, Docker, Vercel"
            }
        },
        {
            period: "2024年 8月 - 2024年 12月",
            company: "個人開発",
            project: "ConferenceTracker: 学術カンファレンス投稿・進捗管理ツール",
            role: "フルスタックエンジニア",
            teamSize: "1名 (個人開発)",
            description: "研究論文の執筆プロセス、共著者からのフィードバック履歴、カンファレンスの重要日程（アブストラクト締切、最終稿締切）を一元管理するシステム開発。",
            tasks: [
                "複数の並行する論文投稿プロセスをステータス別に視覚化するカンバンボード風機能の開発",
                "重要日程（デッドライン）が近づいた際のリマインド通知機能の実装",
                "共著者からのコメントや改訂ドラフトをバージョン管理・比較する機能の設計"
            ],
            tech: {
                os: "macOS / Linux",
                lang: "TypeScript, JavaScript",
                fw: "Next.js, Tailwind CSS",
                db: "Supabase / PostgreSQL",
                tools: "Git, Vercel"
            }
        }
    ]
};

export default function KeirekishoPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Container className="py-16 md:py-24">
            {/* Page Controls (Screen Only) */}
            <div className="mb-8 flex justify-between items-center print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-theme-text">職務経歴書 (Technical Dossier)</h1>
                    <p className="text-sm text-theme-muted">Professional History for Engineering Roles</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-theme-text text-theme-bg rounded-md font-bold text-sm hover:opacity-80 transition-opacity"
                    >
                        <Printer size={16} /> Print / Save PDF
                    </button>
                </div>
            </div>

            {/* A4 Paper Layout */}
            <div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-serif p-8 md:p-12 max-w-[210mm] mx-auto border border-zinc-200 dark:border-zinc-800 shadow-2xl dark:shadow-black/50 min-h-[297mm] print:shadow-none print:w-full print:max-w-none print:p-0 print:border-none print:bg-white print:text-black">

                {/* Header */}
                <div className="text-right text-xs mb-4">
                    <p>{KEIREKI_DATA.header.date}</p>
                    <p className="font-bold text-lg mt-2 underline">{KEIREKI_DATA.header.name}</p>
                </div>

                <h2 className="text-center text-2xl font-bold border-b-2 border-zinc-900 dark:border-zinc-100 pb-2 mb-8 tracking-widest print:border-black">
                    職務経歴書
                </h2>

                {/* Summary */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">{KEIREKI_DATA.summary.title}</h2>
                    <p className="text-xs leading-relaxed text-justify text-zinc-700 dark:text-zinc-300 print:text-black">
                        {KEIREKI_DATA.summary.text}
                    </p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">{KEIREKI_DATA.skills.title}</h2>
                    <ul className="list-disc list-inside text-xs leading-relaxed space-y-1 text-zinc-700 dark:text-zinc-300 print:text-black">
                        {KEIREKI_DATA.skills.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Projects Table */}
                <div className="mb-8">
                    <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-4 text-sm print:border-black">【職務経歴詳細】</h2>

                    <div className="space-y-8">
                        {KEIREKI_DATA.projects.map((proj, i) => (
                            <div key={i} className="break-inside-avoid">
                                {/* Project Header Line */}
                                <div className="flex justify-between items-baseline mb-1 border-b border-zinc-300 dark:border-zinc-700 pb-1 print:border-black">
                                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white print:text-black">{proj.project}</h3>
                                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 print:text-black">{proj.period}</span>
                                </div>

                                <div className="grid grid-cols-12 gap-0 text-xs border border-zinc-200 dark:border-zinc-800 print:border-black/20">
                                    {/* Company/Role Info */}
                                    <div className="col-span-12 bg-zinc-50 dark:bg-zinc-800/40 p-2 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 text-zinc-800 dark:text-zinc-200 print:bg-gray-50 print:border-black/20 print:text-black">
                                        <span className="font-bold">所属:</span> {proj.company}
                                        <span className="mx-2 text-zinc-300 dark:text-zinc-700 print:text-black">|</span>
                                        <span className="font-bold">役割:</span> {proj.role}
                                        <span className="mx-2 text-zinc-300 dark:text-zinc-700 print:text-black">|</span>
                                        <span className="font-bold">チーム規模:</span> {proj.teamSize}
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
                                                    <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">OS/DB</td>
                                                    <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">: {proj.tech.os} / {proj.tech.db}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">言語</td>
                                                    <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">: {proj.tech.lang}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">FW</td>
                                                    <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">: {proj.tech.fw}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-16 font-semibold text-zinc-500 dark:text-zinc-400 py-0.5 print:text-gray-500">Tools</td>
                                                    <td className="py-0.5 text-zinc-700 dark:text-zinc-300 print:text-black">: {proj.tech.tools}</td>
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
                    <h2 className="font-bold border-l-4 border-zinc-900 dark:border-zinc-300 pl-2 mb-2 text-sm print:border-black">【自己PR】</h2>
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 text-xs leading-relaxed text-justify bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 print:border-black/20 print:bg-gray-50 print:text-black">
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
