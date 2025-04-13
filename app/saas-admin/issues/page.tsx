"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building,
  Tag,
  Plus,
  Download,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for issues
const issues = [
  {
    id: "ISS-1001",
    title: "Payroll calculation error for overtime hours",
    description: "The system is not correctly calculating overtime hours for night shift workers.",
    status: "Open",
    priority: "High",
    category: "Payroll",
    factory: "Abyssinia Textiles",
    reportedBy: "Abebe Kebede",
    reportedAt: "Apr 2, 2023",
    assignedTo: "Support Team",
    comments: 3,
  },
  {
    id: "ISS-1002",
    title: "Unable to upload worker profile images",
    description: "Factory admin cannot upload new profile images for workers.",
    status: "In Progress",
    priority: "Medium",
    category: "User Management",
    factory: "Habesha Garments",
    reportedBy: "Dawit Mekonnen",
    reportedAt: "Apr 1, 2023",
    assignedTo: "Development Team",
    comments: 5,
  },
  {
    id: "ISS-1003",
    title: "Report generation timeout for large factories",
    description: "Monthly attendance reports time out when generating for factories with over 300 workers.",
    status: "Open",
    priority: "High",
    category: "Reporting",
    factory: "Ethio Leather",
    reportedBy: "Solomon Girma",
    reportedAt: "Mar 28, 2023",
    assignedTo: "Unassigned",
    comments: 2,
  },
  {
    id: "ISS-1004",
    title: "Mobile app crashes when viewing shift schedule",
    description: "The mobile app crashes when workers try to view their upcoming shift schedule.",
    status: "In Progress",
    priority: "High",
    category: "Mobile App",
    factory: "Sheba Foods",
    reportedBy: "Yonas Bekele",
    reportedAt: "Mar 25, 2023",
    assignedTo: "Mobile Team",
    comments: 7,
  },
  {
    id: "ISS-1005",
    title: "Email notifications not being sent for leave approvals",
    description: "Workers are not receiving email notifications when their leave requests are approved.",
    status: "Open",
    priority: "Medium",
    category: "Notifications",
    factory: "Addis Construction",
    reportedBy: "Rahel Tesfaye",
    reportedAt: "Mar 20, 2023",
    assignedTo: "Support Team",
    comments: 1,
  },
  {
    id: "ISS-1006",
    title: "Dashboard statistics showing incorrect attendance data",
    description: "The attendance overview on the admin dashboard is showing incorrect numbers.",
    status: "Resolved",
    priority: "Medium",
    category: "Dashboard",
    factory: "Tigray Metals",
    reportedBy: "Henok Assefa",
    reportedAt: "Mar 15, 2023",
    assignedTo: "Data Team",
    comments: 4,
  },
  {
    id: "ISS-1007",
    title: "NFC card scanner not working with new Android devices",
    description: "The NFC card scanner feature is not compatible with newer Android devices.",
    status: "Resolved",
    priority: "High",
    category: "Hardware",
    factory: "Awash Winery",
    reportedBy: "Kidist Tadesse",
    reportedAt: "Mar 10, 2023",
    assignedTo: "Hardware Team",
    comments: 6,
  },
  {
    id: "ISS-1008",
    title: "Incorrect tax calculation for annual bonuses",
    description: "The system is applying the wrong tax rate for annual performance bonuses.",
    status: "Open",
    priority: "High",
    category: "Payroll",
    factory: "Dire Dawa Cement",
    reportedBy: "Bereket Alemu",
    reportedAt: "Mar 5, 2023",
    assignedTo: "Finance Team",
    comments: 3,
  },
]

export default function IssuesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "General",
    factory: "",
  })
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")

  // Filter issues based on search query and active tab
  const filteredIssues = issues
    .filter((issue) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          issue.id.toLowerCase().includes(query) ||
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query) ||
          issue.factory.toLowerCase().includes(query) ||
          issue.category.toLowerCase().includes(query) ||
          issue.reportedBy.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((issue) => {
      // Filter by tab
      if (activeTab === "all") return true
      if (activeTab === "open") return issue.status === "Open"
      if (activeTab === "in-progress") return issue.status === "In Progress"
      if (activeTab === "resolved") return issue.status === "Resolved"
      return true
    })

  const handleIssueAction = (action: string, issueId: string) => {
    const issue = issues.find((i) => i.id === issueId)

    switch (action) {
      case "view":
        setSelectedIssue(issueId)
        toast({
          title: "Viewing Issue",
          description: `Viewing details for issue ${issueId}`,
        })
        break
      case "assign":
        toast({
          title: "Assign Issue",
          description: `Opening assignment dialog for issue ${issueId}`,
        })
        break
      case "resolve":
        toast({
          title: "Issue Resolved",
          description: `Issue ${issueId} has been marked as resolved`,
          variant: "default",
        })
        break
      case "reopen":
        toast({
          title: "Issue Reopened",
          description: `Issue ${issueId} has been reopened`,
          variant: "default",
        })
        break
    }
  }

  const handleCreateIssue = () => {
    // Validate form
    if (!newIssue.title || !newIssue.description || !newIssue.factory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create issue
    toast({
      title: "Issue Created",
      description: `New issue "${newIssue.title}" has been created`,
    })

    // Reset form and close dialog
    setNewIssue({
      title: "",
      description: "",
      priority: "Medium",
      category: "General",
      factory: "",
    })
    setIsDialogOpen(false)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Comment Added",
      description: "Your comment has been added to the issue",
    })

    setCommentText("")
  }

  const handleExportIssues = () => {
    toast({
      title: "Exporting Issues",
      description: "Issue data is being exported to CSV",
    })
  }

  return (
    <DashboardShell
      title="Issue Management"
      description="Track and resolve software issues and bug reports"
      headerAction={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" /> Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Report New Issue</DialogTitle>
              <DialogDescription>Provide details about the issue you're experiencing.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Issue Title
                </label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Detailed Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Provide as much detail as possible"
                  rows={4}
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select
                    value={newIssue.priority}
                    onValueChange={(value) => setNewIssue({ ...newIssue, priority: value })}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select
                    value={newIssue.category}
                    onValueChange={(value) => setNewIssue({ ...newIssue, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Payroll">Payroll</SelectItem>
                      <SelectItem value="User Management">User Management</SelectItem>
                      <SelectItem value="Reporting">Reporting</SelectItem>
                      <SelectItem value="Mobile App">Mobile App</SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="factory" className="text-sm font-medium">
                  Factory
                </label>
                <Select
                  value={newIssue.factory}
                  onValueChange={(value) => setNewIssue({ ...newIssue, factory: value })}
                >
                  <SelectTrigger id="factory">
                    <SelectValue placeholder="Select factory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Abyssinia Textiles">Abyssinia Textiles</SelectItem>
                    <SelectItem value="Habesha Garments">Habesha Garments</SelectItem>
                    <SelectItem value="Ethio Leather">Ethio Leather</SelectItem>
                    <SelectItem value="Sheba Foods">Sheba Foods</SelectItem>
                    <SelectItem value="Addis Construction">Addis Construction</SelectItem>
                    <SelectItem value="Tigray Metals">Tigray Metals</SelectItem>
                    <SelectItem value="Awash Winery">Awash Winery</SelectItem>
                    <SelectItem value="Dire Dawa Cement">Dire Dawa Cement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateIssue}>
                Submit Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search issues..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportIssues}>
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Issues</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden">
                <div
                  className={`h-1 ${
                    issue.priority === "High"
                      ? "bg-red-600"
                      : issue.priority === "Medium"
                        ? "bg-orange-600"
                        : "bg-blue-600"
                  }`}
                />
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">{issue.id}</span>
                        <Badge
                          className={
                            issue.status === "Open"
                              ? "bg-yellow-600"
                              : issue.status === "In Progress"
                                ? "bg-blue-600"
                                : "bg-green-600"
                          }
                        >
                          {issue.status}
                        </Badge>
                        <Badge
                          className={
                            issue.priority === "High"
                              ? "bg-red-600"
                              : issue.priority === "Medium"
                                ? "bg-orange-600"
                                : "bg-blue-600"
                          }
                        >
                          {issue.priority}
                        </Badge>
                      </div>
                      <h3 className="font-medium text-lg mb-2">{issue.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{issue.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{issue.reportedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{issue.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          <span>{issue.factory}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>{issue.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{issue.comments} comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => handleIssueAction("view", issue.id)}
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => handleIssueAction("assign", issue.id)}
                      >
                        <User className="h-3 w-3" />
                        <span>{issue.assignedTo === "Unassigned" ? "Assign" : "Reassign"}</span>
                      </Button>
                      {issue.status !== "Resolved" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-green-600"
                          onClick={() => handleIssueAction("resolve", issue.id)}
                        >
                          <CheckCircle className="h-3 w-3" />
                          <span>Resolve</span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1 text-yellow-600"
                          onClick={() => handleIssueAction("reopen", issue.id)}
                        >
                          <AlertCircle className="h-3 w-3" />
                          <span>Reopen</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No issues found.</p>
            </div>
          )}
        </div>

        {selectedIssue && (
          <Dialog open={!!selectedIssue} onOpenChange={(open) => !open && setSelectedIssue(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Issue Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{issues.find((i) => i.id === selectedIssue)?.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-500">{selectedIssue}</span>
                    <Badge
                      className={
                        issues.find((i) => i.id === selectedIssue)?.status === "Open"
                          ? "bg-yellow-600"
                          : issues.find((i) => i.id === selectedIssue)?.status === "In Progress"
                            ? "bg-blue-600"
                            : "bg-green-600"
                      }
                    >
                      {issues.find((i) => i.id === selectedIssue)?.status}
                    </Badge>
                    <Badge
                      className={
                        issues.find((i) => i.id === selectedIssue)?.priority === "High"
                          ? "bg-red-600"
                          : issues.find((i) => i.id === selectedIssue)?.priority === "Medium"
                            ? "bg-orange-600"
                            : "bg-blue-600"
                      }
                    >
                      {issues.find((i) => i.id === selectedIssue)?.priority}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm">{issues.find((i) => i.id === selectedIssue)?.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Reported By</p>
                    <p className="font-medium">{issues.find((i) => i.id === selectedIssue)?.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reported At</p>
                    <p className="font-medium">{issues.find((i) => i.id === selectedIssue)?.reportedAt}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Factory</p>
                    <p className="font-medium">{issues.find((i) => i.id === selectedIssue)?.factory}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium">{issues.find((i) => i.id === selectedIssue)?.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Assigned To</p>
                    <p className="font-medium">{issues.find((i) => i.id === selectedIssue)?.assignedTo}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Comments</h4>
                  <div className="space-y-2 mb-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Support Team</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <p className="text-sm">We're looking into this issue and will update you soon.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Development Team</p>
                        <p className="text-xs text-gray-500">12 hours ago</p>
                      </div>
                      <p className="text-sm">
                        This appears to be related to the recent update. We're working on a fix.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddComment}>
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardShell>
  )
}
