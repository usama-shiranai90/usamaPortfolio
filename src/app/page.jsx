import HomePageLayout from "@/components/layouts/HomePageLayout";
// import {useTheme} from "next-themes";

export const metadata = {
    title: 'Portfolio',
    description:
        'I’m Usama Bukhari, a software engineer and research student at Kyushu University - Japan.',
};

export default function Home() {
    // const { resolvedTheme, setTheme } = useTheme();
    return <HomePageLayout />;
}