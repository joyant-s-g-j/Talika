import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Provider } from '@/components/ui/provider'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talika',
  description: 'Task manager app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/talika.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme='light'>
          <Provider>
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
