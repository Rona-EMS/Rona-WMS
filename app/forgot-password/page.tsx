"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Mail, KeyRound, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ConsistentClock } from "@/components/consistent-clock"
import { useLanguage } from "@/lib/context/language-context"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "code" | "newPassword" | "success">("email")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { t, language } = useLanguage()

  const userType = searchParams.get("type") || "worker"

  // Determine colors based on user type
  const getColors = () => {
    switch (userType) {
      case "admin":
        return {
          bg: "from-purple-100 via-purple-50 to-white",
          lightBg: "bg-purple-100/70",
          accent: "purple",
          textColor: "var(--purple-600)",
        }
      case "owner":
        return {
          bg: "from-emerald-100 via-emerald-50 to-white",
          lightBg: "bg-emerald-100/70",
          accent: "emerald",
          textColor: "var(--emerald-600)",
        }
      case "kiosk":
        return {
          bg: "from-amber-100 via-amber-50 to-white",
          lightBg: "bg-amber-100/70",
          accent: "amber",
          textColor: "var(--amber-600)",
        }
      case "saas-admin":
        return {
          bg: "from-blue-900 via-blue-800 to-blue-950",
          lightBg: "bg-blue-700/10",
          accent: "blue",
          textColor: "#ffffff",
        }
      default:
        return {
          bg: "from-blue-100 via-blue-50 to-white",
          lightBg: "bg-blue-100/70",
          accent: "blue",
          textColor: "var(--blue-600)",
        }
    }
  }

  const colors = getColors()
  const isDarkBg = userType === "saas-admin"

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code.",
        duration: 3000,
      })

      setStep("code")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, any 6-digit code works
      if (verificationCode.length === 6) {
        toast({
          title: "Code Verified",
          description: "Please set your new password.",
          duration: 3000,
        })

        setStep("newPassword")
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid 6-digit verification code.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate passwords
      if (newPassword.length < 8) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive",
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
          duration: 5000,
        })
        setIsLoading(false)
        return
      }

      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
        duration: 3000,
      })

      setStep("success")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    if (userType === "saas-admin") {
      router.push("/saas-admin/login")
    } else {
      router.push("/login")
    }
  }

  if (!mounted) return null

  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br ${colors.bg} overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle in bottom right */}
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full ${colors.lightBg} blur-sm`}></div>

        {/* Small circle in top left */}
        <div className={`absolute -top-10 -left-10 w-72 h-72 rounded-full ${colors.lightBg} blur-sm`}></div>

        {/* Decorative wave for SAAS Admin */}
        {isDarkBg && (
          <svg className="absolute bottom-0 left-0 w-full opacity-10" height="120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64 C320,120 420,20 1200,80 L1200,120 L0,120 Z" fill="#2563eb" />
          </svg>
        )}
      </div>

      {/* Header with DateTime */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <ConsistentClock variant="header" textColor={colors.textColor} />

        {/* Back to Login Button */}
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${isDarkBg ? "text-white hover:bg-blue-800/30 hover:text-blue-200" : `text-${colors.accent}-600 hover:bg-${colors.accent}-50`}`}
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center p-4 min-h-screen relative z-10">
        <div className="w-full max-w-4xl mb-6 text-center">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkBg ? "text-white" : `text-${colors.accent}-600`}`}>Rona</h1>
          <p className={isDarkBg ? "text-blue-200 text-sm" : "text-gray-600 text-sm"}>
            {userType === "saas-admin" ? "SAAS Admin Portal - Password Recovery" : "Password Recovery"}
          </p>
        </div>

        <Card className="w-full max-w-md shadow-sm backdrop-blur-sm bg-white/90">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-2">
              <div className={`p-2 rounded-full bg-${colors.accent}-100`}>
                {step === "email" && <Mail className={`h-6 w-6 text-${colors.accent}-700`} />}
                {step === "code" && <KeyRound className={`h-6 w-6 text-${colors.accent}-700`} />}
                {(step === "newPassword" || step === "success") && (
                  <CheckCircle className={`h-6 w-6 text-${colors.accent}-700`} />
                )}
              </div>
            </div>
            <CardTitle className="text-xl">
              {step === "email" && "Forgot Password"}
              {step === "code" && "Verify Code"}
              {step === "newPassword" && "Reset Password"}
              {step === "success" && "Password Reset"}
            </CardTitle>
            <CardDescription className="text-xs">
              {step === "email" && "Enter your email to receive a verification code"}
              {step === "code" && "Enter the verification code sent to your email"}
              {step === "newPassword" && "Create a new password for your account"}
              {step === "success" && "Your password has been reset successfully"}
            </CardDescription>
          </CardHeader>

          {step === "email" && (
            <form onSubmit={handleSendVerificationCode}>
              <CardContent className="space-y-3 pt-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button
                  type="submit"
                  className={`w-4/5 mx-auto h-9 text-white bg-${colors.accent}-600 hover:bg-${colors.accent}-700`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Sending Code...
                    </span>
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleVerifyCode}>
              <CardContent className="space-y-3 pt-4">
                <div className="space-y-1">
                  <Label htmlFor="verificationCode" className="text-xs">
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    className="h-9 text-center tracking-widest font-mono text-lg"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground text-center mt-1">
                    Enter the 6-digit code sent to {email}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button
                  type="submit"
                  className={`w-4/5 mx-auto h-9 text-white bg-${colors.accent}-600 hover:bg-${colors.accent}-700`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
                <div className="text-center w-full">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className={`text-xs underline-offset-4 hover:underline text-${colors.accent}-600`}
                  >
                    Back to Email
                  </button>
                </div>
              </CardFooter>
            </form>
          )}

          {step === "newPassword" && (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-3 pt-4">
                <div className="space-y-1">
                  <Label htmlFor="newPassword" className="text-xs">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-9"
                    required
                    minLength={8}
                  />
                  <p className="text-[10px] text-muted-foreground">Password must be at least 8 characters long</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-xs">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-9"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button
                  type="submit"
                  className={`w-4/5 mx-auto h-9 text-white bg-${colors.accent}-600 hover:bg-${colors.accent}-700`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Resetting Password...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}

          {step === "success" && (
            <>
              <CardContent className="pt-4 pb-2 text-center">
                <div
                  className={`p-6 rounded-full mx-auto w-16 h-16 flex items-center justify-center bg-${colors.accent}-100 mb-4`}
                >
                  <CheckCircle className={`h-8 w-8 text-${colors.accent}-700`} />
                </div>
                <p className="text-sm mb-4">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 pt-2">
                <Button
                  type="button"
                  className={`w-4/5 mx-auto h-9 text-white bg-${colors.accent}-600 hover:bg-${colors.accent}-700`}
                  onClick={handleBackToLogin}
                >
                  Return to Login
                </Button>
              </CardFooter>
            </>
          )}

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
                {userType === "saas-admin"
                  ? "This portal is for authorized SAAS administrators only"
                  : "Password recovery for Rona workforce management system"}
              </div>

              {/* Back to Main Login button inside card */}
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center justify-center gap-1 mx-auto ${isDarkBg ? "text-blue-700 border-blue-200 hover:bg-blue-50" : `text-${colors.accent}-700 border-${colors.accent}-200 hover:bg-${colors.accent}-50`}`}
                onClick={handleBackToLogin}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span className="text-xs">Back to Login</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
