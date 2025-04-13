"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/context/language-context"

export default function WorkerDashboardPage() {
  const { language } = useLanguage()
  const [date] = useState(new Date())

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-black text-white p-6 pb-8">
        <h1 className="text-2xl font-bold">{language === "en" ? "Worker Portal" : "የሰራተኛ ፖርታል"}</h1>
        <p className="text-gray-400 mt-1">
          {language === "en" ? "Welcome to your worker dashboard" : "እንኳን ወደ የሰራተኛ ዳሽቦርድዎ በደህና መጡ"}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-transparent border-purple-700 text-purple-400 hover:bg-purple-900">
            {language === "en" ? "Worker ID: WRK-1001" : "የሰራተኛ መታወቂያ: WRK-1001"}
          </Badge>
          <Badge variant="outline" className="bg-transparent border-purple-700 text-purple-400 hover:bg-purple-900">
            {language === "en" ? "Shift: Morning" : "ፈረቃ: ጠዋት"}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Hours Worked" : "የሰራት ሰዓታት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">38.5h</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "en" ? "This week" : "በዚህ ሳምንት"}</p>
              <Progress value={80} className="h-2 mt-3 bg-gray-200">
                <div className="h-full bg-purple-600" style={{ width: "80%" }} />
              </Progress>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Attendance" : "መገኘት"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "en" ? "This month" : "በዚህ ወር"}</p>
              <Progress value={98} className="h-2 mt-3 bg-gray-200">
                <div className="h-full bg-purple-600" style={{ width: "98%" }} />
              </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Performance" : "አፈጻጸም"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "en" ? "Average rating" : "አማካይ ደረጃ"}</p>
              <Progress value={92} className="h-2 mt-3 bg-gray-200">
                <div className="h-full bg-purple-600" style={{ width: "92%" }} />
              </Progress>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {language === "en" ? "Leave Balance" : "የፈቃድ ቀሪ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12 {language === "en" ? "days" : "ቀናት"}</div>
              <p className="text-xs text-muted-foreground mt-1">{language === "en" ? "Annual leave" : "ዓመታዊ ፈቃድ"}</p>
              <Progress value={75} className="h-2 mt-3 bg-gray-200">
                <div className="h-full bg-purple-600" style={{ width: "75%" }} />
              </Progress>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="schedule" className="mt-6">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {language === "en" ? "Schedule" : "የጊዜ ሰሌዳ"}
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              {language === "en" ? "Announcements" : "ማስታወቂያዎች"}
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {language === "en" ? "My Requests" : "የእኔ ጥያቄዎች"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{language === "en" ? "Upcoming Shifts" : "ቀጣይ ፈረቃዎች"}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[
                    {
                      day: "Monday",
                      amharicDay: "ሰኞ",
                      date: "Mar 29",
                      amharicDate: "መጋቢት 20",
                      time: "08:00 - 16:00",
                      shift: "Morning",
                      amharicShift: "ጠዋት",
                    },
                    {
                      day: "Tuesday",
                      amharicDay: "ማክሰኞ",
                      date: "Mar 30",
                      amharicDate: "መጋቢት 21",
                      time: "08:00 - 16:00",
                      shift: "Morning",
                      amharicShift: "ጠዋት",
                    },
                    {
                      day: "Wednesday",
                      amharicDay: "ረቡዕ",
                      date: "Mar 31",
                      amharicDate: "መጋቢት 22",
                      time: "08:00 - 16:00",
                      shift: "Morning",
                      amharicShift: "ጠዋት",
                    },
                    {
                      day: "Thursday",
                      amharicDay: "ሐሙስ",
                      date: "Apr 1",
                      amharicDate: "መጋቢት 23",
                      time: "16:00 - 00:00",
                      shift: "Evening",
                      amharicShift: "ማታ",
                    },
                    {
                      day: "Friday",
                      amharicDay: "አርብ",
                      date: "Apr 2",
                      amharicDate: "መጋቢት 24",
                      time: "16:00 - 00:00",
                      shift: "Evening",
                      amharicShift: "ማታ",
                    },
                  ].map((shift, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-md bg-card">
                      <div>
                        <p className="font-medium">
                          {language === "en"
                            ? `${shift.day} (${shift.date})`
                            : `${shift.amharicDay} (${shift.amharicDate})`}
                        </p>
                        <p className="text-sm text-muted-foreground">{shift.time}</p>
                      </div>
                      <Badge className={shift.shift === "Morning" ? "bg-purple-600" : "bg-indigo-600"}>
                        {language === "en" ? shift.shift : shift.amharicShift}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {language === "en" ? "Factory Announcements" : "የፋብሪካ ማስታወቂያዎች"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: language === "en" ? "Maintenance Scheduled" : "የጥገና ጊዜ ሰሌዳ",
                      date: language === "en" ? "Mar 28" : "መጋቢት 19",
                      description:
                        language === "en"
                          ? "Factory maintenance scheduled for Sunday. No shifts affected."
                          : "የፋብሪካ ጥገና ለእሁድ ተያዟል። ምንም ፈረቃዎች አይጎዱም።",
                    },
                    {
                      title: language === "en" ? "New Safety Protocols" : "አዲስ የደህንነት ፕሮቶኮሎች",
                      date: language === "en" ? "Mar 25" : "መጋቢት 16",
                      description:
                        language === "en"
                          ? "Updated safety protocols available on the notice board."
                          : "የተዘመኑ የደህንነት ፕሮቶኮሎች በማስታወቂያ ሰሌዳው ላይ ይገኛሉ።",
                    },
                    {
                      title: language === "en" ? "Monthly Meeting" : "ወርሃዊ ስብሰባ",
                      date: language === "en" ? "Mar 22" : "መጋቢት 13",
                      description:
                        language === "en"
                          ? "All staff meeting on Friday at 4PM in the main hall."
                          : "የሁሉም ሰራተኞች ስብሰባ በዓርብ ከሰዓት በኋላ በ4 ሰዓት በዋናው አዳራሽ።",
                    },
                  ].map((announcement, i) => (
                    <Card key={i} className="border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{announcement.title}</h4>
                          <span className="text-xs text-muted-foreground">{announcement.date}</span>
                        </div>
                        <p className="text-sm">{announcement.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{language === "en" ? "My Requests" : "የእኔ ጥያቄዎች"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      type: language === "en" ? "Leave" : "ፈቃድ",
                      dates: language === "en" ? "Apr 10 - Apr 12" : "መጋቢት 30 - ሚያዚያ 2",
                      reason: language === "en" ? "Family visit" : "ቤተሰብ ጉብኝት",
                      status: language === "en" ? "Pending" : "በመጠባበቅ ላይ",
                      statusColor: "bg-yellow-500",
                    },
                    {
                      type: language === "en" ? "Shift Swap" : "የፈረቃ ልውውጥ",
                      dates: language === "en" ? "Apr 2" : "ሚያዚያ 2",
                      reason: language === "en" ? "Medical appointment" : "የሐኪም ቀጠሮ",
                      status: language === "en" ? "Approved" : "ጸድቋል",
                      statusColor: "bg-green-500",
                    },
                    {
                      type: language === "en" ? "Leave" : "ፈቃድ",
                      dates: language === "en" ? "Mar 15" : "መጋቢት 5",
                      reason: language === "en" ? "Personal" : "የግል",
                      status: language === "en" ? "Completed" : "ተጠናቋል",
                      statusColor: "bg-blue-500",
                    },
                  ].map((request, i) => (
                    <Card key={i} className="border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{request.type}</span>
                            <Badge className={request.statusColor + " text-white"}>{request.status}</Badge>
                          </div>
                          <span className="text-sm">{request.dates}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.reason}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
