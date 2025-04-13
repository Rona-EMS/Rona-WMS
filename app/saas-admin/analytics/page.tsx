"use client"

import { useState, useCallback } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, Download, Users, Clock, Building2, Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [activeTab, setActiveTab] = useState("features")
  const { toast } = useToast()
  
  // Initialize feature usage data
  const [featureData, setFeatureData] = useState([
    { name: "Attendance Tracking", percentage: 98, users: 8125, status: "success" },
    { name: "Payroll Management", percentage: 87, users: 7175, status: "success" },
    { name: "Shift Management", percentage: 76, users: 6269, status: "success" },
    { name: "Emergency Reporting", percentage: 62, users: 5114, status: "warning" },
    { name: "Performance Analytics", percentage: 53, users: 4372, status: "warning" },
    { name: "Inventory Management", percentage: 41, users: 3382, status: "error" },
    { name: "Multi-location Management", percentage: 32, users: 2640, status: "error" },
  ])

  // Metrics data that would change based on time range
  const metricsData = {
    "7": {
      activeUsers: 6982,
      activeUsersGrowth: 8,
      avgSessionTime: "22 min",
      avgSessionTimeGrowth: 3,
      activeFactories: 22,
      activeFactoriesGrowth: 5,
      eventsGenerated: 124567,
      eventsGeneratedGrowth: 12
    },
    "30": {
      activeUsers: 8249,
      activeUsersGrowth: 12,
      avgSessionTime: "26 min",
      avgSessionTimeGrowth: 5,
      activeFactories: 24,
      activeFactoriesGrowth: 8,
      eventsGenerated: 167839,
      eventsGeneratedGrowth: 19
    },
    "90": {
      activeUsers: 9105,
      activeUsersGrowth: 15,
      avgSessionTime: "28 min",
      avgSessionTimeGrowth: 7,
      activeFactories: 26,
      activeFactoriesGrowth: 12,
      eventsGenerated: 486321,
      eventsGeneratedGrowth: 22
    },
    "180": {
      activeUsers: 10234,
      activeUsersGrowth: 18,
      avgSessionTime: "30 min",
      avgSessionTimeGrowth: 10,
      activeFactories: 28,
      activeFactoriesGrowth: 17,
      eventsGenerated: 952467,
      eventsGeneratedGrowth: 26
    },
    "365": {
      activeUsers: 12567,
      activeUsersGrowth: 24,
      avgSessionTime: "32 min",
      avgSessionTimeGrowth: 15,
      activeFactories: 32,
      activeFactoriesGrowth: 28,
      eventsGenerated: 1862435,
      eventsGeneratedGrowth: 35
    }
  }

  // Current metrics based on selected time range
  const currentMetrics = metricsData[timeRange] || metricsData["30"]

  // Handle time range change
  const handleTimeRangeChange = useCallback((value: string) => {
    setTimeRange(value)
    // Here you would typically fetch new data based on the selected time range
    toast({
      title: "Time range updated",
      description: `Showing data for the last ${value} days`,
    })
  }, [toast])

  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])

  // Handle export button click
  const handleExport = useCallback(() => {
    toast({
      title: "Exporting data",
      description: `Analytics data for the last ${timeRange} days is being exported`,
    })
    // In a real app, this would trigger a download of CSV/Excel file
  }, [timeRange, toast])

  return (
    <DashboardShell
      title="Usage Analytics"
      description="Monitor how factories are using the Rona platform"
      headerAction={
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px] bg-purple-600 text-white border-none hover:bg-purple-700">
              <SelectValue placeholder="Select time range">Last {timeRange} days</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-white text-black hover:bg-gray-100" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      }
    >
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-gray-200 bg-white">
          <CardContent className="flex flex-row items-center justify-between pt-6 bg-white">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900">{currentMetrics.activeUsers.toLocaleString()}</h3>
                <span className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {currentMetrics.activeUsersGrowth}%
                </span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="flex flex-row items-center justify-between pt-6 bg-white">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Session Time</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900">{currentMetrics.avgSessionTime}</h3>
                <span className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {currentMetrics.avgSessionTimeGrowth}%
                </span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="flex flex-row items-center justify-between pt-6 bg-white">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Factories</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900">{currentMetrics.activeFactories}</h3>
                <span className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {currentMetrics.activeFactoriesGrowth}%
                </span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardContent className="flex flex-row items-center justify-between pt-6 bg-white">
            <div>
              <p className="text-sm font-medium text-gray-500">Events Generated</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900">{currentMetrics.eventsGenerated.toLocaleString()}</h3>
                <span className="ml-2 flex items-center text-green-500 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {currentMetrics.eventsGeneratedGrowth}%
                </span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 text-purple-600 border border-gray-200">
          <TabsTrigger value="features" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Feature Usage
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            User Engagement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-4">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Feature Usage</CardTitle>
              <CardDescription className="text-gray-500">
                See which features are most popular across factories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 bg-white">
                {featureData.map((feature, index) => (
                  <div key={index} className="space-y-2 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {feature.status === "success" ? (
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        ) : feature.status === "warning" ? (
                          <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium text-gray-900">{feature.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{feature.users.toLocaleString()} users</span>
                        <span className="font-bold text-gray-900">{feature.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${
                          feature.status === "success"
                            ? "bg-green-500"
                            : feature.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${feature.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">User Engagement</CardTitle>
              <CardDescription className="text-gray-500">Monthly active users by role and factory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Engagement by Role</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { role: "Workers", count: 6834, percentage: 83, color: "bg-purple-500" },
                      { role: "Admins", count: 873, percentage: 95, color: "bg-blue-500" },
                      { role: "Owners", count: 542, percentage: 92, color: "bg-green-500" },
                    ].map((role, i) => (
                      <Card key={i} className="border-gray-200 bg-white">
                        <CardContent className="pt-6">
                          <h4 className="text-sm font-medium text-gray-500">{role.role}</h4>
                          <div className="mt-1 flex items-center">
                            <p className="text-2xl font-bold text-gray-900">{role.count.toLocaleString()}</p>
                            <span className="ml-2 text-sm text-green-500">{role.percentage}%</span>
                          </div>
                          <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full ${role.color}`}
                              style={{ width: `${role.percentage}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Factories by Engagement</h3>
                    <div className="rounded-md border border-gray-200">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="border-b border-gray-200">
                            <tr>
                              <th className="h-12 px-4 text-left font-medium text-gray-500">Factory</th>
                              <th className="h-12 px-4 text-left font-medium text-gray-500">Active Users</th>
                              <th className="h-12 px-4 text-left font-medium text-gray-500">Sessions</th>
                              <th className="h-12 px-4 text-left font-medium text-gray-500">Avg Time</th>
                              <th className="h-12 px-4 text-left font-medium text-gray-500">Engagement</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: "Abyssinia Textiles",
                                users: 487,
                                sessions: 9842,
                                time: "38 min",
                                engagement: 97,
                              },
                              {
                                name: "Habesha Garments",
                                users: 356,
                                sessions: 7231,
                                time: "29 min",
                                engagement: 91,
                              },
                              {
                                name: "Ethio Leather",
                                users: 328,
                                sessions: 6584,
                                time: "32 min",
                                engagement: 89,
                              },
                              {
                                name: "Addis Construction",
                                users: 243,
                                sessions: 4921,
                                time: "21 min",
                                engagement: 84,
                              },
                              {
                                name: "Sheba Foods",
                                users: 198,
                                sessions: 3847,
                                time: "18 min",
                                engagement: 78,
                              },
                            ].map((factory, i) => (
                              <tr key={i} className="border-b border-gray-200">
                                <td className="p-4 font-medium text-gray-900">{factory.name}</td>
                                <td className="p-4 text-gray-900">{factory.users}</td>
                                <td className="p-4 text-gray-900">{factory.sessions.toLocaleString()}</td>
                                <td className="p-4 text-gray-900">{factory.time}</td>
                                <td className="p-4">
                                  <div className="flex items-center">
                                    <span className="font-medium text-gray-900">{factory.engagement}%</span>
                                    <div className="ml-4 h-2 w-24 rounded-full bg-gray-200">
                                      <div
                                        className="h-2 rounded-full bg-green-500"
                                        style={{ width: `${factory.engagement}%` }}
                                      ></div>
                                    </div>
                                  </div>
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
        </Tabs>
      </DashboardShell>
    )
}
