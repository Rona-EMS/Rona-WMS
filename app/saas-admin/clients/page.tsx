"use client"

import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ClientsPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    // Rest of the component remains unchanged
    <DashboardShell
      title="Client Management"
      description="Manage factory clients and their accounts"
      headerAction={
        <Button variant="gold" className="px-4">
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      }
    >
      {/* ... existing code ... */}
    </DashboardShell>
  )
}
