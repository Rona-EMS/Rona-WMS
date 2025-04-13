"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ConsistentClock } from "@/components/consistent-clock"
import { useAuth } from "@/lib/context/auth-context"

export default function SaasAdminLoginPage() {
  const [email, setEmail] = useState("admin@rona.com")
  const [password, setPassword] = useState("admin123")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoading: authLoading } = useAuth()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the auth context login function
      const success = await login(email || "admin@rona.com", password || "admin123", "saas-admin")

      if (success) {
        toast({
          title: "Login Successful",
          description: "Redirecting to SAAS Admin dashboard...",
          duration: 3000,
        })

        // The redirection will be handled by the auth context
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle in bottom right */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-700/10 blur-sm"></div>

        {/* Small circle in top left */}
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-blue-700/5 blur-sm"></div>

        {/* Decorative wave */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" height="120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C320,120 420,20 1200,80 L1200,120 L0,120 Z" fill="#2563eb" />
        </svg>
      </div>

      {/* Header with DateTime */}
      <div className="fixed top-0 left-0 right-0 z-10 p-4">
        <ConsistentClock variant="header" textColor="#ffffff" />
      </div>

      <div className="flex flex-col items-center justify-center p-4 min-h-screen relative z-10">
        <div className="w-full max-w-4xl mb-2 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center mb-0">
            <div className="w-32 h-32 flex items-center justify-center">
              <img src="/rona-logo-purple.png" alt="Rona Logo" className="w-28 h-28 object-contain" />
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md shadow-sm backdrop-blur-sm bg-white/90">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-full bg-blue-100">
                <ShieldCheck className="h-6 w-6 text-blue-700" />
              </div>
            </div>
            <CardTitle className="text-xl">SAAS Admin Login</CardTitle>
            <CardDescription className="text-xs">Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-3 pt-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@rona.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-9"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-2">
              <Button
                type="submit"
                className="w-4/5 mx-auto h-9 text-white bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="text-center w-full">
                <Link
                  href="/forgot-password?type=saas-admin"
                  className="text-xs underline-offset-4 hover:underline text-blue-600"
                >
                  Forgot Password?
                </Link>
              </div>
            </CardFooter>
          </form>

          <div className="px-6 pb-4 pt-1">
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground text-[10px]">SECURE ACCESS</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500 mb-3">
                This portal is for authorized SAAS administrators only
              </div>

              {/* Back to Main Login button inside card */}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center justify-center gap-1 mx-auto text-blue-700 border-blue-200 hover:bg-blue-50"
                onClick={handleBackToLogin}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="text-xs">Back to Main Login</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
