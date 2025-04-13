import { DashboardShell } from "@/components/dashboard-shell"
import { KioskManagement } from "@/components/owner/kiosk-management"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

export default function KioskManagementPage() {
  const { language } = useLanguage?.() || { language: "en" }

  return (
    <DashboardShell
      title={language === "en" ? "Kiosk Management" : "የኪዮስክ አስተዳደር"}
      description={
        language === "en"
          ? "Manage your factory kiosks and attendance terminals"
          : "የፋብሪካዎን ኪዮስኮች እና የመገኘት ተርሚናሎችን ያስተዳድሩ"
      }
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          {language === "en" ? "Add New Kiosk" : "አዲስ ኪዮስክ ጨምር"}
        </Button>
      }
    >
      <KioskManagement />
    </DashboardShell>
  )
}
