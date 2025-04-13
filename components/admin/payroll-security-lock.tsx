"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Lock, Shield, AlertTriangle } from "lucide-react"

interface PayrollSecurityLockProps {
  isOpen: boolean
  onClose: () => void
  onUnlock: () => void
}

export function PayrollSecurityLock({ isOpen, onClose, onUnlock }: PayrollSecurityLockProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any password with at least 4 characters
      if (password.length >= 4) {
        setIsLoading(false)
        onUnlock()
        onClose()
        toast({
          title: language === "en" ? "Payroll Unlocked" : "ደመወዝ ተከፍቷል",
          description: language === "en" ? "You now have access to payroll data" : "አሁን የደመወዝ ውሂብን ለማግኘት ይችላሉ",
          variant: "default",
        })
      } else {
        setIsLoading(false)
        setError(language === "en" ? "Invalid security code. Please try again." : "ልክ ያልሆነ የደህንነት ኮድ። እባክዎ እንደገና ይሞክሩ።")
      }
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-purple-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-xl">
            {language === "en" ? "Payroll Security Verification" : "የደመወዝ ደህንነት ማረጋገጫ"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {language === "en"
              ? "Enter your security code to access payroll data"
              : "የደመወዝ ውሂብን ለማግኘት የደህንነት ኮድዎን ያስገቡ"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder={language === "en" ? "Enter security code" : "የደህንነት ኮድ ያስገቡ"}
                className="pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center text-red-600 text-sm mt-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white">
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {language === "en" ? "Verifying..." : "በማረጋገጥ ላይ..."}
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  {language === "en" ? "Unlock Payroll Data" : "የደመወዝ ውሂብን ክፈት"}
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {language === "en" ? "Cancel" : "ይቅር"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
