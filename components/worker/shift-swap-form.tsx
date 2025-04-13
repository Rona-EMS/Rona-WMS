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
import { shifts } from "@/lib/mock-data"
import { format, parseISO } from "date-fns"

// Import the useRouter hook
import { useRouter } from "next/navigation"

export function ShiftSwapForm() {
  const [currentShift, setCurrentShift] = useState("")
  const [targetShift, setTargetShift] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const { language, t } = useLanguage()

  // Add the router inside the component
  const router = useRouter()

  // Filter shifts to only include future shifts
  const futureShifts = shifts.filter((shift) => {
    const shiftDate = new Date(shift.date)
    return shiftDate >= new Date()
  })

  // Update the form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate selection
    if (!currentShift || !targetShift) {
      toast({
        title: language === "en" ? "Missing shifts" : "ፈረቃዎች ይጎድላሉ",
        description:
          language === "en" ? "Please select both current and target shifts" : "እባክዎ የአሁኑን እና የታለመውን ፈረቃዎች ይምረጡ",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (currentShift === targetShift) {
      toast({
        title: language === "en" ? "Invalid selection" : "ልክ ያልሆነ ምርጫ",
        description:
          language === "en" ? "Current and target shifts cannot be the same" : "የአሁኑ እና የታለመው ፈረቃዎች አንድ አይነት መሆን አይችሉም",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === "en" ? "Request submitted" : "ጥያቄ ተልኳል",
        description:
          language === "en" ? "Your shift swap request has been submitted for approval" : "የፈረቃ ለውጥ ጥያቄዎ ለማጽደቅ ተልኳል",
      })

      // Reset form
      setCurrentShift("")
      setTargetShift("")
      setReason("")
      setIsSubmitting(false)

      // Refresh the page to show the new request in history
      router.refresh()
    }, 1500)
  }

  const formatShiftOption = (shift) => {
    const date = format(parseISO(shift.date), "MMM dd, yyyy")
    let time = ""

    if (shift.type === "morning") {
      time = language === "en" ? "Morning (6:00 AM - 2:00 PM)" : "ጠዋት (6:00 - 2:00)"
    } else if (shift.type === "afternoon") {
      time = language === "en" ? "Afternoon (2:00 PM - 10:00 PM)" : "ከሰዓት በኋላ (2:00 - 10:00)"
    } else {
      time = language === "en" ? "Night (10:00 PM - 6:00 AM)" : "ሌሊት (10:00 - 6:00)"
    }

    return `${date} - ${time}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "en" ? "Request Shift Swap" : "የፈረቃ ለውጥ ጠይቅ"}</CardTitle>
        <CardDescription>
          {language === "en" ? "Submit a request to swap your assigned shift" : "የተመደበልዎትን ፈረቃ ለመቀየር ጥያቄ ያስገቡ"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-shift">{language === "en" ? "Current Shift" : "የአሁኑ ፈረቃ"}</Label>
            <Select value={currentShift} onValueChange={setCurrentShift}>
              <SelectTrigger id="current-shift">
                <SelectValue placeholder={language === "en" ? "Select your current shift" : "የአሁኑን ፈረቃዎን ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                {futureShifts.map((shift) => (
                  <SelectItem key={shift.id} value={shift.id}>
                    {formatShiftOption(shift)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-shift">{language === "en" ? "Target Shift" : "የታለመው ፈረቃ"}</Label>
            <Select value={targetShift} onValueChange={setTargetShift}>
              <SelectTrigger id="target-shift">
                <SelectValue placeholder={language === "en" ? "Select your desired shift" : "የሚፈልጉትን ፈረቃ ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                {futureShifts.map((shift) => (
                  <SelectItem key={shift.id} value={shift.id}>
                    {formatShiftOption(shift)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">{language === "en" ? "Reason for Swap" : "ለመቀየር ምክንያት"}</Label>
            <Textarea
              id="reason"
              placeholder={
                language === "en"
                  ? "Please provide details about your shift swap request"
                  : "እባክዎ ስለ ፈረቃ ለውጥ ጥያቄዎ ዝርዝሮችን ይስጡ"
              }
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              // Reset the form
              setCurrentShift("")
              setTargetShift("")
              setReason("")
            }}
          >
            {language === "en" ? "Cancel" : "ሰርዝ"}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? language === "en"
                ? "Submitting..."
                : "በማስገባት ላይ..."
              : language === "en"
                ? "Submit Request"
                : "ጥያቄ አስገባ"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
