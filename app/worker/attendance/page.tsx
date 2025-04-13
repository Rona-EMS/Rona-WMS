"use client"

import { useState } from "react"
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Download, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAttendanceByWorkerId } from "@/lib/mock-data"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import type { AttendanceRecord } from "@/lib/types"

export default function MyAttendancePage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Get start and end of current month
  const startOfCurrentMonth = startOfMonth(currentDate)
  const endOfCurrentMonth = endOfMonth(currentDate)

  // Navigate to previous/next month
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const goToCurrentMonth = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  // Get worker attendance from mock data
  const workerId = user?.workerId || "ETH-W-1001" // Default for demo
  const allAttendance = getAttendanceByWorkerId(workerId)

  // Filter attendance records by selected status
  const filteredAttendance = allAttendance.filter((record) => {
    if (filterStatus === "all") return true
    return record.status === filterStatus
  })

  // Get attendance for selected date
  const selectedDateAttendance = selectedDate
    ? filteredAttendance.find((record) => record.date === format(selectedDate, "yyyy-MM-dd"))
    : undefined

  // Get attendance for current month
  const attendanceForMonth = filteredAttendance.filter((record) => {
    const recordDate = parseISO(record.date)
    return isSameMonth(recordDate, currentDate)
  })

  // Calculate attendance statistics
  const totalDays = attendanceForMonth.length
  const presentDays = attendanceForMonth.filter((record) => record.status === "present").length
  const lateDays = attendanceForMonth.filter((record) => record.status === "late").length
  const absentDays = attendanceForMonth.filter((record) => record.status === "absent").length
  const earlyDepartureDays = attendanceForMonth.filter((record) => record.status === "early-departure").length

  const attendanceRate = totalDays > 0 ? Math.round(((presentDays + lateDays) / totalDays) * 100) : 0

  // Generate dates for the month
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  })

  // Helper function to get attendance status color
  const getStatusColor = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "early-departure":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Translate attendance status
  const translateStatus = (status: AttendanceRecord["status"]) => {
    if (language === "en") {
      switch (status) {
        case "present":
          return "Present"
        case "late":
          return "Late"
        case "absent":
          return "Absent"
        case "early-departure":
          return "Early Departure"
        default:
          return status
      }
    } else {
      // Amharic translations
      switch (status) {
        case "present":
          return "ተገኝቷል"
        case "late":
          return "ዘግይቷል"
        case "absent":
          return "አልተገኘም"
        case "early-departure":
          return "ቀድሞ ወጥቷል"
        default:
          return status
      }
    }
  }

  // Instead of using a custom day renderer, we'll use the built-in modifiers
  // to style the days based on attendance status
  const getDayClassNames = (day: Date) => {
    if (!day || !(day instanceof Date) || isNaN(day.getTime())) {
      return ""
    }

    const dateString = format(day, "yyyy-MM-dd")
    const attendance = filteredAttendance.find((record) => record.date === dateString)

    if (attendance) {
      switch (attendance.status) {
        case "present":
          return "bg-green-50 text-green-900 hover:bg-green-100"
        case "late":
          return "bg-yellow-50 text-yellow-900 hover:bg-yellow-100"
        case "absent":
          return "bg-red-50 text-red-900 hover:bg-red-100"
        case "early-departure":
          return "bg-orange-50 text-orange-900 hover:bg-orange-100"
      }
    }

    return ""
  }

  // Create modifiers for the calendar
  const modifiers = {
    today: (day: Date) => isToday(day),
    present: (day: Date) => {
      if (!day) return false
      const dateString = format(day, "yyyy-MM-dd")
      const attendance = filteredAttendance.find((record) => record.date === dateString)
      return attendance?.status === "present"
    },
    late: (day: Date) => {
      if (!day) return false
      const dateString = format(day, "yyyy-MM-dd")
      const attendance = filteredAttendance.find((record) => record.date === dateString)
      return attendance?.status === "late"
    },
    absent: (day: Date) => {
      if (!day) return false
      const dateString = format(day, "yyyy-MM-dd")
      const attendance = filteredAttendance.find((record) => record.date === dateString)
      return attendance?.status === "absent"
    },
    earlyDeparture: (day: Date) => {
      if (!day) return false
      const dateString = format(day, "yyyy-MM-dd")
      const attendance = filteredAttendance.find((record) => record.date === dateString)
      return attendance?.status === "early-departure"
    }
  }

  // Create modifier styles
  const modifiersStyles = {
    today: { border: "2px solid purple" },
    present: { backgroundColor: "#f0fdf4", color: "#166534" },
    late: { backgroundColor: "#fefce8", color: "#854d0e" },
    absent: { backgroundColor: "#fef2f2", color: "#991b1b" },
    earlyDeparture: { backgroundColor: "#fff7ed", color: "#9a3412" }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "My Attendance" : "የእኔ መገኘት"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {language === "en" ? "Track your attendance records and history" : "የመገኘት መዝገቦችዎን እና ታሪክዎን ይከታተሉ"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder={language === "en" ? "All Status" : "ሁሉም ሁኔታዎች"} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Status" : "ሁሉም ሁኔታዎች"}</SelectItem>
                <SelectItem value="present">{translateStatus("present")}</SelectItem>
                <SelectItem value="late">{translateStatus("late")}</SelectItem>
                <SelectItem value="absent">{translateStatus("absent")}</SelectItem>
                <SelectItem value="early-departure">{translateStatus("early-departure")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={goToCurrentMonth}>
              {language === "en" ? "Today" : "ዛሬ"}
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              <span>{language === "en" ? "Export" : "ላክ"}</span>
            </Button>
          </div>
        </div>

        {/* Attendance statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Attendance Rate" : "የመገኘት መጠን"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{attendanceRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Present Days" : "የተገኙ ቀናት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentDays}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Late Days" : "የዘገዩ ቀናት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lateDays}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Absent Days" : "ያልተገኙ ቀናት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentDays}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Early Departures" : "ቀድመው የወጡ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{earlyDepartureDays}</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and selected day details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === "en" ? "Attendance Calendar" : "የመገኘት ቀን መቁጠሪያ"}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</span>
                  <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentDate}
                className="rounded-md border"
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
              />
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">{translateStatus("present")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">{translateStatus("late")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">{translateStatus("absent")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">{translateStatus("early-departure")}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? format(selectedDate, "EEEE, MMMM d, yyyy")
                  : language === "en"
                    ? "Select a date"
                    : "ቀን ይምረጡ"}
              </CardTitle>
              <CardDescription>{language === "en" ? "Attendance details" : "የመገኘት ዝርዝሮች"}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateAttendance ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{language === "en" ? "Status" : "ሁኔታ"}:</span>
                    <Badge className={getStatusColor(selectedDateAttendance.status)}>
                      {translateStatus(selectedDateAttendance.status)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{language === "en" ? "Check-in Time" : "የመግቢያ ሰዓት"}:</span>
                    <span className="text-sm font-medium">
                      {selectedDateAttendance.checkInTime ? (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          {selectedDateAttendance.checkInTime}
                        </div>
                      ) : (
                        <span className="text-gray-400">{language === "en" ? "Not recorded" : "አልተመዘገበም"}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{language === "en" ? "Check-out Time" : "የመውጫ ሰዓት"}:</span>
                    <span className="text-sm font-medium">
                      {selectedDateAttendance.checkOutTime ? (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-gray-400" />
                          {selectedDateAttendance.checkOutTime}
                        </div>
                      ) : (
                        <span className="text-gray-400">{language === "en" ? "Not recorded" : "አልተመዘገበም"}</span>
                      )}
                    </span>
                  </div>

                  {selectedDateAttendance.location && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{language === "en" ? "Location" : "ቦታ"}:</span>
                      <span className="text-sm font-medium">
                        {selectedDateAttendance.location.latitude.toFixed(4)},{" "}
                        {selectedDateAttendance.location.longitude.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-sm text-gray-500">
                    {language === "en" ? "Select a date to view attendance details" : "የመገኘት ዝርዝሮችን ለማየት ቀን ይምረጡ"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent attendance records */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Recent Attendance Records" : "የቅርብ ጊዜ የመገኘት መዝገቦች"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Your attendance history for the current month" : "ለአሁኑ ወር የእርስዎ የመገኘት ታሪክ"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Date" : "ቀን"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Check-in" : "መግቢያ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Check-out" : "መውጫ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Status" : "ሁኔታ"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceForMonth.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
                        {language === "en"
                          ? "No attendance records found for this month"
                          : "በዚህ ወር ውስጥ የመገኘት መዝገቦች አልተገኙም"}
                      </td>
                    </tr>
                  ) : (
                    attendanceForMonth.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{format(parseISO(record.date), "MMM d, yyyy")}</td>
                        <td className="px-4 py-3 text-sm">
                          {record.checkInTime || (
                            <span className="text-gray-400">{language === "en" ? "Not recorded" : "አልተመዘገበም"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {record.checkOutTime || (
                            <span className="text-gray-400">{language === "en" ? "Not recorded" : "አልተመዘገበም"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={getStatusColor(record.status)}>{translateStatus(record.status)}</Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
