"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/context/language-context"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function FactoryPerformance() {
  const [timeRange, setTimeRange] = useState("month")
  const { language, t } = useLanguage()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{language === "en" ? "Factory Performance" : "የፋብሪካ አፈጻጸም"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Key performance indicators and metrics" : "ቁልፍ የአፈጻጸም አመልካቾች እና መለኪያዎች"}
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === "en" ? "Select time range" : "የጊዜ ክልል ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">{language === "en" ? "This Week" : "ይህ ሳምንት"}</SelectItem>
                <SelectItem value="month">{language === "en" ? "This Month" : "ይህ ወር"}</SelectItem>
                <SelectItem value="quarter">{language === "en" ? "This Quarter" : "ይህ ሩብ ዓመት"}</SelectItem>
                <SelectItem value="year">{language === "en" ? "This Year" : "ይህ ዓመት"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="productivity" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              {language === "en" ? "Productivity" : "ምርታማነት"}
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center">
              <LineChart className="mr-2 h-4 w-4" />
              {language === "en" ? "Attendance" : "መገኘት"}
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              {language === "en" ? "Costs" : "ወጪዎች"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="productivity" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Production Output" : "የምርት ውጤት"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,450</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "+15% from last month" : "ካለፈው ወር +15%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Efficiency Rate" : "የብቃት መጠን"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "+3% from last month" : "ካለፈው ወር +3%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Quality Rate" : "የጥራት መጠን"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95.2%</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "-0.5% from last month" : "ካለፈው ወር -0.5%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {language === "en" ? "Productivity by Department" : "በክፍል የምርታማነት"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Productivity chart will be displayed here" : "የምርታማነት ቻርት እዚህ ይታያል"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Attendance Rate" : "የመገኘት መጠን"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "+2% from last month" : "ካለፈው ወር +2%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Late Arrivals" : "የዘገዩ መግቢያዎች"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5.8%</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "-1.2% from last month" : "ካለፈው ወር -1.2%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Absence Rate" : "የመቅረት መጠን"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "-0.5% from last month" : "ካለፈው ወር -0.5%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {language === "en" ? "Attendance Trends" : "የመገኘት አዝማሚያዎች"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Attendance chart will be displayed here" : "የመገኘት ቻርት እዚህ ይታያል"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Labor Costs" : "የሰራተኛ ወጪዎች"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">235,400 ETB</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "+5% from last month" : "ካለፈው ወር +5%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Overtime Costs" : "የትርፍ ሰዓት ወጪዎች"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28,500 ETB</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "-10% from last month" : "ካለፈው ወር -10%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {language === "en" ? "Cost per Unit" : "በአንድ ምርት ወጪ"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.5 ETB</div>
                  <p className="text-xs text-muted-foreground">
                    {language === "en" ? "-2.3% from last month" : "ካለፈው ወር -2.3%"}
                  </p>
                  <div className="mt-4 h-[80px] w-full rounded-lg bg-muted"></div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {language === "en" ? "Cost Breakdown" : "የወጪ ትንተና"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {language === "en" ? "Cost breakdown chart will be displayed here" : "የወጪ ትንተና ቻርት እዚህ ይታያል"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => {
              toast({
                title: language === "en" ? "Exporting data" : "ዳታ በመላክ ላይ",
                description: language === "en" ? "Preparing data for export..." : "ዳታ ለመላክ በማዘጋጀት ላይ...",
              })

              // Simulate export delay
              setTimeout(() => {
                toast({
                  title: language === "en" ? "Data exported" : "ዳታ ተልኳል",
                  description: language === "en" ? "Data has been exported successfully" : "ዳታ በተሳካ ሁኔታ ተልኳል",
                })
              }, 1500)
            }}
          >
            {language === "en" ? "Export Data" : "ዳታ ላክ"}
          </Button>
          <Button
            onClick={() => {
              toast({
                title: language === "en" ? "Generating report" : "ሪፖርት በማመንጨት ላይ",
                description: language === "en" ? "Preparing comprehensive report..." : "ሁሉን አቀፍ ሪፖርት በማዘጋጀት ላይ...",
              })

              // Simulate report generation delay
              setTimeout(() => {
                toast({
                  title: language === "en" ? "Report generated" : "ሪፖርት ተፈጥሯል",
                  description: language === "en" ? "Your report is ready to download" : "ሪፖርትዎ ለማውረድ ዝግጁ ነው",
                })
              }, 2000)
            }}
          >
            {language === "en" ? "Generate Report" : "ሪፖርት አመንጭ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
