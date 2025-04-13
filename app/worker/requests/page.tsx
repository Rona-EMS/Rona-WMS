"use client"

import { useEffect, useState } from "react"
import { Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/context/language-context"
import { LeaveRequestForm } from "@/components/worker/leave-request-form"
import { ShiftSwapForm } from "@/components/worker/shift-swap-form"
import { EmergencyReportForm } from "@/components/worker/emergency-report-form"

// Mock request history data
const requestHistory = [
  {
    id: 1,
    type: "leave",
    date: "2025-03-28",
    status: "pending",
    description: "Wedding ceremony, need 3 days off",
  },
  {
    id: 2,
    type: "shift-swap",
    date: "2025-03-15",
    status: "approved",
    description: "Doctor appointment, need afternoon off",
  },
  {
    id: 3,
    type: "emergency",
    date: "2025-02-28",
    status: "resolved",
    description: "Machine malfunction in production area",
  },
]

export default function WorkerRequestsPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { language } = useLanguage()
  const [date] = useState(new Date())
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Filter requests by status
  const filteredRequests = requestHistory.filter((request) => {
    if (filterStatus === "all") return true
    return request.status === filterStatus
  })

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Translate request type
  const translateType = (type: string) => {
    if (language === "en") {
      switch (type) {
        case "leave":
          return "Leave"
        case "shift-swap":
          return "Shift Swap"
        case "emergency":
          return "Emergency"
        default:
          return type
      }
    } else {
      // Amharic translations
      switch (type) {
        case "leave":
          return "ፈቃድ"
        case "shift-swap":
          return "የፈረቃ ለውጥ"
        case "emergency":
          return "ድንገተኛ"
        default:
          return type
      }
    }
  }

  // Translate request status
  const translateStatus = (status: string) => {
    if (language === "en") {
      switch (status) {
        case "approved":
          return "Approved"
        case "pending":
          return "Pending"
        case "resolved":
          return "Resolved"
        default:
          return status
      }
    } else {
      // Amharic translations
      switch (status) {
        case "approved":
          return "ጸድቋል"
        case "pending":
          return "በመጠባበቅ ላይ"
        case "resolved":
          return "ተፈትቷል"
        default:
          return status
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "en" ? "Requests & Reports" : "ጥያቄዎች እና ሪፖርቶች"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {language === "en" ? "Submit and track your requests and reports" : "ጥያቄዎችዎን እና ሪፖርቶችዎን ያስገቡ እና ይከታተሉ"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder={language === "en" ? "All Status" : "ሁሉም ሁኔታዎች"} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Status" : "ሁሉም ሁኔታዎች"}</SelectItem>
                <SelectItem value="approved">{translateStatus("approved")}</SelectItem>
                <SelectItem value="pending">{translateStatus("pending")}</SelectItem>
                <SelectItem value="resolved">{translateStatus("resolved")}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              <span>{language === "en" ? "Export" : "ላክ"}</span>
            </Button>
          </div>
        </div>

        {/* Request forms */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Submit a Request" : "ጥያቄ ያስገቡ"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Choose the type of request you want to submit" : "ማስገባት የሚፈልጉትን የጥያቄ አይነት ይምረጡ"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="leave" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="leave">{language === "en" ? "Leave Request" : "የፈቃድ ጥያቄ"}</TabsTrigger>
                <TabsTrigger value="shift-swap">{language === "en" ? "Shift Swap" : "የፈረቃ ለውጥ"}</TabsTrigger>
                <TabsTrigger value="emergency">{language === "en" ? "Emergency Report" : "ድንገተኛ ሪፖርት"}</TabsTrigger>
              </TabsList>
              <TabsContent value="leave" className="mt-4">
                <LeaveRequestForm />
              </TabsContent>
              <TabsContent value="shift-swap" className="mt-4">
                <ShiftSwapForm />
              </TabsContent>
              <TabsContent value="emergency" className="mt-4">
                <EmergencyReportForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Request statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Pending Requests" : "በመጠባበቅ ላይ ያሉ ጥያቄዎች"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {requestHistory.filter((req) => req.status === "pending").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Approved Requests" : "የጸደቁ ጥያቄዎች"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {requestHistory.filter((req) => req.status === "approved").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Resolved Reports" : "የተፈቱ ሪፖርቶች"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {requestHistory.filter((req) => req.status === "resolved").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request history */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Request History" : "የጥያቄ ታሪክ"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Your recent requests and their status" : "የቅርብ ጊዜ ጥያቄዎችዎ እና ሁኔታቸው"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Type" : "አይነት"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Date" : "ቀን"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Status" : "ሁኔታ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Description" : "መግለጫ"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
                        {language === "en"
                          ? "No requests found with the selected status"
                          : "በተመረጠው ሁኔታ ምንም ጥያቄዎች አልተገኙም"}
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{translateType(request.type)}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(request.date).toLocaleDateString(language === "en" ? "en-US" : "am-ET")}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={getStatusColor(request.status)}>{translateStatus(request.status)}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{request.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
