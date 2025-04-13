"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart, DonutChart } from "@tremor/react"
import { Download, Users, Clock, MousePointerClick, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for analytics
const activeUsersData = [
  { date: "Jan", "Daily Active Users": 1200, "Weekly Active Users": 2400, "Monthly Active Users": 4800 },
  { date: "Feb", "Daily Active Users": 1300, "Weekly Active Users": 2600, "Monthly Active Users": 5100 },
  { date: "Mar", "Daily Active Users": 1400, "Weekly Active Users": 2800, "Monthly Active Users": 5400 },
  { date: "Apr", "Daily Active Users": 1600, "Weekly Active Users": 3200, "Monthly Active Users": 5900 },
  { date: "May", "Daily Active Users": 1800, "Weekly Active Users": 3600, "Monthly Active Users": 6300 },
  { date: "Jun", "Daily Active Users": 2000, "Weekly Active Users": 4000, "Monthly Active Users": 6800 },
]

const sessionTimeData = [
  { date: "Jan", "Average Session Time": 12, "Median Session Time": 8 },
  { date: "Feb", "Average Session Time": 14, "Median Session Time": 9 },
  { date: "Mar", "Average Session Time": 13, "Median Session Time": 8.5 },
  { date: "Apr", "Average Session Time": 15, "Median Session Time": 10 },
  { date: "May", "Average Session Time": 16, "Median Session Time": 11 },
  { date: "Jun", "Average Session Time": 18, "Median Session Time": 12 },
]

const featureUsageData = [
  { feature: "Shift Management", usage: 85 },
  { feature: "Attendance Tracking", usage: 72 },
  { feature: "Payroll Processing", usage: 68 },
  { feature: "Emergency Reporting", usage: 45 },
  { feature: "Worker Management", usage: 78 },
]

const userEngagementData = [
  { segment: "Highly Engaged", value: 35 },
  { segment: "Moderately Engaged", value: 40 },
  { segment: "Low Engagement", value: 15 },
  { segment: "Inactive", value: 10 },
]

const deviceUsageData = [
  { device: "Desktop", percentage: 45 },
  { device: "Mobile", percentage: 40 },
  { device: "Tablet", percentage: 10 },
  { device: "Kiosk", percentage: 5 },
]

export function UsageAnalytics() {
  const [timeRange, setTimeRange] = useState("6m")
  const [activeTab, setActiveTab] = useState("overview")

  // Function to handle exporting data
  const handleExport = (format: "csv" | "pdf" | "excel") => {
    console.log(`Exporting data in ${format} format`)
    // In a real implementation, this would generate and download the file
    alert(`Analytics data exported as ${format.toUpperCase()}`)
  }

  // Function to filter data based on time range
  const getFilteredData = (data: any[], range: string) => {
    // In a real implementation, this would filter the data based on the time range
    // For this demo, we'll just return the original data
    return data
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Usage Analytics</h1>
          <p className="text-muted-foreground">Track user engagement and feature usage across the platform</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    Active Users
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,842</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Avg. Session Time
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.2 min</div>
                <p className="text-xs text-muted-foreground">+2.5 min from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center">
                    <MousePointerClick className="mr-2 h-4 w-4 text-muted-foreground" />
                    Feature Engagement
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.4%</div>
                <p className="text-xs text-muted-foreground">+4.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Users Trend</CardTitle>
                <CardDescription>Daily, weekly, and monthly active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={getFilteredData(activeUsersData, timeRange)}
                  index="date"
                  categories={["Daily Active Users", "Weekly Active Users", "Monthly Active Users"]}
                  colors={["blue", "green", "purple"]}
                  yAxisWidth={40}
                  showLegend={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Time</CardTitle>
                <CardDescription>Average and median session duration in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={getFilteredData(sessionTimeData, timeRange)}
                  index="date"
                  categories={["Average Session Time", "Median Session Time"]}
                  colors={["amber", "indigo"]}
                  yAxisWidth={40}
                  showLegend={true}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Over Time</CardTitle>
              <CardDescription>Track daily, weekly, and monthly active users</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={getFilteredData(activeUsersData, timeRange)}
                index="date"
                categories={["Daily Active Users", "Weekly Active Users", "Monthly Active Users"]}
                colors={["blue", "green", "purple"]}
                yAxisWidth={40}
                showLegend={true}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Segments</CardTitle>
                <CardDescription>Distribution of users by engagement level</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={userEngagementData}
                  category="value"
                  index="segment"
                  colors={["emerald", "blue", "amber", "rose"]}
                  showLabel={true}
                  showAnimation={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>Platform access by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={deviceUsageData}
                  category="percentage"
                  index="device"
                  colors={["slate", "violet", "indigo", "cyan"]}
                  showLabel={true}
                  showAnimation={true}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Percentage of users actively using each feature</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={featureUsageData}
                index="feature"
                categories={["usage"]}
                colors={["blue"]}
                yAxisWidth={48}
                showLegend={false}
                valueFormatter={(value) => `${value}%`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Adoption Over Time</CardTitle>
              <CardDescription>Track how feature usage has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={[
                  { date: "Jan", "Shift Management": 70, "Attendance Tracking": 60, "Payroll Processing": 50 },
                  { date: "Feb", "Shift Management": 72, "Attendance Tracking": 62, "Payroll Processing": 55 },
                  { date: "Mar", "Shift Management": 75, "Attendance Tracking": 65, "Payroll Processing": 58 },
                  { date: "Apr", "Shift Management": 78, "Attendance Tracking": 68, "Payroll Processing": 62 },
                  { date: "May", "Shift Management": 82, "Attendance Tracking": 70, "Payroll Processing": 65 },
                  { date: "Jun", "Shift Management": 85, "Attendance Tracking": 72, "Payroll Processing": 68 },
                ]}
                index="date"
                categories={["Shift Management", "Attendance Tracking", "Payroll Processing"]}
                colors={["emerald", "blue", "amber"]}
                yAxisWidth={40}
                showLegend={true}
                valueFormatter={(value) => `${value}%`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>Percentage of users who return after their first visit</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { week: "Week 1", Retention: 100 },
                    { week: "Week 2", Retention: 82 },
                    { week: "Week 3", Retention: 74 },
                    { week: "Week 4", Retention: 68 },
                    { week: "Week 5", Retention: 65 },
                    { week: "Week 6", Retention: 62 },
                    { week: "Week 7", Retention: 60 },
                    { week: "Week 8", Retention: 58 },
                  ]}
                  index="week"
                  categories={["Retention"]}
                  colors={["blue"]}
                  yAxisWidth={40}
                  showLegend={false}
                  valueFormatter={(value) => `${value}%`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
                <CardDescription>Average satisfaction score from user feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="text-6xl font-bold text-blue-600">4.7</div>
                  <div className="text-xl text-muted-foreground">out of 5</div>
                  <div className="flex items-center mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-6 h-6 ${star <= 4 ? "text-yellow-400" : "text-yellow-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">Based on 1,248 responses</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement by Factory Size</CardTitle>
              <CardDescription>Average engagement metrics grouped by factory size</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { size: "Small (1-50)", "Session Time": 15, "Features Used": 4, "Weekly Logins": 3.2 },
                  { size: "Medium (51-200)", "Session Time": 22, "Features Used": 6, "Weekly Logins": 4.5 },
                  { size: "Large (201-500)", "Session Time": 18, "Features Used": 7, "Weekly Logins": 5.1 },
                  { size: "Enterprise (500+)", "Session Time": 25, "Features Used": 8, "Weekly Logins": 6.3 },
                ]}
                index="size"
                categories={["Session Time", "Features Used", "Weekly Logins"]}
                colors={["blue", "amber", "emerald"]}
                yAxisWidth={40}
                showLegend={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
