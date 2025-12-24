import HomePageLayout from "@/components/layouts/HomePageLayout";
// import {useTheme} from "next-themes";

export const metadata = {
    title: 'Portfolio', // Will become "Portfolio - Usama Bukhari" due to template
    description:
        'Welcome to the portfolio of Usama Bukhari. Explore my projects, research, and articles on software engineering and AI.',
    openGraph: {
        title: 'Usama Bukhari - Portfolio',
        description: 'Explore the projects and research of Usama Bukhari, a software engineer and research student.',
    },
};

export default function Home() {
    // const { resolvedTheme, setTheme } = useTheme();
    return <HomePageLayout />;
}