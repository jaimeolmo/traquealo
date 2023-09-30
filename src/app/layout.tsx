import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

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
