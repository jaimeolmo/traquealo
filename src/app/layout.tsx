import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeRegistry } from "@/components/ThemeRegistry/ThemeRegistry";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traquealo",
  description: "Monitoreo de incidentes en comunidad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          {children}
          <Analytics />
        </ThemeRegistry>
      </body>
      <Script src="../scripts/mailerlite.js" />
    </html>
  );
}
