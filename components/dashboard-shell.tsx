import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  title: string
  description?: string
  headerAction?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DashboardShell({ title, description, headerAction, children, className }: DashboardShellProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  )
}
