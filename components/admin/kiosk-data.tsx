"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { PageHeader } from "@/components/page-header"
import { BarChart3, Clock, Download, Filter, Printer, RefreshCw, Search, Users } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

interface KioskEvent {
  id: string
  workerId: string
  workerName: string
  eventType: "clock_in" | "clock_out"
  timestamp: Date
  kioskId: string
  kioskLocation: string
  method: "nfc" | "qr" | "manual"
}

// Mock data for demonstration
const mockKioskEvents: KioskEvent[] = [
  {
    id: "evt-001",
    workerId: "USR-1001",
    workerName: "Abebe Kebede",
    eventType: "clock_in",
    timestamp: new Date(2023, 3, 9, 8, 2, 15),
    kioskId: "KIOSK-001",
    kioskLocation: "Main Entrance",
    method: "nfc",
  },
  {
    id: "evt-002",
    workerId: "USR-1002",
    workerName: "Tigist Haile",
    eventType: "clock_in",
    timestamp: new Date(2023, 3, 9, 8, 5, 30),
    kioskId: "KIOSK-001",
    kioskLocation: "Main Entrance",
    method: "qr",
  },
  {
    id: "evt-003",
    workerId: "USR-1003",
    workerName: "Dawit Mekonnen",
    eventType: "clock_in",
    timestamp: new Date(2023, 3, 9, 8, 10, 45),
    kioskId: "KIOSK-002",
    kioskLocation: "Side Entrance",
    method: "nfc",
  },
  {
    id: "evt-004",
    workerId: "USR-1001",
    workerName: "Abebe Kebede",
    eventType: "clock_out",
    timestamp: new Date(2023, 3, 9, 17, 5, 20),
    kioskId: "KIOSK-001",
    kioskLocation: "Main Entrance",
    method: "nfc",
  },
  {
    id: "evt-005",
    workerId: "USR-1002",
    workerName: "Tigist Haile",
    eventType: "clock_out",
    timestamp: new Date(2023, 3, 9, 17, 10, 15),
    kioskId: "KIOSK-001",
    kioskLocation: "Main Entrance",
    method: "manual",
  },
]

export function KioskData() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("events")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMethod, setFilterMethod] = useState("all")
  const [filterEventType, setFilterEventType] = useState("all")
  const [filterKiosk, setFilterKiosk] = useState("all")
  const [events, setEvents] = useState<KioskEvent[]>(mockKioskEvents)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      event.workerName.toLowerCase().includes(searchLower) ||
      event.workerId.toLowerCase().includes(searchLower) ||
      event.kioskLocation.toLowerCase().includes(searchLower)

    // Method filter
    const matchesMethod = filterMethod === "all" || event.method === filterMethod

    // Event type filter
    const matchesEventType = filterEventType === "all" || event.eventType === filterEventType

    // Kiosk filter
    const matchesKiosk = filterKiosk === "all" || event.kioskId === filterKiosk

    return matchesSearch && matchesMethod && matchesEventType && matchesKiosk
  })

  const refreshData = () => {
    setIsRefreshing(true)
    // In a real app, this would fetch fresh data from the API
    setTimeout(() => {
      toast({
        title: "Data refreshed",
        description: "Kiosk data has been updated with the latest information.",
      })
      setIsRefreshing(false)
    }, 1000)
  }

  const exportData = (format: "csv" | "pdf") => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your export will be ready for download shortly.",
    })
    // In a real app, this would generate and download the file
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title={language === "en" ? "Kiosk Management" : "የኪዮስክ አስተዳደር"}
        description={
          language === "en"
            ? "Monitor and manage attendance kiosks across all locations"
            : "በሁሉም ቦታዎች ያሉ የመገኘት ኪዮስኮችን ይቆጣጠሩ እና ያስተዳድሩ"
        }
        icon={<Clock className="h-6 w-6" />}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="events">{language === "en" ? "Kiosk Events" : "የኪዮስክ ክስተቶች"}</TabsTrigger>
          <TabsTrigger value="kiosks">{language === "en" ? "Kiosk Devices" : "የኪዮስክ መሳሪያዎች"}</TabsTrigger>
          <TabsTrigger value="analytics">{language === "en" ? "Analytics" : "ትንታኔዎች"}</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>{language === "en" ? "Attendance Events" : "የመገኘት ክስተቶች"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "View all clock in/out events from kiosk devices"
                      : "ከኪዮስክ መሳሪያዎች ሁሉንም የመግቢያ/መውጫ ክስተቶችን ይመልከቱ"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    {language === "en" ? "Refresh" : "አድስ"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportData("csv")}>
                    <Download className="h-4 w-4 mr-2" />
                    {language === "en" ? "Export CSV" : "CSV ላክ"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => exportData("pdf")}>
                    <Printer className="h-4 w-4 mr-2" />
                    {language === "en" ? "Print" : "አትም"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder={language === "en" ? "Search events..." : "ክስተቶችን ይፈልጉ..."}
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-[180px]">
                      <Select value={filterMethod} onValueChange={setFilterMethod}>
                        <SelectTrigger>
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder={language === "en" ? "Method" : "ዘዴ"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{language === "en" ? "All Methods" : "ሁሉም ዘዴዎች"}</SelectItem>
                          <SelectItem value="nfc">NFC</SelectItem>
                          <SelectItem value="qr">QR</SelectItem>
                          <SelectItem value="manual">{language === "en" ? "Manual" : "በእጅ"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-[180px]">
                      <Select value={filterEventType} onValueChange={setFilterEventType}>
                        <SelectTrigger>
                          <Clock className="h-4 w-4 mr-2" />
                          <SelectValue placeholder={language === "en" ? "Event Type" : "የክስተት አይነት"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{language === "en" ? "All Events" : "ሁሉም ክስተቶች"}</SelectItem>
                          <SelectItem value="clock_in">{language === "en" ? "Clock In" : "መግቢያ"}</SelectItem>
                          <SelectItem value="clock_out">{language === "en" ? "Clock Out" : "መውጫ"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Events table */}
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">{language === "en" ? "Worker" : "ሰራተኛ"}</th>
                          <th className="py-3 px-4 text-left font-medium">{language === "en" ? "Event" : "ክስተት"}</th>
                          <th className="py-3 px-4 text-left font-medium">
                            {language === "en" ? "Date & Time" : "ቀን እና ሰዓት"}
                          </th>
                          <th className="py-3 px-4 text-left font-medium">
                            {language === "en" ? "Kiosk Location" : "የኪዮስክ ቦታ"}
                          </th>
                          <th className="py-3 px-4 text-left font-medium">{language === "en" ? "Method" : "ዘዴ"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.length > 0 ? (
                          filteredEvents.map((event) => (
                            <tr key={event.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="font-medium">{event.workerName}</div>
                                <div className="text-xs text-muted-foreground">{event.workerId}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    event.eventType === "clock_in"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {event.eventType === "clock_in"
                                    ? language === "en"
                                      ? "Clock In"
                                      : "መግቢያ"
                                    : language === "en"
                                      ? "Clock Out"
                                      : "መውጫ"}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div>{formatDate(event.timestamp)}</div>
                                <div className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div>{event.kioskLocation}</div>
                                <div className="text-xs text-muted-foreground">{event.kioskId}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    event.method === "nfc"
                                      ? "bg-purple-100 text-purple-800"
                                      : event.method === "qr"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {event.method === "nfc"
                                    ? "NFC"
                                    : event.method === "qr"
                                      ? "QR"
                                      : language === "en"
                                        ? "Manual"
                                        : "በእጅ"}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-muted-foreground">
                              {language === "en"
                                ? "No events found matching your filters"
                                : "ከማጣሪያዎችዎ ጋር የሚዛመዱ ክስተቶች አልተገኙም"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kiosks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Kiosk Devices" : "የኪዮስክ መሳሪያዎች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Manage and monitor all kiosk devices across locations"
                  : "በሁሉም ቦታዎች ያሉ የኪዮስክ መሳሪያዎችን ያስተዳድሩ እና ይቆጣጠሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">KIOSK-001</CardTitle>
                    <CardDescription>Main Entrance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{language === "en" ? "Status" : "ሁኔታ"}:</span>
                        <span className="text-sm font-medium text-green-600">
                          {language === "en" ? "Online" : "በመስመር ላይ"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Last Activity" : "የመጨረሻ እንቅስቃሴ"}:
                        </span>
                        <span className="text-sm">2 minutes ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Today's Events" : "የዛሬ ክስተቶች"}:
                        </span>
                        <span className="text-sm">42</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        {language === "en" ? "View Details" : "ዝርዝሮችን ይመልከቱ"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">KIOSK-002</CardTitle>
                    <CardDescription>Side Entrance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{language === "en" ? "Status" : "ሁኔታ"}:</span>
                        <span className="text-sm font-medium text-green-600">
                          {language === "en" ? "Online" : "በመስመር ላይ"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Last Activity" : "የመጨረሻ እንቅስቃሴ"}:
                        </span>
                        <span className="text-sm">15 minutes ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Today's Events" : "የዛሬ ክስተቶች"}:
                        </span>
                        <span className="text-sm">28</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        {language === "en" ? "View Details" : "ዝርዝሮችን ይመልከቱ"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">KIOSK-003</CardTitle>
                    <CardDescription>Factory Floor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{language === "en" ? "Status" : "ሁኔታ"}:</span>
                        <span className="text-sm font-medium text-amber-600">
                          {language === "en" ? "Maintenance" : "ጥገና"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Last Activity" : "የመጨረሻ እንቅስቃሴ"}:
                        </span>
                        <span className="text-sm">2 days ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {language === "en" ? "Today's Events" : "የዛሬ ክስተቶች"}:
                        </span>
                        <span className="text-sm">0</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm">
                        {language === "en" ? "View Details" : "ዝርዝሮችን ይመልከቱ"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Kiosk Analytics" : "የኪዮስክ ትንታኔዎች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Insights and statistics about kiosk usage and attendance patterns"
                  : "ስለ ኪዮስክ አጠቃቀም እና የመገኘት ሥርዓቶች ግንዛቤዎች እና ስታቲስቲክስ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {language === "en" ? "Total Events Today" : "ዛሬ ጠቅላላ ክስተቶች"}
                        </p>
                        <h3 className="text-2xl font-bold">87</h3>
                      </div>
                      <Clock className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {language === "en" ? "Active Kiosks" : "ንቁ ኪዮስኮች"}
                        </p>
                        <h3 className="text-2xl font-bold">2/3</h3>
                      </div>
                      <BarChart3 className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {language === "en" ? "Workers Clocked In" : "የገቡ ሰራተኞች"}
                        </p>
                        <h3 className="text-2xl font-bold">42</h3>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-lg font-medium">
                    {language === "en" ? "Attendance Method Distribution" : "የመገኘት ዘዴ ስርጭት"}
                  </h3>
                  <div className="flex gap-2">
                    <Label className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">NFC (68%)</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">QR (22%)</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      <span className="text-sm">{language === "en" ? "Manual (10%)" : "በእጅ (10%)"}</span>
                    </Label>
                  </div>
                </div>

                {/* Placeholder for chart */}
                <div className="h-64 w-full rounded-md border border-dashed flex items-center justify-center bg-muted/50">
                  <p className="text-muted-foreground">
                    {language === "en" ? "Chart visualization will appear here" : "የቻርት ምስል እዚህ ይታያል"}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                  <h3 className="text-lg font-medium">
                    {language === "en" ? "Peak Clock-In Times" : "ከፍተኛ የመግቢያ ሰዓቶች"}
                  </h3>
                  <Select defaultValue="today">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={language === "en" ? "Select period" : "ጊዜ ይምረጡ"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">{language === "en" ? "Today" : "ዛሬ"}</SelectItem>
                      <SelectItem value="week">{language === "en" ? "This Week" : "በዚህ ሳምንት"}</SelectItem>
                      <SelectItem value="month">{language === "en" ? "This Month" : "በዚህ ወር"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Placeholder for another chart */}
                <div className="h-64 w-full rounded-md border border-dashed flex items-center justify-center bg-muted/50">
                  <p className="text-muted-foreground">
                    {language === "en" ? "Time distribution chart will appear here" : "የሰዓት ስርጭት ቻርት እዚህ ይታያል"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
