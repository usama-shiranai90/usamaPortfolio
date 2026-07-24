import Link from 'next/link'
import Image from 'next/image'
import { Star, GitFork, Globe, Github } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'

const MAX_VISIBLE_TAGS = 4

export function GithubProjectCard({ project }) {
    const tags = project.tags || []
    const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS)
    const overflowCount = tags.length - visibleTags.length

    return (
        <div className="group relative flex h-full flex-col items-start justify-between overflow-hidden rounded-2xl border border-theme-border bg-theme-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-accent/30 hover:bg-theme-elevated hover:shadow-glow-accent">
            {/* Hover Image Reveal */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-accent/60 via-transparent to-transparent" />
                )}
                {/* Gradient overlay to ensure text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-card via-transparent to-transparent" />
            </div>

            <div className="z-10 flex h-full w-full flex-col items-start">
                {/* Header */}
                <div className="flex w-full items-center justify-between">
                    <div className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-theme-border bg-theme-elevated">
                        <Github aria-hidden="true" className="h-5 w-5 text-theme-muted" />
                    </div>
                    {project.homepage && (
                        <Link
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit live site for ${project.name}`}
                            className="relative z-20 text-theme-muted transition-colors hover:text-cyan-accent"
                        >
                            <Globe aria-hidden="true" className="h-5 w-5" />
                        </Link>
                    )}
                </div>

                {/* Title */}
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-theme-text">
                    <Link href={project.html_url} target="_blank" rel="noopener noreferrer">
                        <span className="absolute inset-0 z-10" />
                        <span className="relative z-20">{project.name}</span>
                    </Link>
                </h2>

                {/* Description */}
                <p className="relative z-20 mt-2 flex-grow text-sm text-theme-muted line-clamp-3">
                    {project.description || "No description provided."}
                </p>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="relative z-20 mt-4 flex flex-wrap gap-2">
                        {visibleTags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                        {overflowCount > 0 && <Tag>+{overflowCount}</Tag>}
                    </div>
                )}

                {/* Footer stats */}
                <div className="relative z-20 mt-6 flex w-full items-center space-x-4 text-xs font-medium text-theme-muted">
                    {project.language && (
                        <div className="flex items-center space-x-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-cyan-accent" />
                            <span>{project.language}</span>
                        </div>
                    )}

                    {project.stargazers_count !== undefined && project.stargazers_count !== null && project.stargazers_count >= 0 && (
                        <div className="flex items-center space-x-1 transition-colors hover:text-cyan-accent">
                            <Star aria-hidden="true" className="h-3.5 w-3.5" />
                            <span className="sr-only">Stars:</span>
                            <span>{project.stargazers_count}</span>
                        </div>
                    )}

                    {project.forks_count !== undefined && project.forks_count !== null && project.forks_count >= 0 && (
                        <div className="flex items-center space-x-1 transition-colors hover:text-theme-text">
                            <GitFork aria-hidden="true" className="h-3.5 w-3.5" />
                            <span className="sr-only">Forks:</span>
                            <span>{project.forks_count}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
