import type { Language } from "@/lib/context/language-context"

type TimePeriod = "morning" | "day" | "evening" | "night"

export function getTimePeriod(hours: number): TimePeriod {
  if (hours >= 0 && hours < 6) {
    return "morning" // 12:00am - 5:59am
  } else if (hours >= 6 && hours < 12) {
    return "day" // 6:00am - 11:59am
  } else if (hours >= 12 && hours < 18) {
    return "evening" // 12:00pm - 5:59pm
  } else {
    return "night" // 6:00pm - 11:59pm
  }
}

export function translateTimePeriod(period: TimePeriod, language: Language): string {
  const translations: Record<TimePeriod, Record<Language, string>> = {
    morning: { en: "Morning", am: "ጠዋት" },
    day: { en: "Day", am: "ሌሊት" },
    evening: { en: "Evening", am: "ምሽት" },
    night: { en: "Night", am: "ከሰዓት" },
  }

  return translations[period][language]
}

export function formatTimeWithPeriod(date: Date, language: Language): string {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  // Get 12-hour format hours
  const displayHours = hours % 12 || 12

  // Get the time period
  const period = getTimePeriod(hours)
  const periodLabel = translateTimePeriod(period, language)

  // Format the time string
  if (language === "am") {
    return `${displayHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${periodLabel}`
  } else {
    const ampm = hours >= 12 ? "PM" : "AM"
    return `${displayHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`
  }
}
