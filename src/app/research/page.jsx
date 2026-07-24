import Link from 'next/link';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { Container } from '@/components/ui/Container';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { FadeIn, FadeInStagger, FadeInItem } from '@/components/motion/FadeIn';
import { Tag } from '@/components/ui/Tag';
import { Calendar } from 'lucide-react';

export const metadata = {
    title: 'Research & Articles',
    description: 'Deep dives into AI, Healthcare, and Software Engineering.',
    openGraph: {
        title: 'Research & Articles - Usama Bukhari',
        description: 'Deep dives into AI, Healthcare, and Software Engineering.',
        url: 'https://usamabukhari.com/research',
        type: 'website',
    },
    alternates: {
        canonical: 'https://usamabukhari.com/research',
    },
};

export default async function ResearchPage() {
    const posts = await getAllFilesFrontMatter();

    return (
        <div className="min-h-screen relative pt-24 pb-16">
            <ScientificBackground />
            <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn>
                    <header className="mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-text">
                            Research <span className="text-cyan-accent">Lab</span>
                        </h1>
                        <p className="text-xl text-theme-text/80 max-w-2xl font-light">
                            Technical explorations, mathematical models, and engineering journals from the intersection of AI and Healthcare.
                        </p>
                    </header>
                </FadeIn>

                <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <FadeInItem key={post.slug} className="h-full">
                            <Link
                                href={`/research/${post.slug}`}
                                className="group relative block h-full"
                            >
                                <div className="absolute inset-0 bg-theme-card/50 backdrop-blur-sm border border-theme-border rounded-xl transition-all duration-300 group-hover:border-cyan-accent/50 group-hover:shadow-glow-accent group-hover:-translate-y-1" />

                                <div className="relative p-6 h-full flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags?.map(tag => (
                                            <Tag key={tag} className="uppercase">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>

                                    <h2 className="text-xl font-bold font-heading text-theme-text mb-3 group-hover:text-cyan-accent transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-theme-muted line-clamp-3 mb-6 flex-1">
                                        {post.summary}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-theme-muted font-mono mt-auto border-t border-theme-text/5 pt-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            <span>{post.publishedAt}</span>
                                        </div>
                                        <div className="ml-auto group-hover:translate-x-1 transition-transform text-cyan-accent">
                                            READ_ENTRY →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </FadeInItem>
                    ))}
                </FadeInStagger>
            </Container>
        </div>
    );
}
