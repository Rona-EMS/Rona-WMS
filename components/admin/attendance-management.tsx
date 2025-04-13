"use client"

import { useState } from "react"
import { Calendar, Clock, UserCheck, UserX, Filter, Download, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table/data-table"
import { useLanguage } from "@/lib/context/language-context"

// Mock data for attendance records
const attendanceData = [
  {
    id: "1",
    name: "John Doe",
    department: "Production",
    date: "2023-04-15",
    clockIn: "08:02:34",
    clockOut: "17:05:21",
    status: "Present",
    hours: "9.05",
    overtime: "0.05",
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Packaging",
    date: "2023-04-15",
    clockIn: "07:58:12",
    clockOut: "17:00:45",
    status: "Present",
    hours: "9.04",
    overtime: "0.04",
  },
  {
    id: "3",
    name: "Robert Johnson",
    department: "Logistics",
    date: "2023-04-15",
    clockIn: "08:15:33",
    clockOut: "17:10:02",
    status: "Late",
    hours: "8.91",
    overtime: "0.17",
  },
  {
    id: "4",
    name: "Emily Davis",
    department: "Quality Control",
    date: "2023-04-15",
    clockIn: "",
    clockOut: "",
    status: "Absent",
    hours: "0",
    overtime: "0",
  },
  {
    id: "5",
    name: "Michael Wilson",
    department: "Production",
    date: "2023-04-15",
    clockIn: "08:00:45",
    clockOut: "16:30:12",
    status: "Early Leave",
    hours: "8.49",
    overtime: "0",
  },
  {
    id: "6",
    name: "Sarah Brown",
    department: "Packaging",
    date: "2023-04-15",
    clockIn: "08:05:22",
    clockOut: "17:02:18",
    status: "Present",
    hours: "8.95",
    overtime: "0.04",
  },
  {
    id: "7",
    name: "David Miller",
    department: "Logistics",
    date: "2023-04-15",
    clockIn: "08:30:10",
    clockOut: "17:15:45",
    status: "Late",
    hours: "8.76",
    overtime: "0.26",
  },
]

// Attendance statistics
const attendanceStats = {
  present: 85,
  absent: 5,
  late: 8,
  earlyLeave: 2,
  totalEmployees: 120,
}

export function AttendanceManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("Today")
  const { language } = useLanguage()

  // Filter attendance data based on search term
  const filteredData = attendanceData.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Columns for the data table
  const columns = [
    {
      accessorKey: "name",
      header: language === "en" ? "Employee Name" : "የሰራተኛ ስም",
    },
    {
      accessorKey: "department",
      header: language === "en" ? "Department" : "ክፍል",
    },
    {
      accessorKey: "clockIn",
      header: "Clock In",
      cell: ({ row }) => {
        const clockIn = row.getValue("clockIn")
        return clockIn ? clockIn : "-"
      },
    },
    {
      accessorKey: "clockOut",
      header: "Clock Out",
      cell: ({ row }) => {
        const clockOut = row.getValue("clockOut")
        return clockOut ? clockOut : "-"
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            className={
              status === "Present"
                ? "bg-green-100 text-green-800"
                : status === "Absent"
                  ? "bg-red-100 text-red-800"
                  : status === "Late"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "hours",
      header: "Hours",
    },
    {
      accessorKey: "overtime",
      header: "Overtime",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.present}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((attendanceStats.present / 100) * attendanceStats.totalEmployees)} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.absent}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((attendanceStats.absent / 100) * attendanceStats.totalEmployees)} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.late}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((attendanceStats.late / 100) * attendanceStats.totalEmployees)} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Early Leave</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.earlyLeave}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((attendanceStats.earlyLeave / 100) * attendanceStats.totalEmployees)} employees
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === "en" ? "Search employees..." : "ሰራተኞችን ይፈልጉ..."}
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="daily" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Daily Attendance</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedDate("Yesterday")}>
                Yesterday
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate("Today")} className="bg-muted">
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDate("Tomorrow")}>
                Tomorrow
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "en" ? "Attendance Records - " : "የመገኘት መዝገቦች - "}
                {selectedDate}
              </CardTitle>
              <CardDescription>
                Showing {filteredData.length} of {attendanceData.length} records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={filteredData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Summary</CardTitle>
              <CardDescription>April 10 - April 16, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Weekly attendance data visualization would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Summary</CardTitle>
              <CardDescription>April 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Monthly attendance data visualization would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
