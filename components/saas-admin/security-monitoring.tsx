"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ShieldAlert, AlertTriangle, Search, ExternalLink } from "lucide-react"

export function SecurityMonitoring() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card className="border-purple-800/20 bg-black">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl text-purple-400">Security Monitoring Dashboard</CardTitle>
            <CardDescription className="text-gray-400">
              Real-time security monitoring for suspicious activities
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search security events..."
              className="pl-8 border-purple-800/20 bg-gray-900 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">System Status</h3>
              <Badge className="bg-green-600">Healthy</Badge>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Failed Login Attempts</span>
                <Badge variant="outline" className="border-purple-800/20 text-purple-400">
                  18
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Suspicious Activities</span>
                <Badge variant="outline" className="border-purple-800/20 text-purple-400">
                  3
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Data Access Anomalies</span>
                <Badge variant="outline" className="border-purple-800/20 text-purple-400">
                  2
                </Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Current Threats</h3>
              <Badge className="bg-yellow-600">3 Active</Badge>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Critical</span>
                <Badge variant="outline" className="border-red-800/20 text-red-400">
                  0
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">High</span>
                <Badge variant="outline" className="border-orange-800/20 text-orange-400">
                  1
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Medium</span>
                <Badge variant="outline" className="border-yellow-800/20 text-yellow-400">
                  2
                </Badge>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-purple-800/20 bg-gray-900/50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Factory Security</h3>
              <Badge className="bg-green-600">92% Good</Badge>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">2FA Enabled</span>
                <Badge variant="outline" className="border-green-800/20 text-green-400">
                  21/24
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Strong Passwords</span>
                <Badge variant="outline" className="border-green-800/20 text-green-400">
                  23/24
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Secure Access</span>
                <Badge variant="outline" className="border-yellow-800/20 text-yellow-400">
                  20/24
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Alert className="bg-yellow-900/20 border-yellow-800/20 text-yellow-400">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            We detected 3 suspicious login attempts in the last 24 hours. Please review the security events below.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Recent Security Events</h3>
          <div className="rounded-md border border-purple-800/20">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b border-purple-800/20">
                  <tr>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Time</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Event</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Factory</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">IP Address</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Severity</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Status</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      time: "Today, 10:23 AM",
                      event: "Multiple failed login attempts",
                      factory: "Habesha Garments",
                      ip: "45.132.87.12",
                      severity: "high",
                      status: "active",
                    },
                    {
                      time: "Today, 09:15 AM",
                      event: "Unusual data access pattern",
                      factory: "Abyssinia Textiles",
                      ip: "197.156.84.123",
                      severity: "medium",
                      status: "active",
                    },
                    {
                      time: "Today, 08:32 AM",
                      event: "Login from new location",
                      factory: "Ethio Leather",
                      ip: "197.156.102.67",
                      severity: "low",
                      status: "active",
                    },
                    {
                      time: "Yesterday, 11:56 PM",
                      event: "Mass worker profile exports",
                      factory: "Habesha Garments",
                      ip: "197.156.97.45",
                      severity: "medium",
                      status: "resolved",
                    },
                    {
                      time: "Yesterday, 4:43 PM",
                      event: "API rate limit exceeded",
                      factory: "Dire Dawa Cement",
                      ip: "197.156.110.89",
                      severity: "low",
                      status: "resolved",
                    },
                  ].map((event, i) => (
                    <tr key={i} className="border-b border-purple-800/20">
                      <td className="p-4 text-gray-300">{event.time}</td>
                      <td className="p-4 font-medium text-white">{event.event}</td>
                      <td className="p-4 text-white">{event.factory}</td>
                      <td className="p-4 font-mono text-xs text-gray-300">{event.ip}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {event.severity === "high" ? (
                            <ShieldAlert className="h-4 w-4 mr-1 text-red-500" />
                          ) : event.severity === "medium" ? (
                            <ShieldAlert className="h-4 w-4 mr-1 text-orange-500" />
                          ) : (
                            <Shield className="h-4 w-4 mr-1 text-blue-500" />
                          )}
                          <span
                            className={`capitalize ${
                              event.severity === "high"
                                ? "text-red-500"
                                : event.severity === "medium"
                                  ? "text-orange-500"
                                  : "text-blue-500"
                            }`}
                          >
                            {event.severity}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={event.status === "active" ? "bg-purple-600" : "bg-green-600"}>
                          {event.status === "active" ? "Active" : "Resolved"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-purple-400">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
