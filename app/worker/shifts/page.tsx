"use client"

import { useState } from "react"
import { Calendar, Clock, ListFilter, CalendarDays, ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isToday, parseISO, isSameDay } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getShiftsByWorkerId } from "@/lib/mock-data"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import type { Shift, ShiftType } from "@/lib/types"

export default function MyShiftsPage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filterShiftTypes, setFilterShiftTypes] = useState<ShiftType[]>(["morning", "afternoon", "night"])
  const [viewMode, setViewMode] = useState<"week" | "list">("week")

  // Get start and end of current week
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 })

  // Navigate to previous/next week
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1))
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1))
  const goToCurrentWeek = () => setCurrentDate(new Date())

  // Get worker shifts from mock data
  const workerId = user?.workerId || "ETH-W-1001" // Default for demo
  const allShifts = getShiftsByWorkerId(workerId)

  // Filter shifts for current week and by selected shift types
  const shiftsForWeek = allShifts.filter((shift) => {
    const shiftDate = parseISO(shift.date)
    const isInCurrentWeek = shiftDate >= startOfCurrentWeek && shiftDate <= endOfCurrentWeek
    const isFilteredType = filterShiftTypes.includes(shift.type)
    return isInCurrentWeek && isFilteredType
  })

  // Toggle shift type filter
  const toggleShiftTypeFilter = (type: ShiftType) => {
    if (filterShiftTypes.includes(type)) {
      setFilterShiftTypes(filterShiftTypes.filter((t) => t !== type))
    } else {
      setFilterShiftTypes([...filterShiftTypes, type])
    }
  }

  // Get shifts for a specific day
  const getShiftsForDay = (date: Date) => {
    return shiftsForWeek.filter((shift) => isSameDay(parseISO(shift.date), date))
  }

  // Generate array of dates for the week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfCurrentWeek)
    day.setDate(startOfCurrentWeek.getDate() + i)
    return day
  })

  // Helper function to get shift type badge color
  const getShiftTypeColor = (type: ShiftType) => {
    switch (type) {
      case "morning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "afternoon":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "night":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Helper function to get shift status badge color
  const getShiftStatusColor = (status: Shift["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "missed":
        return "bg-red-100 text-red-800"
      case "swapped":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Translate shift type
  const translateShiftType = (type: ShiftType) => {
    if (language === "en") {
      return type.charAt(0).toUpperCase() + type.slice(1)
    } else {
      // Amharic translations
      switch (type) {
        case "morning":
          return "ጠዋት"
        case "afternoon":
          return "ከሰዓት በኋላ"
        case "night":
          return "ሌሊት"
        default:
          return type
      }
    }
  }

  // Translate shift status
  const translateShiftStatus = (status: Shift["status"]) => {
    if (language === "en") {
      return status.charAt(0).toUpperCase() + status.slice(1)
    } else {
      // Amharic translations
      switch (status) {
        case "scheduled":
          return "የተያዘ"
        case "completed":
          return "የተጠናቀቀ"
        case "missed":
          return "ያመለጠ"
        case "swapped":
          return "የተቀየረ"
        default:
          return status
      }
    }
  }

  // Render week view
  const renderWeekView = () => (
    <>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDays.map((day, index) => (
          <div key={`header-${index}`} className="text-center py-2">
            <p className="text-xs text-gray-500 font-medium">{format(day, "EEE")}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 h-[300px]">
        {weekDays.map((day, index) => {
          const dayShifts = getShiftsForDay(day)
          const isCurrentDay = isToday(day)
          const hasShifts = dayShifts.length > 0

          return (
            <div
              key={`day-${index}`}
              className={`relative border rounded-md p-2 ${
                isCurrentDay
                  ? "border-purple-300 bg-purple-50"
                  : hasShifts
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-100"
              }`}
            >
              <div className={`text-center ${hasShifts ? "mb-2" : ""}`}>
                <p className={`text-lg font-medium ${isCurrentDay ? "text-purple-700" : "text-gray-900"}`}>
                  {format(day, "d")}
                </p>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[220px] scrollbar-thin">
                {dayShifts.length === 0 ? (
                  <p className="text-xs text-center text-gray-400 py-1">
                    {language === "en" ? "No shifts" : "ፈረቃዎች የሉም"}
                  </p>
                ) : (
                  dayShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="p-2 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Badge className={`block w-full text-center mb-1 ${getShiftTypeColor(shift.type)}`}>
                        {translateShiftType(shift.type)}
                      </Badge>
                      <div className="flex items-center justify-center text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {shift.startTime} - {shift.endTime}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      {shiftsForWeek.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          {language === "en" ? "No shifts for this week" : "በዚህ ሳምንት ውስጥ ፈረቃዎች የሉም"}
        </p>
      ) : (
        weekDays
          .map((day, dayIndex) => {
            const dayShifts = getShiftsForDay(day)
            if (dayShifts.length === 0) return null

            return (
              <div key={`list-day-${dayIndex}`} className="space-y-2">
                <h3 className="font-medium text-gray-900 border-b pb-2">
                  {format(day, "EEEE, MMMM d")} {isToday(day) && <span className="text-purple-700 ml-2">(Today)</span>}
                </h3>

                <div className="pl-4 space-y-3">
                  {dayShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            shift.type === "morning"
                              ? "bg-yellow-100"
                              : shift.type === "afternoon"
                                ? "bg-blue-100"
                                : "bg-indigo-100"
                          }`}
                        >
                          <Clock
                            className={`h-4 w-4 ${
                              shift.type === "morning"
                                ? "text-yellow-700"
                                : shift.type === "afternoon"
                                  ? "text-blue-700"
                                  : "text-indigo-700"
                            }`}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">{translateShiftType(shift.type)} Shift</p>
                          <p className="text-sm text-gray-500">
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                      </div>

                      <Badge className={`${getShiftStatusColor(shift.status)} font-medium`}>
                        {translateShiftStatus(shift.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
          .filter(Boolean)
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "My Shifts" : "የእኔ ፈረቃዎች"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {language === "en"
                ? "View and manage your upcoming and past shifts"
                : "የመጪውን እና ያለፉ ፈረቃዎችን ይመልከቱ እና ያስተዳድሩ"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-gray-300 shadow-sm hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <ListFilter className="h-4 w-4" />
                  <span>{language === "en" ? "Filter" : "አጣራ"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4 shadow-md border-gray-200">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">{language === "en" ? "Shift Types" : "የፈረቃ አይነቶች"}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="morning"
                        checked={filterShiftTypes.includes("morning")}
                        onCheckedChange={() => toggleShiftTypeFilter("morning")}
                        className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                      />
                      <Label htmlFor="morning" className="text-sm font-normal">
                        {translateShiftType("morning")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="afternoon"
                        checked={filterShiftTypes.includes("afternoon")}
                        onCheckedChange={() => toggleShiftTypeFilter("afternoon")}
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label htmlFor="afternoon" className="text-sm font-normal">
                        {translateShiftType("afternoon")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="night"
                        checked={filterShiftTypes.includes("night")}
                        onCheckedChange={() => toggleShiftTypeFilter("night")}
                        className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                      />
                      <Label htmlFor="night" className="text-sm font-normal">
                        {translateShiftType("night")}
                      </Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentWeek}
              className="flex items-center gap-2 border-gray-300 shadow-sm bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>{language === "en" ? "Today" : "ዛሬ"}</span>
            </Button>
          </div>
        </div>

        {/* Week navigation and view toggle */}
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="pb-4 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousWeek}
                  className="h-9 w-9 rounded-full border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Previous Week</span>
                </Button>

                <CardTitle className="text-center text-base font-medium mx-4">
                  {format(startOfCurrentWeek, "MMM d")} - {format(endOfCurrentWeek, "MMM d, yyyy")}
                </CardTitle>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextWeek}
                  className="h-9 w-9 rounded-full border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900 transition-colors shadow-sm"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Next Week</span>
                </Button>
              </div>

              <div className="flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
                <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                  className={`rounded-none px-4 py-2 h-9 ${
                    viewMode === "week"
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{language === "en" ? "Week" : "ሳምንት"}</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none px-4 py-2 h-9 ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <ListFilter className="h-4 w-4 mr-2" />
                  <span>{language === "en" ? "List" : "ዝርዝር"}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">{viewMode === "week" ? renderWeekView() : renderListView()}</CardContent>
        </Card>

        {/* Upcoming shifts */}
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              {language === "en" ? "Upcoming Shifts" : "መጪ ፈረቃዎች"}
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Your scheduled shifts for the next 7 days" : "ለሚቀጥሉት 7 ቀናት የተያዙ ፈረቃዎችዎ"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {shiftsForWeek.length === 0 ? (
                <div className="text-center text-gray-500 py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p>{language === "en" ? "No upcoming shifts for this period" : "በዚህ ጊዜ ውስጥ መጪ ፈረቃዎች የሉም"}</p>
                </div>
              ) : (
                shiftsForWeek.map((shift) => (
                  <div
                    key={shift.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div
                        className={`p-3 rounded-full shadow-sm ${
                          shift.type === "morning"
                            ? "bg-yellow-100"
                            : shift.type === "afternoon"
                              ? "bg-blue-100"
                              : "bg-indigo-100"
                        }`}
                      >
                        <Calendar
                          className={`h-5 w-5 ${
                            shift.type === "morning"
                              ? "text-yellow-700"
                              : shift.type === "afternoon"
                                ? "text-blue-700"
                                : "text-indigo-700"
                          }`}
                        />
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">
                          {format(parseISO(shift.date), "EEEE, MMMM d, yyyy")}
                        </h3>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-1">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {shift.startTime} - {shift.endTime}
                            </span>
                          </div>
                          <span className="hidden sm:inline mx-1">•</span>
                          <span>{translateShiftType(shift.type)} Shift</span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={`${getShiftStatusColor(
                        shift.status,
                      )} self-start sm:self-center px-3 py-1 font-medium shadow-sm`}
                    >
                      {translateShiftStatus(shift.status)}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
