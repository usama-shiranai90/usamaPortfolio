import KeirekishoPageClient from "@/components/ui/KeirekishoPageClient";

export const metadata = {
    title: {
        absolute: "職務経歴書 (Technical Dossier) | Syed Usama Bukhari",
    },
    description:
        "Syed Usama Bukhari の職務経歴書。EHRシステム開発、医療情報規格(FHIR)、ETLパイプラインなどの開発実績。",
    openGraph: {
        title: "職務経歴書 (Shokumu Keirekisho) - Usama Bukhari",
        description:
            "Syed Usama Bukhari の日本語職務経歴書。ソフトウェアエンジニア・研究員。",
        url: "https://usamabukhari.com/keirekisho",
        type: "profile",
    },
    alternates: {
        canonical: "https://usamabukhari.com/keirekisho",
    },
};

export default function KeirekishoPage() {
    return <KeirekishoPageClient />;
}
