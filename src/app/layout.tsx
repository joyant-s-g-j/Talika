import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/store/provider'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'

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
        <Provider defaultTheme='light'>
          <ThemeProvider attribute="class" defaultTheme='light'>
            <Providers>
              {children}
            </Providers>
            <Toaster />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
