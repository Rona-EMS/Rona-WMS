"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/context/language-context"
import { AlertCircle, Lock, Shield, Eye, EyeOff } from "lucide-react"

export function SecuritySettings() {
  const { language } = useLanguage()
  const [showPin, setShowPin] = useState(false)
  const [payrollPin, setPayrollPin] = useState("")
  const [fraudDetection, setFraudDetection] = useState(true)
  const [locationVerification, setLocationVerification] = useState(true)
  const [multiFactorAuth, setMultiFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {language === "en" ? "Security & Fraud Detection" : "ደህንነት እና የማጭበርበር ግኝት"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Payroll PIN Protection" : "የደመወዝ ፒን ጥበቃ"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en"
                      ? "Set a 4-digit PIN to secure payroll access"
                      : "የደመወዝ መዳረሻን ለማስተዳደር 4 አሃዝ ፒን ያዘጋጁ"}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="relative">
                      <Input
                        type={showPin ? "text" : "password"}
                        value={payrollPin}
                        onChange={(e) => setPayrollPin(e.target.value)}
                        maxLength={4}
                        className="pr-10"
                        placeholder="0000"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPin(!showPin)}
                      >
                        {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button size="sm">{language === "en" ? "Save PIN" : "ፒን አስቀምጥ"}</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{language === "en" ? "Fraud Detection" : "የማጭበርበር ግኝት"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "en"
                      ? "Detect suspicious activities and login attempts"
                      : "ጥርጣሬ የሚያጭር እንቅስቃሴዎችን እና የመግቢያ ሙከራዎችን ይለዩ"}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fraud-detection" className="cursor-pointer">
                        {language === "en" ? "Enable fraud detection" : "የማጭበርበር ግኝትን አንቃ"}
                      </Label>
                      <Switch id="fraud-detection" checked={fraudDetection} onCheckedChange={setFraudDetection} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="location-verification" className="cursor-pointer">
                        {language === "en" ? "Location verification" : "የአካባቢ ማረጋገጫ"}
                      </Label>
                      <Switch
                        id="location-verification"
                        checked={locationVerification}
                        onCheckedChange={setLocationVerification}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="multi-factor-auth" className="cursor-pointer">
                        {language === "en" ? "Multi-factor authentication" : "ባለ ብዙ ምክንያት ማረጋገጫ"}
                      </Label>
                      <Switch id="multi-factor-auth" checked={multiFactorAuth} onCheckedChange={setMultiFactorAuth} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{language === "en" ? "Session Settings" : "የክፍለ ጊዜ ቅንብሮች"}</h3>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5" />
              <div className="w-full">
                <h4 className="font-medium">{language === "en" ? "Session Timeout" : "የክፍለ ጊዜ ጊዜ ማብቂያ"}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "en"
                    ? "Set how long users can remain inactive before being logged out"
                    : "ተጠቃሚዎች ከመውጣታቸው በፊት ምን ያህል ጊዜ ቦዝነው መቆየት እንደሚችሉ ያዘጋጁ"}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="w-full max-w-xs">
                    <Label htmlFor="session-timeout">
                      {language === "en" ? "Timeout (minutes)" : "ጊዜ ማብቂያ (ደቂቃዎች)"}
                    </Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      min="1"
                      max="120"
                      className="mt-1"
                    />
                  </div>
                  <Button className="mt-7">{language === "en" ? "Save" : "አስቀምጥ"}</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
