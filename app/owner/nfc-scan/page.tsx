"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { PageHeader } from "@/components/page-header"
import { Scan, User, Calendar, Clock, CreditCard, FileText, Download } from "lucide-react"

export default function OwnerNfcScanPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isScanning, setIsScanning] = useState(false)
  const [scannedWorker, setScannedWorker] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("profile")

  // Simulate worker data
  const mockWorker = {
    id: "W12345",
    name: "Abebe Kebede",
    position: "Senior Machine Operator",
    department: "Production",
    status: "active",
    nfcCardId: "NFC-9876543",
    joinDate: "2023-05-15",
    phoneNumber: "+251 91 234 5678",
    email: "abebe.k@example.com",
  }

  const startScan = () => {
    setIsScanning(true)
    toast({
      title: language === "en" ? "Scanning..." : "በመቃኘት ላይ...",
      description: language === "en" ? "Please hold the NFC card near the scanner" : "እባክዎ NFC ካርዱን ወደ ስካነሩ ያቅርቡ",
    })

    // Simulate scanning delay
    setTimeout(() => {
      setScannedWorker(mockWorker)
      setIsScanning(false)

      toast({
        title: language === "en" ? "Card Scanned Successfully" : "ካርድ በተሳካ ሁኔታ ተቃኝቷል",
        description:
          language === "en"
            ? `Worker ID: ${mockWorker.id} - ${mockWorker.name}`
            : `የሰራተኛ መታወቂያ: ${mockWorker.id} - ${mockWorker.name}`,
        variant: "default",
      })
    }, 2000)
  }

  const resetScan = () => {
    setScannedWorker(null)
    setActiveTab("profile")
  }

  const exportEmployeeData = () => {
    toast({
      title: language === "en" ? "Exporting Data" : "ውሂብ በመላክ ላይ",
      description: language === "en" ? "Employee data is being exported to PDF" : "የሰራተኛ ውሂብ ወደ PDF በመላክ ላይ ነው",
    })

    // Simulate export delay
    setTimeout(() => {
      toast({
        title: language === "en" ? "Export Complete" : "መላክ ተጠናቋል",
        description: language === "en" ? "Employee data has been exported successfully" : "የሰራተኛ ውሂብ በተሳካ ሁኔታ ተልኳል",
        variant: "default",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={language === "en" ? "NFC Card Scanner" : "የNFC ካርድ ስካነር"}
        description={
          language === "en"
            ? "Scan employee NFC cards to view their complete information"
            : "የሰራተኞችን NFC ካርዶች ይቃኙ እና ሙሉ መረጃቸውን ይመልከቱ"
        }
      />

      {!scannedWorker ? (
        <Card>
          <CardHeader>
            <CardTitle>{language === "en" ? "NFC Card Scanner" : "የNFC ካርድ ስካነር"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "Scan an employee's NFC card to view their information"
                : "የሰራተኛውን NFC ካርድ ይቃኙ እና መረጃውን ለማየት"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 bg-purple-100 dark:bg-purple-900/20 p-6 rounded-full">
              <Scan className="h-16 w-16 text-purple-600 dark:text-purple-400" />
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportEmployeeData} className="gap-2">
                <Download className="h-4 w-4" />
                {language === "en" ? "Export Data" : "ውሂብ ላክ"}
              </Button>
              <Button variant="outline" onClick={resetScan}>
                {language === "en" ? "Scan Another Card" : "ሌላ ካርድ ቃኝ"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-6">
            <Card className="md:col-span-4">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-6 rounded-full">
                    <User className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold">{scannedWorker.name}</h3>
                    <p className="text-muted-foreground">
                      {scannedWorker.position} - {scannedWorker.department}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {language === "en" ? "Active" : "ንቁ"}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        ID: {scannedWorker.id}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        NFC: {scannedWorker.nfcCardId}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "en" ? "Join Date" : "የተቀጠረበት ቀን"}</p>
                      <p className="font-medium">{new Date(scannedWorker.joinDate).toLocaleDateString()}</p>
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
            <TabsList className="grid grid-cols-5">
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
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {language === "en" ? "Requests" : "ጥያቄዎች"}
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
                        {language === "en" ? "Performance Metrics" : "የአፈጻጸም መለኪያዎች"}
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Productivity Rating" : "የምርታማነት ደረጃ"}
                          </p>
                          <p className="font-medium text-green-600 dark:text-green-400">92%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Quality Rating" : "የጥራት ደረጃ"}
                          </p>
                          <p className="font-medium text-green-600 dark:text-green-400">95%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Attendance Rating" : "የመገኘት ደረጃ"}
                          </p>
                          <p className="font-medium text-green-600 dark:text-green-400">98%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? "Overall Rating" : "አጠቃላይ ደረጃ"}
                          </p>
                          <p className="font-medium text-green-600 dark:text-green-400">94%</p>
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
                  <p className="text-center text-muted-foreground py-6">
                    {language === "en" ? "Attendance data will be displayed here" : "የመገኘት ውሂብ እዚህ ይታያል"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shifts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Shift Schedule" : "የሺፍት መርሃግብር"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Upcoming and past shifts" : "ቀጣይ እና ያለፉ ሺፍቶች"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-6">
                    {language === "en" ? "Shift data will be displayed here" : "የሺፍት ውሂብ እዚህ ይታያል"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payroll" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Payroll Information" : "የክፍያ መረጃ"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Salary and payment history" : "የደመወዝ እና የክፍያ ታሪክ"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-6">
                    {language === "en" ? "Payroll data will be displayed here" : "የክፍያ ውሂብ እዚህ ይታያል"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === "en" ? "Employee Requests" : "የሰራተኛ ጥያቄዎች"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Leave, shift swap, and emergency requests"
                      : "የፈቃድ፣ የሺፍት ቅይይር እና የአደጋ ጊዜ ጥያቄዎች"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-6">
                    {language === "en" ? "No requests found for this employee" : "ለዚህ ሰራተኛ ምንም ጥያቄዎች አልተገኙም"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
