import { Providers } from '@/app/providers'
import { Layout } from '@/components/layouts/Layout'

import { ThemeController } from '@/components/ui/ThemeController'
import { CommandMenu } from '@/components/ui/CommandMenu';
import 'p/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://usamabukhari.com'),
  title: {
    template: '%s - Usama Bukhari',
    default: 'Usama Bukhari - Software Engineer & Research Student',
  },
  description:
    'Usama Bukhari is a software engineer and research student at Kyushu University, Japan, specializing in full-stack development and AI research.',
  keywords: ['Usama Bukhari', 'Software Engineer', 'Research Student', 'Kyushu University', 'Full Stack Developer', 'React', 'Next.js', 'AI', 'Japan'],
  authors: [{ name: 'Usama Bukhari' }],
  creator: 'Usama Bukhari',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Usama Bukhari - Software Engineer & Research Student',
    description: 'Portfolio and personal site of Usama Bukhari.',
    url: 'https://usamabukhari.com',
    siteName: 'Usama Bukhari',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Usama Bukhari - Software Engineer & Research Student',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usama Bukhari',
    description: 'Software Engineer & Research Student at Kyushu University.',
    creator: '@usamabukhari',
  },
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Usama Bukhari',
    url: 'https://usamabukhari.com',
    sameAs: [
      'https://github.com/usama-shiranai90',
      'https://www.linkedin.com/in/syed-usama-bukhari-0a6373175',
    ],
    jobTitle: 'Software Engineer & Research Student',
    worksFor: {
      '@type': 'Organization',
      name: 'Kyushu University',
    },
  }

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <ThemeController />
          <CommandMenu />
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
