"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileDown, Filter, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

// Mock data for transactions
const revenueTransactions = [
  { id: "INV-001", date: "2023-04-01", customer: "Acme Corp", amount: 2500.0, status: "Paid" },
  { id: "INV-002", date: "2023-04-05", customer: "Globex Inc", amount: 1750.5, status: "Paid" },
  { id: "INV-003", date: "2023-04-10", customer: "Stark Industries", amount: 3200.75, status: "Pending" },
  { id: "INV-004", date: "2023-04-15", customer: "Wayne Enterprises", amount: 4100.25, status: "Paid" },
  { id: "INV-005", date: "2023-04-20", customer: "Umbrella Corp", amount: 1900.0, status: "Overdue" },
]

const expenseTransactions = [
  { id: "EXP-001", date: "2023-04-02", vendor: "Office Supplies Co", amount: 450.0, category: "Office Supplies" },
  { id: "EXP-002", date: "2023-04-07", vendor: "Cloud Services Inc", amount: 1200.5, category: "Software" },
  { id: "EXP-003", date: "2023-04-12", vendor: "Marketing Agency", amount: 2500.0, category: "Marketing" },
  { id: "EXP-004", date: "2023-04-18", vendor: "Utility Company", amount: 350.75, category: "Utilities" },
  { id: "EXP-005", date: "2023-04-25", vendor: "Travel Agency", amount: 1800.0, category: "Travel" },
]

const financialReports = [
  { id: "REP-001", name: "Q1 Financial Summary", date: "2023-04-01", type: "Quarterly", size: "2.4 MB" },
  { id: "REP-002", name: "March Income Statement", date: "2023-04-05", type: "Monthly", size: "1.8 MB" },
  { id: "REP-003", name: "March Balance Sheet", date: "2023-04-05", type: "Monthly", size: "1.5 MB" },
  { id: "REP-004", name: "Q1 Cash Flow Statement", date: "2023-04-10", type: "Quarterly", size: "2.1 MB" },
  { id: "REP-005", name: "Tax Report 2023", date: "2023-04-15", type: "Annual", size: "3.2 MB" },
]

export function TransactionTables() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("revenue")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<string>("date")

  const handleExportCSV = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} data is being exported as CSV`,
    })
  }

  const handleDownload = (id: string, type: string) => {
    toast({
      title: "Download Started",
      description: `${type} ${id} is being downloaded`,
    })
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }

    toast({
      title: "Sorting Applied",
      description: `Sorted by ${field} in ${sortOrder === "asc" ? "descending" : "ascending"} order`,
    })
  }

  const handleFilter = (filterType: string) => {
    toast({
      title: "Filter Applied",
      description: `Applied filter: ${filterType}`,
    })
  }

  const filteredRevenueTransactions = revenueTransactions
    .filter(
      (transaction) =>
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

  const filteredExpenseTransactions = expenseTransactions
    .filter(
      (transaction) =>
        transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }
      return 0
    })

  const filteredReports = financialReports
    .filter(
      (report) =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

  return (
    <Tabs defaultValue="revenue" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="revenue" className="data-[state=active]:bg-white">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-white">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-white">
            Financial Reports
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-full sm:w-[300px] pl-8 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-gray-200">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-200">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort("date")}>
                Date: {sortField === "date" && sortOrder === "desc" ? "Oldest First" : "Newest First"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("amount")}>
                Amount: {sortField === "amount" && sortOrder === "desc" ? "Low to High" : "High to Low"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter("All")}>Clear Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gray-200">
              <DropdownMenuItem onClick={() => handleExportCSV("Revenue")}>Export Revenue as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCSV("Expenses")}>Export Expenses as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportCSV("All Financial Data")}>
                Export All Financial Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent value="revenue">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Revenue Transactions</CardTitle>
            <CardDescription className="text-gray-600">View all incoming payments and revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-gray-200">
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("id")}
                  >
                    Invoice ID
                  </TableHead>
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("date")}
                  >
                    Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700">Customer</TableHead>
                  <TableHead
                    className="text-gray-700 text-right cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("amount")}
                  >
                    Amount {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700">Status</TableHead>
                  <TableHead className="text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRevenueTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{transaction.id}</TableCell>
                    <TableCell className="text-gray-700">{transaction.date}</TableCell>
                    <TableCell className="text-gray-700">{transaction.customer}</TableCell>
                    <TableCell className="text-gray-900 font-medium text-right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => handleDownload(transaction.id, "Invoice")}
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="expenses">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Expense Transactions</CardTitle>
            <CardDescription className="text-gray-600">Track all outgoing payments and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-gray-200">
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("id")}
                  >
                    Expense ID
                  </TableHead>
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("date")}
                  >
                    Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700">Vendor</TableHead>
                  <TableHead className="text-gray-700">Category</TableHead>
                  <TableHead
                    className="text-gray-700 text-right cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("amount")}
                  >
                    Amount {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenseTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{transaction.id}</TableCell>
                    <TableCell className="text-gray-700">{transaction.date}</TableCell>
                    <TableCell className="text-gray-700">{transaction.vendor}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium text-right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => handleDownload(transaction.id, "Expense")}
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reports">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">Financial Reports</CardTitle>
            <CardDescription className="text-gray-600">
              Access and download financial reports and statements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-gray-200">
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("id")}
                  >
                    Report ID
                  </TableHead>
                  <TableHead className="text-gray-700">Report Name</TableHead>
                  <TableHead
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("date")}
                  >
                    Date {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-gray-700">Type</TableHead>
                  <TableHead className="text-gray-700">Size</TableHead>
                  <TableHead className="text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{report.id}</TableCell>
                    <TableCell className="text-gray-700">{report.name}</TableCell>
                    <TableCell className="text-gray-700">{report.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.type === "Quarterly"
                            ? "bg-purple-100 text-purple-800"
                            : report.type === "Monthly"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {report.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{report.size}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => handleDownload(report.id, "Report")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
