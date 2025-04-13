"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/context/language-context"
import { Globe } from "lucide-react"

export function LanguageSettings() {
  const { language, setLanguage } = useLanguage()
  const [defaultLanguage, setDefaultLanguage] = useState(language)
  const [autoDetect, setAutoDetect] = useState(true)
  const [userPreference, setUserPreference] = useState(true)

  const handleSaveLanguageSettings = () => {
    // In a real app, this would save to the backend
    setLanguage(defaultLanguage)
    localStorage.setItem("language", defaultLanguage)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">{language === "en" ? "Language Settings" : "የቋንቋ ቅንብሮች"}</h3>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div className="w-full">
                <h4 className="font-medium">{language === "en" ? "System Language" : "የስርዓት ቋንቋ"}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === "en" ? "Set the default language for the system" : "ለስርዓቱ ነባሪ ቋንቋ ያዘጋጁ"}
                </p>

                <div className="mt-4 space-y-4">
                  <RadioGroup value={defaultLanguage} onValueChange={setDefaultLanguage} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="lang-en" />
                      <Label htmlFor="lang-en">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="am" id="lang-am" />
                      <Label htmlFor="lang-am">አማርኛ (Amharic)</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-detect" className="cursor-pointer">
                        {language === "en" ? "Auto-detect language" : "ቋንቋን በራስ-ሰር ለይ"}
                      </Label>
                      <Switch id="auto-detect" checked={autoDetect} onCheckedChange={setAutoDetect} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="user-preference" className="cursor-pointer">
                        {language === "en" ? "Allow user language preference" : "የተጠቃሚ ቋንቋ ምርጫን ፍቀድ"}
                      </Label>
                      <Switch id="user-preference" checked={userPreference} onCheckedChange={setUserPreference} />
                    </div>
                  </div>

                  <Button onClick={handleSaveLanguageSettings}>
                    {language === "en" ? "Save Language Settings" : "የቋንቋ ቅንብሮችን አስቀምጥ"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
