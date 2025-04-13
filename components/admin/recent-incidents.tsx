"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"

const incidents = [
  {
    id: "INC-1234",
    worker: { name: "Abebe Kebede", image: "", initials: "AK" },
    type: "Machinery Malfunction",
    location: "Assembly Line B",
    status: "Critical",
    time: "35 mins ago",
    resolved: false,
  },
  {
    id: "INC-1233",
    worker: { name: "Tigist Haile", image: "", initials: "TH" },
    type: "Safety Hazard",
    location: "Packaging Area",
    status: "Medium",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: "INC-1232",
    worker: { name: "Dawit Mekonnen", image: "", initials: "DM" },
    type: "Power Outage",
    location: "Building 3",
    status: "Low",
    time: "5 hours ago",
    resolved: true,
  },
  {
    id: "INC-1231",
    worker: { name: "Hiwot Girma", image: "", initials: "HG" },
    type: "Chemical Spill",
    location: "Laboratory",
    status: "Medium",
    time: "Yesterday",
    resolved: true,
  },
]

export function RecentIncidents() {
  return (
    <div className="overflow-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gold-400/10">
            <TableHead className="w-[100px] font-semibold">ID</TableHead>
            <TableHead className="w-[180px] font-semibold">Reporter</TableHead>
            <TableHead className="w-[200px] font-semibold">Type</TableHead>
            <TableHead className="hidden md:table-cell w-[180px] font-semibold">Location</TableHead>
            <TableHead className="w-[120px] font-semibold">Priority</TableHead>
            <TableHead className="w-[140px] font-semibold">Status</TableHead>
            <TableHead className="w-[100px] font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id} className="border-b border-gold-400/10 hover:bg-gold-400/5">
              <TableCell className="font-medium py-3">{incident.id}</TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-gold-400/30">
                    <AvatarImage src={incident.worker.image} alt={incident.worker.name} />
                    <AvatarFallback className="bg-gold-400 text-black">{incident.worker.initials}</AvatarFallback>
                  </Avatar>
                  <span>{incident.worker.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">{incident.type}</TableCell>
              <TableCell className="hidden md:table-cell py-3">{incident.location}</TableCell>
              <TableCell className="py-3">
                <Badge
                  className="font-medium"
                  variant={
                    incident.status === "Critical"
                      ? "destructive"
                      : incident.status === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  {incident.resolved ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Resolved</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-gold-400" />
                      <span>In Progress</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-3 text-right">
                <Link href={`/admin/emergency/${incident.id}`}>
                  <Button variant="gold" size="sm" className="px-4">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between w-full p-4 bg-gold-400/5 border-t border-gold-400/20">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-gold-400" />
          <span className="text-sm text-gold-400">Showing 4 of 26 total incidents</span>
        </div>
        <Button variant="link" className="text-gold-400">
          Export Report
        </Button>
      </div>
    </div>
  )
}
