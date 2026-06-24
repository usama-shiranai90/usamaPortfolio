import HomePageLayout from "@/components/layouts/HomePageLayout";
// import {useTheme} from "next-themes";

export const metadata = {
    title: {
        absolute: 'Usama Bukhari - Software Engineer & Research Student',
    },
    description:
        'Welcome to the portfolio of Usama Bukhari. Explore my projects, research, and articles on software engineering and AI.',
    openGraph: {
        title: 'Usama Bukhari - Software Engineer & Research Student',
        description: 'Explore the projects and research of Usama Bukhari, a software engineer and research student.',
        url: 'https://usamabukhari.com',
        siteName: 'Usama Bukhari',
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        canonical: 'https://usamabukhari.com',
    },
};

export default function Home() {
    // const { resolvedTheme, setTheme } = useTheme();
    return <HomePageLayout />;
}