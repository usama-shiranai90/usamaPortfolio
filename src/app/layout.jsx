import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '/public/resource/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Usama Bukhari',
    default:
      'Usama Bukhari - Software Engineer & Research student',
  },
  description:
    'I’m Usama, a software engineer and research student at Kyushu University - Japan.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
