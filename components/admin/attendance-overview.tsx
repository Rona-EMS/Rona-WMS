"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/context/language-context"
import { Clock, UserX } from "lucide-react"

export function AttendanceOverview() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("day")

  // Mock data for attendance
  const attendanceData = {
    onTime: { mon: 95, tue: 90, wed: 85, thu: 80, fri: 75, sat: 20, sun: 15 },
    late: { mon: 10, tue: 15, wed: 20, thu: 15, fri: 20, sat: 15, sun: 10 },
    absent: { mon: 5, tue: 5, wed: 5, thu: 5, fri: 5, sat: 5, sun: 5 },
  }

  // Translate day names
  const getDayName = (day: string) => {
    const dayTranslations: Record<string, { en: string; am: string }> = {
      mon: { en: "Mon", am: "ሰኞ" },
      tue: { en: "Tue", am: "ማክሰኞ" },
      wed: { en: "Wed", am: "ረቡዕ" },
      thu: { en: "Thu", am: "ሐሙስ" },
      fri: { en: "Fri", am: "አርብ" },
      sat: { en: "Sat", am: "ቅዳሜ" },
      sun: { en: "Sun", am: "እሁድ" },
    }
    return dayTranslations[day][language]
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{language === "en" ? "Attendance Overview" : "የመገኘት አጠቃላይ እይታ"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Worker attendance patterns and trends" : "የሰራተኞች የመገኘት ሁኔታ እና አዝማሚያዎች"}
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="day">{language === "en" ? "Day" : "ቀን"}</TabsTrigger>
            <TabsTrigger value="week">{language === "en" ? "Week" : "ሳምንት"}</TabsTrigger>
            <TabsTrigger value="month">{language === "en" ? "Month" : "ወር"}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          {/* Chart visualization */}
          <div className="flex items-end justify-between h-[250px] mt-6">
            {Object.keys(attendanceData.onTime).map((day) => (
              <div key={day} className="flex flex-col items-center gap-1 w-[40px]">
                <div className="flex flex-col items-center w-full">
                  <div
                    className="w-6 bg-blue-500"
                    style={{ height: `${attendanceData.onTime[day as keyof typeof attendanceData.onTime]}px` }}
                  ></div>
                  <div
                    className="w-6 bg-amber-400"
                    style={{ height: `${attendanceData.late[day as keyof typeof attendanceData.late]}px` }}
                  ></div>
                  <div
                    className="w-6 bg-red-500"
                    style={{ height: `${attendanceData.absent[day as keyof typeof attendanceData.absent]}px` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">{getDayName(day)}</span>
              </div>
            ))}
          </div>

          {/* Tooltip */}
          <div className="absolute top-10 left-10 bg-black/80 text-white p-3 rounded-md">
            <p className="font-semibold">{getDayName("mon")}</p>
            <p className="flex items-center text-blue-400">
              <Clock className="h-3 w-3 mr-1" />
              {language === "en" ? "On Time" : "በሰዓቱ"}: 95
            </p>
            <p className="flex items-center text-amber-400">
              <Clock className="h-3 w-3 mr-1" />
              {language === "en" ? "Late" : "የዘገየ"}: 10
            </p>
            <p className="flex items-center text-red-400">
              <UserX className="h-3 w-3 mr-1" />
              {language === "en" ? "Absent" : "ቀርቷል"}: 5
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 mr-1"></div>
              <span className="text-xs">{language === "en" ? "On Time" : "በሰዓቱ"}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-400 mr-1"></div>
              <span className="text-xs">{language === "en" ? "Late" : "የዘገየ"}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 mr-1"></div>
              <span className="text-xs">{language === "en" ? "Absent" : "ቀርቷል"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
