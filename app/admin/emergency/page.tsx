"use client"

import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmergencyManagement } from "@/components/admin/emergency-management"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function EmergencyPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    // Rest of the component remains unchanged
    <DashboardShell
      title="Emergency Management"
      description="Handle emergency reports and incidents"
      headerAction={
        <Button variant="destructive">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Critical Alerts
        </Button>
      }
    >
      <EmergencyManagement />
    </DashboardShell>
  )
}
