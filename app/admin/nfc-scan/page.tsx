"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { workers, getShiftsByWorkerId, getAttendanceByWorkerId, getPayrollByWorkerId } from "@/lib/mock-data"
import { Scan, User, Calendar, Clock, CreditCard, AlertTriangle, CheckCircle2 } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { motion } from "framer-motion"

export default function AdminNfcScanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isScanning, setIsScanning] = useState(false)
  const [scannedWorker, setScannedWorker] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    // Check if user is logged in as admin
    const storedUser = localStorage.getItem("rona_user")
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user || user.role !== "admin") {
      toast({
        title: language === "en" ? "Access denied" : "መዳረሻ ተከልክሏል",
        description: language === "en" ? "You must be logged in as an admin" : "እንደ አስተዳዳሪ መግባት አለብዎት",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast, language])

  const startScan = () => {
    setIsScanning(true)
    toast({
      title: language === "en" ? "Scanning started" : "ስካን መጀመሩ",
      description: language === "en" ? "Please hold the NFC card near the scanner" : "እባክዎ NFC ካርዱን ወደ ስካነሩ ያቅርቡ",
    })

    // Simulate scanning delay
    setTimeout(() => {
      // Randomly select a worker for demo purposes
      const randomWorker = workers[Math.floor(Math.random() * workers.length)]

      setScannedWorker({
        ...randomWorker,
        shifts: getShiftsByWorkerId(randomWorker.id),
        attendance: getAttendanceByWorkerId(randomWorker.id),
        payroll: getPayrollByWorkerId(randomWorker.id),
      })

      setIsScanning(false)

      toast({
        title: language === "en" ? "Card Scanned Successfully" : "ካርድ በተሳካ ሁኔታ ተቃኝቷል",
        description:
          language === "en"
            ? `Worker ID: ${randomWorker.id} - ${randomWorker.name}`
            : `የሰራተኛ መታወቂያ: ${randomWorker.id} - ${randomWorker.name}`,
        variant: "default",
      })
    }, 2000)
  }

  const resetScan = () => {
    setScannedWorker(null)
    setActiveTab("profile")
  }

  return (
    <DashboardShell
      title={language === "en" ? "NFC Card Scanner" : "የNFC ካርድ ስካነር"}
      description={
        language === "en"
          ? "Scan employee NFC cards to view their complete information"
          : "የሰራተኞችን NFC ካርዶች ይቃኙ እና ሙሉ መረጃቸውን ይመልከቱ"
      }
    >
      {!scannedWorker ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === "en" ? "NFC Card Scanner" : "የNFC ካርድ ስካነር"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "Scan an employee's NFC card to view their information"
                : "የሰራተኛውን NFC ካርድ ይቃኙ እና መረጃውን ለማየት"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 bg-purple-100 p-6 rounded-full">
              <Scan className="h-16 w-16 text-purple-600" />
            </div>
            <p className="text-center mb-6 max-w-md text-muted-foreground">
              {language === "en"
                ? "Place the employee's NFC card near the scanner to retrieve their information. This will provide you with access to their complete profile, attendance records, shift schedule, and payroll information."
                : "የሰራተኛውን NFC ካርድ ወደ ስካነሩ ያቅርቡ እና መረጃውን ለማግኘት። ይህ ሙሉ መገለጫቸውን፣ የመገኘት መዝገቦቻቸውን፣ የሺፍት መርሃግብራቸውን እና የክፍያ መረጃቸውን ለማግኘት ያስችልዎታል።"}
            </p>
            <Button
              size="lg"
              onClick={startScan}
              disabled={isScanning}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
            >
              {isScanning ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                  {language === "en" ? "Scanning..." : "በመቃኘት ላይ..."}
                </>
              ) : (
                <>
                  <Scan className="h-4 w-4" />
                  {language === "en" ? "Start Scanning" : "መቃኘት ጀምር"}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{language === "en" ? "Employee Information" : "የሰራተኛ መረጃ"}</h2>
            <Button variant="outline" onClick={resetScan}>
              {language === "en" ? "Scan Another Card" : "ሌላ ካርድ ቃኝ"}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-6">
            <Card className="md:col-span-4">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="bg-primary/10 p-6 rounded-full">
                    <User className="h-16 w-16 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold">{scannedWorker.name}</h3>
                    <p className="text-muted-foreground">
                      {scannedWorker.position} - {scannedWorker.department}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          scannedWorker.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : scannedWorker.status === "on-leave"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {scannedWorker.status === "active"
                          ? language === "en"
                            ? "Active"
                            : "ንቁ"
                          : scannedWorker.status === "on-leave"
                            ? language === "en"
                              ? "On Leave"
                              : "በፈቃድ ላይ"
                            : language === "en"
                              ? "Inactive"
                              : "ንቁ ያልሆነ"}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        ID: {scannedWorker.id}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        NFC: {scannedWorker.nfcCardId}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Employee ID" : "የሰራተኛ መታወቂያ"}
                      </p>
                      <p className="font-medium">{scannedWorker.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "en" ? "Phone" : "ስልክ"}</p>
                      <p className="font-medium">{scannedWorker.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "en" ? "Email" : "ኢሜይል"}</p>
                      <p className="font-medium">{scannedWorker.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "en" ? "Department" : "ክፍል"}</p>
                      <p className="font-medium">{scannedWorker.department}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === "en" ? "Profile" : "መገለጫ"}
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {language === "en" ? "Attendance" : "መገኘት"}
              </TabsTrigger>
              <TabsTrigger value="shifts" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {language === "en" ? "Shifts" : "ሺፍቶች"}
              </TabsTrigger>
              <TabsTrigger value="payroll" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {language === "en" ? "Payroll" : "ክፍያ"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Employee Profile" : "የሰራተኛ መገለጫ"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Detailed information about the employee" : "ስለ ሰራተኛው ዝርዝር መረጃ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">{language === "en" ? "Personal Information" : "የግል መረጃ"}</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Full Name" : "ሙሉ ስም"}</p>
                          <p className="font-medium">{scannedWorker.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Employee ID" : "የሰራተኛ መታወቂያ"}
                          </p>
                          <p className="font-medium">{scannedWorker.id}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "NFC Card ID" : "የNFC ካርድ መታወቂያ"}
                          </p>
                          <p className="font-medium">{scannedWorker.nfcCardId}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Join Date" : "የተቀጠረበት ቀን"}
                          </p>
                          <p className="font-medium">{new Date(scannedWorker.joinDate).toLocaleDateString()}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Status" : "ሁኔታ"}</p>
                          <p className="font-medium capitalize">{scannedWorker.status}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">{language === "en" ? "Contact Information" : "የመገናኛ መረጃ"}</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Phone Number" : "ስልክ ቁጥር"}
                          </p>
                          <p className="font-medium">{scannedWorker.phoneNumber}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Email" : "ኢሜይል"}</p>
                          <p className="font-medium">{scannedWorker.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Emergency Contact" : "የአደጋ ጊዜ ተጠሪ"}
                          </p>
                          <p className="font-medium">+251 91 234 5678</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Address" : "አድራሻ"}</p>
                          <p className="font-medium">Addis Ababa, Ethiopia</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">
                        {language === "en" ? "Employment Information" : "የቅጥር መረጃ"}
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Department" : "ክፍል"}</p>
                          <p className="font-medium">{scannedWorker.department}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Position" : "ቦታ"}</p>
                          <p className="font-medium">{scannedWorker.position}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Supervisor" : "ተቆጣጣሪ"}</p>
                          <p className="font-medium">Dawit Mengistu</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Work Schedule" : "የስራ መርሃግብር"}
                          </p>
                          <p className="font-medium">Monday - Friday, 8:00 - 17:00</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">
                        {language === "en" ? "Skills & Qualifications" : "ክህሎቶች እና ብቃቶች"}
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Education" : "ትምህርት"}</p>
                          <p className="font-medium">Diploma in Textile Engineering</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Skills" : "ክህሎቶች"}</p>
                          <p className="font-medium">Machine Operation, Quality Control</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">{language === "en" ? "Languages" : "ቋንቋዎች"}</p>
                          <p className="font-medium">Amharic, English</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Certifications" : "የምስክር ወረቀቶች"}
                          </p>
                          <p className="font-medium">Safety Training, Machine Operation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Attendance Records" : "የመገኘት መዝገቦች"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Recent attendance history" : "የቅርብ ጊዜ የመገኘት ታሪክ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scannedWorker.attendance.map((record: any) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {record.status === "present" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : record.status === "late" ? (
                            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                          <div>
                            <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">
                              {record.status === "present"
                                ? language === "en"
                                  ? "Present"
                                  : "ተገኝቷል"
                                : record.status === "late"
                                  ? language === "en"
                                    ? "Late"
                                    : "ዘግይቷል"
                                  : record.status === "absent"
                                    ? language === "en"
                                      ? "Absent"
                                      : "አልተገኘም"
                                    : language === "en"
                                      ? "Early Departure"
                                      : "ቀድሞ ወጥቷል"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {record.checkInTime ? record.checkInTime : "-"} -{" "}
                            {record.checkOutTime ? record.checkOutTime : "-"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Check-in / Check-out" : "መግቢያ / መውጫ"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">{language === "en" ? "Attendance Summary" : "የመገኘት ማጠቃለያ"}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                          {language === "en" ? "Present Days" : "የተገኙ ቀናት"}
                        </p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-400">
                          {
                            scannedWorker.attendance.filter((a: any) => a.status === "present" || a.status === "late")
                              .length
                          }
                        </p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                          {language === "en" ? "Absent Days" : "ያልተገኙ ቀናት"}
                        </p>
                        <p className="text-xl font-bold text-red-700 dark:text-red-400">
                          {scannedWorker.attendance.filter((a: any) => a.status === "absent").length}
                        </p>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                          {language === "en" ? "Late Arrivals" : "የዘገዩ መግቢያዎች"}
                        </p>
                        <p className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                          {scannedWorker.attendance.filter((a: any) => a.status === "late").length}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                          {language === "en" ? "Attendance Rate" : "የመገኘት መጠን"}
                        </p>
                        <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                          {Math.round(
                            (scannedWorker.attendance.filter((a: any) => a.status === "present" || a.status === "late")
                              .length /
                              scannedWorker.attendance.length) *
                              100,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shifts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Shift Schedule" : "የሺፍት መርሃግብር"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Upcoming and recent shifts" : "ቀጣይ እና የቅርብ ጊዜ ሺፍቶች"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scannedWorker.shifts.map((shift: any) => (
                      <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(shift.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {shift.type} {language === "en" ? "Shift" : "ሺፍት"}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">
                            {shift.startTime} - {shift.endTime}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Working Hours" : "የስራ ሰዓታት"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm px-2 py-1 rounded-full ${
                              shift.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : shift.status === "scheduled"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : shift.status === "missed"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {shift.status === "completed"
                              ? language === "en"
                                ? "Completed"
                                : "ተጠናቋል"
                              : shift.status === "scheduled"
                                ? language === "en"
                                  ? "Scheduled"
                                  : "ታቅዷል"
                                : shift.status === "missed"
                                  ? language === "en"
                                    ? "Missed"
                                    : "ጠፍቷል"
                                  : language === "en"
                                    ? "Swapped"
                                    : "ተቀያይሯል"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Payroll Information" : "የክፍያ መረጃ"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Salary and payment history" : "ደመወዝ እና የክፍያ ታሪክ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">
                        {language === "en" ? "Current Salary Information" : "የአሁኑ ደመወዝ መረጃ"}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Basic Salary" : "መሰረታዊ ደመወዝ"}
                          </p>
                          <p className="text-xl font-bold">
                            ETB {scannedWorker.payroll[0]?.basicSalary.toLocaleString() || "4,000"}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Overtime Rate" : "የትርፍ ሰዓት ተመን"}
                          </p>
                          <p className="text-xl font-bold">ETB 50/hr</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Payment Method" : "የክፍያ ዘዴ"}
                          </p>
                          <p className="text-xl font-bold">{language === "en" ? "Bank Transfer" : "የባንክ ዝውውር"}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Pay Cycle" : "የክፍያ ዑደት"}
                          </p>
                          <p className="text-xl font-bold">{language === "en" ? "Monthly" : "ወርሃዊ"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">{language === "en" ? "Payment History" : "የክፍያ ታሪክ"}</h3>
                      <div className="space-y-4">
                        {scannedWorker.payroll.map((record: any) => (
                          <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{record.period}</p>
                              <p className="text-sm text-muted-foreground">
                                {record.status === "paid"
                                  ? language === "en"
                                    ? `Paid on ${record.paymentDate}`
                                    : `በ${record.paymentDate} ተከፍሏል`
                                  : record.status === "pending"
                                    ? language === "en"
                                      ? "Pending"
                                      : "በመጠባበቅ ላይ"
                                    : language === "en"
                                      ? "Processing"
                                      : "በማቀነባበር ላይ"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">ETB {record.totalAmount.toLocaleString()}</p>
                              <div className="flex items-center justify-end gap-2">
                                <p className="text-xs text-muted-foreground">
                                  {language === "en" ? "Basic: " : "መሰረታዊ: "}
                                  {record.basicSalary.toLocaleString()}
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                  +{record.overtime.toLocaleString()}
                                </p>
                                <p className="text-xs text-red-600 dark:text-red-400">
                                  -{record.deductions.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
      {/* Floating NFC Scan Bubble Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          onClick={startScan}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center p-0 border-4 border-white"
          aria-label="Start NFC scan"
        >
          <Scan className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    </DashboardShell>
  )
}
