"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import {
  getActiveFactoriesCount,
  getTrialFactoriesCount,
  getExpiredFactoriesCount,
  getTotalWorkersCount,
  getTotalActiveWorkersCount,
  getUniqueIndustries,
  getUniqueLocations,
} from "@/lib/mock-data-factories"
import type { Factory } from "@/lib/types"

interface FactoryOverviewProps {
  factories: Factory[]
  timeframe: string
  onTimeframeChange: (value: string) => void
}

export function FactoryOverview({ factories, timeframe, onTimeframeChange }: FactoryOverviewProps) {
  // Calculate metrics
  const totalFactories = factories.length
  const activeFactories = getActiveFactoriesCount()
  const trialFactories = getTrialFactoriesCount()
  const expiredFactories = getExpiredFactoriesCount()
  const totalWorkers = getTotalWorkersCount()
  const activeWorkers = getTotalActiveWorkersCount()
  const industries = getUniqueIndustries().length
  const locations = getUniqueLocations().length

  // Calculate percentages
  const activePercentage = Math.round((activeFactories / totalFactories) * 100)
  const trialPercentage = Math.round((trialFactories / totalFactories) * 100)
  const expiredPercentage = Math.round((expiredFactories / totalFactories) * 100)
  const workerUtilizationRate = Math.round((activeWorkers / totalWorkers) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Factory Overview</h2>
        <Tabs value={timeframe} onValueChange={onTimeframeChange} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Factories</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFactories}</div>
            <p className="text-xs text-muted-foreground">
              Across {industries} industries in {locations} locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Factories</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFactories}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{activePercentage}% of total factories</span>
              <div className="h-2 w-16 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-green-600" style={{ width: `${activePercentage}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Factories</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trialFactories}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{trialPercentage}% of total factories</span>
              <div className="h-2 w-16 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${trialPercentage}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired/Suspended</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredFactories}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{expiredPercentage}% of total factories</span>
              <div className="h-2 w-16 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-red-600" style={{ width: `${expiredPercentage}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Worker Statistics</CardTitle>
            <CardDescription>Total workers across all factories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{totalWorkers}</div>
                <div className="text-sm text-muted-foreground">Total registered workers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{activeWorkers}</div>
                <div className="text-sm text-muted-foreground">Active workers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{workerUtilizationRate}%</div>
                <div className="text-sm text-muted-foreground">Utilization rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Distribution</CardTitle>
            <CardDescription>Factories by industry type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getUniqueIndustries().map((industry) => {
                const count = factories.filter((f) => f.industry === industry).length
                const percentage = Math.round((count / totalFactories) * 100)
                return (
                  <div key={industry} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: getIndustryColor(industry),
                        }}
                      />
                      <span className="text-sm">{industry}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{count}</span>
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: getIndustryColor(industry),
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper function to get a color for each industry
function getIndustryColor(industry: string): string {
  const colorMap: Record<string, string> = {
    Textile: "#8b5cf6",
    Garment: "#ec4899",
    Leather: "#a16207",
    "Food Processing": "#22c55e",
    Construction: "#f97316",
    Metal: "#64748b",
    Agriculture: "#15803d",
    Pharmaceutical: "#0ea5e9",
    Furniture: "#b45309",
    Beverage: "#7c3aed",
  }

  return colorMap[industry] || "#6b7280"
}
