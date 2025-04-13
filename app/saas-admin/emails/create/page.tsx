"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Send, Eye, Code, Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Template types
type EmailCategory = "account" | "worker" | "admin" | "owner" | "marketing" | "system"
type EmailVariable = {
  name: string
  description: string
  value?: string
}
type EmailTemplate = {
  id?: string
  name: string
  subject: string
  category: EmailCategory
  content: string
  active: boolean
  variables: EmailVariable[]
  createdAt?: string
  lastEdited?: string
}

// Template presets
const templatePresets = {
  account: {
    name: "New Account Template",
    subject: "Welcome to Rona Workforce Management",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Rona</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .button { display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>Welcome to Rona Workforce Management! We're excited to have you on board.</p>
      <p>Your account has been successfully created and is now ready to use. Here are your account details:</p>
      <ul>
        <li><strong>Username:</strong> {{email}}</li>
        <li><strong>Factory:</strong> {{factory}}</li>
        <li><strong>Role:</strong> {{role}}</li>
      </ul>
      <p>To get started, please log in to your account using the button below:</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" class="button">Log In to Your Account</a>
      </p>
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
      <p>If you did not create an account with us, please disregard this email.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Recipient's full name" },
      { name: "email", description: "Recipient's email address" },
      { name: "factory", description: "Factory name" },
      { name: "role", description: "User role" },
      { name: "loginUrl", description: "Login URL" },
    ],
  },
  worker: {
    name: "Worker Notification Template",
    subject: "Important Information for Workers",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Worker Notification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .button { display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>This is an important notification regarding your work at {{factory}}.</p>
      <p>Your shift schedule has been updated for the upcoming week. Please log in to your account to view the details.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{dashboardUrl}}" class="button">View Your Schedule</a>
      </p>
      <p>If you have any questions, please contact your supervisor.</p>
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Worker's full name" },
      { name: "factory", description: "Factory name" },
      { name: "dashboardUrl", description: "Dashboard URL" },
    ],
  },
  admin: {
    name: "Admin Notification Template",
    subject: "Admin Notification",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Notification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .button { display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>This is an important notification for administrators of {{factory}}.</p>
      <p>There have been updates to the worker schedules and attendance records that require your attention.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{adminDashboardUrl}}" class="button">Review Updates</a>
      </p>
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Admin's full name" },
      { name: "factory", description: "Factory name" },
      { name: "adminDashboardUrl", description: "Admin dashboard URL" },
    ],
  },
  owner: {
    name: "Owner Notification Template",
    subject: "Owner Notification",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Owner Notification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .button { display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>This is an important notification for owners of {{factory}}.</p>
      <p>Your monthly performance report is now available. Key metrics show {{performanceSummary}}.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{ownerDashboardUrl}}" class="button">View Full Report</a>
      </p>
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Owner's full name" },
      { name: "factory", description: "Factory name" },
      { name: "performanceSummary", description: "Performance summary" },
      { name: "ownerDashboardUrl", description: "Owner dashboard URL" },
    ],
  },
  marketing: {
    name: "Marketing Email Template",
    subject: "Exciting Updates from Rona",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rona Updates</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .feature { margin: 20px 0; padding: 15px; background-color: white; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .feature-title { color: #8b5cf6; margin-top: 0; }
    .button { display: inline-block; padding: 10px 20px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>We have some exciting updates to share with you about Rona Workforce Management.</p>
      <p>We've recently launched several new features that will help streamline your workforce management:</p>
      
      <div class="feature">
        <h3 class="feature-title">Enhanced Reporting</h3>
        <p>Generate detailed reports with our new analytics dashboard.</p>
      </div>
      
      <div class="feature">
        <h3 class="feature-title">Improved Scheduling</h3>
        <p>Our new drag-and-drop interface makes shift scheduling easier than ever.</p>
      </div>
      
      <div class="feature">
        <h3 class="feature-title">Mobile App Updates</h3>
        <p>Workers can now clock in/out and view schedules directly from their phones.</p>
      </div>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{marketingUrl}}" class="button">Explore New Features</a>
      </p>
      
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
      <p>To unsubscribe from marketing emails, <a href="{{unsubscribeUrl}}">click here</a>.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Recipient's full name" },
      { name: "marketingUrl", description: "Marketing landing page URL" },
      { name: "unsubscribeUrl", description: "Unsubscribe URL" },
    ],
  },
  system: {
    name: "System Notification Template",
    subject: "System Notification",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Notification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-width: 150px; }
    .content { padding: 20px; background-color: #f9f9f9; border-radius: 5px; }
    .alert { padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png" alt="Rona Logo" class="logo">
    </div>
    <div class="content">
      <p>Dear {{name}},</p>
      <p>This is an important system notification from Rona Workforce Management.</p>
      
      <div class="alert">
        <p><strong>Scheduled Maintenance:</strong> We will be performing maintenance on our servers on {{maintenanceDate}} from {{startTime}} to {{endTime}}.</p>
        <p>During this time, the system may be temporarily unavailable. We apologize for any inconvenience this may cause.</p>
      </div>
      
      <p>Best regards,<br>The Rona Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Rona Workforce Management. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    variables: [
      { name: "name", description: "Recipient's full name" },
      { name: "maintenanceDate", description: "Maintenance date" },
      { name: "startTime", description: "Start time" },
      { name: "endTime", description: "End time" },
    ],
  },
}

export default function CreateEmailTemplatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Template state
  const [template, setTemplate] = useState<EmailTemplate>({
    name: templatePresets.account.name,
    subject: templatePresets.account.subject,
    category: "account" as EmailCategory,
    content: templatePresets.account.content,
    active: true,
    variables: templatePresets.account.variables,
  })

  // UI state
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [showHtmlEditor, setShowHtmlEditor] = useState(false)
  const [customVariableDialogOpen, setCustomVariableDialogOpen] = useState(false)
  const [newVariable, setNewVariable] = useState<EmailVariable>({ name: "", description: "" })
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Preview data
  const [previewData, setPreviewData] = useState<Record<string, string>>({})

  // Initialize preview data from template variables
  useEffect(() => {
    const initialPreviewData: Record<string, string> = {}
    template.variables.forEach((variable) => {
      initialPreviewData[variable.name] = variable.value || getSampleValue(variable.name)
    })
    setPreviewData(initialPreviewData)
  }, [template.variables])

  // Get sample value for variable
  const getSampleValue = (variableName: string): string => {
    const sampleValues: Record<string, string> = {
      name: "John Doe",
      email: "john.doe@example.com",
      factory: "Abyssinia Textiles",
      role: "Worker",
      loginUrl: "https://app.rona.com/login",
      dashboardUrl: "https://app.rona.com/dashboard",
      adminDashboardUrl: "https://app.rona.com/admin/dashboard",
      ownerDashboardUrl: "https://app.rona.com/owner/dashboard",
      performanceSummary: "15% increase in productivity",
      marketingUrl: "https://rona.com/features",
      unsubscribeUrl: "https://rona.com/unsubscribe",
      maintenanceDate: "June 15, 2023",
      startTime: "2:00 AM",
      endTime: "4:00 AM",
    }
    return sampleValues[variableName] || `[${variableName}]`
  }

  // Handle category change
  const handleCategoryChange = (category: EmailCategory) => {
    const preset = templatePresets[category]
    setTemplate({
      ...template,
      category,
      name: preset.name,
      subject: preset.subject,
      content: preset.content,
      variables: preset.variables,
    })
  }

  // Replace variables in content
  const getPreviewContent = () => {
    let content = template.content
    Object.entries(previewData).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, "g"), value)
    })
    return content
  }

  // Insert variable at cursor position
  const insertVariable = (variableName: string) => {
    if (!editorRef.current) return

    const editor = editorRef.current
    const start = editor.selectionStart
    const end = editor.selectionEnd
    const content = editor.value
    const newContent = content.substring(0, start) + `{{${variableName}}}` + content.substring(end)

    setTemplate({ ...template, content: newContent })

    // Set cursor position after the inserted variable
    setTimeout(() => {
      editor.focus()
      editor.selectionStart = start + variableName.length + 4 // +4 for {{ and }}
      editor.selectionEnd = start + variableName.length + 4
    }, 0)
  }

  // Add custom variable
  const addCustomVariable = () => {
    // Validate
    if (!newVariable.name || !newVariable.description) {
      setValidationErrors({
        ...(!newVariable.name && { name: "Variable name is required" }),
        ...(!newVariable.description && { description: "Description is required" }),
      })
      return
    }

    // Check if variable already exists
    if (template.variables.some((v) => v.name === newVariable.name)) {
      setValidationErrors({
        name: "A variable with this name already exists",
      })
      return
    }

    // Add variable
    setTemplate({
      ...template,
      variables: [...template.variables, newVariable],
    })

    // Reset form
    setNewVariable({ name: "", description: "" })
    setValidationErrors({})
    setCustomVariableDialogOpen(false)
  }

  // Remove variable
  const removeVariable = (variableName: string) => {
    setTemplate({
      ...template,
      variables: template.variables.filter((v) => v.name !== variableName),
    })
  }

  // Validate template
  const validateTemplate = (): boolean => {
    const errors: Record<string, string> = {}

    if (!template.name) errors.name = "Template name is required"
    if (!template.subject) errors.subject = "Subject is required"
    if (!template.content) errors.content = "Content is required"

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle save
  const handleSave = () => {
    // Validate
    if (!validateTemplate()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Template created",
        description: "Your email template has been created successfully.",
        variant: "default",
      })
      router.push("/saas-admin/emails")
    }, 1500)
  }

  // Send test email
  const openSendDialog = () => {
    setSendDialogOpen(true)
  }

  const handleSendTest = () => {
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
      setSendDialogOpen(false)
      setTestEmail("")
      toast({
        title: "Test email sent",
        description: `A test email has been sent to ${testEmail}.`,
        variant: "default",
      })
    }, 1500)
  }

  return (
    <DashboardShell
      title="Create Email Template"
      description="Create a new email template for your Rona system"
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-purple-800/20 text-purple-500" onClick={openSendDialog}>
            <Send className="mr-2 h-4 w-4" /> Test Send
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Saving...
              </span>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Template
              </>
            )}
          </Button>
        </div>
      }
      breadcrumb={
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/saas-admin/emails")}
            className="h-8 w-8 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span>Back to Templates</span>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Template Details */}
        <Card className="border-purple-800/20 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg text-purple-500">Template Details</CardTitle>
            <CardDescription>Configure your email template settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={template.category} onValueChange={(value: EmailCategory) => handleCategoryChange(value)}>
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
              <p className="text-xs text-muted-foreground">Selecting a category will load a template preset</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center justify-between">
                Template Name
                {validationErrors.name && <span className="text-xs text-red-500">{validationErrors.name}</span>}
              </Label>
              <Input
                id="name"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                className={`border-purple-800/20 ${validationErrors.name ? "border-red-500" : ""}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="flex items-center justify-between">
                Email Subject
                {validationErrors.subject && <span className="text-xs text-red-500">{validationErrors.subject}</span>}
              </Label>
              <Input
                id="subject"
                value={template.subject}
                onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                className={`border-purple-800/20 ${validationErrors.subject ? "border-red-500" : ""}`}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">Active</Label>
              <Switch
                id="active"
                checked={template.active}
                onCheckedChange={(checked) => setTemplate({ ...template, active: checked })}
              />
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Template Variables</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-purple-800/20 text-purple-500"
                  onClick={() => setCustomVariableDialogOpen(true)}
                >
                  <Plus className="mr-1 h-3 w-3" /> Add Variable
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {template.variables.map((variable, index) => (
                  <div key={index} className="flex items-center justify-between text-sm bg-purple-50 p-2 rounded-md">
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="font-mono bg-purple-100 text-purple-800 px-1 py-0.5 rounded"
                              onClick={() => insertVariable(variable.name)}
                            >
                              {`{{${variable.name}}}`}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to insert</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-muted-foreground ml-2">{variable.description}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeVariable(variable.name)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Editor */}
        <Card className="border-purple-800/20 md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
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
                </TabsList>
              </Tabs>
              {activeTab === "editor" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-purple-800/20 text-purple-500"
                  onClick={() => setShowHtmlEditor(!showHtmlEditor)}
                >
                  {showHtmlEditor ? "Simple Editor" : "HTML Editor"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "editor" && (
              <div className="space-y-4">
                {validationErrors.content && <p className="text-xs text-red-500">{validationErrors.content}</p>}
                <Textarea
                  ref={editorRef}
                  value={template.content}
                  onChange={(e) => setTemplate({ ...template, content: e.target.value })}
                  className={`min-h-[400px] font-mono text-sm border-purple-800/20 ${
                    validationErrors.content ? "border-red-500" : ""
                  }`}
                  style={{ fontFamily: showHtmlEditor ? "monospace" : "inherit" }}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {showHtmlEditor
                      ? "Edit the HTML directly. Use {{variable}} syntax for dynamic content."
                      : "Use the variables panel to insert dynamic content."}
                  </p>
                  <div className="flex items-center gap-2">
                    {template.variables.slice(0, 3).map((variable, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs border-purple-800/20 text-purple-500"
                        onClick={() => insertVariable(variable.name)}
                      >
                        Insert {variable.name}
                      </Button>
                    ))}
                    {template.variables.length > 3 && (
                      <span className="text-xs text-muted-foreground">+ more in variables panel</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preview" && (
              <div className="space-y-6">
                <Card className="border-purple-800/20">
                  <CardHeader className="bg-gray-50 border-b border-purple-800/20">
                    <div className="space-y-1.5">
                      <div className="text-sm font-medium">
                        From: Rona Workforce Management &lt;no-reply@rona.com&gt;
                      </div>
                      <div className="text-sm font-medium">
                        To: {previewData.name || "Recipient"} &lt;{previewData.email || "recipient@example.com"}&gt;
                      </div>
                      <div className="text-sm font-medium">Subject: {template.subject}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <iframe
                      srcDoc={getPreviewContent()}
                      className="w-full min-h-[400px] border-0"
                      title="Email Preview"
                    />
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Preview Data</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {template.variables.map((variable, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={`preview-${variable.name}`}>{variable.name}</Label>
                        <Input
                          id={`preview-${variable.name}`}
                          value={previewData[variable.name] || ""}
                          onChange={(e) => setPreviewData({ ...previewData, [variable.name]: e.target.value })}
                          className="border-purple-800/20"
                          placeholder={getSampleValue(variable.name)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end mt-6">
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Saving...
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Create Template
            </>
          )}
        </Button>
      </div>

      {/* Add Custom Variable Dialog */}
      <Dialog open={customVariableDialogOpen} onOpenChange={setCustomVariableDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Variable</DialogTitle>
            <DialogDescription>Create a custom variable to use in your email template.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="variable-name" className="flex items-center justify-between">
                Variable Name
                {validationErrors.name && <span className="text-xs text-red-500">{validationErrors.name}</span>}
              </Label>
              <Input
                id="variable-name"
                placeholder="e.g., customerName"
                value={newVariable.name}
                onChange={(e) => setNewVariable({ ...newVariable, name: e.target.value })}
                className={validationErrors.name ? "border-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground">
                Use camelCase without spaces (e.g., firstName, companyName)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="variable-description" className="flex items-center justify-between">
                Description
                {validationErrors.description && (
                  <span className="text-xs text-red-500">{validationErrors.description}</span>
                )}
              </Label>
              <Input
                id="variable-description"
                placeholder="e.g., Customer's full name"
                value={newVariable.description}
                onChange={(e) => setNewVariable({ ...newVariable, description: e.target.value })}
                className={validationErrors.description ? "border-red-500" : ""}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setCustomVariableDialogOpen(false)
                setNewVariable({ name: "", description: "" })
                setValidationErrors({})
              }}
            >
              Cancel
            </Button>
            <Button onClick={addCustomVariable} className="bg-purple-600 hover:bg-purple-700">
              Add Variable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Test Email Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>Send a test email using this template.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="test-email" className="text-sm font-medium">
                Recipient Email
              </label>
              <Input
                id="test-email"
                placeholder="Enter email address"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Template Information</p>
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm font-medium">{template.name}</p>
                <p className="text-sm text-gray-500">Subject: {template.subject}</p>
                <p className="text-sm text-gray-500">Category: {template.category}</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={() => setSendDialogOpen(false)} disabled={isSending}>
              Cancel
            </Button>
            <Button
              onClick={handleSendTest}
              disabled={isSending || !testEmail}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Test Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
