"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { workers, getAttendanceByWorkerId } from "@/lib/mock-data"
import {
  Calendar,
  Clock,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle2,
  Search,
  Download,
  Filter,
} from "lucide-react"

export default function AdminAttendancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Get today's date
  const today = new Date()
  const todayStr = today.toISOString().split("T")[0]

  // Get all attendance records
  const allAttendance = workers.flatMap((worker) => {
    const attendance = getAttendanceByWorkerId(worker.id)
    return attendance.map((record) => ({
      ...record,
      workerName: worker.name,
      workerId: worker.id,
      department: worker.department,
      position: worker.position,
    }))
  })

  // Filter today's attendance
  const todayAttendance = allAttendance.filter((record) => record.date.split("T")[0] === todayStr)

  // Calculate statistics
  const presentCount = todayAttendance.filter(
    (record) => record.status === "present" || record.status === "late",
  ).length

  const absentCount = todayAttendance.filter((record) => record.status === "absent").length

  const lateCount = todayAttendance.filter((record) => record.status === "late").length

  const attendanceRate = Math.round((presentCount / todayAttendance.length) * 100) || 0

  // Filter attendance records based on search and filter
  const filteredAttendance = allAttendance.filter((record) => {
    const matchesSearch =
      record.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.workerId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || record.status === filterStatus

    return matchesSearch && matchesFilter
  })

  return (
    <DashboardShell
      title={language === "en" ? "Attendance Management" : "የመገኘት አስተዳደር"}
      description={language === "en" ? "Monitor and manage employee attendance" : "የሰራተኞችን መገኘት ይቆጣጠሩ እና ያስተዳድሩ"}
      headerAction={
        <Button variant="default" className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Download className="h-4 w-4" />
          {language === "en" ? "Export Report" : "ሪፖርት ያውጡ"}
        </Button>
      }
    >
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                {language === "en" ? "Present Today" : "ዛሬ የተገኙ"}
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">{presentCount}</p>
              <p className="text-sm text-green-600 dark:text-green-500">
                {language === "en" ? "of" : "ከ"} {todayAttendance.length} {language === "en" ? "employees" : "ሰራተኞች"}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
              <UserCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {language === "en" ? "Absent Today" : "ዛሬ ያልተገኙ"}
              </p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-400">{absentCount}</p>
              <p className="text-sm text-red-600 dark:text-red-500">
                {language === "en" ? "of" : "ከ"} {todayAttendance.length} {language === "en" ? "employees" : "ሰራተኞች"}
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-800/50 p-3 rounded-full">
              <UserX className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                {language === "en" ? "Late Arrivals" : "የዘገዩ መግቢያዎች"}
              </p>
              <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">{lateCount}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                {language === "en" ? "of" : "ከ"} {todayAttendance.length} {language === "en" ? "employees" : "ሰራተኞች"}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800/50 p-3 rounded-full">
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {language === "en" ? "Attendance Rate" : "የመገኘት መጠን"}
              </p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{attendanceRate}%</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                {language === "en" ? "Today's average" : "የዛሬ አማካይ"}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {language === "en" ? "Overview" : "አጠቃላይ እይታ"}
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {language === "en" ? "Today" : "ዛሬ"}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {language === "en" ? "History" : "ታሪክ"}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Department Attendance Overview" : "የክፍል መገኘት አጠቃላይ እይታ"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Manufacturing Department */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{language === "en" ? "Manufacturing" : "ማምረቻ"}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      92% {language === "en" ? "Present" : "ተገኝተዋል"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{language === "en" ? "46 Present" : "46 ተገኝተዋል"}</span>
                    <span>{language === "en" ? "4 Absent" : "4 አልተገኙም"}</span>
                  </div>
                </div>

                {/* Packaging Department */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{language === "en" ? "Packaging" : "ማሸጊያ"}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      88% {language === "en" ? "Present" : "ተገኝተዋል"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{language === "en" ? "22 Present" : "22 ተገኝተዋል"}</span>
                    <span>{language === "en" ? "3 Absent" : "3 አልተገኙም"}</span>
                  </div>
                </div>

                {/* Quality Control Department */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{language === "en" ? "Quality Control" : "የጥራት ቁጥጥር"}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      75% {language === "en" ? "Present" : "ተገኝተዋል"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{language === "en" ? "12 Present" : "12 ተገኝተዋል"}</span>
                    <span>{language === "en" ? "4 Absent" : "4 አልተገኙም"}</span>
                  </div>
                </div>

                {/* Logistics Department */}
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{language === "en" ? "Logistics" : "ሎጂስቲክስ"}</h3>
                    <span className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      65% {language === "en" ? "Present" : "ተገኝተዋል"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{language === "en" ? "13 Present" : "13 ተገኝተዋል"}</span>
                    <span>{language === "en" ? "7 Absent" : "7 አልተገኙም"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Today Tab */}
        <TabsContent value="today" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Today's Attendance" : "የዛሬ መገኘት"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search employees..." : "ሰራተኞችን ይፈልጉ..."}
                    className="pl-8 pr-4 py-2 w-full border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    {language === "en" ? "Filter" : "አጣራ"}
                  </Button>
                  <select
                    className="border rounded-md px-2 py-1"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">{language === "en" ? "All" : "ሁሉም"}</option>
                    <option value="present">{language === "en" ? "Present" : "ተገኝተዋል"}</option>
                    <option value="late">{language === "en" ? "Late" : "ዘግይተዋል"}</option>
                    <option value="absent">{language === "en" ? "Absent" : "አልተገኙም"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {todayAttendance
                  .filter((record) => {
                    const matchesSearch =
                      record.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      record.workerId.toLowerCase().includes(searchTerm.toLowerCase())

                    const matchesFilter = filterStatus === "all" || record.status === filterStatus

                    return matchesSearch && matchesFilter
                  })
                  .map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {record.status === "present" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : record.status === "late" ? (
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                        <div>
                          <p className="font-medium">{record.workerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.department} - {record.position}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Employee ID" : "የሰራተኛ መታወቂያ"}
                        </p>
                        <p className="font-medium">{record.workerId}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {record.checkInTime ? record.checkInTime : "-"} -{" "}
                          {record.checkOutTime ? record.checkOutTime : "-"}
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
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Attendance History" : "የመገኘት ታሪክ"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search employees..." : "ሰራተኞችን ይፈልጉ..."}
                    className="pl-8 pr-4 py-2 w-full border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    {language === "en" ? "Date Range" : "የቀን ክልል"}
                  </Button>
                  <select
                    className="border rounded-md px-2 py-1"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">{language === "en" ? "All" : "ሁሉም"}</option>
                    <option value="present">{language === "en" ? "Present" : "ተገኝተዋል"}</option>
                    <option value="late">{language === "en" ? "Late" : "ዘግይተዋል"}</option>
                    <option value="absent">{language === "en" ? "Absent" : "አልተገኙም"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {filteredAttendance.slice(0, 10).map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {record.status === "present" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : record.status === "late" ? (
                        <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                      <div>
                        <p className="font-medium">{record.workerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.department} - {record.position}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{language === "en" ? "Date" : "ቀን"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {record.checkInTime ? record.checkInTime : "-"} -{" "}
                        {record.checkOutTime ? record.checkOutTime : "-"}
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
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
