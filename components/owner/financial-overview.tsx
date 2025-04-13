"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Printer, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

export function FinancialOverview() {
  const [timeRange, setTimeRange] = useState("month")
  const [currency, setCurrency] = useState("ETB")

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format}`,
      description: "Your financial report is being prepared for download.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-[#111827] border-0">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F2937] border-0 text-white">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px] bg-[#111827] border-0">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F2937] border-0 text-white">
              <SelectItem value="ETB">ETB</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            onClick={() => handleExport("PDF")}
          >
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            onClick={() => handleExport("Excel")}
          >
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            onClick={() => toast({ title: "Printing report", description: "Sending financial report to printer..." })}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
            onClick={() =>
              toast({ title: "Share report", description: "Preparing shareable link for the financial report..." })
            }
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#111827] border-0 mb-4">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="profit-loss" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Profit & Loss
          </TabsTrigger>
          <TabsTrigger value="payroll" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Payroll
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currency}{" "}
                  {currency === "ETB"
                    ? "1,250,000"
                    : currency === "USD"
                      ? "37,500"
                      : currency === "EUR"
                        ? "34,800"
                        : "32,500"}
                </div>
                <p className="text-xs text-green-500 flex items-center mt-1">+12.5% from last {timeRange}</p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  Revenue chart
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currency}{" "}
                  {currency === "ETB"
                    ? "850,000"
                    : currency === "USD"
                      ? "25,500"
                      : currency === "EUR"
                        ? "23,600"
                        : "22,100"}
                </div>
                <p className="text-xs text-red-500 flex items-center mt-1">+8.3% from last {timeRange}</p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  Expenses chart
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  {currency}{" "}
                  {currency === "ETB"
                    ? "400,000"
                    : currency === "USD"
                      ? "12,000"
                      : currency === "EUR"
                        ? "11,200"
                        : "10,400"}
                </div>
                <p className="text-xs text-green-500 flex items-center mt-1">+22.1% from last {timeRange}</p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  Profit chart
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription className="text-gray-400">Analysis of revenue sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product A</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "625,000"
                        : currency === "USD"
                          ? "18,750"
                          : currency === "EUR"
                            ? "17,400"
                            : "16,250"}{" "}
                      (50%)
                    </span>
                  </div>
                  <Progress value={50} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "50%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product B</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "375,000"
                        : currency === "USD"
                          ? "11,250"
                          : currency === "EUR"
                            ? "10,440"
                            : "9,750"}{" "}
                      (30%)
                    </span>
                  </div>
                  <Progress value={30} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "30%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product C</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "250,000"
                        : currency === "USD"
                          ? "7,500"
                          : currency === "EUR"
                            ? "6,960"
                            : "6,500"}{" "}
                      (20%)
                    </span>
                  </div>
                  <Progress value={20} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "20%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription className="text-gray-400">
                {timeRange === "month"
                  ? "Monthly"
                  : timeRange === "quarter"
                    ? "Quarterly"
                    : timeRange === "year"
                      ? "Annual"
                      : "Weekly"}{" "}
                profit and loss breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Revenue</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Product Sales</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "1,150,000"
                          : currency === "USD"
                            ? "34,500"
                            : currency === "EUR"
                              ? "32,000"
                              : "29,900"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Revenue</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "100,000"
                          : currency === "USD"
                            ? "3,000"
                            : currency === "EUR"
                              ? "2,800"
                              : "2,600"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Revenue</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "1,250,000"
                          : currency === "USD"
                            ? "37,500"
                            : currency === "EUR"
                              ? "34,800"
                              : "32,500"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Expenses</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Raw Materials</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "450,000"
                          : currency === "USD"
                            ? "13,500"
                            : currency === "EUR"
                              ? "12,500"
                              : "11,700"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Labor</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "250,000"
                          : currency === "USD"
                            ? "7,500"
                            : currency === "EUR"
                              ? "6,960"
                              : "6,500"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Utilities</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "75,000"
                          : currency === "USD"
                            ? "2,250"
                            : currency === "EUR"
                              ? "2,088"
                              : "1,950"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rent</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "50,000"
                          : currency === "USD"
                            ? "1,500"
                            : currency === "EUR"
                              ? "1,392"
                              : "1,300"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Other Expenses</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "25,000"
                          : currency === "USD"
                            ? "750"
                            : currency === "EUR"
                              ? "696"
                              : "650"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Expenses</span>
                      <span>
                        {currency}{" "}
                        {currency === "ETB"
                          ? "850,000"
                          : currency === "USD"
                            ? "25,500"
                            : currency === "EUR"
                              ? "23,636"
                              : "22,100"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-green-500">Net Profit</span>
                    <span className="text-green-500">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "400,000"
                        : currency === "USD"
                          ? "12,000"
                          : currency === "EUR"
                            ? "11,164"
                            : "10,400"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Profit Margin</span>
                    <span>32%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Current Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currency}{" "}
                  {currency === "ETB"
                    ? "250,000"
                    : currency === "USD"
                      ? "7,500"
                      : currency === "EUR"
                        ? "6,960"
                        : "6,500"}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  For{" "}
                  {timeRange === "month"
                    ? "this month"
                    : timeRange === "week"
                      ? "this week"
                      : timeRange === "quarter"
                        ? "this quarter"
                        : "this year"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Forecasted Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currency}{" "}
                  {currency === "ETB"
                    ? "265,000"
                    : currency === "USD"
                      ? "7,950"
                      : currency === "EUR"
                        ? "7,378"
                        : "6,890"}
                </div>
                <p className="text-xs text-red-500 mt-1">+6% projected increase</p>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Overtime Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currency}{" "}
                  {currency === "ETB" ? "35,000" : currency === "USD" ? "1,050" : currency === "EUR" ? "974" : "910"}
                </div>
                <p className="text-xs text-green-500 mt-1">-12% from last {timeRange}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Payroll Breakdown by Department</CardTitle>
              <CardDescription className="text-gray-400">Distribution of payroll costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Production</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "150,000"
                        : currency === "USD"
                          ? "4,500"
                          : currency === "EUR"
                            ? "4,176"
                            : "3,900"}{" "}
                      (60%)
                    </span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "60%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Administration</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "50,000"
                        : currency === "USD"
                          ? "1,500"
                          : currency === "EUR"
                            ? "1,392"
                            : "1,300"}{" "}
                      (20%)
                    </span>
                  </div>
                  <Progress value={20} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "20%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sales & Marketing</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB" ? "30,000" : currency === "USD" ? "900" : currency === "EUR" ? "835" : "780"}{" "}
                      (12%)
                    </span>
                  </div>
                  <Progress value={12} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "12%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maintenance</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB" ? "20,000" : currency === "USD" ? "600" : currency === "EUR" ? "557" : "520"}{" "}
                      (8%)
                    </span>
                  </div>
                  <Progress value={8} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "8%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription className="text-gray-400">Breakdown of all expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Raw Materials</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "450,000"
                        : currency === "USD"
                          ? "13,500"
                          : currency === "EUR"
                            ? "12,500"
                            : "11,700"}{" "}
                      (53%)
                    </span>
                  </div>
                  <Progress value={53} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "53%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Labor</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "250,000"
                        : currency === "USD"
                          ? "7,500"
                          : currency === "EUR"
                            ? "6,960"
                            : "6,500"}{" "}
                      (29%)
                    </span>
                  </div>
                  <Progress value={29} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "29%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Utilities</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "75,000"
                        : currency === "USD"
                          ? "2,250"
                          : currency === "EUR"
                            ? "2,088"
                            : "1,950"}{" "}
                      (9%)
                    </span>
                  </div>
                  <Progress value={9} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "9%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rent</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB"
                        ? "50,000"
                        : currency === "USD"
                          ? "1,500"
                          : currency === "EUR"
                            ? "1,392"
                            : "1,300"}{" "}
                      (6%)
                    </span>
                  </div>
                  <Progress value={6} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "6%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other Expenses</span>
                    <span className="text-sm font-medium">
                      {currency}{" "}
                      {currency === "ETB" ? "25,000" : currency === "USD" ? "750" : currency === "EUR" ? "696" : "650"}{" "}
                      (3%)
                    </span>
                  </div>
                  <Progress value={3} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "3%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
