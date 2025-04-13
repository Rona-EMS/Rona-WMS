"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { OwnerSidebar } from "@/components/owner/owner-sidebar"
import { ProtectedRoute } from "@/components/protected-route"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useResponsive } from "@/hooks/use-responsive"
import { cn } from "@/lib/utils"
import { NfcScannerButton } from "@/components/nfc-scanner-button"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsive()
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarStateChange = (event: Event) => {
      const customEvent = event as CustomEvent
      setSidebarExpanded(customEvent.detail.expanded)
    }

    window.addEventListener("ownerSidebarStateChange", handleSidebarStateChange as EventListener)

    return () => {
      window.removeEventListener("ownerSidebarStateChange", handleSidebarStateChange as EventListener)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Only show sidebar on desktop */}
      {!isMobile && (
        <aside
          className={cn(
            "fixed inset-y-0 z-50 flex h-full flex-col border-r border-border bg-card transition-all duration-300",
            sidebarExpanded ? "w-64" : "w-20",
          )}
        >
          <OwnerSidebar />
        </aside>
      )}

      {/* Main content */}
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          !isMobile ? (sidebarExpanded ? "pl-64" : "pl-20") : "pl-0",
        )}
      >
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          <ProtectedRoute allowedRoles={["owner"]}>{children}</ProtectedRoute>
        </div>
      </main>

      {/* Mobile navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
          <OwnerSidebar mobile />
        </div>
      )}

      {/* NFC Scanner Button */}
      <NfcScannerButton />

      <ScrollToTop />
    </div>
  )
}
