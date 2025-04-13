"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function QrClockRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/worker/clock?tab=qr")
  }, [router])

  return null
}
