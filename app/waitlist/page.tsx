"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Users, Building, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Logo } from "@/components/logo"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function WaitlistPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: t("common.success"),
        description:
          language === "en"
            ? "You've been added to our waitlist! We'll contact you soon."
            : "ወደ ቅድመ ምዝገባ ተጨምረዋል! በቅርቡ እናገኝዎታለን።",
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Navigation - Consistent with homepage */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Logo size="md" href={undefined} />
              </Link>
              <div className="ml-2">
                <ThemeSwitcher />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  {language === "en" ? "Back to Home" : "ወደ መነሻ ተመለስ"}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="max-w-md w-full mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === "en" ? "You're on the list!" : "ወደ ዝርዝሩ ተጨምረዋል!"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === "en"
                ? "Thank you for joining our waitlist. We'll notify you when Rona Workforce Management is available for your business."
                : "ለቅድመ ምዝገባችን ስለተቀላቀሉ እናመሰግናለን። ሮና የሰራተኞች አስተዳደር ስርዓት ለእርስዎ ንግድ ሲገኝ እናሳውቅዎታለን።"}
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button variant="purple" size="lg" className="px-8">
                  {language === "en" ? "Return to Home" : "ወደ መነሻ ተመለስ"}
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t py-4 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            {t("footer.copyright")}
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation - Consistent with homepage */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="md" href={undefined} />
            </Link>
            <div className="ml-2">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {t("nav.login")}
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                {language === "en" ? "Back" : "ተመለስ"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {language === "en" ? "Join the Waitlist" : "ለቅድመ ምዝገባ ይቀላቀሉ"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "en"
                ? "Be among the first to experience Rona Workforce Management when it becomes available for your region and industry."
                : "ሮና የሰራተኞች አስተዳደር ስርዓት ለእርስዎ አካባቢ እና ኢንዱስትሪ ሲገኝ ከመጀመሪያዎቹ ተጠቃሚዎች መካከል ይሁኑ።"}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100 mb-8 w-full">
            <h3 className="font-semibold text-lg mb-4 text-center">
              {language === "en" ? "Why Join Our Waitlist?" : "ለምን ቅድመ ምዝገባችንን ይቀላቀላሉ?"}
            </h3>
            <div className="flex flex-col items-center">
              <ul className="space-y-3 w-full max-w-lg">
                <li className="flex gap-2 items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {language === "en"
                      ? "Early access to Rona Workforce Management"
                      : "ለሮና የሰራተኞች አስተዳደር ስርዓት ቀድመው ይድረሱ"}
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{language === "en" ? "Special pricing for early adopters" : "ለቀድሞ ተጠቃሚዎች ልዩ ዋጋ"}</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>
                    {language === "en" ? "Influence product development with your feedback" : "በግብረመልስዎ የምርት ልማትን ያጽዳኑ"}
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{language === "en" ? "Priority onboarding and support" : "ቅድሚያ የሚሰጠው ማስተዋወቅ እና ድጋፍ"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Full Name" : "ሙሉ ስም"}*
                  </label>
                  <div className="relative">
                    <Input id="name" placeholder={language === "en" ? "Your name" : "ስምዎ"} required className="pl-10" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Email Address" : "ኢሜይል"}*
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "en" ? "you@company.com" : "you@company.com"}
                      required
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Mail className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Company Name" : "የኩባንያ ስም"}*
                  </label>
                  <div className="relative">
                    <Input
                      id="company"
                      placeholder={language === "en" ? "Your company" : "የእርስዎ ኩባንያ"}
                      required
                      className="pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Building className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="employees" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Number of Employees" : "የሰራተኞች ብዛት"}*
                  </label>
                  <div className="relative">
                    <select
                      id="employees"
                      className="w-full h-10 px-4 py-2 pl-10 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">{language === "en" ? "Select" : "ይምረጡ"}</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501+">501+</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Industry" : "ኢንዱስትሪ"}*
                  </label>
                  <div className="relative">
                    <select
                      id="industry"
                      className="w-full h-10 px-4 py-2 pl-10 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">{language === "en" ? "Select" : "ይምረጡ"}</option>
                      <option value="manufacturing">{language === "en" ? "Manufacturing" : "ማኑፋክቸሪንግ"}</option>
                      <option value="textile">{language === "en" ? "Textile" : "ጨርቃጨርቅ"}</option>
                      <option value="construction">{language === "en" ? "Construction" : "ግንባታ"}</option>
                      <option value="agriculture">{language === "en" ? "Agriculture" : "ግብርና"}</option>
                      <option value="food-processing">{language === "en" ? "Food Processing" : "የምግብ ማቀነባበሪያ"}</option>
                      <option value="other">{language === "en" ? "Other" : "ሌላ"}</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Building className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium block text-gray-700">
                    {language === "en" ? "Country" : "ሀገር"}*
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      className="w-full h-10 px-4 py-2 pl-10 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      required
                    >
                      <option value="">{language === "en" ? "Select" : "ይምረጡ"}</option>
                      <option value="ethiopia">{language === "en" ? "Ethiopia" : "ኢትዮጵያ"}</option>
                      <option value="kenya">{language === "en" ? "Kenya" : "ኬንያ"}</option>
                      <option value="uganda">{language === "en" ? "Uganda" : "ዩጋንዳ"}</option>
                      <option value="tanzania">{language === "en" ? "Tanzania" : "ታንዛኒያ"}</option>
                      <option value="other">{language === "en" ? "Other" : "ሌላ"}</option>
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Globe className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium block text-gray-700">
                  {language === "en" ? "Additional Information" : "ተጨማሪ መረጃ"}
                </label>
                <Textarea
                  id="message"
                  placeholder={
                    language === "en"
                      ? "Tell us about your specific needs or questions..."
                      : "ስለ ተለዩ ፍላጎቶችዎ ወይም ጥያቄዎችዎ ይንገሩን..."
                  }
                  className="h-24"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="purple" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? language === "en"
                      ? "Submitting..."
                      : "በማስገባት ላይ..."
                    : language === "en"
                      ? "Join Waitlist"
                      : "ለቅድመ ምዝገባ ይቀላቀሉ"}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground pt-4">
                {language === "en"
                  ? "By submitting this form, you agree to our Terms of Service and Privacy Policy."
                  : "ይህን ቅጽ በማስገባት፣ የአገልግሎት ውሎችን እና የግላዊነት ፖሊሲያችንን ተቀብለዋል።"}
              </p>
              <p className="text-xs text-center text-muted-foreground pt-4">
                {language === "en"
                  ? "Contact us: Phone: +251 985 209 263, Email: ronaems.et@gmail.com"
                  : "ያግኙን: ስልክ: +251 985 209 263, ኢሜይል: ronaems.et@gmail.com"}
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 bg-white/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">{t("footer.copyright")}</div>
      </footer>
    </div>
  )
}
