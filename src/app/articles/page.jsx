import { Card } from '@/components/ui/Card'
import { SimpleLayout } from '@/components/layouts/SimpleLayout'
import { FadeInStagger, FadeInItem } from '@/components/motion/FadeIn'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata = {
  title: 'Articles',
  description:
    'Read articles by Usama Bukhari on software engineering, AI research, and technology trends. Insights on programming, system design, and more.',
  openGraph: {
    title: 'Articles - Usama Bukhari',
    description: 'Long-form thoughts on programming, AI, and software engineering.',
    url: 'https://usamabukhari.com/articles',
    type: 'website',
  },
  alternates: {
    canonical: 'https://usamabukhari.com/articles',
  },
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing on software engineering, AI research, and life in Japan."
      intro="All of my long-form thoughts on programming, machine learning, and what I'm learning along the way, collected in chronological order."
    >
      <div className="md:border-l md:border-theme-border md:pl-6">
        <FadeInStagger className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <FadeInItem key={article.slug}>
              <Article article={article} />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </SimpleLayout>
  )
}
