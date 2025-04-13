"use client"

import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Bell, Home, Menu, Moon, Save, Sun } from "lucide-react"
import { WorkerSidebar } from "@/components/worker/worker-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [date] = useState(new Date())
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [darkModePreference, setDarkModePreference] = useState("system")
  const [languagePreference, setLanguagePreference] = useState("en")
  const [isLoading, setIsLoading] = useState(false)

  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { language, setLanguage } = useLanguage()

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Apply theme setting
    setTheme(darkModePreference)

    // Apply language setting
    if (languagePreference !== language) {
      setLanguage(languagePreference as "en" | "am")
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: language === "en" ? "Settings Saved" : "ቅንብሮች ተቀምጠዋል",
        description: language === "en" ? "Your preferences have been updated successfully" : "ምርጫዎችዎ በተሳካ ሁኔታ ተዘምነዋል",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <WorkerSidebar mobile={true} />
              </SheetContent>
            </Sheet>
            <Link href="/worker/dashboard" className="flex items-center gap-2 text-lg font-semibold">
              <Home className="h-5 w-5" />
              <span>Rona Worker</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <WorkerSidebar />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-4 md:gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{language === "en" ? "Settings" : "ቅንብሮች"}</h1>
                <p className="text-muted-foreground">
                  {date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {language === "en" ? "Save Changes" : "ለውጦችን አስቀምጥ"}
              </Button>
            </div>

            <Tabs defaultValue="preferences" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="preferences">{language === "en" ? "Preferences" : "ምርጫዎች"}</TabsTrigger>
                <TabsTrigger value="notifications">{language === "en" ? "Notifications" : "ማሳወቂያዎች"}</TabsTrigger>
                <TabsTrigger value="security">{language === "en" ? "Security" : "ደህንነት"}</TabsTrigger>
              </TabsList>

              <TabsContent value="preferences" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Appearance" : "መልክ"}</CardTitle>
                    <CardDescription>
                      {language === "en"
                        ? "Customize how the app looks and feels"
                        : "መተግበሪያው እንዴት እንደሚመስል እና እንደሚሰማ ያስተካክሉ"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme-preference">{language === "en" ? "Theme" : "ገጽታ"}</Label>
                      <Select value={darkModePreference} onValueChange={setDarkModePreference}>
                        <SelectTrigger id="theme-preference">
                          <SelectValue placeholder={language === "en" ? "Select theme" : "ገጽታ ይምረጡ"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">{language === "en" ? "Light" : "ብርሃን"}</SelectItem>
                          <SelectItem value="dark">{language === "en" ? "Dark" : "ጨለማ"}</SelectItem>
                          <SelectItem value="system">{language === "en" ? "System" : "የስርዓት"}</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {language === "en"
                          ? "Choose between light, dark, or system default theme"
                          : "በብርሃን፣ ጨለማ፣ ወይም የስርዓት ነባሪ ገጽታ መካከል ይምረጡ"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language-preference">{language === "en" ? "Language" : "ቋንቋ"}</Label>
                      <Select value={languagePreference} onValueChange={setLanguagePreference}>
                        <SelectTrigger id="language-preference">
                          <SelectValue placeholder={language === "en" ? "Select language" : "ቋንቋ ይምረጡ"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="am">አማርኛ (Amharic)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Choose your preferred language" : "የሚፈልጉትን ቋንቋ ይምረጡ"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Notification Settings" : "የማሳወቂያ ቅንብሮች"}</CardTitle>
                    <CardDescription>
                      {language === "en" ? "Manage how you receive notifications" : "ማሳወቂያዎችን እንዴት እንደሚቀበሉ ያስተዳድሩ"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          {language === "en" ? "Email Notifications" : "የኢሜይል ማሳወቂያዎች"}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Receive notifications via email" : "ማሳወቂያዎችን በኢሜይል ይቀበሉ"}
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">
                          {language === "en" ? "Push Notifications" : "የማስገፊያ ማሳወቂያዎች"}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Receive notifications on your device" : "ማሳወቂያዎችን በመሳሪያዎ ላይ ይቀበሉ"}
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Password & Security" : "የይለፍ ቃል እና ደህንነት"}</CardTitle>
                    <CardDescription>
                      {language === "en" ? "Manage your account security settings" : "የመለያዎን ደህንነት ቅንብሮች ያስተዳድሩ"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">
                        {language === "en" ? "Current Password" : "የአሁኑ የይለፍ ቃል"}
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder={language === "en" ? "Enter current password" : "የአሁኑን የይለፍ ቃል ያስገቡ"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">{language === "en" ? "New Password" : "አዲስ የይለፍ ቃል"}</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder={language === "en" ? "Enter new password" : "አዲስ የይለፍ ቃል ያስገቡ"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        {language === "en" ? "Confirm New Password" : "አዲስ የይለፍ ቃል ያረጋግጡ"}
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder={language === "en" ? "Confirm new password" : "አዲስ የይለፍ ቃል ያረጋግጡ"}
                      />
                    </div>

                    <Button className="mt-2">{language === "en" ? "Change Password" : "የይለፍ ቃል ይቀይሩ"}</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
