"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/context/language-context"
import { RoleManagement } from "@/components/admin/settings/role-management"
import { SecuritySettings } from "@/components/admin/settings/security-settings"
import { LanguageSettings } from "@/components/admin/settings/language-settings"
import { IndustrySettings } from "@/components/admin/settings/industry-settings"
import { PayrollSettings } from "@/components/admin/settings/payroll-settings"

export default function AdminSettingsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("roles")

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === "en" ? "Admin Settings" : "የአስተዳዳሪ ቅንብሮች"}
        description={language === "en" ? "Configure system settings and preferences" : "የስርዓት ቅንብሮችን እና ምርጫዎችን ያዋቅሩ"}
      />

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "System Configuration" : "የስርዓት ውቅር"}</CardTitle>
          <CardDescription>
            {language === "en"
              ? "Manage roles, security, language, industry settings, and payroll configuration"
              : "ሚናዎችን፣ ደህንነትን፣ ቋንቋን፣ የኢንዱስትሪ ቅንብሮችን እና የደመወዝ ውቅርን ያስተዳድሩ"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="roles">{language === "en" ? "Roles & Access" : "ሚናዎች እና መዳረሻ"}</TabsTrigger>
              <TabsTrigger value="security">{language === "en" ? "Security" : "ደህንነት"}</TabsTrigger>
              <TabsTrigger value="language">{language === "en" ? "Language" : "ቋንቋ"}</TabsTrigger>
              <TabsTrigger value="industry">{language === "en" ? "Industry" : "ኢንዱስትሪ"}</TabsTrigger>
              <TabsTrigger value="payroll">{language === "en" ? "Payroll" : "ደመወዝ"}</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-4">
              <RoleManagement />
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>

            <TabsContent value="language" className="space-y-4">
              <LanguageSettings />
            </TabsContent>

            <TabsContent value="industry" className="space-y-4">
              <IndustrySettings />
            </TabsContent>

            <TabsContent value="payroll" className="space-y-4">
              <PayrollSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
