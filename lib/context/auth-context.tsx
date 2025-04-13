"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { User, UserRole } from "@/lib/types"
import { users } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Check for stored user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("rona_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect authenticated users if they're on login page
  useEffect(() => {
    if (
      user &&
      !isLoading &&
      (pathname === "/login" ||
        pathname === "/worker-login" ||
        pathname === "/admin-login" ||
        pathname === "/owner-login" ||
        pathname === "/saas-admin/login" ||
        pathname === "/kiosk-login")
    ) {
      // Redirect based on user role
      if (user.role === "worker") {
        router.push("/worker/dashboard")
      } else if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "owner") {
        router.push("/owner/dashboard")
      } else if (user.role === "saas-admin") {
        router.push("/saas-admin/dashboard")
      } else if (user.role === "kiosk") {
        router.push("/kiosk")
      }
    }
  }, [user, isLoading, pathname, router])

  // Update the login function to handle the kiosk role
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if this is an OTP login
    const isOtpLogin = password.startsWith("otp-auth-")
    const loginMethod = isOtpLogin ? "OTP" : "password"

    // For demo purposes, always succeed
    const foundUser = users.find((u) => u.role === role) || {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: email
        .split("@")[0]
        .replace(/\./g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email,
      role: role,
      language: "en",
    }

    setUser(foundUser)
    localStorage.setItem("rona_user", JSON.stringify(foundUser))
    setIsLoading(false)

    toast({
      title: "Login successful",
      description: `Welcome back, ${foundUser.name}! (via ${loginMethod})`,
      duration: 3000, // Auto-dismiss after 3 seconds
    })

    // Redirect based on user role
    if (foundUser.role === "worker") {
      router.push("/worker/dashboard")
    } else if (foundUser.role === "admin") {
      router.push("/admin/dashboard")
    } else if (foundUser.role === "owner") {
      router.push("/owner/dashboard")
    } else if (foundUser.role === "saas-admin") {
      router.push("/saas-admin/dashboard")
    } else if (foundUser.role === "kiosk") {
      router.push("/kiosk")
    }

    return true
  }

  const logout = () => {
    // Store the user role before clearing the user state
    const userRole = user?.role

    // Clear user data
    setUser(null)
    localStorage.removeItem("rona_user")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000, // Auto-dismiss after 3 seconds
    })

    // Redirect based on the user's role
    if (userRole === "saas-admin") {
      router.push("/saas-admin/login")
    } else if (userRole === "worker") {
      router.push("/worker-login")
    } else if (userRole === "admin") {
      router.push("/admin-login")
    } else if (userRole === "owner") {
      router.push("/owner-login")
    } else if (userRole === "kiosk") {
      router.push("/kiosk-login")
    } else {
      // Fallback to main login
      router.push("/login")
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
