import Link from 'next/link'
import { SimpleLayout } from '@/components/layouts/SimpleLayout'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata = {
  title: 'Speaking',
  description:
    'Public speaking history and upcoming events for Usama Bukhari. Talks on software engineering, AI, and research.',
  openGraph: {
    title: 'Speaking - Usama Bukhari',
    description: 'Conference talks, podcast interviews, and public speaking events.',
    url: 'https://usamabukhari.com/speaking',
    type: 'website',
  },
  alternates: {
    canonical: 'https://usamabukhari.com/speaking',
  },
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="Open to conference talks, podcasts, and research collaborations."
      intro="I enjoy exchanging ideas in real time — there’s far more bandwidth in a live conversation than in writing. If you’d like me to speak at your event, join a podcast, or collaborate on research, I’d love to hear from you."
    >
      <FadeIn>
        <div className="max-w-2xl rounded-2xl border border-theme-border p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-theme-muted">
            講演記録 — Talk Log
          </p>
          <p className="mt-4 text-base text-theme-muted">
            No public talks are listed here yet. When recordings and slides
            exist, this is where they’ll live.
          </p>
          <p className="mt-6">
            <Link
              href="/#contact"
              className="text-sm font-medium text-cyan-accent transition-colors hover:text-cyan-accent/80"
            >
              Get in touch →
            </Link>
          </p>
        </div>
      </FadeIn>
    </SimpleLayout>
  )
}
