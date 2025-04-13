"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, LineChart, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ReportsPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("financial")
  const [reportPeriod, setReportPeriod] = useState("monthly")

  const handleDownload = (reportType: string) => {
    toast({
      title: language === "en" ? "Downloading Report" : "ሪፖርት በማውረድ ላይ",
      description: language === "en" ? `${reportType} report is being downloaded` : `${reportType} ሪፖርት በማውረድ ላይ ነው`,
    })
  }

  const handleShare = (reportType: string) => {
    toast({
      title: language === "en" ? "Sharing Report" : "ሪፖርት በማጋራት ላይ",
      description:
        language === "en" ? `${reportType} report sharing options opened` : `${reportType} ሪፖርት የማጋራት አማራጮች ተከፍተዋል`,
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Reports" : "ሪፖርቶች"}
      description={language === "en" ? "Generate and manage factory reports" : "የፋብሪካ ሪፖርቶችን ያመንጩ እና ያስተዳድሩ"}
      headerAction={
        <div className="flex items-center gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === "en" ? "Select period" : "ጊዜ ይምረጡ"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">{language === "en" ? "Daily" : "ዕለታዊ"}</SelectItem>
              <SelectItem value="weekly">{language === "en" ? "Weekly" : "ሳምንታዊ"}</SelectItem>
              <SelectItem value="monthly">{language === "en" ? "Monthly" : "ወርሃዊ"}</SelectItem>
              <SelectItem value="quarterly">{language === "en" ? "Quarterly" : "ሩብ ዓመታዊ"}</SelectItem>
              <SelectItem value="yearly">{language === "en" ? "Yearly" : "ዓመታዊ"}</SelectItem>
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
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {language === "en" ? "Financial" : "ፋይናንስ"}
          </TabsTrigger>
          <TabsTrigger value="production" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            {language === "en" ? "Production" : "ምርት"}
          </TabsTrigger>
          <TabsTrigger value="workforce" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            {language === "en" ? "Workforce" : "የሰራተኞች ሃይል"}
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {language === "en" ? "Custom" : "ብጁ"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Revenue" : "ገቢ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 1,250,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 12%</span> {language === "en" ? "from last month" : "ካለፈው ወር"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Expenses" : "ወጪዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ETB 850,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500">↑ 5%</span> {language === "en" ? "from last month" : "ካለፈው ወር"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Profit" : "ትርፍ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">ETB 400,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">↑ 8%</span> {language === "en" ? "from last month" : "ካለፈው ወር"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Financial Reports" : "የፋይናንስ ሪፖርቶች"}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => handleDownload("All financial")}
                >
                  <Download className="h-4 w-4" />
                  {language === "en" ? "Download All" : "ሁሉንም አውርድ"}
                </Button>
              </div>
              <CardDescription>
                {language === "en" ? "Monthly financial reports for your factory" : "ወርሃዊ የፋይናንስ ሪፖርቶች ለፋብሪካዎ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Income Statement" : "የገቢ መግለጫ"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleShare("Income Statement")}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Income Statement")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Balance Sheet" : "የሂሳብ ሚዛን"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleShare("Balance Sheet")}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Balance Sheet")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Cash Flow Statement" : "የገንዘብ ፍሰት መግለጫ"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleShare("Cash Flow Statement")}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Cash Flow Statement")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Expense Breakdown" : "የወጪ ትንተና"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleShare("Expense Breakdown")}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Expense Breakdown")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Production Reports" : "የምርት ሪፖርቶች"}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => handleDownload("All production")}
                >
                  <Download className="h-4 w-4" />
                  {language === "en" ? "Download All" : "ሁሉንም አውርድ"}
                </Button>
              </div>
              <CardDescription>
                {language === "en" ? "Monthly production reports for your factory" : "ወርሃዊ የምርት ሪፖርቶች ለፋብሪካዎ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Production Output" : "የምርት ውጤት"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {language === "en" ? "28,500 units" : "28,500 ዩኒቶች"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Production Output")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Quality Control" : "የጥራት ቁጥጥር"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {language === "en" ? "98% pass rate" : "98% የማለፊያ ደረጃ"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Quality Control")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Machine Efficiency" : "የማሽን ውጤታማነት"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {language === "en" ? "97% uptime" : "97% የስራ ጊዜ"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Machine Efficiency")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workforce" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Workforce Reports" : "የሰራተኞች ሪፖርቶች"}</CardTitle>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                  onClick={() => handleDownload("All workforce")}
                >
                  <Download className="h-4 w-4" />
                  {language === "en" ? "Download All" : "ሁሉንም አውርድ"}
                </Button>
              </div>
              <CardDescription>
                {language === "en" ? "Monthly workforce reports for your factory" : "ወርሃዊ የሰራተኞች ሪፖርቶች ለፋብሪካዎ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Attendance Summary" : "የመገኘት ማጠቃለያ"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {language === "en" ? "82% attendance" : "82% መገኘት"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Attendance Summary")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Productivity Analysis" : "የምርታማነት ትንተና"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                      {language === "en" ? "94% efficiency" : "94% ውጤታማነት"}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Productivity Analysis")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{language === "en" ? "Payroll Summary" : "የደመወዝ ማጠቃለያ"}</h3>
                      <p className="text-sm text-muted-foreground">March 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{language === "en" ? "ETB 450,000" : "ETB 450,000"}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload("Payroll Summary")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <CardTitle>{language === "en" ? "Custom Reports" : "ብጁ ሪፖርቶች"}</CardTitle>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  {language === "en" ? "Create New Report" : "አዲስ ሪፖርት ፍጠር"}
                </Button>
              </div>
              <CardDescription>
                {language === "en"
                  ? "Create and manage custom reports for your factory"
                  : "ለፋብሪካዎ ብጁ ሪፖርቶችን ይፍጠሩ እና ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {language === "en" ? "No custom reports yet" : "እስካሁን ምንም ብጁ ሪፖርቶች የሉም"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  {language === "en"
                    ? "Create custom reports to track specific metrics and KPIs that matter to your business"
                    : "ለንግድዎ አስፈላጊ የሆኑ ልዩ መለኪያዎችን እና KPI ዎችን ለመከታተል ብጁ ሪፖርቶችን ይፍጠሩ"}
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  {language === "en" ? "Create First Report" : "የመጀመሪያ ሪፖርት ፍጠር"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
