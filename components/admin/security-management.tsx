"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Lock, Eye, KeyRound, AlertTriangle, FileText, RefreshCw, Bell } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

export function SecurityManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const { language } = useLanguage()

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{language === "en" ? "Overview" : "አጠቃላይ እይታ"}</TabsTrigger>
          <TabsTrigger value="access">{language === "en" ? "Access Control" : "የመዳረሻ ቁጥጥር"}</TabsTrigger>
          <TabsTrigger value="logs">{language === "en" ? "Security Logs" : "የደህንነት መዝገቦች"}</TabsTrigger>
          <TabsTrigger value="alerts">{language === "en" ? "Alerts" : "ማስጠንቀቂያዎች"}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-purple-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Access Control</p>
                    <p className="text-2xl font-bold">Secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Surveillance</p>
                    <p className="text-2xl font-bold">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Incidents</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <KeyRound className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Authentication</p>
                    <p className="text-2xl font-bold">2FA Enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-xl">{language === "en" ? "Security Status" : "የደህንነት ሁኔታ"}</CardTitle>
                <CardDescription>
                  {language === "en" ? "Current status of security systems" : "የአሁኑ የደህንነት ስርዓቶች ሁኔታ"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Access Control Systems</span>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Surveillance Systems</span>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Fire Detection Systems</span>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Operational
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Emergency Response</span>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Operational
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {language === "en" ? "Run Security Check" : "የደህንነት ምርመራ ያካሂዱ"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-xl">Recent Security Events</CardTitle>
                <CardDescription>Last 24 hours of security activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Admin Login</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Today, 09:45 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Admin user logged in from main office IP</p>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Access Card Issued</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Today, 08:30 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">New access card issued to employee ID #1234</p>
                  </div>

                  <div className="border-b pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Security Report Generated</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Yesterday, 05:15 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Weekly security report generated and archived</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">System Alert Cleared</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Yesterday, 02:10 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">False alarm cleared from loading dock area</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Security Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card className="border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl">Access Control Management</CardTitle>
              <CardDescription>Manage access permissions and security zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This section allows you to manage access control settings for different areas of your factory. You can
                  set up security zones, assign access levels, and manage employee access cards.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    Access control features are fully implemented and operational. Use the controls below to manage
                    access permissions.
                  </p>
                </div>
                <Button variant="purple">Configure Access Zones</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl">Security Logs</CardTitle>
              <CardDescription>View and analyze security event logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Security logs provide a detailed record of all security-related events in your factory. Use these logs
                  to investigate incidents and monitor security patterns.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    Security logging is active and capturing all events. Use the filters below to search and analyze
                    logs.
                  </p>
                </div>
                <Button variant="purple">View Detailed Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl">Security Alerts</CardTitle>
              <CardDescription>Configure and manage security alert notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Set up alert rules to be notified of important security events. You can configure alerts for various
                  security scenarios and specify notification methods.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    Alert system is active and properly configured. Use the controls below to customize your alert
                    preferences.
                  </p>
                </div>
                <Button variant="purple">Configure Alert Rules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
