"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/context/language-context"
import {
  Plus,
  Calendar,
  Clock,
  Users,
  Settings,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

export default function ShiftsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("calendar")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock shift data
  const shifts = [
    { id: 1, name: "Morning Shift", time: "06:00 - 14:00", workers: 45, coverage: 92, color: "bg-blue-500" },
    { id: 2, name: "Afternoon Shift", time: "14:00 - 22:00", workers: 38, coverage: 84, color: "bg-purple-500" },
    { id: 3, name: "Night Shift", time: "22:00 - 06:00", workers: 22, coverage: 76, color: "bg-indigo-500" },
    { id: 4, name: "Weekend Shift", time: "08:00 - 16:00", workers: 15, coverage: 90, color: "bg-green-500" },
  ]

  // Generate calendar days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, shifts: [] })
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      // Randomly assign shifts to days
      const dayShifts = []
      shifts.forEach((shift) => {
        if (Math.random() > 0.5) {
          dayShifts.push({
            ...shift,
            status: Math.random() > 0.8 ? "understaffed" : "normal",
          })
        }
      })

      days.push({ day: i, shifts: dayShifts })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Navigation functions
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const formatMonth = (date) => {
    return date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", { month: "long", year: "numeric" })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Shift Management" : "የሺፍት አስተዳደር"}
      description={
        language === "en" ? "Assign, schedule, and manage worker shifts" : "የሰራተኞችን ሺፍት ይመድቡ፣ ይቀይሩ እና ያስተዳድሩ"
      }
      headerAction={
        <Button variant="purple" className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          {language === "en" ? "Create New Shift" : "አዲስ ሺፍት ይፍጠሩ"}
        </Button>
      }
    >
      {/* Shift Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {shifts.map((shift) => (
          <Card key={shift.id} className="overflow-hidden">
            <div className={`h-2 ${shift.color}`}></div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{shift.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{shift.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {shift.workers} {language === "en" ? "workers" : "ሰራተኞች"}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{language === "en" ? "Coverage" : "ሽፋን"}</span>
                  <span
                    className={
                      shift.coverage >= 90
                        ? "text-green-600"
                        : shift.coverage >= 80
                          ? "text-yellow-600"
                          : "text-red-600"
                    }
                  >
                    {shift.coverage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      shift.coverage >= 90 ? "bg-green-600" : shift.coverage >= 80 ? "bg-yellow-600" : "bg-red-600"
                    }`}
                    style={{ width: `${shift.coverage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {language === "en" ? "Calendar" : "የቀን መቁጠሪያ"}
          </TabsTrigger>
          <TabsTrigger value="shifts" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {language === "en" ? "Shifts" : "ሺፍቶች"}
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {language === "en" ? "Workers" : "ሰራተኞች"}
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {language === "en" ? "Templates" : "አብነቶች"}
          </TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{language === "en" ? "Shift Calendar" : "የሺፍት የቀን መቁጠሪያ"}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">{formatMonth(currentMonth)}</span>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {language === "en" ? "View and manage shifts by date" : "ሺፍቶችን በቀን ይመልከቱ እና ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="font-medium text-sm py-2">
                    {language === "en"
                      ? day
                      : day === "Sun"
                        ? "እሁድ"
                        : day === "Mon"
                          ? "ሰኞ"
                          : day === "Tue"
                            ? "ማክሰኞ"
                            : day === "Wed"
                              ? "ረቡዕ"
                              : day === "Thu"
                                ? "ሐሙስ"
                                : day === "Fri"
                                  ? "አርብ"
                                  : "ቅዳሜ"}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-1 min-h-[100px] ${
                      day.day === null ? "bg-gray-50 dark:bg-gray-800/50" : ""
                    }`}
                  >
                    {day.day !== null && (
                      <>
                        <div className="text-right text-sm font-medium p-1">{day.day}</div>
                        <div className="space-y-1">
                          {day.shifts.map((shift) => (
                            <div
                              key={`${day.day}-${shift.id}`}
                              className={`text-xs p-1 rounded text-white ${shift.color} ${
                                shift.status === "understaffed" ? "border-l-4 border-red-600" : ""
                              }`}
                            >
                              {shift.name.split(" ")[0]}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shifts Tab */}
        <TabsContent value="shifts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Shift Management" : "የሺፍት አስተዳደር"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Create, edit and manage shift schedules" : "የሺፍት መርሃግብሮችን ይፍጠሩ፣ ያስተካክሉ እና ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search shifts..." : "ሺፍቶችን ይፈልጉ..."}
                    className="pl-8 pr-4 py-2 w-full border rounded-md"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    {language === "en" ? "Filter" : "አጣራ"}
                  </Button>
                  <Button variant="purple" size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                    {language === "en" ? "New" : "አዲስ"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {shifts.map((shift) => (
                  <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${shift.color}`}></div>
                      <div>
                        <p className="font-medium">{shift.name}</p>
                        <p className="text-sm text-muted-foreground">{shift.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <p className="font-medium">{shift.workers}</p>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Workers" : "ሰራተኞች"}</p>
                      </div>
                      <div className="text-center ml-4">
                        <p
                          className={`font-medium ${
                            shift.coverage >= 90
                              ? "text-green-600"
                              : shift.coverage >= 80
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {shift.coverage}%
                        </p>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Coverage" : "ሽፋን"}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        {language === "en" ? "Edit" : "አስተካክል"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workers Tab */}
        <TabsContent value="workers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Worker Assignments" : "የሰራተኞች ምደባ"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Assign workers to shifts and manage their schedules"
                  : "ሰራተኞችን ለሺፍቶች ይመድቡ እና መርሃግብራቸውን ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search workers..." : "ሰራተኞችን ይፈልጉ..."}
                    className="pl-8 pr-4 py-2 w-full border rounded-md"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    {language === "en" ? "Department" : "ክፍል"}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Clock className="h-4 w-4" />
                    {language === "en" ? "Shift" : "ሺፍት"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Sample worker assignments */}
                {[
                  {
                    id: 1,
                    name: "Abebe Kebede",
                    department: "Manufacturing",
                    shift: "Morning Shift",
                    status: "assigned",
                    color: "bg-blue-500",
                  },
                  {
                    id: 2,
                    name: "Tigist Haile",
                    department: "Packaging",
                    shift: "Afternoon Shift",
                    status: "assigned",
                    color: "bg-purple-500",
                  },
                  {
                    id: 3,
                    name: "Dawit Tadesse",
                    department: "Quality Control",
                    shift: "Night Shift",
                    status: "assigned",
                    color: "bg-indigo-500",
                  },
                  {
                    id: 4,
                    name: "Hiwot Tesfaye",
                    department: "Manufacturing",
                    shift: "Morning Shift",
                    status: "unassigned",
                    color: "bg-blue-500",
                  },
                  {
                    id: 5,
                    name: "Yonas Girma",
                    department: "Logistics",
                    shift: "Weekend Shift",
                    status: "assigned",
                    color: "bg-green-500",
                  },
                ].map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${worker.color}`}></div>
                      <div>
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-sm text-muted-foreground">{worker.department}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{worker.shift}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Assigned Shift" : "የተመደበ ሺፍት"}
                      </p>
                    </div>
                    <div>
                      {worker.status === "assigned" ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          {language === "en" ? "Assigned" : "ተመድቧል"}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          {language === "en" ? "Unassigned" : "አልተመደበም"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Shift Templates" : "የሺፍት አብነቶች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Create and manage reusable shift templates"
                  : "ደጋግመው የሚጠቀሙባቸውን የሺፍት አብነቶች ይፍጠሩ እና ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">{language === "en" ? "Available Templates" : "ያሉ አብነቶች"}</h3>
                <Button variant="purple" size="sm" className="gap-1 bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4" />
                  {language === "en" ? "New Template" : "አዲስ አብነት"}
                </Button>
              </div>

              <div className="space-y-4">
                {/* Sample templates */}
                {[
                  { id: 1, name: "Standard Week", description: "Monday to Friday, 3 shifts per day", shifts: 15 },
                  { id: 2, name: "Weekend Coverage", description: "Saturday and Sunday shifts", shifts: 6 },
                  { id: 3, name: "Holiday Schedule", description: "Reduced staffing for holidays", shifts: 9 },
                  { id: 4, name: "Peak Season", description: "Extended hours during peak production", shifts: 21 },
                ].map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-medium">{template.shifts}</p>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Shifts" : "ሺፍቶች"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {language === "en" ? "Edit" : "አስተካክል"}
                        </Button>
                        <Button variant="purple" size="sm" className="bg-purple-600 hover:bg-purple-700">
                          {language === "en" ? "Apply" : "ተግብር"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
