"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/loading-spinner"

export function OwnerEmergencyReportForm() {
  const [emergencyType, setEmergencyType] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!emergencyType || !location || !description) {
      toast({
        title: language === "en" ? "Missing information" : "የጎደለ መረጃ",
        description: language === "en" ? "Please fill in all required fields" : "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: language === "en" ? "Emergency Reported" : "ድንገተኛ ሁኔታ ተዘግቧል",
        description:
          language === "en" ? "Your emergency report has been submitted successfully" : "የእርስዎ የአደጋ ሪፖርት በተሳካ ሁኔታ ገብቷል",
      })

      // Reset form
      setEmergencyType("")
      setLocation("")
      setDescription("")
      setPriority("medium")
    } catch (error) {
      toast({
        title: language === "en" ? "Submission Failed" : "ማስገባት አልተሳካም",
        description:
          language === "en"
            ? "Failed to submit emergency report. Please try again."
            : "የአደጋ ሪፖርት ማስገባት አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="emergency-type">
          {language === "en" ? "Emergency Type" : "የአደጋ አይነት"} <span className="text-red-500">*</span>
        </Label>
        <Select value={emergencyType} onValueChange={setEmergencyType} required>
          <SelectTrigger id="emergency-type">
            <SelectValue placeholder={language === "en" ? "Select emergency type" : "የአደጋ አይነት ይምረጡ"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fire">{language === "en" ? "Fire" : "እሳት"}</SelectItem>
            <SelectItem value="injury">{language === "en" ? "Worker Injury" : "የሰራተኛ ጉዳት"}</SelectItem>
            <SelectItem value="machine">{language === "en" ? "Machine Malfunction" : "የማሽን መሰናከል"}</SelectItem>
            <SelectItem value="chemical">{language === "en" ? "Chemical Spill" : "የኬሚካል ፍሳሽ"}</SelectItem>
            <SelectItem value="power">{language === "en" ? "Power Outage" : "የኃይል መቋረጥ"}</SelectItem>
            <SelectItem value="security">{language === "en" ? "Security Breach" : "የደህንነት ጥሰት"}</SelectItem>
            <SelectItem value="financial">{language === "en" ? "Financial Emergency" : "የፋይናንስ አደጋ"}</SelectItem>
            <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">
          {language === "en" ? "Location in Factory" : "በፋብሪካ ውስጥ ያለ ቦታ"} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={language === "en" ? "e.g., Production Floor, Section B" : "ለምሳሌ፣ የምርት ወለል፣ ክፍል ለ"}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">{language === "en" ? "Priority Level" : "የቅድሚያ ደረጃ"}</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger id="priority">
            <SelectValue placeholder={language === "en" ? "Select priority" : "ቅድሚያ ይምረጡ"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">{language === "en" ? "Low" : "ዝቅተኛ"}</SelectItem>
            <SelectItem value="medium">{language === "en" ? "Medium" : "መካከለኛ"}</SelectItem>
            <SelectItem value="high">{language === "en" ? "High" : "ከፍተኛ"}</SelectItem>
            <SelectItem value="critical">{language === "en" ? "Critical" : "ወሳኝ"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          {language === "en" ? "Description" : "መግለጫ"} <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={language === "en" ? "Describe the emergency situation in detail..." : "የአደጋ ሁኔታውን በዝርዝር ይግለጹ..."}
          rows={5}
          required
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setEmergencyType("")
            setLocation("")
            setDescription("")
            setPriority("medium")
          }}
        >
          {language === "en" ? "Clear Form" : "ቅጹን ያጽዱ"}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              {language === "en" ? "Submitting..." : "በማስገባት ላይ..."}
            </span>
          ) : language === "en" ? (
            "Report Emergency"
          ) : (
            "አደጋ ሪፖርት ያድርጉ"
          )}
        </Button>
      </div>
    </form>
  )
}
