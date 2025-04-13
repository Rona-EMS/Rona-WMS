"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, CheckCircle2, ChevronRight, Clock, Factory, Package, ShieldAlert, Users } from "lucide-react"

type LocationStatus = "Operational" | "Partial" | "Offline" | "Maintenance"

type LocationData = {
  id: string
  name: string
  type: string
  address: string
  workers: {
    total: number
    active: number
  }
  productivity: number
  incidents: number
  status: LocationStatus
}

const locationData: LocationData[] = [
  {
    id: "LOC-001",
    name: "Main Factory",
    type: "Manufacturing",
    address: "Industrial Zone, Addis Ababa",
    workers: {
      total: 250,
      active: 212,
    },
    productivity: 94,
    incidents: 0,
    status: "Operational",
  },
  {
    id: "LOC-002",
    name: "Warehouse A",
    type: "Storage & Distribution",
    address: "Logistics Park, Addis Ababa",
    workers: {
      total: 85,
      active: 76,
    },
    productivity: 88,
    incidents: 1,
    status: "Operational",
  },
  {
    id: "LOC-003",
    name: "South Assembly Plant",
    type: "Assembly",
    address: "Industrial Zone, Hawassa",
    workers: {
      total: 180,
      active: 150,
    },
    productivity: 92,
    incidents: 0,
    status: "Operational",
  },
  {
    id: "LOC-004",
    name: "Building 3 - Packaging",
    type: "Packaging",
    address: "Industrial Zone, Addis Ababa",
    workers: {
      total: 120,
      active: 85,
    },
    productivity: 78,
    incidents: 2,
    status: "Partial",
  },
  {
    id: "LOC-005",
    name: "North Distribution Center",
    type: "Distribution",
    address: "Transport Hub, Mekelle",
    workers: {
      total: 65,
      active: 58,
    },
    productivity: 85,
    incidents: 0,
    status: "Operational",
  },
  {
    id: "LOC-006",
    name: "Electronics Assembly",
    type: "Specialized Assembly",
    address: "Tech Park, Addis Ababa",
    workers: {
      total: 90,
      active: 0,
    },
    productivity: 0,
    incidents: 1,
    status: "Maintenance",
  },
]

const getStatusColor = (status: LocationStatus) => {
  switch (status) {
    case "Operational":
      return "default"
    case "Partial":
      return "secondary"
    case "Offline":
      return "destructive"
    case "Maintenance":
      return "outline"
  }
}

const getStatusIcon = (status: LocationStatus) => {
  switch (status) {
    case "Operational":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "Partial":
      return <Clock className="h-4 w-4 text-gold-400" />
    case "Offline":
      return <ShieldAlert className="h-4 w-4 text-destructive" />
    case "Maintenance":
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

export function MultiLocationManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredLocations = locationData.filter((location) => {
    if (activeTab === "operational") return location.status === "Operational"
    if (activeTab === "issues") return location.status === "Partial" || location.status === "Offline"
    if (activeTab === "maintenance") return location.status === "Maintenance"
    return true
  })

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Locations</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="issues">With Issues</TabsTrigger>
          <TabsTrigger value="maintenance">Under Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="border-gold-400/20 hover:border-gold-400/30 transition-colors">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Factory className="h-5 w-5 text-gold-400" />
                          <h3 className="text-xl font-semibold">{location.name}</h3>
                          <Badge variant={getStatusColor(location.status)} className="ml-2">
                            {location.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {location.type} • {location.address}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Remote Access
                        </Button>
                        <Button variant="gold" size="sm">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-gold-400/5 flex items-center gap-3">
                        <Users className="h-8 w-8 text-gold-400" />
                        <div>
                          <p className="text-sm text-muted-foreground">Workers</p>
                          <p className="text-xl font-semibold">
                            {location.workers.active}/{location.workers.total}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gold-400/5 flex items-center gap-3">
                        <ArrowUpDown className="h-8 w-8 text-gold-400" />
                        <div>
                          <p className="text-sm text-muted-foreground">Productivity</p>
                          <p
                            className={`text-xl font-semibold ${
                              location.productivity >= 90
                                ? "text-green-500"
                                : location.productivity >= 80
                                  ? "text-gold-400"
                                  : "text-destructive"
                            }`}
                          >
                            {location.productivity}%
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gold-400/5 flex items-center gap-3">
                        <Package className="h-8 w-8 text-gold-400" />
                        <div>
                          <p className="text-sm text-muted-foreground">Production Status</p>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(location.status)}
                            <p className="text-base font-semibold">{location.status}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-gold-400/5 flex items-center gap-3">
                        <ShieldAlert className="h-8 w-8 text-gold-400" />
                        <div>
                          <p className="text-sm text-muted-foreground">Active Incidents</p>
                          <p
                            className={`text-xl font-semibold ${
                              location.incidents > 0 ? "text-destructive" : "text-green-500"
                            }`}
                          >
                            {location.incidents}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredLocations.length === 0 && (
              <Card className="border-gold-400/20">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <Factory className="h-12 w-12 text-gold-400 mb-4" />
                  <h3 className="text-xl font-medium">No locations found</h3>
                  <p className="text-muted-foreground mt-2 text-center">
                    There are no locations matching the selected filter.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-xl">Safety & Security</CardTitle>
            <CardDescription>Security status across all locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Access Control Systems</span>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Surveillance Systems</span>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gold-400/10 border border-gold-400/20">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold-400" />
                  <span className="font-medium">Fire Detection Systems</span>
                </div>
                <Badge variant="outline" className="text-gold-400 border-gold-400">
                  Maintenance Required
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Emergency Response</span>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Operational
                </Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Detailed Security Report
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-xl">Location Overview</CardTitle>
            <CardDescription>Summary statistics for all facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gold-400/5 text-center">
                  <p className="text-sm text-muted-foreground">Total Locations</p>
                  <p className="text-3xl font-bold text-gold-400">6</p>
                </div>

                <div className="p-4 rounded-lg bg-gold-400/5 text-center">
                  <p className="text-sm text-muted-foreground">Active Workers</p>
                  <p className="text-3xl font-bold text-gold-400">581</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Operational</span>
                  <span className="text-sm font-medium">4</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "67%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Partial Operation</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-gold-400 h-2.5 rounded-full" style={{ width: "16%" }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Under Maintenance</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-muted-foreground h-2.5 rounded-full" style={{ width: "16%" }}></div>
                </div>
              </div>

              <Button variant="gold" className="w-full">
                Generate Location Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
