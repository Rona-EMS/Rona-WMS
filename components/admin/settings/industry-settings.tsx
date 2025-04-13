"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/context/language-context"
import { Factory, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IndustrySettings() {
  const { language } = useLanguage()
  const [industry, setIndustry] = useState("textile")
  const [workflowType, setWorkflowType] = useState("standard")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{language === "en" ? "Industry Configuration" : "የኢንዱስትሪ ውቅር"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Factory className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Industry Type" : "የኢንዱስትሪ አይነት"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en"
                      ? "Select your industry for optimized settings"
                      : "ለተመቻቹ ቅንብሮች የእርስዎን ኢንዱስትሪ ይምረጡ"}
                  </p>

                  <div className="mt-4">
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={language === "en" ? "Select industry" : "ኢንዱስትሪ ይምረጡ"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textile">
                          {language === "en" ? "Textile & Garment" : "ጨርቃ ጨርቅ እና አልባሳት"}
                        </SelectItem>
                        <SelectItem value="food">{language === "en" ? "Food Processing" : "የምግብ ማቀነባበሪያ"}</SelectItem>
                        <SelectItem value="metal">
                          {language === "en" ? "Metal & Engineering" : "ብረታ ብረት እና ኢንጂነሪንግ"}
                        </SelectItem>
                        <SelectItem value="leather">{language === "en" ? "Leather & Footwear" : "ቆዳ እና ጫማ"}</SelectItem>
                        <SelectItem value="pharmaceutical">
                          {language === "en" ? "Pharmaceutical" : "የመድሃኒት"}
                        </SelectItem>
                        <SelectItem value="construction">
                          {language === "en" ? "Construction Materials" : "የግንባታ ቁሳቁሶች"}
                        </SelectItem>
                        <SelectItem value="other">{language === "en" ? "Other" : "ሌላ"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Workflow Type" : "የስራ ፍሰት አይነት"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en"
                      ? "Choose the workflow that best fits your operations"
                      : "ለእርስዎ ስራዎች በጣም የሚስማማውን የስራ ፍሰት ይምረጡ"}
                  </p>

                  <div className="mt-4">
                    <RadioGroup value={workflowType} onValueChange={setWorkflowType} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="workflow-standard" />
                        <Label htmlFor="workflow-standard">
                          {language === "en" ? "Standard Workflow" : "መደበኛ የስራ ፍሰት"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="assembly" id="workflow-assembly" />
                        <Label htmlFor="workflow-assembly">
                          {language === "en" ? "Assembly Line" : "የመገጣጠሚያ መስመር"}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="batch" id="workflow-batch" />
                        <Label htmlFor="workflow-batch">{language === "en" ? "Batch Processing" : "የባች ማቀነባበሪያ"}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="workflow-custom" />
                        <Label htmlFor="workflow-custom">{language === "en" ? "Custom Workflow" : "ብጁ የስራ ፍሰት"}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>{language === "en" ? "Save Industry Settings" : "የኢንዱስትሪ ቅንብሮችን አስቀምጥ"}</Button>
        </div>
      </div>
    </div>
  )
}
