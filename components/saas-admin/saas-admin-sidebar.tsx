"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Building,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Settings,
  Users,
  Mail,
  BarChart4,
  ShieldAlert,
  AlertTriangle,
  BellRing,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ConsistentClock } from "@/components/consistent-clock"

export function SaasAdminSidebar({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const { language, t } = useLanguage()
  const [expanded, setExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // On mobile, sidebar should be collapsed by default
  useEffect(() => {
    if (mobile) {
      setExpanded(false)
    }
  }, [mobile])

  // Expose the sidebar state to the parent component
  useEffect(() => {
    // Use a custom event to communicate the sidebar state to the layout
    const event = new CustomEvent("saasAdminSidebarStateChange", { detail: { expanded } })
    window.dispatchEvent(event)
  }, [expanded])

  // Navigation handler function
  const navigateTo = (path: string) => () => {
    router.push(path)
  }

  if (!mounted) return null

  // If mobile is true, render the mobile sidebar
  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-purple-200">
        <div className="flex justify-around items-center p-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full p-2",
              pathname === "/saas-admin/dashboard"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/dashboard")}
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full p-2",
              pathname === "/saas-admin/analytics"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/analytics")}
          >
            <BarChart4 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full p-2",
              pathname === "/saas-admin/subscriptions"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/subscriptions")}
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full p-2",
              pathname.startsWith("/saas-admin/emails")
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/emails")}
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-2 text-muted-foreground hover:bg-purple-50 hover:text-purple-800"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-white border-r border-purple-100 transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-20",
      )}
    >
      {/* Header with logo and toggle button */}
      <div className="h-16 flex items-center px-4 border-b border-purple-100">
        <div className={cn("flex items-center", expanded ? "justify-between w-full" : "justify-center w-full")}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={navigateTo("/saas-admin/dashboard")}>
            {expanded ? (
              <>
                <Logo size="sm" />
                <span className="font-semibold text-purple-800">
                  {language === "en" ? "SAAS Admin" : "SAAS አስተዳዳሪ"}
                </span>
              </>
            ) : (
              <div className="flex justify-center items-center w-full">
                <div className="w-8 h-8 overflow-hidden rounded-full bg-white flex items-center justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png"
                    alt="Rona"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Toggle button integrated in the header */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-purple-100 hover:bg-purple-50"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Add the ConsistentClock component */}
      <div className={cn("px-4 py-2", !expanded && "flex justify-center")}>
        <ConsistentClock variant={expanded ? "default" : "compact"} />
      </div>

      {/* Main navigation items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/dashboard"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/dashboard")}
          >
            <BarChart3 className="h-5 w-5" />
            {expanded && <span className="ml-2">{t("common.dashboard")}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/analytics"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/analytics")}
          >
            <BarChart4 className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Usage Analytics" : "የአጠቃቀም ትንተና"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/factories"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/factories")}
          >
            <Building className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Factories" : "ፋብሪካዎች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/subscriptions"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/subscriptions")}
          >
            <Calendar className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Subscriptions" : "ደንበኝነቶች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/plans"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/plans")}
          >
            <Tag className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Custom Plans" : "ልዩ እቅዶች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/alerts"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/alerts")}
          >
            <BellRing className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Alerts System" : "የማሳወቂያ ስርዓት"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname.startsWith("/saas-admin/emails")
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/emails")}
          >
            <Mail className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Email Templates" : "ኢሜይል አብነቶች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/invoices"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/invoices")}
          >
            <FileText className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Invoices" : "ደረሰኞች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/finances"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/finances")}
          >
            <CreditCard className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Finances" : "ፋይናንስ"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/issues"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/issues")}
          >
            <AlertTriangle className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Issue Reports" : "የችግር ሪፖርቶች"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/security"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/security")}
          >
            <ShieldAlert className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Security" : "ደህንነት"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/users"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/users")}
          >
            <Users className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Users" : "ተጠቃሚዎች"}</span>}
          </Button>
        </div>
      </div>

      {/* Footer items */}
      <div className="p-3 border-t border-purple-100">
        <div className="space-y-1">
          {/* Language switcher */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={() => {
              // Toggle between languages
              const newLang = language === "en" ? "am" : "en"
              localStorage.setItem("language", newLang)
              window.location.reload()
            }}
          >
            <span className="flex items-center justify-center w-5 h-5">🌐</span>
            {expanded && <span className="ml-2">{language === "en" ? "English" : "አማርኛ"}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/saas-admin/settings"
                ? "bg-purple-100 text-purple-800"
                : "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={navigateTo("/saas-admin/settings")}
          >
            <Settings className="h-5 w-5" />
            {expanded && <span className="ml-2">{t("common.settings")}</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              "text-muted-foreground hover:bg-purple-50 hover:text-purple-800",
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {expanded && <span className="ml-2">{t("common.logout")}</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
