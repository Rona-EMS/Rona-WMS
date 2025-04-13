"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/context/auth-context"
import { useLanguage } from "@/lib/context/language-context"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { UserRole } from "@/lib/types"

interface OtpLoginFormProps {
  userRole?: UserRole
  email?: string
  setEmail?: (email: string) => void
}

export function OtpLoginForm({ userRole = "worker", email = "", setEmail }: OtpLoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("+251 ")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [localEmail, setLocalEmail] = useState(email)

  const { login } = useAuth()
  const { toast } = useToast()
  const { language } = useLanguage()

  // Update local email when prop changes
  useEffect(() => {
    setLocalEmail(email)
  }, [email])

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate phone number format (basic Ethiopian format check)
      const phoneRegex = /^\+251 ?[79]\d{8}$/
      if (!phoneRegex.test(phoneNumber.replace(/\s+/g, " "))) {
        throw new Error("Invalid phone number format")
      }

      // Generate a random 6-digit OTP
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(randomOtp)

      // Simulate OTP sending
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setOtpSent(true)
      setCountdown(60) // 60 second countdown

      toast({
        title: language === "en" ? "OTP Sent" : "ኮድ ተልኳል",
        description:
          language === "en" ? `Verification code sent to ${phoneNumber}` : `የማረጋገጫ ኮድ ወደ ${phoneNumber} ተልኳል`,
        duration: 5000,
      })
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "ስህተት",
        description:
          language === "en"
            ? "Invalid phone number or failed to send OTP. Please check the format and try again."
            : "ልክ ያልሆነ ስልክ ቁጥር ወይም ኮድ መላክ አልተሳካም። እባክዎ ቅርጸቱን ያረጋግጡ እና እንደገና ይሞክሩ።",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // If OTP field is empty, use the generated OTP
      const otpToVerify = otp || generatedOtp

      // For demo, we'll accept any 6-digit OTP or the generated OTP
      if (otpToVerify.length !== 6 && otpToVerify !== generatedOtp) {
        throw new Error("Invalid OTP")
      }

      // Create a special password format to indicate OTP login
      const otpPassword = `otp-auth-${otpToVerify}`

      // Use the email associated with the phone number
      const success = await login(localEmail, otpPassword, userRole)

      if (!success) {
        throw new Error("Invalid OTP")
      }

      // Redirect is handled in the auth context
    } catch (error) {
      toast({
        title: language === "en" ? "Verification Failed" : "ማረጋገጥ አልተሳካም",
        description: language === "en" ? "Invalid OTP. Please try again." : "ልክ ያልሆነ ኮድ። እባክዎ እንደገና ይሞክሩ።",
        variant: "destructive",
        duration: 5000,
      })
      setIsLoading(false)
    }
  }

  if (!otpSent) {
    return (
      <form onSubmit={handleSendOtp} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="email-otp" className="text-gray-400">
            {language === "en" ? "Email" : "ኢሜይል"}
          </Label>
          <Input
            id="email-otp"
            type="email"
            value={localEmail}
            onChange={(e) => {
              setLocalEmail(e.target.value)
              if (setEmail) setEmail(e.target.value)
            }}
            required
            className="bg-[#0f1218] border-[#1e2330] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-400">
            {language === "en" ? "Phone Number" : "ስልክ ቁጥር"}
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+251 91 234 5678"
            value={phoneNumber}
            onChange={(e) => {
              // Ensure the phone number always starts with +251
              const input = e.target.value
              if (input.startsWith("+251")) {
                setPhoneNumber(input)
              } else if (input.startsWith("+")) {
                setPhoneNumber("+251" + input.substring(1))
              } else if (input.startsWith("251")) {
                setPhoneNumber("+" + input)
              } else {
                setPhoneNumber("+251" + input.replace(/^\+251/, ""))
              }
            }}
            required
            className="bg-[#0f1218] border-[#1e2330] text-white"
          />
          <p className="text-xs text-gray-400">
            {language === "en"
              ? "Ethiopian phone number format: +251 9X XXX XXXX"
              : "የኢትዮጵያ ስልክ ቁጥር ቅርጸት: +251 9X XXX XXXX"}
          </p>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              {language === "en" ? "Sending OTP..." : "ኮድ በመላክ ላይ..."}
            </span>
          ) : language === "en" ? (
            "Send OTP"
          ) : (
            "ኮድ ላክ"
          )}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerifyOtp} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-gray-400">
          {language === "en" ? "Enter OTP" : "ኮድ ያስገቡ"}
        </Label>
        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          required
          className="bg-[#0f1218] border-[#1e2330] text-white text-center text-lg tracking-widest"
        />
        <p className="text-xs text-gray-400 text-center">
          {language === "en" ? `OTP sent to ${phoneNumber}` : `ኮድ ወደ ${phoneNumber} ተልኳል`}
        </p>

        {generatedOtp && (
          <div className="mt-2 p-3 bg-primary/10 rounded-md border border-primary/20 text-center">
            <p className="text-xs text-gray-400 mb-1">{language === "en" ? "Your OTP Code:" : "የእርስዎ ኮድ:"}</p>
            <p className="text-xl font-mono font-bold tracking-widest text-primary">{generatedOtp}</p>
          </div>
        )}
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" />
            {language === "en" ? "Verifying..." : "በማረጋገጥ ላይ..."}
          </span>
        ) : language === "en" ? (
          "Verify OTP"
        ) : (
          "ኮድ አረጋግጥ"
        )}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="text-primary text-sm"
          disabled={countdown > 0 || isLoading}
          onClick={handleSendOtp}
        >
          {countdown > 0
            ? `${language === "en" ? "Resend in" : "እንደገና ላክ በ"} ${countdown}s`
            : language === "en"
              ? "Resend OTP"
              : "ኮድ እንደገና ላክ"}
        </Button>
      </div>
    </form>
  )
}
