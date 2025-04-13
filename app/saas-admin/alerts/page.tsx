"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Bell, Calendar, Check, Edit, Mail, MessageSquare, Plus, Send, Settings } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"

interface AlertRule {
  id: number
  name: string
  description: string
  icon: string
  type: "email" | "in-app"
  status: "active" | "inactive"
  template?: {
    subject: string
    body: string
    variables: string[]
  }
}

export default function AlertsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("1")
  const [activeTab, setActiveTab] = useState("settings")
  const [systemActive, setSystemActive] = useState(true)
  const [isTemplateEditMode, setIsTemplateEditMode] = useState(false)
  const [isCreateAlertDialogOpen, setIsCreateAlertDialogOpen] = useState(false)
  const [alertSent, setAlertSent] = useState(false)
  const { toast } = useToast()

  // Alert rules
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: 1,
      name: "Subscription Expiry - 30 Days",
      description: "Alert clients 30 days before subscription expires",
      icon: "Calendar",
      type: "email",
      status: "active",
      template: {
        subject: "Your Rona Subscription will expire in 30 days",
        body: "Dear {factory_owner},\n\nThis is a friendly reminder that your Rona Workforce Management subscription for {factory_name} will expire in 30 days on {expiry_date}.\n\nTo ensure uninterrupted service, please renew your subscription before the expiration date.\n\nIf you have any questions or need assistance with renewal, please don't hesitate to contact our support team.\n\nBest regards,\nThe Rona Team",
        variables: ["factory_owner", "factory_name", "expiry_date"],
      },
    },
    {
      id: 2,
      name: "Subscription Expiry - 7 Days",
      description: "Alert clients 7 days before subscription expires",
      icon: "Calendar",
      type: "email",
      status: "active",
      template: {
        subject: "URGENT: Your Rona Subscription expires in 7 days",
        body: "Dear {factory_owner},\n\nYour Rona Workforce Management subscription for {factory_name} will expire in 7 days on {expiry_date}.\n\nTo avoid service interruption, please renew your subscription as soon as possible.\n\nIf you have any questions or need assistance with renewal, please don't hesitate to contact our support team.\n\nBest regards,\nThe Rona Team",
        variables: ["factory_owner", "factory_name", "expiry_date"],
      },
    },
    {
      id: 3,
      name: "Subscription Expiry - 1 Day",
      description: "Final alert 1 day before subscription expires",
      icon: "Calendar",
      type: "email",
      status: "active",
      template: {
        subject: "FINAL NOTICE: Your Rona Subscription expires tomorrow",
        body: "Dear {factory_owner},\n\nThis is a final reminder that your Rona Workforce Management subscription for {factory_name} will expire TOMORROW, {expiry_date}.\n\nTo prevent service interruption, please renew your subscription immediately.\n\nIf you have any questions or need assistance with renewal, please don't hesitate to contact our support team.\n\nBest regards,\nThe Rona Team",
        variables: ["factory_owner", "factory_name", "expiry_date"],
      },
    },
    {
      id: 4,
      name: "Subscription Expired",
      description: "Alert when subscription has expired",
      icon: "AlertTriangle",
      type: "email",
      status: "active",
      template: {
        subject: "Your Rona Subscription has expired",
        body: "Dear {factory_owner},\n\nYour Rona Workforce Management subscription for {factory_name} has expired on {expiry_date}.\n\nAs a result, access to the platform has been limited. To restore full access, please renew your subscription as soon as possible.\n\nIf you have any questions or need assistance with renewal, please don't hesitate to contact our support team.\n\nBest regards,\nThe Rona Team",
        variables: ["factory_owner", "factory_name", "expiry_date"],
      },
    },
    {
      id: 5,
      name: "Low User Engagement",
      description: "Alert when factory usage drops below threshold",
      icon: "MessageSquare",
      type: "email",
      status: "active",
      template: {
        subject: "Optimize your Rona platform usage",
        body: "Dear {factory_owner},\n\nWe've noticed that your team at {factory_name} has had reduced activity on the Rona platform recently.\n\nTo help you get the most out of your subscription, we'd like to offer a free consultation to explore how you can better utilize the platform's features.\n\nPlease let us know when would be a convenient time for a brief call.\n\nBest regards,\nThe Rona Team",
        variables: ["factory_owner", "factory_name"],
      },
    },
  ])

  // Alert settings
  const [alertSettings, setAlertSettings] = useState({
    expire30: true,
    expire14: false,
    expire7: true,
    expire1: true,
    expired: true,
    emailAlerts: true,
    smsAlerts: false,
    inAppAlerts: true,
    ccRecipients: "sales@rona.com",
    alertHours: "business",
    weekendAlerts: false,
  })

  // New alert form state
  const [newAlert, setNewAlert] = useState({
    name: "",
    description: "",
    icon: "Calendar",
    type: "email",
    subject: "",
    body: "",
    variables: "factory_owner, factory_name, expiry_date",
  })

  // Editable template - Fixed the syntax error here
  const [editableTemplate, setEditableTemplate] = useState({
    id: 1,
    subject: "Your Rona Subscription will expire in 30 days",
    body: "Dear {factory_owner},\n\nThis is a friendly reminder that your Rona Workforce Management subscription for {factory_name} will expire in 30 days on {expiry_date}.\n\nTo ensure uninterrupted service, please renew your subscription before the expiration date.\n\nIf you have any questions or need assistance with renewal, please don't hesitate to contact our support team.\n\nBest regards,\nThe Rona Team",
  })

  // Toggle alert rule status
  const toggleAlertStatus = (id: number) => {
    setAlertRules(
      alertRules.map((rule) =>
        rule.id === id ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
      ),
    )

    toast({
      title: "Alert status updated",
      description: "The alert rule status has been updated successfully.",
    })
  }

  // Edit template
  const handleEditTemplate = () => {
    setIsTemplateEditMode(true)
  }

  // Save template
  const handleSaveTemplate = () => {
    setIsTemplateEditMode(false)

    // Update the alert rule with the edited template
    setAlertRules(
      alertRules.map((rule) =>
        rule.id === Number.parseInt(selectedTemplate)
          ? {
              ...rule,
              template: {
                ...rule.template!,
                subject: editableTemplate.subject,
                body: editableTemplate.body,
              },
            }
          : rule,
      ),
    )

    toast({
      title: "Template updated",
      description: "The alert template has been updated successfully.",
    })
  }

  // Send test alert
  const handleSendTestAlert = () => {
    setAlertSent(true)

    toast({
      title: "Test alert sent",
      description: "A test alert has been sent to your email address.",
    })

    setTimeout(() => {
      setAlertSent(false)
    }, 3000)
  }

  // Toggle system active state
  const toggleSystemActive = () => {
    setSystemActive(!systemActive)

    toast({
      title: systemActive ? "Alert system deactivated" : "Alert system activated",
      description: systemActive
        ? "The alert system has been deactivated. No alerts will be sent."
        : "The alert system has been activated. Alerts will be sent according to your settings.",
    })
  }

  // Get icon component based on string name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="h-5 w-5" />
      case "AlertTriangle":
        return <AlertTriangle className="h-5 w-5" />
      case "MessageSquare":
        return <MessageSquare className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <DashboardShell
      title="Alert System"
      description="Manage automated alerts and notifications for clients"
      headerAction={
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">System Status:</span>
          <Badge variant={systemActive ? "success" : "destructive"}>{systemActive ? "Active" : "Inactive"}</Badge>
          <Button variant="outline" size="sm" onClick={toggleSystemActive}>
            {systemActive ? "Deactivate" : "Activate"}
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Alert Settings
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Mail className="mr-2 h-4 w-4" />
            Alert Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Rules</CardTitle>
              <CardDescription>Configure when and how alerts are sent to clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    {getIconComponent(rule.icon)}
                    <div>
                      <h3 className="font-medium">{rule.name}</h3>
                      <p className="text-sm text-gray-500">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={rule.type === "email" ? "outline" : "secondary"}>
                      {rule.type === "email" ? "Email" : "In-app"}
                    </Badge>
                    <Switch checked={rule.status === "active"} onCheckedChange={() => toggleAlertStatus(rule.id)} />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsCreateAlertDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Alert Rule
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Delivery Settings</CardTitle>
              <CardDescription>Configure how alerts are delivered to clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Alerts</h3>
                  <p className="text-sm text-gray-500">Send alerts via email</p>
                </div>
                <Switch
                  checked={alertSettings.emailAlerts}
                  onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, emailAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Alerts</h3>
                  <p className="text-sm text-gray-500">Send alerts via SMS (additional charges may apply)</p>
                </div>
                <Switch
                  checked={alertSettings.smsAlerts}
                  onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, smsAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">In-App Notifications</h3>
                  <p className="text-sm text-gray-500">Send alerts as in-app notifications</p>
                </div>
                <Switch
                  checked={alertSettings.inAppAlerts}
                  onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, inAppAlerts: checked })}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">CC Recipients</h3>
                <p className="text-sm text-gray-500">Additional email addresses to CC on all alerts</p>
                <Input
                  value={alertSettings.ccRecipients}
                  onChange={(e) => setAlertSettings({ ...alertSettings, ccRecipients: e.target.value })}
                  placeholder="email@example.com, another@example.com"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Alert Hours</h3>
                <p className="text-sm text-gray-500">When alerts should be sent</p>
                <Select
                  value={alertSettings.alertHours}
                  onValueChange={(value) => setAlertSettings({ ...alertSettings, alertHours: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anytime">Anytime</SelectItem>
                    <SelectItem value="business">Business Hours (9AM-5PM)</SelectItem>
                    <SelectItem value="morning">Morning Only (9AM-12PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekend Alerts</h3>
                  <p className="text-sm text-gray-500">Send alerts on weekends</p>
                </div>
                <Switch
                  checked={alertSettings.weekendAlerts}
                  onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, weekendAlerts: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Settings saved",
                    description: "Your alert delivery settings have been saved successfully.",
                  })
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Templates</CardTitle>
              <CardDescription>Customize the content of alert messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Select Template</h3>
                <Select
                  value={selectedTemplate}
                  onValueChange={(value) => {
                    setSelectedTemplate(value)
                    const template = alertRules.find((rule) => rule.id === Number.parseInt(value))?.template
                    if (template) {
                      setEditableTemplate({
                        id: Number.parseInt(value),
                        subject: template.subject,
                        body: template.body,
                      })
                    }
                    setIsTemplateEditMode(false)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {alertRules.map((rule) => (
                      <SelectItem key={rule.id} value={rule.id.toString()}>
                        {rule.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Subject</h3>
                  {!isTemplateEditMode && (
                    <Button variant="ghost" size="sm" onClick={handleEditTemplate}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  )}
                </div>
                <Input
                  value={editableTemplate.subject}
                  onChange={(e) => setEditableTemplate({ ...editableTemplate, subject: e.target.value })}
                  disabled={!isTemplateEditMode}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Body</h3>
                <Textarea
                  value={editableTemplate.body}
                  onChange={(e) => setEditableTemplate({ ...editableTemplate, body: e.target.value })}
                  disabled={!isTemplateEditMode}
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Available Variables</h3>
                <p className="text-sm text-gray-500">
                  You can use these variables in your template:
                  {alertRules
                    .find((rule) => rule.id === Number.parseInt(selectedTemplate))
                    ?.template?.variables.map((v) => ` {${v}}`)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isTemplateEditMode ? (
                <Button className="w-full" onClick={handleSaveTemplate}>
                  <Check className="mr-2 h-4 w-4" />
                  Save Template
                </Button>
              ) : (
                <Button className="w-full" onClick={handleSendTestAlert} disabled={alertSent}>
                  <Send className="mr-2 h-4 w-4" />
                  {alertSent ? "Test Sent!" : "Send Test Alert"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
