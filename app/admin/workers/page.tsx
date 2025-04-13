"use client"

import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { WorkerManagement } from "@/components/admin/worker-management"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function WorkersPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    // Rest of the component remains unchanged
    <DashboardShell
      title="Worker Management"
      description="Manage worker profiles, assignments, and performance"
      headerAction={
        <Button variant="gold">
          <Plus className="mr-2 h-4 w-4" />
          Add New Worker
        </Button>
      }
    >
      <WorkerManagement />
    </DashboardShell>
  )
}
