"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Edit, Plus, Trash } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function KpiDashboard() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] border-0 bg-[#111827]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F2937] border-0 text-white">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            onClick={() =>
              toast({ title: "Exporting KPIs", description: "Your KPI report is being prepared for download." })
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-gold-500 text-black hover:bg-gold-600"
            onClick={() => toast({ title: "Create KPI", description: "Opening KPI creation form..." })}
          >
            <Plus className="h-4 w-4 mr-2" />
            New KPI
          </Button>
        </div>
      </div>

      <Tabs defaultValue="production" className="w-full">
        <TabsList className="bg-[#111827] border-0 mb-4">
          <TabsTrigger value="production" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Production
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Quality
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="custom" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Custom KPIs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Production Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28,500 units</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 30,000</span>
                  <span className="text-sm text-green-500">95%</span>
                </div>
                <Progress value={95} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-green-500" style={{ width: "95%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Production Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">950 units/day</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 1,000</span>
                  <span className="text-sm text-yellow-500">95%</span>
                </div>
                <Progress value={95} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-yellow-500" style={{ width: "95%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Production Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 90%</span>
                  <span className="text-sm text-yellow-500">94%</span>
                </div>
                <Progress value={94} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-yellow-500" style={{ width: "94%" }} />
                </Progress>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Production Trends</CardTitle>
              <CardDescription className="text-gray-400">Daily production output for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                Production trend chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Quality Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 98%</span>
                  <span className="text-sm text-green-500">100%</span>
                </div>
                <Progress value={100} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-green-500" style={{ width: "100%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Defect Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.8%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: &lt;2%</span>
                  <span className="text-sm text-green-500">100%</span>
                </div>
                <Progress value={100} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-green-500" style={{ width: "100%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Customer Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.5%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: &lt;1%</span>
                  <span className="text-sm text-green-500">100%</span>
                </div>
                <Progress value={100} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-green-500" style={{ width: "100%" }} />
                </Progress>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Quality Issues by Type</CardTitle>
              <CardDescription className="text-gray-400">Breakdown of quality issues by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                Quality issues chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Overall Equipment Effectiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 85%</span>
                  <span className="text-sm text-yellow-500">96%</span>
                </div>
                <Progress value={96} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-yellow-500" style={{ width: "96%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Machine Downtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: &lt;5%</span>
                  <span className="text-sm text-green-500">100%</span>
                </div>
                <Progress value={100} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-green-500" style={{ width: "100%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Labor Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">Target: 90%</span>
                  <span className="text-sm text-yellow-500">97%</span>
                </div>
                <Progress value={97} className="h-2 mt-2 bg-gray-700">
                  <div className="h-full bg-yellow-500" style={{ width: "97%" }} />
                </Progress>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Efficiency Metrics Over Time</CardTitle>
              <CardDescription className="text-gray-400">
                Tracking efficiency metrics for the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                Efficiency metrics chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Custom KPIs</CardTitle>
                <CardDescription className="text-gray-400">
                  Your custom defined key performance indicators
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={() => toast({ title: "Create KPI", description: "Opening KPI creation form..." })}
              >
                <Plus className="h-4 w-4 mr-2" />
                New KPI
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="bg-[#1F2937] border-0 text-white">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">Worker Productivity</CardTitle>
                      <CardDescription className="text-xs text-gray-400">
                        Units produced per worker per day
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold">7.9 units</div>
                        <div className="text-xs text-green-500">+0.3 from last month</div>
                      </div>
                      <Badge className="bg-green-500 text-black">On Target</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Target: 8 units</span>
                        <span>99%</span>
                      </div>
                      <Progress value={99} className="h-2 mt-1 bg-gray-700">
                        <div className="h-full bg-green-500" style={{ width: "99%" }} />
                      </Progress>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1F2937] border-0 text-white">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">Energy Consumption</CardTitle>
                      <CardDescription className="text-xs text-gray-400">kWh per unit produced</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold">1.2 kWh</div>
                        <div className="text-xs text-green-500">-0.1 from last month</div>
                      </div>
                      <Badge className="bg-green-500 text-black">On Target</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Target: &lt;1.3 kWh</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2 mt-1 bg-gray-700">
                        <div className="h-full bg-green-500" style={{ width: "100%" }} />
                      </Progress>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1F2937] border-0 text-white">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-medium">Raw Material Utilization</CardTitle>
                      <CardDescription className="text-xs text-gray-400">
                        Percentage of raw materials utilized
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold">93.5%</div>
                        <div className="text-xs text-yellow-500">-0.5% from last month</div>
                      </div>
                      <Badge className="bg-yellow-500 text-black">Needs Attention</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Target: 95%</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2 mt-1 bg-gray-700">
                        <div className="h-full bg-yellow-500" style={{ width: "98%" }} />
                      </Progress>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
