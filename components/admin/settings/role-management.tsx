"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/context/language-context"
import { Plus, Edit, Trash } from "lucide-react"

// Mock data for roles
const mockRoles = [
  {
    id: "1",
    name: "HR Manager",
    permissions: ["view_workers", "edit_workers", "view_payroll", "edit_payroll", "view_attendance"],
  },
  {
    id: "2",
    name: "Shift Supervisor",
    permissions: ["view_workers", "view_shifts", "edit_shifts", "view_attendance", "create_announcements"],
  },
  {
    id: "3",
    name: "Finance Officer",
    permissions: ["view_payroll", "edit_payroll", "view_reports"],
  },
]

// All available permissions
const allPermissions = [
  { id: "view_workers", label: "View Workers" },
  { id: "edit_workers", label: "Edit Workers" },
  { id: "view_shifts", label: "View Shifts" },
  { id: "edit_shifts", label: "Edit Shifts" },
  { id: "view_attendance", label: "View Attendance" },
  { id: "edit_attendance", label: "Edit Attendance" },
  { id: "view_payroll", label: "View Payroll" },
  { id: "edit_payroll", label: "Edit Payroll" },
  { id: "view_reports", label: "View Reports" },
  { id: "create_announcements", label: "Create Announcements" },
  { id: "manage_emergency", label: "Manage Emergency" },
]

export function RoleManagement() {
  const { language } = useLanguage()
  const [roles, setRoles] = useState(mockRoles)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newRole, setNewRole] = useState({ name: "", permissions: [] as string[] })

  const handleTogglePermission = (permission: string) => {
    if (isCreating) {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.includes(permission)
          ? newRole.permissions.filter((p) => p !== permission)
          : [...newRole.permissions, permission],
      })
    } else if (editingRole) {
      setEditingRole({
        ...editingRole,
        permissions: editingRole.permissions.includes(permission)
          ? editingRole.permissions.filter((p) => p !== permission)
          : [...editingRole.permissions, permission],
      })
    }
  }

  const handleSaveRole = () => {
    if (isCreating) {
      setRoles([...roles, { ...newRole, id: Date.now().toString() }])
      setNewRole({ name: "", permissions: [] })
      setIsCreating(false)
    } else if (editingRole) {
      setRoles(roles.map((role) => (role.id === editingRole.id ? editingRole : role)))
      setEditingRole(null)
    }
  }

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const handleEditRole = (role: any) => {
    setEditingRole(role)
    setIsCreating(false)
  }

  const handleCreateNewRole = () => {
    setIsCreating(true)
    setEditingRole(null)
    setNewRole({ name: "", permissions: [] })
  }

  const handleCancelEdit = () => {
    setIsCreating(false)
    setEditingRole(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{language === "en" ? "Custom Role Management" : "የተለየ ሚና አስተዳደር"}</h3>
        <Button onClick={handleCreateNewRole} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {language === "en" ? "Create Role" : "ሚና ፍጠር"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roles List */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-2">
            {language === "en" ? "Existing Roles" : "ነባር ሚናዎች"}
          </h4>

          {roles.map((role) => (
            <Card key={role.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold">{role.name}</h5>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)} className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRole(role.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {role.permissions.length} {language === "en" ? "permissions" : "ፈቃዶች"}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit/Create Form */}
        {(isCreating || editingRole) && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground mb-2">
              {isCreating
                ? language === "en"
                  ? "Create New Role"
                  : "አዲስ ሚና ፍጠር"
                : language === "en"
                  ? "Edit Role"
                  : "ሚና አርትዕ"}
            </h4>

            <div className="space-y-4">
              <div>
                <Label htmlFor="role-name">{language === "en" ? "Role Name" : "የሚና ስም"}</Label>
                <Input
                  id="role-name"
                  value={isCreating ? newRole.name : editingRole?.name || ""}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewRole({ ...newRole, name: e.target.value })
                    } else if (editingRole) {
                      setEditingRole({ ...editingRole, name: e.target.value })
                    }
                  }}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="mb-2 block">{language === "en" ? "Permissions" : "ፈቃዶች"}</Label>
                <div className="space-y-2 mt-2">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between">
                      <span className="text-sm">{permission.label}</span>
                      <Switch
                        checked={
                          isCreating
                            ? newRole.permissions.includes(permission.id)
                            : editingRole?.permissions.includes(permission.id)
                        }
                        onCheckedChange={() => handleTogglePermission(permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  {language === "en" ? "Cancel" : "ይቅር"}
                </Button>
                <Button onClick={handleSaveRole}>{language === "en" ? "Save" : "አስቀምጥ"}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
