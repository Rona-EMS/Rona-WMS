"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { DatePickerWithRange } from "./date-range-picker"
import type { DateRange } from "react-day-picker"
import { useToast } from "@/components/ui/use-toast"

interface FinancialOverviewProps {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

export function FinancialOverview({ date, setDate }: FinancialOverviewProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [financialData, setFinancialData] = useState({
    totalRevenue: 45231.89,
    totalExpenses: 12234.5,
    netProfit: 32997.39,
    profitMargin: 72.9,
    revenueChange: 20.1,
    expensesChange: 4.3,
    profitChange: 28.5,
    marginChange: 5.4,
  })

  // Update financial data when date range changes
  useEffect(() => {
    if (date?.from && date?.to) {
      setIsLoading(true)

      // Simulate API call to fetch financial data for the selected date range
      setTimeout(() => {
        // Generate slightly different numbers based on the date range
        const daysDiff = Math.floor((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
        const multiplier = daysDiff / 30 // Normalize to a month

        const newRevenue = 45000 + Math.random() * 5000 * multiplier
        const newExpenses = 12000 + Math.random() * 1000 * multiplier
        const newProfit = newRevenue - newExpenses
        const newMargin = (newProfit / newRevenue) * 100

        setFinancialData({
          totalRevenue: Number.parseFloat(newRevenue.toFixed(2)),
          totalExpenses: Number.parseFloat(newExpenses.toFixed(2)),
          netProfit: Number.parseFloat(newProfit.toFixed(2)),
          profitMargin: Number.parseFloat(newMargin.toFixed(1)),
          revenueChange: Number.parseFloat((15 + Math.random() * 10).toFixed(1)),
          expensesChange: Number.parseFloat((2 + Math.random() * 5).toFixed(1)),
          profitChange: Number.parseFloat((20 + Math.random() * 15).toFixed(1)),
          marginChange: Number.parseFloat((3 + Math.random() * 5).toFixed(1)),
        })

        setIsLoading(false)
      }, 800)
    }
  }, [date])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Financial Overview</h2>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className={`border border-gray-200 shadow-sm ${isLoading ? "opacity-60" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${financialData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{financialData.revenueChange}% from last month
            </p>
            <div className="mt-4 h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-1.5 rounded-full"
                style={{ width: `${Math.min(financialData.revenueChange * 3, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`border border-gray-200 shadow-sm ${isLoading ? "opacity-60" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Expenses</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${financialData.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{financialData.expensesChange}% from last month
            </p>
            <div className="mt-4 h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
              <div
                className="bg-red-600 h-1.5 rounded-full"
                style={{ width: `${Math.min(financialData.expensesChange * 7, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`border border-gray-200 shadow-sm ${isLoading ? "opacity-60" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Net Profit</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${financialData.netProfit.toLocaleString()}</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{financialData.profitChange}% from last month
            </p>
            <div className="mt-4 h-1.5 w-full bg-green-100 rounded-full overflow-hidden">
              <div
                className="bg-green-600 h-1.5 rounded-full"
                style={{ width: `${Math.min(financialData.profitChange * 2, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className={`border border-gray-200 shadow-sm ${isLoading ? "opacity-60" : ""}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Profit Margin</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{financialData.profitMargin}%</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{financialData.marginChange}% from last month
            </p>
            <div className="mt-4 h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${financialData.profitMargin}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
