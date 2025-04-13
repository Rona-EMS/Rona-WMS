"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/language-context"
import { useRouter } from "next/navigation"
import {
  Users,
  Clock,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Activity,
  TrendingUp,
  Filter,
  Download,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboardPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedView, setSelectedView] = useState<string>("day")

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock data for dashboard
  const stats = {
    workersActive: 87,
    workersTotal: 112,
    attendanceRate: 92,
    lateArrivals: 7,
    absences: 5,
    pendingRequests: 12,
    pendingTasks: 8,
    openShifts: 3,
    emergencies: 2,
    payrollAmount: 24560,
    payrollChange: 5.2,
  }

  // Mock data for charts
  const departmentAttendance = [
    { name: "Manufacturing", present: 46, absent: 4, rate: 92 },
    { name: "Packaging", present: 22, absent: 3, rate: 88 },
    { name: "Quality Control", present: 12, absent: 4, rate: 75 },
    { name: "Logistics", present: 13, absent: 7, rate: 65 },
  ]

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "check-in",
      worker: "Abebe Kebede",
      department: "Manufacturing",
      time: "08:02 AM",
      status: "on-time",
    },
    {
      id: 2,
      type: "check-in",
      worker: "Tigist Haile",
      department: "Packaging",
      time: "08:15 AM",
      status: "late",
    },
    {
      id: 3,
      type: "request",
      worker: "Dawit Tadesse",
      department: "Quality Control",
      time: "08:30 AM",
      requestType: "leave",
    },
    {
      id: 4,
      type: "emergency",
      worker: "Yonas Girma",
      department: "Manufacturing",
      time: "09:15 AM",
      severity: "medium",
    },
    {
      id: 5,
      type: "check-out",
      worker: "Hiwot Tesfaye",
      department: "Logistics",
      time: "02:00 PM",
      status: "early",
    },
  ]

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: "REQ-001",
      type: "leave",
      worker: "Kidist Alemu",
      department: "Packaging",
      date: "Apr 20, 2025",
      duration: "3 days",
    },
    {
      id: "REQ-002",
      type: "shift-swap",
      worker: "Solomon Bekele",
      department: "Manufacturing",
      date: "Apr 22, 2025",
      swapWith: "Abebe Kebede",
    },
    {
      id: "REQ-003",
      type: "overtime",
      worker: "Tigist Haile",
      department: "Packaging",
      date: "Apr 25, 2025",
      hours: "2 hours",
    },
  ]

  // Mock data for upcoming shifts
  const upcomingShifts = [
    {
      id: 1,
      name: "Morning Shift",
      time: "06:00 - 14:00",
      workers: 45,
      capacity: 50,
      status: "active",
    },
    {
      id: 2,
      name: "Afternoon Shift",
      time: "14:00 - 22:00",
      workers: 38,
      capacity: 45,
      status: "upcoming",
    },
    {
      id: 3,
      name: "Night Shift",
      time: "22:00 - 06:00",
      workers: 22,
      capacity: 30,
      status: "upcoming",
    },
  ]

  // Mock data for emergency alerts
  const emergencyAlerts = [
    {
      id: "EMG-001",
      type: "machinery",
      location: "Manufacturing Area B",
      reporter: "Abebe Kebede",
      time: "09:15 AM",
      severity: "high",
    },
    {
      id: "EMG-002",
      type: "safety",
      location: "Packaging Section",
      reporter: "Tigist Haile",
      time: "10:30 AM",
      severity: "medium",
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === "en" ? "Admin Dashboard" : "የአስተዳዳሪ ዳሽቦርድ"}
        description={
          language === "en" ? "Manage your workforce and factory operations" : "የሰራተኞችን እና የፋብሪካ ስራዎችን ያስተዳድሩ"
        }
        action={
          <div className="flex items-center gap-3">
            <DatePicker date={selectedDate} onSelect={setSelectedDate} />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === "en" ? "All Departments" : "ሁሉም ክፍሎች"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Departments" : "ሁሉም ክፍሎች"}</SelectItem>
                <SelectItem value="manufacturing">{language === "en" ? "Manufacturing" : "ማምረቻ"}</SelectItem>
                <SelectItem value="packaging">{language === "en" ? "Packaging" : "ማሸጊያ"}</SelectItem>
                <SelectItem value="quality">{language === "en" ? "Quality Control" : "የጥራት ቁጥጥር"}</SelectItem>
                <SelectItem value="logistics">{language === "en" ? "Logistics" : "ሎጂስቲክስ"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Workers Active" : "ንቁ ሰራተኞች"}
                </p>
                <div className="flex items-end gap-1">
                  <p className="text-3xl font-bold">{stats.workersActive}</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    / {stats.workersTotal} {language === "en" ? "total" : "ጠቅላላ"}
                  </p>
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(stats.workersActive / stats.workersTotal) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Attendance Rate" : "የመገኘት መጠን"}
                </p>
                <div className="flex items-end gap-1">
                  <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
                  <div className="flex items-center text-green-600 text-sm mb-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    2.1%
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span>
                  {stats.workersActive} {language === "en" ? "Present" : "ተገኝተዋል"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span>
                  {stats.lateArrivals} {language === "en" ? "Late" : "ዘግይተዋል"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span>
                  {stats.absences} {language === "en" ? "Absent" : "አልተገኙም"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Pending Approvals" : "በመጠባበቅ ላይ ያሉ ጥያቄዎች"}
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold">{stats.pendingRequests}</p>
                  <div className="flex flex-col text-xs text-muted-foreground mb-1">
                    <span>{stats.pendingTasks} tasks</span>
                    <span>{stats.openShifts} shifts</span>
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                className="w-full justify-between text-xs h-8 px-2"
                onClick={() => router.push("/admin/requests")}
              >
                <span>{language === "en" ? "View all requests" : "ሁሉንም ጥያቄዎች ይመልከቱ"}</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Emergency Alerts" : "የአደጋ ማስጠንቀቂያዎች"}
                </p>
                <div className="flex items-end gap-1">
                  <p className="text-3xl font-bold">{stats.emergencies}</p>
                  <Badge variant="destructive" className="mb-1">
                    {language === "en" ? "Active" : "ንቁ"}
                  </Badge>
                </div>
              </div>
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="destructive"
                className="w-full justify-between text-xs h-8 px-2"
                onClick={() => router.push("/admin/emergency")}
              >
                <span>{language === "en" ? "Respond now" : "አሁን ምላሽ ይስጡ"}</span>
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Department Attendance */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === "en" ? "Department Attendance" : "የክፍል መገኘት"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Today's attendance by department" : "የዛሬ መገኘት በክፍል"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentAttendance.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dept.name}</span>
                    <span
                      className={`text-sm font-medium ${
                        dept.rate >= 90 ? "text-green-600" : dept.rate >= 75 ? "text-amber-600" : "text-red-600"
                      }`}
                    >
                      {dept.rate}%
                    </span>
                  </div>
                  <Progress
                    value={dept.rate}
                    className={`h-2 ${
                      dept.rate >= 90 ? "bg-green-600" : dept.rate >= 75 ? "bg-amber-600" : "bg-red-600"
                    }`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {dept.present} {language === "en" ? "present" : "ተገኝተዋል"}
                    </span>
                    <span>
                      {dept.absent} {language === "en" ? "absent" : "አልተገኙም"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between" onClick={() => router.push("/admin/attendance")}>
              <span>{language === "en" ? "View detailed attendance" : "ዝርዝር መገኘትን ይመልከቱ"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">{language === "en" ? "Recent Activity" : "የቅርብ ጊዜ እንቅስቃሴ"}</CardTitle>
                <CardDescription>
                  {language === "en" ? "Latest events and actions" : "የቅርብ ጊዜ ክስተቶች እና እርምጃዎች"}
                </CardDescription>
              </div>
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder={language === "en" ? "Today" : "ዛሬ"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">{language === "en" ? "Today" : "ዛሬ"}</SelectItem>
                  <SelectItem value="week">{language === "en" ? "This Week" : "በዚህ ሳምንት"}</SelectItem>
                  <SelectItem value="month">{language === "en" ? "This Month" : "በዚህ ወር"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "check-in"
                        ? "bg-green-100"
                        : activity.type === "check-out"
                          ? "bg-blue-100"
                          : activity.type === "request"
                            ? "bg-amber-100"
                            : "bg-red-100"
                    }`}
                  >
                    {activity.type === "check-in" ? (
                      <Clock className="h-4 w-4 text-green-600" />
                    ) : activity.type === "check-out" ? (
                      <Clock className="h-4 w-4 text-blue-600" />
                    ) : activity.type === "request" ? (
                      <FileText className="h-4 w-4 text-amber-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium text-sm">{activity.worker}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.department}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {activity.type === "check-in" && (
                        <Badge
                          variant={activity.status === "on-time" ? "outline" : "secondary"}
                          className={
                            activity.status === "on-time"
                              ? "border-green-200 text-green-700 bg-green-50"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }
                        >
                          {activity.status === "on-time"
                            ? language === "en"
                              ? "On Time"
                              : "በሰዓቱ"
                            : language === "en"
                              ? "Late"
                              : "ዘግይቷል"}
                        </Badge>
                      )}
                      {activity.type === "check-out" && (
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                          {activity.status === "early"
                            ? language === "en"
                              ? "Early"
                              : "ቀድሞ"
                            : language === "en"
                              ? "On Time"
                              : "በሰዓቱ"}
                        </Badge>
                      )}
                      {activity.type === "request" && (
                        <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">
                          {activity.requestType === "leave"
                            ? language === "en"
                              ? "Leave Request"
                              : "የፈቃድ ጥያቄ"
                            : language === "en"
                              ? "Shift Swap"
                              : "የሺፍት መቀያየር"}
                        </Badge>
                      )}
                      {activity.type === "emergency" && (
                        <Badge
                          variant="outline"
                          className={
                            activity.severity === "high"
                              ? "border-red-200 text-red-700 bg-red-50"
                              : "border-amber-200 text-amber-700 bg-amber-50"
                          }
                        >
                          {activity.severity === "high"
                            ? language === "en"
                              ? "High Severity"
                              : "ከፍተኛ ጥብቀት"
                            : language === "en"
                              ? "Medium Severity"
                              : "መካከለኛ ጥብቀት"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Approvals, Shifts, and Emergencies */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === "en" ? "Quick Actions" : "ፈጣን እርምጃዎች"}</CardTitle>
          </CardHeader>
          <CardContent className="pb-1">
            <Tabs defaultValue="approvals">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="approvals" className="text-xs">
                  {language === "en" ? "Approvals" : "ማጽደቆች"}
                </TabsTrigger>
                <TabsTrigger value="shifts" className="text-xs">
                  {language === "en" ? "Shifts" : "ሺፍቶች"}
                </TabsTrigger>
                <TabsTrigger value="emergencies" className="text-xs">
                  {language === "en" ? "Emergencies" : "አደጋዎች"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="approvals" className="m-0">
                <div className="space-y-3">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div
                        className={`rounded-full p-2 ${
                          approval.type === "leave"
                            ? "bg-blue-100"
                            : approval.type === "shift-swap"
                              ? "bg-purple-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {approval.type === "leave" ? (
                          <Calendar className="h-4 w-4 text-blue-600" />
                        ) : approval.type === "shift-swap" ? (
                          <Layers className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{approval.worker}</p>
                          <p className="text-xs text-muted-foreground">{approval.date}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{approval.department}</p>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className={
                              approval.type === "leave"
                                ? "border-blue-200 text-blue-700 bg-blue-50"
                                : approval.type === "shift-swap"
                                  ? "border-purple-200 text-purple-700 bg-purple-50"
                                  : "border-amber-200 text-amber-700 bg-amber-50"
                            }
                          >
                            {approval.type === "leave"
                              ? `${approval.duration} ${language === "en" ? "Leave" : "ፈቃድ"}`
                              : approval.type === "shift-swap"
                                ? `${language === "en" ? "Swap with" : "ከሚቀያየሩት"} ${approval.swapWith}`
                                : `${approval.hours} ${language === "en" ? "Overtime" : "ትርፍ ሰዓት"}`}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs flex-1">
                            <XCircle className="h-3 w-3 mr-1" />
                            {language === "en" ? "Reject" : "አትቀበል"}
                          </Button>
                          <Button size="sm" className="h-7 text-xs flex-1 bg-purple-600 hover:bg-purple-700">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            {language === "en" ? "Approve" : "ተቀበል"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="shifts" className="m-0">
                <div className="space-y-3">
                  {upcomingShifts.map((shift) => (
                    <div key={shift.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className={`rounded-full p-2 ${shift.status === "active" ? "bg-green-100" : "bg-blue-100"}`}>
                        <Clock
                          className={`h-4 w-4 ${shift.status === "active" ? "text-green-600" : "text-blue-600"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{shift.name}</p>
                          <Badge
                            variant={shift.status === "active" ? "default" : "outline"}
                            className={
                              shift.status === "active" ? "bg-green-600" : "border-blue-200 text-blue-700 bg-blue-50"
                            }
                          >
                            {shift.status === "active"
                              ? language === "en"
                                ? "Active"
                                : "ንቁ"
                              : language === "en"
                                ? "Upcoming"
                                : "መጪ"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{shift.time}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>
                              {shift.workers}/{shift.capacity} {language === "en" ? "workers" : "ሰራተኞች"}
                            </span>
                            <span
                              className={
                                (shift.workers / shift.capacity) * 100 >= 90
                                  ? "text-green-600"
                                  : (shift.workers / shift.capacity) * 100 >= 75
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }
                            >
                              {Math.round((shift.workers / shift.capacity) * 100)}%
                            </span>
                          </div>
                          <Progress value={(shift.workers / shift.capacity) * 100} className="h-1.5" />
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2 h-7 text-xs"
                          onClick={() => router.push("/admin/shifts")}
                        >
                          {language === "en" ? "Manage Shift" : "ሺፍትን አስተዳድር"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="emergencies" className="m-0">
                <div className="space-y-3">
                  {emergencyAlerts.map((emergency) => (
                    <div key={emergency.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div
                        className={`rounded-full p-2 ${emergency.severity === "high" ? "bg-red-100" : "bg-amber-100"}`}
                      >
                        <AlertTriangle
                          className={`h-4 w-4 ${emergency.severity === "high" ? "text-red-600" : "text-amber-600"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">
                            {emergency.type === "machinery"
                              ? language === "en"
                                ? "Machinery Issue"
                                : "የማሽን ችግር"
                              : language === "en"
                                ? "Safety Hazard"
                                : "የደህንነት አደጋ"}
                          </p>
                          <p className="text-xs text-muted-foreground">{emergency.time}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{emergency.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Reported by" : "ሪፖርት ያደረገው"}: {emergency.reporter}
                        </p>
                        <div className="mt-1">
                          <Badge
                            variant={emergency.severity === "high" ? "destructive" : "outline"}
                            className={
                              emergency.severity !== "high" ? "border-amber-200 text-amber-700 bg-amber-50" : ""
                            }
                          >
                            {emergency.severity === "high"
                              ? language === "en"
                                ? "High Severity"
                                : "ከፍተኛ ጥብቀት"
                              : language === "en"
                                ? "Medium Severity"
                                : "መካከለኛ ጥብቀት"}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant={emergency.severity === "high" ? "destructive" : "outline"}
                          className="w-full mt-2 h-7 text-xs"
                          onClick={() => router.push("/admin/emergency")}
                        >
                          {language === "en" ? "Respond Now" : "አሁን ምላሽ ይስጡ"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between" onClick={() => router.push("/admin/requests")}>
              <span>{language === "en" ? "View all pending items" : "ሁሉንም በመጠባበቅ ላይ ያሉ ዕቃዎችን ይመልከቱ"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{language === "en" ? "Weekly Performance Overview" : "የሳምንታዊ አፈጻጸም አጠቃላይ እይታ"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Attendance, productivity and key metrics" : "መገኘት፣ ምርታማነት እና ቁልፍ መለኪያዎች"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {language === "en" ? "Filter" : "አጣራ"}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {language === "en" ? "Export" : "ላክ"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] rounded-md border bg-muted/20 flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {language === "en" ? "Weekly performance chart will be displayed here" : "የሳምንታዊ አፈጻጸም ቻርት እዚህ ይታያል"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
