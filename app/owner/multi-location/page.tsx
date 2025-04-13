import { DashboardShell } from "@/components/dashboard-shell"
import { MultiLocationManagement } from "@/components/owner/multi-location-management"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

export default function MultiLocationPage() {
  const { language } = useLanguage?.() || { language: "en" }

  return (
    <DashboardShell
      title={language === "en" ? "Multi-Location Management" : "የብዙ ቦታዎች አስተዳደር"}
      description={
        language === "en"
          ? "Monitor and manage multiple factory sites from one dashboard"
          : "ከአንድ ዳሽቦርድ ብዙ የፋብሪካ ቦታዎችን ይቆጣጠሩ እና ያስተዳድሩ"
      }
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700">
          <MapPin className="mr-2 h-4 w-4" />
          {language === "en" ? "Add New Location" : "አዲስ ቦታ ጨምር"}
        </Button>
      }
    >
      <MultiLocationManagement />
    </DashboardShell>
  )
}
