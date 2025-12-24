import AboutMeLayout from "@/components/layouts/AboutMeLayout";

export const metadata = {
    title: 'About',
    description:
        'Learn more about Usama Bukhari, a software engineer and research student at Kyushu University, Japan.',
    openGraph: {
        title: 'About Usama Bukhari',
        description: 'Software Engineer & Research Student based in Fukuoka, Japan.',
    },
};

export default function About() {
    return <AboutMeLayout />;
}
