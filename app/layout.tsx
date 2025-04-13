import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/context/auth-context"
import { LanguageProvider } from "@/lib/context/language-context"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BrandingProvider } from "@/lib/context/branding-context"
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rona - Workforce Management System",
  description: "Comprehensive workforce management system for Ethiopian factories",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AuthProvider>
          <LanguageProvider>
            <BrandingProvider>
              <ScrollToTop />
              {children}
              <Toaster />
            </BrandingProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'