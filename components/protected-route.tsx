"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import { LoadingSpinner } from "./loading-spinner"
import type { UserRole } from "@/lib/types"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      // If not logged in, redirect to login
      router.push("/login")
    } else if (!isLoading && user && !allowedRoles.includes(user.role as UserRole)) {
      // If logged in but not authorized for this route, redirect to appropriate dashboard
      switch (user.role) {
        case "worker":
          router.push("/worker/dashboard")
          break
        case "admin":
          router.push("/admin/dashboard")
          break
        case "owner":
          router.push("/owner/dashboard")
          break
        case "saas-admin":
          router.push("/saas-admin/dashboard")
          break
        default:
          router.push("/login")
      }
    }
  }, [user, isLoading, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role as UserRole)) {
    return null
  }

  return <>{children}</>
}
