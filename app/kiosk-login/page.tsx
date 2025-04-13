"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ConsistentClock } from "@/components/consistent-clock"
import { useAuth } from "@/lib/context/auth-context"
import { Cpu, ArrowLeft, ImageIcon } from "lucide-react"

export default function KioskLoginPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [factoryId, setFactoryId] = useState("")
  const [kioskPin, setKioskPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const { login, isLoading: authLoading } = useAuth()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update the handleKioskLogin function to ensure it redirects to the kiosk app
  const handleKioskLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the auth context login function with kiosk role
      const success = await login(factoryId || "factory123", kioskPin || "123456", "kiosk")

      if (success) {
        toast({
          title: t("common.success"),
          description: language === "en" ? "Redirecting to kiosk mode..." : "ወደ ኪዮስክ ሁነታ በማዘዋወር ላይ...",
          duration: 3000,
        })

        // Explicitly redirect to the kiosk page
        router.push("/kiosk")
      }
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("login.error"),
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-100 via-amber-50 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle in bottom right */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-100/70 blur-sm"></div>

        {/* Small circle in top left */}
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-amber-100/70 blur-sm"></div>
      </div>

      {/* Header with DateTime */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <ConsistentClock variant="header" textColor="var(--amber-600)" />
      </div>

      <div className="flex flex-col items-center justify-center p-4 min-h-screen relative z-10">
        <div className="w-full max-w-4xl mb-6 text-center">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 mb-2">
              <ImageIcon className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-amber-600 text-sm font-medium">Your company logo</p>
          </div>
        </div>

        <Card className="w-full max-w-md shadow-sm backdrop-blur-sm bg-white/90 border-amber-200">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center mb-2">
              <div className="p-3 rounded-full mb-3 bg-amber-100">
                <Cpu className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-xl">{language === "en" ? "Kiosk App" : "የኪዮስክ አፕሊኬሽን"}</CardTitle>
              <CardDescription className="text-xs">
                {language === "en"
                  ? "Enter factory ID and kiosk PIN to access the attendance terminal"
                  : "የፋብሪካ መታወቂያ እና የኪዮስክ ፒን ያስገቡ የመገኘት ተርሚናል ለመድረስ"}
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleKioskLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="factoryId" className="text-xs">
                  {language === "en" ? "Worker ID" : "የሰራተኛ መታወቂያ"}
                </Label>
                <Input
                  id="factoryId"
                  value={factoryId}
                  onChange={(e) => setFactoryId(e.target.value)}
                  placeholder={language === "en" ? "Enter worker ID" : "የሰራተኛ መታወቂያ ያስገቡ"}
                  className="h-9"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="kioskPin" className="text-xs">
                  {language === "en" ? "Kiosk PIN" : "የኪዮስክ ፒን"}
                </Label>
                <Input
                  id="kioskPin"
                  type="password"
                  value={kioskPin}
                  onChange={(e) => setKioskPin(e.target.value)}
                  placeholder={language === "en" ? "Enter kiosk PIN" : "የኪዮስክ ፒን ያስገቡ"}
                  className="h-9"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-4/5 mx-auto h-9 text-white bg-amber-600 hover:bg-amber-700"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    {language === "en" ? "Logging in..." : "በመግባት ላይ..."}
                  </span>
                ) : language === "en" ? (
                  "Access Kiosk"
                ) : (
                  "ኪዮስክ ይግቡ"
                )}
              </Button>

              <Link
                href="/login"
                className="flex items-center justify-center gap-1 text-xs text-amber-600 hover:underline"
              >
                <ArrowLeft className="h-3 w-3" />
                {language === "en" ? "Back to main login" : "ወደ ዋናው መግቢያ ይመለሱ"}
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
