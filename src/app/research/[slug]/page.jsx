import { MDXRemote } from 'next-mdx-remote/rsc';
import { getFileBySlug, getFiles } from '@/lib/mdx';
import { Container } from '@/components/ui/Container';
import { Citation } from '@/components/mdx/Citation';
import { ScientificBackground } from '@/components/ui/ScientificBackground';
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
    return {
        title: frontMatter.title,
        description: frontMatter.summary,
    };
}

export default async function BlogPost({ params }) {
    const { content, frontMatter } = await getFileBySlug(params.slug);

    return (
        <div className="min-h-screen relative pt-24 pb-32">
            <ScientificBackground />

            <Container className="max-w-4xl mx-auto relative z-10">
                <Link href="/research" className="inline-flex items-center gap-2 text-sm text-theme-text/40 hover:text-cyan-accent mb-8 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    BACK_TO_LAB
                </Link>

                <header className="mb-12 border-b border-theme-text/10 pb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {frontMatter.tags?.map(tag => (
                            <span key={tag} className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-theme-text mb-8 leading-tight">
                        {frontMatter.title}
                    </h1>

                    <div className="flex items-center gap-8 text-sm text-theme-text/60 font-mono">
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

                <article className="prose prose-invert prose-lg max-w-none">
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
            </Container>
        </div>
    );
}
