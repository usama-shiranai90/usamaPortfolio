import { Container } from '@/components/ui/Container';
import { GuestbookTerminal } from '@/components/ui/GuestbookTerminal';
import { ScientificBackground } from '@/components/ui/ScientificBackground';

export const metadata = {
    title: 'Guest Log',
    description: 'Leave your digital signature in the archives.',
    openGraph: {
        title: 'Visitor Log - Usama Bukhari',
        description: 'Leave your digital signature in the archives.',
        url: 'https://usamabukhari.com/guestbook',
        type: 'website',
    },
    alternates: {
        canonical: 'https://usamabukhari.com/guestbook',
    },
};

export default function GuestbookPage() {
    return (
        <div className="relative min-h-screen pt-24 pb-16">
            <ScientificBackground />
            <Container>
                <header className="mb-12 text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-zinc-900 dark:text-white">
                        Visitor <span className="text-cyan-accent">Log</span>
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                        A persistent record of those who have wandered through this digital space. Leave a mark before you disconnect.
                    </p>
                </header>

                <div className="relative z-10">
                    <GuestbookTerminal />
                </div>
            </Container>
        </div>
    );
}
