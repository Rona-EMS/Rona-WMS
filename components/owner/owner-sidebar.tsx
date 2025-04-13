"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  BarChart2,
  CreditCard,
  FileText,
  LogOut,
  Settings,
  DollarSign,
  AlertTriangle,
  Boxes,
  TrendingUp,
  Gauge,
  BugIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  MonitorSmartphone,
} from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ConsistentClock } from "@/components/consistent-clock"

interface OwnerSidebarProps {
  mobile?: boolean
}

export function OwnerSidebar({ mobile }: OwnerSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const { language, setLanguage } = useLanguage()
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
    const event = new CustomEvent("ownerSidebarStateChange", { detail: { expanded } })
    window.dispatchEvent(event)
  }, [expanded])

  const navigateTo = (path: string) => () => {
    router.push(path)
  }

  const toggleLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  if (!mounted) return null

  const sidebarItems = [
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: language === "en" ? "Dashboard" : "ዳሽቦርድ",
      path: "/owner/dashboard",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: language === "en" ? "Finances" : "ፋይናንስ",
      path: "/owner/finances",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: language === "en" ? "Profit & Loss" : "ትርፍ እና ኪሳራ",
      path: "/owner/profit-loss",
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      label: language === "en" ? "KPI Tracking" : "KPI መከታተያ",
      path: "/owner/kpi",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: language === "en" ? "Reports" : "ሪፖርቶች",
      path: "/owner/reports",
    },
    {
      icon: <Boxes className="h-5 w-5" />,
      label: language === "en" ? "Inventory" : "ዕቃዎች",
      path: "/owner/inventory",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: language === "en" ? "Subscription" : "ደንበኝነት",
      path: "/owner/subscription",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: language === "en" ? "Payroll" : "ደመወዝ",
      path: "/owner/payroll",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: language === "en" ? "Emergency" : "አደጋ",
      path: "/owner/emergency",
    },
    {
      icon: <MonitorSmartphone className="h-5 w-5" />,
      label: language === "en" ? "Kiosk Management" : "የኪዮስክ አስተዳደር",
      path: "/owner/kiosk-management",
    },
    {
      icon: <BugIcon className="h-5 w-5" />,
      label: language === "en" ? "Report Issues" : "ችግሮችን ሪፖርት አድርግ",
      path: "/owner/software-problem",
    },
  ]

  const footerItems = [
    {
      icon: <User className="h-5 w-5" />,
      label: language === "en" ? "Profile" : "ፕሮፋይል",
      path: "/owner/profile",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: language === "en" ? "Settings" : "ቅንብሮች",
      path: "/owner/settings",
    },
  ]

  // If mobile is true, render the mobile sidebar
  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex justify-around items-center p-2">
          {sidebarItems.slice(0, 5).map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full p-2",
                pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={navigateTo(item.path)}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out fixed top-0 left-0 z-40",
        expanded ? "w-64" : "w-20",
      )}
    >
      {/* Header with logo and toggle button */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <div className={cn("flex items-center", expanded ? "justify-between w-full" : "justify-center w-full")}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={navigateTo("/owner/dashboard")}>
            <Logo size="sm" />
            {expanded && <span className="font-semibold text-foreground">{language === "en" ? "Owner" : "ባለቤት"}</span>}
          </div>

          {/* Toggle button integrated in the header */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-border hover:bg-accent"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className={cn("px-4 py-2", !expanded && "flex justify-center")}>
        <ConsistentClock variant={expanded ? "default" : "compact"} />
      </div>

      {/* Main navigation items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full",
                expanded ? "justify-start px-3" : "justify-center px-0",
                pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={navigateTo(item.path)}
            >
              {item.icon}
              {expanded && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Footer items */}
      <div className="p-3 border-t border-border">
        <div className="space-y-1">
          {/* Language switcher */}
          {expanded ? (
            <Button
              variant="ghost"
              className="w-full justify-start px-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => toggleLanguage(language === "en" ? "am" : "en")}
            >
              <span className="mr-2">🌐</span>
              <span>{language === "en" ? "English" : "አማርኛ"}</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-center px-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => toggleLanguage(language === "en" ? "am" : "en")}
            >
              <span>🌐</span>
            </Button>
          )}

          {/* Profile and Settings buttons */}
          {footerItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full",
                expanded ? "justify-start px-3" : "justify-center px-0",
                pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={navigateTo(item.path)}
            >
              {item.icon}
              {expanded && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}

          {/* Logout button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Logout" : "ውጣ"}</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
