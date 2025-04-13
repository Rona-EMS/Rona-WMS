"use client"

import { useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { KpiDashboard } from "@/components/owner/kpi-dashboard"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export default function KpiPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <DashboardShell
      title="KPI Dashboard"
      description="Track key performance indicators for your factory"
      headerAction={
        <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
          <Settings className="mr-2 h-4 w-4" />
          Configure KPIs
        </Button>
      }
    >
      <KpiDashboard />
    </DashboardShell>
  )
}
