import { DashboardShell } from "@/components/dashboard-shell"
import { OwnerProfile } from "@/components/owner/owner-profile"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

export default function ProfilePage() {
  const { language } = useLanguage?.() || { language: "en" }

  return (
    <DashboardShell
      title={language === "en" ? "Profile" : "ፕሮፋይል"}
      description={
        language === "en" ? "View and manage your personal profile information" : "የግል ፕሮፋይል መረጃዎን ይመልከቱ እና ያስተዳድሩ"
      }
      headerAction={
        <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
          <Edit className="mr-2 h-4 w-4" />
          {language === "en" ? "Edit Profile" : "ፕሮፋይል አርትዕ"}
        </Button>
      }
    >
      <OwnerProfile />
    </DashboardShell>
  )
}
