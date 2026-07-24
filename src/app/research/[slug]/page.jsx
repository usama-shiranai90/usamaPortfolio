import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import { Container } from '@/components/ui/Container';
import { Citation } from '@/components/mdx/Citation';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
import { FadeIn } from '@/components/motion/FadeIn';
import { Tag } from '@/components/ui/Tag';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';

const components = {
    Citation,
    h1: (props) => <h1 {...props} className="text-3xl font-bold font-heading text-theme-text mt-12 mb-6" />,
    h2: (props) => <h2 {...props} className="text-2xl font-bold font-heading text-theme-text mt-10 mb-4 border-l-4 border-cyan-accent pl-4" />,
    h3: (props) => <h3 {...props} className="text-xl font-bold font-heading text-theme-text mt-8 mb-3" />,
    p: (props) => <p {...props} className="text-theme-text/80 leading-relaxed mb-6 font-light text-lg" />,
    ul: (props) => <ul {...props} className="list-disc pl-6 mb-6 text-theme-text/80 space-y-2" />,
    ol: (props) => <ol {...props} className="list-decimal pl-6 mb-6 text-theme-text/80 space-y-2" />,
    li: (props) => <li {...props} className="pl-1" />,
    blockquote: (props) => <blockquote {...props} className="border-l-4 border-theme-text/20 pl-4 py-2 italic text-theme-text/60 my-6 bg-theme-text/5 rounded-r-lg" />,
    pre: (props) => <pre {...props} className="rounded-lg overflow-x-auto my-6 border border-theme-text/10 shadow-xl" />,
    code: (props) => <code {...props} className="font-mono text-sm" />,
    div: (props) => {
        if (props.className?.includes('math-display')) {
            return <div {...props} className="overflow-x-auto py-4 my-4 text-center text-lg" />;
        }
        return <div {...props} />;
    }
};

export async function generateStaticParams() {
    const files = await getFiles();
    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }) {
    const { frontMatter } = await getFileBySlug(params.slug);
    const title = `${frontMatter.title} - Research by Usama Bukhari`;
    const description = frontMatter.summary;
    const url = `https://usamabukhari.com/research/${params.slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: frontMatter.publishedAt,
            authors: [frontMatter.author || 'Usama Bukhari'],
            url,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function BlogPost({ params }) {
    const { content, frontMatter } = await getFileBySlug(params.slug);

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'ScholarlyArticle',
            headline: frontMatter.title,
            description: frontMatter.summary,
            datePublished: frontMatter.publishedAt,
            dateModified: frontMatter.publishedAt,
            author: {
                '@type': 'Person',
                name: frontMatter.author || 'Usama Bukhari',
                url: 'https://usamabukhari.com',
            },
            publisher: {
                '@type': 'Organization',
                name: 'Usama Bukhari',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://usamabukhari.com/images/logo.png',
                },
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://usamabukhari.com/research/${params.slug}`,
            },
            keywords: frontMatter.tags ? frontMatter.tags.join(', ') : '',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://usamabukhari.com',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Research',
                    item: 'https://usamabukhari.com/research',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: frontMatter.title,
                    item: `https://usamabukhari.com/research/${params.slug}`,
                },
            ],
        }
    ];

    return (
        <div className="min-h-screen relative pt-24 pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ScientificBackground />

            <Container className="max-w-4xl mx-auto relative z-10">
                <FadeIn>
                    <Link href="/research" className="group mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-theme-muted transition-colors hover:text-cyan-accent">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        BACK_TO_LAB
                    </Link>

                    <header className="mb-12 border-b border-theme-border pb-12">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {frontMatter.tags?.map(tag => (
                                <Tag key={tag} active className="uppercase">
                                    {tag}
                                </Tag>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-theme-text mb-8 leading-tight">
                            {frontMatter.title}
                        </h1>

                        <div className="flex items-center gap-8 text-sm text-theme-muted font-mono">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-cyan-accent/20 flex items-center justify-center text-cyan-accent">
                                    <User size={16} />
                                </div>
                                <span>{frontMatter.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{frontMatter.publishedAt}</span>
                            </div>
                        </div>
                    </header>
                </FadeIn>

                <FadeIn delay={0.1} y={16}>
                    <article className="prose dark:prose-invert prose-lg max-w-none">
                        <MDXRemote
                            source={content}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
                                    rehypePlugins: [rehypeKatex, rehypeHighlight],
                                },
                            }}
                            components={components}
                        />
                    </article>
                </FadeIn>
            </Container>
        </div>
    );
}
