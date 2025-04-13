"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { BugIcon, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function SoftwareProblemPage() {
  const [date] = useState(new Date())
  const { language } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [issueType, setIssueType] = useState("bug")
  const [description, setDescription] = useState("")
  const [steps, setSteps] = useState("")
  const [priority, setPriority] = useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: language === "en" ? "Issue Reported" : "ችግር ተዘግቧል",
      description:
        language === "en"
          ? "Your software issue has been reported to the SaaS Admin team"
          : "የሶፍትዌር ችግርዎ ለSaaS አስተዳዳሪ ቡድን ተዘግቧል",
      variant: "default",
    })

    // Reset form
    setDescription("")
    setSteps("")
  }

  return (
    <DashboardShell
      title={language === "en" ? "Report Software Problem" : "የሶፍትዌር ችግር ሪፖርት ያድርጉ"}
      description={date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      headerAction={
        <Button
          variant="outline"
          className="flex items-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-500/10"
          onClick={() => router.push("/owner/emergency")}
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "en" ? "Back to Emergency Page" : "ወደ አደጋ ገጽ ተመለስ"}
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BugIcon className="h-5 w-5 text-purple-600" />
            <CardTitle>{language === "en" ? "Software Problem Report" : "የሶፍትዌር ችግር ሪፖርት"}</CardTitle>
          </div>
          <CardDescription>
            {language === "en"
              ? "Use this form to report any software issues, bugs, or feature requests to the SaaS Admin team"
              : "ይህንን ቅጽ ማንኛውንም የሶፍትዌር ችግሮች፣ ስህተቶች፣ ወይም የባህሪ ጥያቄዎችን ለSaaS አስተዳዳሪ ቡድን ለማሳወቅ ይጠቀሙ"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issue-type">{language === "en" ? "Issue Type" : "የችግር አይነት"}</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder={language === "en" ? "Select issue type" : "የችግር አይነት ይምረጡ"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">{language === "en" ? "Bug / Error" : "ስህተት"}</SelectItem>
                    <SelectItem value="ui">{language === "en" ? "UI / Display Issue" : "የማሳያ ችግር"}</SelectItem>
                    <SelectItem value="performance">
                      {language === "en" ? "Performance Problem" : "የአፈጻጸም ችግር"}
                    </SelectItem>
                    <SelectItem value="feature">{language === "en" ? "Feature Request" : "የባህሪ ጥያቄ"}</SelectItem>
                    <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">{language === "en" ? "Priority Level" : "የቅድሚያ ደረጃ"}</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder={language === "en" ? "Select priority" : "ቅድሚያ ይምረጡ"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{language === "en" ? "Low - Not Urgent" : "ዝቅተኛ - አስቸኳይ አይደለም"}</SelectItem>
                    <SelectItem value="medium">
                      {language === "en" ? "Medium - Needs Attention" : "መካከለኛ - ትኩረት ያስፈልጋል"}
                    </SelectItem>
                    <SelectItem value="high">{language === "en" ? "High - Urgent" : "ከፍተኛ - አስቸኳይ"}</SelectItem>
                    <SelectItem value="critical">
                      {language === "en" ? "Critical - Blocking Work" : "ወሳኝ - ስራን እየከለከለ ነው"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue-title">{language === "en" ? "Issue Title" : "የችግር ርዕስ"}</Label>
              <Input
                id="issue-title"
                placeholder={language === "en" ? "Brief title of the issue" : "የችግሩ አጭር ርዕስ"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{language === "en" ? "Issue Description" : "የችግር መግለጫ"}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={language === "en" ? "Describe the issue in detail..." : "ችግሩን በዝርዝር ይግለጹ..."}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">{language === "en" ? "Steps to Reproduce" : "ችግሩን ለመድገም የሚያስፈልጉ ደረጃዎች"}</Label>
              <Textarea
                id="steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder={
                  language === "en"
                    ? "List the steps to reproduce this issue..."
                    : "ይህን ችግር ለመድገም የሚያስፈልጉ ደረጃዎችን ይዘርዝሩ..."
                }
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {language === "en" ? "Submit Issue Report" : "የችግር ሪፖርት አስገባ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Recent Problem Reports" : "የቅርብ ጊዜ የችግር ሪፖርቶች"}</CardTitle>
          <CardDescription>
            {language === "en"
              ? "History of your software problem reports and their status"
              : "የእርስዎ የሶፍትዌር ችግር ሪፖርቶች ታሪክ እና ሁኔታቸው"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {language === "en" ? "Payroll Calculation Error" : "የክፍያ ስሌት ስህተት"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Reported on Mar 10, 2025" : "በመጋቢት 1, 2017 ተዘግቧል"}
                </p>
              </div>
              <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {language === "en" ? "Resolved" : "ተፈትቷል"}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">{language === "en" ? "Dashboard Loading Slow" : "ዳሽቦርድ በዝግታ መጫን"}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Reported on Mar 18, 2025" : "በመጋቢት 9, 2017 ተዘግቧል"}
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                {language === "en" ? "In Progress" : "በሂደት ላይ"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
