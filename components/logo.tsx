"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useBranding } from "@/lib/context/branding-context"
import { usePathname } from "next/navigation"

interface LogoProps {
  variant?: "default" | "gradient" | "white"
  size?: "sm" | "md" | "lg"
  className?: string
  href?: string
  forceRonaLogo?: boolean
  forceClientLogo?: boolean
}

export function Logo({
  variant = "default",
  size = "md",
  className,
  href,
  forceRonaLogo = false,
  forceClientLogo = false,
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { companyLogo, companyName } = useBranding()
  const pathname = usePathname()

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  const isDarkMode = mounted && (theme === "dark" || resolvedTheme === "dark")

  // Determine if we're in a client app (Worker, Admin, Kiosk, Owner)
  const isClientApp =
    forceClientLogo ||
    (pathname &&
      (pathname.startsWith("/worker") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/owner") ||
        pathname.startsWith("/kiosk")))

  // Use Rona logo for main website, company logo for client apps
  const shouldUseCompanyLogo = isClientApp && !forceRonaLogo && companyLogo

  const sizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-12 w-auto",
  }

  const logoContent = (
    <div className={cn("flex items-center transition-opacity duration-200", className)}>
      <div
        className="relative"
        style={{
          height: size === "sm" ? "24px" : size === "md" ? "32px" : "48px",
          width: "auto",
          minWidth: size === "sm" ? "24px" : size === "md" ? "100px" : "120px",
        }}
      >
        {shouldUseCompanyLogo ? (
          // Client app - use company logo
          <img
            src={companyLogo || "/company-logo.png"}
            alt={`${companyName || "Company"} Logo`}
            className={cn(sizeClasses[size], "object-contain")}
          />
        ) : (
          // Main website - use Rona logo
          <>
            <img
              src="/rona-logo-dark.png"
              alt="Rona Logo"
              className={cn(
                sizeClasses[size],
                "object-contain absolute top-0 left-0 transition-opacity duration-200",
                isDarkMode ? "opacity-100" : "opacity-0",
              )}
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png"
              alt="Rona Logo"
              className={cn(
                sizeClasses[size],
                "object-contain absolute top-0 left-0 transition-opacity duration-200",
                isDarkMode ? "opacity-0" : "opacity-100",
              )}
            />
          </>
        )}
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{logoContent}</Link>
  }

  return logoContent
}
