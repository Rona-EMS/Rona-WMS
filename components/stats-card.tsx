import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  description?: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function StatsCard({ title, value, description, icon, variant = "default", className }: StatsCardProps) {
  const variantStyles = {
    default: "",
    success: "text-green-500",
    warning: "text-amber-500",
    danger: "text-red-500",
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("rounded-md", variantStyles[variant])}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
