import { Footer } from '@/components/Footer/Footer'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry'
import { ClerkProvider } from '@clerk/nextjs'
import Sheet from '@mui/joy/Sheet'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ThemeRegistry>
        <html lang="es">
          <body>
            <Sheet
              sx={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                minHeight: '100vh',
              }}
            >
              <HeaderBar />
              {children}
              <Footer />
              <Analytics />
            </Sheet>
          </body>
          <Script src="../scripts/mailerlite.js" />
        </html>
      </ThemeRegistry>
    </ClerkProvider>
  )
}
