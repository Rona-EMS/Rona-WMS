"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { cn } from "@/lib/utils"
import { Clock, Calendar } from "lucide-react"
import { useBranding } from "@/lib/context/branding-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConsistentClockProps {
  className?: string
  showIcons?: boolean
  variant?: "default" | "compact" | "header"
  textColor?: string
}

export function ConsistentClock({ className, showIcons = true, variant = "default", textColor }: ConsistentClockProps) {
  const { language } = useLanguage()
  const branding = useBranding()
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // Use provided text color or calculate based on background
  const clockTextColor = textColor || branding?.primaryColor || "currentColor"

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format date based on language
  const formatDate = () => {
    if (language === "en") {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return currentDateTime.toLocaleDateString("en-US", options)
    } else {
      // Ethiopian date formatting logic (from DateTimeDisplay)
      const gregorianYear = currentDateTime.getFullYear()
      const gregorianMonth = currentDateTime.getMonth() + 1
      const gregorianDay = currentDateTime.getDate()

      // Ethiopian calendar months
      const months = ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"]

      // Ethiopian weekdays
      const weekdays = ["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"]
      const weekday = weekdays[currentDateTime.getDay()]

      let ethiopianYear, ethiopianMonth, ethiopianDay

      if (gregorianMonth >= 9) {
        ethiopianYear = gregorianYear - 8
      } else {
        ethiopianYear = gregorianYear - 8
      }

      // Direct mapping for months (simplified from DateTimeDisplay)
      if (gregorianMonth === 9) {
        if (gregorianDay >= 11) {
          ethiopianMonth = 0
          ethiopianDay = gregorianDay - 10
        } else {
          ethiopianMonth = 11
          ethiopianDay = gregorianDay + 20
        }
      } else if (gregorianMonth === 10) {
        if (gregorianDay <= 10) {
          ethiopianMonth = 0
          ethiopianDay = gregorianDay + 20
        } else {
          ethiopianMonth = 1
          ethiopianDay = gregorianDay - 10
        }
      } else if (gregorianMonth === 11) {
        if (gregorianDay <= 9) {
          ethiopianMonth = 1
          ethiopianDay = gregorianDay + 21
        } else {
          ethiopianMonth = 2
          ethiopianDay = gregorianDay - 9
        }
      } else if (gregorianMonth === 12) {
        if (gregorianDay <= 9) {
          ethiopianMonth = 2
          ethiopianDay = gregorianDay + 21
        } else {
          ethiopianMonth = 3
          ethiopianDay = gregorianDay - 9
        }
      } else if (gregorianMonth === 1) {
        if (gregorianDay <= 8) {
          ethiopianMonth = 3
          ethiopianDay = gregorianDay + 22
        } else {
          ethiopianMonth = 4
          ethiopianDay = gregorianDay - 8
        }
      } else if (gregorianMonth === 2) {
        if (gregorianDay <= 7) {
          ethiopianMonth = 4
          ethiopianDay = gregorianDay + 23
        } else {
          ethiopianMonth = 5
          ethiopianDay = gregorianDay - 7
        }
      } else if (gregorianMonth === 3) {
        if (gregorianDay <= 9) {
          ethiopianMonth = 5
          ethiopianDay = gregorianDay + 21
        } else {
          ethiopianMonth = 6
          ethiopianDay = gregorianDay - 9
        }
      } else if (gregorianMonth === 4) {
        if (gregorianDay <= 8) {
          ethiopianMonth = 6
          ethiopianDay = gregorianDay + 22
        } else {
          ethiopianMonth = 7
          ethiopianDay = gregorianDay - 8
        }
      } else if (gregorianMonth === 5) {
        if (gregorianDay <= 8) {
          ethiopianMonth = 7
          ethiopianDay = gregorianDay + 22
        } else {
          ethiopianMonth = 8
          ethiopianDay = gregorianDay - 8
        }
      } else if (gregorianMonth === 6) {
        if (gregorianDay <= 7) {
          ethiopianMonth = 8
          ethiopianDay = gregorianDay + 23
        } else {
          ethiopianMonth = 9
          ethiopianDay = gregorianDay - 7
        }
      } else if (gregorianMonth === 7) {
        if (gregorianDay <= 7) {
          ethiopianMonth = 9
          ethiopianDay = gregorianDay + 23
        } else {
          ethiopianMonth = 10
          ethiopianDay = gregorianDay - 7
        }
      } else if (gregorianMonth === 8) {
        if (gregorianDay <= 6) {
          ethiopianMonth = 10
          ethiopianDay = gregorianDay + 24
        } else {
          ethiopianMonth = 11
          ethiopianDay = gregorianDay - 6
        }
      } else if (gregorianMonth === 9) {
        if (gregorianDay <= 10) {
          ethiopianMonth = 11
          ethiopianDay = gregorianDay + 24
        }
      }

      return `${weekday}፣ ${months[ethiopianMonth]} ${ethiopianDay}፣ ${ethiopianYear}`
    }
  }

  // Format time based on language
  const formatTime = () => {
    if (language === "en") {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      return currentDateTime.toLocaleTimeString("en-US", options)
    } else {
      // Ethiopian time is 6 hours ahead of standard time
      const hours = currentDateTime.getHours()
      const minutes = currentDateTime.getMinutes()
      const seconds = currentDateTime.getSeconds()

      // Convert to Ethiopian time (6 hours difference)
      const ethiopianHours = (hours + 6) % 24

      // Format for display (12-hour format)
      const displayHours = ethiopianHours % 12 || 12

      // Determine the time period in Amharic
      let period
      if (ethiopianHours >= 0 && ethiopianHours < 6) {
        period = "ጠዋት" // Morning (12:00am - 5:59am)
      } else if (ethiopianHours >= 6 && ethiopianHours < 12) {
        period = "ሌሊት" // Day (6:00am - 11:59am)
      } else if (ethiopianHours >= 12 && ethiopianHours < 18) {
        period = "ምሽት" // Evening (12:00pm - 5:59pm)
      } else {
        period = "ከሰዓት" // Night (6:00pm - 11:59pm)
      }

      return `${displayHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`
    }
  }

  // For compact mode, we'll use a tooltip to show the full date
  if (variant === "compact") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn("flex items-center justify-center", className)} style={{ color: clockTextColor }}>
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium ml-1 truncate max-w-[50px]">{formatTime().split(" ")[0]}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-background border border-border p-2 shadow-md">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">{formatTime()}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">{formatDate()}</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (variant === "header") {
    return (
      <div className={cn("flex flex-col", className)} style={{ color: clockTextColor }}>
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          <span className="text-base font-medium">{formatTime()}</span>
        </div>
        <div className="flex items-center mt-1">
          <Calendar className="mr-2 h-5 w-5" />
          <span className="text-sm">{formatDate()}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col space-y-1", className)} style={{ color: clockTextColor }}>
      <div className="flex items-center">
        {showIcons && <Clock className="mr-2 h-4 w-4" />}
        <span className="text-sm font-medium">{formatTime()}</span>
      </div>
      <div className="flex items-center">
        {showIcons && <Calendar className="mr-2 h-4 w-4" />}
        <span className="text-sm">{formatDate()}</span>
      </div>
    </div>
  )
}
