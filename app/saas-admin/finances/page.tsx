"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  BarChart3,
  Calendar,
  FileText,
  Printer,
  Mail,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for financial overview
const financialData = {
  totalRevenue: 1245600,
  monthlyRevenue: 125750,
  annualProjected: 1525000,
  averagePlanValue: 5240,
  revenueGrowth: 12.5,
  monthlyGrowth: 8.2,
  yearlyGrowth: 12.5,
  planValueGrowth: 5.8,
  subscriptionsByPlan: [
    { plan: "Standard", count: 8, revenue: 280000, percentage: 22.5 },
    { plan: "Professional", count: 12, revenue: 540000, percentage: 43.4 },
    { plan: "Enterprise", count: 4, revenue: 425600, percentage: 34.1 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 98500 },
    { month: "Feb", revenue: 105200 },
    { month: "Mar", revenue: 118400 },
    { month: "Apr", revenue: 125750 },
  ],
}

// Mock data for transactions
const transactions = [
  {
    id: "TRX-7845",
    factory: "Abyssinia Textiles",
    amount: 65000,
    type: "Payment",
    date: "Apr 2, 2023",
    status: "Completed",
    method: "Bank Transfer",
    invoiceId: "INV-7845",
  },
  {
    id: "TRX-7844",
    factory: "Habesha Garments",
    amount: 45000,
    type: "Payment",
    date: "Apr 1, 2023",
    status: "Completed",
    method: "Credit Card",
    invoiceId: "INV-7844",
  },
  {
    id: "TRX-7843",
    factory: "Ethio Leather",
    amount: 45000,
    type: "Payment",
    date: "Mar 28, 2023",
    status: "Completed",
    method: "Bank Transfer",
    invoiceId: "INV-7843",
  },
  {
    id: "TRX-7842",
    factory: "Addis Construction",
    amount: 2500,
    type: "Refund",
    date: "Mar 25, 2023",
    status: "Completed",
    method: "Credit Card",
    invoiceId: "INV-7842",
  },
  {
    id: "TRX-7841",
    factory: "Sheba Foods",
    amount: 35000,
    type: "Payment",
    date: "Mar 20, 2023",
    status: "Completed",
    method: "Bank Transfer",
    invoiceId: "INV-7841",
  },
  {
    id: "TRX-7840",
    factory: "Tigray Metals",
    amount: 35000,
    type: "Payment",
    date: "Mar 15, 2023",
    status: "Pending",
    method: "Bank Transfer",
    invoiceId: "INV-7840",
  },
  {
    id: "TRX-7839",
    factory: "Awash Winery",
    amount: 45000,
    type: "Payment",
    date: "Mar 10, 2023",
    status: "Completed",
    method: "Credit Card",
    invoiceId: "INV-7839",
  },
  {
    id: "TRX-7838",
    factory: "Dire Dawa Cement",
    amount: 1500,
    type: "Refund",
    date: "Mar 5, 2023",
    status: "Completed",
    method: "Bank Transfer",
    invoiceId: "INV-7838",
  },
]

export default function FinancesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [transactionType, setTransactionType] = useState("all")

  // Filter transactions based on search query, date range, and transaction type
  const filteredTransactions = transactions
    .filter((transaction) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          transaction.id.toLowerCase().includes(query) ||
          transaction.factory.toLowerCase().includes(query) ||
          transaction.invoiceId.toLowerCase().includes(query) ||
          transaction.amount.toString().includes(query)
        )
      }
      return true
    })
    .filter((transaction) => {
      // Filter by transaction type
      if (transactionType === "all") return true
      if (transactionType === "payment") return transaction.type === "Payment"
      if (transactionType === "refund") return transaction.type === "Refund"
      return true
    })

  const handleExportFinances = () => {
    toast({
      title: "Exporting Financial Data",
      description: "Financial data is being exported to CSV",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Generating Financial Report",
      description: "Your financial report is being generated",
    })
  }

  const handleTransactionAction = (action: string, transactionId: string) => {
    const transaction = transactions.find((t) => t.id === transactionId)

    switch (action) {
      case "view":
        toast({
          title: "Viewing Transaction",
          description: `Viewing details for transaction ${transactionId}`,
        })
        break
      case "invoice":
        toast({
          title: "Viewing Invoice",
          description: `Viewing invoice ${transaction?.invoiceId} for transaction ${transactionId}`,
        })
        break
      case "print":
        toast({
          title: "Printing Receipt",
          description: `Receipt for transaction ${transactionId} is being printed`,
        })
        break
      case "email":
        toast({
          title: "Emailing Receipt",
          description: `Receipt for transaction ${transactionId} is being emailed to ${transaction?.factory}`,
        })
        break
    }
  }

  return (
    <DashboardShell
      title="Financial Management"
      description="Track revenue, payments, and financial performance"
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2" onClick={handleGenerateReport}>
          <FileText className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Financial Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="year-to-date">Year to Date</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportFinances}>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB {financialData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {financialData.revenueGrowth}%
                  </span>
                  <span className="ml-1">from last year</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB {financialData.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {financialData.monthlyGrowth}%
                  </span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annual Projected</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB {financialData.annualProjected.toLocaleString()}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {financialData.yearlyGrowth}%
                  </span>
                  <span className="ml-1">from last year</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Plan Value</CardTitle>
                <CreditCard className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB {financialData.averagePlanValue.toLocaleString()}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {financialData.planValueGrowth}%
                  </span>
                  <span className="ml-1">from last quarter</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Plan</CardTitle>
                <CardDescription>Distribution of revenue across subscription plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.subscriptionsByPlan.map((plan) => (
                    <div key={plan.plan} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              plan.plan === "Standard"
                                ? "bg-blue-600"
                                : plan.plan === "Professional"
                                  ? "bg-purple-600"
                                  : "bg-green-600"
                            }
                          >
                            {plan.plan}
                          </Badge>
                          <span className="text-sm text-gray-500">{plan.count} subscriptions</span>
                        </div>
                        <div className="text-sm font-medium">
                          ETB {plan.revenue.toLocaleString()} ({plan.percentage}%)
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={
                            plan.plan === "Standard"
                              ? "bg-blue-600"
                              : plan.plan === "Professional"
                                ? "bg-purple-600"
                                : "bg-green-600"
                          }
                          style={{ width: `${plan.percentage}%` }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue performance over the last 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {financialData.revenueByMonth.map((month) => (
                    <div key={month.month} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 bg-purple-600 rounded-t-md"
                        style={{
                          height: `${(month.revenue / financialData.monthlyRevenue) * 150}px`,
                        }}
                      />
                      <div className="text-xs font-medium">{month.month}</div>
                      <div className="text-xs text-gray-500">ETB {(month.revenue / 1000).toFixed(1)}k</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search transactions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportFinances}>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Transaction ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Factory</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle font-medium">{transaction.id}</td>
                            <td className="p-4 align-middle">{transaction.factory}</td>
                            <td className="p-4 align-middle">
                              <span className={transaction.type === "Refund" ? "text-red-600" : "text-green-600"}>
                                {transaction.type === "Refund" ? "-" : ""}ETB {transaction.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={transaction.type === "Payment" ? "bg-green-600" : "bg-red-600"}>
                                {transaction.type}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{transaction.date}</td>
                            <td className="p-4 align-middle">
                              <Badge className={transaction.status === "Completed" ? "bg-green-600" : "bg-yellow-600"}>
                                {transaction.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">{transaction.method}</td>
                            <td className="p-4 align-middle text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTransactionAction("view", transaction.id)}
                                >
                                  <Search className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTransactionAction("invoice", transaction.id)}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Invoice</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTransactionAction("print", transaction.id)}
                                >
                                  <Printer className="h-4 w-4" />
                                  <span className="sr-only">Print</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTransactionAction("email", transaction.id)}
                                >
                                  <Mail className="h-4 w-4" />
                                  <span className="sr-only">Email</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="p-4 text-center text-muted-foreground">
                            No transactions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
