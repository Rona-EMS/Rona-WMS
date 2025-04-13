"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Bug, MessageSquare, CheckCircle2, Clock, AlertTriangle, Search, Filter } from "lucide-react"

export function IssueReporting() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Card className="border-purple-800/20 bg-black">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl text-purple-400">Software Issue Reports</CardTitle>
            <CardDescription className="text-gray-400">
              Track and manage software issues reported by factory clients
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                className="pl-8 border-purple-800/20 bg-gray-900 text-white w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-purple-800/20 text-purple-400">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex flex-col items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mb-2" />
              <h3 className="text-lg font-medium text-white">12</h3>
              <p className="text-xs text-gray-400">Open Issues</p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="text-lg font-medium text-white">8</h3>
              <p className="text-xs text-gray-400">In Progress</p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex flex-col items-center">
              <Bug className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="text-lg font-medium text-white">3</h3>
              <p className="text-xs text-gray-400">Critical Issues</p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="text-lg font-medium text-white">15</h3>
              <p className="text-xs text-gray-400">Resolved This Week</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black text-purple-400 border border-purple-800/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All Issues
            </TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Open
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Resolved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="rounded-md border border-purple-800/20">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b border-purple-800/20">
                    <tr>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">ID</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Issue</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Factory</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Type</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Priority</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Status</th>
                      <th className="h-12 px-4 text-left font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "ISS-1234",
                        title: "Payroll calculation error with overtime hours",
                        factory: "Abyssinia Textiles",
                        type: "bug",
                        priority: "high",
                        status: "open",
                      },
                      {
                        id: "ISS-1235",
                        title: "Worker profile images not loading correctly",
                        factory: "Habesha Garments",
                        type: "ui",
                        priority: "medium",
                        status: "in-progress",
                      },
                      {
                        id: "ISS-1236",
                        title: "Attendance dashboard shows incorrect totals",
                        factory: "Ethio Leather",
                        type: "data",
                        priority: "high",
                        status: "in-progress",
                      },
                      {
                        id: "ISS-1237",
                        title: "Shift assignment confirmation emails not sending",
                        factory: "Abyssinia Textiles",
                        type: "feature",
                        priority: "critical",
                        status: "open",
                      },
                      {
                        id: "ISS-1238",
                        title: "Login screen freezes on mobile devices",
                        factory: "Dire Dawa Cement",
                        type: "performance",
                        priority: "critical",
                        status: "in-progress",
                      },
                    ].map((issue, i) => (
                      <tr key={i} className="border-b border-purple-800/20">
                        <td className="p-4 text-purple-400 font-mono">{issue.id}</td>
                        <td className="p-4 font-medium text-white">{issue.title}</td>
                        <td className="p-4 text-gray-300">{issue.factory}</td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className="border-purple-800/20 bg-purple-900/30 text-purple-400 capitalize"
                          >
                            {issue.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              issue.priority === "critical"
                                ? "bg-red-600"
                                : issue.priority === "high"
                                  ? "bg-orange-600"
                                  : issue.priority === "medium"
                                    ? "bg-yellow-600"
                                    : "bg-blue-600"
                            }
                          >
                            {issue.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {issue.status === "open" ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            ) : issue.status === "in-progress" ? (
                              <Clock className="h-4 w-4 text-blue-500" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                            <span
                              className={`capitalize ${
                                issue.status === "open"
                                  ? "text-yellow-500"
                                  : issue.status === "in-progress"
                                    ? "text-blue-500"
                                    : "text-green-500"
                              }`}
                            >
                              {issue.status.replace("-", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Button variant="outline" size="sm" className="border-purple-800/20 text-purple-400">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
