"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, RefreshCw, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ReportsManagement() {
  const [reportType, setReportType] = useState("production")
  const [timeRange, setTimeRange] = useState("month")
  const [format, setFormat] = useState("pdf")

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: `Generating ${reportType} report for ${timeRange} in ${format.toUpperCase()} format.`,
    })

    // Simulate report generation delay
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "Your report is ready to download.",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="bg-[#111827] border-0 mb-4">
          <TabsTrigger value="generate" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Generate Reports
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Saved Reports
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Scheduled Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription className="text-gray-400">Create custom reports for your factory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="bg-[#1F2937] border-0">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-0 text-white">
                        <SelectItem value="production">Production Report</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="quality">Quality Report</SelectItem>
                        <SelectItem value="attendance">Attendance Report</SelectItem>
                        <SelectItem value="inventory">Inventory Report</SelectItem>
                        <SelectItem value="maintenance">Maintenance Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="bg-[#1F2937] border-0">
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-0 text-white">
                        <SelectItem value="day">Today</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">This Quarter</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Format</label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger className="bg-[#1F2937] border-0">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-0 text-white">
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Details</label>
                    <Card className="bg-[#1F2937] border-0 p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Report Type:</span>
                          <span className="font-medium capitalize">{reportType} Report</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time Period:</span>
                          <span className="font-medium capitalize">
                            {timeRange === "day"
                              ? "Today"
                              : timeRange === "week"
                                ? "This Week"
                                : timeRange === "month"
                                  ? "This Month"
                                  : timeRange === "quarter"
                                    ? "This Quarter"
                                    : timeRange === "year"
                                      ? "This Year"
                                      : "Custom Range"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Format:</span>
                          <span className="font-medium uppercase">{format}</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-gold-500 text-black hover:bg-gold-600" onClick={handleGenerateReport}>
                      Generate Report
                    </Button>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full border-gold-500 text-gold-500 hover:bg-gold-500/10"
                      onClick={() =>
                        toast({ title: "Scheduling Report", description: "Opening report scheduling form..." })
                      }
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Recurring Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription className="text-gray-400">
                Quickly generate reports using saved templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card
                  className="bg-[#1F2937] border-0 hover:bg-[#2D3748] transition-colors cursor-pointer"
                  onClick={() => {
                    setReportType("production")
                    setTimeRange("month")
                    setFormat("pdf")
                    toast({ title: "Template Selected", description: "Monthly Production Report template loaded." })
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Monthly Production Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-400">Production metrics for the current month</div>
                    <div className="flex justify-between items-center mt-4">
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-[#1F2937] border-0 hover:bg-[#2D3748] transition-colors cursor-pointer"
                  onClick={() => {
                    setReportType("financial")
                    setTimeRange("month")
                    setFormat("excel")
                    toast({ title: "Template Selected", description: "Monthly Financial Report template loaded." })
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Monthly Financial Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-400">Financial performance for the current month</div>
                    <div className="flex justify-between items-center mt-4">
                      <Badge className="bg-green-500 text-black">Excel</Badge>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="bg-[#1F2937] border-0 hover:bg-[#2D3748] transition-colors cursor-pointer"
                  onClick={() => {
                    setReportType("quality")
                    setTimeRange("week")
                    setFormat("pdf")
                    toast({ title: "Template Selected", description: "Weekly Quality Report template loaded." })
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Weekly Quality Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-400">Quality metrics for the current week</div>
                    <div className="flex justify-between items-center mt-4">
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription className="text-gray-400">Access your previously generated reports</CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
                onClick={() => toast({ title: "Refreshing", description: "Refreshing saved reports list..." })}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Report Name</TableHead>
                    <TableHead className="text-gray-400">Generated On</TableHead>
                    <TableHead className="text-gray-400">Format</TableHead>
                    <TableHead className="text-gray-400">Size</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">March 2023 Production Report</TableCell>
                    <TableCell>Mar 31, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                    </TableCell>
                    <TableCell>1.2 MB</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({ title: "Downloading", description: "Downloading March 2023 Production Report..." })
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({
                              title: "Sharing",
                              description: "Preparing shareable link for March 2023 Production Report...",
                            })
                          }
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Q1 2023 Financial Report</TableCell>
                    <TableCell>Apr 5, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Excel</Badge>
                    </TableCell>
                    <TableCell>3.5 MB</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({ title: "Downloading", description: "Downloading Q1 2023 Financial Report..." })
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({
                              title: "Sharing",
                              description: "Preparing shareable link for Q1 2023 Financial Report...",
                            })
                          }
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">February 2023 Quality Report</TableCell>
                    <TableCell>Feb 28, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                    </TableCell>
                    <TableCell>0.8 MB</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({ title: "Downloading", description: "Downloading February 2023 Quality Report..." })
                          }
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          onClick={() =>
                            toast({
                              title: "Sharing",
                              description: "Preparing shareable link for February 2023 Quality Report...",
                            })
                          }
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription className="text-gray-400">Manage your automated report generation</CardDescription>
              </div>
              <Button
                size="sm"
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={() => toast({ title: "Schedule Report", description: "Opening report scheduling form..." })}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Report Name</TableHead>
                    <TableHead className="text-gray-400">Frequency</TableHead>
                    <TableHead className="text-gray-400">Next Run</TableHead>
                    <TableHead className="text-gray-400">Format</TableHead>
                    <TableHead className="text-gray-400">Recipients</TableHead>
                    <TableHead className="text-gray-400 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Monthly Production Report</TableCell>
                    <TableCell>Monthly (Last day)</TableCell>
                    <TableCell>Mar 31, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                    </TableCell>
                    <TableCell>3 recipients</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Weekly Quality Report</TableCell>
                    <TableCell>Weekly (Friday)</TableCell>
                    <TableCell>Mar 24, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-gold-500 text-black">PDF</Badge>
                    </TableCell>
                    <TableCell>2 recipients</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Quarterly Financial Report</TableCell>
                    <TableCell>Quarterly</TableCell>
                    <TableCell>Jun 30, 2023</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Excel</Badge>
                    </TableCell>
                    <TableCell>5 recipients</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
