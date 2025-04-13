"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import {
  Download,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Mail,
  Printer,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for invoices
const invoices = [
  {
    id: "INV-7845",
    factory: "Abyssinia Textiles",
    amount: 65000,
    date: "Apr 2, 2023",
    dueDate: "May 2, 2023",
    status: "Paid",
  },
  {
    id: "INV-7844",
    factory: "Habesha Garments",
    amount: 45000,
    date: "Apr 1, 2023",
    dueDate: "May 1, 2023",
    status: "Paid",
  },
  {
    id: "INV-7843",
    factory: "Ethio Leather",
    amount: 45000,
    date: "Mar 28, 2023",
    dueDate: "Apr 28, 2023",
    status: "Paid",
  },
  {
    id: "INV-7842",
    factory: "Addis Construction",
    amount: 45000,
    date: "Mar 25, 2023",
    dueDate: "Apr 25, 2023",
    status: "Unpaid",
  },
  {
    id: "INV-7841",
    factory: "Sheba Foods",
    amount: 35000,
    date: "Mar 20, 2023",
    dueDate: "Apr 20, 2023",
    status: "Paid",
  },
  {
    id: "INV-7840",
    factory: "Tigray Metals",
    amount: 35000,
    date: "Mar 15, 2023",
    dueDate: "Apr 15, 2023",
    status: "Overdue",
  },
  {
    id: "INV-7839",
    factory: "Awash Winery",
    amount: 45000,
    date: "Mar 10, 2023",
    dueDate: "Apr 10, 2023",
    status: "Paid",
  },
  {
    id: "INV-7838",
    factory: "Dire Dawa Cement",
    amount: 65000,
    date: "Mar 5, 2023",
    dueDate: "Apr 5, 2023",
    status: "Paid",
  },
  {
    id: "INV-7837",
    factory: "Oromia Coffee",
    amount: 35000,
    date: "Mar 1, 2023",
    dueDate: "Apr 1, 2023",
    status: "Paid",
  },
]

export default function InvoicesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<"date" | "amount" | "dueDate">("date")
  const router = useRouter()

  // Filter invoices based on search query and active tab
  const filteredInvoices = invoices
    .filter((invoice) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          invoice.id.toLowerCase().includes(query) ||
          invoice.factory.toLowerCase().includes(query) ||
          invoice.amount.toString().includes(query)
        )
      }
      return true
    })
    .filter((invoice) => {
      // Filter by tab
      if (activeTab === "all") return true
      if (activeTab === "paid") return invoice.status === "Paid"
      if (activeTab === "unpaid") return invoice.status === "Unpaid"
      if (activeTab === "overdue") return invoice.status === "Overdue"
      return true
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
      }

      // For date fields, convert to Date objects for comparison
      const dateA = new Date(sortField === "date" ? a.date : a.dueDate)
      const dateB = new Date(sortField === "date" ? b.date : b.dueDate)

      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    })

  const handleSort = (field: "date" | "amount" | "dueDate") => {
    if (sortField === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const handleInvoiceAction = (action: string, invoiceId: string) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId)

    switch (action) {
      case "view":
        toast({
          title: "Viewing Invoice",
          description: `Viewing details for invoice ${invoiceId}`,
        })
        break
      case "download":
        toast({
          title: "Downloading Invoice",
          description: `Invoice ${invoiceId} is being downloaded`,
        })
        break
      case "email":
        toast({
          title: "Sending Invoice",
          description: `Invoice ${invoiceId} is being sent to ${invoice?.factory}`,
        })
        break
      case "print":
        toast({
          title: "Printing Invoice",
          description: `Invoice ${invoiceId} is being sent to printer`,
        })
        break
      case "delete":
        toast({
          title: "Delete Invoice",
          description: `Invoice ${invoiceId} has been deleted`,
          variant: "destructive",
        })
        break
    }
  }

  const handleCreateInvoice = () => {
    router.push("/saas-admin/invoices/create")
  }

  return (
    <DashboardShell
      title="Invoices"
      description="Manage and track all invoices"
      headerAction={
        <Button onClick={handleCreateInvoice} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search invoices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Invoice List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Invoice #</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Factory</th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("amount")}
                      >
                        <div className="flex items-center gap-1">
                          Amount
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("dueDate")}
                      >
                        <div className="flex items-center gap-1">
                          Due Date
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{invoice.id}</td>
                          <td className="p-4 align-middle">{invoice.factory}</td>
                          <td className="p-4 align-middle">ETB {invoice.amount.toLocaleString()}</td>
                          <td className="p-4 align-middle">{invoice.date}</td>
                          <td className="p-4 align-middle">{invoice.dueDate}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={
                                invoice.status === "Paid"
                                  ? "bg-green-600"
                                  : invoice.status === "Unpaid"
                                    ? "bg-yellow-600"
                                    : "bg-red-600"
                              }
                            >
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleInvoiceAction("view", invoice.id)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleInvoiceAction("download", invoice.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Download</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleInvoiceAction("email", invoice.id)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleInvoiceAction("print", invoice.id)}>
                                  <Printer className="mr-2 h-4 w-4" />
                                  <span>Print</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleInvoiceAction("delete", invoice.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-muted-foreground">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
