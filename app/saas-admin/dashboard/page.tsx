"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowUpRight, Users, Factory, CreditCard, Bell, ShieldAlert, Wrench, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function SaasAdminDashboardPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("factories")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleQuickAction = (action: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Action triggered",
        description: `You triggered the ${action} action`,
        variant: "default",
      })

      switch (action) {
        case "analytics":
          router.push("/saas-admin/analytics")
          break
        case "alerts":
          router.push("/saas-admin/alerts")
          break
        case "issues":
          router.push("/saas-admin/issues")
          break
        case "plans":
          router.push("/saas-admin/plans")
          break
      }
    }, 800)
  }

  return (
    <DashboardShell
      title="SAAS Admin Dashboard"
      description="Overview of platform performance and key metrics"
      headerAction={
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm font-medium border-gray-200 text-white">
            Active Factories: 24
          </Badge>
          <Badge variant="outline" className="text-sm font-medium border-gray-200 text-white">
            Platform Version: 2.4.1
          </Badge>
        </div>
      }
    >
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">ETB 1,245,600</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 flex items-center text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5%
              </span>
              {" from last month"}
            </p>
            <Progress value={78} className="h-2 mt-3 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">24</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-500 flex items-center text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />2
              </span>
              {" from last month"}
            </p>
            <Progress value={82} className="h-2 mt-3 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Upcoming Renewals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-gray-500">In the next 30 days</p>
            <Progress value={60} className="h-2 mt-3 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-xs text-gray-500">3 high priority</p>
            <Progress value={35} className="h-2 mt-3 bg-gray-200" />
          </CardContent>
        </Card>
      </div>

      {/* System Overview and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-gray-200 bg-white h-full">
            <CardHeader>
              <CardTitle className="text-purple-600">System Overview</CardTitle>
              <CardDescription className="text-gray-500">
                Complete monitoring of all factories using Rona
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Total Users</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">8,249</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Factory className="h-4 w-4 mr-1" />
                      <span>Active Factories</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">24</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <CreditCard className="h-4 w-4 mr-1" />
                      <span>Invoices Due</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">12</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <ShieldAlert className="h-4 w-4 mr-1" />
                      <span>Security Alerts</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">3</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-green-600 mr-2">Up</Badge>
                        <span className="text-gray-900">Main Application</span>
                      </div>
                      <span className="text-gray-500 text-sm">99.98% uptime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-green-600 mr-2">Up</Badge>
                        <span className="text-gray-900">Database Servers</span>
                      </div>
                      <span className="text-gray-500 text-sm">99.95% uptime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-green-600 mr-2">Up</Badge>
                        <span className="text-gray-900">API Services</span>
                      </div>
                      <span className="text-gray-500 text-sm">99.92% uptime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge className="bg-yellow-600 mr-2">Degraded</Badge>
                        <span className="text-gray-900">Report Generator</span>
                      </div>
                      <span className="text-gray-500 text-sm">97.45% uptime</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-gray-200 bg-white h-full">
            <CardHeader>
              <CardTitle className="text-purple-600">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-start"
                onClick={() => handleQuickAction("analytics")}
                disabled={isLoading}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Usage Analytics
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-start"
                onClick={() => handleQuickAction("alerts")}
                disabled={isLoading}
              >
                <Bell className="mr-2 h-4 w-4" />
                Manage Alert Rules
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-start"
                onClick={() => handleQuickAction("issues")}
                disabled={isLoading}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Software Issue Reports
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-start"
                onClick={() => handleQuickAction("plans")}
                disabled={isLoading}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Create Custom Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="factories" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-100 text-purple-600 border border-gray-200">
          <TabsTrigger value="factories" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Factories
          </TabsTrigger>
          <TabsTrigger
            value="subscriptions"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Support
          </TabsTrigger>
        </TabsList>

        {/* Factories Tab */}
        <TabsContent value="factories">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Factory Overview</CardTitle>
              <CardDescription className="text-gray-500">Active factories using the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Abyssinia Textiles",
                    industry: "Textile",
                    employees: 450,
                    status: "Active",
                    subscription: "Enterprise",
                  },
                  {
                    name: "Habesha Garments",
                    industry: "Garment",
                    employees: 280,
                    status: "Active",
                    subscription: "Professional",
                  },
                  {
                    name: "Ethio Leather",
                    industry: "Leather",
                    employees: 320,
                    status: "Active",
                    subscription: "Professional",
                  },
                  {
                    name: "Sheba Foods",
                    industry: "Food Processing",
                    employees: 180,
                    status: "Active",
                    subscription: "Standard",
                  },
                  {
                    name: "Addis Construction",
                    industry: "Construction",
                    employees: 210,
                    status: "Trial",
                    subscription: "Professional",
                  },
                ].map((factory, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Factory selected",
                        description: `You selected ${factory.name}`,
                      })
                      router.push("/saas-admin/factories")
                    }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{factory.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <p>{factory.industry}</p>
                        <span className="mx-2">•</span>
                        <p>{factory.employees} employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={factory.status === "Trial" ? "secondary" : "default"}
                        className={factory.status === "Trial" ? "bg-orange-600" : "bg-purple-600"}
                      >
                        {factory.status}
                      </Badge>
                      <Badge variant="outline" className="border-gray-200 text-purple-600">
                        {factory.subscription}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Subscription Status</CardTitle>
              <CardDescription className="text-gray-500">Current subscription plans and renewals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-600">Standard Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <p className="text-xs text-gray-500">Active subscriptions</p>
                      <Progress value={33} className="h-2 mt-3 bg-gray-200" />
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-600">Professional Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <p className="text-xs text-gray-500">Active subscriptions</p>
                      <Progress value={50} className="h-2 mt-3 bg-gray-200" />
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-600">Enterprise Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">4</div>
                      <p className="text-xs text-gray-500">Active subscriptions</p>
                      <Progress value={17} className="h-2 mt-3 bg-gray-200" />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Upcoming Renewals</h3>
                  <div className="space-y-2">
                    {[
                      { factory: "Addis Construction", plan: "Professional", date: "Apr 15, 2023", status: "Pending" },
                      { factory: "Tigray Metals", plan: "Standard", date: "Apr 22, 2023", status: "Pending" },
                      { factory: "Awash Winery", plan: "Professional", date: "May 1, 2023", status: "Pending" },
                      { factory: "Dire Dawa Cement", plan: "Enterprise", date: "May 5, 2023", status: "Pending" },
                      { factory: "Oromia Coffee", plan: "Standard", date: "May 10, 2023", status: "Pending" },
                    ].map((renewal, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Renewal selected",
                            description: `You selected ${renewal.factory}'s renewal`,
                          })
                          router.push("/saas-admin/subscriptions")
                        }}
                      >
                        <div>
                          <p className="font-medium text-gray-900">{renewal.factory}</p>
                          <p className="text-sm text-gray-500">{renewal.plan} Plan</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-300">{renewal.date}</p>
                          <Badge variant="outline" className="border-gray-200 text-purple-600">
                            {renewal.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Revenue Overview</CardTitle>
              <CardDescription className="text-gray-500">Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                      <div className="text-2xl font-bold text-gray-900 mt-1">ETB 125,750</div>
                      <div className="flex items-center mt-1 text-xs">
                        <span className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          8.2%
                        </span>
                        <span className="text-gray-500 ml-1">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-gray-500">Annual Projected</p>
                      <div className="text-2xl font-bold text-gray-900 mt-1">ETB 1,525,000</div>
                      <div className="flex items-center mt-1 text-xs">
                        <span className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          12.5%
                        </span>
                        <span className="text-gray-500 ml-1">vs last year</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-gray-500">Average Plan Value</p>
                      <div className="text-2xl font-bold text-gray-900 mt-1">ETB 5,240</div>
                      <div className="flex items-center mt-1 text-xs">
                        <span className="text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          5.8%
                        </span>
                        <span className="text-gray-500 ml-1">vs last quarter</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Recent Invoices</h3>
                  <div className="rounded-md border border-gray-200">
                    <div className="w-full overflow-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-gray-200">
                          <tr>
                            <th className="h-10 px-4 text-left font-medium text-gray-500">Invoice #</th>
                            <th className="h-10 px-4 text-left font-medium text-gray-500">Factory</th>
                            <th className="h-10 px-4 text-left font-medium text-gray-500">Amount</th>
                            <th className="h-10 px-4 text-left font-medium text-gray-500">Date</th>
                            <th className="h-10 px-4 text-left font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: "INV-7845",
                              factory: "Abyssinia Textiles",
                              amount: 65000,
                              date: "Apr 2, 2023",
                              status: "Paid",
                            },
                            {
                              id: "INV-7844",
                              factory: "Habesha Garments",
                              amount: 45000,
                              date: "Apr 1, 2023",
                              status: "Paid",
                            },
                            {
                              id: "INV-7843",
                              factory: "Ethio Leather",
                              amount: 45000,
                              date: "Mar 28, 2023",
                              status: "Paid",
                            },
                            {
                              id: "INV-7842",
                              factory: "Addis Construction",
                              amount: 45000,
                              date: "Mar 25, 2023",
                              status: "Unpaid",
                            },
                            {
                              id: "INV-7841",
                              factory: "Sheba Foods",
                              amount: 35000,
                              date: "Mar 20, 2023",
                              status: "Paid",
                            },
                          ].map((invoice, i) => (
                            <tr
                              key={i}
                              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                toast({
                                  title: "Invoice selected",
                                  description: `You selected invoice ${invoice.id}`,
                                })
                                router.push("/saas-admin/invoices")
                              }}
                            >
                              <td className="p-4 font-medium text-purple-600">{invoice.id}</td>
                              <td className="p-4 text-gray-900">{invoice.factory}</td>
                              <td className="p-4 text-gray-900">ETB {invoice.amount.toLocaleString()}</td>
                              <td className="p-4 text-gray-300">{invoice.date}</td>
                              <td className="p-4">
                                <Badge className={invoice.status === "Paid" ? "bg-green-600" : "bg-yellow-600"}>
                                  {invoice.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Support Overview</CardTitle>
              <CardDescription className="text-gray-500">Recent support requests and issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="text-center pt-6">
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <p className="text-xs text-gray-500 mt-1">Open Tickets</p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="text-center pt-6">
                      <div className="text-2xl font-bold text-gray-900">3</div>
                      <p className="text-xs text-gray-500 mt-1">High Priority</p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="text-center pt-6">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <p className="text-xs text-gray-500 mt-1">Resolved (Week)</p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200 bg-white">
                    <CardContent className="text-center pt-6">
                      <div className="text-2xl font-bold text-gray-900">2.4h</div>
                      <p className="text-xs text-gray-500 mt-1">Avg. Response Time</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Recent Support Tickets</h3>
                  <div className="space-y-3">
                    {[
                      {
                        id: "TKT-2341",
                        title: "Payroll calculation issue",
                        factory: "Abyssinia Textiles",
                        priority: "High",
                        status: "Open",
                        time: "2 hours ago",
                      },
                      {
                        id: "TKT-2340",
                        title: "Login problems after password reset",
                        factory: "Habesha Garments",
                        priority: "Medium",
                        status: "In Progress",
                        time: "5 hours ago",
                      },
                      {
                        id: "TKT-2339",
                        title: "Need help with report customization",
                        factory: "Ethio Leather",
                        priority: "Low",
                        status: "Open",
                        time: "1 day ago",
                      },
                      {
                        id: "TKT-2338",
                        title: "Worker profile images not uploading",
                        factory: "Sheba Foods",
                        priority: "Medium",
                        status: "Open",
                        time: "1 day ago",
                      },
                      {
                        id: "TKT-2337",
                        title: "Request for additional administrator access",
                        factory: "Addis Construction",
                        priority: "Low",
                        status: "Resolved",
                        time: "2 days ago",
                      },
                    ].map((ticket, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-md bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Ticket selected",
                            description: `You selected ticket ${ticket.id}`,
                          })
                          router.push("/saas-admin/issues")
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <Badge
                                className={
                                  ticket.priority === "High"
                                    ? "bg-red-600"
                                    : ticket.priority === "Medium"
                                      ? "bg-orange-600"
                                      : "bg-blue-600"
                                }
                              >
                                {ticket.priority}
                              </Badge>
                              <span className="text-xs text-gray-500 ml-2">{ticket.id}</span>
                            </div>
                            <p className="font-medium text-gray-900 mt-1">{ticket.title}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-300">{ticket.factory}</p>
                            <div className="flex items-center mt-1 text-xs">
                              <Badge
                                variant="outline"
                                className={
                                  ticket.status === "Open"
                                    ? "border-yellow-800/20 text-yellow-400"
                                    : ticket.status === "In Progress"
                                      ? "border-blue-800/20 text-blue-400"
                                      : "border-green-800/20 text-green-400"
                                }
                              >
                                {ticket.status}
                              </Badge>
                              <span className="text-gray-500 ml-2">{ticket.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
