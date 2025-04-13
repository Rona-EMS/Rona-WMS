"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, ShieldCheck, UserPlus } from "lucide-react"

export function UserStatistics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">2,853</div>
          <p className="text-xs text-green-600 font-medium flex items-center mt-1">+180 from last month</p>
          <div className="mt-4 h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-1.5 w-[85%] rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Active Users</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <UserCheck className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">2,419</div>
          <p className="text-xs text-gray-600 font-medium mt-1">84.8% of total users</p>
          <div className="mt-4 h-1.5 w-full bg-green-100 rounded-full overflow-hidden">
            <div className="bg-green-600 h-1.5 w-[84%] rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Admin Users</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">142</div>
          <p className="text-xs text-gray-600 font-medium mt-1">5% of total users</p>
          <div className="mt-4 h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-1.5 w-[5%] rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">New Users</CardTitle>
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <UserPlus className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">180</div>
          <p className="text-xs text-green-600 font-medium flex items-center mt-1">+12.5% from last month</p>
          <div className="mt-4 h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-1.5 w-[12%] rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
