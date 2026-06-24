import { Container } from '@/components/ui/Container'

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold font-heading tracking-tight text-theme-text sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-theme-text/80">
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
