"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Calendar,
  Clock,
  Users,
  Briefcase,
  BarChart,
  AlertTriangle,
  CheckCircle,
  FileText,
  Clock3,
} from "lucide-react"
import { DateTimeDisplay } from "@/components/date-time-display"
import { useLanguage } from "@/lib/context/language-context"
import Link from "next/link"

// Mock data
const dashboardStats = {
  totalWorkers: 238,
  presentToday: 213,
  lateToday: 14,
  absentToday: 11,
  openShifts: 7,
  pendingRequests: 12,
  reportedEmergencies: 3,
}

const emergencyAlerts = [
  {
    id: "emg1",
    type: "machinery",
    location: "Production Area B",
    reporter: "Abebe Kebede",
    time: "08:42 AM",
    severity: "high",
  },
  {
    id: "emg2",
    type: "safety",
    location: "Packaging Section",
    reporter: "Hiwot Mekonnen",
    time: "09:15 AM",
    severity: "medium",
  },
]

const pendingApprovals = [
  {
    id: "req1",
    type: "leave",
    worker: "Kidist Alemu",
    dates: "May 15-17, 2025",
    requestDate: "Apr 20, 2025",
  },
  {
    id: "req2",
    type: "shift-swap",
    worker: "Solomon Bekele",
    dates: "May 4, 2025",
    requestDate: "Apr 28, 2025",
  },
  {
    id: "req3",
    type: "overtime",
    worker: "Tigist Haile",
    dates: "May 2, 2025",
    requestDate: "Apr 29, 2025",
  },
]

export function AdminDashboard() {
  const { language, t } = useLanguage()
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {language === "en" ? "Welcome to Admin Dashboard" : "እንኳን ወደ አስተዳዳሪ ዳሽቦርድ በደህና መጡ"}
          </h2>
          <p className="text-muted-foreground">
            {language === "en" ? "Manage your factory operations and workforce" : "የፋብሪካዎን ስራዎች እና የሰራተኛ ሃይልን ያስተዳድሩ"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DatePicker date={selectedDate} onSelect={setSelectedDate} />
          <DateTimeDisplay className="text-lg" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "en" ? "Total Workers" : "ጠቅላላ ሰራተኞች"}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalWorkers}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("admin.activeEmployees")}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.todayAttendance")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{dashboardStats.presentToday}</div>
                <p className="text-xs text-muted-foreground">{t("admin.present")}</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-amber-600">{dashboardStats.lateToday}</div>
                <p className="text-xs text-muted-foreground">{t("admin.late")}</p>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{dashboardStats.absentToday}</div>
                <p className="text-xs text-muted-foreground">{t("admin.absent")}</p>
              </div>
            </div>
            <div className="mt-2 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: `${Math.round((dashboardStats.presentToday / dashboardStats.totalWorkers) * 100)}%` }}
              ></div>
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${Math.round((dashboardStats.lateToday / dashboardStats.totalWorkers) * 100)}%` }}
              ></div>
              <div
                className="bg-red-500 h-full"
                style={{ width: `${Math.round((dashboardStats.absentToday / dashboardStats.totalWorkers) * 100)}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.openShifts")}</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.openShifts}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("admin.needsStaffing")}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.pendingRequests")}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("admin.awaitingApproval")}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("admin.emergencies")}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-red-600">{dashboardStats.reportedEmergencies}</div>
                <p className="text-xs text-muted-foreground">{t("admin.active")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-gray-600">21</div>
                <p className="text-xs text-muted-foreground">{t("admin.resolved")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-blue-600">98%</div>
                <p className="text-xs text-muted-foreground">{t("admin.responseRate")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Alerts */}
      <Card className="border-red-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              {t("admin.emergencyAlerts")}
            </CardTitle>
            <Link href="/admin/emergency">
              <Button variant="outline" size="sm">
                {language === "en" ? "Manage All" : "ሁሉንም ያስተዳድሩ"}
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {emergencyAlerts.length > 0 ? (
            <div className="space-y-3">
              {emergencyAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    alert.severity === "high"
                      ? "bg-red-50 border border-red-200"
                      : "bg-amber-50 border border-amber-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${alert.severity === "high" ? "bg-red-100" : "bg-amber-100"}`}>
                      <AlertTriangle
                        className={`h-4 w-4 ${alert.severity === "high" ? "text-red-500" : "text-amber-500"}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{t(`emergencies.types.${alert.type}`)}</h4>
                        <Badge
                          variant="outline"
                          className={
                            alert.severity === "high"
                              ? "border-red-200 text-red-600"
                              : "border-amber-200 text-amber-600"
                          }
                        >
                          {t(`emergencies.severity.${alert.severity}`)}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        {alert.location} • {t("admin.reportedBy")} {alert.reporter} • {alert.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className={alert.severity === "high" ? "bg-red-600 hover:bg-red-700" : ""}>
                    {t("admin.respond")}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-muted-foreground">{t("admin.noActiveEmergencies")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="approvals" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">{t("admin.pendingApprovals")}</TabsTrigger>
          <TabsTrigger value="attendance">{t("admin.attendanceOverview")}</TabsTrigger>
          <TabsTrigger value="todayShifts">{t("admin.todayShifts")}</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.reviewRequests")}</CardTitle>
              <CardDescription>{t("admin.reviewRequestsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          approval.type === "leave"
                            ? "bg-blue-100"
                            : approval.type === "shift-swap"
                              ? "bg-purple-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {approval.type === "leave" ? (
                          <Calendar className="h-4 w-4 text-blue-500" />
                        ) : approval.type === "shift-swap" ? (
                          <Clock3 className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{approval.worker}</h4>
                          <Badge
                            variant="outline"
                            className={
                              approval.type === "leave"
                                ? "border-blue-200 text-blue-600"
                                : approval.type === "shift-swap"
                                  ? "border-purple-200 text-purple-600"
                                  : "border-amber-200 text-amber-600"
                            }
                          >
                            {t(`admin.requestTypes.${approval.type}`)}
                          </Badge>
                        </div>
                        <p className="text-sm">
                          {approval.dates} • {t("admin.requestedOn")} {approval.requestDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        {t("admin.deny")}
                      </Button>
                      <Button size="sm">{t("admin.approve")}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">{language === "en" ? "View All" : "ሁሉንም ይመልከቱ"}</Button>
              <Button>{t("admin.reviewSelected")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.attendanceStats")}</CardTitle>
              <CardDescription>{t("admin.attendanceStatsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border bg-muted/40 flex items-center justify-center">
                <BarChart className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">{t("admin.attendanceChartPlaceholder")}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/attendance">
                <Button>{t("admin.viewDetailedAttendance")}</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="todayShifts">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.shiftsForToday")}</CardTitle>
              <CardDescription>{t("admin.shiftsForTodayDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{t("shifts.morning")}</h4>
                    <Badge className="bg-blue-500">{t("shifts.active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.timeSlot")}</span>
                    <span className="font-medium">06:00 - 14:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.assigned")}</span>
                    <span className="font-medium">75/80</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>{t("admin.present")}</span>
                    <span className="font-medium text-green-600">70</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("admin.manageShift")}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{t("shifts.afternoon")}</h4>
                    <Badge variant="outline">{t("shifts.upcoming")}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.timeSlot")}</span>
                    <span className="font-medium">14:00 - 22:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.assigned")}</span>
                    <span className="font-medium">78/80</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>{t("admin.checkedIn")}</span>
                    <span className="font-medium text-gray-600">0</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("admin.manageShift")}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{t("shifts.night")}</h4>
                    <Badge variant="outline">{t("shifts.upcoming")}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.timeSlot")}</span>
                    <span className="font-medium">22:00 - 06:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{t("admin.assigned")}</span>
                    <span className="font-medium">73/80</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span>{t("admin.checkedIn")}</span>
                    <span className="font-medium text-gray-600">0</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("admin.manageShift")}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/admin/shifts">
                <Button>{t("admin.viewAllShifts")}</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
