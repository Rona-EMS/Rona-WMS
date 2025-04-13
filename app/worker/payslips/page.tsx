"use client"

import { useState } from "react"
import { Download, Eye, FileText, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getPayrollByWorkerId, getWorkerById } from "@/lib/mock-data"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import type { PayrollRecord } from "@/lib/types"

export default function PayslipsPage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPeriod, setFilterPeriod] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  // Get worker payroll from mock data
  const workerId = user?.workerId || "ETH-W-1001" // Default for demo
  const worker = getWorkerById(workerId)
  const allPayslips = getPayrollByWorkerId(workerId)

  // Filter payslips by status and period
  const filteredPayslips = allPayslips.filter((payslip) => {
    const matchesStatus = filterStatus === "all" || payslip.status === filterStatus
    const matchesPeriod = filterPeriod === "all" || payslip.period.includes(filterPeriod)
    const matchesSearch =
      searchQuery === "" ||
      payslip.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payslip.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesPeriod && matchesSearch
  })

  // Sort payslips by date (most recent first)
  const sortedPayslips = [...filteredPayslips].sort((a, b) => {
    // Extract year and month from period string (e.g., "March 2025")
    const [aMonth, aYear] = a.period.split(" ")
    const [bMonth, bYear] = b.period.split(" ")

    // Compare years first
    if (aYear !== bYear) {
      return Number.parseInt(bYear) - Number.parseInt(aYear)
    }

    // If years are the same, compare months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months.indexOf(bMonth) - months.indexOf(aMonth)
  })

  // Helper function to get status badge color
  const getStatusColor = (status: PayrollRecord["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processed":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Translate payroll status
  const translateStatus = (status: PayrollRecord["status"]) => {
    if (language === "en") {
      switch (status) {
        case "pending":
          return "Pending"
        case "processed":
          return "Processed"
        case "paid":
          return "Paid"
        default:
          return status
      }
    } else {
      // Amharic translations
      switch (status) {
        case "pending":
          return "በመጠባበቅ ላይ"
        case "processed":
          return "ተሰርቷል"
        case "paid":
          return "ተከፍሏል"
        default:
          return status
      }
    }
  }

  // View payslip details
  const viewPayslip = (payslip: PayrollRecord) => {
    setSelectedPayslip(payslip)
    setIsDialogOpen(true)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{language === "en" ? "My Payslips" : "የደመወዝ ደረሰኞች"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {language === "en" ? "View and download your payslips" : "የደመወዝ ደረሰኞችዎን ይመልከቱ እና ያውርዱ"}
            </p>
          </div>
        </div>

        {/* Filters and search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={language === "en" ? "Search payslips..." : "ደረሰኞችን ይፈልጉ..."}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder={language === "en" ? "Status" : "ሁኔታ"} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "en" ? "All Status" : "ሁሉም ሁኔታዎች"}</SelectItem>
                  <SelectItem value="pending">{translateStatus("pending")}</SelectItem>
                  <SelectItem value="processed">{translateStatus("processed")}</SelectItem>
                  <SelectItem value="paid">{translateStatus("paid")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder={language === "en" ? "Period" : "ጊዜ"} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "en" ? "All Periods" : "ሁሉም ጊዜያት"}</SelectItem>
                  <SelectItem value="2025">{language === "en" ? "Year 2025" : "2025 ዓ.ም"}</SelectItem>
                  <SelectItem value="2024">{language === "en" ? "Year 2024" : "2024 ዓ.ም"}</SelectItem>
                  <SelectItem value="March">{language === "en" ? "March" : "መጋቢት"}</SelectItem>
                  <SelectItem value="February">{language === "en" ? "February" : "የካቲት"}</SelectItem>
                  <SelectItem value="January">{language === "en" ? "January" : "ጥር"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payslips summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Total Earnings (YTD)" : "ጠቅላላ ገቢዎች (ከዓመቱ መጀመሪያ)"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {formatCurrency(allPayslips.reduce((sum, payslip) => sum + payslip.totalAmount, 0))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Latest Payslip" : "የቅርብ ጊዜ ደመወዝ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {sortedPayslips.length > 0 ? formatCurrency(sortedPayslips[0].totalAmount) : "-"}
              </div>
              <p className="text-xs text-gray-500 mt-1">{sortedPayslips.length > 0 ? sortedPayslips[0].period : "-"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {language === "en" ? "Pending Payments" : "በመጠባበቅ ላይ ያሉ ክፍያዎች"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {formatCurrency(
                  allPayslips
                    .filter((payslip) => payslip.status === "pending")
                    .reduce((sum, payslip) => sum + payslip.totalAmount, 0),
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {allPayslips.filter((payslip) => payslip.status === "pending").length}{" "}
                {language === "en" ? "payslips" : "ደረሰኞች"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payslips list */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "Payslips History" : "የደመወዝ ደረሰኞች ታሪክ"}</CardTitle>
            <CardDescription>
              {language === "en" ? "View and download your payslip records" : "የደመወዝ ደረሰኝ መዝገቦችዎን ይመልከቱ እና ያውርዱ"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "ID" : "መታወቂያ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Period" : "ጊዜ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Basic Salary" : "መሰረታዊ ደመወዝ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Total" : "ጠቅላላ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Status" : "ሁኔታ"}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {language === "en" ? "Actions" : "ድርጊቶች"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPayslips.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center text-sm text-gray-500">
                        {language === "en"
                          ? "No payslips found matching your filters"
                          : "ከማጣሪያዎችዎ ጋር የሚዛመዱ ደረሰኞች አልተገኙም"}
                      </td>
                    </tr>
                  ) : (
                    sortedPayslips.map((payslip) => (
                      <tr key={payslip.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{payslip.id}</td>
                        <td className="px-4 py-3 text-sm">{payslip.period}</td>
                        <td className="px-4 py-3 text-sm">{formatCurrency(payslip.basicSalary)}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payslip.totalAmount)}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={getStatusColor(payslip.status)}>{translateStatus(payslip.status)}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => viewPayslip(payslip)}
                              title={language === "en" ? "View Payslip" : "ደረሰኝ ይመልከቱ"}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title={language === "en" ? "Download Payslip" : "ደረሰኝ ያውርዱ"}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payslip details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              {language === "en" ? "Payslip Details" : "የደመወዝ ደረሰኝ ዝርዝሮች"}
            </DialogTitle>
            <DialogDescription>
              {selectedPayslip?.period} - {selectedPayslip?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedPayslip && (
            <div className="space-y-6">
              {/* Employee details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  {language === "en" ? "Employee Information" : "የሰራተኛ መረጃ"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{language === "en" ? "Name" : "ስም"}</p>
                    <p className="text-sm font-medium">{worker?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === "en" ? "ID" : "መታወቂያ"}</p>
                    <p className="text-sm font-medium">{worker?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === "en" ? "Department" : "ክፍል"}</p>
                    <p className="text-sm font-medium">{worker?.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === "en" ? "Position" : "ቦታ"}</p>
                    <p className="text-sm font-medium">{worker?.position}</p>
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{language === "en" ? "Earnings" : "ገቢዎች"}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">{language === "en" ? "Basic Salary" : "መሰረታዊ ደመወዝ"}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">
                          {formatCurrency(selectedPayslip.basicSalary)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">{language === "en" ? "Overtime" : "ትርፍ ሰዓት"}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">
                          {formatCurrency(selectedPayslip.overtime)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">{language === "en" ? "Bonus" : "ጉርሻ"}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">
                          {formatCurrency(selectedPayslip.bonus)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{language === "en" ? "Deductions" : "ቅናሾች"}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 text-sm">{language === "en" ? "Total Deductions" : "ጠቅላላ ቅናሾች"}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium text-red-600">
                          -{formatCurrency(selectedPayslip.deductions)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{language === "en" ? "Net Pay" : "ተጣራ ክፍያ"}</h3>
                  <p className="text-lg font-bold text-purple-700">{formatCurrency(selectedPayslip.totalAmount)}</p>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-gray-500">{language === "en" ? "Payment Status" : "የክፍያ ሁኔታ"}:</span>
                  <Badge className={getStatusColor(selectedPayslip.status)}>
                    {translateStatus(selectedPayslip.status)}
                  </Badge>
                </div>
                {selectedPayslip.paymentDate && (
                  <div className="mt-1 flex justify-between items-center text-sm">
                    <span className="text-gray-500">{language === "en" ? "Payment Date" : "የክፍያ ቀን"}:</span>
                    <span>{selectedPayslip.paymentDate}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {language === "en" ? "Close" : "ዝጋ"}
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-1" />
                  {language === "en" ? "Download PDF" : "PDF አውርድ"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
