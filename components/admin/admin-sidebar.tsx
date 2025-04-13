"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Users,
  DollarSign,
  FileText,
  AlertTriangle,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  ListTodo,
  User,
  Calendar,
  Clock,
} from "lucide-react"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { ConsistentClock } from "@/components/consistent-clock"

interface AdminSidebarProps {
  mobile?: boolean
}

export function AdminSidebar({ mobile }: AdminSidebarProps) {
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
    const event = new CustomEvent("adminSidebarStateChange", { detail: { expanded } })
    window.dispatchEvent(event)
  }, [expanded])

  const navigateTo = (path: string) => () => {
    router.push(path)
  }

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "am" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const handleLogout = () => {
    // Show confirmation dialog
    if (window.confirm(language === "en" ? "Are you sure you want to logout?" : "መውጣት መፈለግዎን እርግጠኛ ነዎት?")) {
      logout()
      router.push("/login")
    }
  }

  if (!mounted) return null

  const sidebarNavItems = [
    {
      title: language === "en" ? "Dashboard" : "ዳሽቦርድ",
      href: "/admin/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Workers" : "ሰራተኞች",
      href: "/admin/workers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Attendance" : "መገኘት",
      href: "/admin/attendance",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Shifts" : "ሺፍቶች",
      href: "/admin/shifts",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Requests" : "ጥያቄዎች",
      href: "/admin/requests",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Tasks" : "ተግባራት",
      href: "/admin/tasks",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Payroll" : "ክፍያ",
      href: "/admin/payroll",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Emergency" : "አደጋ",
      href: "/admin/emergency",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Announcements" : "ማስታወቂያዎች",
      href: "/admin/announcements",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Security" : "ደህንነት",
      href: "/admin/security",
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  // If mobile is true, render the mobile sidebar
  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex justify-around items-center p-2">
          {sidebarNavItems.slice(0, 5).map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full p-2",
                pathname === item.href
                  ? "bg-purple-50 text-purple-600"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={navigateTo(item.href)}
            >
              {item.icon}
              <span className="sr-only">{item.title}</span>
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={navigateTo("/admin/dashboard")}>
            <Logo size="sm" />
            {expanded && (
              <span className="font-semibold text-foreground">{language === "en" ? "Admin" : "አስተዳዳሪ"}</span>
            )}
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
          {/* Regular navigation items */}
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full",
                expanded ? "justify-start px-3" : "justify-center px-0",
                pathname === item.href
                  ? "bg-purple-50 text-purple-600"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={navigateTo(item.href)}
            >
              {item.icon}
              {expanded && <span className="ml-2">{item.title}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Footer items */}
      <div className="p-3 border-t border-border">
        <div className="space-y-1">
          {/* Language switcher */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={toggleLanguage}
          >
            <span className="flex items-center justify-center w-5 h-5">🌐</span>
            {expanded && <span className="ml-2">{language === "en" ? "English" : "አማርኛ"}</span>}
          </Button>

          {/* Profile button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/admin/profile"
                ? "bg-purple-50 text-purple-600"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={navigateTo("/admin/profile")}
          >
            <User className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "My Profile" : "የእኔ መገለጫ"}</span>}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              pathname === "/admin/settings"
                ? "bg-purple-50 text-purple-600"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={navigateTo("/admin/settings")}
          >
            <Settings className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Settings" : "ቅንብሮች"}</span>}
          </Button>

          {/* Logout button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              expanded ? "justify-start px-3" : "justify-center px-0",
              "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {expanded && <span className="ml-2">{language === "en" ? "Logout" : "ውጣ"}</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
