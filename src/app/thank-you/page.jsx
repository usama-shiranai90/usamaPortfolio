import { SimpleLayout } from '@/components/layouts/SimpleLayout'
import { FadeIn } from '@/components/motion/FadeIn'

export const metadata = {
  title: 'You’re subscribed',
  description: 'Thank you for subscribing to the Usama Bukhari newsletter. Stay tuned for updates on software engineering and AI.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ThankYou() {
  return (
    <FadeIn>
      <SimpleLayout
        title="Thanks for subscribing."
        intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
      />
    </FadeIn>
  )
}
