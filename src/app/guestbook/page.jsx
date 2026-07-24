import { Container } from '@/components/ui/Container';
import { GuestbookTerminal } from '@/components/ui/GuestbookTerminal';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { FadeIn } from '@/components/motion/FadeIn';

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
                <FadeIn>
                    <header className="mb-12 text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-theme-text">
                            Visitor <span className="text-cyan-accent">Log</span>
                        </h1>
                        <p className="text-theme-muted max-w-xl mx-auto">
                            A persistent record of those who have wandered through this digital space. Leave a mark before you disconnect.
                        </p>
                    </header>
                </FadeIn>

                <FadeIn delay={0.1} className="relative z-10">
                    <GuestbookTerminal />
                </FadeIn>
            </Container>
        </div>
    );
}
