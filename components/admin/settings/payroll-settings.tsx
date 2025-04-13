"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/context/language-context"
import { DollarSign, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PayrollSettings() {
  const { language } = useLanguage()
  const [currency, setCurrency] = useState("ETB")
  const [payPeriod, setPayPeriod] = useState("monthly")
  const [autoCalculate, setAutoCalculate] = useState(true)
  const [overtimeRate, setOvertimeRate] = useState("1.5")
  const [weekendRate, setWeekendRate] = useState("2")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{language === "en" ? "Payroll Configuration" : "የደመወዝ ውቅር"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Currency & Pay Period" : "ምንዛሪ እና የክፍያ ጊዜ"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en"
                      ? "Set your preferred currency and payment schedule"
                      : "የሚፈልጉትን ምንዛሪ እና የክፍያ መርሃ ግብር ያዘጋጁ"}
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="currency">{language === "en" ? "Currency" : "ምንዛሪ"}</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency" className="w-full mt-1">
                          <SelectValue placeholder={language === "en" ? "Select currency" : "ምንዛሪ ይምረጡ"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ETB">ETB - Ethiopian Birr</SelectItem>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="pay-period">{language === "en" ? "Pay Period" : "የክፍያ ጊዜ"}</Label>
                      <Select value={payPeriod} onValueChange={setPayPeriod}>
                        <SelectTrigger id="pay-period" className="w-full mt-1">
                          <SelectValue placeholder={language === "en" ? "Select pay period" : "የክፍያ ጊዜ ይምረጡ"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">{language === "en" ? "Weekly" : "ሳምንታዊ"}</SelectItem>
                          <SelectItem value="biweekly">{language === "en" ? "Bi-weekly" : "ባለ ሁለት ሳምንት"}</SelectItem>
                          <SelectItem value="monthly">{language === "en" ? "Monthly" : "ወርሃዊ"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Overtime Settings" : "የትርፍ ሰዓት ቅንብሮች"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en" ? "Configure overtime rates and calculations" : "የትርፍ ሰዓት ተመኖችን እና ስሌቶችን ያዋቅሩ"}
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-calculate" className="cursor-pointer">
                        {language === "en" ? "Auto-calculate overtime" : "ትርፍ ሰዓትን በራስ-ሰር አስላ"}
                      </Label>
                      <Switch id="auto-calculate" checked={autoCalculate} onCheckedChange={setAutoCalculate} />
                    </div>

                    <div>
                      <Label htmlFor="overtime-rate">
                        {language === "en" ? "Overtime rate multiplier" : "የትርፍ ሰዓት ተመን ማባዣ"}
                      </Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="overtime-rate"
                          type="number"
                          value={overtimeRate}
                          onChange={(e) => setOvertimeRate(e.target.value)}
                          step="0.1"
                          min="1"
                          className="w-24"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">
                          × {language === "en" ? "regular rate" : "መደበኛ ተመን"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="weekend-rate">
                        {language === "en" ? "Weekend rate multiplier" : "የሳምንት መጨረሻ ተመን ማባዣ"}
                      </Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="weekend-rate"
                          type="number"
                          value={weekendRate}
                          onChange={(e) => setWeekendRate(e.target.value)}
                          step="0.1"
                          min="1"
                          className="w-24"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">
                          × {language === "en" ? "regular rate" : "መደበኛ ተመን"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>{language === "en" ? "Save Payroll Settings" : "የደመወዝ ቅንብሮችን አስቀምጥ"}</Button>
        </div>
      </div>
    </div>
  )
}
