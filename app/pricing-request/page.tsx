"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Building, Users, Factory, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/footer"
import { Logo } from "@/components/logo"

export default function PricingRequestPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    factorySize: "",
    industry: "",
    specificNeeds: "",
    preferredContact: "email",
    submitted: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormState((prev) => ({ ...prev, preferredContact: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formState)
    // Show success message
    setFormState((prev) => ({ ...prev, submitted: true }))
    // In a real application, you might redirect after a delay
    setTimeout(() => {
      router.push("/")
    }, 5000)
  }

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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Request Custom Pricing for Your Factory
                </h1>
                <p className="max-w-[800px] text-white/80 md:text-lg mx-auto">
                  Get a personalized quote tailored to your specific needs and factory size
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            {formState.submitted ? (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Thank You!</h2>
                    <p className="text-muted-foreground">
                      Your pricing request has been submitted successfully. Our team will contact you within 24 hours
                      with a customized quote.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to the homepage in a few seconds...
                    </p>
                    <Button onClick={() => router.push("/")} className="mt-4">
                      Return to Homepage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-xl font-bold mb-4">Company Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <div className="relative">
                                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id="companyName"
                                    name="companyName"
                                    placeholder="Your company name"
                                    className="pl-10"
                                    value={formState.companyName}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Select
                                  value={formState.industry}
                                  onValueChange={(value) => handleSelectChange("industry", value)}
                                  required
                                >
                                  <SelectTrigger id="industry" className="w-full">
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="textiles">Textiles & Garments</SelectItem>
                                    <SelectItem value="food">Food Processing</SelectItem>
                                    <SelectItem value="leather">Leather & Footwear</SelectItem>
                                    <SelectItem value="metal">Metal & Engineering</SelectItem>
                                    <SelectItem value="construction">Construction Materials</SelectItem>
                                    <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="factorySize">Factory Size</Label>
                                <div className="relative">
                                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Select
                                    value={formState.factorySize}
                                    onValueChange={(value) => handleSelectChange("factorySize", value)}
                                    required
                                  >
                                    <SelectTrigger id="factorySize" className="w-full pl-10">
                                      <SelectValue placeholder="Number of workers" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="small">Small (1-50 workers)</SelectItem>
                                      <SelectItem value="medium">Medium (51-200 workers)</SelectItem>
                                      <SelectItem value="large">Large (201-500 workers)</SelectItem>
                                      <SelectItem value="enterprise">Enterprise (500+ workers)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="locations">Number of Locations</Label>
                                <div className="relative">
                                  <Factory className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Select
                                    value={formState.locations}
                                    onValueChange={(value) => handleSelectChange("locations", value)}
                                    required
                                  >
                                    <SelectTrigger id="locations" className="w-full pl-10">
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">Single location</SelectItem>
                                      <SelectItem value="2-5">2-5 locations</SelectItem>
                                      <SelectItem value="6+">6+ locations</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="contactName">Contact Name</Label>
                                <Input
                                  id="contactName"
                                  name="contactName"
                                  placeholder="Your full name"
                                  value={formState.contactName}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="your.email@company.com"
                                  value={formState.email}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  placeholder="+251 91 234 5678"
                                  value={formState.phone}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Preferred Contact Method</Label>
                                <RadioGroup
                                  value={formState.preferredContact}
                                  onValueChange={handleRadioChange}
                                  className="flex space-x-4"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="email-contact" />
                                    <Label htmlFor="email-contact" className="cursor-pointer">
                                      Email
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="phone" id="phone-contact" />
                                    <Label htmlFor="phone-contact" className="cursor-pointer">
                                      Phone
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="specificNeeds">Specific Requirements or Questions</Label>
                            <Textarea
                              id="specificNeeds"
                              name="specificNeeds"
                              placeholder="Tell us about your specific workforce management needs or any questions you have about our pricing..."
                              rows={4}
                              value={formState.specificNeeds}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="pt-4">
                            <Button type="submit" className="w-full md:w-auto">
                              Submit Pricing Request
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                </div>

                <div>
                  <div className="sticky top-24 space-y-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-bold mb-4">What to Expect</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Quick Response</span>
                              <p className="text-sm text-muted-foreground">
                                We'll contact you within 24 hours with pricing information
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Personalized Quote</span>
                              <p className="text-sm text-muted-foreground">
                                Tailored to your factory size and specific requirements
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Flexible Payment Options</span>
                              <p className="text-sm text-muted-foreground">
                                Including local payment methods in Ethiopian Birr
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">No Obligation</span>
                              <p className="text-sm text-muted-foreground">
                                Request pricing information with no commitment required
                              </p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-bold mb-2">Need Immediate Assistance?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our team is available to answer your questions right away
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                              >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Call Us</p>
                              <p className="text-sm text-muted-foreground">+251 985 209 263</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary"
                              >
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email Us</p>
                              <p className="text-sm text-muted-foreground">ronaems.et@gmail.com</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl mb-2">
                What Our Customers Say About Our Pricing
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Hear from Ethiopian factory owners who have found value in our workforce management solution
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
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
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm italic">
                          "The pricing was transparent and fair. We've seen a 30% reduction in administrative costs
                          since implementing Rona."
                        </p>
                        <p className="text-sm font-medium mt-2">Abebe Kebede</p>
                        <p className="text-xs text-muted-foreground">Operations Manager, Addis Textile Factory</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
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
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm italic">
                          "As a small factory owner, I was worried about costs. Rona's flexible pricing made it
                          accessible, and the ROI has been impressive."
                        </p>
                        <p className="text-sm font-medium mt-2">Sara Haile</p>
                        <p className="text-xs text-muted-foreground">Owner, Haile Food Processing</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
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
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm italic">
                          "The ability to pay in Birr and the local support team made all the difference. The pricing
                          structure scales perfectly with our growth."
                        </p>
                        <p className="text-sm font-medium mt-2">Dawit Mengistu</p>
                        <p className="text-xs text-muted-foreground">HR Director, Addis Metal Works</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
