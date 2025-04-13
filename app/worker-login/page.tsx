"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ConsistentClock } from "@/components/consistent-clock"
import { useAuth } from "@/lib/context/auth-context"
import { Users, ArrowLeft, Globe, Check, ChevronDown, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function WorkerLoginPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("password")
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { t, language, setLanguage } = useLanguage()
  const { login, isLoading: authLoading } = useAuth()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    // Store preference in localStorage
    localStorage.setItem("language", newLanguage)
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the auth context login function
      const success = await login(email || "demo@rona.com", password || "password", "worker")

      if (success) {
        toast({
          title: t("common.success"),
          description: language === "en" ? "Redirecting to worker dashboard..." : "ወደ ሰራተኛ ዳሽቦርድ በማዘዋወር ላይ...",
          duration: 3000,
        })
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

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // If OTP field is empty, use the generated OTP
      const otpToVerify = otp || generatedOtp

      // For demo purposes, any 6-digit OTP or the generated OTP works
      if (otpToVerify.length === 6 || otpToVerify === generatedOtp) {
        // Use the auth context login function with a special prefix to indicate OTP login
        const success = await login(email || "demo@rona.com", `otp-auth-${otpToVerify}`, "worker")

        if (success) {
          toast({
            title: t("login.otpVerified"),
            description: language === "en" ? "Redirecting to worker dashboard..." : "ወደ ሰራተኛ ዳሽቦርድ በማዘዋወር ላይ...",
            duration: 3000,
          })
        }
      } else {
        toast({
          title: t("login.invalidOtp"),
          description: t("login.enterValidOtp"),
          variant: "destructive",
          duration: 5000,
        })
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

  const sendOtp = () => {
    // Generate a random 6-digit OTP
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)

    toast({
      title: t("login.otpGenerated"),
      description:
        language === "en"
          ? "For demo purposes, the code is displayed below. In production, this would be sent via SMS."
          : "ለማሳያ ዓላማዎች፣ ኮዱ ከዚህ በታች ይታያል። በምርት ላይ፣ ይህ በኤስኤምኤስ በኩል ይላካል።",
    })
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-blue-50 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle in bottom right */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-100/70 blur-sm"></div>

        {/* Small circle in top left */}
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-blue-100/70 blur-sm"></div>
      </div>

      {/* Header with DateTime and Language Switcher */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <ConsistentClock variant="header" textColor="var(--blue-600)" />

        {/* Enhanced Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 h-8 px-3 bg-white/80 backdrop-blur-sm"
            >
              <Globe className="h-4 w-4 mr-1" />
              <span>{language === "en" ? "English" : "አማርኛ"}</span>
              <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => changeLanguage("en")}
              className="flex items-center justify-between cursor-pointer"
            >
              English {language === "en" && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("am")}
              className="flex items-center justify-between cursor-pointer"
            >
              አማርኛ {language === "am" && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col items-center justify-center p-4 min-h-screen relative z-10">
        <div className="w-full max-w-4xl mb-6 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center mb-2">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 mb-2">
              <ImageIcon className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-blue-600 text-sm font-medium">Your company logo</p>
          </div>
        </div>

        <Card className="w-full max-w-md shadow-sm backdrop-blur-sm bg-white/90 border-blue-200">
          <CardHeader className="pb-2 pt-2 text-center">
            <div className="flex flex-col items-center mb-2">
              <div className="p-2 rounded-full mb-2 bg-blue-100">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {language === "en" ? "Worker App Login" : "የሰራተኛ መተግበሪያ መግቢያ"}
                </CardTitle>
                <CardDescription className="text-xs">
                  {language === "en"
                    ? "Enter your credentials to access the worker dashboard"
                    : "የእርስዎን ማረጋገጫዎች ያስገቡ ወደ ሰራተኛ ዳሽቦርድ ለመድረስ"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2 h-9">
                <TabsTrigger value="password" className="text-xs">
                  {language === "en" ? "E-mail" : "ኢሜይል"}
                </TabsTrigger>
                <TabsTrigger value="otp" className="text-xs">
                  {t("login.otp")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="password">
              <form onSubmit={handlePasswordLogin}>
                <CardContent className="space-y-3 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      {t("common.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "en" ? "m.example@rona.com" : "ም.ምሳሌ@rona.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs">
                        {t("common.password")}
                      </Label>
                      <Link
                        href="/forgot-password?type=worker"
                        className="text-xs underline-offset-4 hover:underline text-blue-600"
                      >
                        {t("login.forgotPassword")}
                      </Link>
                    </div>
                    <Input
                      id="password"
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
                        {t("login.loggingIn")}
                      </span>
                    ) : (
                      t("common.login")
                    )}
                  </Button>
                  <div className="text-center w-full">
                    <span className="text-xs text-muted-foreground">{t("login.noAccount")}</span>{" "}
                    <Link href="/register" className="text-xs underline-offset-4 hover:underline text-blue-600">
                      {t("login.register")}
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <form onSubmit={handleOtpLogin}>
                <CardContent className="space-y-3 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-xs">
                      {t("common.phoneNumber")}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+251 91 234 5678"
                        defaultValue="+251 "
                        required
                        className="flex-1 h-9"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={sendOtp}
                        className="h-9 text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        {t("login.sendOtp")}
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {language === "en"
                        ? "Ethiopian phone number format: +251 9X XXX XXXX"
                        : "የኢትዮጵያ ስልክ ቁጥር ቅርጸት: +251 9X XXX XXXX"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="otp" className="text-xs">
                      {t("login.oneTimePassword")}
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="h-9"
                    />
                  </div>
                  {generatedOtp && (
                    <div className="mt-1 p-2 bg-blue-100 rounded-md border border-blue-200 text-center">
                      <p className="text-[10px] text-blue-700 mb-1">{t("login.yourOtpCode")}</p>
                      <p className="text-lg font-mono font-bold tracking-widest text-blue-700">{generatedOtp}</p>
                    </div>
                  )}
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
                        {t("login.verifying")}
                      </span>
                    ) : (
                      t("login.verifyAndLogin")
                    )}
                  </Button>
                  <div className="text-center w-full">
                    <span className="text-xs text-muted-foreground">{t("login.noAccount")}</span>{" "}
                    <Link href="/register" className="text-xs underline-offset-4 hover:underline text-blue-600">
                      {t("login.register")}
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>

          <div className="px-6 pb-4 pt-1">
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground text-[10px]">{t("login.otherApps")}</span>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Link href="/admin-login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    {language === "en" ? "Admin App" : "የአስተዳዳሪ መተግበሪያ"}
                  </Button>
                </Link>
                <Link href="/owner-login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    {language === "en" ? "Owner App" : "የባለቤት መተግበሪያ"}
                  </Button>
                </Link>
              </div>
              <Link href="/login" className="mx-auto">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500">
                  <ArrowLeft className="h-3 w-3" />
                  {language === "en" ? "Back to main login" : "ወደ ዋናው መግቢያ ይመለሱ"}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
