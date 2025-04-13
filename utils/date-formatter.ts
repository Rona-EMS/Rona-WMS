import { format, formatDistanceToNow } from "date-fns"
import { am } from "date-fns/locale"

type DateFormatOptions = {
  format?: "full" | "date" | "time" | "dateTime" | "relative"
  language: "en" | "am"
}

export function formatDate(date: Date | string, options: DateFormatOptions) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const { format: formatType = "full", language } = options

  if (language === "am") {
    // Ethiopian date formatting
    switch (formatType) {
      case "date":
        return format(dateObj, "dd/MM/yyyy", { locale: am })
      case "time":
        return format(dateObj, "HH:mm", { locale: am })
      case "dateTime":
        return format(dateObj, "dd/MM/yyyy HH:mm", { locale: am })
      case "relative":
        return formatDistanceToNow(dateObj, { addSuffix: true, locale: am })
      case "full":
      default:
        return format(dateObj, "PPPp", { locale: am })
    }
  } else {
    // English date formatting
    switch (formatType) {
      case "date":
        return format(dateObj, "MMM d, yyyy")
      case "time":
        return format(dateObj, "h:mm a")
      case "dateTime":
        return format(dateObj, "MMM d, yyyy h:mm a")
      case "relative":
        return formatDistanceToNow(dateObj, { addSuffix: true })
      case "full":
      default:
        return format(dateObj, "PPPp")
    }
  }
}

export function formatCalendarDate(date: Date, language: "en" | "am") {
  if (language === "am") {
    const months = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"]

    const weekdays = ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ", "እሑድ"]

    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const weekday = weekdays[date.getDay()]

    return `${weekday}, ${month} ${day}, ${year}`
  } else {
    return format(date, "EEEE, MMMM d, yyyy")
  }
}
