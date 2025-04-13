"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { Download, FileText, Calendar, Filter, BarChart3, PieChart, LineChart, Printer, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProfitLossPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("monthly")
  const [timeRange, setTimeRange] = useState("month")
  const [currency, setCurrency] = useState("ETB")
  const [year, setYear] = useState("2023")

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExport = (format: string) => {
    toast({
      title: language === "en" ? `Exporting as ${format}` : `እንደ ${format} በመላክ ላይ`,
      description:
        language === "en"
          ? "Your profit & loss report is being prepared for download."
          : "የትርፍ እና ኪሳራ ሪፖርትዎ ለማውረድ በመዘጋጀት ላይ ነው።",
    })
  }

  const handlePrint = () => {
    toast({
      title: language === "en" ? "Printing Report" : "ሪፖርት በማተም ላይ",
      description:
        language === "en" ? "Sending profit & loss report to printer..." : "የትርፍ እና ኪሳራ ሪፖርት ወደ ማተሚያ በመላክ ላይ...",
    })
  }

  const handleShare = () => {
    toast({
      title: language === "en" ? "Share Report" : "ሪፖርት አጋራ",
      description:
        language === "en"
          ? "Preparing shareable link for the profit & loss report..."
          : "ለትርፍ እና ኪሳራ ሪፖርት ሊጋራ የሚችል ሊንክ በማዘጋጀት ላይ...",
    })
  }

  // Sample monthly data
  const monthlyData = {
    revenue: {
      Jan: 980000,
      Feb: 1050000,
      Mar: 1250000,
      Apr: 1180000,
      May: 1320000,
      Jun: 1420000,
      Jul: 1380000,
      Aug: 1450000,
      Sep: 1520000,
      Oct: 1480000,
      Nov: 1550000,
      Dec: 1680000,
    },
    expenses: {
      Jan: 720000,
      Feb: 750000,
      Mar: 850000,
      Apr: 820000,
      May: 880000,
      Jun: 920000,
      Jul: 900000,
      Aug: 950000,
      Sep: 980000,
      Oct: 960000,
      Nov: 1020000,
      Dec: 1100000,
    },
    profit: {
      Jan: 260000,
      Feb: 300000,
      Mar: 400000,
      Apr: 360000,
      May: 440000,
      Jun: 500000,
      Jul: 480000,
      Aug: 500000,
      Sep: 540000,
      Oct: 520000,
      Nov: 530000,
      Dec: 580000,
    },
  }

  // Sample quarterly data
  const quarterlyData = {
    revenue: { Q1: 3280000, Q2: 3920000, Q3: 4350000, Q4: 4710000 },
    expenses: { Q1: 2320000, Q2: 2620000, Q3: 2830000, Q4: 3080000 },
    profit: { Q1: 960000, Q2: 1300000, Q3: 1520000, Q4: 1630000 },
  }

  // Sample yearly data
  const yearlyData = {
    revenue: { "2021": 12500000, "2022": 14200000, "2023": 16260000 },
    expenses: { "2021": 8750000, "2022": 9650000, "2023": 10850000 },
    profit: { "2021": 3750000, "2022": 4550000, "2023": 5410000 },
  }

  return (
    <DashboardShell
      title={language === "en" ? "Profit & Loss Statement" : "የትርፍ እና ኪሳራ መግለጫ"}
      description={language === "en" ? "Analyze your factory's financial performance" : "የፋብሪካዎን የፋይናንስ አፈጻጸም ይተንትኑ"}
      headerAction={
        <div className="flex items-center gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={language === "en" ? "Currency" : "ገንዘብ"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETB">ETB</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={language === "en" ? "Year" : "ዓመት"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="w-full">
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {language === "en" ? "Monthly" : "ወርሃዊ"}
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                {language === "en" ? "Quarterly" : "ሩብ ዓመታዊ"}
              </TabsTrigger>
              <TabsTrigger value="yearly" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                {language === "en" ? "Yearly" : "ዓመታዊ"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Total Revenue" : "ጠቅላላ ገቢ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(monthlyData.revenue["Mar"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(monthlyData.revenue["Mar"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(monthlyData.revenue["Mar"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(monthlyData.revenue["Mar"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 19%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Total Expenses" : "ጠቅላላ ወጪዎች"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(monthlyData.expenses["Mar"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(monthlyData.expenses["Mar"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(monthlyData.expenses["Mar"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(monthlyData.expenses["Mar"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-red-500">↑ 13%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Net Profit" : "ተጣራ ትርፍ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      {currency === "ETB"
                        ? `ETB ${(monthlyData.profit["Mar"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(monthlyData.profit["Mar"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(monthlyData.profit["Mar"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(monthlyData.profit["Mar"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 33%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <CardTitle>{language === "en" ? "Monthly Profit & Loss" : "ወርሃዊ ትርፍ እና ኪሳራ"}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {language === "en" ? "Monthly breakdown for 2023" : "ለ2023 ወርሃዊ ትንተና"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2">
                    {Object.keys(monthlyData.revenue).map((month, i) => {
                      const revenue = monthlyData.revenue[month]
                      const expenses = monthlyData.expenses[month]
                      const profit = monthlyData.profit[month]
                      const maxValue = 2000000 // Maximum value for scaling

                      return (
                        <div key={i} className="flex flex-col items-center group relative">
                          <div className="absolute bottom-[100%] left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {month}:{" "}
                            {currency === "ETB"
                              ? `ETB ${profit.toLocaleString()}`
                              : currency === "USD"
                                ? `USD ${Math.round(profit / 33.33).toLocaleString()}`
                                : currency === "EUR"
                                  ? `EUR ${Math.round(profit / 36).toLocaleString()}`
                                  : `GBP ${Math.round(profit / 38.46).toLocaleString()}`}
                          </div>
                          <div className="relative w-full max-w-[40px] flex flex-col items-center">
                            <div
                              className="w-8 bg-green-500 rounded-t"
                              style={{ height: `${(profit / maxValue) * 250}px` }}
                            ></div>
                            <div
                              className="w-8 bg-red-500 rounded-t"
                              style={{ height: `${(expenses / maxValue) * 250}px` }}
                            ></div>
                            <span className="mt-2 text-xs text-muted-foreground">{month}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-center mt-4 gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">{language === "en" ? "Profit" : "ትርፍ"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm">{language === "en" ? "Expenses" : "ወጪዎች"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <CardTitle>{language === "en" ? "Profit & Loss Statement" : "የትርፍ እና ኪሳራ መግለጫ"}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {language === "en" ? "Detailed monthly statement for March 2023" : "ለማርች 2023 ዝርዝር ወርሃዊ መግለጫ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{language === "en" ? "Revenue" : "ገቢ"}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Product Sales" : "የምርት ሽያጭ"}
                          </span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 1,150,000"
                              : currency === "USD"
                                ? "USD 34,500"
                                : currency === "EUR"
                                  ? "EUR 32,000"
                                  : "GBP 29,900"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Service Revenue" : "የአገልግሎት ገቢ"}
                          </span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 100,000"
                              : currency === "USD"
                                ? "USD 3,000"
                                : currency === "EUR"
                                  ? "EUR 2,800"
                                  : "GBP 2,600"}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>{language === "en" ? "Total Revenue" : "ጠቅላላ ገቢ"}</span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 1,250,000"
                              : currency === "USD"
                                ? "USD 37,500"
                                : currency === "EUR"
                                  ? "EUR 34,800"
                                  : "GBP 32,500"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">{language === "en" ? "Expenses" : "ወጪዎች"}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Raw Materials" : "ጥሬ ዕቃዎች"}
                          </span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 450,000"
                              : currency === "USD"
                                ? "USD 13,500"
                                : currency === "EUR"
                                  ? "EUR 12,500"
                                  : "GBP 11,700"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{language === "en" ? "Labor" : "የሰራተኛ ወጪ"}</span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 250,000"
                              : currency === "USD"
                                ? "USD 7,500"
                                : currency === "EUR"
                                  ? "EUR 6,960"
                                  : "GBP 6,500"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{language === "en" ? "Utilities" : "አገልግሎቶች"}</span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 75,000"
                              : currency === "USD"
                                ? "USD 2,250"
                                : currency === "EUR"
                                  ? "EUR 2,088"
                                  : "GBP 1,950"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{language === "en" ? "Rent" : "ኪራይ"}</span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 50,000"
                              : currency === "USD"
                                ? "USD 1,500"
                                : currency === "EUR"
                                  ? "EUR 1,392"
                                  : "GBP 1,300"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === "en" ? "Other Expenses" : "ሌሎች ወጪዎች"}
                          </span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 25,000"
                              : currency === "USD"
                                ? "USD 750"
                                : currency === "EUR"
                                  ? "EUR 696"
                                  : "GBP 650"}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>{language === "en" ? "Total Expenses" : "ጠቅላላ ወጪዎች"}</span>
                          <span>
                            {currency === "ETB"
                              ? "ETB 850,000"
                              : currency === "USD"
                                ? "USD 25,500"
                                : currency === "EUR"
                                  ? "EUR 23,636"
                                  : "GBP 22,100"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-green-500">{language === "en" ? "Net Profit" : "ተጣራ ትርፍ"}</span>
                        <span className="text-green-500">
                          {currency === "ETB"
                            ? "ETB 400,000"
                            : currency === "USD"
                              ? "USD 12,000"
                              : currency === "EUR"
                                ? "EUR 11,164"
                                : "GBP 10,400"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{language === "en" ? "Profit Margin" : "የትርፍ ልክ"}</span>
                        <span>32%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quarterly" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Q1 Revenue" : "የመጀመሪያ ሩብ ዓመት ገቢ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(quarterlyData.revenue["Q1"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(quarterlyData.revenue["Q1"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(quarterlyData.revenue["Q1"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(quarterlyData.revenue["Q1"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 15%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Q1 Expenses" : "የመጀመሪያ ሩብ ዓመት ወጪዎች"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(quarterlyData.expenses["Q1"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(quarterlyData.expenses["Q1"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(quarterlyData.expenses["Q1"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(quarterlyData.expenses["Q1"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-red-500">↑ 10%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "Q1 Profit" : "የመጀመሪያ ሩብ ዓመት ትርፍ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      {currency === "ETB"
                        ? `ETB ${(quarterlyData.profit["Q1"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(quarterlyData.profit["Q1"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(quarterlyData.profit["Q1"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(quarterlyData.profit["Q1"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 28%</span> {language === "en" ? "from last year" : "ካለፈው ዓመት"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <CardTitle>{language === "en" ? "Quarterly Profit & Loss" : "ሩብ ዓመታዊ ትርፍ እና ኪሳራ"}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {language === "en" ? "Quarterly breakdown for 2023" : "ለ2023 ሩብ ዓመታዊ ትንተና"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "en" ? "Quarter" : "ሩብ ዓመት"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Revenue" : "ገቢ"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Expenses" : "ወጪዎች"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Profit" : "ትርፍ"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Margin" : "ልክ"}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(quarterlyData.revenue).map((quarter, i) => {
                        const revenue = quarterlyData.revenue[quarter]
                        const expenses = quarterlyData.expenses[quarter]
                        const profit = quarterlyData.profit[quarter]
                        const margin = Math.round((profit / revenue) * 100)

                        return (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{quarter}</TableCell>
                            <TableCell className="text-right">
                              {currency === "ETB"
                                ? `ETB ${revenue.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(revenue / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(revenue / 36).toLocaleString()}`
                                    : `GBP ${Math.round(revenue / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right">
                              {currency === "ETB"
                                ? `ETB ${expenses.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(expenses / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(expenses / 36).toLocaleString()}`
                                    : `GBP ${Math.round(expenses / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right text-green-500 font-medium">
                              {currency === "ETB"
                                ? `ETB ${profit.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(profit / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(profit / 36).toLocaleString()}`
                                    : `GBP ${Math.round(profit / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right">{margin}%</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "2023 Revenue" : "የ2023 ገቢ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(yearlyData.revenue["2023"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(yearlyData.revenue["2023"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(yearlyData.revenue["2023"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(yearlyData.revenue["2023"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 14.5%</span> {language === "en" ? "from 2022" : "ከ2022"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "2023 Expenses" : "የ2023 ወጪዎች"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currency === "ETB"
                        ? `ETB ${(yearlyData.expenses["2023"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(yearlyData.expenses["2023"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(yearlyData.expenses["2023"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(yearlyData.expenses["2023"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-red-500">↑ 12.4%</span> {language === "en" ? "from 2022" : "ከ2022"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {language === "en" ? "2023 Profit" : "የ2023 ትርፍ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                      {currency === "ETB"
                        ? `ETB ${(yearlyData.profit["2023"]).toLocaleString()}`
                        : currency === "USD"
                          ? `USD ${Math.round(yearlyData.profit["2023"] / 33.33).toLocaleString()}`
                          : currency === "EUR"
                            ? `EUR ${Math.round(yearlyData.profit["2023"] / 36).toLocaleString()}`
                            : `GBP ${Math.round(yearlyData.profit["2023"] / 38.46).toLocaleString()}`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-500">↑ 18.9%</span> {language === "en" ? "from 2022" : "ከ2022"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <CardTitle>{language === "en" ? "Yearly Profit & Loss" : "ዓመታዊ ትርፍ እና ኪሳራ"}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {language === "en" ? "Year-over-year comparison" : "ከዓመት ወደ ዓመት ንጽጽር"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-around gap-2">
                    {Object.keys(yearlyData.revenue).map((year, i) => {
                      const revenue = yearlyData.revenue[year]
                      const expenses = yearlyData.expenses[year]
                      const profit = yearlyData.profit[year]
                      const maxValue = 20000000 // Maximum value for scaling

                      return (
                        <div key={i} className="flex flex-col items-center group relative">
                          <div className="absolute bottom-[100%] left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {year}:{" "}
                            {currency === "ETB"
                              ? `ETB ${profit.toLocaleString()}`
                              : currency === "USD"
                                ? `USD ${Math.round(profit / 33.33).toLocaleString()}`
                                : currency === "EUR"
                                  ? `EUR ${Math.round(profit / 36).toLocaleString()}`
                                  : `GBP ${Math.round(profit / 38.46).toLocaleString()}`}
                          </div>
                          <div className="relative w-full max-w-[80px] flex flex-col items-center">
                            <div
                              className="w-16 bg-green-500 rounded-t"
                              style={{ height: `${(profit / maxValue) * 250}px` }}
                            ></div>
                            <div
                              className="w-16 bg-red-500 rounded-t"
                              style={{ height: `${(expenses / maxValue) * 250}px` }}
                            ></div>
                            <span className="mt-2 text-sm font-medium">{year}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-center mt-4 gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">{language === "en" ? "Profit" : "ትርፍ"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm">{language === "en" ? "Expenses" : "ወጪዎች"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <CardTitle>
                        {language === "en" ? "Annual Profit & Loss Statement" : "ዓመታዊ የትርፍ እና ኪሳራ መግለጫ"}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    {language === "en" ? "Detailed annual statement for 2023" : "ለ2023 ዝርዝር ዓመታዊ መግለጫ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === "en" ? "Year" : "ዓመት"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Revenue" : "ገቢ"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Expenses" : "ወጪዎች"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Profit" : "ትርፍ"}</TableHead>
                        <TableHead className="text-right">{language === "en" ? "Margin" : "ልክ"}</TableHead>
                        <TableHead className="text-right">
                          {language === "en" ? "YoY Growth" : "ከዓመት ወደ ዓመት እድገት"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.keys(yearlyData.revenue).map((year, i, arr) => {
                        const revenue = yearlyData.revenue[year]
                        const expenses = yearlyData.expenses[year]
                        const profit = yearlyData.profit[year]
                        const margin = Math.round((profit / revenue) * 100)

                        // Calculate YoY growth (not applicable for the first year in the array)
                        let yoyGrowth = null
                        if (i > 0) {
                          const prevProfit = yearlyData.profit[arr[i - 1]]
                          yoyGrowth = Math.round(((profit - prevProfit) / prevProfit) * 100)
                        }

                        return (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{year}</TableCell>
                            <TableCell className="text-right">
                              {currency === "ETB"
                                ? `ETB ${revenue.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(revenue / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(revenue / 36).toLocaleString()}`
                                    : `GBP ${Math.round(revenue / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right">
                              {currency === "ETB"
                                ? `ETB ${expenses.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(expenses / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(expenses / 36).toLocaleString()}`
                                    : `GBP ${Math.round(expenses / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right text-green-500 font-medium">
                              {currency === "ETB"
                                ? `ETB ${profit.toLocaleString()}`
                                : currency === "USD"
                                  ? `USD ${Math.round(profit / 33.33).toLocaleString()}`
                                  : currency === "EUR"
                                    ? `EUR ${Math.round(profit / 36).toLocaleString()}`
                                    : `GBP ${Math.round(profit / 38.46).toLocaleString()}`}
                            </TableCell>
                            <TableCell className="text-right">{margin}%</TableCell>
                            <TableCell className="text-right">
                              {yoyGrowth !== null ? (
                                <span className={yoyGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                                  {yoyGrowth >= 0 ? "+" : ""}
                                  {yoyGrowth}%
                                </span>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() => handleExport("PDF")}
          >
            <FileText className="h-4 w-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() => handleExport("Excel")}
          >
            <Download className="h-4 w-4" />
            Excel
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            {language === "en" ? "Print" : "አትም"}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            {language === "en" ? "Share" : "አጋራ"}
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
