import { DashboardShell } from "@/components/dashboard-shell"
import { BrandingManagement } from "@/components/owner/branding-management"
import { Button } from "@/components/ui/button"
import { Paintbrush } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

export default function OwnerBrandingPage() {
  const { language } = useLanguage?.() || { language: "en" }

  return (
    <DashboardShell
      title={language === "en" ? "Factory Branding" : "የፋብሪካ ብራንዲንግ"}
      description={
        language === "en" ? "Customize your factory's branding in the Rona system" : "በሮና ሲስተም ውስጥ የፋብሪካዎን ብራንዲንግ ያብጁ"
      }
      headerAction={
        <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
          <Paintbrush className="mr-2 h-4 w-4" />
          {language === "en" ? "Preview Changes" : "ለውጦችን ቅድመ ዕይታ"}
        </Button>
      }
    >
      <BrandingManagement />
    </DashboardShell>
  )
}
