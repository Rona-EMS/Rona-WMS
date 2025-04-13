"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ShiftCalendar() {
  const { language } = useLanguage()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get current month name
  const getMonthName = (date: Date) => {
    if (language === "am") {
      const months = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ"]
      return `${months[date.getMonth()]} ${date.getFullYear()}`
    } else {
      return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date)
    }
  }

  // Get day names for the week
  const getDayNames = () => {
    if (language === "am") {
      return ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ", "እሑድ"]
    } else {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  }

  // Translate shift names
  const translateShift = (shiftName: string) => {
    const shiftTranslations: Record<string, { en: string; am: string }> = {
      Morning: { en: "Morning", am: "ጠዋት" }, // 12:00am - 5:59am
      Day: { en: "Day", am: "ሌሊት" }, // 6:00am - 11:59am
      Evening: { en: "Evening", am: "ምሽት" }, // 12:00pm - 5:59pm
      Night: { en: "Night", am: "ከሰዓት" }, // 6:00pm - 11:59pm
      Afternoon: { en: "Afternoon", am: "ምሽት" }, // Map Afternoon to Evening in Amharic
      Weekend: { en: "Weekend", am: "ሳምንት መጨረሻ" },
    }
    return shiftTranslations[shiftName]?.[language] || shiftName
  }

  // Mock data for shifts
  const shifts = [
    { day: 1, shifts: ["Morning"] },
    { day: 2, shifts: ["Morning", "Weekend"] },
    { day: 3, shifts: ["Morning", "Weekend"] },
    { day: 4, shifts: ["Morning"] },
    { day: 5, shifts: ["Morning"] },
    { day: 6, shifts: ["Weekend"] },
    { day: 8, shifts: ["Morning", "Afternoon"] },
    { day: 9, shifts: ["Morning", "Afternoon"] },
    { day: 10, shifts: ["Morning", "Afternoon"] },
    { day: 11, shifts: ["Morning", "Afternoon"] },
  ]

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  // Get shifts for a specific day
  const getShiftsForDay = (day: number) => {
    const dayShifts = shifts.find((s) => s.day === day)
    return dayShifts ? dayShifts.shifts : []
  }

  // Navigation functions
  const prevMonth = () => {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() - 1)
    setCurrentMonth(date)
  }

  const nextMonth = () => {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() + 1)
    setCurrentMonth(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{language === "en" ? "Shift Calendar" : "የሺፍት የቀን መቁጠሪያ"}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">{getMonthName(currentMonth)}</span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="grid grid-cols-7 gap-px bg-muted">
          {getDayNames().map((day, i) => (
            <div key={i} className="p-2 text-center font-medium bg-background">
              {day}
            </div>
          ))}

          {getDaysInMonth(currentMonth).map((day) => (
            <div key={day} className="min-h-[100px] p-2 bg-background border-t">
              <div className="font-medium mb-1">{day}</div>
              <div className="space-y-1">
                {getShiftsForDay(day).map((shift, i) => (
                  <div
                    key={i}
                    className={`text-xs p-1 rounded text-white ${
                      shift === "Morning"
                        ? "bg-blue-500"
                        : shift === "Afternoon"
                          ? "bg-purple-500"
                          : shift === "Night"
                            ? "bg-indigo-500"
                            : "bg-green-500"
                    }`}
                  >
                    {translateShift(shift)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
