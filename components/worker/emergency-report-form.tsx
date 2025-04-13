"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Switch } from "@/components/ui/switch"

// Import the useRouter hook
import { useRouter } from "next/navigation"

export function EmergencyReportForm() {
  const [emergencyType, setEmergencyType] = useState("machinery")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const { language, t } = useLanguage()

  // Add the router inside the component
  const router = useRouter()

  // Update the form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!emergencyType || !location || !description) {
      toast({
        title: language === "en" ? "Missing information" : "መረጃ ይጎድላል",
        description: language === "en" ? "Please fill in all required fields" : "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === "en" ? "Report submitted" : "ሪፖርት ተልኳል",
        description:
          language === "en"
            ? "Your emergency report has been submitted and will be addressed immediately"
            : "የድንገተኛ ሁኔታ ሪፖርትዎ ተልኳል እና ወዲያውኑ ይስተናገዳል",
        variant: isUrgent ? "destructive" : "default",
      })

      // Reset form
      setEmergencyType("machinery")
      setDescription("")
      setLocation("")
      setIsUrgent(false)
      setIsSubmitting(false)

      // Refresh the page to show the new report in history
      router.refresh()
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "en" ? "Report Emergency" : "ድንገተኛ ሁኔታ ሪፖርት አድርግ"}</CardTitle>
        <CardDescription>
          {language === "en"
            ? "Report machinery issues, safety concerns, or other emergencies"
            : "የማሽን ችግሮችን፣ የደህንነት ስጋቶችን፣ ወይም ሌሎች ድንገተኛ ሁኔታዎችን ሪፖርት ያድርጉ"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emergency-type">{language === "en" ? "Emergency Type" : "የድንገተኛ ሁኔታ አይነት"}</Label>
            <Select value={emergencyType} onValueChange={setEmergencyType}>
              <SelectTrigger id="emergency-type">
                <SelectValue placeholder={language === "en" ? "Select emergency type" : "የድንገተኛ ሁኔታ አይነት ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="machinery">{language === "en" ? "Machinery Malfunction" : "የማሽን መሰናከል"}</SelectItem>
                <SelectItem value="safety">{language === "en" ? "Safety Hazard" : "የደህንነት አደጋ"}</SelectItem>
                <SelectItem value="injury">{language === "en" ? "Worker Injury" : "የሰራተኛ ጉዳት"}</SelectItem>
                <SelectItem value="fire">{language === "en" ? "Fire" : "እሳት"}</SelectItem>
                <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">{language === "en" ? "Location in Factory" : "በፋብሪካው ውስጥ ያለው ቦታ"}</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder={language === "en" ? "Select location" : "ቦታ ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">{language === "en" ? "Production Floor" : "የምርት ወለል"}</SelectItem>
                <SelectItem value="packaging">{language === "en" ? "Packaging Area" : "የማሸጊያ ቦታ"}</SelectItem>
                <SelectItem value="warehouse">{language === "en" ? "Warehouse" : "መጋዘን"}</SelectItem>
                <SelectItem value="office">{language === "en" ? "Office Area" : "የቢሮ ቦታ"}</SelectItem>
                <SelectItem value="cafeteria">{language === "en" ? "Cafeteria" : "ካፍቴሪያ"}</SelectItem>
                <SelectItem value="restroom">{language === "en" ? "Restroom" : "መጸዳጃ"}</SelectItem>
                <SelectItem value="outside">{language === "en" ? "Outside/Yard" : "ውጭ/ግቢ"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{language === "en" ? "Description of Emergency" : "የድንገተኛ ሁኔታ መግለጫ"}</Label>
            <Textarea
              id="description"
              placeholder={
                language === "en"
                  ? "Please provide detailed information about the emergency"
                  : "እባክዎ ስለ ድንገተኛ ሁኔታው ዝርዝር መረጃ ይስጡ"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
            <Label htmlFor="urgent" className="font-medium text-red-500">
              {language === "en" ? "This is an URGENT emergency" : "ይህ አስቸኳይ ድንገተኛ ሁኔታ ነው"}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              // Reset the form
              setEmergencyType("machinery")
              setDescription("")
              setLocation("")
              setIsUrgent(false)
            }}
          >
            {language === "en" ? "Cancel" : "ሰርዝ"}
          </Button>
          <Button type="submit" disabled={isSubmitting} variant={isUrgent ? "destructive" : "default"}>
            {isSubmitting
              ? language === "en"
                ? "Submitting..."
                : "በማስገባት ላይ..."
              : language === "en"
                ? "Submit Report"
                : "ሪፖርት አስገባ"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
