"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { useBranding } from "@/lib/context/branding-context"

export function OwnerProfile() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const { companyName } = useBranding()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    position: "Factory Owner",
    company: companyName || "Your Company",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your backend

    toast({
      title: language === "en" ? "Profile updated" : "ፕሮፋይል ተዘምኗል",
      description: language === "en" ? "Your profile has been updated successfully." : "ፕሮፋይልዎ በተሳካ ሁኔታ ተዘምኗል።",
    })

    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "en" ? "Your Profile" : "ፕሮፋይልዎ"}</CardTitle>
        <CardDescription>
          {language === "en" ? "Manage your personal information and preferences" : "የግል መረጃዎን እና ምርጫዎችዎን ያስተዳድሩ"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-2xl font-bold">
              {formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-lg font-medium">{formData.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formData.position} at {formData.company}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{language === "en" ? "Full Name" : "ሙሉ ስም"}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{language === "en" ? "Email" : "ኢሜይል"}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">{language === "en" ? "Phone Number" : "ስልክ ቁጥር"}</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">{language === "en" ? "Position" : "ቦታ"}</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              {language === "en" ? "Cancel" : "ይቅር"}
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {language === "en" ? "Save Changes" : "ለውጦችን አስቀምጥ"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>{language === "en" ? "Edit Profile" : "ፕሮፋይል አርትዕ"}</Button>
        )}
      </CardFooter>
    </Card>
  )
}
