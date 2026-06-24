import AboutMeLayout from "@/components/layouts/AboutMeLayout";

export const metadata = {
    title: 'About',
    description:
        'Learn more about Usama Bukhari, a software engineer and research student at Kyushu University, Japan.',
    openGraph: {
        title: 'About Usama Bukhari - Software Engineer & Research Student',
        description: 'Software Engineer & Research Student based in Fukuoka, Japan.',
        url: 'https://usamabukhari.com/about',
        type: 'profile',
    },
    alternates: {
        canonical: 'https://usamabukhari.com/about',
    },
};

export default function About() {
    return <AboutMeLayout />;
}
