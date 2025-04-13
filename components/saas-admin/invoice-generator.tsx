"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { factories, subscriptions } from "@/lib/mock-data"
import { format, parseISO, addMonths } from "date-fns"
import { Download, Mail, Printer, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useRouter } from "next/navigation"

export function InvoiceGenerator() {
  const [selectedFactory, setSelectedFactory] = useState("")
  const [selectedSubscription, setSelectedSubscription] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [dueDate, setDueDate] = useState(format(addMonths(new Date(), 1), "yyyy-MM-dd"))
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(100000 + Math.random() * 900000)}`)
  const [notes, setNotes] = useState("")
  const [includeDetails, setIncludeDetails] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null)
  const [isSending, setIsSending] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)

  const { toast } = useToast()
  const { language, t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Reset any errors when the component mounts
    setPreviewError(null)

    // Generate a unique invoice number on component mount
    setInvoiceNumber(`INV-${Math.floor(100000 + Math.random() * 900000)}`)
  }, [])

  // Get factory and subscription details
  const selectedFactoryData = factories.find((f) => f.id === selectedFactory)
  const selectedSubscriptionData = subscriptions.find((s) => s.id === selectedSubscription)

  // Filter subscriptions based on selected factory
  const factorySubscriptions = selectedFactory ? subscriptions.filter((sub) => sub.factoryId === selectedFactory) : []

  const handleFactoryChange = (factoryId: string) => {
    setSelectedFactory(factoryId)
    setSelectedSubscription("")
    setPreviewError(null)

    // If factory has only one subscription, select it automatically
    const factorySubs = subscriptions.filter((sub) => sub.factoryId === factoryId)
    if (factorySubs.length === 1) {
      setSelectedSubscription(factorySubs[0].id)
    }
  }

  const generateInvoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default button behavior
    e.preventDefault()

    if (!selectedFactory || !selectedSubscription) {
      toast({
        title: language === "en" ? "Missing information" : "መረጃ ይጎድላል",
        description: language === "en" ? "Please select a factory and subscription" : "እባክዎ ፋብሪካ እና ደንበኝነት ይምረጡ",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setPreviewError(null)

    try {
      // Ensure we have valid dates
      const parsedInvoiceDate = new Date(invoiceDate)
      const parsedDueDate = new Date(dueDate)

      if (isNaN(parsedInvoiceDate.getTime()) || isNaN(parsedDueDate.getTime())) {
        throw new Error("Invalid date format")
      }

      // Simulate API call delay
      setTimeout(() => {
        try {
          // Ensure subscription data exists and has required properties
          if (!selectedSubscriptionData || !selectedFactoryData) {
            throw new Error("Missing subscription or factory data")
          }

          // Create safe subscription data with defaults
          const safeSubscription = {
            ...selectedSubscriptionData,
            price: selectedSubscriptionData.price || 0,
            plan: selectedSubscriptionData.plan || "basic",
            startDate: selectedSubscriptionData.startDate || format(new Date(), "yyyy-MM-dd"),
            endDate: selectedSubscriptionData.endDate || format(addMonths(new Date(), 1), "yyyy-MM-dd"),
          }

          // Create safe factory data with defaults
          const safeFactory = {
            ...selectedFactoryData,
            name: selectedFactoryData.name || "Unknown Factory",
            location: selectedFactoryData.location || "Unknown Location",
            industry: selectedFactoryData.industry || "Unknown Industry",
            totalWorkers: selectedFactoryData.totalWorkers || 0,
          }

          const invoice = {
            invoiceNumber,
            invoiceDate,
            dueDate,
            factory: safeFactory,
            subscription: safeSubscription,
            notes,
            includeDetails,
            items: [
              {
                description: `${safeSubscription.plan.charAt(0).toUpperCase() + safeSubscription.plan.slice(1)} Plan Subscription`,
                quantity: 1,
                unitPrice: safeSubscription.price,
                total: safeSubscription.price,
              },
            ],
            subtotal: safeSubscription.price,
            tax: safeSubscription.price * 0.15, // 15% tax
            total: safeSubscription.price * 1.15,
            status: "unpaid",
          }

          setGeneratedInvoice(invoice)
          setIsGenerating(false)

          toast({
            title: language === "en" ? "Invoice generated" : "ደረሰኝ ተፈጥሯል",
            description:
              language === "en"
                ? `Invoice #${invoiceNumber} has been generated successfully`
                : `ደረሰኝ #${invoiceNumber} በተሳካ ሁኔታ ተፈጥሯል`,
          })
        } catch (error) {
          console.error("Error generating invoice preview:", error)
          setIsGenerating(false)
          setPreviewError(error instanceof Error ? error.message : "Failed to generate invoice preview")
          toast({
            title: language === "en" ? "Error" : "ስህተት",
            description: language === "en" ? "Failed to generate invoice preview" : "የደረሰኝ ቅድመ እይታን ማመንጨት አልተሳካም",
            variant: "destructive",
          })
        }
      }, 1500)
    } catch (error) {
      console.error("Error in invoice generation:", error)
      setIsGenerating(false)
      setPreviewError(error instanceof Error ? error.message : "Failed to generate invoice")
      toast({
        title: language === "en" ? "Error" : "ስህተት",
        description: language === "en" ? "Failed to generate invoice" : "ደረሰኝ ማመንጨት አልተሳካም",
        variant: "destructive",
      })
    }
  }

  const downloadInvoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!generatedInvoice) return

    toast({
      title: language === "en" ? "Downloading" : "በማውረድ ላይ",
      description: language === "en" ? "Preparing invoice PDF..." : "የደረሰኝ PDF በማዘጋጀት ላይ...",
    })

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: language === "en" ? "Invoice downloaded" : "ደረሰኝ ተወርዷል",
        description: language === "en" ? "The invoice has been downloaded as a PDF" : "ደረሰኙ እንደ PDF ተወርዷል",
      })
    }, 1500)
  }

  const printInvoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!generatedInvoice) return

    // In a real app, this would use the browser's print functionality
    toast({
      title: language === "en" ? "Printing" : "በማተም ላይ",
      description: language === "en" ? "Preparing invoice for printing..." : "ደረሰኝን ለማተም በማዘጋጀት ላይ...",
    })

    // Simulate print dialog
    setTimeout(() => {
      window.print()
    }, 500)
  }

  const sendInvoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!generatedInvoice || !selectedFactoryData) return

    setIsSending(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: language === "en" ? "Invoice sent" : "ደረሰኝ ተልኳል",
        description:
          language === "en"
            ? `Invoice has been sent to ${selectedFactoryData?.name}`
            : `ደረሰኝ ወደ ${selectedFactoryData?.name} ተልኳል`,
      })
    }, 1500)
  }

  const saveAndRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!selectedFactory || !selectedSubscription) {
      toast({
        title: language === "en" ? "Missing information" : "መረጃ ይጎድላል",
        description: language === "en" ? "Please select a factory and subscription" : "እባክዎ ፋብሪካ እና ደንበኝነት ይምረጡ",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setPreviewError(null)

    // Simulate API call delay
    setTimeout(() => {
      try {
        toast({
          title: language === "en" ? "Invoice saved" : "ደረሰኝ ተቀምጧል",
          description:
            language === "en"
              ? `Invoice #${invoiceNumber} has been saved successfully`
              : `ደረሰኝ #${invoiceNumber} በተሳካ ሁኔታ ተቀምጧል`,
        })

        // Navigate back to invoices list
        router.push("/saas-admin/invoices")
      } catch (error) {
        console.error("Error saving invoice:", error)
        setIsGenerating(false)
        setPreviewError(error instanceof Error ? error.message : "Failed to save invoice")
        toast({
          title: language === "en" ? "Error" : "ስህተት",
          description: language === "en" ? "Failed to save invoice" : "ደረሰኝ ማስቀመጥ አልተሳካም",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  // Safe date formatting function
  const safeFormatDate = (dateString: string, fallback = "N/A") => {
    try {
      const date = parseISO(dateString)
      if (isNaN(date.getTime())) return fallback
      return format(date, "MMMM d, yyyy")
    } catch (error) {
      console.error("Date formatting error:", error)
      return fallback
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Invoice Generator" : "የደረሰኝ አመንጪ"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Generate professional invoices for your clients" : "ለደንበኞችዎ ሙያዊ ደረሰኞችን ያመንጩ"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="factory">{language === "en" ? "Select Factory" : "ፋብሪካ ይምረጡ"}</Label>
              <Select value={selectedFactory} onValueChange={handleFactoryChange}>
                <SelectTrigger id="factory">
                  <SelectValue placeholder={language === "en" ? "Select a factory" : "ፋብሪካ ይምረጡ"} />
                </SelectTrigger>
                <SelectContent>
                  {factories.map((factory) => (
                    <SelectItem key={factory.id} value={factory.id}>
                      {factory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subscription">{language === "en" ? "Select Subscription" : "ደንበኝነት ይምረጡ"}</Label>
              <Select
                value={selectedSubscription}
                onValueChange={setSelectedSubscription}
                disabled={!selectedFactory || factorySubscriptions.length === 0}
              >
                <SelectTrigger id="subscription">
                  <SelectValue placeholder={language === "en" ? "Select a subscription" : "ደንበኝነት ይምረጡ"} />
                </SelectTrigger>
                <SelectContent>
                  {factorySubscriptions.map((subscription) => (
                    <SelectItem key={subscription.id} value={subscription.id}>
                      {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan -{" "}
                      {subscription.price.toLocaleString()} ETB
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="invoice-number">{language === "en" ? "Invoice Number" : "የደረሰኝ ቁጥር"}</Label>
              <Input id="invoice-number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice-date">{language === "en" ? "Invoice Date" : "የደረሰኝ ቀን"}</Label>
              <Input
                id="invoice-date"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date">{language === "en" ? "Due Date" : "የመክፈያ ቀን"}</Label>
              <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{language === "en" ? "Notes" : "ማስታወሻዎች"}</Label>
            <Textarea
              id="notes"
              placeholder={
                language === "en" ? "Add any additional notes to the invoice" : "ለደረሰኙ ማንኛውንም ተጨማሪ ማስታወሻዎች ያክሉ"
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="include-details" checked={includeDetails} onCheckedChange={setIncludeDetails} />
            <Label htmlFor="include-details">
              {language === "en" ? "Include subscription details" : "የደንበኝነት ዝርዝሮችን አካትት"}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={generateInvoice}
            disabled={!selectedFactory || !selectedSubscription || isGenerating}
            type="button"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                {language === "en" ? "Generating..." : "በማመንጨት ላይ..."}
              </span>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                {language === "en" ? "Generate Invoice" : "ደረሰኝ አመንጭ"}
              </>
            )}
          </Button>

          <Button
            onClick={saveAndRedirect}
            disabled={!selectedFactory || !selectedSubscription || isGenerating}
            variant="outline"
            type="button"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                {language === "en" ? "Saving..." : "በማስቀመጥ ላይ..."}
              </span>
            ) : (
              <>{language === "en" ? "Save & Return" : "አስቀምጥ እና ተመለስ"}</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {previewError && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">{language === "en" ? "Error" : "ስህተት"}</CardTitle>
            <CardDescription>
              {language === "en"
                ? "There was an error generating the invoice preview:"
                : "ደረሰኝ ቅድመ እይታን በማመንጨት ላይ ስህተት ተከስቷል:"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{previewError}</p>
            <p className="mt-4">
              {language === "en"
                ? "Please check your input data and try again. If the problem persists, contact support."
                : "እባክዎ የግቤት ውሂብዎን ያረጋግጡ እና እንደገና ይሞክሩ። ችግሩ ከቀጠለ፣ ድጋፍን ያግኙ።"}
            </p>
          </CardContent>
        </Card>
      )}

      {generatedInvoice && !previewError && (
        <Card className="print:shadow-none" id="invoice-preview">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{language === "en" ? "Invoice Preview" : "የደረሰኝ ቅድመ እይታ"}</CardTitle>
                <CardDescription>
                  {language === "en" ? "Preview and download the generated invoice" : "የተመነጨውን ደረሰኝ ይመልከቱ እና ያውርዱ"}
                </CardDescription>
              </div>
              <div className="mt-4 flex space-x-2 sm:mt-0 print:hidden">
                <Button variant="outline" size="sm" onClick={printInvoice} className="px-3" type="button">
                  <Printer className="mr-2 h-4 w-4" />
                  {language === "en" ? "Print" : "አትም"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadInvoice} className="px-3" type="button">
                  <Download className="mr-2 h-4 w-4" />
                  {language === "en" ? "Download" : "አውርድ"}
                </Button>
                <Button size="sm" onClick={sendInvoice} disabled={isSending} className="px-3" type="button">
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      {language === "en" ? "Sending..." : "በመላክ ላይ..."}
                    </span>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      {language === "en" ? "Send" : "ላክ"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-6">
              {/* Invoice Header */}
              <div className="flex flex-col justify-between border-b pb-6 md:flex-row">
                <div>
                  <h1 className="text-3xl font-bold text-primary">Rona</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Workforce Management System</p>
                  <div className="mt-4">
                    <p className="text-sm">Bole Road, Addis Ababa</p>
                    <p className="text-sm">Ethiopia</p>
                    <p className="text-sm">info@rona.com</p>
                    <p className="text-sm">+251 911 123 456</p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:text-right">
                  <h2 className="text-2xl font-semibold">{language === "en" ? "INVOICE" : "ደረሰኝ"}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">#{generatedInvoice.invoiceNumber}</p>
                  <div className="mt-4">
                    <div className="flex justify-between md:justify-end md:space-x-4">
                      <span className="text-sm font-medium">{language === "en" ? "Date:" : "ቀን:"}</span>
                      <span className="text-sm">{safeFormatDate(generatedInvoice.invoiceDate)}</span>
                    </div>
                    <div className="flex justify-between md:justify-end md:space-x-4">
                      <span className="text-sm font-medium">{language === "en" ? "Due Date:" : "የመክፈያ ቀን:"}</span>
                      <span className="text-sm">{safeFormatDate(generatedInvoice.dueDate)}</span>
                    </div>
                    <div className="mt-2 inline-flex rounded-md border px-3 py-1">
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {language === "en" ? "UNPAID" : "ያልተከፈለ"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="mt-6 border-b pb-6">
                <h3 className="text-lg font-semibold">{language === "en" ? "Bill To:" : "ለ:"}</h3>
                <div className="mt-2">
                  <p className="font-medium">{generatedInvoice.factory?.name || "Unknown Factory"}</p>
                  <p className="text-sm">{generatedInvoice.factory?.location || "Unknown Location"}, Ethiopia</p>
                  <p className="text-sm">
                    {language === "en" ? "Industry:" : "ኢንዱስትሪ:"}{" "}
                    {generatedInvoice.factory?.industry || "Unknown Industry"}
                  </p>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="mt-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left text-sm font-medium">
                        {language === "en" ? "Description" : "መግለጫ"}
                      </th>
                      <th className="py-2 text-right text-sm font-medium">{language === "en" ? "Quantity" : "ብዛት"}</th>
                      <th className="py-2 text-right text-sm font-medium">
                        {language === "en" ? "Unit Price" : "የአንዱ ዋጋ"}
                      </th>
                      <th className="py-2 text-right text-sm font-medium">{language === "en" ? "Amount" : "መጠን"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedInvoice.items &&
                      generatedInvoice.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-4 text-sm">
                            {item.description || "Subscription"}
                            {includeDetails && generatedInvoice.subscription && (
                              <div className="mt-1 text-xs text-muted-foreground">
                                <p>
                                  {language === "en" ? "Period:" : "ጊዜ:"}{" "}
                                  {safeFormatDate(generatedInvoice.subscription?.startDate)} -{" "}
                                  {safeFormatDate(generatedInvoice.subscription?.endDate)}
                                </p>
                                <p>
                                  {language === "en" ? "Factory:" : "ፋብሪካ:"}{" "}
                                  {generatedInvoice.factory?.name || "Unknown"} (
                                  {generatedInvoice.factory?.totalWorkers || 0}{" "}
                                  {language === "en" ? "workers" : "ሰራተኞች"})
                                </p>
                              </div>
                            )}
                          </td>
                          <td className="py-4 text-right text-sm">{item.quantity || 1}</td>
                          <td className="py-4 text-right text-sm">{(item.unitPrice || 0).toLocaleString()} ETB</td>
                          <td className="py-4 text-right text-sm">{(item.total || 0).toLocaleString()} ETB</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Invoice Summary */}
              <div className="mt-6 flex justify-end">
                <div className="w-full max-w-xs">
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">{language === "en" ? "Subtotal:" : "ንዑስ ድምር:"}</span>
                    <span>{(generatedInvoice.subtotal || 0).toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">{language === "en" ? "Tax (15%):" : "ግብር (15%):"}</span>
                    <span>{(generatedInvoice.tax || 0).toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <span>{language === "en" ? "Total:" : "ጠቅላላ:"}</span>
                    <span>{(generatedInvoice.total || 0).toLocaleString()} ETB</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {generatedInvoice.notes && (
                <div className="mt-8 rounded-md bg-muted p-4">
                  <h4 className="font-medium">{language === "en" ? "Notes:" : "ማስታወሻዎች:"}</h4>
                  <p className="mt-1 text-sm">{generatedInvoice.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                <p>{language === "en" ? "Thank you for your business!" : "ስለ ንግድዎ እናመሰግናለን!"}</p>
                <p className="mt-1">
                  {language === "en"
                    ? "Payment is due within 30 days. Please make checks payable to Rona Workforce Management System."
                    : "ክፍያው በ30 ቀናት ውስጥ መከፈል አለበት። እባክዎ ቼኮችን ለሮና የሰራተኛ አስተዳደር ስርዓት ይክፈሉ።"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
