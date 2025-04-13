import type { Metadata } from "next"
import { WorkerProfile } from "@/components/worker/worker-profile"

export const metadata: Metadata = {
  title: "Worker Profile | Rona Workforce Management",
  description: "View and manage your worker profile information",
}

export default function ProfilePage() {
  return (
    <div className="container max-w-7xl mx-auto py-6">
      <WorkerProfile />
    </div>
  )
}
