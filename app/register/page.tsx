"use client"

import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Eye, EyeOff, Users, Calendar, FileText } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function RegisterPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [industry, setIndustry] = useState("")
  const [employees, setEmployees] = useState("")
  const [referralSource, setReferralSource] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleNextStep = () => {
    if (step === 1) {
      if (!firstName || !lastName || !email || !password) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive",
        })
        return
      }

      // Password validation (at least 8 characters)
      if (password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters long",
          variant: "destructive",
        })
        return
      }

      setStep(2)
    } else if (step === 2) {
      if (!companyName || !industry || !employees) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      setStep(3)
    } else if (step === 3) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to onboarding
        router.push("/register/onboarding")
      }, 1500)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Language switcher in top right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Content container */}
      <div className="flex w-full h-full z-10">
        {/* Left side - Branding */}
        <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-white">
          <div className="max-w-md text-center z-10">
            <div className="flex justify-center mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rona_logo-removebg-preview-3RGtwMVovHF7WqZD5lzjX2yohDdFHN.png"
                alt="Rona Logo"
                className="h-16"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-4">Workforce Management System</h2>
            <p className="text-lg mb-12">
              Streamline your factory operations with our comprehensive workforce management solution.
            </p>

            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">Manage Your Workforce</h3>
                  <p className="text-sm text-muted-foreground">Track attendance, shifts, and performance</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">Optimize Scheduling</h3>
                  <p className="text-sm text-muted-foreground">Create and manage shifts efficiently</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium">Automate Payroll</h3>
                  <p className="text-sm text-muted-foreground">Simplify your payment processes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Registration form */}
        <div className="w-1/2 flex items-center justify-center p-12 bg-white relative">
          {/* Background waves */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                className="w-full h-full"
                viewBox="0 0 1440 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M-200 100C400 50 700 350 1600 250"
                  stroke="rgba(144, 238, 144, 0.2)"
                  strokeWidth="200"
                  fill="none"
                />
                <path
                  d="M-200 300C400 250 800 500 1600 400"
                  stroke="rgba(144, 238, 144, 0.15)"
                  strokeWidth="200"
                  fill="none"
                />
                <path
                  d="M-200 500C400 450 700 700 1600 600"
                  stroke="rgba(144, 238, 144, 0.1)"
                  strokeWidth="200"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          <div className="w-full max-w-md z-10">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-6">Transform your factory today</h1>
              {step === 1 && (
                <div className="flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
              )}
            </div>

            <form>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Business email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Create a password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (min. 8 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button type="button" className="px-8 h-12 bg-primary hover:bg-primary/90" onClick={handleNextStep}>
                    Continue
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/login" className="text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div className="text-xs text-center text-muted-foreground">
                    <p>
                      By signing up, you agree to our{" "}
                      <Link href="/terms?from=register" className="text-primary hover:underline">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy?from=register" className="text-primary hover:underline">
                        Privacy Notice
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company name</Label>
                    <Input
                      id="company-name"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger id="industry" className="h-12">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textile">Textile</SelectItem>
                        <SelectItem value="garment">Garment</SelectItem>
                        <SelectItem value="leather">Leather</SelectItem>
                        <SelectItem value="food">Food Processing</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of employees</Label>
                    <Select value={employees} onValueChange={setEmployees}>
                      <SelectTrigger id="employees" className="h-12">
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50</SelectItem>
                        <SelectItem value="51-100">51-100</SelectItem>
                        <SelectItem value="101-250">101-250</SelectItem>
                        <SelectItem value="251-500">251-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="px-8 h-12" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="button" className="px-8 h-12" onClick={handleNextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referral">Where did you first hear about us?</Label>
                    <Select value={referralSource} onValueChange={setReferralSource}>
                      <SelectTrigger id="referral" className="h-12">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend or Colleague</SelectItem>
                        <SelectItem value="event">Event or Conference</SelectItem>
                        <SelectItem value="ad">Advertisement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <p className="font-medium mb-2">What happens next?</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-xs font-medium text-primary">
                          1
                        </div>
                        <span>Create your account</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-xs font-medium text-primary">
                          2
                        </div>
                        <span>Set up your factory profile</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-xs font-medium text-primary">
                          3
                        </div>
                        <span>Start managing your workforce</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="px-8 h-12" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="button" className="px-8 h-12" onClick={handleNextStep} disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <LoadingSpinner size="sm" />
                          Creating...
                        </span>
                      ) : (
                        "Start 14-day free trial"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
