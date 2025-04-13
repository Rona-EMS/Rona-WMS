import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CreateInvoiceLoading() {
  return (
    <DashboardShell
      title="Create Invoice"
      description="Generate a new invoice for a factory"
      headerAction={
        <Button variant="purple" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
        </Button>
      }
    >
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
    </DashboardShell>
  )
}
