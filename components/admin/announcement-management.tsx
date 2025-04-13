"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Edit, EyeIcon, Filter, MoreHorizontal, Search, SendIcon, Trash2, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type AnnouncementType = {
  id: string
  title: string
  content: string
  date: string
  author: {
    name: string
    initials: string
    image: string
  }
  audience: "All Workers" | "Admins" | "Managers" | "Assembly" | "Packaging" | "Maintenance"
  priority: "High" | "Medium" | "Low"
  status: "Draft" | "Published" | "Scheduled"
  readCount: number
  totalRecipients: number
}

const announcements: AnnouncementType[] = [
  {
    id: "ANN-1001",
    title: "Updated Safety Protocols",
    content:
      "Due to recent incidents, we are implementing new safety measures across all departments. Please review the attached documents and attend the mandatory safety training session.",
    date: "2023-03-15T10:30:00Z",
    author: {
      name: "Solomon Abebe",
      initials: "SA",
      image: "",
    },
    audience: "All Workers",
    priority: "High",
    status: "Published",
    readCount: 87,
    totalRecipients: 112,
  },
  {
    id: "ANN-1002",
    title: "New Equipment Training",
    content:
      "The new packaging machines will be installed next week. All packaging department workers must attend the training sessions scheduled for Monday and Tuesday.",
    date: "2023-03-14T09:15:00Z",
    author: {
      name: "Tigist Haile",
      initials: "TH",
      image: "",
    },
    audience: "Packaging",
    priority: "Medium",
    status: "Published",
    readCount: 24,
    totalRecipients: 30,
  },
  {
    id: "ANN-1003",
    title: "Upcoming Maintenance Schedule",
    content:
      "The factory will undergo scheduled maintenance on Saturday, March 20th. Please review the attached schedule for department-specific downtime.",
    date: "2023-03-16T08:00:00Z",
    author: {
      name: "Solomon Abebe",
      initials: "SA",
      image: "",
    },
    audience: "All Workers",
    priority: "Medium",
    status: "Scheduled",
    readCount: 0,
    totalRecipients: 112,
  },
  {
    id: "ANN-1004",
    title: "Changes to Attendance Policy",
    content:
      "Effective April 1st, there will be changes to the attendance and time-off request policies. Please review the updated handbook.",
    date: "2023-03-12T14:45:00Z",
    author: {
      name: "Solomon Abebe",
      initials: "SA",
      image: "",
    },
    audience: "All Workers",
    priority: "Low",
    status: "Draft",
    readCount: 0,
    totalRecipients: 112,
  },
  {
    id: "ANN-1005",
    title: "Assembly Line Shutdown",
    content:
      "Due to supply chain issues, Assembly Line A will be temporarily shutting down for 2 days. Workers will be reassigned to other departments.",
    date: "2023-03-11T11:30:00Z",
    author: {
      name: "Dawit Mekonnen",
      initials: "DM",
      image: "",
    },
    audience: "Assembly",
    priority: "High",
    status: "Published",
    readCount: 42,
    totalRecipients: 45,
  },
]

export function AnnouncementManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [authorFilter, setAuthorFilter] = useState("All Authors")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  const filteredAnnouncements = announcements.filter((announcement) => {
    let statusMatch = true
    if (activeTab === "published") statusMatch = announcement.status === "Published"
    else if (activeTab === "drafts") statusMatch = announcement.status === "Draft"
    else if (activeTab === "scheduled") statusMatch = announcement.status === "Scheduled"

    const searchMatch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())

    const authorMatch = authorFilter === "All Authors" || announcement.author.name === authorFilter

    const priorityMatch = priorityFilter === "All Priorities" || announcement.priority === priorityFilter

    return statusMatch && searchMatch && authorMatch && priorityMatch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  // Get unique authors for filtering
  const authors = ["All Authors", ...new Set(announcements.map((a) => a.author.name))]
  const priorities = ["All Priorities", "High", "Medium", "Low"]

  return (
    <div className="space-y-6">
      <Card className="border-gold-400/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Announcement Management</CardTitle>
              <CardDescription>Create, edit, and track company-wide announcements</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="gold">Create Announcement</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
                    className="pl-8 min-w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={authorFilter} onValueChange={setAuthorFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-gold-400/20 hover:border-gold-400/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                          {announcement.status === "Draft" && <Badge variant="outline">Draft</Badge>}
                          {announcement.status === "Scheduled" && <Badge variant="secondary">Scheduled</Badge>}
                        </div>
                        <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        <CardDescription>
                          {formatDate(announcement.date)} • For {announcement.audience}
                        </CardDescription>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          {announcement.status === "Draft" && (
                            <DropdownMenuItem>
                              <SendIcon className="mr-2 h-4 w-4" /> Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2 mb-4">{announcement.content}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={announcement.author.image || "/placeholder.svg"}
                            alt={announcement.author.name}
                          />
                          <AvatarFallback className="bg-gold-400 text-black">
                            {announcement.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{announcement.author.name}</span>
                      </div>

                      {announcement.status === "Published" && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <div className="flex items-center gap-1">
                            <span>Read by</span>
                            <span className="font-medium">{announcement.readCount}</span>
                            <span>of</span>
                            <span className="font-medium">{announcement.totalRecipients}</span>
                            <span>recipients</span>
                          </div>
                          <div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold-400"
                              style={{
                                width: `${(announcement.readCount / announcement.totalRecipients) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-0">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      {announcement.status === "Published" && (
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      )}
                      {announcement.status === "Draft" && (
                        <Button variant="gold" size="sm">
                          Publish Now
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {filteredAnnouncements.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <SendIcon className="h-12 w-12 text-gold-400 mb-4" />
                  <h3 className="text-xl font-medium">No announcements found</h3>
                  <p className="text-muted-foreground mt-2">
                    There are no announcements matching your search criteria.
                  </p>
                  <Button variant="gold" className="mt-6">
                    Create New Announcement
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">Announcement Stats</CardTitle>
            <CardDescription>Current metrics and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Announcements:</span>
                <span className="font-medium">{announcements.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Published:</span>
                <span className="font-medium">{announcements.filter((a) => a.status === "Published").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Drafts:</span>
                <span className="font-medium">{announcements.filter((a) => a.status === "Draft").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Scheduled:</span>
                <span className="font-medium">{announcements.filter((a) => a.status === "Scheduled").length}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gold-400/20 mt-2">
                <span className="text-sm">Average Read Rate:</span>
                <span className="font-medium text-gold-400">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">Quick Announcement</CardTitle>
            <CardDescription>Send a simple message to all workers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Announcement Title" />
              <Input placeholder="Brief message" className="h-20" />
              <Select defaultValue="All Workers">
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Workers">All Workers</SelectItem>
                  <SelectItem value="Assembly">Assembly Department</SelectItem>
                  <SelectItem value="Packaging">Packaging Department</SelectItem>
                  <SelectItem value="Maintenance">Maintenance Team</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="gold" className="w-full">
                <SendIcon className="mr-2 h-4 w-4" />
                Send Quick Announcement
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-gold-400">Recent Performance</CardTitle>
            <CardDescription>Announcement engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Safety Protocols</span>
                  <span className="text-sm font-medium text-green-500">78%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Equipment Training</span>
                  <span className="text-sm font-medium text-gold-400">80%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gold-400 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Assembly Line Shutdown</span>
                  <span className="text-sm font-medium text-green-500">93%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "93%" }}></div>
                </div>
              </div>

              <div className="flex items-center justify-center p-2 rounded-md bg-gold-400/10 gap-2 mt-2">
                <CheckCircle2 className="h-4 w-4 text-gold-400" />
                <span className="text-sm">High priority announcements get 22% more reads</span>
              </div>

              <Button variant="outline" className="w-full">
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
