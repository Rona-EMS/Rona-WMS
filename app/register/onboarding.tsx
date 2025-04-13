"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/context/language-context"
import { Check, ArrowRight, Clock, Calendar } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      // Onboarding complete
      toast({
        title: language === "en" ? "Setup complete!" : "ማዋቀር ተጠናቋል!",
        description:
          language === "en"
            ? "Your account is ready to use. Redirecting to login..."
            : "መለያዎ ለመጠቀም ዝግጁ ነው። ወደ መግቢያ በማዘዋወር ላይ...",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress((step - 1) * 25)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      {/* Header with LanguageSwitcher */}
      <div className="fixed top-0 right-0 z-10 p-4">
        <LanguageSwitcher />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4">
              <Progress value={progress} className="h-2 w-[200px]" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Start</span>
                <span>Complete</span>
              </div>
            </div>
            <CardTitle className="text-2xl">{language === "en" ? "Set up your factory" : "የፋብሪካዎን ያዘጋጁ"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? `Step ${step} of 4: ${
                    step === 1
                      ? "Basic Information"
                      : step === 2
                        ? "Departments & Areas"
                        : step === 3
                          ? "Shift Configuration"
                          : "Invite Team Members"
                  }`
                : `ደረጃ ${step} ከ 4: ${
                    step === 1
                      ? "መሰረታዊ መረጃ"
                      : step === 2
                        ? "ክፍሎች እና አካባቢዎች"
                        : step === 3
                          ? "የፈረቃ ውቅር"
                          : "የቡድን አባላት ይጋብዙ"
                  }`}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center p-4 border rounded-md bg-muted/40">
                  <div className="mr-4 flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {language === "en" ? "Account created successfully" : "መለያ በተሳካ ሁኔታ ተፈጥሯል"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Your trial account is active for 14 days" : "የሙከራ መለያዎ ለ14 ቀናት ነቅቷል"}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-md border">
                  <h3 className="font-medium mb-3">{language === "en" ? "Factory profile setup" : "የፋብሪካ መገለጫ ውቅር"}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">{language === "en" ? "Basic Information" : "መሰረታዊ መረጃ"}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Factory details, location, and contact information"
                            : "የፋብሪካ ዝርዝሮች፣ አድራሻ እና የመገናኛ መረጃ"}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start opacity-70">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">{language === "en" ? "Departments & Areas" : "ክፍሎች እና አካባቢዎች"}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Set up your factory structure and work areas"
                            : "የፋብሪካ መዋቅር እና የስራ ቦታዎችን ያዘጋጁ"}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start opacity-70">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium">{language === "en" ? "Shift Configuration" : "የፈረቃ ውቅር"}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Define your work shifts and schedules"
                            : "የስራ ፈረቃዎችን እና የጊዜ ሰሌዳዎችን ይወስኑ"}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start opacity-70">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs mr-2 mt-0.5">
                        4
                      </div>
                      <div>
                        <p className="font-medium">{language === "en" ? "Invite Team Members" : "የቡድን አባላት ይጋብዙ"}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Add admins, supervisors, and workers to your factory"
                            : "አስተዳዳሪዎችን፣ ተቆጣጣሪዎችን እና ሰራተኞችን ወደ ፋብሪካዎ ይጨምሩ"}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {language === "en" ? "Need help getting started?" : "ለመጀመር እገዛ ያስፈልግዎታል?"}
                      </h4>
                      <p className="text-sm mb-2">
                        {language === "en"
                          ? "Our team is ready to help you set up your factory."
                          : "ቡድናችን ፋብሪካዎን ለማዋቀር ዝግጁ ነው።"}
                      </p>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        {language === "en" ? "Request Demo" : "ማሳያ ይጠይቁ"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-md border">
                  <h3 className="font-medium mb-3">{language === "en" ? "Factory Structure" : "የፋብሪካ መዋቅር"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Define the departments and work areas in your factory"
                      : "በፋብሪካዎ ውስጥ ያሉ ክፍሎችን እና የስራ ቦታዎችን ይወስኑ"}
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: "Production", areas: ["Assembly", "Packaging", "Quality Control"] },
                      { name: "Warehouse", areas: ["Incoming Goods", "Storage", "Shipping"] },
                      { name: "Administration", areas: ["HR", "Finance", "Management"] },
                    ].map((dept, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="font-medium mb-2">{dept.name} Department</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {dept.areas.map((area, j) => (
                            <div key={j} className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-md border mt-4">
                  <h3 className="font-medium mb-3">{language === "en" ? "Equipment & Resources" : "መሳሪያዎች እና ሀብቶች"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en" ? "Register key machinery and resources" : "ዋና ዋና ማሽኖችን እና ሀብቶችን ይመዝግቡ"}
                  </p>

                  <div className="space-y-2">
                    {[
                      { name: "Assembly Line A", type: "Machinery", status: "Operational" },
                      { name: "Packaging Machine B-201", type: "Machinery", status: "Maintenance" },
                      { name: "Forklift #3", type: "Equipment", status: "Operational" },
                    ].map((equipment, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border-b last:border-0">
                        <div>
                          <div className="font-medium">{equipment.name}</div>
                          <div className="text-xs text-muted-foreground">{equipment.type}</div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            equipment.status === "Operational"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {equipment.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-md border">
                  <h3 className="font-medium mb-3">{language === "en" ? "Work Shifts" : "የስራ ፈረቃዎች"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en" ? "Define your factory's work shifts" : "የፋብሪካዎን የስራ ፈረቃዎች ይወስኑ"}
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: "Morning Shift", time: "06:00 - 14:00", days: "Monday - Saturday" },
                      { name: "Afternoon Shift", time: "14:00 - 22:00", days: "Monday - Saturday" },
                      { name: "Night Shift", time: "22:00 - 06:00", days: "Monday - Friday" },
                    ].map((shift, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="font-medium mb-1">{shift.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{shift.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{shift.days}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-md border mt-4">
                  <h3 className="font-medium mb-3">{language === "en" ? "Attendance Settings" : "የመገኘት ቅንብሮች"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en" ? "Configure attendance tracking methods" : "የመገኘት መከታተያ ዘዴዎችን ያዋቅሩ"}
                  </p>

                  <div className="space-y-3">
                    {[
                      { method: "NFC Card Reader", location: "Main Entrance", status: "Enabled" },
                      { method: "Biometric Scanner", location: "Security Office", status: "Disabled" },
                      { method: "Mobile Check-in", location: "App-based", status: "Enabled" },
                    ].map((method, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{method.method}</div>
                          <div className="text-xs text-muted-foreground">{method.location}</div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            method.status === "Enabled"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {method.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-md border">
                  <h3 className="font-medium mb-3">{language === "en" ? "Invite Team Members" : "የቡድን አባላት ይጋብዙ"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en" ? "Add key personnel to your factory system" : "ዋና ባለሙያዎችን ወደ ፋብሪካ ስርዓትዎ ይጨምሩ"}
                  </p>

                  <div className="space-y-3">
                    {[
                      { role: "Factory Admin", count: 2, access: "Full system access" },
                      { role: "Shift Supervisor", count: 5, access: "Attendance & shift management" },
                      { role: "HR Personnel", count: 2, access: "Worker profiles & payroll" },
                    ].map((role, i) => (
                      <div key={i} className="p-3 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{role.role}</div>
                          <div className="text-xs bg-primary/10 px-2 py-1 rounded-full text-primary">
                            {role.count} {language === "en" ? "users" : "ተጠቃሚዎች"}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{role.access}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-4 rounded-md flex items-start">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800 dark:text-green-400">
                      {language === "en" ? "Setup almost complete!" : "ማዋቀር ከመጠናቀቁ አንድ እርምጃ ቀርቷል!"}
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                      {language === "en"
                        ? "You've successfully set up your factory profile. Complete this step to start using the system."
                        : "የፋብሪካዎን መገለጫ በተሳካ ሁኔታ አዋቅረዋል። ስርዓቱን መጠቀም ለመጀመር ይህን ደረጃ ያጠናቅቁ።"}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-medium mb-2">{language === "en" ? "What's next?" : "ቀጣዩ ምንድን ነው?"}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">
                        {language === "en"
                          ? "Import your worker database or add workers manually"
                          : "የሰራተኞችዎን ዳታቤዝ ያስገቡ ወይም በእጅ ያክሉ"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">
                        {language === "en" ? "Set up payroll calculations and rules" : "የደመወዝ ክፍያ ስሌቶችን እና ደንቦችን ያዘጋጁ"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">
                        {language === "en" ? "Configure production targets and KPIs" : "የምርት ግቦችን እና KPI-ዎችን ያዋቅሩ"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              {language === "en" ? "Back" : "ተመለስ"}
            </Button>
            <Button onClick={nextStep}>
              {step < 4 ? (language === "en" ? "Continue" : "ቀጥል") : language === "en" ? "Complete Setup" : "ማዋቀር ጨርስ"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
