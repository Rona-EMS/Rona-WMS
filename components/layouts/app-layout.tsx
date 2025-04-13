import type React from "react"
import { SaasAdminSidebar } from "@/components/saas-admin/saas-admin-sidebar"

interface AppLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
}

export function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar || <SaasAdminSidebar />}
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
