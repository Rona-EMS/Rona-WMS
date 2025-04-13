"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  FileText,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react"

export default function AdminRequestsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Check if user is logged in as admin
    const storedUser = localStorage.getItem("rona_user")
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user || user.role !== "admin") {
      toast({
        title: language === "en" ? "Access denied" : "መዳረሻ ተከልክሏል",
        description: language === "en" ? "You must be logged in as an admin" : "እንደ አስተዳዳሪ መግባት አለብዎት",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast, language])

  // Mock request data
  const requests = [
    {
      id: "REQ-001",
      type: "leave",
      status: "pending",
      worker: "Abebe Kebede",
      department: "Manufacturing",
      position: "Machine Operator",
      date: "2023-04-15",
      details: "Annual leave request for family event",
      duration: "5 days",
      from: "2023-04-20",
      to: "2023-04-24",
    },
    {
      id: "REQ-002",
      type: "shift-swap",
      status: "approved",
      worker: "Tigist Haile",
      department: "Packaging",
      position: "Packaging Specialist",
      date: "2023-04-14",
      details: "Swap morning shift on April 18 with Hiwot Tesfaye",
      swapWith: "Hiwot Tesfaye",
      shiftDate: "2023-04-18",
    },
    {
      id: "REQ-003",
      type: "leave",
      status: "rejected",
      worker: "Dawit Tadesse",
      department: "Quality Control",
      position: "Quality Inspector",
      date: "2023-04-13",
      details: "Sick leave request due to illness",
      duration: "2 days",
      from: "2023-04-14",
      to: "2023-04-15",
      rejectionReason: "Insufficient documentation provided",
    },
    {
      id: "REQ-004",
      type: "overtime",
      status: "pending",
      worker: "Yonas Girma",
      department: "Logistics",
      position: "Warehouse Coordinator",
      date: "2023-04-15",
      details: "Overtime request for inventory count",
      hours: "4 hours",
      overtimeDate: "2023-04-17",
    },
    {
      id: "REQ-005",
      type: "equipment",
      status: "pending",
      worker: "Hiwot Tesfaye",
      department: "Manufacturing",
      position: "Senior Operator",
      date: "2023-04-16",
      details: "Request for new safety gloves",
      equipment: "Safety Gloves",
      quantity: "1 pair",
    },
    {
      id: "REQ-006",
      type: "shift-swap",
      status: "approved",
      worker: "Kidist Alemu",
      department: "Packaging",
      position: "Team Lead",
      date: "2023-04-12",
      details: "Swap afternoon shift on April 16 with Abebe Kebede",
      swapWith: "Abebe Kebede",
      shiftDate: "2023-04-16",
    },
    {
      id: "REQ-007",
      type: "leave",
      status: "pending",
      worker: "Bereket Solomon",
      department: "Manufacturing",
      position: "Machine Operator",
      date: "2023-04-16",
      details: "Emergency leave for family matter",
      duration: "3 days",
      from: "2023-04-18",
      to: "2023-04-20",
    },
  ]

  // Filter requests based on status and search term
  const filteredRequests = requests.filter((request) => {
    const matchesStatus = activeTab === "all" || request.status === activeTab
    const matchesSearch =
      request.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || request.type === filterType

    return matchesStatus && matchesSearch && matchesType
  })

  // Handle request approval
  const handleApprove = (requestId) => {
    toast({
      title: language === "en" ? "Request Approved" : "ጥያቄው ተፈቅዷል",
      description: language === "en" ? `Request ${requestId} has been approved` : `ጥያቄ ${requestId} ተፈቅዷል`,
      variant: "default",
    })
  }

  // Handle request rejection
  const handleReject = (requestId) => {
    toast({
      title: language === "en" ? "Request Rejected" : "ጥያቄው ተቀባይነት አላገኘም",
      description: language === "en" ? `Request ${requestId} has been rejected` : `ጥያቄ ${requestId} ተቀባይነት አላገኘም`,
      variant: "destructive",
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Worker Requests" : "የሰራተኞች ጥያቄዎች"}
      description={language === "en" ? "Manage and process worker requests" : "የሰራተኞችን ጥያቄዎች ያስተዳድሩ እና ያስኬዱ"}
    >
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                {language === "en" ? "Pending Requests" : "በመጠባበቅ ላይ ያሉ ጥያቄዎች"}
              </p>
              <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                {requests.filter((r) => r.status === "pending").length}
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                {language === "en" ? "Awaiting review" : "ግምገማ በመጠበቅ ላይ"}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800/50 p-3 rounded-full">
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                {language === "en" ? "Approved Requests" : "የተፈቀዱ ጥያቄዎች"}
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                {requests.filter((r) => r.status === "approved").length}
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                {language === "en" ? "This month" : "በዚህ ወር"}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {language === "en" ? "Rejected Requests" : "ውድቅ የተደረጉ ጥያቄዎች"}
              </p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                {requests.filter((r) => r.status === "rejected").length}
              </p>
              <p className="text-sm text-red-600 dark:text-red-500">{language === "en" ? "This month" : "በዚህ ወር"}</p>
            </div>
            <div className="bg-red-100 dark:bg-red-800/50 p-3 rounded-full">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {language === "en" ? "Pending" : "በመጠባበቅ ላይ"}
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {language === "en" ? "Approved" : "የተፈቀዱ"}
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            {language === "en" ? "Rejected" : "ውድቅ የተደረጉ"}
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {language === "en" ? "All Requests" : "ሁሉም ጥያቄዎች"}
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {/* Requests Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{language === "en" ? "Worker Requests" : "የሰራተኞች ጥያቄዎች"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Review and manage requests from workers" : "የሰራተኞችን ጥያቄዎች ይገምግሙ እና ያስተዳድሩ"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={language === "en" ? "Search requests..." : "ጥያቄዎችን ይፈልጉ..."}
                      className="pl-8 pr-4 py-2 border rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      {language === "en" ? "Type" : "አይነት"}
                    </Button>
                    <select
                      className="border rounded-md px-2 py-1"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">{language === "en" ? "All Types" : "ሁሉም አይነቶች"}</option>
                      <option value="leave">{language === "en" ? "Leave" : "ፈቃድ"}</option>
                      <option value="shift-swap">{language === "en" ? "Shift Swap" : "ሺፍት መቀያየር"}</option>
                      <option value="overtime">{language === "en" ? "Overtime" : "ትርፍ ሰዓት"}</option>
                      <option value="equipment">{language === "en" ? "Equipment" : "መሳሪያ"}</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          {request.type === "leave" ? (
                            <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                          ) : request.type === "shift-swap" ? (
                            <Clock className="h-5 w-5 text-purple-600 mt-1" />
                          ) : request.type === "overtime" ? (
                            <Clock className="h-5 w-5 text-green-600 mt-1" />
                          ) : (
                            <ClipboardList className="h-5 w-5 text-orange-600 mt-1" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.worker}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                {request.id}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  request.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : request.status === "approved"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                              >
                                {request.status === "pending"
                                  ? language === "en"
                                    ? "Pending"
                                    : "በመጠባበቅ ላይ"
                                  : request.status === "approved"
                                    ? language === "en"
                                      ? "Approved"
                                      : "ተፈቅዷል"
                                    : language === "en"
                                      ? "Rejected"
                                      : "ተቀባይነት አላገኘም"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {request.department} - {request.position}
                            </p>
                            <p className="text-sm mt-1">{request.details}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                              <span className="text-muted-foreground">
                                {language === "en" ? "Submitted: " : "የቀረበበት ቀን: "}
                                {new Date(request.date).toLocaleDateString()}
                              </span>

                              {request.type === "leave" && (
                                <>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Duration: " : "ቆይታ: "}
                                    {request.duration}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "From: " : "ከ: "}
                                    {new Date(request.from).toLocaleDateString()}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "To: " : "እስከ: "}
                                    {new Date(request.to).toLocaleDateString()}
                                  </span>
                                </>
                              )}

                              {request.type === "shift-swap" && (
                                <>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Swap with: " : "ከሚቀያየሩት: "}
                                    {request.swapWith}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Shift date: " : "የሺፍት ቀን: "}
                                    {new Date(request.shiftDate).toLocaleDateString()}
                                  </span>
                                </>
                              )}

                              {request.type === "overtime" && (
                                <>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Hours: " : "ሰዓታት: "}
                                    {request.hours}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Date: " : "ቀን: "}
                                    {new Date(request.overtimeDate).toLocaleDateString()}
                                  </span>
                                </>
                              )}

                              {request.type === "equipment" && (
                                <>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Equipment: " : "መሳሪያ: "}
                                    {request.equipment}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {language === "en" ? "Quantity: " : "ብዛት: "}
                                    {request.quantity}
                                  </span>
                                </>
                              )}

                              {request.status === "rejected" && request.rejectionReason && (
                                <span className="text-red-600 dark:text-red-400">
                                  {language === "en" ? "Reason: " : "ምክንያት: "}
                                  {request.rejectionReason}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex gap-2 ml-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleReject(request.id)}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              {language === "en" ? "Reject" : "አትቀበል"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() => handleApprove(request.id)}
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              {language === "en" ? "Approve" : "ተቀበል"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <AlertTriangle className="mx-auto h-6 w-6 text-yellow-600 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "No requests found" : "ምንም ጥያቄ አልተገኘም"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
