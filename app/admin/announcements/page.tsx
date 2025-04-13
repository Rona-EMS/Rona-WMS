import { DashboardShell } from "@/components/dashboard-shell"
import { AnnouncementManagement } from "@/components/admin/announcement-management"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from "lucide-react"

export default function AnnouncementsPage() {
  return (
    <DashboardShell
      title="Announcements"
      description="Create and manage company-wide announcements"
      headerAction={
        <Button variant="gold">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      }
    >
      <AnnouncementManagement />
    </DashboardShell>
  )
}
