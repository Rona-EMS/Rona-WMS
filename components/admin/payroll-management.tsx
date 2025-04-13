"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ChevronLeft, ChevronRight, Download, Settings } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"

type PayPeriod = "current" | "previous" | "approved"

type PayrollEntry = {
  id: string
  worker: {
    id: string
    name: string
    initials: string
    image: string
    department: string
    position: string
  }
  regularHours: number
  overtimeHours: number
  basePay: number
  overtime: number
  deductions: number
  benefits: number
  total: number
  status: "Draft" | "Pending" | "Approved" | "Paid"
}

const payrollData: Record<PayPeriod, PayrollEntry[]> = {
  current: [
    {
      id: "PR-1001",
      worker: {
        id: "W001",
        name: "Abebe Kebede",
        initials: "AK",
        image: "",
        department: "Assembly",
        position: "Line Worker",
      },
      regularHours: 80,
      overtimeHours: 12,
      basePay: 1200,
      overtime: 270,
      deductions: 140,
      benefits: 100,
      total: 1430,
      status: "Draft",
    },
    {
      id: "PR-1002",
      worker: {
        id: "W002",
        name: "Tigist Haile",
        initials: "TH",
        image: "",
        department: "Packaging",
        position: "Team Lead",
      },
      regularHours: 80,
      overtimeHours: 8,
      basePay: 1600,
      overtime: 240,
      deductions: 180,
      benefits: 150,
      total: 1810,
      status: "Draft",
    },
    {
      id: "PR-1003",
      worker: {
        id: "W003",
        name: "Dawit Mekonnen",
        initials: "DM",
        image: "",
        department: "Maintenance",
        position: "Technician",
      },
      regularHours: 76,
      overtimeHours: 10,
      basePay: 1320,
      overtime: 275,
      deductions: 160,
      benefits: 120,
      total: 1555,
      status: "Draft",
    },
  ],
  previous: [
    {
      id: "PR-0945",
      worker: {
        id: "W001",
        name: "Abebe Kebede",
        initials: "AK",
        image: "",
        department: "Assembly",
        position: "Line Worker",
      },
      regularHours: 80,
      overtimeHours: 8,
      basePay: 1200,
      overtime: 180,
      deductions: 140,
      benefits: 100,
      total: 1340,
      status: "Approved",
    },
    {
      id: "PR-0946",
      worker: {
        id: "W002",
        name: "Tigist Haile",
        initials: "TH",
        image: "",
        department: "Packaging",
        position: "Team Lead",
      },
      regularHours: 80,
      overtimeHours: 5,
      basePay: 1600,
      overtime: 150,
      deductions: 180,
      benefits: 150,
      total: 1720,
      status: "Approved",
    },
  ],
  approved: [
    {
      id: "PR-0901",
      worker: {
        id: "W001",
        name: "Abebe Kebede",
        initials: "AK",
        image: "",
        department: "Assembly",
        position: "Line Worker",
      },
      regularHours: 80,
      overtimeHours: 6,
      basePay: 1200,
      overtime: 135,
      deductions: 140,
      benefits: 100,
      total: 1295,
      status: "Paid",
    },
    {
      id: "PR-0902",
      worker: {
        id: "W002",
        name: "Tigist Haile",
        initials: "TH",
        image: "",
        department: "Packaging",
        position: "Team Lead",
      },
      regularHours: 80,
      overtimeHours: 4,
      basePay: 1600,
      overtime: 120,
      deductions: 180,
      benefits: 150,
      total: 1690,
      status: "Paid",
    },
  ],
}

export function PayrollManagement() {
  const [activeTab, setActiveTab] = useState<PayPeriod>("current")
  const [payPeriod, setPayPeriod] = useState("March 1-15, 2023")
  const [department, setDepartment] = useState("All Departments")
  const { language } = useLanguage()
  const [currentPeriod, setCurrentPeriod] = useState("March 1-15, 2023")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">{language === "en" ? "Current Pay Period" : "የአሁኑ የክፍያ ጊዜ"}</CardTitle>
            <CardDescription>March 1-15, 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant="outline" className="text-gold-400 border-gold-400">
                  In Progress
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Workers:</span>
                <span className="font-medium">112</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Payroll:</span>
                <span className="font-medium">$76,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Closing Date:</span>
                <span className="font-medium">March 16, 2023</span>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full gap-2 mt-2">
                  <Settings className="h-4 w-4" />
                  Configure Pay Period
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">Payroll Summary</CardTitle>
            <CardDescription>Current pay period statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Regular Pay:</span>
                <span className="font-medium">$65,120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Overtime:</span>
                <span className="font-medium text-gold-400">$8,940</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Benefits:</span>
                <span className="font-medium text-green-500">$11,230</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Deductions:</span>
                <span className="font-medium text-destructive">$8,840</span>
              </div>
              <div className="pt-2 border-t border-gold-400/20 mt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Net Payroll:</span>
                  <span className="font-bold text-gold-400">$76,450</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">Actions</CardTitle>
            <CardDescription>Process and manage payroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Export Payroll Data
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <CalendarDays className="h-4 w-4" />
                View Pay Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gold-400/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Payroll Processing</CardTitle>
              <CardDescription>Manage and process worker payments</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Select value={payPeriod} onValueChange={setPayPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pay Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="March 1-15, 2023">March 1-15, 2023</SelectItem>
                    <SelectItem value="February 16-28, 2023">February 16-28, 2023</SelectItem>
                    <SelectItem value="February 1-15, 2023">February 1-15, 2023</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  <SelectItem value="Assembly">Assembly</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Quality Control">Quality Control</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PayPeriod)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">{language === "en" ? "Current Period" : "የአሁኑ ጊዜ"}</TabsTrigger>
              <TabsTrigger value="previous">{language === "en" ? "Previous Period" : "ያለፈው ጊዜ"}</TabsTrigger>
              <TabsTrigger value="approved">{language === "en" ? "Paid History" : "የተከፈለ ታሪክ"}</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <div className="rounded-md border border-gold-400/20 overflow-x-auto">
                <div className="w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gold-400/10">
                        <TableHead className="w-[80px]">{language === "en" ? "Worker ID" : "የሰራተኛ መታወቂያ"}</TableHead>
                        <TableHead className="min-w-[180px]">{language === "en" ? "Name" : "ስም"}</TableHead>
                        <TableHead className="text-right w-[100px]">Regular Hours</TableHead>
                        <TableHead className="text-right w-[100px]">Overtime Hours</TableHead>
                        <TableHead className="text-right w-[100px]">Base Pay ($)</TableHead>
                        <TableHead className="text-right w-[100px]">Overtime ($)</TableHead>
                        <TableHead className="text-right w-[100px]">Deductions ($)</TableHead>
                        <TableHead className="text-right w-[100px]">Benefits ($)</TableHead>
                        <TableHead className="text-right w-[100px]">Total ($)</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="text-right w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollData[activeTab].map((entry) => (
                        <TableRow key={entry.id} className="border-b border-gold-400/10">
                          <TableCell className="font-medium">{entry.worker.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage
                                  src={entry.worker.image || "/placeholder.svg?height=32&width=32"}
                                  alt={entry.worker.name}
                                />
                                <AvatarFallback className="bg-gold-400 text-black">
                                  {entry.worker.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <div className="font-medium truncate">{entry.worker.name}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {entry.worker.department}, {entry.worker.position}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{entry.regularHours}</TableCell>
                          <TableCell className="text-right font-medium text-gold-400">{entry.overtimeHours}</TableCell>
                          <TableCell className="text-right">{entry.basePay}</TableCell>
                          <TableCell className="text-right font-medium text-gold-400">{entry.overtime}</TableCell>
                          <TableCell className="text-right font-medium text-destructive">{entry.deductions}</TableCell>
                          <TableCell className="text-right font-medium text-green-500">{entry.benefits}</TableCell>
                          <TableCell className="text-right font-bold">{entry.total}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                entry.status === "Paid"
                                  ? "default"
                                  : entry.status === "Approved"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {entry.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              {activeTab === "current" && (
                                <Button variant="gold" size="sm">
                                  Edit
                                </Button>
                              )}
                              {activeTab !== "current" && (
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Download className="h-3.5 w-3.5" />
                                  PDF
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {payrollData[activeTab].length === 0 && (
                        <TableRow>
                          <TableCell colSpan={11} className="h-24 text-center">
                            No payroll entries for this period.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between">
                {activeTab === "current" && (
                  <>
                    <Button variant="outline">Cancel Changes</Button>
                    <div className="space-x-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button variant="gold">Process Payroll</Button>
                    </div>
                  </>
                )}

                {activeTab === "previous" && (
                  <>
                    <div></div>
                    <div className="space-x-2">
                      <Button variant="outline">Export Report</Button>
                      <Button variant="gold">Mark as Paid</Button>
                    </div>
                  </>
                )}

                {activeTab === "approved" && (
                  <>
                    <div></div>
                    <Button variant="outline">Export Payment History</Button>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
