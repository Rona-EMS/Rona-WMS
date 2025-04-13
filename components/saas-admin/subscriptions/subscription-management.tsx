"use client"

import * as React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  Search,
  Filter,
  Edit,
  Trash2,
  Mail,
  RefreshCw,
  Eye,
  Download,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { getFactoryNameBySubscription } from "@/lib/mock-data-subscriptions"
import type { Subscription } from "@/lib/types"

interface SubscriptionManagementProps {
  subscriptions: Subscription[]
  filterType: string
}

export function SubscriptionManagement({ subscriptions, filterType }: SubscriptionManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState<string | null>(null)
  const [billingCycleFilter, setBillingCycleFilter] = useState<string | null>(null)

  // Get unique plans and billing cycles for filters
  const uniquePlans = [...new Set(subscriptions.map((sub) => sub.plan))]
  const uniqueBillingCycles = [...new Set(subscriptions.map((sub) => sub.billingCycle))]

  // Filter subscriptions based on search term and filters
  const filteredSubscriptions = React.useMemo(() => {
    return subscriptions.filter((subscription) => {
      const factoryName = getFactoryNameBySubscription(subscription)

      const matchesSearch =
        factoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPlan = !planFilter || subscription.plan === planFilter
      const matchesBillingCycle = !billingCycleFilter || subscription.billingCycle === billingCycleFilter

      return matchesSearch && matchesPlan && matchesBillingCycle
    })
  }, [subscriptions, searchTerm, planFilter, billingCycleFilter])

  // Reset all filters
  const resetFilters = React.useCallback(() => {
    setSearchTerm("")
    setPlanFilter(null)
    setBillingCycleFilter(null)
  }, [])

  // Format date
  const formatDate = React.useCallback((dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Plan
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Plan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniquePlans.map((plan) => (
                <DropdownMenuItem
                  key={plan}
                  onClick={() => setPlanFilter(plan)}
                  className={planFilter === plan ? "bg-purple-50" : ""}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Billing Cycle
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Billing Cycle</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueBillingCycles.map((cycle) => (
                <DropdownMenuItem
                  key={cycle}
                  onClick={() => setBillingCycleFilter(cycle)}
                  className={billingCycleFilter === cycle ? "bg-purple-50" : ""}
                >
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchTerm || planFilter || billingCycleFilter) && (
            <Button variant="ghost" onClick={resetFilters}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}

          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factory</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Price (ETB)</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No subscriptions found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{getFactoryNameBySubscription(subscription)}</TableCell>
                  <TableCell>
                    <PlanBadge plan={subscription.plan} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={subscription.status} />
                  </TableCell>
                  <TableCell>{formatDate(subscription.startDate)}</TableCell>
                  <TableCell>{formatDate(subscription.endDate)}</TableCell>
                  <TableCell>
                    {subscription.price.toLocaleString()}
                    {subscription.discount > 0 && (
                      <span className="text-xs text-green-600 ml-1">(-{subscription.discount}%)</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={subscription.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Subscription
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Process Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Reminder
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredSubscriptions.length}</strong> of <strong>{subscriptions.length}</strong>{" "}
          subscriptions
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-purple-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper component for plan badges
function PlanBadge({ plan }: { plan: string }) {
  switch (plan) {
    case "basic":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Basic</Badge>
    case "standard":
      return <Badge className="bg-purple-300 text-purple-800 hover:bg-purple-300">Standard</Badge>
    case "premium":
      return <Badge className="bg-purple-500 text-white hover:bg-purple-500">Premium</Badge>
    case "custom":
      return <Badge className="bg-purple-900 text-white hover:bg-purple-900">Custom</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{plan}</Badge>
  }
}

// Helper component for status badges
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "trial":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Trial</Badge>
    case "expired":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
    case "suspended":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Suspended</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
  }
}

// Helper component for payment status badges
function PaymentStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "paid":
      return (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
          <span className="text-sm text-green-600">Paid</span>
        </div>
      )
    case "pending":
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-yellow-600 mr-1" />
          <span className="text-sm text-yellow-600">Pending</span>
        </div>
      )
    case "overdue":
      return (
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 text-red-600 mr-1" />
          <span className="text-sm text-red-600">Overdue</span>
        </div>
      )
    case "trial":
      return (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-blue-600 mr-1" />
          <span className="text-sm text-blue-600">Trial</span>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <span className="text-sm">{status}</span>
        </div>
      )
  }
}
