"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { SaasAdminSidebar } from "@/components/saas-admin/saas-admin-sidebar"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"

interface AppLayoutProps {
  children: React.ReactNode
}

export function SaasAdminLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
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

    window.addEventListener("saasAdminSidebarStateChange", handleSidebarStateChange as EventListener)

    return () => {
      window.removeEventListener("saasAdminSidebarStateChange", handleSidebarStateChange as EventListener)
    }
  }, [])

  // Check if the current path is the login page
  const isLoginPage = pathname === "/saas-admin/login"

  useEffect(() => {
    // Skip authentication checks on the login page
    if (isLoginPage) return

    // Check if user exists and is a saas-admin
    const user = JSON.parse(localStorage.getItem("rona_user") || "{}")
    if (!user || !user.id) {
      router.push("/saas-admin/login")
    } else if (user.role !== "saas-admin") {
      router.push("/login")
    }
  }, [router, isLoginPage])

  if (!mounted) {
    return null
  }

  // For login page, just render the children without the sidebar
  if (isLoginPage) {
    return <>{children}</>
  }

  // For all other pages, render with the sidebar
  return (
    <div className="flex min-h-screen bg-white text-foreground">
      <div
        className={`fixed top-0 left-0 h-full z-10 transition-all duration-300 ease-in-out ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <SaasAdminSidebar />
      </div>
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarExpanded ? "ml-64" : "ml-20"}`}>
        <main className="p-8 max-h-screen overflow-y-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
