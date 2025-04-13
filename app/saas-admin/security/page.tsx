"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  RefreshCw,
  Clock,
  User,
  Lock,
  Server,
  Database,
  Globe,
  Activity,
  Download,
  Filter,
} from "lucide-react"

// Mock security alerts data
const securityAlerts = [
  {
    id: "alert-001",
    title: "Multiple failed login attempts",
    description: "5 failed login attempts detected for admin user at Abyssinia Textiles",
    severity: "high",
    time: "2 hours ago",
    source: "Authentication",
    status: "active",
  },
  {
    id: "alert-002",
    title: "Unusual login location",
    description: "Login from unusual location detected for user at Habesha Garments",
    severity: "medium",
    time: "5 hours ago",
    source: "Authentication",
    status: "active",
  },
  {
    id: "alert-003",
    title: "API rate limit exceeded",
    description: "API rate limit exceeded for Ethio Leather factory",
    severity: "low",
    time: "1 day ago",
    source: "API Gateway",
    status: "active",
  },
  {
    id: "alert-004",
    title: "Database connection failure",
    description: "Temporary database connection failure detected",
    severity: "medium",
    time: "1 day ago",
    source: "Database",
    status: "resolved",
  },
  {
    id: "alert-005",
    title: "Suspicious file upload",
    description: "Potentially malicious file upload detected at Sheba Foods",
    severity: "high",
    time: "2 days ago",
    source: "File Storage",
    status: "resolved",
  },
]

// Mock security settings
const securitySettings = [
  {
    id: "setting-001",
    title: "Two-Factor Authentication",
    description: "Require 2FA for all admin users",
    enabled: true,
    category: "authentication",
  },
  {
    id: "setting-002",
    title: "Password Complexity",
    description: "Enforce strong password requirements",
    enabled: true,
    category: "authentication",
  },
  {
    id: "setting-003",
    title: "Session Timeout",
    description: "Automatically log out inactive users after 30 minutes",
    enabled: true,
    category: "authentication",
  },
  {
    id: "setting-004",
    title: "IP Restriction",
    description: "Restrict access to specific IP addresses",
    enabled: false,
    category: "access",
  },
  {
    id: "setting-005",
    title: "Audit Logging",
    description: "Log all administrative actions",
    enabled: true,
    category: "monitoring",
  },
  {
    id: "setting-006",
    title: "Encryption at Rest",
    description: "Encrypt all stored data",
    enabled: true,
    category: "data",
  },
  {
    id: "setting-007",
    title: "API Rate Limiting",
    description: "Limit API requests to prevent abuse",
    enabled: true,
    category: "api",
  },
  {
    id: "setting-008",
    title: "Vulnerability Scanning",
    description: "Regularly scan for security vulnerabilities",
    enabled: true,
    category: "monitoring",
  },
]

export default function SecurityMonitoringPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("alerts")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [alertsFilter, setAlertsFilter] = useState("all")
  const [settingsFilter, setSettingsFilter] = useState("all")

  // Filter alerts based on search query and filter
  const filteredAlerts = securityAlerts.filter((alert) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.source.toLowerCase().includes(query)
      )
    }

    // Filter by status
    if (alertsFilter === "active" && alert.status !== "active") return false
    if (alertsFilter === "resolved" && alert.status !== "resolved") return false

    return true
  })

  // Filter settings based on search query and filter
  const filteredSettings = securitySettings.filter((setting) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        setting.title.toLowerCase().includes(query) ||
        setting.description.toLowerCase().includes(query) ||
        setting.category.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (settingsFilter !== "all" && setting.category !== settingsFilter) return false

    return true
  })

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Security data refreshed",
        description: "Security alerts and settings have been updated",
      })
    }, 1000)
  }

  const handleResolveAlert = (alertId: string) => {
    toast({
      title: "Alert resolved",
      description: `Alert ${alertId} has been marked as resolved`,
    })
  }

  const handleToggleSetting = (settingId: string, enabled: boolean) => {
    toast({
      title: enabled ? "Setting enabled" : "Setting disabled",
      description: `Security setting has been ${enabled ? "enabled" : "disabled"}`,
    })
  }

  const handleExportReport = () => {
    toast({
      title: "Exporting security report",
      description: "Your security report is being generated and will download shortly",
    })
  }

  return (
    <DashboardShell
      title="Security Monitoring"
      description="Monitor and manage security settings and alerts"
      headerAction={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
          <Button
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-purple-600">Security Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                  <span>Security Score</span>
                </div>
                <Badge className="bg-green-600">92/100</Badge>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full rounded-full" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span>Active Alerts</span>
                </div>
                <Badge className="bg-red-600">3</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Security Settings</span>
                </div>
                <Badge className="bg-purple-600">8</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Last Scan</span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-green-600 mr-2" />
                  <span>System Status</span>
                </div>
                <Badge className="bg-green-600">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search security items..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>

          <Tabs defaultValue="alerts" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
              <TabsTrigger value="settings">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant={alertsFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlertsFilter("all")}
                    className={alertsFilter === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    All
                  </Button>
                  <Button
                    variant={alertsFilter === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlertsFilter("active")}
                    className={alertsFilter === "active" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Active
                  </Button>
                  <Button
                    variant={alertsFilter === "resolved" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAlertsFilter("resolved")}
                    className={alertsFilter === "resolved" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Resolved
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} className="overflow-hidden">
                      <div
                        className={`h-1 ${
                          alert.severity === "high"
                            ? "bg-red-600"
                            : alert.severity === "medium"
                              ? "bg-orange-600"
                              : "bg-blue-600"
                        }`}
                      />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <ShieldAlert
                                className={`h-4 w-4 ${
                                  alert.severity === "high"
                                    ? "text-red-600"
                                    : alert.severity === "medium"
                                      ? "text-orange-600"
                                      : "text-blue-600"
                                }`}
                              />
                              <h3 className="font-medium">{alert.title}</h3>
                              <Badge
                                className={
                                  alert.severity === "high"
                                    ? "bg-red-600"
                                    : alert.severity === "medium"
                                      ? "bg-orange-600"
                                      : "bg-blue-600"
                                }
                              >
                                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{alert.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                <span>{alert.source}</span>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  alert.status === "active"
                                    ? "border-red-600/20 text-red-600"
                                    : "border-green-600/20 text-green-600"
                                }
                              >
                                {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            {alert.status === "active" && (
                              <Button size="sm" variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                                Resolve
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No security alerts found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={settingsFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("all")}
                    className={settingsFilter === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    All
                  </Button>
                  <Button
                    variant={settingsFilter === "authentication" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("authentication")}
                    className={settingsFilter === "authentication" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Authentication
                  </Button>
                  <Button
                    variant={settingsFilter === "access" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("access")}
                    className={settingsFilter === "access" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Access
                  </Button>
                  <Button
                    variant={settingsFilter === "monitoring" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("monitoring")}
                    className={settingsFilter === "monitoring" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Monitoring
                  </Button>
                  <Button
                    variant={settingsFilter === "data" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("data")}
                    className={settingsFilter === "data" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    Data
                  </Button>
                  <Button
                    variant={settingsFilter === "api" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettingsFilter("api")}
                    className={settingsFilter === "api" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    API
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredSettings.length > 0 ? (
                  filteredSettings.map((setting) => (
                    <Card key={setting.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {setting.category === "authentication" ? (
                                <User className="h-4 w-4 text-purple-600" />
                              ) : setting.category === "access" ? (
                                <Lock className="h-4 w-4 text-blue-600" />
                              ) : setting.category === "monitoring" ? (
                                <Activity className="h-4 w-4 text-green-600" />
                              ) : setting.category === "data" ? (
                                <Database className="h-4 w-4 text-orange-600" />
                              ) : (
                                <Server className="h-4 w-4 text-red-600" />
                              )}
                              <h3 className="font-medium">{setting.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {setting.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>

                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={(checked) => handleToggleSetting(setting.id, checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Lock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No security settings found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}
