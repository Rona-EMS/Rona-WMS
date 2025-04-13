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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Import the useRouter hook
import { useRouter } from "next/navigation"

export function LeaveRequestForm() {
  const [leaveType, setLeaveType] = useState("sick")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const { language, t } = useLanguage()

  // Add the router inside the component
  const router = useRouter()

  // Update the form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate dates
    if (!startDate || !endDate) {
      toast({
        title: language === "en" ? "Missing dates" : "ቀኖች ይጎድላሉ",
        description: language === "en" ? "Please select both start and end dates" : "እባክዎ የመጀመሪያ እና የመጨረሻ ቀኖችን ይምረጡ",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (endDate < startDate) {
      toast({
        title: language === "en" ? "Invalid date range" : "ልክ ያልሆነ የቀን ክልል",
        description: language === "en" ? "End date cannot be before start date" : "የመጨረሻ ቀን ከመጀመሪያው ቀን በፊት መሆን አይችልም",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === "en" ? "Request submitted" : "ጥያቄ ተልኳል",
        description: language === "en" ? "Your leave request has been submitted for approval" : "የእረፍት ጥያቄዎ ለማጽደቅ ተልኳል",
      })

      // Reset form
      setLeaveType("sick")
      setStartDate(undefined)
      setEndDate(undefined)
      setReason("")
      setIsSubmitting(false)

      // Refresh the page to show the new request in history
      router.refresh()
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "en" ? "Request Leave" : "ፈቃድ ጠይቅ"}</CardTitle>
        <CardDescription>
          {language === "en" ? "Submit a request for time off from work" : "ከስራ ለመቅረት ጥያቄ ያስገቡ"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leave-type">{language === "en" ? "Leave Type" : "የፈቃድ አይነት"}</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger id="leave-type">
                <SelectValue placeholder={language === "en" ? "Select leave type" : "የፈቃድ አይነት ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sick">{language === "en" ? "Sick Leave" : "የህመም ፈቃድ"}</SelectItem>
                <SelectItem value="vacation">{language === "en" ? "Vacation" : "እረፍት"}</SelectItem>
                <SelectItem value="personal">{language === "en" ? "Personal" : "የግል"}</SelectItem>
                <SelectItem value="family">{language === "en" ? "Family Emergency" : "የቤተሰብ ድንገተኛ ሁኔታ"}</SelectItem>
                <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">{language === "en" ? "Start Date" : "የመጀመሪያ ቀን"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>{language === "en" ? "Select date" : "ቀን ይምረጡ"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">{language === "en" ? "End Date" : "የመጨረሻ ቀን"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>{language === "en" ? "Select date" : "ቀን ይምረጡ"}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">{language === "en" ? "Reason for Leave" : "ለፈቃድ ምክንያት"}</Label>
            <Textarea
              id="reason"
              placeholder={
                language === "en" ? "Please provide details about your leave request" : "እባክዎ ስለ ፈቃድ ጥያቄዎ ዝርዝሮችን ይስጡ"
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
              setLeaveType("sick")
              setStartDate(undefined)
              setEndDate(undefined)
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
