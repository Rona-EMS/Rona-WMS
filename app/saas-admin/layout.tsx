"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { SaasAdminSidebar } from "@/components/saas-admin/saas-admin-sidebar"
import { useResponsive } from "@/hooks/use-responsive"
import { ProtectedRoute } from "@/components/protected-route"

export default function SaasAdminLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useResponsive()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [user, setUser] = useState(null)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Check if the current path is the login page
  const isLoginPage = pathname === "/saas-admin/login"

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

  useEffect(() => {
    // Skip authentication checks on the login page
    if (isLoginPage) return

    // Check if user is logged in
    const storedUser = localStorage.getItem("rona_user")

    if (!storedUser) {
      // If no user is found and not on login page, redirect to login
      router.push("/saas-admin/login")
      return
    }

    const parsedUser = JSON.parse(storedUser)

    // If user exists but is not a SAAS Admin, update their role
    if (parsedUser.role !== "saas-admin") {
      const updatedUser = { ...parsedUser, role: "saas-admin" }
      localStorage.setItem("rona_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } else {
      setUser(parsedUser)
    }
  }, [isLoginPage, router])

  useEffect(() => {
    // Skip authentication checks on the login page
    if (isLoginPage) return

    // Check if user is logged in as saas-admin
    const storedUser = localStorage.getItem("rona_user")
    const user = storedUser ? JSON.parse(storedUser) : null

    // If not logged in or not a saas-admin, redirect to login
    if (!user || user.role !== "saas-admin") {
      router.push("/saas-admin/login")
    }
  }, [pathname, router, user, isLoginPage])

  // For login page, just render the children without the sidebar
  if (isLoginPage) {
    return children
  }

  // For all other pages, render with the sidebar and protected route
  return (
    <div className="flex min-h-screen bg-white">
      <div
        className={`fixed top-0 left-0 h-full z-10 transition-all duration-300 ease-in-out ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <SaasAdminSidebar mobile={isMobile} />
      </div>
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarExpanded ? "ml-64" : "ml-20"}`}>
        <main className="pb-16 md:pb-0 px-responsive py-responsive">
          <ProtectedRoute allowedRoles={["saas-admin"]}>{children}</ProtectedRoute>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
