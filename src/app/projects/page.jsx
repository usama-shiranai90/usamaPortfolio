import { SimpleLayout } from '@/components/layouts/SimpleLayout'
import { GithubProjectCard } from '@/components/ui/GithubProjectCard'
import { FadeInStagger, FadeInItem } from '@/components/motion/FadeIn'
import { getGithubProjects } from '@/lib/github'

export const metadata = {
    title: 'Projects',
    description: 'Showcase of software engineering and research projects by Usama Bukhari.',
    openGraph: {
        title: 'Projects - Usama Bukhari',
        description: 'Explore web applications, AI research, and open source contributions by Usama Bukhari.',
        url: 'https://usamabukhari.com/projects',
        type: 'website',
    },
    alternates: {
        canonical: 'https://usamabukhari.com/projects',
    },
}

// Revalidate every 24 hours to keep projects fresh without hitting rate limits on every request
export const revalidate = 86400;

export default async function Projects() {
    const projects = await getGithubProjects();

    return (
        <SimpleLayout
            title="Things I’ve made trying to put my dent in the universe."
            intro="A live showcase of my development work and public repositories from GitHub. These projects range from personal experiments to full-fledged applications."
        >
            {projects.length > 0 ? (
                <FadeInStagger
                    role="list"
                    className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <FadeInItem key={project.id} role="listitem" className="h-full">
                            <GithubProjectCard project={project} />
                        </FadeInItem>
                    ))}
                </FadeInStagger>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-theme-border bg-theme-card/50 py-24 text-center font-mono">
                    <p className="text-xs uppercase tracking-[0.3em] text-theme-muted">[ SIGNAL_LOST ]</p>
                    <p className="text-sm text-theme-muted">
                        Unable to load projects at this time.
                    </p>
                    <a
                        href="https://github.com/usama-shiranai90"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs uppercase tracking-widest text-cyan-accent hover:underline"
                    >
                        github.com/usama-shiranai90 →
                    </a>
                </div>
            )}
        </SimpleLayout>
    )
}
