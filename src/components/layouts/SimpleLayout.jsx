import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/motion/FadeIn'

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <FadeIn>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold font-heading tracking-tight text-theme-text sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base text-theme-text/80">
            {intro}
          </p>
        </header>
      </FadeIn>
      {children && (
        <FadeIn delay={0.1}>
          <div className="mt-16 sm:mt-20">{children}</div>
        </FadeIn>
      )}
    </Container>
  )
}
