"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Copy, Edit, Plus, Trash2 } from "lucide-react"

interface ShiftTemplate {
  id: string
  name: string
  timeRange: string
  daysOfWeek: string[]
  departments: string[]
}

const templates: ShiftTemplate[] = [
  {
    id: "template-1",
    name: "Standard Morning Shift",
    timeRange: "6:00 AM - 2:00 PM",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departments: ["Assembly", "Packaging", "Quality Control"],
  },
  {
    id: "template-2",
    name: "Standard Afternoon Shift",
    timeRange: "2:00 PM - 10:00 PM",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departments: ["Assembly", "Packaging", "Quality Control"],
  },
  {
    id: "template-3",
    name: "Standard Night Shift",
    timeRange: "10:00 PM - 6:00 AM",
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departments: ["Assembly", "Maintenance"],
  },
  {
    id: "template-4",
    name: "Weekend Shift",
    timeRange: "8:00 AM - 4:00 PM",
    daysOfWeek: ["Saturday", "Sunday"],
    departments: ["Packaging", "Warehouse"],
  },
]

export function ShiftTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gold-400">Shift Templates</h2>
          <p className="text-muted-foreground">Create reusable shift patterns for quick scheduling</p>
        </div>
        <Button variant="gold">
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="border-gold-400/20 hover:border-gold-400/40 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <div className="flex items-center text-gold-400">
                <Clock className="mr-2 h-4 w-4" />
                <span>{template.timeRange}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Days</p>
                  <div className="flex flex-wrap gap-1">
                    {template.daysOfWeek.map((day) => (
                      <span key={day} className="text-xs bg-gold-400/10 text-gold-400 px-2 py-1 rounded-full">
                        {day.substring(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Departments</p>
                  <div className="flex flex-wrap gap-1">
                    {template.departments.map((dept) => (
                      <span
                        key={dept}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-4 pt-2 border-t border-gold-400/10">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-gold-400">
                    <Copy className="h-3.5 w-3.5" />
                    Duplicate
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
