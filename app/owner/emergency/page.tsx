"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { AlertTriangle } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OwnerEmergencyPage() {
  const [date] = useState(new Date())
  const { language } = useLanguage()
  const { toast } = useToast()
  const [emergencyType, setEmergencyType] = useState("machine")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [severity, setSeverity] = useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: language === "en" ? "Emergency Reported" : "አደጋ ተዘግቧል",
      description: language === "en" ? "Your emergency report has been submitted" : "የአደጋ ሪፖርትዎ ተልኳል",
      variant: "default",
    })

    // Reset form
    setDescription("")
    setLocation("")
    setSeverity("medium")
  }

  const callEmergencyHotline = () => {
    toast({
      title: language === "en" ? "Emergency Hotline" : "የአደጋ ጊዜ የስልክ መስመር",
      description: language === "en" ? "Calling emergency response team..." : "የአደጋ ጊዜ ምላሽ ቡድንን በመጥራት ላይ...",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === "en" ? "Emergency Management" : "የአደጋ ጊዜ አስተዳደር"}
        description={date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        action={
          <Button variant="destructive" className="flex items-center gap-2" onClick={callEmergencyHotline}>
            <AlertTriangle className="h-4 w-4" />
            {language === "en" ? "Call Emergency Hotline" : "የአደጋ ጊዜ የስልክ መስመር ይጠቀሙ"}
          </Button>
        }
      />

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
              ? "Use this form to report emergencies, safety hazards, or urgent issues in your factory"
              : "ይህንን ቅጽ በፋብሪካዎ ውስጥ ለአደጋ ጊዜ፣ ለደህንነት አደጋዎች፣ ወይም አስቸኳይ ጉዳዮችን ለማሳወቅ ይጠቀሙ"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergency-type">{language === "en" ? "Emergency Type" : "የአደጋ አይነት"}</Label>
                <Select value={emergencyType} onValueChange={setEmergencyType}>
                  <SelectTrigger id="emergency-type">
                    <SelectValue placeholder={language === "en" ? "Select type" : "አይነት ይምረጡ"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="machine">{language === "en" ? "Machine Malfunction" : "የማሽን መሰናከል"}</SelectItem>
                    <SelectItem value="fire">{language === "en" ? "Fire Hazard" : "የእሳት አደጋ"}</SelectItem>
                    <SelectItem value="injury">{language === "en" ? "Worker Injury" : "የሰራተኛ ጉዳት"}</SelectItem>
                    <SelectItem value="power">{language === "en" ? "Power Outage" : "የኃይል መቋረጥ"}</SelectItem>
                    <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{language === "en" ? "Location in Factory" : "በፋብሪካ ውስጥ ያለው ቦታ"}</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder={language === "en" ? "Select location" : "ቦታ ይምረጡ"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">{language === "en" ? "Production Floor" : "የምርት ወለል"}</SelectItem>
                    <SelectItem value="warehouse">{language === "en" ? "Warehouse" : "መጋዘን"}</SelectItem>
                    <SelectItem value="office">{language === "en" ? "Office Area" : "የቢሮ አካባቢ"}</SelectItem>
                    <SelectItem value="loading">{language === "en" ? "Loading Dock" : "መጫኛ ቦታ"}</SelectItem>
                    <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">{language === "en" ? "Severity Level" : "የአደጋ ደረጃ"}</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder={language === "en" ? "Select severity" : "ደረጃ ይምረጡ"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{language === "en" ? "Low - Not Urgent" : "ዝቅተኛ - አስቸኳይ አይደለም"}</SelectItem>
                    <SelectItem value="medium">
                      {language === "en" ? "Medium - Needs Attention" : "መካከለኛ - ትኩረት ያስፈልጋል"}
                    </SelectItem>
                    <SelectItem value="high">{language === "en" ? "High - Urgent" : "ከፍተኛ - አስቸኳይ"}</SelectItem>
                    <SelectItem value="critical">
                      {language === "en" ? "Critical - Immediate Action" : "ወሳኝ - ወዲያውኑ እርምጃ"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{language === "en" ? "Emergency Description" : "የአደጋ መግለጫ"}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === "en" ? "Provide details about the emergency situation..." : "ስለ አደጋው ሁኔታ ዝርዝር ይስጡ..."
                }
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                {language === "en" ? "Submit Emergency Report" : "የአደጋ ሪፖርት አስገባ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Recent Emergency Reports" : "የቅርብ ጊዜ የአደጋ ሪፖርቶች"}</CardTitle>
          <CardDescription>
            {language === "en" ? "History of emergency reports from your factory" : "ከፋብሪካዎ የመጡ የአደጋ ሪፖርቶች ታሪክ"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Machine Malfunction" : "የማሽን መሰናከል"}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Reported by Abebe K. on Feb 28, 2025" : "በአበበ ከ. በየካቲት 20, 2017 ተዘግቧል"}
                </p>
              </div>
              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {language === "en" ? "Resolved" : "ተፈትቷል"}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Power Outage" : "የኃይል መቋረጥ"}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Reported by Yonas A. on Mar 15, 2025" : "በዮናስ አ. በመጋቢት 6, 2017 ተዘግቧል"}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                {language === "en" ? "In Progress" : "በሂደት ላይ"}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Financial Emergency" : "የፋይናንስ አደጋ"}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Reported by Meron T. on Mar 22, 2025" : "በሜሮን ት. በመጋቢት 13, 2017 ተዘግቧል"}
                </p>
              </div>
              <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {language === "en" ? "Critical" : "ወሳኝ"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
