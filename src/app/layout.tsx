import { Footer } from '@/components/Footer/Footer'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar'
import BasicSnackbar from '@/components/Snackbar/BasicSnackbar'
import { ThemeRegistry } from '@/components/ThemeRegistry/ThemeRegistry'
import { ClerkProvider } from '@clerk/nextjs'
import Sheet from '@mui/joy/Sheet'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import './global.css'
import { SnackbarProvider } from './store/ui/SnackbarContext'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Traquealo',
    description:
      'Construyendo un Futuro Mejor: Monitoreo y Registro de Desafíos Comunitarios',
    siteName: 'Traquealo',
    images: '/images/og-image.jpg',
    locale: 'es_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ThemeRegistry>
        <SnackbarProvider>
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
                <BasicSnackbar />
                <SpeedInsights />
                <Footer />
                <Analytics />
              </Sheet>
            </body>
            <Script src="../scripts/mailerlite.js" />
          </html>
        </SnackbarProvider>
      </ThemeRegistry>
    </ClerkProvider>
  )
}
