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
  CreditCard,
  MapPin,
  Edit,
  Save,
  Award,
  BookOpen,
  CircleUser,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getWorkerById, getAttendanceByWorkerId, getShiftsByWorkerId } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"

export function WorkerProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [worker, setWorker] = useState(getWorkerById("ETH-W-1001"))
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  // Mock data for additional profile information
  const additionalInfo = {
    address: "Bole Sub-City, Addis Ababa",
    emergencyContact: "Meron Kebede: +251922345678",
    skills: [
      t("profile.skills.machineOperation"),
      t("profile.skills.qualityControl"),
      t("profile.skills.teamLeadership"),
    ],
    education: t("profile.education.diploma"),
    languages: [t("profile.languages.amharic"), t("profile.languages.english"), t("profile.languages.oromo")],
    performanceRating: 4.2,
    certifications: [t("profile.certifications.workplaceSafety"), t("profile.certifications.machineOperation")],
    profileImage: "/placeholder.svg?height=200&width=200",
  }

  const attendance = getAttendanceByWorkerId(worker?.id || "")
  const shifts = getShiftsByWorkerId(worker?.id || "")

  // Calculate attendance metrics
  const totalDays = attendance.length
  const presentDays = attendance.filter((a) => a.status === "present").length
  const lateDays = attendance.filter((a) => a.status === "late").length
  const absentDays = attendance.filter((a) => a.status === "absent").length
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: t("profile.toast.updated"),
      description: t("profile.toast.updatedDescription"),
    })
  }

  if (!worker) {
    return <div>{t("profile.workerNotFound")}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{t("profile.title")}</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              {t("profile.saveChanges")}
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              {t("profile.editProfile")}
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
                <img
                  src={additionalInfo.profileImage || "/placeholder.svg"}
                  alt={worker.name}
                  className="rounded-full w-32 h-32 object-cover border-4 border-primary/20"
                />
                <Badge className="mt-2 px-3" variant={worker.status === "active" ? "default" : "outline"}>
                  {t(`profile.status.${worker.status}`)}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-xl">{worker.name}</CardTitle>
            <CardDescription>{worker.position}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("profile.department")}:</span>
                <span className="font-medium ml-2">{worker.department}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("profile.position")}:</span>
                <span className="font-medium ml-2">{worker.position}</span>
              </div>
              <div className="flex items-center text-sm">
                <CircleUser className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("profile.employment.employeeId")}:</span>
                <span className="font-medium ml-2">{worker.id}</span>
              </div>
              <div className="flex items-center text-sm">
                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t("profile.nfcCardId")}:</span>
                <span className="font-medium ml-2">{worker.nfcCardId}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">{t("profile.attendanceRate")}</h4>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${attendanceRate}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{attendanceRate}%</span>
                <span>{t("profile.target")}: 95%</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">{t("profile.skills.title")}</h4>
              <div className="flex flex-wrap gap-1">
                {additionalInfo.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
        </Card>

        {/* Right column - Detailed information */}
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">{t("profile.tabs.personal")}</TabsTrigger>
              <TabsTrigger value="employment">{t("profile.tabs.employment")}</TabsTrigger>
              <TabsTrigger value="qualifications">{t("profile.tabs.qualifications")}</TabsTrigger>
              <TabsTrigger value="performance">{t("profile.tabs.performance")}</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.personalInfo.title")}</CardTitle>
                  <CardDescription>{t("profile.personalInfo.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.personalInfo.fullName")}</label>
                      {isEditing ? (
                        <Input defaultValue={worker.name} className="w-full" />
                      ) : (
                        <div className="flex items-center border rounded-md p-2">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{worker.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.personalInfo.email")}</label>
                      {isEditing ? (
                        <Input defaultValue={worker.email} className="w-full" />
                      ) : (
                        <div className="flex items-center border rounded-md p-2">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{worker.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.personalInfo.phone")}</label>
                      {isEditing ? (
                        <Input defaultValue={worker.phoneNumber} className="w-full" />
                      ) : (
                        <div className="flex items-center border rounded-md p-2">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{worker.phoneNumber}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.personalInfo.address")}</label>
                      {isEditing ? (
                        <Input defaultValue={additionalInfo.address} className="w-full" />
                      ) : (
                        <div className="flex items-center border rounded-md p-2">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{additionalInfo.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("profile.personalInfo.emergencyContact")}</label>
                    {isEditing ? (
                      <Input defaultValue={additionalInfo.emergencyContact} />
                    ) : (
                      <div className="flex items-center border rounded-md p-2">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{additionalInfo.emergencyContact}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("profile.personalInfo.languages")}</label>
                    <div className="flex flex-wrap gap-2">
                      {additionalInfo.languages.map((language) => (
                        <Badge key={language} variant="outline">
                          {language}
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
                  <CardTitle>{t("profile.employment.title")}</CardTitle>
                  <CardDescription>{t("profile.employment.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.employment.employeeId")}</label>
                      <div className="flex items-center border rounded-md p-2">
                        <CircleUser className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{worker.id}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.department")}</label>
                      <div className="flex items-center border rounded-md p-2">
                        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{worker.department}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.position")}</label>
                      <div className="flex items-center border rounded-md p-2">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{worker.position}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("profile.joinDate")}</label>
                      <div className="flex items-center border rounded-md p-2">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{worker.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("profile.employment.currentSchedule")}</label>
                    <div className="border rounded-md p-4">
                      <div className="grid grid-cols-3 gap-4">
                        {shifts.slice(0, 3).map((shift) => (
                          <div key={shift.id} className="border rounded-md p-2">
                            <div className="text-sm font-medium">{shift.date}</div>
                            <div className="text-xs text-muted-foreground">
                              {shift.startTime} - {shift.endTime}
                            </div>
                            <Badge variant="outline" className="mt-1">
                              {t(`profile.employment.${shift.type}Shift`)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Qualifications Tab */}
            <TabsContent value="qualifications">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.qualifications.title")}</CardTitle>
                  <CardDescription>{t("profile.qualifications.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.qualifications.education")}</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <BookOpen className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">{additionalInfo.education}</div>
                          <div className="text-sm text-muted-foreground">2018 - 2021</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.qualifications.certifications")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalInfo.certifications.map((cert) => (
                        <div key={cert} className="border rounded-md p-4">
                          <div className="flex items-start">
                            <Award className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                            <div>
                              <div className="font-medium">{cert}</div>
                              <div className="text-sm text-muted-foreground">
                                {t("profile.qualifications.issued")}: 2023
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.skills.title")}</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex flex-wrap gap-2">
                        {additionalInfo.skills.map((skill) => (
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

            {/* Performance Tab */}
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.performance.title")}</CardTitle>
                  <CardDescription>{t("profile.performance.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.performance.rating")}</h3>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-3xl font-bold">{additionalInfo.performanceRating}</div>
                            <div className="text-sm text-muted-foreground">{t("profile.performance.outOf")} 5.0</div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(additionalInfo.performanceRating)
                                    ? "text-yellow-400"
                                    : i < additionalInfo.performanceRating
                                      ? "text-yellow-200"
                                      : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t("profile.performance.lastUpdated")}: {t("profile.performance.march")} 2025
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.performance.attendanceSummary")}</h3>
                    <div className="border rounded-md p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">{presentDays}</div>
                          <div className="text-sm text-muted-foreground">{t("profile.performance.present")}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-500">{lateDays}</div>
                          <div className="text-sm text-muted-foreground">{t("profile.performance.late")}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-500">{absentDays}</div>
                          <div className="text-sm text-muted-foreground">{t("profile.performance.absent")}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-medium mb-1">
                          {t("profile.attendanceRate")}: {attendanceRate}%
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${attendanceRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">{t("profile.performance.recentAttendance")}</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {t("profile.performance.date")}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {t("profile.performance.checkIn")}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {t("profile.performance.checkOut")}
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {t("profile.performance.status")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          {attendance.slice(0, 5).map((record) => (
                            <tr key={record.id}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{record.date}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{record.checkInTime || "-"}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">{record.checkOutTime || "-"}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                <Badge
                                  variant={
                                    record.status === "present"
                                      ? "default"
                                      : record.status === "late"
                                        ? "warning"
                                        : "destructive"
                                  }
                                >
                                  {t(`profile.performance.${record.status}`)}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
