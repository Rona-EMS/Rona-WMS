"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, Download, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-[#111827] border-0 mb-4">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Purchase Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="pl-8 bg-[#111827] border-0 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
                onClick={() => toast({ title: "Exporting", description: "Exporting inventory data to Excel..." })}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={() => toast({ title: "Add Item", description: "Opening inventory item form..." })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-gray-400 mt-1">Across all categories</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Raw Materials Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 1,250,000</div>
                <p className="text-xs text-green-500 mt-1">+5% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">12</div>
                <p className="text-xs text-gray-400 mt-1">Require attention</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">3</div>
                <p className="text-xs text-gray-400 mt-1">Critical items</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription className="text-gray-400">Manage your raw materials and supplies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Item Name</TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">Stock Level</TableHead>
                    <TableHead className="text-gray-400">Unit Price</TableHead>
                    <TableHead className="text-gray-400">Total Value</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Cotton Fabric</TableCell>
                    <TableCell>Raw Material</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "75%" }} />
                        </Progress>
                        <span>75%</span>
                      </div>
                    </TableCell>
                    <TableCell>ETB 120/m</TableCell>
                    <TableCell>ETB 360,000</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">In Stock</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Polyester Thread</TableCell>
                    <TableCell>Raw Material</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-yellow-500" style={{ width: "15%" }} />
                        </Progress>
                        <span>15%</span>
                      </div>
                    </TableCell>
                    <TableCell>ETB 50/spool</TableCell>
                    <TableCell>ETB 25,000</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 text-black">Low Stock</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Metal Buttons</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={0} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-red-500" style={{ width: "0%" }} />
                        </Progress>
                        <span>0%</span>
                      </div>
                    </TableCell>
                    <TableCell>ETB 2/pc</TableCell>
                    <TableCell>ETB 0</TableCell>
                    <TableCell>
                      <Badge className="bg-red-500 text-black">Out of Stock</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Denim Fabric</TableCell>
                    <TableCell>Raw Material</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "60%" }} />
                        </Progress>
                        <span>60%</span>
                      </div>
                    </TableCell>
                    <TableCell>ETB 180/m</TableCell>
                    <TableCell>ETB 270,000</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">In Stock</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Zippers</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-yellow-500" style={{ width: "25%" }} />
                        </Progress>
                        <span>25%</span>
                      </div>
                    </TableCell>
                    <TableCell>ETB 5/pc</TableCell>
                    <TableCell>ETB 37,500</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 text-black">Low Stock</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
              <CardDescription className="text-gray-400">Items that need to be reordered soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-[#1F2937] rounded-md border-l-4 border-yellow-500">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Polyester Thread</div>
                    <div className="text-sm text-gray-400">Only 15% remaining (750 spools)</div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gold-500 text-black hover:bg-gold-600"
                    onClick={() =>
                      toast({ title: "Order Placed", description: "Purchase order created for Polyester Thread." })
                    }
                  >
                    Reorder
                  </Button>
                </div>

                <div className="flex items-center p-3 bg-[#1F2937] rounded-md border-l-4 border-yellow-500">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Zippers</div>
                    <div className="text-sm text-gray-400">Only 25% remaining (7,500 pieces)</div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gold-500 text-black hover:bg-gold-600"
                    onClick={() => toast({ title: "Order Placed", description: "Purchase order created for Zippers." })}
                  >
                    Reorder
                  </Button>
                </div>

                <div className="flex items-center p-3 bg-[#1F2937] rounded-md border-l-4 border-red-500">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">Metal Buttons</div>
                    <div className="text-sm text-gray-400">Out of stock (0 pieces)</div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() =>
                      toast({
                        title: "Urgent Order Placed",
                        description: "Urgent purchase order created for Metal Buttons.",
                      })
                    }
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search suppliers..."
                className="pl-8 bg-[#111827] border-0 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                size="sm"
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={() => toast({ title: "Add Supplier", description: "Opening supplier form..." })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </div>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Suppliers Directory</CardTitle>
              <CardDescription className="text-gray-400">Manage your raw material suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Supplier Name</TableHead>
                    <TableHead className="text-gray-400">Materials Supplied</TableHead>
                    <TableHead className="text-gray-400">Contact Person</TableHead>
                    <TableHead className="text-gray-400">Phone</TableHead>
                    <TableHead className="text-gray-400">Performance</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Addis Textile Co.</TableCell>
                    <TableCell>Cotton Fabric, Polyester</TableCell>
                    <TableCell>Abebe Kebede</TableCell>
                    <TableCell>+251 911 234 567</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "90%" }} />
                        </Progress>
                        <span>90%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Mekelle Fabrics Ltd.</TableCell>
                    <TableCell>Denim, Canvas</TableCell>
                    <TableCell>Tigist Haile</TableCell>
                    <TableCell>+251 922 345 678</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "85%" }} />
                        </Progress>
                        <span>85%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Bahir Dar Components</TableCell>
                    <TableCell>Buttons, Zippers, Threads</TableCell>
                    <TableCell>Dawit Mengistu</TableCell>
                    <TableCell>+251 933 456 789</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={65} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-yellow-500" style={{ width: "65%" }} />
                        </Progress>
                        <span>65%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 text-black">Issues</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">Hawassa Packaging Inc.</TableCell>
                    <TableCell>Boxes, Bags, Labels</TableCell>
                    <TableCell>Sara Tesfaye</TableCell>
                    <TableCell>+251 944 567 890</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="h-2 w-20 bg-gray-700">
                          <div className="h-full bg-green-500" style={{ width: "95%" }} />
                        </Progress>
                        <span>95%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Supplier Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Evaluation of supplier reliability and quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Addis Textile Co.</span>
                    <span className="text-sm font-medium">90% (Excellent)</span>
                  </div>
                  <Progress value={90} className="h-2 bg-gray-700">
                    <div className="h-full bg-green-500" style={{ width: "90%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mekelle Fabrics Ltd.</span>
                    <span className="text-sm font-medium">85% (Good)</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-700">
                    <div className="h-full bg-green-500" style={{ width: "85%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bahir Dar Components</span>
                    <span className="text-sm font-medium">65% (Needs Improvement)</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-700">
                    <div className="h-full bg-yellow-500" style={{ width: "65%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hawassa Packaging Inc.</span>
                    <span className="text-sm font-medium">95% (Excellent)</span>
                  </div>
                  <Progress value={95} className="h-2 bg-gray-700">
                    <div className="h-full bg-green-500" style={{ width: "95%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search orders..." className="pl-8 bg-[#111827] border-0 text-white" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gold-500 text-gold-500 hover:bg-gold-500/10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                size="sm"
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={() => toast({ title: "New Order", description: "Creating new purchase order..." })}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription className="text-gray-400">Track and manage your purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Order #</TableHead>
                    <TableHead className="text-gray-400">Supplier</TableHead>
                    <TableHead className="text-gray-400">Items</TableHead>
                    <TableHead className="text-gray-400">Order Date</TableHead>
                    <TableHead className="text-gray-400">Delivery Date</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">PO-2023-0125</TableCell>
                    <TableCell>Addis Textile Co.</TableCell>
                    <TableCell>Cotton Fabric (3,000m)</TableCell>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>Mar 25, 2023</TableCell>
                    <TableCell>ETB 360,000</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Delivered</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">PO-2023-0126</TableCell>
                    <TableCell>Bahir Dar Components</TableCell>
                    <TableCell>Zippers (10,000 pcs)</TableCell>
                    <TableCell>Mar 18, 2023</TableCell>
                    <TableCell>Mar 28, 2023</TableCell>
                    <TableCell>ETB 50,000</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500 text-black">In Transit</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">PO-2023-0127</TableCell>
                    <TableCell>Mekelle Fabrics Ltd.</TableCell>
                    <TableCell>Denim Fabric (2,000m)</TableCell>
                    <TableCell>Mar 20, 2023</TableCell>
                    <TableCell>Apr 5, 2023</TableCell>
                    <TableCell>ETB 360,000</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-500 text-black">Processing</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">PO-2023-0128</TableCell>
                    <TableCell>Bahir Dar Components</TableCell>
                    <TableCell>Metal Buttons (25,000 pcs)</TableCell>
                    <TableCell>Mar 22, 2023</TableCell>
                    <TableCell>Apr 1, 2023</TableCell>
                    <TableCell>ETB 50,000</TableCell>
                    <TableCell>
                      <Badge className="bg-purple-500 text-black">Processing</Badge>
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
