"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, MoreHorizontal, Search } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

// Mock data for workers
const workers = [
  {
    id: "W001",
    name: "Abebe Kebede",
    initials: "AK",
    image: "",
    department: "Assembly",
    position: "Line Worker",
    status: "Active",
    shift: "Morning",
    attendance: "96%",
    joinDate: "Mar 15, 2023",
  },
  {
    id: "W002",
    name: "Tigist Haile",
    initials: "TH",
    image: "",
    department: "Packaging",
    position: "Team Lead",
    status: "Active",
    shift: "Afternoon",
    attendance: "98%",
    joinDate: "Jan 8, 2022",
  },
  {
    id: "W003",
    name: "Dawit Mekonnen",
    initials: "DM",
    image: "",
    department: "Maintenance",
    position: "Technician",
    status: "Active",
    shift: "Night",
    attendance: "92%",
    joinDate: "Aug 21, 2023",
  },
  {
    id: "W004",
    name: "Hiwot Girma",
    initials: "HG",
    image: "",
    department: "Quality Control",
    position: "Inspector",
    status: "On Leave",
    shift: "Morning",
    attendance: "95%",
    joinDate: "Nov 30, 2022",
  },
  {
    id: "W005",
    name: "Yonas Alemu",
    initials: "YA",
    image: "",
    department: "Warehouse",
    position: "Forklift Operator",
    status: "Active",
    shift: "Afternoon",
    attendance: "94%",
    joinDate: "Jun 12, 2023",
  },
  {
    id: "W006",
    name: "Selamawit Tadesse",
    initials: "ST",
    image: "",
    department: "Assembly",
    position: "Quality Checker",
    status: "Inactive",
    shift: "Night",
    attendance: "87%",
    joinDate: "Oct 5, 2021",
  },
]

const departments = ["All Departments", "Assembly", "Packaging", "Quality Control", "Maintenance", "Warehouse"]
const shifts = ["All Shifts", "Morning", "Afternoon", "Night"]
const statuses = ["All Statuses", "Active", "On Leave", "Inactive"]

export function WorkerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [shiftFilter, setShiftFilter] = useState("All Shifts")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const { language } = useLanguage()

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "All Departments" || worker.department === departmentFilter
    const matchesShift = shiftFilter === "All Shifts" || worker.shift === shiftFilter
    const matchesStatus = statusFilter === "All Statuses" || worker.status === statusFilter

    return matchesSearch && matchesDepartment && matchesShift && matchesStatus
  })

  return (
    <Card className="border-gold-400/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{language === "en" ? "Worker Directory" : "የሰራተኞች ማውጫ"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Manage and view all worker information" : "ሁሉንም የሰራተኛ መረጃ ያስተዳድሩ እና ይመልከቱ"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Advanced Filters</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Workers</DialogTitle>
                  <DialogDescription>Set multiple criteria to filter the worker list.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Performance</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-sm">Min. Attendance</label>
                        <Input type="number" placeholder="80" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm">Max. Attendance</label>
                        <Input type="number" placeholder="100" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Join Date</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-sm">From</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm">To</label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Position</h4>
                    <Input placeholder="Search positions..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Reset Filters</Button>
                  <Button variant="gold">Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="gold">Export List</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "en" ? "Search workers by name or ID..." : "ሰራተኞችን በስም ወይም በመታወቂያ ቁጥር ይፈልጉ..."
                }
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift} value={shift}>
                      {shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-gold-400/20">
            <Table>
              <TableHeader>
                <TableRow className="bg-gold-400/10">
                  <TableHead>Worker ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.map((worker) => (
                  <TableRow key={worker.id} className="border-b border-gold-400/10">
                    <TableCell className="font-medium">{worker.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={worker.image || "/placeholder.svg"} alt={worker.name} />
                          <AvatarFallback className="bg-gold-400 text-black">{worker.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{worker.name}</div>
                          <div className="text-xs text-muted-foreground">Joined {worker.joinDate}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{worker.department}</TableCell>
                    <TableCell>{worker.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gold-400" />
                        {worker.shift}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          worker.status === "Active"
                            ? "default"
                            : worker.status === "On Leave"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {worker.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          Number.parseInt(worker.attendance) > 95
                            ? "text-green-500"
                            : Number.parseInt(worker.attendance) > 90
                              ? "text-gold-400"
                              : "text-red-500"
                        }`}
                      >
                        {worker.attendance}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>{language === "en" ? "View Profile" : "መገለጫ ይመልከቱ"}</DropdownMenuItem>
                          <DropdownMenuItem>{language === "en" ? "Edit Worker" : "ሰራተኛን ያስተካክሉ"}</DropdownMenuItem>
                          <DropdownMenuItem>{language === "en" ? "Assign Shift" : "ሺፍት ይመድቡ"}</DropdownMenuItem>
                          <DropdownMenuItem>{language === "en" ? "View Attendance" : "መገኘት ይመልከቱ"}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            {language === "en" ? "Deactivate Worker" : "ሰራተኛን ያሰናክሉ"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredWorkers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No workers found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredWorkers.length} of {workers.length} workers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
