"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Play, Shield, Clock, BookOpen, MessageSquare, Settings } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import Footer from "@/components/footer"
import { useLanguage } from "@/lib/context/language-context"
import { Logo } from "@/components/logo"

export default function HomePage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo size="md" href="/" className="flex items-center space-x-2" />
            <nav className="hidden md:flex gap-6 ml-6">{/* Navigation items removed as requested */}</nav>
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-background relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0,500 C0,500 200,100 500,100 C800,100 1000,500 1000,500 C1000,500 800,900 500,900 C200,900 0,500 0,500 Z"
                  fill="url(#gradient)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6d28d9" />
                    <stop offset="100%" stopColor="#5b21b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-700/10"></div>
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-700/5"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground max-w-5xl">
                Manage your entire factory workforce in one app
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl font-bold">
                Rona simplifies everyday operations with factory workers and keeps them connected, so you can focus on
                growing your business
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  Start 14-day free trial
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-purple-600 bg-transparent px-8 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  Book a Demo
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-700" />
                  <span>No credit card needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-700" />
                  <span>Takes less than 15 mins to set up</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-6">
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-yellow-400 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-yellow-400 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-yellow-400 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-yellow-400 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-yellow-400 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground mt-1">4.8/5 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="w-full py-12 md:py-16 bg-[#151e36] relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="relative mx-auto max-w-4xl">
              <div className="flex justify-center">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/rona-logo.png"
                    alt="RONA Employee Management System"
                    width={500}
                    height={500}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-6 text-base font-medium text-purple-700 shadow-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  <Play className="h-5 w-5 fill-current mr-2" />
                  <span>Why Rona?</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-700/10 px-3 py-1 text-sm text-purple-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to manage your factory workforce
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Streamline operations, improve communication, and boost productivity with our comprehensive solution
                </p>
              </div>
            </div>

            {/* Feature cards would go here - simplified for brevity */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature card 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">NFC-Based Attendance</h3>
                <p className="text-center text-muted-foreground">
                  Workers tap NFC cards to register attendance, with real-time tracking
                </p>
              </div>

              {/* Feature card 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Shift Management</h3>
                <p className="text-center text-muted-foreground">
                  Automated shift scheduling and emergency shift replacement
                </p>
              </div>

              {/* Feature card 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 2v5h5" />
                    <path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17l4 4z" />
                    <path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
                    <path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Payroll Automation</h3>
                <p className="text-center text-muted-foreground">
                  Calculates salaries, overtime, and deductions automatically
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-md border border-purple-600 bg-transparent px-8 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                View all features
              </Link>
            </div>

            {/* NFC Card Clocking Section */}
            <section className="w-full py-16 bg-white">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose NFC Card Clocking</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Card 1 */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                      <Shield className="w-12 h-12 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-bold">Ends fraud</h3>
                    <p className="text-muted-foreground">
                      Reduces the chances of falsification and human errors by requiring the physical presence of the
                      employee to clock in.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                      <Clock className="w-12 h-12 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-bold">Efficient time management</h3>
                    <p className="text-muted-foreground">
                      Optimises the time tracking process, improving productivity and allowing for more effective staff
                      management.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                      <Settings className="w-12 h-12 text-purple-700" />
                    </div>
                    <h3 className="text-xl font-bold">Simple integration</h3>
                    <p className="text-muted-foreground">
                      Compatible with Android and Apple systems equipped with NFC, facilitating its integration and
                      setup without the need for specialised hardware.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Rona AI section */}
            <div className="mt-16 border rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                    Coming Soon
                  </div>
                  <h3 className="text-2xl font-bold">Rona AI Assistant</h3>
                  <p className="text-muted-foreground">
                    Our upcoming AI feature will revolutionize how you manage your workforce. Powered by advanced
                    machine learning, Rona AI will:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-700 mt-0.5" />
                      <span>Predict staffing needs based on historical data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-700 mt-0.5" />
                      <span>Optimize shift schedules automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-700 mt-0.5" />
                      <span>Identify potential production bottlenecks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-700 mt-0.5" />
                      <span>Provide actionable insights to improve efficiency</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link
                      href="/waitlist"
                      className="inline-flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                    >
                      Join the waitlist
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 blur"></div>
                    <div className="relative rounded-xl bg-white p-5">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-purple-700"
                          >
                            <path d="M12 2c1.7 0 3.4.3 5 .9 1.6.6 3 1.5 4.3 2.7 1.2 1.2 2.6 2.1 4.3 2.7.6 1.6.9 3.3.9 5s-.3 3.4-.9 5c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.6 2.1-4.3 2.7-1.6.6-3.3.9-5 .9s-3.4-.3-5-.9c-1.6-.6-3-1.5-4.3-2.7-1.2-1.2-2.6-2.1-2.7-4.3-.6-1.6-.9-3.3-.9-5s.3-3.4.9-5c.6-1.6 1.5-3 2.7-4.3 1.2-1.2 2.6-2.1 4.3-2.7 1.6-.6 3.3-.9 5-.9z" />
                            <path d="M12 8v4l3 3" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">Rona AI</h4>
                          <p className="text-xs text-muted-foreground">Your intelligent workforce assistant</p>
                        </div>
                      </div>
                      <div className="space-y-3 pt-3">
                        <div className="flex gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                            AI
                          </div>
                          <div className="rounded-lg bg-muted p-2 text-sm">
                            Good morning! Based on today's production schedule and historical data, I recommend calling
                            in 2 additional workers for the afternoon shift.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Rona Section - Added right after Rona AI section */}
            <div className="mt-16">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
                Why Choose Rona
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
                Designed specifically for factories
              </h2>
              <div className="mb-10 max-w-3xl">
                <p className="text-lg text-gray-600">
                  Rona is more than just a workforce management system. It's a comprehensive solution tailored to the
                  unique needs of manufacturing facilities, addressing local challenges and compliance requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multilingual Support</h3>
                      <p className="text-gray-600">
                        Multiple language support, making it accessible to workers at all levels
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Works Offline</h3>
                      <p className="text-gray-600">
                        Continues functioning during internet outages with automatic syncing when connection is restored
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Local Compliance</h3>
                      <p className="text-gray-600">Built-in compliance with various labor laws and regulations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-purple-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Affordable Pricing</h3>
                      <p className="text-gray-600">
                        Flexible pricing plans designed for markets with local payment options
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Enterprise-Grade Security</h3>
                    <p className="text-gray-600">
                      Advanced data protection with role-based access controls and encryption
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">99.9% Uptime</h3>
                    <p className="text-gray-600">Reliable service with minimal downtime</p>
                  </div>

                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Comprehensive Documentation</h3>
                    <p className="text-gray-600">Detailed guides and training materials in multiple languages</p>
                  </div>

                  <div className="flex flex-col">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Local Support Team</h3>
                    <p className="text-gray-600">Dedicated support team for quick assistance</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center pb-8">
                <h3 className="text-2xl font-bold mb-4">Trusted by leading manufacturers</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  Join the growing community of factories that have transformed their operations with Rona's workforce
                  management system. From small workshops to large industrial complexes, we scale to meet your needs.
                </p>
                <p className="text-sm text-gray-500 italic">Join our growing list of manufacturing partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to transform your workforce management?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of factories already using Rona to streamline their operations
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  Start 14-day free trial
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-purple-600 bg-transparent px-8 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
