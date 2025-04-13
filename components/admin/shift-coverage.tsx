"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { AlertCircle } from "lucide-react"

export function ShiftCoverage() {
  const { language } = useLanguage()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{language === "en" ? "Shift Coverage" : "የሺፍት ሽፋን"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {language === "en"
              ? "Current staffing levels and understaffed areas"
              : "የአሁኑ የሰራተኞች ደረጃ እና በቂ ሰራተኛ የሌላቸው አካባቢዎች"}
          </p>
        </div>
        <Button variant="outline" size="sm">
          {language === "en" ? "Manage Shifts" : "ሺፍቶችን ያስተዳድሩ"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-6 rounded-md mb-6">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              {/* Donut chart */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#d4b675"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="37.68"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray="251.2"
                  strokeDashoffset="213.52"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#d4b675] mr-2"></div>
                <span className="text-sm">{language === "en" ? "Scheduled" : "የተመደበ"} 85%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">{language === "en" ? "Understaffed" : "በቂ ሰራተኛ የሌለው"} 15%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">{language === "en" ? "Coverage Needed" : "ሽፋን ያስፈልጋል"}</h3>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{language === "en" ? "Evening Shift - Packaging" : "የምሽት ሺፍት - ማሸጊያ"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Need 3 additional workers" : "3 ተጨማሪ ሰራተኞች ያስፈልጋሉ"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                  {language === "en" ? "High" : "ከፍተኛ"}
                </span>
                <Button size="sm">{language === "en" ? "Assign Workers" : "ሰራተኞችን ይመድቡ"}</Button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{language === "en" ? "Night Shift - Maintenance" : "የሌሊት ሺፍት - ጥገና"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Need 2 additional workers" : "2 ተጨማሪ ሰራተኞች ያስፈልጋሉ"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs">
                  {language === "en" ? "Medium" : "መካከለኛ"}
                </span>
                <Button size="sm">{language === "en" ? "Assign Workers" : "ሰራተኞችን ይመድቡ"}</Button>
              </div>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          {language === "en" ? "Auto-Assign Available Workers" : "ዝግጁ ሰራተኞችን በራስ-ሰር ይመድቡ"}
        </Button>
      </CardContent>
    </Card>
  )
}
