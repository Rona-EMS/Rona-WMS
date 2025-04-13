"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { factories, subscriptions } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"
import { Check, Edit, Plus, RefreshCw, X } from "lucide-react"

export function SubscriptionManagement() {
  const [selectedFactory, setSelectedFactory] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<string | null>(null)

  const { toast } = useToast()
  const { language, t } = useLanguage()

  // Make the edit functionality more interactive
  const handleSaveSubscription = () => {
    setIsEditing(false)
    setEditingSubscription(null)

    toast({
      title: language === "en" ? "Subscription updated" : "ደንበኝነት ተዘምኗል",
      description: language === "en" ? "The subscription has been successfully updated" : "ደንበኝነቱ በተሳካ ሁኔታ ተዘምኗል",
    })
  }

  // Make the renew functionality more interactive
  const handleRenewSubscription = (subscriptionId: string) => {
    // Show loading state
    toast({
      title: language === "en" ? "Processing" : "በማስኬድ ላይ",
      description: language === "en" ? "Renewing subscription..." : "ደንበኝነትን በማደስ ላይ...",
    })

    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === "en" ? "Subscription renewed" : "ደንበኝነት ታደሰ",
        description: language === "en" ? "The subscription has been successfully renewed" : "ደንበኝነቱ በተሳካ ሁኔታ ታድሷል",
      })
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    let variant = ""

    switch (status) {
      case "active":
        variant = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
        break
      case "trial":
        variant = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
        break
      case "expired":
        variant = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        break
      default:
        variant = "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }

    return (
      <Badge className={variant} variant="outline">
        {status === "active"
          ? language === "en"
            ? "Active"
            : "ንቁ"
          : status === "trial"
            ? language === "en"
              ? "Trial"
              : "ሙከራ"
            : language === "en"
              ? "Expired"
              : "ጊዜው ያለፈበት"}
      </Badge>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{language === "en" ? "Subscription Management" : "የደንበኝነት አስተዳደር"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Manage factory subscriptions and billing" : "የፋብሪካ ደንበኝነቶችን እና ክፍያዎችን ያስተዳድሩ"}
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            {/* Make the New Subscription button functional */}
            <Button className="px-4">
              <Plus className="mr-2 h-4 w-4" />
              {language === "en" ? "New Subscription" : "አዲስ ደንበኝነት"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <Label htmlFor="factory-filter">{language === "en" ? "Filter by Factory" : "በፋብሪካ አጣራ"}</Label>
            <Select value={selectedFactory} onValueChange={setSelectedFactory}>
              <SelectTrigger id="factory-filter">
                <SelectValue placeholder={language === "en" ? "All Factories" : "ሁሉም ፋብሪካዎች"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{language === "en" ? "All Factories" : "ሁሉም ፋብሪካዎች"}</SelectItem>
                {factories.map((factory) => (
                  <SelectItem key={factory.id} value={factory.id}>
                    {factory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <Label htmlFor="status-filter">{language === "en" ? "Filter by Status" : "በሁኔታ አጣራ"}</Label>
            <Select defaultValue="all">
              <SelectTrigger id="status-filter">
                <SelectValue placeholder={language === "en" ? "All Statuses" : "ሁሉም ሁኔታዎች"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Statuses" : "ሁሉም ሁኔታዎች"}</SelectItem>
                <SelectItem value="active">{language === "en" ? "Active" : "ንቁ"}</SelectItem>
                <SelectItem value="trial">{language === "en" ? "Trial" : "ሙከራ"}</SelectItem>
                <SelectItem value="expired">{language === "en" ? "Expired" : "ጊዜው ያለፈበት"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <Label htmlFor="search">{language === "en" ? "Search" : "ፈልግ"}</Label>
            <Input id="search" placeholder={language === "en" ? "Search by factory name..." : "በፋብሪካ ስም ይፈልጉ..."} />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === "en" ? "Factory" : "ፋብሪካ"}</TableHead>
                <TableHead>{language === "en" ? "Plan" : "እቅድ"}</TableHead>
                <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                <TableHead>{language === "en" ? "Start Date" : "የመጀመሪያ ቀን"}</TableHead>
                <TableHead>{language === "en" ? "End Date" : "የመጨረሻ ቀን"}</TableHead>
                <TableHead>{language === "en" ? "Price" : "ዋጋ"}</TableHead>
                <TableHead>{language === "en" ? "Actions" : "ድርጊቶች"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => {
                const factory = factories.find((f) => f.id === subscription.factoryId)
                return (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{factory?.name}</TableCell>
                    <TableCell>
                      {isEditing && editingSubscription === subscription.id ? (
                        <Select defaultValue={subscription.plan}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">{language === "en" ? "Basic" : "መሰረታዊ"}</SelectItem>
                            <SelectItem value="standard">{language === "en" ? "Standard" : "መደበኛ"}</SelectItem>
                            <SelectItem value="premium">{language === "en" ? "Premium" : "ፕሪሚየም"}</SelectItem>
                            <SelectItem value="enterprise">{language === "en" ? "Enterprise" : "ድርጅት"}</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="capitalize">
                          {subscription.plan === "basic"
                            ? language === "en"
                              ? "Basic"
                              : "መሰረታዊ"
                            : subscription.plan === "standard"
                              ? language === "en"
                                ? "Standard"
                                : "መደበኛ"
                              : subscription.plan === "premium"
                                ? language === "en"
                                  ? "Premium"
                                  : "ፕሪሚየም"
                                : language === "en"
                                  ? "Enterprise"
                                  : "ድርጅት"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell>{format(parseISO(subscription.startDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {isEditing && editingSubscription === subscription.id ? (
                        <Input type="date" defaultValue={subscription.endDate.split("T")[0]} className="w-32" />
                      ) : (
                        format(parseISO(subscription.endDate), "MMM d, yyyy")
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing && editingSubscription === subscription.id ? (
                        <Input type="number" defaultValue={subscription.price} className="w-24" />
                      ) : (
                        `${subscription.price.toLocaleString()} ETB`
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing && editingSubscription === subscription.id ? (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" onClick={handleSaveSubscription}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setIsEditing(false)
                              setEditingSubscription(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setIsEditing(true)
                              setEditingSubscription(subscription.id)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRenewSubscription(subscription.id)}
                            disabled={subscription.status === "active"}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {language === "en" ? "Showing 5 of 5 subscriptions" : "5 ከ 5 ደንበኝነቶች እያሳየ ነው"}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" disabled>
            {language === "en" ? "Previous" : "ቀዳሚ"}
          </Button>
          <Button variant="outline" disabled>
            {language === "en" ? "Next" : "ቀጣይ"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
