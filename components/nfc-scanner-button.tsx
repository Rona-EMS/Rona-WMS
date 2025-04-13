"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Scan } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"

export function NfcScannerButton() {
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleScan = () => {
    setIsAnimating(true)

    // Show scanning toast
    toast({
      title: language === "en" ? "Opening NFC Scanner" : "የNFC ስካነር በመክፈት ላይ",
      description: language === "en" ? "Redirecting to NFC scanner page" : "ወደ NFC ስካነር ገጽ በማዘዋወር ላይ",
    })

    // Navigate to NFC scanner page
    setTimeout(() => {
      router.push("/admin/nfc-scan")
      setIsAnimating(false)
    }, 500)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        onClick={handleScan}
        className={`h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center p-0 border-4 border-white ${
          isAnimating ? "animate-pulse" : ""
        }`}
        aria-label={language === "en" ? "Open NFC scanner" : "የNFC ስካነር ክፈት"}
      >
        <Scan className={`h-8 w-8 text-white ${isAnimating ? "animate-spin" : ""}`} />
      </Button>
    </motion.div>
  )
}
