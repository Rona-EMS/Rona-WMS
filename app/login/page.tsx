"use client"

import { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { ConsistentClock } from "@/components/consistent-clock"
import { Users, ShieldCheck, Building2, Cpu, Globe, Check, ChevronDown, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LoginPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { t, language, setLanguage } = useLanguage()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    // Store preference in localStorage
    localStorage.setItem("language", newLanguage)
  }

  // Role card data with enhanced visuals
  const roleCards = [
    {
      id: "worker",
      title: language === "en" ? "Worker App" : "የሰራተኛ መተግበሪያ",
      description:
        language === "en" ? "Clock in/out, view schedules, request leave" : "ይግቡ/ይውጡ፣ የጊዜ ሰሌዳዎችን ይመልከቱ፣ ፈቃድ ይጠይቁ",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      iconBg: "bg-blue-100",
      activeColor: "bg-blue-600 text-white",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      bgGradient: "from-blue-100 via-blue-50 to-white",
      lightBg: "bg-blue-100/70",
      accentColor: "#3b82f6", // Default blue
      route: "/worker-login",
    },
    {
      id: "admin",
      title: language === "en" ? "Admin App" : "የአስተዳዳሪ መተግበሪያ",
      description: language === "en" ? "Manage workers, shifts, and approvals" : "ሰራተኞችን፣ ፈረቃዎችን እና ፈቃዶችን ያስተዳድሩ",
      icon: <ShieldCheck className="h-5 w-5" />,
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
      iconBg: "bg-purple-100",
      activeColor: "bg-purple-600 text-white",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      bgGradient: "from-purple-100 via-purple-50 to-white",
      lightBg: "bg-purple-100/70",
      accentColor: "#9333ea", // Default purple
      route: "/admin-login",
    },
    {
      id: "owner",
      title: language === "en" ? "Owner App" : "የባለቤት መተግበሪያ",
      description:
        language === "en" ? "Business analytics, finances and KPIs" : "የንግድ ትንታኔ፣ ፋይናንስ እና የአፈጻጸም ቁልፍ አመልካቾች",
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      iconBg: "bg-emerald-100",
      activeColor: "bg-emerald-600 text-white",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      bgGradient: "from-emerald-100 via-emerald-50 to-white",
      lightBg: "bg-emerald-100/70",
      accentColor: "#059669", // Default emerald
      route: "/owner-login",
    },
    {
      id: "kiosk",
      title: language === "en" ? "Kiosk App" : "የኪዮስክ አፕሊኬሽን",
      description:
        language === "en" ? "Self-service attendance terminal for factories" : "ለፋብሪካዎች የራስ አገልግሎት የመገኘት ተርሚናል",
      icon: <Cpu className="h-5 w-5" />,
      color: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      iconBg: "bg-amber-100",
      activeColor: "bg-amber-600 text-white",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      bgGradient: "from-amber-100 via-amber-50 to-white",
      lightBg: "bg-amber-100/70",
      accentColor: "#d97706", // Default amber
      route: "/kiosk-login",
    },
  ]

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-100 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large circle in bottom right */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blue-100/30 blur-sm"></div>

        {/* Small circle in top left */}
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-purple-100/30 blur-sm"></div>
      </div>

      {/* Header with DateTime and Language Switcher */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <ConsistentClock variant="header" textColor="var(--gray-700)" />

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
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-gray-200 mb-2 shadow-sm">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">Rona Workforce Management</h1>
            <p className="text-gray-600 text-sm max-w-md mt-1">
              {language === "en" ? "Choose your application to continue" : "ለመቀጠል የእርስዎን መተግበሪያ ይምረጡ"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {roleCards.map((card) => (
            <Link href={card.route} key={card.id} className="block">
              <Card className="h-full transition-all duration-200 hover:shadow-md border-gray-200 hover:border-gray-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${card.iconBg}`}>{card.icon}</div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <CardDescription className="text-xs min-h-[40px]">{card.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${card.buttonColor}`}>{language === "en" ? "Login" : "ግባ"}</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground text-[10px]">{t("login.specialAccess")}</span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <Link href="/saas-admin/login">
                <Button variant="outline" className="w-full h-8 text-xs border-blue-800 text-blue-800 hover:bg-blue-50">
                  {t("login.saasAdmin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
