"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { cn } from "@/lib/utils"
import { Clock, Calendar } from "lucide-react"

interface DateTimeDisplayProps {
  className?: string
  showIcons?: boolean
}

export function DateTimeDisplay({ className, showIcons = true }: DateTimeDisplayProps) {
  const [dateTime, setDateTime] = useState(new Date())
  const { language } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    if (language === "am") {
      // Ethiopian date format
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return new Intl.DateTimeFormat("am-ET", options).format(date)
    } else {
      // English date format
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return new Intl.DateTimeFormat("en-US", options).format(date)
    }
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    if (language === "am") {
      // Format time with correct Amharic time period labels
      let timePeriod

      // Map time periods according to the specified ranges
      if (hours >= 0 && hours < 6) {
        timePeriod = "ጠዋት" // Morning (12:00am - 5:59am)
      } else if (hours >= 6 && hours < 12) {
        timePeriod = "ሌሊት" // Day (6:00am - 11:59am)
      } else if (hours >= 12 && hours < 18) {
        timePeriod = "ምሽት" // Evening (12:00pm - 5:59pm)
      } else {
        timePeriod = "ከሰዓት" // Night (6:00pm - 11:59pm)
      }

      // Format in 12-hour format for display
      const displayHours = hours % 12 || 12
      return `${displayHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${timePeriod}`
    } else {
      // English time format (12-hour)
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      return new Intl.DateTimeFormat("en-US", options).format(date)
    }
  }

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <div className="flex items-center">
        {showIcons && <Clock className="mr-2 h-4 w-4 text-muted-foreground" />}
        <span className="text-sm font-medium">{formatTime(dateTime)}</span>
      </div>
      <div className="flex items-center">
        {showIcons && <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />}
        <span className="text-sm text-muted-foreground">{formatDate(dateTime)}</span>
      </div>
    </div>
  )
}
