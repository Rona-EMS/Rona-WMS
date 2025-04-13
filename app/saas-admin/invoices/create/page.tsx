"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { InvoiceGenerator } from "@/components/saas-admin/invoice-generator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/context/language-context"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreateInvoicePage() {
  const router = useRouter()
  const { language } = useLanguage()

  return (
    <DashboardShell
      title={language === "en" ? "Create Invoice" : "ደረሰኝ ፍጠር"}
      description={language === "en" ? "Generate a new invoice for a factory" : "ለፋብሪካ አዲስ ደረሰኝ ያመንጩ"}
      headerAction={
        <Button variant="purple" onClick={() => router.push("/saas-admin/invoices")} type="button">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "en" ? "Back to Invoices" : "ወደ ደረሰኞች ተመለስ"}
        </Button>
      }
    >
      <Suspense fallback={<InvoiceGeneratorSkeleton />}>
        <InvoiceGenerator />
      </Suspense>
    </DashboardShell>
  )
}

function InvoiceGeneratorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border shadow-sm">
        <div className="p-6">
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  )
}
