"use client"

import type React from "react"

import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import Link from "next/link"
import { MapPin, Phone, Mail, Calendar, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function DemoPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: t("common.success"),
        description: t("demo.success"),
      })
      setIsSubmitting(false)
      // Reset form
      e.currentTarget.reset()
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="md" />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="outline">{t("nav.login")}</Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-h-none">
          {/* Left column - Info */}
          <div className="flex flex-col justify-start pt-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{t("demo.title")}</h1>
            <p className="text-lg text-muted-foreground mb-8">{t("demo.subtitle")}</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("demo.personalizedDemo")}</h3>
                  <p className="text-sm text-muted-foreground">{t("demo.demoDescription")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("demo.email")}</h3>
                  <p className="text-sm text-muted-foreground">ronaems.et@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("demo.phone")}</h3>
                  <p className="text-sm text-muted-foreground">+251 985 209 263</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("demo.office")}</h3>
                  <p className="text-sm text-muted-foreground">{t("demo.location")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="rounded-lg border bg-purple-50 p-4 md:p-6 shadow-md dark:bg-purple-900/20 mb-8">
            <h2 className="text-xl font-semibold mb-2">{t("demo.requestTitle")}</h2>
            <p className="text-sm text-muted-foreground mb-6">{t("demo.requestSubtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-1 block text-gray-700">
                    {t("demo.fullName")}
                  </label>
                  <Input
                    id="name"
                    placeholder={t("demo.fullName")}
                    required
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-1 block text-gray-700">
                    {t("demo.email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="text-sm font-medium mb-1 block text-gray-700">
                      {t("demo.companyName")}
                    </label>
                    <Input
                      id="company"
                      placeholder={t("demo.companyName")}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="employees" className="text-sm font-medium mb-1 block text-gray-700">
                      {t("demo.employees")}
                    </label>
                    <select
                      id="employees"
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    >
                      <option value="">{t("common.select")}</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501+">501+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-1 block text-gray-700">
                    {t("demo.message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("demo.message")}
                    className="h-20 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? t("demo.submitting") : t("common.bookDemo")}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t py-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">{t("footer.copyright")}</div>
      </footer>
    </div>
  )
}
