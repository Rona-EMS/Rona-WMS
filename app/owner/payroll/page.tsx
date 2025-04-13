"use client"

import { useState } from "react"
import { Calendar, DollarSign, Download, FileText, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/context/language-context"

export default function OwnerPayrollPage() {
  const { language } = useLanguage()
  const [forecastPeriod, setForecastPeriod] = useState("month")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() + 1)))

  const isEnglish = language === "en"

  // Mock data for payroll summary
  const payrollSummary = {
    totalPayroll: 287500,
    regularHours: 4200,
    overtimeHours: 320,
    bonuses: 15000,
    deductions: 28750,
    employees: 42,
    averageSalary: 6845,
    payrollTrend: 3.2, // percentage increase from last period
  }

  // Mock data for payroll forecast
  const payrollForecast = {
    projectedTotal: 295000,
    projectedIncrease: 2.6,
    regularHoursForecast: 4250,
    overtimeHoursForecast: 340,
    bonusesForecast: 16000,
    deductionsForecast: 29500,
    costDrivers: [
      { name: "Regular Hours", percentage: 72 },
      { name: "Overtime", percentage: 12 },
      { name: "Bonuses", percentage: 8 },
      { name: "Benefits", percentage: 5 },
      { name: "Other", percentage: 3 },
    ],
    monthlyCosts: [
      { month: "Jan", actual: 280000, forecast: 280000 },
      { month: "Feb", actual: 282000, forecast: 282000 },
      { month: "Mar", actual: 285000, forecast: 285000 },
      { month: "Apr", actual: 287500, forecast: 287500 },
      { month: "May", actual: null, forecast: 295000 },
      { month: "Jun", actual: null, forecast: 298000 },
      { month: "Jul", actual: null, forecast: 305000 },
      { month: "Aug", actual: null, forecast: 310000 },
      { month: "Sep", actual: null, forecast: 312000 },
      { month: "Oct", actual: null, forecast: 315000 },
      { month: "Nov", actual: null, forecast: 320000 },
      { month: "Dec", actual: null, forecast: 325000 },
    ],
  }

  // Mock data for department breakdown
  const departmentBreakdown = [
    { name: "Production", cost: 145000, employees: 22, avgSalary: 6590 },
    { name: "Packaging", cost: 68000, employees: 12, avgSalary: 5670 },
    { name: "Maintenance", cost: 42000, employees: 5, avgSalary: 8400 },
    { name: "Quality Control", cost: 32500, employees: 3, avgSalary: 10830 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isEnglish ? "Payroll Management" : "የደመወዝ አስተዳደር"}</h1>
          <p className="text-muted-foreground">
            {isEnglish ? "Manage and forecast your factory's payroll expenses" : "የፋብሪካዎን የደመወዝ ወጪዎች ያስተዳድሩ እና ይተንብዩ"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            {isEnglish ? "Export Report" : "ሪፖርት ላክ"}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {isEnglish ? "Download Data" : "ዳታ አውርድ"}
          </Button>
        </div>
      </div>

      {/* Payroll Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isEnglish ? "Total Payroll" : "ጠቅላላ ደመወዝ"}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                style: "currency",
                currency: "ETB",
                maximumFractionDigits: 0,
              }).format(payrollSummary.totalPayroll)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {payrollSummary.payrollTrend > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={payrollSummary.payrollTrend > 0 ? "text-green-500" : "text-red-500"}>
                {payrollSummary.payrollTrend > 0 ? "+" : ""}
                {payrollSummary.payrollTrend}%
              </span>
              <span className="ml-1">{isEnglish ? "from last month" : "ካለፈው ወር"}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isEnglish ? "Total Hours" : "ጠቅላላ ሰዓታት"}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat().format(payrollSummary.regularHours + payrollSummary.overtimeHours)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isEnglish ? "Regular: " : "መደበኛ: "}
              {new Intl.NumberFormat().format(payrollSummary.regularHours)} |{isEnglish ? " Overtime: " : " ትርፍ ሰዓት: "}
              {new Intl.NumberFormat().format(payrollSummary.overtimeHours)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isEnglish ? "Employees" : "ሰራተኞች"}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.employees}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isEnglish ? "Avg. Salary: " : "አማካይ ደመወዝ: "}
              {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                style: "currency",
                currency: "ETB",
                maximumFractionDigits: 0,
              }).format(payrollSummary.averageSalary)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{isEnglish ? "Forecast" : "ትንበያ"}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                style: "currency",
                currency: "ETB",
                maximumFractionDigits: 0,
              }).format(payrollForecast.projectedTotal)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-amber-500" />
              <span className="text-amber-500">+{payrollForecast.projectedIncrease}%</span>
              <span className="ml-1">{isEnglish ? "projected increase" : "የሚጠበቅ ጭማሪ"}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto">
          <TabsTrigger value="forecast">{isEnglish ? "Payroll Forecast" : "የደመወዝ ትንበያ"}</TabsTrigger>
          <TabsTrigger value="departments">{isEnglish ? "Department Breakdown" : "በዲፓርትመንት ክፍፍል"}</TabsTrigger>
          <TabsTrigger value="history">{isEnglish ? "Payroll History" : "የደመወዝ ታሪክ"}</TabsTrigger>
        </TabsList>

        {/* Forecast Tab Content */}
        <TabsContent value="forecast" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{isEnglish ? "Payroll Forecast" : "የደመወዝ ትንበያ"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Projected payroll expenses for upcoming periods" : "ለመጪው ጊዜያት የሚጠበቁ የደመወዝ ወጪዎች"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">{isEnglish ? "Start Date" : "የመጀመሪያ ቀን"}</p>
                      <DatePicker date={startDate} setDate={setStartDate} />
                    </div>
                    <div className="grid gap-2">
                      <p className="text-sm font-medium">{isEnglish ? "End Date" : "የመጨረሻ ቀን"}</p>
                      <DatePicker date={endDate} setDate={setEndDate} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">{isEnglish ? "Forecast Period" : "የትንበያ ጊዜ"}</p>
                    <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={isEnglish ? "Select period" : "ጊዜ ይምረጡ"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">{isEnglish ? "Monthly" : "ወርሃዊ"}</SelectItem>
                        <SelectItem value="quarter">{isEnglish ? "Quarterly" : "ሩብ ዓመታዊ"}</SelectItem>
                        <SelectItem value="year">{isEnglish ? "Yearly" : "ዓመታዊ"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Forecast Chart - In a real app, this would be a proper chart component */}
                <div className="h-[300px] w-full border rounded-md p-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">
                      {isEnglish ? "Chart visualization would appear here" : "የቻርት ምስል እዚህ ይታያል"}
                    </p>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      {payrollForecast.monthlyCosts.slice(0, 6).map((item, index) => (
                        <div key={index}>{item.month}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{isEnglish ? "Current" : "አሁን ያለ"}</p>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 0,
                      }).format(payrollSummary.totalPayroll)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{isEnglish ? "Projected" : "የሚጠበቅ"}</p>
                    <p className="text-2xl font-bold">
                      {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 0,
                      }).format(payrollForecast.projectedTotal)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{isEnglish ? "Difference" : "ልዩነት"}</p>
                    <p className="text-2xl font-bold text-amber-500">
                      {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 0,
                      }).format(payrollForecast.projectedTotal - payrollSummary.totalPayroll)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{isEnglish ? "% Change" : "% ለውጥ"}</p>
                    <p className="text-2xl font-bold text-amber-500">+{payrollForecast.projectedIncrease}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isEnglish ? "Cost Drivers" : "የወጪ አነሳሾች"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Breakdown of payroll cost components" : "የደመወዝ ወጪ ክፍሎች ዝርዝር"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollForecast.costDrivers.map((driver, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{isEnglish ? driver.name : translateToAmharic(driver.name)}</span>
                        <span className="font-medium">{driver.percentage}%</span>
                      </div>
                      <Progress value={driver.percentage} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">{isEnglish ? "Forecast Details" : "የትንበያ ዝርዝሮች"}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">{isEnglish ? "Regular Hours" : "መደበኛ ሰዓታት"}:</div>
                    <div className="text-right font-medium">
                      {new Intl.NumberFormat().format(payrollForecast.regularHoursForecast)}
                    </div>
                    <div className="text-muted-foreground">{isEnglish ? "Overtime Hours" : "ትርፍ ሰዓታት"}:</div>
                    <div className="text-right font-medium">
                      {new Intl.NumberFormat().format(payrollForecast.overtimeHoursForecast)}
                    </div>
                    <div className="text-muted-foreground">{isEnglish ? "Bonuses" : "ጉርሻዎች"}:</div>
                    <div className="text-right font-medium">
                      {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 0,
                      }).format(payrollForecast.bonusesForecast)}
                    </div>
                    <div className="text-muted-foreground">{isEnglish ? "Deductions" : "ቅናሾች"}:</div>
                    <div className="text-right font-medium">
                      {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                        style: "currency",
                        currency: "ETB",
                        maximumFractionDigits: 0,
                      }).format(payrollForecast.deductionsForecast)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "Forecast Factors" : "የትንበያ ምክንያቶች"}</CardTitle>
              <CardDescription>
                {isEnglish ? "Key factors affecting the payroll forecast" : "የደመወዝ ትንበያን የሚጎዱ ቁልፍ ምክንያቶች"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">{isEnglish ? "Workforce Changes" : "የሰራተኛ ለውጦች"}</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-green-500" />
                      {isEnglish ? "2 new hires expected" : "2 አዲስ ቅጥሮች ይጠበቃሉ"}
                    </li>
                    <li className="flex items-center">
                      <TrendingDown className="h-3 w-3 mr-2 text-red-500" />
                      {isEnglish ? "1 retirement planned" : "1 ጡረታ ይጠበቃል"}
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-amber-500" />
                      {isEnglish ? "3 promotions scheduled" : "3 እድገቶች ታቅደዋል"}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">{isEnglish ? "Seasonal Factors" : "የወቅት ምክንያቶች"}</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-amber-500" />
                      {isEnglish ? "Holiday season overtime" : "የበዓል ወቅት ትርፍ ሰዓት"}
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-green-500" />
                      {isEnglish ? "Production increase" : "የምርት ጭማሪ"}
                    </li>
                    <li className="flex items-center">
                      <TrendingDown className="h-3 w-3 mr-2 text-amber-500" />
                      {isEnglish ? "Planned maintenance" : "የታቀደ ጥገና"}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">{isEnglish ? "Policy Changes" : "የፖሊሲ ለውጦች"}</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-amber-500" />
                      {isEnglish ? "Minimum wage increase" : "የመነሻ ደመወዝ ጭማሪ"}
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-2 text-green-500" />
                      {isEnglish ? "New bonus structure" : "አዲስ የጉርሻ መዋቅር"}
                    </li>
                    <li className="flex items-center">
                      <TrendingDown className="h-3 w-3 mr-2 text-red-500" />
                      {isEnglish ? "Tax policy changes" : "የታክስ ፖሊሲ ለውጦች"}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments Tab Content */}
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "Department Breakdown" : "በዲፓርትመንት ክፍፍል"}</CardTitle>
              <CardDescription>{isEnglish ? "Payroll costs by department" : "በዲፓርትመንት የደመወዝ ወጪዎች"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        {isEnglish ? "Department" : "ዲፓርትመንት"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {isEnglish ? "Total Cost" : "ጠቅላላ ወጪ"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {isEnglish ? "Employees" : "ሰራተኞች"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {isEnglish ? "Avg. Salary" : "አማካይ ደመወዝ"}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {isEnglish ? "% of Total" : "ከጠቅላላው %"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentBreakdown.map((dept, index) => (
                      <tr key={index} className="bg-card border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {isEnglish ? dept.name : translateToAmharic(dept.name)}
                        </th>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(dept.cost)}
                        </td>
                        <td className="px-6 py-4">{dept.employees}</td>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(dept.avgSalary)}
                        </td>
                        <td className="px-6 py-4">{((dept.cost / payrollSummary.totalPayroll) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/20 font-medium">
                      <th scope="row" className="px-6 py-4">
                        {isEnglish ? "Total" : "ጠቅላላ"}
                      </th>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                          style: "currency",
                          currency: "ETB",
                          maximumFractionDigits: 0,
                        }).format(payrollSummary.totalPayroll)}
                      </td>
                      <td className="px-6 py-4">{payrollSummary.employees}</td>
                      <td className="px-6 py-4">
                        {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                          style: "currency",
                          currency: "ETB",
                          maximumFractionDigits: 0,
                        }).format(payrollSummary.averageSalary)}
                      </td>
                      <td className="px-6 py-4">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Department Chart - In a real app, this would be a proper chart component */}
              <div className="h-[300px] w-full border rounded-md p-4 mt-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    {isEnglish ? "Department breakdown chart would appear here" : "የዲፓርትመንት ክፍፍል ቻርት እዚህ ይታያል"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEnglish ? "Payroll History" : "የደመወዝ ታሪክ"}</CardTitle>
              <CardDescription>
                {isEnglish ? "Historical payroll data and trends" : "የታሪክ የደመወዝ ዳታ እና አዝማሚያዎች"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">{isEnglish ? "From" : "ከ"}</p>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </div>
                  <div className="grid gap-2">
                    <p className="text-sm font-medium">{isEnglish ? "To" : "እስከ"}</p>
                    <DatePicker date={endDate} setDate={setEndDate} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <p className="text-sm font-medium">{isEnglish ? "View" : "እይታ"}</p>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={isEnglish ? "Select view" : "እይታ ይምረጡ"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">{isEnglish ? "Monthly" : "ወርሃዊ"}</SelectItem>
                      <SelectItem value="quarterly">{isEnglish ? "Quarterly" : "ሩብ ዓመታዊ"}</SelectItem>
                      <SelectItem value="yearly">{isEnglish ? "Yearly" : "ዓመታዊ"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* History Chart - In a real app, this would be a proper chart component */}
              <div className="h-[300px] w-full border rounded-md p-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    {isEnglish ? "Historical payroll chart would appear here" : "የታሪክ የደመወዝ ቻርት እዚህ ይታያል"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-4">
                  {isEnglish ? "Recent Payroll Periods" : "የቅርብ ጊዜ የደመወዝ ክፍለ ጊዜያት"}
                </h4>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          {isEnglish ? "Period" : "ክፍለ ጊዜ"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {isEnglish ? "Total" : "ጠቅላላ"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {isEnglish ? "Regular Hours" : "መደበኛ ሰዓታት"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {isEnglish ? "Overtime" : "ትርፍ ሰዓት"}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {isEnglish ? "Change" : "ለውጥ"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-card border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {isEnglish ? "April 2023" : "ሚያዝያ 2023"}
                        </th>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(287500)}
                        </td>
                        <td className="px-6 py-4">4,200</td>
                        <td className="px-6 py-4">320</td>
                        <td className="px-6 py-4 text-green-500">+3.2%</td>
                      </tr>
                      <tr className="bg-card border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {isEnglish ? "March 2023" : "መጋቢት 2023"}
                        </th>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(285000)}
                        </td>
                        <td className="px-6 py-4">4,150</td>
                        <td className="px-6 py-4">310</td>
                        <td className="px-6 py-4 text-green-500">+1.1%</td>
                      </tr>
                      <tr className="bg-card border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {isEnglish ? "February 2023" : "የካቲት 2023"}
                        </th>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(282000)}
                        </td>
                        <td className="px-6 py-4">4,100</td>
                        <td className="px-6 py-4">300</td>
                        <td className="px-6 py-4 text-green-500">+0.7%</td>
                      </tr>
                      <tr className="bg-card border-b">
                        <th scope="row" className="px-6 py-4 font-medium">
                          {isEnglish ? "January 2023" : "ጥር 2023"}
                        </th>
                        <td className="px-6 py-4">
                          {new Intl.NumberFormat(isEnglish ? "en-US" : "am-ET", {
                            style: "currency",
                            currency: "ETB",
                            maximumFractionDigits: 0,
                          }).format(280000)}
                        </td>
                        <td className="px-6 py-4">4,050</td>
                        <td className="px-6 py-4">290</td>
                        <td className="px-6 py-4 text-amber-500">0.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to translate common terms to Amharic
function translateToAmharic(text: string): string {
  const translations: Record<string, string> = {
    Production: "ምርት",
    Packaging: "ማሸግ",
    Maintenance: "ጥገና",
    "Quality Control": "የጥራት ቁጥጥር",
    "Regular Hours": "መደበኛ ሰዓታት",
    Overtime: "ትርፍ ሰዓት",
    Bonuses: "ጉርሻዎች",
    Benefits: "ጥቅማጥቅሞች",
    Other: "ሌሎች",
  }

  return translations[text] || text
}
