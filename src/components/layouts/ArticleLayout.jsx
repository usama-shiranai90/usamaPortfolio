'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/ui/Container'
import { Prose } from '@/components/ui/Prose'
import { FadeIn } from '@/components/motion/FadeIn'
import { formatDate } from '@/lib/formatDate'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({ article, children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              datePublished: article.date,
              dateModified: article.date,
              description: article.description,
              author: {
                '@type': 'Person',
                name: 'Usama Bukhari',
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
                '@id': `https://usamabukhari.com/articles/${article.slug}`,
              },
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
                  name: 'Articles',
                  item: 'https://usamabukhari.com/articles',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: `https://usamabukhari.com/articles/${article.slug}`,
                },
              ],
            }
          ]),
        }}
      />
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-theme-muted transition-colors hover:text-cyan-accent"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-current transition-transform group-hover:-translate-x-1" />
              BACK_TO_ARTICLES
            </button>
          )}
          <article>
            <FadeIn>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-theme-text sm:text-5xl">
                  {article.title}
                </h1>
                <time
                  dateTime={article.date}
                  className="order-first flex items-center text-base text-theme-muted"
                >
                  <span className="h-4 w-0.5 rounded-full bg-cyan-accent" />
                  <span className="ml-3">{formatDate(article.date)}</span>
                </time>
              </header>
            </FadeIn>
            <FadeIn delay={0.1} y={16}>
              <Prose className="mt-8" data-mdx-content>
                {children}
              </Prose>
            </FadeIn>
          </article>
        </div>
      </div>
    </Container>
  )
}
