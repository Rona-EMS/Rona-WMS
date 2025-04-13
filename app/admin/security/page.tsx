import { DashboardShell } from "@/components/dashboard-shell"
import { SecurityManagement } from "@/components/admin/security-management"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function SecurityPage() {
  return (
    <DashboardShell
      title="Security Management"
      description="Monitor and manage security settings for your factory"
      headerAction={
        <Button variant="gold">
          <Download className="mr-2 h-4 w-4" />
          Export Security Report
        </Button>
      }
    >
      <SecurityManagement />
    </DashboardShell>
  )
}
