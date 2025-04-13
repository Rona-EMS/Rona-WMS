"use client"

import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

export default function SettingsPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <DashboardShell
      title="Platform Settings"
      description="Manage global settings for the SAAS platform"
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      }
    >
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-100 text-purple-600 border border-gray-200">
          <TabsTrigger value="general" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger
            value="localization"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Localization
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">General Settings</CardTitle>
              <CardDescription className="text-gray-500">Configure basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Rona Workforce Management" className="max-w-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@rona.com" className="max-w-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" type="tel" defaultValue="+251 11 123 4567" className="max-w-md" />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable access to the platform</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-registrations">Allow New Registrations</Label>
                    <p className="text-sm text-gray-500">Enable new factory registrations</p>
                  </div>
                  <Switch id="new-registrations" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Security Settings</CardTitle>
              <CardDescription className="text-gray-500">Configure platform security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enforce 2FA for all admin users</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <p className="text-sm text-gray-500">Force password reset every 90 days</p>
                  </div>
                  <Switch id="password-expiry" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" className="max-w-md" />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">IP Restriction</Label>
                    <p className="text-sm text-gray-500">Limit access to specific IP addresses</p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Localization Settings</CardTitle>
              <CardDescription className="text-gray-500">Configure language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <select id="default-language" className="w-full max-w-md rounded-md border border-gray-300 p-2">
                    <option value="en">English</option>
                    <option value="am">Amharic</option>
                    <option value="or">Oromo</option>
                    <option value="ti">Tigrinya</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <select id="date-format" className="w-full max-w-md rounded-md border border-gray-300 p-2">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <select id="time-format" className="w-full max-w-md rounded-md border border-gray-300 p-2">
                    <option value="12">12-hour (AM/PM)</option>
                    <option value="24">24-hour</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <select id="timezone" className="w-full max-w-md rounded-md border border-gray-300 p-2">
                    <option value="Africa/Addis_Ababa">East Africa Time (EAT)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Notification Settings</CardTitle>
              <CardDescription className="text-gray-500">Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send system alerts via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Send critical alerts via SMS</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-sm text-gray-500">Enable push notifications in browser</p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                    <p className="text-sm text-gray-500">Send notifications before scheduled maintenance</p>
                  </div>
                  <Switch id="maintenance-alerts" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-purple-600">Permission Settings</CardTitle>
              <CardDescription className="text-gray-500">Configure default permissions for user roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Admin Role Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-manage-users">Manage Users</Label>
                      <Switch id="admin-manage-users" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-manage-billing">Manage Billing</Label>
                      <Switch id="admin-manage-billing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-view-reports">View Reports</Label>
                      <Switch id="admin-view-reports" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-manage-settings">Manage Settings</Label>
                      <Switch id="admin-manage-settings" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Manager Role Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manager-manage-users">Manage Users</Label>
                      <Switch id="manager-manage-users" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manager-manage-billing">Manage Billing</Label>
                      <Switch id="manager-manage-billing" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manager-view-reports">View Reports</Label>
                      <Switch id="manager-view-reports" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manager-manage-settings">Manage Settings</Label>
                      <Switch id="manager-manage-settings" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
