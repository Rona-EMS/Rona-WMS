"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle, Clock, UserCheck, Users, AlertTriangle, Briefcase } from "lucide-react"
import { DateTimeDisplay } from "@/components/date-time-display"
import { useLanguage } from "@/lib/context/language-context"
import Link from "next/link"

// Mock data
const upcomingShifts = [
  {
    id: "shift1",
    date: "2025-05-02",
    time: "06:00 - 14:00",
    type: "morning",
  },
  {
    id: "shift2",
    date: "2025-05-03",
    time: "14:00 - 22:00",
    type: "afternoon",
  },
  {
    id: "shift3",
    date: "2025-05-04",
    time: "06:00 - 14:00",
    type: "morning",
  },
]

const recentAttendance = [
  {
    id: "att1",
    date: "2025-05-01",
    checkIn: "05:55",
    checkOut: "14:05",
    status: "ontime",
  },
  {
    id: "att2",
    date: "2025-04-30",
    checkIn: "06:10",
    checkOut: "14:00",
    status: "late",
  },
  {
    id: "att3",
    date: "2025-04-29",
    checkIn: "05:50",
    checkOut: "14:00",
    status: "ontime",
  },
]

const announcements = [
  {
    id: "ann1",
    title: "Schedule Change Next Week",
    date: "2025-04-28",
    content: "Due to maintenance, there will be schedule adjustments next week. Please check the updated schedule.",
    priority: "medium",
  },
  {
    id: "ann2",
    title: "Safety Training",
    date: "2025-04-25",
    content: "Mandatory safety training will be held on May 10th. All workers must attend.",
    priority: "high",
  },
]

const pendingRequests = [
  {
    id: "req1",
    type: "leave",
    dates: "May 15-17, 2025",
    status: "pending",
    submittedDate: "2025-04-20",
  },
]

export function WorkerDashboard() {
  const { language, t } = useLanguage()
  const [timeFilter, setTimeFilter] = React.useState("week")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("dashboard.welcome")}</h2>
          <p className="text-muted-foreground">{t("dashboard.todayIs")}</p>
        </div>
        <DateTimeDisplay className="text-lg" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.todayShift")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500">{t("shifts.morning")}</Badge>
              <span className="text-xl font-bold">06:00 - 14:00</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.checkInReminder")}: 05:45 - 06:15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.thisMonth")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21/23</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.daysWorked")}</p>
            <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: "91%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.overtimeHours")}</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.leaveBalance")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">{t("dashboard.daysRemaining")}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("dashboard.upcomingShifts")}</CardTitle>
              <Link href="/worker/shifts">
                <Button variant="ghost" size="sm">
                  {t("dashboard.viewAll")}
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        shift.type === "morning"
                          ? "bg-blue-100 text-blue-600"
                          : shift.type === "afternoon"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{shift.date}</p>
                      <p className="text-sm text-muted-foreground">{shift.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      shift.type === "morning"
                        ? "border-blue-200 text-blue-600"
                        : shift.type === "afternoon"
                          ? "border-orange-200 text-orange-600"
                          : "border-purple-200 text-purple-600"
                    }
                  >
                    {t(`shifts.${shift.type}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("dashboard.recentAttendance")}</CardTitle>
              <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder={t("dashboard.filterByTime")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t("dashboard.thisWeek")}</SelectItem>
                  <SelectItem value="month">{t("dashboard.thisMonth")}</SelectItem>
                  <SelectItem value="quarter">{t("dashboard.thisQuarter")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAttendance.map((attendance) => (
                <div key={attendance.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        attendance.status === "ontime"
                          ? "bg-green-100 text-green-600"
                          : attendance.status === "late"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {attendance.status === "ontime" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{attendance.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {attendance.checkIn} - {attendance.checkOut}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      attendance.status === "ontime"
                        ? "bg-green-100 text-green-600 hover:bg-green-100"
                        : attendance.status === "late"
                          ? "bg-amber-100 text-amber-600 hover:bg-amber-100"
                          : "bg-red-100 text-red-600 hover:bg-red-100"
                    }
                    variant="secondary"
                  >
                    {t(`attendance.${attendance.status}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("dashboard.announcements")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold">{announcement.title}</h4>
                    <Badge
                      variant="outline"
                      className={
                        announcement.priority === "high"
                          ? "border-red-200 text-red-600"
                          : announcement.priority === "medium"
                            ? "border-amber-200 text-amber-600"
                            : "border-blue-200 text-blue-600"
                      }
                    >
                      {t(`announcements.${announcement.priority}`)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
                  <p className="text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{t("dashboard.pendingRequests")}</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{t(`requests.${request.type}`)}</Badge>
                        <span className="text-sm font-medium">{request.dates}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("dashboard.submitted")}: {request.submittedDate}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-amber-200 text-amber-600">
                      {t(`requests.${request.status}`)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t("dashboard.noRequests")}</p>
                <div className="flex justify-center mt-4 gap-2">
                  <Link href="/worker/requests?type=leave">
                    <Button size="sm" variant="outline">
                      {t("dashboard.requestLeave")}
                    </Button>
                  </Link>
                  <Link href="/worker/requests?type=shift">
                    <Button size="sm" variant="outline">
                      {t("dashboard.requestShiftSwap")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clock" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clock">{t("dashboard.clockInOut")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("dashboard.notifications")}</TabsTrigger>
          <TabsTrigger value="quickActions">{t("dashboard.quickActions")}</TabsTrigger>
        </TabsList>
        <TabsContent value="clock">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-3xl font-bold">08:24:13</span>
                  <p className="text-sm text-muted-foreground">{t("dashboard.currentTime")}</p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button size="lg" className="px-8" disabled>
                    {t("dashboard.clockIn")}
                  </Button>
                  <Button size="lg" className="px-8" variant="outline">
                    {t("dashboard.clockOut")}
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{t("dashboard.clockedInAt")}: 06:03 AM</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">{t("dashboard.overtimeApproved")}</h4>
                    <p className="text-sm text-blue-700">{t("dashboard.overtimeApprovedDesc")}</p>
                    <p className="text-xs text-blue-600 mt-1">2 {t("dashboard.hoursAgo")}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">{t("dashboard.scheduleChange")}</h4>
                    <p className="text-sm text-yellow-700">{t("dashboard.scheduleChangeDesc")}</p>
                    <p className="text-xs text-yellow-600 mt-1">5 {t("dashboard.hoursAgo")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quickActions">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <Link href="/worker/attendance" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-center">{t("dashboard.viewAttendance")}</span>
                  </div>
                </Link>
                <Link href="/worker/shifts" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-center">{t("dashboard.viewShifts")}</span>
                  </div>
                </Link>
                <Link href="/worker/requests?type=leave" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-center">{t("dashboard.requestLeave")}</span>
                  </div>
                </Link>
                <Link href="/worker/emergency" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-center">{t("dashboard.reportEmergency")}</span>
                  </div>
                </Link>
                <Link href="/worker/payslips" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    <span className="text-sm font-medium text-center">{t("dashboard.viewPayslips")}</span>
                  </div>
                </Link>
                <Link href="/worker/profile" className="block">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className="text-sm font-medium text-center">{t("dashboard.viewProfile")}</span>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
