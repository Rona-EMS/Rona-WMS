"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Shield,
  Key,
  Edit,
  Save,
  Award,
  CircleUser,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t, language } = useLanguage()

  // Mock admin data
  const adminData = {
    name: "Dawit Mengistu",
    email: "dawit.mengistu@example.com",
    phone: "+251 91 234 5678",
    role: "Factory Administrator",
    department: "Administration",
    employeeId: "ADM-2022-0015",
    joinDate: "2022-03-15",
    lastLogin: "2023-04-12 08:45:23",
    permissions: [
      { name: language === "en" ? "Worker Management" : "የሰራተኛ አስተዳደር", level: "Full" },
      { name: language === "en" ? "Shift Management" : "የፈረቃ አስተዳደር", level: "Full" },
      { name: language === "en" ? "Payroll Management" : "የደመወዝ አስተዳደር", level: "View Only" },
      { name: language === "en" ? "Emergency Management" : "የአደጋ አስተዳደር", level: "Full" },
      { name: language === "en" ? "System Settings" : "የስርዓት ቅንብሮች", level: "Partial" },
    ],
    activityLog: [
      { action: language === "en" ? "Login" : "መግቢያ", timestamp: "2023-04-12 08:45:23" },
      { action: language === "en" ? "Updated Worker Profile" : "የሰራተኛ መገለጫ ዘምኗል", timestamp: "2023-04-12 09:30:15" },
      { action: language === "en" ? "Created Shift" : "ፈረቃ ፈጥሯል", timestamp: "2023-04-12 10:15:42" },
      { action: language === "en" ? "Approved Leave Request" : "የፈቃድ ጥያቄ ፈቅዷል", timestamp: "2023-04-12 11:05:37" },
      {
        action: language === "en" ? "Generated Payroll Report" : "የደመወዝ ሪፖርት አመንጭቷል",
        timestamp: "2023-04-12 14:22:18",
      },
    ],
    skills: [
      language === "en" ? "System Administration" : "የስርዓት አስተዳደር",
      language === "en" ? "Team Management" : "የቡድን አስተዳደር",
      language === "en" ? "Payroll Processing" : "የደመወዝ ሂደት",
    ],
    certifications: [
      language === "en" ? "HR Management" : "የሰው ሀብት አስተዳደር",
      language === "en" ? "Factory Administration" : "የፋብሪካ አስተዳደር",
    ],
    address: "Bole Sub-City, Addis Ababa",
    emergencyContact: "Abebe Kebede: +251911234567",
    languages: [language === "en" ? "Amharic" : "አማርኛ", language === "en" ? "English" : "እንግሊዘኛ"],
    performanceRating: 4.8,
  }

  // Calculate activity metrics
  const totalActivities = adminData.activityLog.length
  const recentActivities = adminData.activityLog.slice(0, 5)

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: language === "en" ? "Profile updated" : "ፕሮፋይል ተዘምኗል",
      description: language === "en" ? "Your profile has been updated successfully." : "ፕሮፋይልዎ በተሳካ ሁኔታ ተዘምኗል።",
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "My Profile" : "የእኔ መገለጫ"}
      description={language === "en" ? "View and manage your profile information" : "የእርስዎን መገለጫ መረጃ ይመልከቱ እና ያስተዳድሩ"}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                {language === "en" ? "Save Changes" : "ለውጦችን አስቀምጥ"}
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                {language === "en" ? "Edit Profile" : "ፕሮፋይል አርትዕ"}
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Left column - Profile summary */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 text-3xl font-bold">
                    {adminData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-2">
                    <Badge className="px-3" variant="default">
                      {language === "en" ? "Active" : "ንቁ"}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl mt-4">{adminData.name}</CardTitle>
              <CardDescription>{adminData.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{language === "en" ? "Department" : "ክፍል"}</p>
                  <p className="font-medium">{adminData.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{language === "en" ? "Position" : "ቦታ"}</p>
                  <p className="font-medium">{adminData.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{language === "en" ? "Employee ID" : "የሰራተኛ መታወቂያ"}</p>
                  <p className="font-medium">{adminData.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "NFC Card ID" : "የNFC ካርድ መታወቂያ"}
                  </p>
                  <p className="font-medium">NFC-7654321</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">{language === "en" ? "Performance Rating" : "የአፈጻጸም ደረጃ"}</h4>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${(adminData.performanceRating / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{adminData.performanceRating}/5</span>
                  <span>{language === "en" ? "Excellent" : "እጅግ በጣም ጥሩ"}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">{language === "en" ? "Skills" : "ክህሎቶች"}</h4>
                <div className="flex flex-wrap gap-1">
                  {adminData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right column - Detailed information */}
          <div className="md:col-span-3 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">{language === "en" ? "Personal" : "የግል"}</TabsTrigger>
                <TabsTrigger value="employment">{language === "en" ? "Employment" : "ቅጥር"}</TabsTrigger>
                <TabsTrigger value="permissions">{language === "en" ? "Permissions" : "ፈቃዶች"}</TabsTrigger>
                <TabsTrigger value="activity">{language === "en" ? "Activity" : "እንቅስቃሴ"}</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Personal Information" : "የግል መረጃ"}</CardTitle>
                    <CardDescription>
                      {language === "en"
                        ? "Manage your personal information and contact details"
                        : "የግል መረጃዎን እና የመገናኛ ዝርዝሮችዎን ያስተዳድሩ"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Full Name" : "ሙሉ ስም"}</label>
                        {isEditing ? (
                          <Input defaultValue={adminData.name} className="w-full" />
                        ) : (
                          <div className="flex items-center border rounded-md p-2">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{adminData.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Email" : "ኢሜይል"}</label>
                        {isEditing ? (
                          <Input defaultValue={adminData.email} className="w-full" />
                        ) : (
                          <div className="flex items-center border rounded-md p-2">
                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{adminData.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Phone" : "ስልክ"}</label>
                        {isEditing ? (
                          <Input defaultValue={adminData.phone} className="w-full" />
                        ) : (
                          <div className="flex items-center border rounded-md p-2">
                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{adminData.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Address" : "አድራሻ"}</label>
                        {isEditing ? (
                          <Input defaultValue={adminData.address} className="w-full" />
                        ) : (
                          <div className="flex items-center border rounded-md p-2">
                            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{adminData.address}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {language === "en" ? "Emergency Contact" : "የአደጋ ጊዜ ተጠሪ"}
                      </label>
                      {isEditing ? (
                        <Input defaultValue={adminData.emergencyContact} />
                      ) : (
                        <div className="flex items-center border rounded-md p-2">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{adminData.emergencyContact}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{language === "en" ? "Languages" : "ቋንቋዎች"}</label>
                      <div className="flex flex-wrap gap-2">
                        {adminData.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Employment Tab */}
              <TabsContent value="employment">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Employment Information" : "የቅጥር መረጃ"}</CardTitle>
                    <CardDescription>
                      {language === "en" ? "Your employment details and certifications" : "የቅጥር ዝርዝሮችዎ እና የምስክር ወረቀቶች"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {language === "en" ? "Employee ID" : "የሰራተኛ መታወቂያ"}
                        </label>
                        <div className="flex items-center border rounded-md p-2">
                          <CircleUser className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{adminData.employeeId}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Department" : "ክፍል"}</label>
                        <div className="flex items-center border rounded-md p-2">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{adminData.department}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Position" : "ቦታ"}</label>
                        <div className="flex items-center border rounded-md p-2">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{adminData.role}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">{language === "en" ? "Join Date" : "የተቀጠረበት ቀን"}</label>
                        <div className="flex items-center border rounded-md p-2">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{adminData.joinDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{language === "en" ? "Certifications" : "የምስክር ወረቀቶች"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {adminData.certifications.map((cert) => (
                          <div key={cert} className="border rounded-md p-4">
                            <div className="flex items-start">
                              <Award className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                              <div>
                                <div className="font-medium">{cert}</div>
                                <div className="text-sm text-muted-foreground">
                                  {language === "en" ? "Issued: 2022" : "የተሰጠበት: 2022"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{language === "en" ? "Skills" : "ክህሎቶች"}</h3>
                      <div className="border rounded-md p-4">
                        <div className="flex flex-wrap gap-2">
                          {adminData.skills.map((skill) => (
                            <Badge key={skill} className="px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "System Permissions" : "የስርዓት ፈቃዶች"}</CardTitle>
                    <CardDescription>
                      {language === "en" ? "Your access levels and system permissions" : "የመዳረሻ ደረጃዎችዎ እና የስርዓት ፈቃዶች"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {adminData.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="font-medium">{permission.name}</p>
                            </div>
                          </div>
                          <div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                permission.level === "Full"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : permission.level === "Partial"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}
                            >
                              {permission.level === "Full"
                                ? language === "en"
                                  ? "Full Access"
                                  : "ሙሉ መዳረሻ"
                                : permission.level === "Partial"
                                  ? language === "en"
                                    ? "Partial Access"
                                    : "ከፊል መዳረሻ"
                                  : language === "en"
                                    ? "View Only"
                                    : "እይታ ብቻ"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{language === "en" ? "Security Keys" : "የደህንነት ቁልፎች"}</h3>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Key className="h-5 w-5 text-purple-600" />
                            <div>
                              <p className="font-medium">
                                {language === "en" ? "Two-Factor Authentication" : "ሁለት-ምክንያት ማረጋገጫ"}
                              </p>
                              <p className="text-sm text-muted-foreground">{language === "en" ? "Enabled" : "ነቅቷል"}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            {language === "en" ? "Manage" : "አስተዳድር"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{language === "en" ? "Access Logs" : "የመዳረሻ መዝገቦች"}</h3>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Last 5 access events" : "የመጨረሻዎቹ 5 የመዳረሻ ክስተቶች"}
                          </p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            {language === "en" ? "View All" : "ሁሉንም ይመልከቱ"}
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {[
                            { date: "2023-04-12", time: "08:45:23", type: "Login", device: "Desktop - Chrome" },
                            { date: "2023-04-11", time: "17:30:12", type: "Logout", device: "Desktop - Chrome" },
                            { date: "2023-04-11", time: "08:15:45", type: "Login", device: "Desktop - Chrome" },
                            { date: "2023-04-10", time: "18:05:33", type: "Logout", device: "Mobile - Safari" },
                            { date: "2023-04-10", time: "12:22:18", type: "Login", device: "Mobile - Safari" },
                          ].map((log, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm p-2 border-b last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`h-2 w-2 rounded-full ${log.type === "Login" ? "bg-green-500" : "bg-red-500"}`}
                                ></span>
                                <span>{log.type}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">{log.device}</span>
                                <span>
                                  {log.date} {log.time}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Recent Activity" : "የቅርብ ጊዜ እንቅስቃሴ"}</CardTitle>
                    <CardDescription>
                      {language === "en"
                        ? "Your recent actions and system activities"
                        : "የቅርብ ጊዜ እርምጃዎችዎ እና የስርዓት እንቅስቃሴዎች"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold">{totalActivities}</div>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Total Activities" : "ጠቅላላ እንቅስቃሴዎች"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold">3</div>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Today's Activities" : "የዛሬ እንቅስቃሴዎች"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-2xl font-bold">12</div>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "This Week" : "በዚህ ሳምንት"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        {language === "en" ? "Activity Timeline" : "የእንቅስቃሴ የጊዜ መስመር"}
                      </h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {language === "en" ? "Action" : "እርምጃ"}
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                {language === "en" ? "Timestamp" : "የጊዜ ማህተም"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-card divide-y divide-border">
                            {recentActivities.map((activity, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{activity.action}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm">{activity.timestamp}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{language === "en" ? "System Alerts" : "የስርዓት ማስጠንቀቂያዎች"}</h3>
                      <div className="border rounded-md p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="font-medium">
                                {language === "en" ? "Password Expiring" : "የይለፍ ቃል ጊዜው ያበቃል"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === "en"
                                  ? "Your password will expire in 5 days"
                                  : "የይለፍ ቃልዎ በ5 ቀናት ውስጥ ጊዜው ያበቃል"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded-md">
                            <Shield className="h-5 w-5 text-green-500" />
                            <div>
                              <p className="font-medium">
                                {language === "en" ? "Security Scan Complete" : "የደህንነት ስካን ተጠናቋል"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {language === "en"
                                  ? "No issues found in the latest scan"
                                  : "በቅርብ ጊዜ ስካን ምንም ችግሮች አልተገኙም"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
