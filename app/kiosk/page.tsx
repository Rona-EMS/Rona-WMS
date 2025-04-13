"use client"

import { KioskApp } from "@/components/kiosk-app"
import { users } from "@/lib/mock-data"

export default function KioskPage() {
  // Filter users to get only workers for the kiosk app
  const workers = users.filter((user) => user.role === "worker")

  return (
    <KioskApp
      factoryId="FACTORY-001"
      factoryName="Rona Manufacturing"
      factoryLogo="/rona-logo.png"
      factoryPrimaryColor="#6366f1"
      factorySecondaryColor="#f43f5e"
      workers={workers}
    />
  )
}
