"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { Boxes, Plus, Search, Download, Filter } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Raw Cotton",
    category: "Raw Material",
    quantity: 2500,
    unit: "kg",
    status: "In Stock",
    lastUpdated: "2025-03-15",
  },
  {
    id: 2,
    name: "Polyester Fiber",
    category: "Raw Material",
    quantity: 1200,
    unit: "kg",
    status: "Low Stock",
    lastUpdated: "2025-03-10",
  },
  {
    id: 3,
    name: "Blue Dye",
    category: "Chemical",
    quantity: 350,
    unit: "liters",
    status: "In Stock",
    lastUpdated: "2025-03-12",
  },
  {
    id: 4,
    name: "Sewing Thread",
    category: "Accessory",
    quantity: 5000,
    unit: "spools",
    status: "In Stock",
    lastUpdated: "2025-03-08",
  },
  {
    id: 5,
    name: "Buttons",
    category: "Accessory",
    quantity: 25000,
    unit: "pieces",
    status: "In Stock",
    lastUpdated: "2025-03-05",
  },
  {
    id: 6,
    name: "Zippers",
    category: "Accessory",
    quantity: 3000,
    unit: "pieces",
    status: "Low Stock",
    lastUpdated: "2025-03-01",
  },
  {
    id: 7,
    name: "Packaging Boxes",
    category: "Packaging",
    quantity: 1500,
    unit: "pieces",
    status: "In Stock",
    lastUpdated: "2025-03-18",
  },
  {
    id: 8,
    name: "Labels",
    category: "Packaging",
    quantity: 10000,
    unit: "pieces",
    status: "In Stock",
    lastUpdated: "2025-03-14",
  },
]

// Mock supplier data
const suppliers = [
  {
    id: 1,
    name: "Addis Textile Supplies",
    category: "Raw Materials",
    contact: "Abebe Kebede",
    phone: "+251 91 234 5678",
    email: "abebe@addistextile.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Amhara Chemicals",
    category: "Chemicals",
    contact: "Sara Haile",
    phone: "+251 92 345 6789",
    email: "sara@amharachem.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Oromia Packaging",
    category: "Packaging",
    contact: "Mohammed Ali",
    phone: "+251 93 456 7890",
    email: "mohammed@oromiapack.com",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Dire Dawa Accessories",
    category: "Accessories",
    contact: "Tigist Mengistu",
    phone: "+251 94 567 8901",
    email: "tigist@ddaccessories.com",
    status: "Active",
  },
  {
    id: 5,
    name: "Global Textile Imports",
    category: "Raw Materials",
    contact: "John Smith",
    phone: "+1 555 123 4567",
    email: "john@globaltextile.com",
    status: "Active",
  },
]

export default function InventoryManagementPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inventory")

  const filteredInventory = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleExport = () => {
    toast({
      title: language === "en" ? "Exporting Data" : "ውሂብ በመላክ ላይ",
      description: language === "en" ? "Inventory data is being exported to Excel" : "የዕቃ ውሂብ ወደ Excel በመላክ ላይ ነው",
    })
  }

  const handleAddItem = () => {
    toast({
      title: language === "en" ? "Add New Item" : "አዲስ ዕቃ ጨምር",
      description: language === "en" ? "Feature coming soon" : "ባህሪው በቅርቡ ይመጣል",
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Inventory Management" : "የዕቃ አስተዳደር"}
      description={
        language === "en"
          ? "Track and manage your factory's inventory and suppliers"
          : "የፋብሪካዎን ዕቃዎች እና አቅራቢዎች ይከታተሉ እና ያስተዳድሩ"
      }
      headerAction={
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            {language === "en" ? "Export" : "ላክ"}
          </Button>
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700" onClick={handleAddItem}>
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add Item" : "ዕቃ ጨምር"}
          </Button>
        </div>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Boxes className="h-4 w-4" />
            {language === "en" ? "Inventory" : "ዕቃዎች"}
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Boxes className="h-4 w-4" />
            {language === "en" ? "Suppliers" : "አቅራቢዎች"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Inventory Items" : "የዕቃ ዝርዝሮች"}</CardTitle>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={language === "en" ? "Search items..." : "ዕቃዎችን ይፈልጉ..."}
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "en" ? "Item Name" : "የዕቃ ስም"}</TableHead>
                      <TableHead>{language === "en" ? "Category" : "ምድብ"}</TableHead>
                      <TableHead className="text-right">{language === "en" ? "Quantity" : "ብዛት"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                      <TableHead>{language === "en" ? "Last Updated" : "መጨረሻ የተዘመነው"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.length > 0 ? (
                      filteredInventory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.status === "In Stock"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          {language === "en" ? "No items found" : "ምንም ዕቃዎች አልተገኙም"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Total Items" : "ጠቅላላ ዕቃዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryItems.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Across 4 categories" : "በ4 ምድቦች ውስጥ"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Low Stock Items" : "ዝቅተኛ ዕቃዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Require reordering" : "እንደገና ማዘዝ ያስፈልጋል"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Inventory Value" : "የዕቃ ዋጋ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 1,250,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Total current value" : "አሁን ያለው ጠቅላላ ዋጋ"}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Suppliers" : "አቅራቢዎች"}</CardTitle>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={language === "en" ? "Search suppliers..." : "አቅራቢዎችን ይፈልጉ..."}
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === "en" ? "Supplier Name" : "የአቅራቢ ስም"}</TableHead>
                      <TableHead>{language === "en" ? "Category" : "ምድብ"}</TableHead>
                      <TableHead>{language === "en" ? "Contact Person" : "የግንኙነት ሰው"}</TableHead>
                      <TableHead>{language === "en" ? "Contact" : "ግንኙነት"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length > 0 ? (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">{supplier.name}</TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>{supplier.contact}</TableCell>
                          <TableCell>{supplier.phone}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                supplier.status === "Active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {supplier.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          {language === "en" ? "No suppliers found" : "ምንም አቅራቢዎች አልተገኙም"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Total Suppliers" : "ጠቅላላ አቅራቢዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{suppliers.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Across 4 categories" : "በ4 ምድቦች ውስጥ"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Active Suppliers" : "ንቁ አቅራቢዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">4</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Currently working with" : "አሁን እየሰሩ ያሉ"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Pending Orders" : "በመጠባበቅ ላይ ያሉ ትዕዛዞች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "en" ? "Awaiting delivery" : "ማድረስን በመጠበቅ ላይ"}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
