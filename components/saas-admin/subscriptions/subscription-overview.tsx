"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, AlertTriangle, CreditCard } from "lucide-react"
import {
  getActiveSubscriptionsCount,
  getTrialSubscriptionsCount,
  getExpiredSubscriptionsCount,
  getTotalRevenue,
  getSubscriptionsByPlan,
} from "@/lib/mock-data-subscriptions"
import type { Subscription } from "@/lib/types"

interface SubscriptionOverviewProps {
  subscriptions: Subscription[]
  timeframe: string
  onTimeframeChange: (value: string) => void
}

export function SubscriptionOverview({ subscriptions, timeframe, onTimeframeChange }: SubscriptionOverviewProps) {
  // Calculate metrics
  const totalSubscriptions = subscriptions.length
  const activeSubscriptions = getActiveSubscriptionsCount()
  const trialSubscriptions = getTrialSubscriptionsCount()
  const expiredSubscriptions = getExpiredSubscriptionsCount()
  const totalRevenue = getTotalRevenue()

  // Calculate percentages
  const activePercentage = Math.round((activeSubscriptions / totalSubscriptions) * 100)
  const trialPercentage = Math.round((trialSubscriptions / totalSubscriptions) * 100)
  const expiredPercentage = Math.round((expiredSubscriptions / totalSubscriptions) * 100)

  // Get subscription counts by plan
  const basicCount = getSubscriptionsByPlan("basic").length
  const standardCount = getSubscriptionsByPlan("standard").length
  const premiumCount = getSubscriptionsByPlan("premium").length
  const customCount = getSubscriptionsByPlan("custom").length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Subscription Overview</h2>
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
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Across all subscription plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{activePercentage}% of total subscriptions</span>
              <div className="h-2 w-16 rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-green-600" style={{ width: `${activePercentage}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Subscriptions</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trialSubscriptions}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{trialPercentage}% of total subscriptions</span>
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
            <div className="text-2xl font-bold">{expiredSubscriptions}</div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-1">{expiredPercentage}% of total subscriptions</span>
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
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Total revenue from active subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <div className="text-3xl font-bold">ETB {totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total subscription revenue</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Revenue by Billing Cycle</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-purple-50 p-2">
                  <div className="text-xs text-purple-600 font-medium">Monthly</div>
                  <div className="text-lg font-bold">ETB 12,000</div>
                </div>
                <div className="rounded-md bg-purple-50 p-2">
                  <div className="text-xs text-purple-600 font-medium">Semi-Annual</div>
                  <div className="text-lg font-bold">ETB 72,000</div>
                </div>
                <div className="rounded-md bg-purple-50 p-2">
                  <div className="text-xs text-purple-600 font-medium">Annual</div>
                  <div className="text-lg font-bold">ETB 235,000</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Subscriptions by plan type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-300 mr-2" />
                  <span className="text-sm">Basic</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{basicCount}</span>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-300"
                      style={{ width: `${(basicCount / totalSubscriptions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                  <span className="text-sm">Standard</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{standardCount}</span>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: `${(standardCount / totalSubscriptions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-700 mr-2" />
                  <span className="text-sm">Premium</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{premiumCount}</span>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-700"
                      style={{ width: `${(premiumCount / totalSubscriptions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-900 mr-2" />
                  <span className="text-sm">Custom</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{customCount}</span>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-900"
                      style={{ width: `${(customCount / totalSubscriptions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
