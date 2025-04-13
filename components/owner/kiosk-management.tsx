"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
  Monitor,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  Download,
  Printer,
  FileText,
  Clock,
  Filter,
  ArrowUpDown,
  LogIn,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Clock4,
  Timer,
} from "lucide-react"
import { format, parseISO, isAfter, isBefore, isEqual, subDays } from "date-fns"
import {
  mockClockEvents,
  type ClockEvent,
  getUniqueKioskLocations,
  getUniqueWorkerNames,
} from "@/lib/mock-data-clock-events"

export function KioskManagement() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("kiosks")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [clockEvents, setClockEvents] = useState<ClockEvent[]>([])

  // Filters for clock logs
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedKiosk, setSelectedKiosk] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedEventType, setSelectedEventType] = useState<string>("all")
  const [selectedMethod, setSelectedMethod] = useState<string>("all")
  const [kioskLocations, setKioskLocations] = useState<string[]>([])
  const [workerNames, setWorkerNames] = useState<string[]>([])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setClockEvents(mockClockEvents)
      setKioskLocations(getUniqueKioskLocations())
      setWorkerNames(getUniqueWorkerNames())
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter clock events based on all filters
  const filteredClockEvents = clockEvents.filter((event) => {
    // Search query filter (worker name or ID)
    const matchesSearch =
      searchQuery === "" ||
      event.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.workerId.toLowerCase().includes(searchQuery.toLowerCase())

    // Date range filter
    const matchesDateRange =
      (startDate === "" ||
        isAfter(event.timestamp, parseISO(startDate)) ||
        isEqual(event.timestamp, parseISO(startDate))) &&
      (endDate === "" || isBefore(event.timestamp, parseISO(endDate)) || isEqual(event.timestamp, parseISO(endDate)))

    // Kiosk location filter
    const matchesKiosk = selectedKiosk === "all" || event.kioskLocation === selectedKiosk

    // Status filter
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

    // Event type filter
    const matchesEventType = selectedEventType === "all" || event.eventType === selectedEventType

    // Authentication method filter
    const matchesMethod = selectedMethod === "all" || event.method === selectedMethod

    return matchesSearch && matchesDateRange && matchesKiosk && matchesStatus && matchesEventType && matchesMethod
  })

  const handleExportCSV = () => {
    toast({
      title: language === "en" ? "Export Started" : "ወደ ውጭ መላክ ተጀምሯል",
      description: language === "en" ? "Exporting clock logs to CSV..." : "የሰዓት መዝገቦችን ወደ CSV በመላክ ላይ...",
    })
  }

  const handleExportPDF = () => {
    toast({
      title: language === "en" ? "Export Started" : "ወደ ውጭ መላክ ተጀምሯል",
      description: language === "en" ? "Exporting clock logs to PDF..." : "የሰዓት መዝገቦችን ወደ PDF በመላክ ላይ...",
    })
  }

  const handlePrint = () => {
    toast({
      title: language === "en" ? "Print Started" : "ማተም ተጀምሯል",
      description: language === "en" ? "Preparing clock logs for printing..." : "የሰዓት መዝገቦችን ለማተም በማዘጋጀት ላይ...",
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setClockEvents(mockClockEvents)
      setIsLoading(false)
      toast({
        title: language === "en" ? "Data Refreshed" : "ውሂብ ታድሷል",
        description: language === "en" ? "Clock logs have been refreshed" : "የሰዓት መዝገቦች ታድሰዋል",
      })
    }, 1000)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setStartDate("")
    setEndDate("")
    setSelectedKiosk("all")
    setSelectedStatus("all")
    setSelectedEventType("all")
    setSelectedMethod("all")
  }

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Normal
          </Badge>
        )
      case "late":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Late
          </Badge>
        )
      case "early":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Early
          </Badge>
        )
      case "overtime":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Overtime
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Helper function to render event type badge
  const renderEventTypeBadge = (eventType: string) => {
    switch (eventType) {
      case "clock-in":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Clock In</Badge>
      case "clock-out":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Clock Out</Badge>
      default:
        return <Badge>{eventType}</Badge>
    }
  }

  // Helper function to render method badge
  const renderMethodBadge = (method: string) => {
    switch (method) {
      case "nfc":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            NFC
          </Badge>
        )
      case "qr":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            QR
          </Badge>
        )
      case "manual":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Manual
          </Badge>
        )
      default:
        return <Badge variant="outline">{method}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{language === "en" ? "Kiosk Management" : "የኪዮስክ አስተዳደር"}</h2>
        <p className="text-muted-foreground">
          {language === "en"
            ? "Manage your factory kiosks and view attendance logs"
            : "የፋብሪካዎን ኪዮስኮች ያስተዳድሩ እና የመገኘት መዝገቦችን ይመልከቱ"}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kiosks">
            <Monitor className="h-4 w-4 mr-2" />
            {language === "en" ? "Kiosks" : "ኪዮስኮች"}
          </TabsTrigger>
          <TabsTrigger value="clock-logs">
            <Clock className="h-4 w-4 mr-2" />
            {language === "en" ? "Clock Logs" : "የሰዓት መዝገቦች"}
          </TabsTrigger>
        </TabsList>

        {/* Kiosks Tab */}
        <TabsContent value="kiosks">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Factory Kiosks" : "የፋብሪካ ኪዮስኮች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Manage and monitor all kiosks across your factory"
                  : "በፋብሪካዎ ውስጥ ያሉ ሁሉንም ኪዮስኮች ያስተዳድሩ እና ይቆጣጠሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {language === "en" ? "Add Kiosk" : "ኪዮስክ ጨምር"}
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {language === "en" ? "Refresh" : "አድስ"}
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={language === "en" ? "Search kiosks..." : "ኪዮስኮችን ይፈልጉ..."}
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "en" ? "Kiosk ID" : "የኪዮስክ መታወቂያ"}</TableHead>
                      <TableHead>{language === "en" ? "Location" : "ቦታ"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                      <TableHead>{language === "en" ? "Last Active" : "መጨረሻ ንቁ"}</TableHead>
                      <TableHead className="text-right">{language === "en" ? "Actions" : "ድርጊቶች"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="h-6 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-28 ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <>
                        <TableRow>
                          <TableCell className="font-medium">K001</TableCell>
                          <TableCell>Main Entrance</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Online</Badge>
                          </TableCell>
                          <TableCell>{format(new Date(), "MMM dd, yyyy HH:mm")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">K002</TableCell>
                          <TableCell>Production Floor</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Online</Badge>
                          </TableCell>
                          <TableCell>{format(new Date(), "MMM dd, yyyy HH:mm")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">K003</TableCell>
                          <TableCell>Warehouse</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Maintenance</Badge>
                          </TableCell>
                          <TableCell>{format(subDays(new Date(), 1), "MMM dd, yyyy HH:mm")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">K004</TableCell>
                          <TableCell>Admin Building</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Offline</Badge>
                          </TableCell>
                          <TableCell>{format(subDays(new Date(), 3), "MMM dd, yyyy HH:mm")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clock Logs Tab */}
        <TabsContent value="clock-logs">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Clock In/Out Logs" : "የመግቢያ/መውጫ መዝገቦች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "View and analyze employee clock in/out events"
                  : "የሰራተኞችን የመግቢያ/መውጫ ክስተቶች ይመልከቱ እና ይተንትኑ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={language === "en" ? "Search by worker name or ID..." : "በሰራተኛ ስም ወይም መታወቂያ ይፈልጉ..."}
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="start-date">{language === "en" ? "From" : "ከ"}</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-[140px]"
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="end-date">{language === "en" ? "To" : "እስከ"}</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-[140px]"
                      />
                    </div>
                  </div>

                  {/* Refresh Button */}
                  <div className="flex items-end">
                    <Button variant="outline" onClick={handleRefresh}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {language === "en" ? "Refresh" : "አድስ"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Kiosk Filter */}
                  <div className="grid gap-1.5 min-w-[180px]">
                    <Label htmlFor="kiosk-filter">{language === "en" ? "Kiosk Location" : "የኪዮስክ ቦታ"}</Label>
                    <Select value={selectedKiosk} onValueChange={setSelectedKiosk}>
                      <SelectTrigger id="kiosk-filter">
                        <SelectValue placeholder={language === "en" ? "All Locations" : "ሁሉም ቦታዎች"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === "en" ? "All Locations" : "ሁሉም ቦታዎች"}</SelectItem>
                        {kioskLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="grid gap-1.5 min-w-[150px]">
                    <Label htmlFor="status-filter">{language === "en" ? "Status" : "ሁኔታ"}</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder={language === "en" ? "All Statuses" : "ሁሉም ሁኔታዎች"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === "en" ? "All Statuses" : "ሁሉም ሁኔታዎች"}</SelectItem>
                        <SelectItem value="normal">{language === "en" ? "Normal" : "መደበኛ"}</SelectItem>
                        <SelectItem value="late">{language === "en" ? "Late" : "ዘግይቷል"}</SelectItem>
                        <SelectItem value="early">{language === "en" ? "Early" : "ቀድሟል"}</SelectItem>
                        <SelectItem value="overtime">{language === "en" ? "Overtime" : "ትርፍ ሰዓት"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Event Type Filter */}
                  <div className="grid gap-1.5 min-w-[150px]">
                    <Label htmlFor="event-filter">{language === "en" ? "Event Type" : "የክስተት አይነት"}</Label>
                    <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                      <SelectTrigger id="event-filter">
                        <SelectValue placeholder={language === "en" ? "All Events" : "ሁሉም ክስተቶች"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === "en" ? "All Events" : "ሁሉም ክስተቶች"}</SelectItem>
                        <SelectItem value="clock-in">{language === "en" ? "Clock In" : "መግቢያ"}</SelectItem>
                        <SelectItem value="clock-out">{language === "en" ? "Clock Out" : "መውጫ"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Authentication Method Filter */}
                  <div className="grid gap-1.5 min-w-[150px]">
                    <Label htmlFor="method-filter">{language === "en" ? "Auth Method" : "የማረጋገጫ ዘዴ"}</Label>
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger id="method-filter">
                        <SelectValue placeholder={language === "en" ? "All Methods" : "ሁሉም ዘዴዎች"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === "en" ? "All Methods" : "ሁሉም ዘዴዎች"}</SelectItem>
                        <SelectItem value="nfc">{language === "en" ? "NFC Card" : "NFC ካርድ"}</SelectItem>
                        <SelectItem value="qr">{language === "en" ? "QR Code" : "QR ኮድ"}</SelectItem>
                        <SelectItem value="manual">{language === "en" ? "Manual Entry" : "በእጅ ማስገባት"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset Filters Button */}
                  <div className="flex items-end">
                    <Button variant="outline" onClick={resetFilters}>
                      <Filter className="h-4 w-4 mr-2" />
                      {language === "en" ? "Reset Filters" : "ማጣሪያዎችን ዳግም አስጀምር"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en"
                      ? `Showing ${filteredClockEvents.length} of ${clockEvents.length} records`
                      : `ከ${clockEvents.length} መዝገቦች ${filteredClockEvents.length}ን በማሳየት ላይ`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    {language === "en" ? "Export CSV" : "CSV ወደ ውጭ ላክ"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportPDF}>
                    <FileText className="h-4 w-4 mr-2" />
                    {language === "en" ? "Export PDF" : "PDF ወደ ውጭ ላክ"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    {language === "en" ? "Print" : "አትም"}
                  </Button>
                </div>
              </div>

              {/* Clock Logs Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center">
                          {language === "en" ? "Worker" : "ሰራተኛ"}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          {language === "en" ? "Event" : "ክስተት"}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          {language === "en" ? "Date & Time" : "ቀን እና ሰዓት"}
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>{language === "en" ? "Kiosk" : "ኪዮስክ"}</TableHead>
                      <TableHead>{language === "en" ? "Method" : "ዘዴ"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                      <TableHead>{language === "en" ? "Notes" : "ማስታወሻዎች"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-32" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-16" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-20" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-40" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : filteredClockEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          {language === "en" ? "No records found" : "መዝገቦች አልተገኙም"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClockEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div className="font-medium">{event.workerName}</div>
                            <div className="text-xs text-muted-foreground">{event.workerId}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {event.eventType === "clock-in" ? (
                                <LogIn className="h-4 w-4 mr-1 text-green-600" />
                              ) : (
                                <LogOut className="h-4 w-4 mr-1 text-blue-600" />
                              )}
                              {renderEventTypeBadge(event.eventType)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{format(event.timestamp, "MMM dd, yyyy")}</div>
                            <div className="text-xs text-muted-foreground">{format(event.timestamp, "HH:mm:ss")}</div>
                          </TableCell>
                          <TableCell>
                            <div>{event.kioskLocation}</div>
                            <div className="text-xs text-muted-foreground">{event.kioskId}</div>
                          </TableCell>
                          <TableCell>{renderMethodBadge(event.method)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {event.status === "normal" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                              {event.status === "late" && <AlertCircle className="h-4 w-4 text-red-600" />}
                              {event.status === "early" && <Clock4 className="h-4 w-4 text-blue-600" />}
                              {event.status === "overtime" && <Timer className="h-4 w-4 text-amber-600" />}
                              {renderStatusBadge(event.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {event.notes && <div className="text-sm">{event.notes}</div>}
                            {event.verifiedBy && (
                              <div className="text-xs text-muted-foreground">
                                {language === "en" ? `Verified by: ${event.verifiedBy}` : `አረጋጋጭ: ${event.verifiedBy}`}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
