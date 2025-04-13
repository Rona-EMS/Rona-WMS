"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMockData } from "@/lib/mock-data"
import { Paintbrush, Upload, Save } from "lucide-react"
import Image from "next/image"

interface BrandingData {
  logo: string
  primaryColor: string
  secondaryColor: string
  companyName: string
}

export function BrandingManagement() {
  const { toast } = useToast()
  const { factories, updateFactory } = useMockData()
  const [activeTab, setActiveTab] = useState("general")
  const [factory, setFactory] = useState(factories[0])
  const [branding, setBranding] = useState<BrandingData>({
    logo: factory?.branding?.logo || "/rona-logo.png",
    primaryColor: factory?.branding?.primaryColor || "#6366f1",
    secondaryColor: factory?.branding?.secondaryColor || "#f43f5e",
    companyName: factory?.name || "RONA Factory",
  })
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isLogoUploading, setIsLogoUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [previewApp, setPreviewApp] = useState<"login" | "kiosk" | "worker">("login")

  useEffect(() => {
    if (factory) {
      setBranding({
        logo: factory.branding?.logo || "/rona-logo.png",
        primaryColor: factory.branding?.primaryColor || "#6366f1",
        secondaryColor: factory.branding?.secondaryColor || "#f43f5e",
        companyName: factory.name || "RONA Factory",
      })
    }
  }, [factory])

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // Update the factory with new branding
      const updatedFactory = {
        ...factory,
        name: branding.companyName,
        branding: {
          logo: branding.logo,
          primaryColor: branding.primaryColor,
          secondaryColor: branding.secondaryColor,
        },
      }

      updateFactory(updatedFactory)
      setFactory(updatedFactory)

      toast({
        title: "Branding updated",
        description: "Your branding changes have been saved successfully and will be applied across all apps.",
      })

      setIsSaving(false)
    }, 1500)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsLogoUploading(true)

      // Simulate file upload
      setTimeout(() => {
        // In a real app, this would upload to a storage service
        // and return a URL
        const reader = new FileReader()
        reader.onload = () => {
          setBranding((prev) => ({
            ...prev,
            logo: reader.result as string,
          }))
          setIsLogoUploading(false)
        }
        reader.readAsDataURL(file)
      }, 1500)
    }
  }

  // Generate color presets that can be quickly applied
  const colorPresets = [
    { name: "Blue", primary: "#3b82f6", secondary: "#1d4ed8" },
    { name: "Purple", primary: "#9333ea", secondary: "#7e22ce" },
    { name: "Emerald", primary: "#059669", secondary: "#047857" },
    { name: "Amber", primary: "#d97706", secondary: "#b45309" },
    { name: "Rose", primary: "#e11d48", secondary: "#be123c" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Branding Management</CardTitle>
          <CardDescription>Customize the appearance of all your client-facing applications</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={branding.companyName}
                    onChange={(e) => setBranding((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter your company name"
                  />
                  <p className="text-sm text-muted-foreground mt-1">This name will appear in all your applications</p>
                </div>

                <div>
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-start gap-4 mt-2">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden border bg-white flex items-center justify-center">
                      {branding.logo ? (
                        <Image
                          src={branding.logo || "/placeholder.svg"}
                          alt="Company logo"
                          fill
                          style={{ objectFit: "contain" }}
                          className="p-2"
                        />
                      ) : (
                        <Paintbrush className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Button asChild variant="outline" className="w-full">
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            {isLogoUploading ? "Uploading..." : "Upload Logo"}
                            <Upload className="ml-2 h-4 w-4" />
                          </label>
                        </Button>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoUpload}
                          disabled={isLogoUploading}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 512x512px. PNG or SVG with transparent background works best.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <div
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: branding.primaryColor }}
                      ></div>
                      <Input
                        id="primaryColor"
                        type="text"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding((prev) => ({ ...prev, primaryColor: e.target.value }))}
                        className="flex-1"
                      />
                      <Input
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding((prev) => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-10 p-1 h-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Used for buttons, links, and primary actions</p>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <div
                        className="h-10 w-10 rounded-md border"
                        style={{ backgroundColor: branding.secondaryColor }}
                      ></div>
                      <Input
                        id="secondaryColor"
                        type="text"
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                        className="flex-1"
                      />
                      <Input
                        type="color"
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-10 p-1 h-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used for accents, highlights, and secondary elements
                    </p>
                  </div>

                  <div>
                    <Label>Color Presets</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          className="flex flex-col items-center gap-1"
                          onClick={() =>
                            setBranding((prev) => ({
                              ...prev,
                              primaryColor: preset.primary,
                              secondaryColor: preset.secondary,
                            }))
                          }
                        >
                          <div
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden"
                            title={preset.name}
                          >
                            <div className="h-full w-full" style={{ backgroundColor: preset.primary }}></div>
                          </div>
                          <span className="text-xs">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Color Preview</Label>
                    <div className="mt-2 border rounded-md p-4 space-y-4">
                      <div className="flex flex-col gap-2">
                        <div
                          className="p-3 rounded-md text-white text-sm text-center"
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          Primary Button
                        </div>
                        <div
                          className="p-3 rounded-md text-sm text-center border"
                          style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
                        >
                          Outline Button
                        </div>
                        <div
                          className="p-3 rounded-md text-sm"
                          style={{ backgroundColor: `${branding.primaryColor}15`, color: branding.primaryColor }}
                        >
                          Alert or notification with primary color
                        </div>
                        <div
                          className="p-3 rounded-md text-sm"
                          style={{ backgroundColor: `${branding.secondaryColor}15`, color: branding.secondaryColor }}
                        >
                          Alert or notification with secondary color
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>App Preview</Label>
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <div className="p-2 text-white text-sm" style={{ backgroundColor: branding.primaryColor }}>
                        App Header with {branding.companyName} branding
                      </div>
                      <div className="p-3 text-sm">
                        <p className="mb-2">
                          Content with <span style={{ color: branding.primaryColor }}>primary color</span> accents
                        </p>
                        <div
                          className="h-2 rounded-full mt-2"
                          style={{ backgroundColor: `${branding.secondaryColor}30` }}
                        ></div>
                        <div
                          className="h-2 rounded-full mt-1 w-3/4"
                          style={{ backgroundColor: `${branding.secondaryColor}20` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <Label>Preview Application</Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={previewApp === "login" ? "bg-gray-100" : ""}
                    onClick={() => setPreviewApp("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={previewApp === "kiosk" ? "bg-gray-100" : ""}
                    onClick={() => setPreviewApp("kiosk")}
                  >
                    Kiosk
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={previewApp === "worker" ? "bg-gray-100" : ""}
                    onClick={() => setPreviewApp("worker")}
                  >
                    Worker
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                {previewApp === "login" && (
                  <div className="bg-gradient-to-br from-blue-50 to-white p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm">12:34 PM</div>
                      <div className="text-sm bg-white px-2 py-1 rounded">English</div>
                    </div>

                    <div className="text-center mb-4">
                      <h2 className="text-xl font-bold" style={{ color: branding.primaryColor }}>
                        {branding.companyName}
                      </h2>
                      <p className="text-xs text-gray-500">Choose your login type</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="border rounded p-2 text-xs bg-white">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: `${branding.primaryColor}20` }}
                          ></div>
                          <span>Worker App</span>
                        </div>
                      </div>
                      <div className="border rounded p-2 text-xs bg-white">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: `${branding.primaryColor}20` }}
                          ></div>
                          <span>Admin App</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded p-3 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: `${branding.primaryColor}20` }}
                        ></div>
                        <div>
                          <div className="text-sm font-medium">Worker Login</div>
                          <div className="text-xs text-gray-500">Enter credentials</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-2">
                        <div className="h-6 bg-gray-100 rounded"></div>
                        <div className="h-6 bg-gray-100 rounded"></div>
                      </div>

                      <div
                        className="h-8 rounded text-white text-xs flex items-center justify-center"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        Login
                      </div>
                    </div>
                  </div>
                )}

                {previewApp === "kiosk" && (
                  <div className="bg-white p-4">
                    <div
                      className="p-2 flex justify-between items-center"
                      style={{ backgroundColor: branding.primaryColor, color: "white" }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: branding.primaryColor }}
                          ></div>
                        </div>
                        <div className="text-sm">{branding.companyName}</div>
                      </div>
                      <div className="text-xs">12:34 PM</div>
                    </div>

                    <div className="p-3 space-y-3">
                      <div className="border rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: `${branding.primaryColor}20` }}
                          ></div>
                          <div className="text-sm">Tap your card to clock in/out</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div
                            className="text-white text-xs p-2 rounded text-center"
                            style={{ backgroundColor: branding.primaryColor }}
                          >
                            Clock In
                          </div>
                          <div
                            className="text-xs p-2 rounded text-center border"
                            style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
                          >
                            Clock Out
                          </div>
                        </div>
                      </div>

                      <div
                        className="text-xs p-2 rounded"
                        style={{ backgroundColor: `${branding.primaryColor}10`, color: branding.primaryColor }}
                      >
                        Successfully clocked in!
                      </div>
                    </div>
                  </div>
                )}

                {previewApp === "worker" && (
                  <div className="bg-white">
                    <div
                      className="p-2 flex justify-between items-center"
                      style={{ backgroundColor: branding.primaryColor, color: "white" }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: branding.primaryColor }}
                          ></div>
                        </div>
                        <div className="text-sm">{branding.companyName}</div>
                      </div>
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>

                    <div className="flex">
                      <div className="w-10 bg-gray-50 p-1">
                        <div
                          className="w-8 h-8 rounded-full mb-1"
                          style={{ backgroundColor: `${branding.primaryColor}20` }}
                        ></div>
                        <div
                          className="w-8 h-8 rounded-full mb-1"
                          style={{ backgroundColor: `${branding.primaryColor}10` }}
                        ></div>
                      </div>
                      <div className="p-2 flex-1">
                        <div className="text-sm font-medium mb-2">Worker Dashboard</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="border rounded p-2 text-xs">
                            <div className="font-medium mb-1">Upcoming Shift</div>
                            <div className="text-gray-500">8:00 AM - 4:00 PM</div>
                          </div>
                          <div className="border rounded p-2 text-xs">
                            <div className="font-medium mb-1">Attendance</div>
                            <div className="text-gray-500">On time: 22/23 days</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <div className="flex justify-end px-6 pb-6">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
            style={{ backgroundColor: branding.primaryColor, color: "white" }}
          >
            {isSaving ? "Saving..." : "Save Branding"}
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
