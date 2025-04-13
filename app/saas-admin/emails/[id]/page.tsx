"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Send, Eye, Code, Settings, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

// Template types
type EmailVariable = {
  name: string
  description: string
}

type EmailTrigger = {
  id: string
  name: string
  enabled: boolean
}

type EmailTemplate = {
  id: string
  name: string
  subject: string
  category: string
  content: string
  active: boolean
  variables: EmailVariable[]
  triggers: EmailTrigger[]
}

export default function EmailTemplatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  // Loading state
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [showTestEmailInput, setShowTestEmailInput] = useState(false)

  // Template state
  const [template, setTemplate] = useState<EmailTemplate>({
    id,
    name: "",
    subject: "",
    category: "account",
    content: "",
    active: true,
    variables: [],
    triggers: [],
  })

  // Preview data
  const [previewData, setPreviewData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    factory: "Abyssinia Textiles",
    role: "Admin",
    loginUrl: "https://app.rona.com/login",
  })

  // Fetch template data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be an API call in a real app
      setTemplate({
        id,
        name: "Welcome Email",
        subject: "Welcome to Rona Workforce Management",
        category: "account",
        content: `<p>Dear {{name}},</p>
<p>Welcome to Rona Workforce Management! We're excited to have you on board.</p>
<p>Your account has been successfully created and is now ready to use. Here are your account details:</p>
<ul>
<li><strong>Username:</strong> {{email}}</li>
<li><strong>Factory:</strong> {{factory}}</li>
<li><strong>Role:</strong> {{role}}</li>
</ul>
<p>To get started, please log in to your account using the button below:</p>
<p style="text-align: center;">
<a href="{{loginUrl}}" style="display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px;">Log In to Your Account</a>
</p>
<p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
<p>Best regards,<br>The Rona Team</p>`,
        active: true,
        variables: [
          { name: "name", description: "Recipient's full name" },
          { name: "email", description: "Recipient's email address" },
          { name: "factory", description: "Factory name" },
          { name: "role", description: "User role" },
          { name: "loginUrl", description: "Login URL" },
        ],
        triggers: [
          { id: "new_account", name: "New Account Creation", enabled: true },
          { id: "account_activation", name: "Account Activation", enabled: false },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [id])

  // Replace variables in content
  const getPreviewContent = () => {
    let content = template.content
    Object.entries(previewData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, "g"), value)
    })
    return content
  }

  // Save template
  const saveTemplate = () => {
    // Validate
    if (!template.name || !template.subject || !template.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Template saved",
        description: "Your email template has been saved successfully.",
        variant: "default",
      })
    }, 1500)
  }

  // Send test email
  const sendTestEmail = () => {
    if (!testEmail) {
      toast({
        title: "Missing email",
        description: "Please enter a test email address.",
        variant: "destructive",
      })
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(testEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setShowTestEmailInput(false)
      setTestEmail("")
      toast({
        title: "Test email sent",
        description: `A test email has been sent to ${testEmail}.`,
        variant: "default",
      })
    }, 1500)
  }

  // Handle trigger toggle
  const handleTriggerToggle = (triggerId: string, enabled: boolean) => {
    setTemplate({
      ...template,
      triggers: template.triggers.map((trigger) => (trigger.id === triggerId ? { ...trigger, enabled } : trigger)),
    })
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading template...</p>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/saas-admin/emails")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold tracking-tight text-purple-500">Edit Email Template</h2>
          </div>
          <div className="flex items-center gap-2">
            {showTestEmailInput ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter test email address"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-64 border-purple-800/20"
                />
                <Button
                  variant="outline"
                  className="border-purple-800/20 text-purple-500"
                  onClick={() => setShowTestEmailInput(false)}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-800/20 text-purple-500"
                  onClick={sendTestEmail}
                  disabled={isSending}
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="border-purple-800/20 text-purple-500"
                onClick={() => setShowTestEmailInput(true)}
              >
                <Send className="mr-2 h-4 w-4" /> Test Send
              </Button>
            )}
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={saveTemplate} disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Template Details */}
          <Card className="border-purple-800/20 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg text-purple-500">Template Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  value={template.name}
                  onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                  className="border-purple-800/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={template.subject}
                  onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                  className="border-purple-800/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={template.category}
                  onValueChange={(value) => setTemplate({ ...template, category: value })}
                >
                  <SelectTrigger id="category" className="border-purple-800/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="worker">Worker</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={template.active}
                  onCheckedChange={(checked) => setTemplate({ ...template, active: checked })}
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Available Variables</h3>
                <div className="space-y-2">
                  {template.variables.map((variable, index) => (
                    <div key={index} className="text-sm">
                      <code className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded">
                        {`{{${variable.name}}}`}
                      </code>
                      <span className="text-muted-foreground ml-2">{variable.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Editor */}
          <Card className="border-purple-800/20 md:col-span-2">
            <CardHeader className="pb-2">
              <Tabs defaultValue="editor">
                <TabsList className="bg-purple-950/30 text-purple-500">
                  <TabsTrigger
                    value="editor"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <Code className="mr-2 h-4 w-4" /> Editor
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Automation
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="editor" className="mt-0">
                <Textarea
                  value={template.content}
                  onChange={(e) => setTemplate({ ...template, content: e.target.value })}
                  className="min-h-[400px] font-mono text-sm border-purple-800/20"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use HTML to format your email. Insert variables using the{" "}
                  <code className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded">{"{{variable}}"}</code> syntax.
                </p>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card className="border-purple-800/20">
                  <CardHeader className="bg-gray-50 border-b border-purple-800/20">
                    <div className="space-y-1.5">
                      <div className="text-sm font-medium">
                        From: Rona Workforce Management &lt;no-reply@rona.com&gt;
                      </div>
                      <div className="text-sm font-medium">
                        To: {previewData.name} &lt;{previewData.email}&gt;
                      </div>
                      <div className="text-sm font-medium">Subject: {template.subject}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 bg-white">
                    <div className="email-preview" dangerouslySetInnerHTML={{ __html: getPreviewContent() }} />
                  </CardContent>
                </Card>

                <div className="mt-4 space-y-4">
                  <h3 className="text-sm font-medium">Preview Data</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(previewData).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={`preview-${key}`}>{key}</Label>
                        <Input
                          id={`preview-${key}`}
                          value={value}
                          onChange={(e) => setPreviewData({ ...previewData, [key]: e.target.value })}
                          className="border-purple-800/20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Automation Triggers</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Configure when this email template should be automatically sent
                    </p>

                    <div className="space-y-4">
                      {template.triggers.map((trigger, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{trigger.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Send this email when a {trigger.name.toLowerCase()} occurs
                            </p>
                          </div>
                          <Switch
                            checked={trigger.enabled}
                            onCheckedChange={(checked) => handleTriggerToggle(trigger.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Delivery Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sender-name">Sender Name</Label>
                          <Input
                            id="sender-name"
                            defaultValue="Rona Workforce Management"
                            className="border-purple-800/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sender-email">Sender Email</Label>
                          <Input id="sender-email" defaultValue="no-reply@rona.com" className="border-purple-800/20" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reply-to">Reply-To Email</Label>
                        <Input id="reply-to" defaultValue="support@rona.com" className="border-purple-800/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end mt-4">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={saveTemplate} disabled={isSaving}>
            {isSaving ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Saving...
              </span>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Save Template
              </>
            )}
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
