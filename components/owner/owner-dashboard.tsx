"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Activity,
  AlertTriangle,
  BarChart4,
  ChevronUp,
  ChevronDown,
  CreditCard,
  DollarSign,
  Calendar,
  PieChart,
  Briefcase,
  Settings,
  Users,
  FileText,
} from "lucide-react"
import { DateTimeDisplay } from "@/components/date-time-display"
import { useLanguage } from "@/lib/context/language-context"
import Link from "next/link"

// Mock data
const dashboardStats = {
  totalWorkers: 238,
  presentToday: 213,
  productivity: 94,
  productivityTrend: 3.2,
  revenue: 1326500,
  revenueTrend: 5.8,
  expenses: 952000,
  expensesTrend: 2.1,
  profit: 374500,
  profitTrend: 7.6,
  emergencies: 3,
}

const productionData = [
  {
    id: "prod1",
    department: "Main Assembly",
    target: 1200,
    actual: 1185,
    efficiency: 98.8,
    trend: 2.1,
  },
  {
    id: "prod2",
    department: "Packaging",
    target: 1500,
    actual: 1470,
    efficiency: 98.0,
    trend: 1.5,
  },
  {
    id: "prod3",
    department: "Material Processing",
    target: 800,
    actual: 768,
    efficiency: 96.0,
    trend: -0.8,
  },
  {
    id: "prod4",
    department: "Quality Control",
    target: 2000,
    actual: 2015,
    efficiency: 100.8,
    trend: 3.5,
  },
]

export function OwnerDashboard() {
  const { language, t } = useLanguage()
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  const formattedCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "am-ET", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("dashboard.welcome")}</h2>
          <p className="text-muted-foreground">{t("owner.dashboardOverview")}</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePicker date={selectedDate} onSelect={setSelectedDate} />
          <DateTimeDisplay className="text-lg" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("owner.productivity")}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{dashboardStats.productivity}%</div>
                <div className="flex items-center mt-1">
                  {dashboardStats.productivityTrend > 0 ? (
                    <>
                      <ChevronUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">+{dashboardStats.productivityTrend}%</p>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-500">{dashboardStats.productivityTrend}%</p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground ml-1">{t("owner.vsLastMonth")}</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-sm font-bold">{dashboardStats.productivity}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("owner.revenue")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{formattedCurrency(dashboardStats.revenue)}</div>
                <div className="flex items-center mt-1">
                  {dashboardStats.revenueTrend > 0 ? (
                    <>
                      <ChevronUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">+{dashboardStats.revenueTrend}%</p>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-500">{dashboardStats.revenueTrend}%</p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground ml-1">{t("owner.vsLastMonth")}</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-md bg-blue-50 flex items-center justify-center">
                <BarChart4 className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("owner.expenses")}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{formattedCurrency(dashboardStats.expenses)}</div>
                <div className="flex items-center mt-1">
                  {dashboardStats.expensesTrend < 0 ? (
                    <>
                      <ChevronDown className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">{dashboardStats.expensesTrend}%</p>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="h-4 w-4 text-amber-500" />
                      <p className="text-xs text-amber-500">+{dashboardStats.expensesTrend}%</p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground ml-1">{t("owner.vsLastMonth")}</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-md bg-amber-50 flex items-center justify-center">
                <PieChart className="h-8 w-8 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("owner.profit")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{formattedCurrency(dashboardStats.profit)}</div>
                <div className="flex items-center mt-1">
                  {dashboardStats.profitTrend > 0 ? (
                    <>
                      <ChevronUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-500">+{dashboardStats.profitTrend}%</p>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-500">{dashboardStats.profitTrend}%</p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground ml-1">{t("owner.vsLastMonth")}</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-md bg-green-50 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Issues Alert */}
      {dashboardStats.emergencies > 0 && (
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                {t("owner.activeEmergencies")}
              </CardTitle>
              <Badge variant="destructive">{dashboardStats.emergencies}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-red-600">
              {t("owner.emergenciesRequireAttention", { count: dashboardStats.emergencies })}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/owner/emergency">
              <Button className="bg-red-600 hover:bg-red-700">{t("owner.reviewEmergencies")}</Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {/* Production Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{t("owner.productionOverview")}</CardTitle>
              <CardDescription>{t("owner.productionOverviewDesc")}</CardDescription>
            </div>
            <Link href="/owner/kpi">
              <Button variant="outline">{t("owner.viewAllKPI")}</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-3">{t("owner.department")}</th>
                  <th className="text-center font-medium py-3">{t("owner.target")}</th>
                  <th className="text-center font-medium py-3">{t("owner.actual")}</th>
                  <th className="text-center font-medium py-3">{t("owner.efficiency")}</th>
                  <th className="text-center font-medium py-3">{t("owner.trend")}</th>
                </tr>
              </thead>
              <tbody>
                {productionData.map((dept) => (
                  <tr key={dept.id} className="border-b">
                    <td className="py-3 font-medium">{dept.department}</td>
                    <td className="py-3 text-center">{dept.target.toLocaleString()}</td>
                    <td className="py-3 text-center">{dept.actual.toLocaleString()}</td>
                    <td className="py-3 text-center">
                      <div
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm ${
                          dept.efficiency >= 100
                            ? "bg-green-100 text-green-800"
                            : dept.efficiency >= 95
                              ? "bg-blue-100 text-blue-800"
                              : dept.efficiency >= 90
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dept.efficiency}%
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center">
                        {dept.trend > 0 ? (
                          <>
                            <ChevronUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">+{dept.trend}%</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 text-red-500" />
                            <span className="text-red-600">{dept.trend}%</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t("owner.quickActions")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/owner/finances">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-primary hover:bg-accent transition-colors">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">{t("owner.finances")}</span>
              <p className="text-sm text-muted-foreground">{t("owner.financesDesc")}</p>
            </div>
          </Link>

          <Link href="/owner/kpi">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-primary hover:bg-accent transition-colors">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart4 className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium">{t("owner.kpis")}</span>
              <p className="text-sm text-muted-foreground">{t("owner.kpisDesc")}</p>
            </div>
          </Link>

          <Link href="/owner/schedules">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-primary hover:bg-accent transition-colors">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium">{t("owner.scheduling")}</span>
              <p className="text-sm text-muted-foreground">{t("owner.schedulingDesc")}</p>
            </div>
          </Link>

          <Link href="/owner/settings">
            <div className="border rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-primary hover:bg-accent transition-colors">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Settings className="h-6 w-6 text-gray-600" />
              </div>
              <span className="font-medium">{t("owner.settings")}</span>
              <p className="text-sm text-muted-foreground">{t("owner.settingsDesc")}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Additional Data Tabs */}
      <Tabs defaultValue="workforce" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workforce">{t("owner.workforce")}</TabsTrigger>
          <TabsTrigger value="inventory">{t("owner.inventory")}</TabsTrigger>
          <TabsTrigger value="reports">{t("owner.reports")}</TabsTrigger>
        </TabsList>

        <TabsContent value="workforce">
          <Card>
            <CardHeader>
              <CardTitle>{t("owner.workforceOverview")}</CardTitle>
              <CardDescription>{t("owner.workforceDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">{t("owner.staffing")}</h4>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>{t("owner.totalWorkers")}</span>
                    <span className="font-medium">{dashboardStats.totalWorkers}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>{t("owner.presentToday")}</span>
                    <span className="font-medium">{dashboardStats.presentToday}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>{t("owner.attendanceRate")}</span>
                    <span className="font-medium">
                      {Math.round((dashboardStats.presentToday / dashboardStats.totalWorkers) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span>{t("owner.vacancies")}</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">{t("owner.departments")}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Production</span>
                      <span className="font-medium">120</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span>Packaging</span>
                      <span className="font-medium">65</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "27%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span>Quality Control</span>
                      <span className="font-medium">35</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span>Administration</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">{t("owner.shifts")}</h4>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="font-medium">{t("shifts.morning")}</span>
                        </div>
                        <Badge className="bg-blue-500">{t("shifts.active")}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        06:00 - 14:00 • {t("owner.assigned")}: 80
                      </div>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="font-medium">{t("shifts.afternoon")}</span>
                        </div>
                        <Badge variant="outline">{t("shifts.upcoming")}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        14:00 - 22:00 • {t("owner.assigned")}: 80
                      </div>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="font-medium">{t("shifts.night")}</span>
                        </div>
                        <Badge variant="outline">{t("shifts.upcoming")}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        22:00 - 06:00 • {t("owner.assigned")}: 78
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/owner/workforce">
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  {t("owner.manageWorkforce")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>{t("owner.inventoryOverview")}</CardTitle>
              <CardDescription>{t("owner.inventoryDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <Card className="flex-1 border-amber-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-amber-700">{t("owner.lowStock")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-600">8</div>
                      <p className="text-sm text-amber-600">{t("owner.itemsNeedRestock")}</p>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 border-red-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-red-700">{t("owner.outOfStock")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">2</div>
                      <p className="text-sm text-red-600">{t("owner.itemsUnavailable")}</p>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium text-green-700">
                        {t("owner.incomingDeliveries")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">5</div>
                      <p className="text-sm text-green-600">{t("owner.scheduledDeliveries")}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[200px] rounded-md border bg-muted/40 flex items-center justify-center">
                  <BarChart4 className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">{t("owner.inventoryChartPlaceholder")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/owner/inventory">
                <Button>
                  <Briefcase className="mr-2 h-4 w-4" />
                  {t("owner.manageInventory")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{t("owner.reportsOverview")}</CardTitle>
              <CardDescription>{t("owner.reportsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">{t("owner.recentReports")}</h4>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3 hover:border-primary hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.monthlyProductivity")}</h5>
                        <Badge variant="outline">{t("owner.april")} 2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.generateDate")}: May 01, 2025</p>
                    </div>

                    <div className="border rounded-md p-3 hover:border-primary hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.attendanceSummary")}</h5>
                        <Badge variant="outline">Q1 2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.generateDate")}: Apr 05, 2025</p>
                    </div>

                    <div className="border rounded-md p-3 hover:border-primary hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.financialStatement")}</h5>
                        <Badge variant="outline">Q1 2025</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.generateDate")}: Apr 02, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-lg">{t("owner.scheduledReports")}</h4>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.monthlyProductivity")}</h5>
                        <Badge className="bg-blue-500">{t("owner.monthly")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.nextGeneration")}: Jun 01, 2025</p>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.payrollSummary")}</h5>
                        <Badge className="bg-purple-500">{t("owner.weekly")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.nextGeneration")}: May 07, 2025</p>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{t("owner.inventoryStatus")}</h5>
                        <Badge className="bg-green-500">{t("owner.daily")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{t("owner.nextGeneration")}: May 03, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/owner/reports">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  {t("owner.manageReports")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
