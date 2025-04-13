"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, UserCog, BarChart3, Plus, Search, Edit, Trash2, Send, Eye, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"

// Email template types
type EmailCategory = "account" | "worker" | "admin" | "owner" | "marketing" | "system"
type EmailTemplate = {
  id: string
  name: string
  subject: string
  category: EmailCategory
  lastEdited: string
  createdAt: string
  active: boolean
}

export default function EmailsPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Mock data and state
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to Rona Workforce Management",
      category: "account",
      lastEdited: "2 days ago",
      createdAt: "2023-04-01",
      active: true,
    },
    {
      id: "2",
      name: "Password Reset",
      subject: "Reset Your Rona Password",
      category: "account",
      lastEdited: "5 days ago",
      createdAt: "2023-03-15",
      active: true,
    },
    {
      id: "3",
      name: "Account Verification",
      subject: "Verify Your Rona Account",
      category: "account",
      lastEdited: "1 week ago",
      createdAt: "2023-03-10",
      active: true,
    },
    {
      id: "4",
      name: "Shift Assignment",
      subject: "New Shift Assignment",
      category: "worker",
      lastEdited: "3 days ago",
      createdAt: "2023-03-20",
      active: true,
    },
    {
      id: "5",
      name: "Leave Request Approved",
      subject: "Your Leave Request Has Been Approved",
      category: "worker",
      lastEdited: "4 days ago",
      createdAt: "2023-03-18",
      active: true,
    },
    {
      id: "6",
      name: "Payroll Notification",
      subject: "Your Payroll Has Been Processed",
      category: "worker",
      lastEdited: "2 days ago",
      createdAt: "2023-04-02",
      active: true,
    },
    {
      id: "7",
      name: "New Worker Onboarded",
      subject: "New Worker Onboarding Complete",
      category: "admin",
      lastEdited: "1 day ago",
      createdAt: "2023-04-05",
      active: true,
    },
    {
      id: "8",
      name: "Weekly Performance Report",
      subject: "Weekly Factory Performance Report",
      category: "admin",
      lastEdited: "5 days ago",
      createdAt: "2023-03-25",
      active: true,
    },
    {
      id: "9",
      name: "Subscription Renewal",
      subject: "Your Rona Subscription is Due for Renewal",
      category: "owner",
      lastEdited: "3 days ago",
      createdAt: "2023-03-30",
      active: true,
    },
    {
      id: "10",
      name: "New Feature Announcement",
      subject: "Exciting New Features in Rona",
      category: "marketing",
      lastEdited: "1 week ago",
      createdAt: "2023-03-05",
      active: true,
    },
    {
      id: "11",
      name: "System Maintenance",
      subject: "Scheduled Maintenance Notification",
      category: "system",
      lastEdited: "2 weeks ago",
      createdAt: "2023-02-28",
      active: true,
    },
  ])

  // UI state
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<EmailTemplate | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [templateToSend, setTemplateToSend] = useState<EmailTemplate | null>(null)
  const [testEmail, setTestEmail] = useState("")
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [templateToPreview, setTemplateToPreview] = useState<EmailTemplate | null>(null)

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter(
    (template) =>
      (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "all" || template.category === categoryFilter),
  )

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTemplates = filteredTemplates.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)

  // Count templates by category
  const accountEmails = templates.filter((t) => t.category === "account").length
  const workerEmails = templates.filter((t) => t.category === "worker").length
  const adminEmails = templates.filter((t) => t.category === "admin").length
  const ownerEmails = templates.filter((t) => t.category === "owner").length
  const marketingEmails = templates.filter((t) => t.category === "marketing").length
  const systemEmails = templates.filter((t) => t.category === "system").length

  // Get recent templates (last 3)
  const recentTemplates = [...templates]
    .sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime())
    .slice(0, 3)

  // Handle template deletion
  const confirmDelete = (template: EmailTemplate) => {
    setTemplateToDelete(template)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (!templateToDelete) return

    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setTemplates(templates.filter((t) => t.id !== templateToDelete.id))
      setIsDeleting(false)
      setDeleteDialogOpen(false)

      toast({
        title: "Template deleted",
        description: `${templateToDelete.name} has been deleted successfully.`,
        variant: "default",
      })
    }, 1000)
  }

  // Handle test send
  const openSendDialog = (template: EmailTemplate) => {
    setTemplateToSend(template)
    setTestEmail("")
    setSendDialogOpen(true)
  }

  const handleSendTest = () => {
    if (!templateToSend || !testEmail) return

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

      toast({
        title: "Test email sent",
        description: `${templateToSend.name} has been sent to ${testEmail}.`,
        variant: "default",
      })
    }, 1500)
  }

  // Handle preview
  const openPreviewDialog = (template: EmailTemplate) => {
    setTemplateToPreview(template)
    setPreviewDialogOpen(true)
  }

  // Handle template status toggle
  const toggleTemplateStatus = (id: string) => {
    setTemplates(
      templates.map((template) => (template.id === id ? { ...template, active: !template.active } : template)),
    )

    const template = templates.find((t) => t.id === id)
    if (template) {
      toast({
        title: template.active ? "Template deactivated" : "Template activated",
        description: `${template.name} has been ${template.active ? "deactivated" : "activated"}.`,
        variant: "default",
      })
    }
  }

  // Navigation
  const goToCreateTemplate = () => {
    router.push("/saas-admin/emails/create")
  }

  const goToEditTemplate = (id: string) => {
    router.push(`/saas-admin/emails/${id}`)
  }

  const goToCategory = (category: EmailCategory | "all") => {
    setCategoryFilter(category)
    setCurrentPage(1)
  }

  return (
    <DashboardShell
      title="Email Templates"
      description="Manage and create email templates for your Rona system"
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={goToCreateTemplate}>
          <Plus className="mr-2 h-4 w-4" /> Create New Template
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
              <h3 className="text-2xl font-bold">{templates.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="rounded-full bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Emails</p>
              <h3 className="text-2xl font-bold">{accountEmails}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="rounded-full bg-purple-100 p-3">
              <UserCog className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Worker Emails</p>
              <h3 className="text-2xl font-bold">{workerEmails}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center gap-4 p-6">
            <div className="rounded-full bg-amber-100 p-3">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admin & Marketing</p>
              <h3 className="text-2xl font-bold">{adminEmails + marketingEmails}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Templates and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-7 mt-6">
        {/* Recent Templates */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="text-xl text-purple-600">Recent Templates</CardTitle>
            <CardDescription>Your most recently created or modified templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 rounded-md bg-purple-50">
                  <div>
                    <p className="font-medium text-purple-600">{template.name}</p>
                    <p className="text-sm text-muted-foreground">Last edited: {template.lastEdited}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize border-purple-200 text-purple-600">
                      {template.category} Email
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => goToEditTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="ghost"
                className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                onClick={() => {
                  setCategoryFilter("all")
                  setSearchQuery("")
                  setCurrentPage(1)
                }}
              >
                View all templates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl text-purple-600">Quick Actions</CardTitle>
            <CardDescription>Common tasks you may want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={goToCreateTemplate}>
                <Plus className="mr-2 h-4 w-4" /> Create New Template
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="border-gray-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => goToCategory("account")}
                >
                  Account Emails
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => goToCategory("worker")}
                >
                  Worker Emails
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => goToCategory("admin")}
                >
                  Admin Emails
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-200 text-purple-600 hover:bg-purple-50"
                  onClick={() => goToCategory("marketing")}
                >
                  Marketing Emails
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Templates List */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl text-purple-600">All Email Templates</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-8 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[140px] border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Name</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Subject</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Category</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Last Edited</th>
                    <th className="h-12 px-4 text-left font-medium text-gray-500">Status</th>
                    <th className="h-12 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTemplates.length > 0 ? (
                    currentTemplates.map((template) => (
                      <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{template.name}</td>
                        <td className="p-4 text-gray-700">{template.subject}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="capitalize border-purple-200 text-purple-600">
                            {template.category}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-700">{template.lastEdited}</td>
                        <td className="p-4">
                          <Badge
                            variant={template.active ? "default" : "secondary"}
                            className={template.active ? "bg-green-600" : ""}
                          >
                            {template.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => goToEditTemplate(template.id)}
                              title="Edit template"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openPreviewDialog(template)}
                              title="Preview template"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openSendDialog(template)}
                              title="Send test email"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleTemplateStatus(template.id)}
                              title={template.active ? "Deactivate template" : "Activate template"}
                            >
                              <CheckCircle
                                className={`h-4 w-4 ${template.active ? "text-green-500" : "text-gray-400"}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => confirmDelete(template)}
                              title="Delete template"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-500">
                        No templates found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {currentTemplates.length} of {filteredTemplates.length} templates
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {Math.max(1, totalPages)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the template "{templateToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Deleting...
                </span>
              ) : (
                "Delete Template"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Test Email Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>Send a test email using the "{templateToSend?.name}" template.</DialogDescription>
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
                <p className="text-sm font-medium">{templateToSend?.name}</p>
                <p className="text-sm text-gray-500">Subject: {templateToSend?.subject}</p>
                <p className="text-sm text-gray-500">Category: {templateToSend?.category}</p>
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

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>Preview of the "{templateToPreview?.name}" template.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="rounded-md border p-4">
              <div className="mb-4 border-b pb-2">
                <p className="text-sm font-medium">From: Rona Workforce Management &lt;no-reply@rona.com&gt;</p>
                <p className="text-sm font-medium">To: [Recipient] &lt;recipient@example.com&gt;</p>
                <p className="text-sm font-medium">Subject: {templateToPreview?.subject}</p>
              </div>

              {/* This is a simplified preview. In a real app, you would render the actual template content */}
              <div className="prose prose-sm max-w-none">
                {templateToPreview?.category === "account" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>Welcome to Rona Workforce Management! We're excited to have you on board.</p>
                    <p>
                      Your account has been successfully created and is now ready to use. Here are your account details:
                    </p>
                    <ul>
                      <li>
                        <strong>Username:</strong> [Email]
                      </li>
                      <li>
                        <strong>Factory:</strong> [Factory]
                      </li>
                      <li>
                        <strong>Role:</strong> [Role]
                      </li>
                    </ul>
                    <p>To get started, please log in to your account using the button below:</p>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                      <a
                        href="#"
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          backgroundColor: "#8b5cf6",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "4px",
                        }}
                      >
                        Log In to Your Account
                      </a>
                    </div>
                    <p>
                      If you have any questions or need assistance, please don't hesitate to contact our support team.
                    </p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}

                {templateToPreview?.category === "worker" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>This is an important notification regarding your work at [Factory].</p>
                    <p>
                      Your shift schedule has been updated for the upcoming week. Please log in to your account to view
                      the details.
                    </p>
                    <p>If you have any questions, please contact your supervisor.</p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}

                {templateToPreview?.category === "admin" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>This is an important notification for administrators of [Factory].</p>
                    <p>
                      There have been updates to the worker schedules and attendance records that require your
                      attention.
                    </p>
                    <p>Please log in to your admin dashboard to review and approve these changes.</p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}

                {templateToPreview?.category === "owner" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>This is an important notification for owners of [Factory].</p>
                    <p>Your monthly performance report is now available. Key metrics show [Performance Summary].</p>
                    <p>Please log in to your dashboard to view the complete report and analytics.</p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}

                {templateToPreview?.category === "marketing" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>We have some exciting updates to share with you about Rona Workforce Management.</p>
                    <p>
                      We've recently launched several new features that will help streamline your workforce management:
                    </p>
                    <ul>
                      <li>Enhanced reporting capabilities</li>
                      <li>Improved shift scheduling interface</li>
                      <li>New mobile app features for workers</li>
                    </ul>
                    <p>Log in today to explore these new features!</p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}

                {templateToPreview?.category === "system" && (
                  <div>
                    <p>Dear [Name],</p>
                    <p>This is an important system notification from Rona Workforce Management.</p>
                    <p>
                      We will be performing scheduled maintenance on our servers on [Date] from [Start Time] to [End
                      Time].
                    </p>
                    <p>
                      During this time, the system may be temporarily unavailable. We apologize for any inconvenience
                      this may cause.
                    </p>
                    <p>
                      Best regards,
                      <br />
                      The Rona Team
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
