"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { ListTodo, CheckCircle2, Clock, AlertTriangle, Search, SlidersHorizontal, CheckCheck, Plus } from "lucide-react"

export default function AdminTasksPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    // Check if user is logged in as admin
    const storedUser = localStorage.getItem("rona_user")
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user || user.role !== "admin") {
      toast({
        title: language === "en" ? "Access denied" : "መዳረሻ ተከልክሏል",
        description: language === "en" ? "You must be logged in as an admin" : "እንደ አስተዳዳሪ መግባት አለብዎት",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast, language])

  // Mock tasks data
  const tasks = [
    {
      id: "TASK-001",
      title: "Review shift schedule for next week",
      priority: "high",
      status: "pending",
      dueDate: "2023-04-18",
      assignedBy: "Dawit Mengistu",
      description: "Review and approve the shift schedule for the manufacturing department for next week",
    },
    {
      id: "TASK-002",
      title: "Conduct safety training for new employees",
      priority: "medium",
      status: "completed",
      dueDate: "2023-04-15",
      assignedBy: "Dawit Mengistu",
      description: "Conduct safety training session for 5 new employees in the packaging department",
      completedDate: "2023-04-15",
    },
    {
      id: "TASK-003",
      title: "Prepare monthly attendance report",
      priority: "high",
      status: "pending",
      dueDate: "2023-04-20",
      assignedBy: "Dawit Mengistu",
      description: "Compile and prepare the monthly attendance report for all departments",
    },
    {
      id: "TASK-004",
      title: "Investigate equipment malfunction",
      priority: "urgent",
      status: "in-progress",
      dueDate: "2023-04-17",
      assignedBy: "Dawit Mengistu",
      description: "Investigate the reported malfunction of packaging machine #3 and coordinate repairs",
    },
    {
      id: "TASK-005",
      title: "Update employee handbook",
      priority: "low",
      status: "pending",
      dueDate: "2023-04-30",
      assignedBy: "Dawit Mengistu",
      description: "Update the employee handbook with new policies and procedures",
    },
    {
      id: "TASK-006",
      title: "Organize team building event",
      priority: "medium",
      status: "in-progress",
      dueDate: "2023-05-10",
      assignedBy: "Dawit Mengistu",
      description: "Plan and organize a team building event for all factory employees",
    },
    {
      id: "TASK-007",
      title: "Review overtime requests",
      priority: "high",
      status: "completed",
      dueDate: "2023-04-14",
      assignedBy: "Dawit Mengistu",
      description: "Review and approve overtime requests for the weekend shift",
      completedDate: "2023-04-14",
    },
    {
      id: "TASK-008",
      title: "Prepare quarterly safety report",
      priority: "high",
      status: "pending",
      dueDate: "2023-04-25",
      assignedBy: "Dawit Mengistu",
      description: "Compile safety incidents and prepare quarterly safety report for management",
    },
  ]

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "pending" && task.status === "pending") ||
      (activeTab === "in-progress" && task.status === "in-progress") ||
      (activeTab === "completed" && task.status === "completed")

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesStatus && matchesSearch && matchesPriority
  })

  // Handle task completion
  const handleCompleteTask = (taskId) => {
    toast({
      title: language === "en" ? "Task Completed" : "ተግባሩ ተጠናቋል",
      description: language === "en" ? `Task ${taskId} has been marked as completed` : `ተግባር ${taskId} እንደተጠናቀቀ ተምልክቷል`,
      variant: "default",
    })
  }

  // Get counts for statistics
  const pendingCount = tasks.filter((t) => t.status === "pending").length
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length
  const completedCount = tasks.filter((t) => t.status === "completed").length
  const urgentCount = tasks.filter(
    (t) => t.priority === "urgent" && (t.status === "pending" || t.status === "in-progress"),
  ).length

  return (
    <DashboardShell
      title={language === "en" ? "Administrative Tasks" : "አስተዳደራዊ ተግባራት"}
      description={language === "en" ? "Manage and track administrative tasks" : "አስተዳደራዊ ተግባራትን ያስተዳድሩ እና ይከታተሉ"}
      headerAction={
        <Button variant="purple" className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          {language === "en" ? "Create Task" : "ተግባር ፍጠር"}
        </Button>
      }
    >
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                {language === "en" ? "Pending Tasks" : "በመጠባበቅ ላይ ያሉ ተግባራት"}
              </p>
              <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">{pendingCount}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                {language === "en" ? "Not started" : "ያልተጀመሩ"}
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800/50 p-3 rounded-full">
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {language === "en" ? "In Progress" : "በሂደት ላይ ያሉ"}
              </p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{inProgressCount}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">
                {language === "en" ? "Currently working" : "በአሁኑ ጊዜ በሥራ ላይ"}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
              <ListTodo className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                {language === "en" ? "Completed Tasks" : "የተጠናቀቁ ተግባራት"}
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">{completedCount}</p>
              <p className="text-sm text-green-600 dark:text-green-500">
                {language === "en" ? "This month" : "በዚህ ወር"}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {language === "en" ? "Urgent Tasks" : "አስቸኳይ ተግባራት"}
              </p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-400">{urgentCount}</p>
              <p className="text-sm text-red-600 dark:text-red-500">
                {language === "en" ? "Need attention" : "ትኩረት የሚፈልጉ"}
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-800/50 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {language === "en" ? "Pending" : "በመጠባበቅ ላይ"}
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            {language === "en" ? "In Progress" : "በሂደት ላይ"}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {language === "en" ? "Completed" : "የተጠናቀቁ"}
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            {language === "en" ? "All Tasks" : "ሁሉም ተግባራት"}
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-6 space-y-6">
          {/* Tasks Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{language === "en" ? "Administrative Tasks" : "አስተዳደራዊ ተግባራት"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Manage and track your tasks" : "ተግባራትዎን ያስተዳድሩ እና ይከታተሉ"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={language === "en" ? "Search tasks..." : "ተግባራትን ይፈልጉ..."}
                      className="pl-8 pr-4 py-2 border rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <SlidersHorizontal className="h-4 w-4" />
                      {language === "en" ? "Priority" : "ቅድሚያ"}
                    </Button>
                    <select
                      className="border rounded-md px-2 py-1"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <option value="all">{language === "en" ? "All Priorities" : "ሁሉም ቅድሚያዎች"}</option>
                      <option value="urgent">{language === "en" ? "Urgent" : "አስቸኳይ"}</option>
                      <option value="high">{language === "en" ? "High" : "ከፍተኛ"}</option>
                      <option value="medium">{language === "en" ? "Medium" : "መካከለኛ"}</option>
                      <option value="low">{language === "en" ? "Low" : "ዝቅተኛ"}</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-3">
                          {task.priority === "urgent" ? (
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                          ) : task.priority === "high" ? (
                            <AlertTriangle className="h-5 w-5 text-orange-600 mt-1" />
                          ) : task.priority === "medium" ? (
                            <ListTodo className="h-5 w-5 text-blue-600 mt-1" />
                          ) : (
                            <ListTodo className="h-5 w-5 text-green-600 mt-1" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                {task.id}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  task.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : task.status === "in-progress"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                }`}
                              >
                                {task.status === "pending"
                                  ? language === "en"
                                    ? "Pending"
                                    : "በመጠባበቅ ላይ"
                                  : task.status === "in-progress"
                                    ? language === "en"
                                      ? "In Progress"
                                      : "በሂደት ላይ"
                                    : language === "en"
                                      ? "Completed"
                                      : "ተጠናቋል"}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  task.priority === "urgent"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    : task.priority === "high"
                                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                      : task.priority === "medium"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                }`}
                              >
                                {task.priority === "urgent"
                                  ? language === "en"
                                    ? "Urgent"
                                    : "አስቸኳይ"
                                  : task.priority === "high"
                                    ? language === "en"
                                      ? "High"
                                      : "ከፍተኛ"
                                    : task.priority === "medium"
                                      ? language === "en"
                                        ? "Medium"
                                        : "መካከለኛ"
                                      : language === "en"
                                        ? "Low"
                                        : "ዝቅተኛ"}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{task.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                              <span className="text-muted-foreground">
                                {language === "en" ? "Due Date: " : "የመጨረሻ ቀን: "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                              <span className="text-muted-foreground">
                                {language === "en" ? "Assigned By: " : "የተመደበው በ: "}
                                {task.assignedBy}
                              </span>
                              {task.completedDate && (
                                <span className="text-muted-foreground">
                                  {language === "en" ? "Completed On: " : "የተጠናቀቀበት ቀን: "}
                                  {new Date(task.completedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {(task.status === "pending" || task.status === "in-progress") && (
                          <div className="flex gap-2 ml-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              <CheckCheck className="mr-1 h-4 w-4" />
                              {language === "en" ? "Complete" : "አጠናቅቅ"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <AlertTriangle className="mx-auto h-6 w-6 text-yellow-600 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "No tasks found" : "ምንም ተግባራት አልተገኙም"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
