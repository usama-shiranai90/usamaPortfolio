
import MeishiPageClient from '@/components/ui/MeishiPageClient';

export const metadata = {
    title: {
        absolute: 'Digital Meishi (名刺) | Syed Usama Bukhari',
    },
    description: 'Professional Digital Business Card of Syed Usama Bukhari, software engineer & researcher.',
    openGraph: {
        title: 'Digital Meishi (名刺) | Syed Usama Bukhari',
        description: 'Professional Digital Business Card of Syed Usama Bukhari, software engineer & researcher.',
        url: 'https://usamabukhari.com/meishi',
        type: 'profile',
    },
    alternates: {
        canonical: 'https://usamabukhari.com/meishi',
    },
};

export default function MeishiPage() {
    return <MeishiPageClient />;
}
