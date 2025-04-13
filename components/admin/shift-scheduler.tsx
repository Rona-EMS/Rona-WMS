"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Filter, Users } from "lucide-react"
import { useLanguage } from "@/lib/context/language-context"

const departments = ["All Departments", "Assembly", "Packaging", "Quality Control", "Maintenance", "Warehouse"]
const locations = ["All Locations", "Main Factory", "Warehouse A", "Building 3", "Packaging Division"]

type ShiftType = {
  id: string
  name: string
  time: string
  workers: number
  capacity: number
  department: string
  location: string
}

const shiftsData: ShiftType[] = [
  {
    id: "shift-1",
    name: "Morning Shift",
    time: "6:00 AM - 2:00 PM",
    workers: 35,
    capacity: 40,
    department: "Assembly",
    location: "Main Factory",
  },
  {
    id: "shift-2",
    name: "Afternoon Shift",
    time: "2:00 PM - 10:00 PM",
    workers: 28,
    capacity: 40,
    department: "Assembly",
    location: "Main Factory",
  },
  {
    id: "shift-3",
    name: "Night Shift",
    time: "10:00 PM - 6:00 AM",
    workers: 22,
    capacity: 30,
    department: "Assembly",
    location: "Main Factory",
  },
  {
    id: "shift-4",
    name: "Morning Shift",
    time: "7:00 AM - 3:00 PM",
    workers: 15,
    capacity: 20,
    department: "Packaging",
    location: "Packaging Division",
  },
  {
    id: "shift-5",
    name: "Afternoon Shift",
    time: "3:00 PM - 11:00 PM",
    workers: 12,
    capacity: 20,
    department: "Packaging",
    location: "Packaging Division",
  },
]

export function ShiftScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [department, setDepartment] = useState("All Departments")
  const [location, setLocation] = useState("All Locations")
  const { language } = useLanguage()

  const filteredShifts = shiftsData.filter((shift) => {
    if (department !== "All Departments" && shift.department !== department) return false
    if (location !== "All Locations" && shift.location !== location) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gold-400">{language === "en" ? "Shift Schedule" : "የሺፍት መርሃ ግብር"}</h2>
        <div className="flex flex-wrap gap-2">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={language === "en" ? "Department" : "ክፍል"} />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-gold-400">Select Date</CardTitle>
            <CardDescription>Choose a date to view or edit shifts</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-gold-400/20"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-gold-400/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gold-400">
                  Shifts for{" "}
                  {date?.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
                <CardDescription>{filteredShifts.length} shifts scheduled</CardDescription>
              </div>
              <Button variant="gold">{language === "en" ? "Add Shift" : "ሺፍት ጨምር"}</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-gold-400/20 bg-card hover:bg-gold-400/5 transition-colors"
                >
                  <div className="space-y-2 mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-gold-400 text-gold-400">
                        {shift.department}
                      </Badge>
                      <h3 className="font-medium text-lg">{shift.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gold-400" />
                        <span>{shift.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gold-400" />
                        <span>
                          {shift.workers}/{shift.capacity} Workers
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-gold-400" />
                        <span>{shift.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Assign Workers
                    </Button>
                    <Button variant="gold" size="sm">
                      Edit Shift
                    </Button>
                  </div>
                </div>
              ))}

              {filteredShifts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-gold-400 mb-4" />
                  <h3 className="text-xl font-medium">{language === "en" ? "No shifts found" : "ምንም ሺፍቶች አልተገኙም"}</h3>
                  <p className="text-muted-foreground mt-2">
                    {language === "en"
                      ? "There are no shifts scheduled for the selected date and filters."
                      : "ለተመረጠው ቀን እና ማጣሪያዎች ምንም የተመደቡ ሺፍቶች የሉም።"}
                  </p>
                  <Button variant="gold" className="mt-6">
                    Create New Shift
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
