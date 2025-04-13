"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { useLanguage } from "@/lib/context/language-context"
import { useBranding } from "@/lib/context/branding-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Eye, Save } from "lucide-react"
import { ConsistentClock } from "@/components/consistent-clock"

// Helper function to ensure color contrast
const ensureContrast = (color: string, fallbackLight = "#ffffff", fallbackDark = "#000000"): string => {
  try {
    // Simple validation for hex color
    if (!color || !color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return fallbackLight
    }

    // Convert hex to RGB
    const r = Number.parseInt(color.substring(1, 3), 16)
    const g = Number.parseInt(color.substring(3, 5), 16)
    const b = Number.parseInt(color.substring(5, 7), 16)

    // Calculate luminance (simplified)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return appropriate color based on luminance
    return luminance > 0.5 ? fallbackDark : fallbackLight
  } catch (e) {
    console.error("Error calculating contrast:", e)
    return fallbackLight
  }
}

export default function OwnerSettingsPage() {
  const { language } = useLanguage()
  const branding = useBranding()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("branding")
  const [selectedCurrency, setSelectedCurrency] = useState("ETB")
  const [primaryColor, setPrimaryColor] = useState("#D4AF37") // Default gold
  const [secondaryColor, setSecondaryColor] = useState("#111827") // Default dark gray
  const [accentColor, setAccentColor] = useState("#FFFFFF") // Default white
  const [logoPreview, setLogoPreview] = useState("/rona-logo.png")
  const [factoryName, setFactoryName] = useState("Addis Textile Mills")
  const [factoryCode, setFactoryCode] = useState("123")
  const [brandingPreview, setBrandingPreview] = useState<"kiosk" | "worker" | "admin" | "owner">("kiosk")

  // Load current branding on component mount
  useEffect(() => {
    setPrimaryColor(branding.primaryColor || "#D4AF37")
    setSecondaryColor(branding.secondaryColor || "#111827")
    setAccentColor(branding.accentColor || "#FFFFFF")
    setLogoPreview(branding.logo || "/rona-logo.png")
    setFactoryName(branding.companyName || "Addis Textile Mills")
    setFactoryCode(branding.factoryId || "123")
  }, [branding])

  const handleSaveSettings = () => {
    // Update branding context
    branding.updateBranding({
      primaryColor,
      secondaryColor,
      accentColor,
      logo: logoPreview,
      companyName: factoryName,
      factoryId: factoryCode,
    })

    toast({
      title: language === "en" ? "Settings saved" : "ቅንብሮች ተቀምጠዋል",
      description: language === "en" ? "Your settings have been saved successfully" : "ቅንብሮችዎ በተሳካ ሁኔታ ተቀምጠዋል",
    })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Convert hex to RGB for styling
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Generate CSS variables for branding colors
  const generateCssVariables = () => {
    const primary = hexToRgb(primaryColor)
    const secondary = hexToRgb(secondaryColor)
    const accent = hexToRgb(accentColor)

    return {
      "--primary-color": primaryColor,
      "--primary-rgb": `${primary.r}, ${primary.g}, ${primary.b}`,
      "--secondary-color": secondaryColor,
      "--secondary-rgb": `${secondary.r}, ${secondary.g}, ${secondary.b}`,
      "--accent-color": accentColor,
      "--accent-rgb": `${accent.r}, ${accent.g}, ${accent.b}`,
    } as React.CSSProperties
  }

  // Get text color based on background for good contrast
  const getPrimaryTextColor = () => ensureContrast(primaryColor)
  const getSecondaryTextColor = () => ensureContrast(secondaryColor)
  const getAccentTextColor = () => ensureContrast(accentColor)

  return (
    <DashboardShell
      title={language === "en" ? "Settings" : "ቅንብሮች"}
      description={language === "en" ? "Manage your factory settings and preferences" : "የፋብሪካዎን ቅንብሮች እና ምርጫዎች ያስተዳድሩ"}
      headerAction={
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          {language === "en" ? "Save Changes" : "ለውጦችን አስቀምጥ"}
        </Button>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">{language === "en" ? "Branding" : "ብራንዲንግ"}</TabsTrigger>
          <TabsTrigger value="subscription">{language === "en" ? "Subscription" : "ደንበኝነት"}</TabsTrigger>
          <TabsTrigger value="reports">{language === "en" ? "Reports" : "ሪፖርቶች"}</TabsTrigger>
          <TabsTrigger value="currency">{language === "en" ? "Currency" : "ገንዘብ"}</TabsTrigger>
        </TabsList>

        {/* Branding Settings */}
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Factory Branding" : "የፋብሪካ ብራንዲንግ"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Customize your factory's branding across all apps"
                  : "በሁሉም መተግበሪያዎች ላይ የፋብሪካዎን ብራንዲንግ ያብጁ"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="factory-code">{language === "en" ? "Factory Code" : "የፋብሪካ ኮድ"}</Label>
                <Input
                  id="factory-code"
                  placeholder={language === "en" ? "Enter factory code" : "የፋብሪካ ኮድ ያስገቡ"}
                  value={factoryCode}
                  onChange={(e) => setFactoryCode(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-name">{language === "en" ? "Factory Name" : "የፋብሪካ ስም"}</Label>
                <Input
                  id="company-name"
                  placeholder={language === "en" ? "Enter factory name" : "የፋብሪካ ስም ያስገቡ"}
                  value={factoryName}
                  onChange={(e) => setFactoryName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "en" ? "Factory Logo" : "የፋብሪካ አርማ"}</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md border flex items-center justify-center overflow-hidden">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Factory logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="logo-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {language === "en" ? "Upload Logo" : "አርማ ይጫኑ"}
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      {language === "en"
                        ? "Recommended size: 512x512px. PNG or SVG format."
                        : "የሚመከር መጠን: 512x512px. PNG ወይም SVG ቅርጸት።"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">{language === "en" ? "Primary Color" : "ዋና ቀለም"}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Used for buttons, accents, and highlights"
                    : "ለአዝራሮች፣ ለማድመቂያዎች እና ለማጉላት ጥቅም ላይ ይውላል"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">{language === "en" ? "Secondary Color" : "ሁለተኛ ቀለም"}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Used for backgrounds and secondary elements"
                    : "ለጀርባዎች እና ለሁለተኛ አካላት ጥቅም ላይ ይውላል"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">{language === "en" ? "Accent Color" : "ማድመቂያ ቀለም"}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="accent-color"
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Used for text and other accent elements"
                    : "ለጽሑፍ እና ለሌሎች ማድመቂያ አካላት ጥቅም ላይ ይውላል"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{language === "en" ? "Color Presets" : "የቀለም ቅድመ-ቅንብሮች"}</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Gold", primary: "#D4AF37", secondary: "#111827", accent: "#FFFFFF" },
                    { name: "Green", primary: "#10B981", secondary: "#1F2937", accent: "#F9FAFB" },
                    { name: "Blue", primary: "#3B82F6", secondary: "#1E3A8A", accent: "#F3F4F6" },
                    { name: "Red", primary: "#EF4444", secondary: "#111827", accent: "#F3F4F6" },
                    { name: "Purple", primary: "#8B5CF6", secondary: "#2E1065", accent: "#F3F4F6" },
                  ].map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center overflow-hidden"
                      onClick={() => {
                        setPrimaryColor(color.primary)
                        setSecondaryColor(color.secondary)
                        setAccentColor(color.accent)
                      }}
                      title={color.name}
                    >
                      <div className="w-full h-full" style={{ backgroundColor: color.primary }}></div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex gap-2">
                <Select value={brandingPreview} onValueChange={(value) => setBrandingPreview(value as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Preview App" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kiosk">{language === "en" ? "Kiosk App" : "የኪዮስክ መተግበሪያ"}</SelectItem>
                    <SelectItem value="worker">{language === "en" ? "Worker App" : "የሰራተኛ መተግበሪያ"}</SelectItem>
                    <SelectItem value="admin">{language === "en" ? "Admin App" : "የአስተዳዳሪ መተግበሪያ"}</SelectItem>
                    <SelectItem value="owner">{language === "en" ? "Owner App" : "የባለቤት መተግበሪያ"}</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-purple-500 text-purple-500 hover:bg-purple-500/10"
                >
                  <Eye className="h-4 w-4" />
                  {language === "en" ? "Preview" : "ቅድመ ዕይታ"}
                </Button>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                {language === "en" ? "Save Branding" : "ብራንዲንግ አስቀምጥ"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Branding Preview" : "የብራንዲንግ ቅድመ እይታ"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "See how your branding will look across all apps"
                  : "ብራንዲንግዎ በሁሉም መተግበሪያዎች ላይ እንዴት እንደሚታይ ይመልከቱ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                {/* Kiosk App Preview */}
                {brandingPreview === "kiosk" && (
                  <div className="bg-white" style={generateCssVariables()}>
                    <div
                      className="border-b p-3 flex justify-between items-center"
                      style={{
                        backgroundColor: primaryColor,
                        color: getPrimaryTextColor(),
                        borderColor: `${primaryColor}20`,
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo"
                          className="h-8 w-8 mr-2 object-contain bg-white p-1 rounded"
                        />
                        <div>
                          <h3 className="font-medium">
                            {factoryName} - {factoryCode}
                          </h3>
                          <p className="text-xs opacity-90">Attendance Management System</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ConsistentClock variant="compact" textColor={getPrimaryTextColor()} />
                        <div
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: accentColor,
                            color: getAccentTextColor(),
                          }}
                        >
                          EN
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="border rounded-lg p-4 mb-4" style={{ borderColor: `${primaryColor}20` }}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                            <div
                              className="w-5 h-5"
                              style={{ backgroundColor: primaryColor, borderRadius: "50%" }}
                            ></div>
                          </div>
                          <div>
                            <h3 className="font-medium">NFC Card</h3>
                            <p className="text-xs text-gray-500">Tap your card to clock in/out</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            className="p-3 rounded text-center"
                            style={{
                              backgroundColor: primaryColor,
                              color: getPrimaryTextColor(),
                            }}
                          >
                            Clock In
                          </div>
                          <div
                            className="p-3 rounded text-center border"
                            style={{
                              borderColor: primaryColor,
                              color: primaryColor,
                            }}
                          >
                            Clock Out
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-md bg-green-50 text-green-600 mb-4">Successfully clocked in!</div>
                      <div className="border rounded-md p-3" style={{ borderColor: `${primaryColor}20` }}>
                        <h4 className="text-sm font-medium mb-2">Need Help?</h4>
                        <div className="text-xs text-gray-500">
                          Contact your supervisor if you're having trouble with the kiosk.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Worker App Preview */}
                {brandingPreview === "worker" && (
                  <div className="bg-white" style={generateCssVariables()}>
                    <div
                      className="border-b p-3 flex justify-between items-center"
                      style={{
                        backgroundColor: primaryColor,
                        color: getPrimaryTextColor(),
                        borderColor: `${primaryColor}20`,
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo"
                          className="h-8 w-8 mr-2 object-contain bg-white p-1 rounded"
                        />
                        <div>
                          <h3 className="font-medium">{factoryName}</h3>
                          <p className="text-xs opacity-90">Worker Dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ConsistentClock variant="compact" textColor={getPrimaryTextColor()} />
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-16 bg-gray-50 p-2 flex flex-col items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: primaryColor,
                            color: getPrimaryTextColor(),
                          }}
                        >
                          <div className="w-5 h-5 bg-white rounded-full"></div>
                        </div>
                        <div className="w-10" />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                            <h3 className="font-medium mb-2">Upcoming Shift</h3>
                            <p className="text-sm text-gray-500">Morning Shift: 8:00 AM - 4:00 PM</p>
                          </div>
                          <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                            <h3 className="font-medium mb-2">Attendance</h3>
                            <p className="text-sm text-gray-500">On time: 22/23 days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin App Preview */}
                {brandingPreview === "admin" && (
                  <div className="bg-white" style={generateCssVariables()}>
                    <div
                      className="border-b p-3 flex justify-between items-center"
                      style={{
                        backgroundColor: primaryColor,
                        color: getPrimaryTextColor(),
                        borderColor: `${primaryColor}20`,
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo"
                          className="h-8 w-8 mr-2 object-contain bg-white p-1 rounded"
                        />
                        <div>
                          <h3 className="font-medium">{factoryName}</h3>
                          <p className="text-xs opacity-90">Admin Dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ConsistentClock variant="compact" textColor={getPrimaryTextColor()} />
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                          <h3 className="font-medium mb-2">Workers Present</h3>
                          <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                            42/50
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                          <h3 className="font-medium mb-2">Shift Coverage</h3>
                          <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                            84%
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                          <h3 className="font-medium mb-2">Incidents</h3>
                          <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                            0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Owner App Preview */}
                {brandingPreview === "owner" && (
                  <div className="bg-white" style={generateCssVariables()}>
                    <div
                      className="border-b p-3 flex justify-between items-center"
                      style={{
                        backgroundColor: primaryColor,
                        color: getPrimaryTextColor(),
                        borderColor: `${primaryColor}20`,
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo"
                          className="h-8 w-8 mr-2 object-contain bg-white p-1 rounded"
                        />
                        <div>
                          <h3 className="font-medium">{factoryName}</h3>
                          <p className="text-xs opacity-90">Owner Dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ConsistentClock variant="compact" textColor={getPrimaryTextColor()} />
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                          <h3 className="font-medium mb-2">Factory Performance</h3>
                          <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                              92%
                            </p>
                            <span className="text-green-500 text-sm">↑ 3%</span>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border" style={{ borderColor: `${primaryColor}20` }}>
                          <h3 className="font-medium mb-2">Monthly Revenue</h3>
                          <div className="flex items-end gap-2">
                            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                              $125,400
                            </p>
                            <span className="text-green-500 text-sm">↑ 12%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Settings */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Subscription Settings" : "የደንበኝነት ምዝገባ ቅንብሮች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Manage your subscription plan and billing details"
                  : "የደንበኝነት ምዝገባ ዕቅድዎን እና የክፍያ ዝርዝሮችዎን ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{language === "en" ? "Subscription content goes here." : "የደንበኝነት ምዝገባ ይዘት እዚህ አለ።"}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Settings */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Reports Settings" : "ሪፖርቶች ቅንብሮች"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Configure your reporting preferences" : "የሪፖርት ምርጫዎችዎን ያዋቅሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{language === "en" ? "Reports content goes here." : "የሪፖርቶች ይዘት እዚህ አለ።"}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Settings */}
        <TabsContent value="currency">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Currency Settings" : "የገንዘብ ቅንብሮች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Set your preferred currency for all transactions"
                  : "ለሁሉም ግብይቶች የሚመርጡትን ምንዛሬ ያዘጋጁ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">{language === "en" ? "Currency" : "ገንዘብ"}</Label>
                  <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETB">ETB</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
