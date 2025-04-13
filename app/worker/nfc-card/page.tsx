"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NfcCardRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/worker/clock?tab=nfc")
  }, [router])

  return null
}
