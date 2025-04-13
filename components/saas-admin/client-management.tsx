"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { factories } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, RefreshCw } from "lucide-react"

export function ClientManagement() {
  const [selectedFactory, setSelectedFactory] = useState("")
  const { toast } = useToast()
  const { language, t } = useLanguage()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{language === "en" ? "Client Management" : "የደንበኛ አስተዳደር"}</CardTitle>
            <CardDescription>
              {language === "en" ? "Manage factory clients and their accounts" : "የፋብሪካ ደንበኞችን እና መለያዎቻቸውን ያስተዳድሩ"}
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="px-4">
              <Plus className="mr-2 h-4 w-4" />
              {language === "en" ? "Add New Client" : "አዲስ ደንበኛ ያክሉ"}
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
                <SelectItem value="all_statuses">{language === "en" ? "All Statuses" : "ሁሉም ሁኔታዎች"}</SelectItem>
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
                <TableHead>{language === "en" ? "Location" : "ቦታ"}</TableHead>
                <TableHead>{language === "en" ? "Industry" : "ኢንዱስትሪ"}</TableHead>
                <TableHead>{language === "en" ? "Total Workers" : "ጠቅላላ ሰራተኞች"}</TableHead>
                <TableHead>{language === "en" ? "Active Workers" : "ንቁ ሰራተኞች"}</TableHead>
                <TableHead>{language === "en" ? "Subscription Status" : "የደንበኝነት ሁኔታ"}</TableHead>
                <TableHead>{language === "en" ? "Actions" : "ድርጊቶች"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {factories.map((factory) => (
                <TableRow key={factory.id}>
                  <TableCell className="font-medium">{factory.name}</TableCell>
                  <TableCell>{factory.location}</TableCell>
                  <TableCell>{factory.industry}</TableCell>
                  <TableCell>{factory.totalWorkers}</TableCell>
                  <TableCell>{factory.activeWorkers}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{factory.subscriptionStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {language === "en" ? "Showing 5 of 5 factories" : "5 ከ 5 ፋብሪካዎች እያሳየ ነው"}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" disabled className="px-4">
            {language === "en" ? "Previous" : "ቀዳሚ"}
          </Button>
          <Button variant="outline" disabled className="px-4">
            {language === "en" ? "Next" : "ቀጣይ"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
