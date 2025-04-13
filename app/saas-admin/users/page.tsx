"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { UserStatistics } from "@/components/saas-admin/users/user-statistics"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Mail,
  Lock,
  ShieldAlert,
  UserX,
  Download,
  ArrowUpDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for users
const users = [
  {
    id: "user-001",
    name: "Abebe Kebede",
    email: "abebe.k@abyssiniatextiles.com",
    role: "Admin",
    factory: "Abyssinia Textiles",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "user-002",
    name: "Tigist Haile",
    email: "tigist.h@abyssiniatextiles.com",
    role: "Manager",
    factory: "Abyssinia Textiles",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "user-003",
    name: "Dawit Mekonnen",
    email: "dawit.m@habeshagarments.com",
    role: "Admin",
    factory: "Habesha Garments",
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "user-004",
    name: "Hiwot Tadesse",
    email: "hiwot.t@habeshagarments.com",
    role: "Worker",
    factory: "Habesha Garments",
    status: "Inactive",
    lastActive: "2 weeks ago",
  },
  {
    id: "user-005",
    name: "Solomon Girma",
    email: "solomon.g@ethioleather.com",
    role: "Admin",
    factory: "Ethio Leather",
    status: "Active",
    lastActive: "5 hours ago",
  },
  {
    id: "user-006",
    name: "Meron Alemu",
    email: "meron.a@ethioleather.com",
    role: "Manager",
    factory: "Ethio Leather",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "user-007",
    name: "Yonas Bekele",
    email: "yonas.b@shebafoods.com",
    role: "Admin",
    factory: "Sheba Foods",
    status: "Active",
    lastActive: "12 hours ago",
  },
  {
    id: "user-008",
    name: "Rahel Tesfaye",
    email: "rahel.t@addisconstruction.com",
    role: "Admin",
    factory: "Addis Construction",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: "user-009",
    name: "Henok Assefa",
    email: "henok.a@tigraymetal.com",
    role: "Manager",
    factory: "Tigray Metals",
    status: "Active",
    lastActive: "2 days ago",
  },
]

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortField, setSortField] = useState<"name" | "role" | "factory" | "lastActive">("name")

  // Filter users based on search query and active tab
  const filteredUsers = users
    .filter((user) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.factory.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((user) => {
      // Filter by tab
      if (activeTab === "all") return true
      if (activeTab === "active") return user.status === "Active"
      if (activeTab === "inactive") return user.status === "Inactive"
      if (activeTab === "pending") return user.status === "Pending"
      return true
    })
    .sort((a, b) => {
      // Sort by selected field
      const fieldA = a[sortField].toLowerCase()
      const fieldB = b[sortField].toLowerCase()

      if (sortOrder === "asc") {
        return fieldA.localeCompare(fieldB)
      } else {
        return fieldB.localeCompare(fieldA)
      }
    })

  const handleSort = (field: "name" | "role" | "factory" | "lastActive") => {
    if (sortField === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleUserAction = (action: string, userId: string) => {
    const user = users.find((u) => u.id === userId)

    switch (action) {
      case "invite":
        toast({
          title: "Invitation Sent",
          description: `Invitation sent to ${user?.name}`,
        })
        break
      case "reset":
        toast({
          title: "Password Reset",
          description: `Password reset link sent to ${user?.email}`,
        })
        break
      case "permissions":
        toast({
          title: "Edit Permissions",
          description: `Opening permissions editor for ${user?.name}`,
        })
        break
      case "suspend":
        toast({
          title: "User Suspended",
          description: `${user?.name} has been suspended`,
          variant: "destructive",
        })
        break
    }
  }

  const handleCreateUser = () => {
    toast({
      title: "Create User",
      description: "Opening user creation form",
    })
  }

  const handleExportUsers = () => {
    toast({
      title: "Exporting Users",
      description: "User data is being exported to CSV",
    })
  }

  return (
    <DashboardShell
      title="User Management"
      description="Manage users across all factories"
      headerAction={
        <Button onClick={handleCreateUser} className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      }
    >
      <UserStatistics />

      <div className="space-y-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportUsers}>
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("role")}
                      >
                        <div className="flex items-center gap-1">
                          Role
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("factory")}
                      >
                        <div className="flex items-center gap-1">
                          Factory
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer"
                        onClick={() => handleSort("lastActive")}
                      >
                        <div className="flex items-center gap-1">
                          Last Active
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{user.name}</td>
                          <td className="p-4 align-middle">{user.email}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={
                                user.role === "Admin"
                                  ? "bg-purple-600"
                                  : user.role === "Manager"
                                    ? "bg-blue-600"
                                    : "bg-gray-600"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{user.factory}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              className={
                                user.status === "Active"
                                  ? "bg-green-600"
                                  : user.status === "Inactive"
                                    ? "bg-gray-600"
                                    : "bg-yellow-600"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-gray-500">{user.lastActive}</td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUserAction("invite", user.id)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  <span>Send Invitation</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction("reset", user.id)}>
                                  <Lock className="mr-2 h-4 w-4" />
                                  <span>Reset Password</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction("permissions", user.id)}>
                                  <ShieldAlert className="mr-2 h-4 w-4" />
                                  <span>Edit Permissions</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleUserAction("suspend", user.id)}
                                  className="text-red-600"
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  <span>Suspend User</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-muted-foreground">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
