import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Traquealo',
  description: 'Monitoreo de incidentes en comunidad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ClerkProvider>
          <ThemeRegistry>
            {children}
            <Analytics />
          </ThemeRegistry>
        </ClerkProvider>
      </body>
      <Script src="../scripts/mailerlite.js" />
    </html>
  )
}
