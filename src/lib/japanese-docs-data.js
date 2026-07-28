// Centralized single source of truth for Japanese Professional Documents
// (Digital Meishi 名刺 & Shokumu Keirekisho 職務経歴書)

export const MEISHI_DATA = {
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

export const KEIREKI_DATA = {
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
            period: "2022年 10月 - 2023年 9月",
            company: "CareCloud (New Jersey / Hybrid)",
            project: "EHR (電子健康記録) システムの検索機能強化およびAI要約モジュール開発",
            role: "ソフトウェアエンジニア (Full-time)",
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
