"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import {
  Download,
  FileText,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  CreditCard,
  ArrowUpRight,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function FinancesPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("month")
  const [currency, setCurrency] = useState("ETB")

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExport = (format: string) => {
    toast({
      title: language === "en" ? `Exporting as ${format}` : `እንደ ${format} በመላክ ላይ`,
      description:
        language === "en"
          ? "Your financial report is being prepared for download."
          : "የፋይናንስ ሪፖርትዎ ለማውረድ በመዘጋጀት ላይ ነው።",
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Financial Overview" : "የፋይናንስ አጠቃላይ ዕይታ"}
      description={language === "en" ? "Monitor your factory's financial performance" : "የፋብሪካዎን የፋይናንስ አፈጻጸም ይቆጣጠሩ"}
      headerAction={
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === "en" ? "Select time range" : "የጊዜ ክልል ይምረጡ"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{language === "en" ? "This Week" : "ይህ ሳምንት"}</SelectItem>
              <SelectItem value="month">{language === "en" ? "This Month" : "ይህ ወር"}</SelectItem>
              <SelectItem value="quarter">{language === "en" ? "This Quarter" : "ይህ ሩብ ዓመት"}</SelectItem>
              <SelectItem value="year">{language === "en" ? "This Year" : "ይህ ዓመት"}</SelectItem>
              <SelectItem value="custom">{language === "en" ? "Custom Range" : "ብጁ ክልል"}</SelectItem>
            </SelectContent>
          </Select>
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
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {language === "en" ? "Overview" : "አጠቃላይ እይታ"}
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            {language === "en" ? "Revenue" : "ገቢ"}
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            {language === "en" ? "Expenses" : "ወጪዎች"}
          </TabsTrigger>
          <TabsTrigger value="profit-loss" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {language === "en" ? "Profit & Loss" : "ትርፍ እና ኪሳራ"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
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
                    ? "ETB 1,250,000"
                    : currency === "USD"
                      ? "USD 37,500"
                      : currency === "EUR"
                        ? "EUR 34,800"
                        : "GBP 32,500"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 12.5%</span>{" "}
                  {language === "en"
                    ? `from last ${timeRange}`
                    : `ካለፈው ${timeRange === "week" ? "ሳምንት" : timeRange === "month" ? "ወር" : timeRange === "quarter" ? "ሩብ ዓመት" : "ዓመት"}`}
                </p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Revenue chart" : "የገቢ ቻርት"}
                </div>
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
                    ? "ETB 850,000"
                    : currency === "USD"
                      ? "USD 25,500"
                      : currency === "EUR"
                        ? "EUR 23,600"
                        : "GBP 22,100"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">↑ 8.3%</span>{" "}
                  {language === "en"
                    ? `from last ${timeRange}`
                    : `ካለፈው ${timeRange === "week" ? "ሳምንት" : timeRange === "month" ? "ወር" : timeRange === "quarter" ? "ሩብ ዓመት" : "ዓመት"}`}
                </p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Expenses chart" : "የወጪዎች ቻርት"}
                </div>
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
                    ? "ETB 400,000"
                    : currency === "USD"
                      ? "USD 12,000"
                      : currency === "EUR"
                        ? "EUR 11,200"
                        : "GBP 10,400"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 22.1%</span>{" "}
                  {language === "en"
                    ? `from last ${timeRange}`
                    : `ካለፈው ${timeRange === "week" ? "ሳምንት" : timeRange === "month" ? "ወር" : timeRange === "quarter" ? "ሩብ ዓመት" : "ዓመት"}`}
                </p>
                <div className="mt-4 h-[80px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Profit chart" : "የትርፍ ቻርት"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Revenue Breakdown" : "የገቢ ትንተና"}</CardTitle>
                </div>
                <div className="flex gap-2">
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
                </div>
              </div>
              <CardDescription>{language === "en" ? "Analysis of revenue sources" : "የገቢ ምንጮች ትንተና"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product A" : "ምርት ሀ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 625,000"
                        : currency === "USD"
                          ? "USD 18,750"
                          : currency === "EUR"
                            ? "EUR 17,400"
                            : "GBP 16,250"}{" "}
                      (50%)
                    </span>
                  </div>
                  <Progress value={50} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "50%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product B" : "ምርት ለ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 375,000"
                        : currency === "USD"
                          ? "USD 11,250"
                          : currency === "EUR"
                            ? "EUR 10,440"
                            : "GBP 9,750"}{" "}
                      (30%)
                    </span>
                  </div>
                  <Progress value={30} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "30%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product C" : "ምርት ሐ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 250,000"
                        : currency === "USD"
                          ? "USD 7,500"
                          : currency === "EUR"
                            ? "EUR 6,960"
                            : "GBP 6,500"}{" "}
                      (20%)
                    </span>
                  </div>
                  <Progress value={20} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "20%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Quick Actions" : "ፈጣን እርምጃዎች"}</CardTitle>
                </div>
              </div>
              <CardDescription>
                {language === "en" ? "Frequently used financial actions" : "ብዙ ጊዜ የሚጠቀሙባቸው የፋይናንስ እርምጃዎች"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/owner/profit-loss" className="w-full">
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        {language === "en" ? "View Profit & Loss" : "ትርፍ እና ኪሳራ ይመልከቱ"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          {language === "en" ? "Detailed P&L statement" : "ዝርዝር የትርፍ እና ኪሳራ መግለጫ"}
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Card
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleExport("Excel")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      {language === "en" ? "Export Financial Data" : "የፋይናንስ ውሂብ ላክ"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {language === "en" ? "Download as Excel" : "እንደ Excel አውርድ"}
                      </div>
                      <Download className="h-4 w-4 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() =>
                    toast({
                      title: language === "en" ? "Payment Processing" : "የክፍያ ሂደት",
                      description: language === "en" ? "Opening payment processing form..." : "የክፍያ ሂደት ቅጽ በመክፈት ላይ...",
                    })
                  }
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{language === "en" ? "Process Payment" : "ክፍያ አስኪያጅ"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {language === "en" ? "Record new payment" : "አዲስ ክፍያ መዝግብ"}
                      </div>
                      <CreditCard className="h-4 w-4 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Revenue Trends" : "የገቢ አዝማሚያዎች"}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => handleExport("PDF")}
                >
                  <Download className="h-4 w-4" />
                  {language === "en" ? "Export" : "ላክ"}
                </Button>
              </div>
              <CardDescription>
                {language === "en" ? "Monthly revenue for the last 6 months" : "ላለፉት 6 ወራት ወርሃዊ ገቢ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {[750000, 820000, 950000, 1100000, 1180000, 1250000].map((value, i) => {
                  const month = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]
                  const percentage = (value / 1500000) * 100
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-full max-w-[40px] flex flex-col items-center">
                        <div className="w-8 bg-purple-500 rounded-t" style={{ height: `${percentage * 2}px` }}></div>
                        <span className="mt-2 text-xs text-muted-foreground">{month}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Revenue by Product" : "በምርት የተከፋፈለ ገቢ"}</CardTitle>
                </div>
              </div>
              <CardDescription>
                {language === "en" ? "Breakdown of revenue by product category" : "በምርት ምድብ የተከፋፈለ ገቢ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product A" : "ምርት ሀ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 625,000"
                        : currency === "USD"
                          ? "USD 18,750"
                          : currency === "EUR"
                            ? "EUR 17,400"
                            : "GBP 16,250"}{" "}
                      (50%)
                    </span>
                  </div>
                  <Progress value={50} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "50%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product B" : "ምርት ለ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 375,000"
                        : currency === "USD"
                          ? "USD 11,250"
                          : currency === "EUR"
                            ? "EUR 10,440"
                            : "GBP 9,750"}{" "}
                      (30%)
                    </span>
                  </div>
                  <Progress value={30} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "30%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Product C" : "ምርት ሐ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 250,000"
                        : currency === "USD"
                          ? "USD 7,500"
                          : currency === "EUR"
                            ? "EUR 6,960"
                            : "GBP 6,500"}{" "}
                      (20%)
                    </span>
                  </div>
                  <Progress value={20} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "20%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Expense Categories" : "የወጪ ምድቦች"}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => handleExport("PDF")}
                >
                  <Download className="h-4 w-4" />
                  {language === "en" ? "Export" : "ላክ"}
                </Button>
              </div>
              <CardDescription>{language === "en" ? "Breakdown of all expenses" : "የሁሉም ወጪዎች ትንተና"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Raw Materials" : "ጥሬ ዕቃዎች"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 450,000"
                        : currency === "USD"
                          ? "USD 13,500"
                          : currency === "EUR"
                            ? "EUR 12,500"
                            : "GBP 11,700"}{" "}
                      (53%)
                    </span>
                  </div>
                  <Progress value={53} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "53%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Labor" : "የሰራተኛ ወጪ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 250,000"
                        : currency === "USD"
                          ? "USD 7,500"
                          : currency === "EUR"
                            ? "EUR 6,960"
                            : "GBP 6,500"}{" "}
                      (29%)
                    </span>
                  </div>
                  <Progress value={29} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "29%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Utilities" : "አገልግሎቶች"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 75,000"
                        : currency === "USD"
                          ? "USD 2,250"
                          : currency === "EUR"
                            ? "EUR 2,088"
                            : "GBP 1,950"}{" "}
                      (9%)
                    </span>
                  </div>
                  <Progress value={9} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "9%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Rent" : "ኪራይ"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 50,000"
                        : currency === "USD"
                          ? "USD 1,500"
                          : currency === "EUR"
                            ? "EUR 1,392"
                            : "GBP 1,300"}{" "}
                      (6%)
                    </span>
                  </div>
                  <Progress value={6} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "6%" }} />
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === "en" ? "Other Expenses" : "ሌሎች ወጪዎች"}</span>
                    <span className="text-sm font-medium">
                      {currency === "ETB"
                        ? "ETB 25,000"
                        : currency === "USD"
                          ? "USD 750"
                          : currency === "EUR"
                            ? "EUR 696"
                            : "GBP 650"}{" "}
                      (3%)
                    </span>
                  </div>
                  <Progress value={3} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "3%" }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Expense Trends" : "የወጪ አዝማሚያዎች"}</CardTitle>
                </div>
              </div>
              <CardDescription>
                {language === "en" ? "Monthly expenses for the last 6 months" : "ላለፉት 6 ወራት ወርሃዊ ወጪዎች"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {[520000, 580000, 650000, 720000, 790000, 850000].map((value, i) => {
                  const month = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]
                  const percentage = (value / 1000000) * 100
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-full max-w-[40px] flex flex-col items-center">
                        <div className="w-8 bg-purple-500 rounded-t" style={{ height: `${percentage * 2}px` }}></div>
                        <span className="mt-2 text-xs text-muted-foreground">{month}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Profit & Loss Statement" : "የትርፍ እና ኪሳራ መግለጫ"}</CardTitle>
                </div>
                <div className="flex gap-2">
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
                </div>
              </div>
              <CardDescription>
                {language === "en"
                  ? `${timeRange === "month" ? "Monthly" : timeRange === "quarter" ? "Quarterly" : timeRange === "year" ? "Annual" : "Weekly"} profit and loss breakdown`
                  : `${timeRange === "month" ? "ወርሃዊ" : timeRange === "quarter" ? "ሩብ ዓመታዊ" : timeRange === "year" ? "ዓመታዊ" : "ሳምንታዊ"} የትርፍ እና ኪሳራ ትንተና`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{language === "en" ? "Revenue" : "ገቢ"}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Product Sales" : "የምርት ሽያጭ"}</span>
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
                      <span className="text-muted-foreground">{language === "en" ? "Raw Materials" : "ጥሬ ዕቃዎች"}</span>
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
                      <span className="text-muted-foreground">{language === "en" ? "Other Expenses" : "ሌሎች ወጪዎች"}</span>
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
      </Tabs>
    </DashboardShell>
  )
}
