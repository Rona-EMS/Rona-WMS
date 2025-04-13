"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/context/language-context"
import { Search, Calendar, Check, Clock } from "lucide-react"
import { formatDate } from "@/utils/date-formatter"
import { formatTimeWithPeriod } from "@/utils/time-formatter"

export function AttendanceTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const { language } = useLanguage()

  // Mock attendance data
  const attendanceData = [
    {
      id: 1,
      name: "Abebe Kebede",
      position: "Textile - Machine Operator",
      date: "2023-03-27",
      checkIn: "05:55",
      checkOut: "14:05",
      status: "present",
    },
    {
      id: 2,
      name: "Abebe Kebede",
      position: "Textile - Machine Operator",
      date: "2023-04-13",
      checkIn: "05:58",
      checkOut: "",
      status: "present",
    },
    {
      id: 3,
      name: "Tigist Haile",
      position: "Garment - Tailor",
      date: "2023-03-27",
      checkIn: "14:10",
      checkOut: "22:03",
      status: "late",
    },
    {
      id: 4,
      name: "Dawit Mengistu",
      position: "Packaging - Supervisor",
      date: "2023-03-27",
      checkIn: "21:55",
      checkOut: "06:02",
      status: "present",
    },
    {
      id: 5,
      name: "Solomon Girma",
      position: "Maintenance - Technician",
      date: "2023-03-27",
      checkIn: "",
      checkOut: "",
      status: "absent",
    },
  ]

  // Filter attendance data based on search term
  const filteredData = attendanceData.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Translate status
  const translateStatus = (status: string) => {
    const statusTranslations: Record<string, { en: string; am: string }> = {
      present: { en: "Present", am: "ቀን" },
      late: { en: "Late", am: "የዘገየ" },
      absent: { en: "Absent", am: "ቀርቷል" },
    }
    return statusTranslations[status]?.[language] || status
  }

  // Format date based on language
  const formatAttendanceDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDate(date, { format: "date", language: language as "en" | "am" })
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-5 w-5 text-green-500" />
      case "late":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{language === "en" ? "Attendance Tracking" : "የመገኘት ክትትል"}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === "en" ? "Search employees..." : "ሰራተኞችን ይፈልጉ..."}
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            {language === "en" ? "Date Range" : "የቀን ክልል"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredData.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(record.status)}
                <div>
                  <p className="font-medium">{record.name}</p>
                  <p className="text-sm text-muted-foreground">{record.position}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{language === "en" ? "Date" : "ቀን"}</p>
                <p className="font-medium">{formatAttendanceDate(record.date)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {record.checkIn
                    ? language === "am"
                      ? formatTimeWithPeriod(new Date(`2023-01-01T${record.checkIn}`), language)
                      : record.checkIn
                    : "-"}{" "}
                  -
                  {record.checkOut
                    ? language === "am"
                      ? formatTimeWithPeriod(new Date(`2023-01-01T${record.checkOut}`), language)
                      : record.checkOut
                    : "-"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Check-in / Check-out" : "መግቢያ / መውጫ"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
