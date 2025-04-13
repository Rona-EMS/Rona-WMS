"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle2, Clock, ExternalLink, Filter, MapPin, MessageSquare, Search } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

type IncidentType = {
  id: string
  title: string
  type: string
  reporter: {
    name: string
    initials: string
    image: string
  }
  location: string
  timestamp: string
  status: "New" | "In Progress" | "Resolved"
  priority: "Critical" | "High" | "Medium" | "Low"
  description: string
}

const incidents: IncidentType[] = [
  {
    id: "INC-1234",
    title: "Machinery Malfunction - Assembly Line B",
    type: "Equipment Failure",
    reporter: {
      name: "Abebe Kebede",
      initials: "AK",
      image: "",
    },
    location: "Building 1, Assembly Line B",
    timestamp: "2023-03-15T09:45:00Z",
    status: "New",
    priority: "Critical",
    description:
      "The main conveyor belt on Assembly Line B suddenly stopped and is making unusual noises. Production halted. Potential electrical issue.",
  },
  {
    id: "INC-1233",
    title: "Chemical Spill in Packaging Area",
    type: "Safety Hazard",
    reporter: {
      name: "Tigist Haile",
      initials: "TH",
      image: "",
    },
    location: "Building 2, Packaging Area",
    timestamp: "2023-03-15T08:30:00Z",
    status: "In Progress",
    priority: "High",
    description:
      "Approximately 5 liters of cleaning solvent spilled on the floor. Area has been cordoned off. Need clean-up team and proper disposal equipment.",
  },
  {
    id: "INC-1232",
    title: "Power Outage in Building 3",
    type: "Infrastructure",
    reporter: {
      name: "Dawit Mekonnen",
      initials: "DM",
      image: "",
    },
    location: "Building 3, All Floors",
    timestamp: "2023-03-15T07:15:00Z",
    status: "In Progress",
    priority: "High",
    description:
      "Complete power loss in Building 3. Backup generators activated but only providing partial coverage. IT systems offline.",
  },
  {
    id: "INC-1231",
    title: "Worker Injury - Minor Cut",
    type: "Personnel Injury",
    reporter: {
      name: "Hiwot Girma",
      initials: "HG",
      image: "",
    },
    location: "Building 1, Quality Control Section",
    timestamp: "2023-03-14T16:20:00Z",
    status: "Resolved",
    priority: "Medium",
    description:
      "Worker sustained a minor cut while handling packaging materials. First aid administered on site. No further medical attention required.",
  },
  {
    id: "INC-1230",
    title: "Smoke Detected in Warehouse",
    type: "Fire Safety",
    reporter: {
      name: "Yonas Alemu",
      initials: "YA",
      image: "",
    },
    location: "Warehouse A, Section 3",
    timestamp: "2023-03-14T14:10:00Z",
    status: "Resolved",
    priority: "Critical",
    description:
      "Smoke detected near electrical panel. Fire team responded and identified overheated circuit. Power disconnected and repaired.",
  },
]

export function EmergencyManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewIncident, setViewIncident] = useState<IncidentType | null>(null)
  const { language } = useLanguage()

  const filteredIncidents = incidents.filter((incident) => {
    let statusMatch = true
    if (activeTab === "new") statusMatch = incident.status === "New"
    else if (activeTab === "inProgress") statusMatch = incident.status === "In Progress"
    else if (activeTab === "resolved") statusMatch = incident.status === "Resolved"

    const searchMatch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reporter.name.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && searchMatch
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    if (language === "am") {
      // Ethiopian date format
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
      return new Intl.DateTimeFormat("am-ET", options).format(date)
    } else {
      // English date format
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-gold-400" />
      case "Resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  // Translate incident types
  const translateType = (type: string) => {
    const typeTranslations: Record<string, { en: string; am: string }> = {
      "Equipment Failure": { en: "Equipment Failure", am: "የመሳሪያ ብልሽት" },
      "Safety Hazard": { en: "Safety Hazard", am: "የደህንነት አደጋ" },
      Infrastructure: { en: "Infrastructure", am: "መሰረተ ልማት" },
      "Personnel Injury": { en: "Personnel Injury", am: "የሰራተኛ ጉዳት" },
      "Fire Safety": { en: "Fire Safety", am: "የእሳት ደህንነት" },
    }
    return typeTranslations[type]?.[language] || type
  }

  // Translate locations
  const translateLocation = (location: string) => {
    if (language === "en") return location

    // Simple translation of common location terms
    return location
      .replace("Building", "ህንፃ")
      .replace("Assembly Line", "የምርት መስመር")
      .replace("Packaging Area", "የማሸጊያ ክፍል")
      .replace("All Floors", "ሁሉም ፎቆች")
      .replace("Quality Control Section", "የጥራት ቁጥጥር ክፍል")
      .replace("Warehouse", "መጋዘን")
      .replace("Section", "ክፍል")
  }

  // Translate status
  const translateStatus = (status: string) => {
    const statusTranslations: Record<string, { en: string; am: string }> = {
      New: { en: "New", am: "አዲስ" },
      "In Progress": { en: "In Progress", am: "በሂደት ላይ" },
      Resolved: { en: "Resolved", am: "የተፈታ" },
    }
    return statusTranslations[status]?.[language] || status
  }

  // Translate priority
  const translatePriority = (priority: string) => {
    const priorityTranslations: Record<string, { en: string; am: string }> = {
      Critical: { en: "Critical", am: "ወሳኝ" },
      High: { en: "High", am: "ከፍተኛ" },
      Medium: { en: "Medium", am: "መካከለኛ" },
      Low: { en: "Low", am: "ዝቅተኛ" },
    }
    return priorityTranslations[priority]?.[language] || priority
  }

  return (
    <div className="space-y-6">
      <Card className="border-gold-400/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{language === "en" ? "Emergency Incidents" : "የአደጋ ክስተቶች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Track and manage all reported emergencies and incidents"
                  : "ሁሉንም የተዘገቡ አደጋዎችን እና ክስተቶችን ይከታተሉ እና ያስተዳድሩ"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">{language === "en" ? "Filter" : "አጣራ"}</span>
              </Button>
              <Button variant="gold">{language === "en" ? "Create Report" : "ሪፖርት ይፍጠሩ"}</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">{language === "en" ? "All Incidents" : "ሁሉም ክስተቶች"}</TabsTrigger>
                <TabsTrigger value="new">{language === "en" ? "New" : "አዲስ"}</TabsTrigger>
                <TabsTrigger value="inProgress">{language === "en" ? "In Progress" : "በሂደት ላይ"}</TabsTrigger>
                <TabsTrigger value="resolved">{language === "en" ? "Resolved" : "የተፈታ"}</TabsTrigger>
              </TabsList>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === "en" ? "Search incidents..." : "ክስተቶችን ይፈልጉ..."}
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={activeTab} className="space-y-4">
              <div className="rounded-md border border-gold-400/20">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gold-400/10">
                      <TableHead>{language === "en" ? "Incident ID" : "የክስተት መታወቂያ"}</TableHead>
                      <TableHead>{language === "en" ? "Type" : "አይነት"}</TableHead>
                      <TableHead>{language === "en" ? "Reporter" : "አመልካች"}</TableHead>
                      <TableHead>{language === "en" ? "Location" : "ቦታ"}</TableHead>
                      <TableHead>{language === "en" ? "Time Reported" : "የተዘገበበት ሰዓት"}</TableHead>
                      <TableHead>{language === "en" ? "Priority" : "ቅድሚያ"}</TableHead>
                      <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                      <TableHead>{language === "en" ? "Actions" : "ድርጊቶች"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow key={incident.id} className="border-b border-gold-400/10">
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>{translateType(incident.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage
                                src={incident.reporter.image || "/placeholder.svg"}
                                alt={incident.reporter.name}
                              />
                              <AvatarFallback className="bg-gold-400 text-black">
                                {incident.reporter.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{incident.reporter.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-gold-400" />
                            <span>{translateLocation(incident.location)}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatTimestamp(incident.timestamp)}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(incident.priority)}>
                            {translatePriority(incident.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(incident.status)}
                            <span>{translateStatus(incident.status)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setViewIncident(incident)}>
                              {language === "en" ? "View" : "ይመልከቱ"}
                            </Button>
                            <Button variant="gold" size="sm">
                              {language === "en" ? "Respond" : "ምላሽ ይስጡ"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredIncidents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          {language === "en"
                            ? "No incidents found matching your filters."
                            : "ከማጣሪያዎችዎ ጋር የሚዛመዱ ክስተቶች አልተገኙም።"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-xl">
              {language === "en" ? "Emergency Response Teams" : "የአደጋ ምላሽ ቡድኖች"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Available personnel ready to respond to incidents"
                : "ለክስተቶች ምላሽ ለመስጠት ዝግጁ የሆኑ ሰራተኞች"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-gold-400/20 p-4 bg-gold-400/5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{language === "en" ? "First Aid Team" : "የመጀመሪያ እርዳታ ቡድን"}</h3>
                  <Badge variant="default">{language === "en" ? "On Duty" : "በስራ ላይ"}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">JM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">TG</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">FK</AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {language === "en" ? "Contact Team" : "ቡድኑን ያግኙ"}
                </Button>
              </div>

              <div className="rounded-md border border-gold-400/20 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{language === "en" ? "Fire Safety Team" : "የእሳት ደህንነት ቡድን"}</h3>
                  <Badge variant="default">{language === "en" ? "On Duty" : "በስራ ላይ"}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">HA</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">BT</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">DK</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">SM</AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {language === "en" ? "Contact Team" : "ቡድኑን ያግኙ"}
                </Button>
              </div>

              <div className="rounded-md border border-gold-400/20 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{language === "en" ? "Technical Response Team" : "የቴክኒክ ምላሽ ቡድን"}</h3>
                  <Badge variant="secondary">{language === "en" ? "Off Duty" : "ከስራ ውጪ"}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">RM</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-gold-400 text-black">KT</AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {language === "en" ? "Contact Team" : "ቡድኑን ያግኙ"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-xl">{language === "en" ? "Emergency Protocols" : "የአደጋ ፕሮቶኮሎች"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "Standard procedures for different types of incidents"
                : "ለተለያዩ አይነት ክስተቶች መደበኛ የአሰራር ሂደቶች"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-gold-400/20 p-4 hover:bg-gold-400/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">
                    {language === "en" ? "Machinery Malfunction Protocol" : "የማሽን ብልሽት ፕሮቶኮል"}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {language === "en"
                    ? "Steps for safely shutting down equipment, evacuating workers if necessary, and initiating repairs."
                    : "መሳሪያዎችን በደህንነት ለማጥፋት፣ አስፈላጊ ከሆነ ሰራተኞችን ለማስወጣት እና ጥገናዎችን ለመጀመር የሚያስፈልጉ ደረጃዎች።"}
                </p>
                <div className="flex justify-between">
                  <Badge variant="outline">
                    {language === "en" ? "Last Updated: 2 months ago" : "መጨረሻ የተዘመነው፡ ከ2 ወራት በፊት"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {language === "en" ? "View" : "ይመልከቱ"}
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-gold-400/20 p-4 hover:bg-gold-400/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">{language === "en" ? "Chemical Spill Response" : "የኬሚካል ፍሳሽ ምላሽ"}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {language === "en"
                    ? "Containment procedures, required protective equipment, evacuation routes, and cleanup processes."
                    : "የመቆጣጠሪያ ሂደቶች፣ የሚያስፈልጉ የመከላከያ መሳሪያዎች፣ የማምለጫ መንገዶች እና የማጽዳት ሂደቶች።"}
                </p>
                <div className="flex justify-between">
                  <Badge variant="outline">
                    {language === "en" ? "Last Updated: 1 month ago" : "መጨረሻ የተዘመነው፡ ከ1 ወር በፊት"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {language === "en" ? "View" : "ይመልከቱ"}
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-gold-400/20 p-4 hover:bg-gold-400/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">
                    {language === "en" ? "Medical Emergency Protocol" : "የህክምና አደጋ ፕሮቶኮል"}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {language === "en"
                    ? "First aid procedures, ambulance contact information, and documentation requirements."
                    : "የመጀመሪያ እርዳታ ሂደቶች፣ የአምቡላንስ የመገናኛ መረጃ እና የሰነድ መስፈርቶች።"}
                </p>
                <div className="flex justify-between">
                  <Badge variant="outline">
                    {language === "en" ? "Last Updated: 3 weeks ago" : "መጨረሻ የተዘመነው፡ ከ3 ሳምንታት በፊት"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {language === "en" ? "View" : "ይመልከቱ"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="gold" className="w-full">
                {language === "en" ? "View All Emergency Protocols" : "ሁሉንም የአደጋ ፕሮቶኮሎች ይመልከቱ"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {viewIncident && (
        <Dialog open={!!viewIncident} onOpenChange={(open) => !open && setViewIncident(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{viewIncident.title}</DialogTitle>
              <DialogDescription>
                {language === "en" ? "Incident ID: " : "የክስተት መታወቂያ: "}
                {viewIncident.id} •{language === "en" ? " Reported by " : " ያመለከተው "}
                {viewIncident.reporter.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">{language === "en" ? "Status" : "ሁኔታ"}</label>
                <div className="flex items-center gap-2">
                  {getStatusIcon(viewIncident.status)}
                  <span>{translateStatus(viewIncident.status)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">{language === "en" ? "Priority" : "ቅድሚያ"}</label>
                <Badge variant={getPriorityColor(viewIncident.priority)}>
                  {translatePriority(viewIncident.priority)}
                </Badge>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">{language === "en" ? "Time Reported" : "የተዘገበበት ሰዓት"}</label>
                <div>{formatTimestamp(viewIncident.timestamp)}</div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium">{language === "en" ? "Location" : "ቦታ"}</label>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gold-400" />
                  <span>{translateLocation(viewIncident.location)}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">{language === "en" ? "Type" : "አይነት"}</label>
                <div>{translateType(viewIncident.type)}</div>
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-sm font-medium">{language === "en" ? "Description" : "መግለጫ"}</label>
                <p className="p-3 bg-secondary rounded-md">{viewIncident.description}</p>
              </div>

              <div className="space-y-1 md:col-span-3">
                <label className="text-sm font-medium">{language === "en" ? "Response Notes" : "የምላሽ ማስታወሻዎች"}</label>
                <Textarea
                  placeholder={
                    language === "en" ? "Add notes about incident response..." : "ስለ ክስተት ምላሽ ማስታወሻዎችን ያክሉ..."
                  }
                  className="h-24"
                />
              </div>

              <div className="space-y-1 md:col-span-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{language === "en" ? "Activity Log" : "የእንቅስቃሴ ምዝግብ"}</label>
                  <Button variant="ghost" size="sm" className="h-7 gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {language === "en" ? "Add Comment" : "አስተያየት ያክሉ"}
                  </Button>
                </div>

                <div className="space-y-3 p-3 bg-card rounded-md border">
                  <div className="flex gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gold-400 text-black">SY</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{language === "en" ? "System" : "ሲስተም"}</span>
                        <span className="text-xs text-muted-foreground">
                          {language === "en" ? "15 minutes ago" : "ከ15 ደቂቃዎች በፊት"}
                        </span>
                      </div>
                      <p className="text-sm">
                        {language === "en"
                          ? 'Incident status updated to "In Progress"'
                          : 'የክስተት ሁኔታ ወደ "በሂደት ላይ" ተዘምኗል'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gold-400 text-black">BT</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Biruk Temesgen</span>
                        <span className="text-xs text-muted-foreground">
                          {language === "en" ? "20 minutes ago" : "ከ20 ደቂቃዎች በፊት"}
                        </span>
                      </div>
                      <p className="text-sm">
                        {language === "en"
                          ? "Response team dispatched to location. Initial assessment underway."
                          : "የምላሽ ቡድን ወደ ቦታው ተልኳል። የመጀመሪያ ግምገማ በሂደት ላይ ነው።"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">{language === "en" ? "Close Incident" : "ክስተቱን ይዝጉ"}</Button>
              <div className="flex gap-2">
                <Button variant="outline">{language === "en" ? "Escalate" : "ያሳድጉ"}</Button>
                <Button variant="gold">{language === "en" ? "Update Status" : "ሁኔታን ያዘምኑ"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
