"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Clock,
  CreditCard,
  BarChart3,
  Shield,
  Clock3,
  MessageSquare,
  Award,
} from "lucide-react"
import Footer from "@/components/footer"
import { Logo } from "@/components/logo"

export default function AboutPage() {
  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo size="md" />
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-10 md:py-16 bg-[#0A1232] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1232]/95 to-[#0A1232]/80 z-10"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

          <div className="container relative z-20 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3 text-white">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why African Factories Choose <span className="text-primary">Rona</span>
                </h1>
                <p className="max-w-[800px] text-white/80 md:text-lg mx-auto">
                  The leading workforce management solution designed specifically for African manufacturing
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Link href="/register">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                      Start Free 14-Day Trial
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white bg-blue-900 hover:bg-blue-800"
                    >
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Moved above Key Benefits */}
        <section className="w-full py-12 md:py-16 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-black dark:text-white">
                Expected Impact for African Factories
              </h2>
              <p className="max-w-[800px] text-muted-foreground">
                Addressing the unique challenges of manufacturing workforce management in Africa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
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
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m16 12-4 4-4-4" />
                        <path d="M12 8v8" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Local Context & Language</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Full support for multiple African languages throughout the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Built by Africans who understand local factory operations</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Compliant with various African countries' labor laws and regulations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
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
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M6 8h.01" />
                        <path d="M6 12h.01" />
                        <path d="M6 16h.01" />
                        <path d="M10 8h8" />
                        <path d="M10 12h8" />
                        <path d="M10 16h8" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Works Offline & Reliable</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Functions during internet outages and power interruptions</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Automatic syncing when connection is restored</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Optimized for low-bandwidth environments</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
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
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                      >
                        <path d="M2 17a5 5 0 0 0 10 0c0-2.5-2.5-2.5-2.5-5 0-1.5 1-2 1.5-2 1 0 1.5.5 1.5 1.5-1.5.5-2 1-2 2 0 1 1 1 2 1a3 3 0 0 0 3-3c0-1.5-1.5-3-3.5-3-2 0-3.5 1.5-3.5 3 0 1.5 1 2 1 3 0 .5-.5 1.5-1 2" />
                        <path d="M20.2 2H16a2.2 2.2 0 0 0-2.2 2.2V17a3 3 0 0 0 3 3h.2a3 3 0 0 0 3-3V4.2A2.2 2.2 0 0 0 17.8 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">Affordable & Accessible</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Pricing in Ethiopian Birr with local payment options</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Flexible plans based on factory size and needs</span>
                    </li>
                    <li className="flex items-start gap-2">
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
                        className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>No hidden fees or surprise charges</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Projected Impact on Productivity</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    <div>
                      <span className="font-medium">15-20% reduction in administrative overhead</span>
                      <p className="text-muted-foreground text-sm">
                        Based on streamlined attendance tracking and shift management
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    <div>
                      <span className="font-medium">Up to 12% increase in workforce utilization</span>
                      <p className="text-muted-foreground text-sm">
                        Through optimized scheduling and reduced unplanned absences
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                    <div>
                      <span className="font-medium">25% faster response to production emergencies</span>
                      <p className="text-muted-foreground text-sm">
                        With real-time alerts and coordinated response management
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Projected Financial Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div>
                      <span className="font-medium">8-10% reduction in payroll processing costs</span>
                      <p className="text-muted-foreground text-sm">
                        Through automation and reduced manual calculations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div>
                      <span className="font-medium">15% decrease in unplanned overtime expenses</span>
                      <p className="text-muted-foreground text-sm">
                        Through improved shift planning and resource allocation
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
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
                      className="h-5 w-5 text-green-600 mt-0.5"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div>
                      <span className="font-medium">ROI typically achieved within 6-8 months</span>
                      <p className="text-muted-foreground text-sm">
                        Based on projected savings for medium-sized factories
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground italic">
                Note: All projections are based on industry benchmarks and early pilot programs. Individual results may
                vary based on factory size, type, and implementation scope.
              </p>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="w-full py-10 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-3">
                Key Benefits for Ethiopian Factories
              </h2>
              <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                Rona is designed specifically for Ethiopian manufacturing, addressing local challenges with
                purpose-built solutions
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-primary/10 bg-background hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-black dark:text-white">Local Context & Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Full Amharic language support throughout the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Built by Ethiopians who understand local factory operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Compliant with Ethiopian labor laws and regulations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/10 bg-background hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-black dark:text-white">Works Offline & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Functions during internet outages and power interruptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automatic syncing when connection is restored</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Optimized for low-bandwidth environments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/10 bg-background hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-black dark:text-white">Affordable & Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Pricing in Ethiopian Birr with local payment options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Flexible plans based on factory size and needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>No hidden fees or surprise charges</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comprehensive Features Section */}
        <section className="w-full py-10 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-3">All-in-One Workforce Management</h2>
              <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                Rona provides a complete solution for every aspect of factory workforce management
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock3 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Attendance & Time Tracking</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    NFC card technology, biometric options, and mobile check-ins for accurate attendance records.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Shift Management</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Create, manage and optimize shift schedules with easy drag-and-drop interfaces.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Payroll Processing</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Automated payroll calculations, tax deductions, and digital payment integration.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Performance Tracking</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Set KPIs, track worker and team performance, and generate detailed reports.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Communication Tools</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Announcements, shift requests, and emergency reporting features in both languages.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 0 0 1-2 2H4a2 0 0 1-2-2v-1"></path>
                        <path d="M2 13h10"></path>
                        <path d="M5 16l-3-3 3-3"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-base">Inventory Management</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Manage raw materials, track stock levels, and optimize supply chain with real-time inventory
                    tracking.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Compliance Management</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Labor law compliance, documentation management, and regulatory reporting.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-
center"
                    >
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Analytics & Insights</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Dashboards and reports to optimize workforce allocation and reduce costs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base">Employee Benefits</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Manage bonuses, leave requests, and benefits tracking for worker satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="w-full py-10 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-3">Simple Implementation Process</h2>
              <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                We've streamlined the implementation process to have you up and running in just 7 days
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-8 relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="md:w-1/2 md:text-right md:pr-10 order-2 md:order-1">
                    <h3 className="text-lg font-bold mb-1">Initial Consultation</h3>
                    <p className="text-muted-foreground text-sm">
                      We'll discuss your factory's specific needs, workforce size, and operational challenges to
                      customize Rona for your environment.
                    </p>
                  </div>
                  <div className="md:w-1/2 relative flex order-1 md:order-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white z-10 md:absolute md:-left-3.5 text-sm">
                      1
                    </div>
                    <div className="ml-4 md:ml-10">
                      <h4 className="text-base font-semibold md:mt-0">Day 1</h4>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="md:w-1/2 relative flex">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white z-10 md:absolute md:-right-3.5 text-sm">
                      2
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold md:mt-0">Day 2-3</h4>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-10">
                    <h3 className="text-lg font-bold mb-1">System Configuration</h3>
                    <p className="text-muted-foreground text-sm">
                      Our team will set up the Rona platform with your factory's departments, shifts, roles, and worker
                      information.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="md:w-1/2 md:text-right md:pr-10 order-2 md:order-1">
                    <h3 className="text-lg font-bold mb-1">Training & Onboarding</h3>
                    <p className="text-muted-foreground text-sm">
                      We provide comprehensive training for administrators, managers, and workers in both Amharic and
                      English.
                    </p>
                  </div>
                  <div className="md:w-1/2 relative flex order-1 md:order-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white z-10 md:absolute md:-left-3.5 text-sm">
                      3
                    </div>
                    <div className="ml-4 md:ml-10">
                      <h4 className="text-base font-semibold md:mt-0">Day 4-5</h4>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="md:w-1/2 relative flex">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white z-10 md:absolute md:-right-3.5 text-sm">
                      4
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold md:mt-0">Day 6-7</h4>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-10">
                    <h3 className="text-lg font-bold mb-1">Go Live & Support</h3>
                    <p className="text-muted-foreground text-sm">
                      Launch the system with our team on-site to ensure a smooth transition, followed by ongoing local
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Modified to remove specific packages */}
        <section className="w-full py-10 md:py-16 bg-[#0A1232] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1232]/95 to-[#0A1232]/80 z-10"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>

          <div className="container relative z-20 px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-3">Flexible Pricing Plans</h2>
              <p className="text-lg text-white/80 max-w-[700px] mx-auto">
                Transparent pricing designed specifically for Ethiopian factories
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-bold mb-3">Value-Based Pricing</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    At Rona, we believe in providing exceptional value at a fair price. Our pricing structure is
                    designed to be:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-sm">Transparent</span>
                        <span className="text-white/70 text-xs">No hidden fees or surprise charges</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-sm">Scalable</span>
                        <span className="text-white/70 text-xs">Plans that grow with your factory</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-sm">Local</span>
                        <span className="text-white/70 text-xs">
                          Priced in Ethiopian Birr with local payment options
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold block text-sm">ROI-Focused</span>
                        <span className="text-white/70 text-xs">Expected to pay for itself within 3 months</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="text-lg font-semibold mb-2">Plans for Every Factory Size</h4>
                    <p className="text-white/80 mb-3 text-sm">
                      Whether you're a small workshop or a large manufacturing facility, we have tailored solutions for:
                    </p>
                    <ul className="space-y-1.5 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Small factories (up to 50 workers)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Medium factories (51-200 workers)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>Large factories (201+ workers)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 mb-3 text-sm">
                      Contact us for a personalized quote based on your specific needs and factory size.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/pricing-request">
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                          Request Pricing
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white text-white bg-blue-900 hover:bg-blue-800"
                        >
                          Start Free Trial
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-10 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-3">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                Find answers to common questions about Rona
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:gap-8 max-w-3xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">How long does implementation take?</h3>
                <p className="text-muted-foreground text-sm">
                  Most factories are expected to be fully operational with Rona within 7 days. Our implementation team
                  handles the setup, configuration, and training to ensure a smooth transition.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold">Do workers need smartphones to use Rona?</h3>
                <p className="text-muted-foreground text-sm">
                  No. While we offer a mobile app, Rona works primarily with NFC cards and dedicated kiosks that can be
                  placed throughout your factory for worker check-ins and information access.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold">What happens if we lose internet connection?</h3>
                <p className="text-muted-foreground text-sm">
                  Rona works offline and automatically syncs when connection is restored. Your operations continue
                  uninterrupted even during extended outages.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold">Is Rona compliant with Ethiopian labor laws?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, Rona is built specifically to comply with Ethiopian labor regulations, including proper overtime
                  calculations, leave entitlements, and required reporting.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold">Can we integrate Rona with our existing systems?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes. Rona offers API integration with common ERP systems, accounting software, and other business
                  tools. Our team can assist with custom integrations as needed.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold">What kind of support do you provide?</h3>
                <p className="text-muted-foreground text-sm">
                  We plan to offer multi-channel support in both Amharic and English, including phone, email, and
                  on-site assistance. Our support team will be based in Addis Ababa for quick response.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-10 md:py-16 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-2xl font-bold tracking-tighter md:text-4xl max-w-2xl">
                Ready to transform your factory's workforce management?
              </h2>
              <p className="text-lg text-white/80 max-w-[700px]">
                Join the growing community of African factories preparing to use Rona to optimize operations, reduce
                costs, and improve worker satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-6">
                    Start 14-Day Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white bg-blue-900 hover:bg-blue-800">
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-white/60">
                No credit card required. No long-term commitment. Free migration from your current system.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer contactPhone="+251 985 209 263" contactEmail="ronaems.et@gmail.com" />
    </div>
  )
}
