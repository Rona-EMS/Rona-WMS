"use client"

import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { AlertTriangle } from "lucide-react"
import { WorkerSidebar } from "@/components/worker/worker-sidebar"
import { useTheme } from "next-themes"
import { EmergencyReportForm } from "@/components/worker/emergency-report-form"

export default function EmergencyPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [date] = useState(new Date())
  const { theme, setTheme } = useTheme()
  const { language } = useLanguage()
  const { toast } = useToast()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <WorkerSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-8">
              {/* Page header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === "en" ? "Emergency Reporting" : "ድንገተኛ ሁኔታ ሪፖርት"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {language === "en"
                      ? "Report emergencies and safety hazards"
                      : "ድንገተኛ ሁኔታዎችን እና የደህንነት አደጋዎችን ሪፖርት ያድርጉ"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => {
                      toast({
                        title: language === "en" ? "Emergency Hotline" : "የአደጋ ጊዜ የስልክ መስመር",
                        description:
                          language === "en" ? "Calling emergency response team..." : "የአደጋ ጊዜ ምላሽ ቡድንን በመጥራት ላይ...",
                        variant: "destructive",
                      })
                    }}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    {language === "en" ? "Call Emergency Hotline" : "የአደጋ ጊዜ የስልክ መስመር ይጠቀሙ"}
                  </Button>
                </div>
              </div>

              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <CardTitle className="text-red-600 dark:text-red-400">
                      {language === "en" ? "Emergency Reporting System" : "የአደጋ ጊዜ ሪፖርት ማድረጊያ ስርዓት"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === "en"
                      ? "Use this form to report emergencies, safety hazards, or urgent issues"
                      : "ይህንን ቅጽ ለአደጋ ጊዜ፣ ለደህንነት አደጋዎች፣ ወይም አስቸኳይ ጉዳዮችን ለማሳወቅ ይጠቀሙ"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <EmergencyReportForm />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Recent Emergency Reports" : "የቅርብ ጊዜ የአደጋ ሪፖርቶች"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "History of your emergency reports and their status"
                      : "የእርስዎ የአደጋ ሪፖርቶች ታሪክ እና ሁኔታቸው"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {language === "en" ? "Machine Malfunction" : "የማሽን መሰናከል"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Reported on Feb 28, 2025" : "በየካቲት 20, 2017 ተዘግቧል"}
                        </p>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {language === "en" ? "Resolved" : "ተፈትቷል"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
