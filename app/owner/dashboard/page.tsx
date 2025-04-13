"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/context/language-context"
import { DashboardShell } from "@/components/dashboard-shell"

export default function OwnerDashboardPage() {
  const { language } = useLanguage()

  // Ensure page starts at the top when navigating
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <DashboardShell
      title={language === "en" ? "Owner Dashboard" : "የባለቤት ዳሽቦርድ"}
      description={
        language === "en"
          ? "Monitor your factory performance and financial health"
          : "የፋብሪካዎን አፈጻጸም እና የፋይናንስ ጤንነት ይቆጣጠሩ"
      }
      headerAction={
        <Button size="sm" variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
          <Download className="h-4 w-4 mr-2" />
          {language === "en" ? "Export" : "ላክ"}
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === "en" ? "Financial Overview" : "የፋይናንስ አጠቃላይ ዕይታ"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Revenue" : "ገቢ"}</span>
              <span className="font-bold">ETB 1,250,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Expenses" : "ወጪዎች"}</span>
              <span className="font-bold">ETB 850,000</span>
            </div>
            <div className="flex items-center justify-between text-green-500">
              <span>{language === "en" ? "Profit" : "ትርፍ"}</span>
              <span className="font-bold">ETB 400,000</span>
            </div>
            <div className="pt-2">
              <Link href="/owner/finances">
                <Button variant="link" className="text-purple-500 p-0 h-auto">
                  {language === "en" ? "View detailed report" : "ዝርዝር ሪፖርት ይመልከቱ"}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === "en" ? "Workforce" : "የሰራተኞች ሃይል"}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {language === "en" ? "Employee statistics" : "የሰራተኞች ስታቲስቲክስ"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Total" : "ጠቅላላ"}</span>
              <span className="font-bold">120</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Attendance" : "መገኘት"}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">82%</span>
                <Progress value={82} className="h-2 w-20">
                  <div className="h-full bg-green-500" style={{ width: "82%" }} />
                </Progress>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Turnover" : "ፍሰት"}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">3%</span>
                <Progress value={3} className="h-2 w-20">
                  <div className="h-full bg-green-500" style={{ width: "3%" }} />
                </Progress>
              </div>
            </div>
            <div className="pt-2">
              <Link href="/owner/workers">
                <Button variant="link" className="text-purple-500 p-0 h-auto">
                  {language === "en" ? "Manage workforce" : "የሰራተኞችን ሃይል ያስተዳድሩ"}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === "en" ? "Production" : "ምርት"}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {language === "en" ? "Monthly production" : "ወርሃዊ ምርት"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">28,500 units</div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{language === "en" ? "Target" : "ዒላማ"}</span>
              <span>30,000 units</span>
            </div>
            <Progress value={95} className="h-2">
              <div className="h-full bg-green-500" style={{ width: "95%" }} />
            </Progress>
            <div className="text-xs text-muted-foreground text-right">
              {language === "en" ? "95% of target" : "ከዒላማው 95%"}
            </div>
            <div className="pt-2">
              <Link href="/owner/kpi">
                <Button variant="link" className="text-purple-500 p-0 h-auto">
                  {language === "en" ? "View KPI dashboard" : "የKPI ዳሽቦርድ ይመልከቱ"}
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-1 md:col-span-2 xl:col-span-3">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Quality" : "ጥራት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">98%</div>
              <Progress value={98} className="h-2 mt-3">
                <div className="h-full bg-green-500" style={{ width: "98%" }} />
              </Progress>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Downtime" : "የማሽን መቆም ጊዜ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">3%</div>
              <Progress value={3} className="h-2 mt-3">
                <div className="h-full bg-yellow-500" style={{ width: "3%" }} />
              </Progress>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Safety" : "ደህንነት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">100%</div>
              <Progress value={100} className="h-2 mt-3">
                <div className="h-full bg-green-500" style={{ width: "100%" }} />
              </Progress>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full col-span-1 md:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>{language === "en" ? "Production Trends" : "የምርት አዝማሚያዎች"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Monthly production units for the last 6 months" : "ላለፉት 6 ወራት ወርሃዊ የምርት ክፍሎች"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {[18500, 22000, 24700, 26300, 27800, 28500].map((value, i) => {
                const month = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]
                const percentage = (value / 30000) * 100
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

        <Card className="w-full col-span-1 md:col-span-2 xl:col-span-3">
          <CardHeader>
            <CardTitle>{language === "en" ? "Quick Actions" : "ፈጣን እርምጃዎች"}</CardTitle>
            <CardDescription>{language === "en" ? "Frequently used actions" : "ብዙ ጊዜ የሚጠቀሙባቸው እርምጃዎች"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/owner/emergency">
              <button className="w-full p-3 text-left transition-colors rounded-md hover:bg-accent flex items-center justify-between">
                <span className="font-medium">{language === "en" ? "Emergency Reports" : "የአደጋ ሪፖርቶች"}</span>
                <Badge className="bg-purple-500 hover:bg-purple-600">{language === "en" ? "New" : "አዲስ"}</Badge>
              </button>
            </Link>
            <Link href="/owner/software-problem">
              <button className="w-full p-3 text-left transition-colors rounded-md hover:bg-accent flex items-center justify-between">
                <span className="font-medium">{language === "en" ? "Report Issue" : "ችግር ሪፖርት አድርግ"}</span>
              </button>
            </Link>
            <Link href="/owner/reports">
              <button className="w-full p-3 text-left transition-colors rounded-md hover:bg-accent flex items-center justify-between">
                <span className="font-medium">{language === "en" ? "View Reports" : "ሪፖርቶችን ይመልከቱ"}</span>
              </button>
            </Link>
            <Link href="/owner/inventory">
              <button className="w-full p-3 text-left transition-colors rounded-md hover:bg-accent flex items-center justify-between">
                <span className="font-medium">{language === "en" ? "Manage Inventory" : "ዕቃዎችን ያስተዳድሩ"}</span>
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
