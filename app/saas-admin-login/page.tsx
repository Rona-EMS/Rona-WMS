"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function SaasAdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, hardcoded credentials
      if (email === "admin@rona.com" && password === "admin123") {
        // Store user info in localStorage
        localStorage.setItem(
          "rona_user",
          JSON.stringify({
            id: "saas-admin-1",
            name: "SAAS Admin",
            email: email,
            role: "saas-admin",
          }),
        )

        toast({
          title: "Login successful",
          description: "Welcome to the SAAS Admin dashboard",
        })

        // Redirect to dashboard
        router.push("/saas-admin/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4">
      <div className="absolute inset-0 bg-grid-purple-500/[0.05] bg-[size:20px_20px] pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md z-10">
          <Card className="border-purple-200 dark:border-purple-800 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <Image
                  src="/rona-logo-new.png"
                  alt="Rona Logo"
                  width={150}
                  height={50}
                  className="h-12 object-contain"
                  priority
                />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                SAAS Admin Login
              </CardTitle>
              <CardDescription>Enter your credentials to access the SAAS admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-700 dark:text-purple-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                      <Input
                        id="email"
                        placeholder="admin@rona.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 border-purple-200 dark:border-purple-800 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-purple-700 dark:text-purple-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 border-purple-200 dark:border-purple-800 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-purple-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-purple-700 dark:text-purple-300">
                <span>Demo credentials: admin@rona.com / admin123</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
