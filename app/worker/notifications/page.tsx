"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { Bell, Clock, Calendar, AlertTriangle, CheckCircle2, Info, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function NotificationsPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [date] = useState(new Date())

  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      title: language === "en" ? "Clock Out Reminder" : "የመውጫ ማስታወሻ",
      message:
        language === "en"
          ? "You haven't clocked out yesterday. Please remember to clock out at the end of your shift."
          : "ትላንት አልወጣህም። እባክህ የፈረቃህ መጨረሻ ላይ መውጣትህን አስታውስ።",
      date: "2025-03-28T17:00:00",
      read: false,
    },
    {
      id: 2,
      type: "schedule",
      title: language === "en" ? "Shift Change" : "የፈረቃ ለውጥ",
      message:
        language === "en"
          ? "Your shift for next week has been changed from Morning to Evening."
          : "ለሚቀጥለው ሳምንት ያለህ ፈረቃ ከጠዋት ወደ ማታ ተቀይሯል።",
      date: "2025-03-27T09:15:00",
      read: true,
    },
    {
      id: 3,
      type: "warning",
      title: language === "en" ? "Late Arrival Warning" : "የዘገየ መምጣት ማስጠንቀቂያ",
      message:
        language === "en"
          ? "You have been late 3 times this month. Please ensure you arrive on time."
          : "በዚህ ወር 3 ጊዜ ዘግይተሃል። እባክህ በሰዓቱ መድረስህን አረጋግጥ።",
      date: "2025-03-26T08:30:00",
      read: false,
    },
    {
      id: 4,
      type: "success",
      title: language === "en" ? "Leave Request Approved" : "የፈቃድ ጥያቄ ጸድቋል",
      message:
        language === "en" ? "Your leave request for April 10-12 has been approved." : "ለሚያዚያ 2-4 ያቀረብከው የፈቃድ ጥያቄ ጸድቋል።",
      date: "2025-03-25T14:20:00",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: language === "en" ? "Payslip Available" : "የደመወዝ ደረሰኝ ይገኛል",
      message:
        language === "en"
          ? "Your payslip for March 2025 is now available. You can view it in the Payslips section."
          : "የመጋቢት 2017 የደመወዝ ደረሰኝህ አሁን ይገኛል። በደመወዝ ደረሰኞች ክፍል ውስጥ ማየት ትችላለህ።",
      date: "2025-03-24T10:00:00",
      read: false,
    },
  ])

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))

    toast({
      title: language === "en" ? "All Notifications Marked as Read" : "ሁሉም ማሳወቂያዎች እንደተነበቡ ተምልክተዋል",
      description:
        language === "en" ? "All your notifications have been marked as read" : "ሁሉም ማሳወቂያዎችህ እንደተነበቡ ተምልክተዋል",
    })
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "schedule":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-sky-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const notificationDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - notificationDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return language === "en" ? "Today" : "ዛሬ"
    } else if (diffDays === 1) {
      return language === "en" ? "Yesterday" : "ትላንት"
    } else {
      return notificationDate.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-8">
        {/* Page header - Matching the My Requests page layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {language === "en" ? "Notifications" : "ማሳወቂያዎች"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {language === "en" ? "Stay updated with important information" : "ከጠቃሚ መረጃዎች ጋር ወቅታዊ ይሁኑ"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                {language === "en" ? "Mark All as Read" : "ሁሉንም እንደተነበበ ምልክት አድርግ"}
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              <span>{language === "en" ? "Export" : "ላክ"}</span>
            </Button>
          </div>
        </div>

        {/* Notifications card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-600" />
                <CardTitle>{language === "en" ? "Your Notifications" : "የእርስዎ ማሳወቂያዎች"}</CardTitle>
              </div>
              {unreadCount > 0 && (
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  {unreadCount} {language === "en" ? "Unread" : "ያልተነበቡ"}
                </Badge>
              )}
            </div>
            <CardDescription>
              {language === "en"
                ? "Stay updated with important information about your work"
                : "ስለ ስራዎ ጠቃሚ መረጃዎችን ይከታተሉ"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 rounded-lg border ${
                      notification.read ? "bg-card" : "bg-purple-50 border-purple-200"
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                      </div>
                      <p className="text-sm">{notification.message}</p>
                      {!notification.read && (
                        <div className="mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            {language === "en" ? "Mark as read" : "እንደተነበበ ምልክት አድርግ"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">{language === "en" ? "No notifications" : "ምንም ማሳወቂያዎች የሉም"}</h3>
                  <p className="text-muted-foreground mt-1">
                    {language === "en"
                      ? "You're all caught up! Check back later for new notifications."
                      : "ሁሉንም አይተሃል! ለአዲስ ማሳወቂያዎች በኋላ ላይ ተመልሰህ ተመልከት።"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
