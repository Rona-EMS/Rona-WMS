"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SubscriptionOverview } from "@/components/saas-admin/subscriptions/subscription-overview"
import { SubscriptionManagement } from "@/components/saas-admin/subscriptions/subscription-management"
import { enhancedSubscriptions } from "@/lib/mock-data-subscriptions"
import { enhancedFactories } from "@/lib/mock-data-factories"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import type { Subscription } from "@/lib/types"

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddSubscriptionDialogOpen, setIsAddSubscriptionDialogOpen] = useState(false)
  const [timeframe, setTimeframe] = useState("monthly")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(enhancedSubscriptions)
  const { toast } = useToast()

  // Form state for new subscription
  const [newSubscription, setNewSubscription] = useState({
    factoryId: "",
    plan: "basic",
    billingCycle: "annual",
    price: 20000,
    paymentMethod: "telebirr",
    autoRenew: true,
    discount: 0,
  })

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSubscription((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (field: string, value: string | number) => {
    setNewSubscription((prev) => ({ ...prev, [field]: value }))
  }

  // Handle switch changes
  const handleSwitchChange = (field: string, checked: boolean) => {
    setNewSubscription((prev) => ({ ...prev, [field]: checked }))
  }

  // Set price based on plan
  useEffect(() => {
    let basePrice = 0
    switch (newSubscription.plan) {
      case "basic":
        basePrice = 20000
        break
      case "standard":
        basePrice = 35000
        break
      case "premium":
        basePrice = 50000
        break
      case "custom":
        basePrice = 75000
        break
      default:
        basePrice = 20000
    }

    // Apply discount
    const discountedPrice = basePrice * (1 - newSubscription.discount / 100)

    // Set price
    setNewSubscription((prev) => ({ ...prev, price: discountedPrice }))
  }, [newSubscription.plan, newSubscription.discount])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newSubscription.factoryId) {
      toast({
        title: "Missing factory",
        description: "Please select a factory",
        variant: "destructive",
      })
      return
    }

    // Determine start and end dates
    const startDate = new Date().toISOString().split("T")[0]
    const endDate = new Date()

    switch (newSubscription.billingCycle) {
      case "monthly":
        endDate.setMonth(endDate.getMonth() + 1)
        break
      case "semi-annual":
        endDate.setMonth(endDate.getMonth() + 6)
        break
      case "annual":
        endDate.setFullYear(endDate.getFullYear() + 1)
        break
      default:
        endDate.setFullYear(endDate.getFullYear() + 1)
    }

    // Create features array based on plan
    let features: string[] = []
    switch (newSubscription.plan) {
      case "basic":
        features = ["25-users", "basic-analytics"]
        break
      case "standard":
        features = ["50-users", "basic-analytics", "email-support"]
        break
      case "premium":
        features = ["unlimited-users", "advanced-analytics", "priority-support", "custom-branding"]
        break
      case "custom":
        features = [
          "unlimited-users",
          "advanced-analytics",
          "priority-support",
          "custom-branding",
          "dedicated-account-manager",
          "on-site-training",
        ]
        break
    }

    // Create new subscription object
    const newSubscriptionObj: Subscription = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      factoryId: newSubscription.factoryId,
      plan: newSubscription.plan,
      status: "active",
      startDate,
      endDate: endDate.toISOString().split("T")[0],
      price: newSubscription.price,
      paymentMethod: newSubscription.paymentMethod,
      autoRenew: newSubscription.autoRenew,
      billingCycle: newSubscription.billingCycle,
      discount: newSubscription.discount,
      features,
      lastPaymentDate: startDate,
      nextPaymentDate: endDate.toISOString().split("T")[0],
      paymentStatus: "paid",
    }

    // Add to subscriptions
    setSubscriptions([newSubscriptionObj, ...subscriptions])

    // Close dialog and reset form
    setIsAddSubscriptionDialogOpen(false)
    setNewSubscription({
      factoryId: "",
      plan: "basic",
      billingCycle: "annual",
      price: 20000,
      paymentMethod: "telebirr",
      autoRenew: true,
      discount: 0,
    })

    // Get factory name
    const factory = enhancedFactories.find((f) => f.id === newSubscription.factoryId)

    toast({
      title: "Subscription added",
      description: `Subscription for ${factory?.name} has been added successfully`,
    })
  }

  return (
    <DashboardShell
      title="Subscription Management"
      description="Manage client subscriptions and plans"
      headerAction={
        <Button
          variant="default"
          className="px-4 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => setIsAddSubscriptionDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Subscription
        </Button>
      }
    >
      <div className="space-y-6">
        <SubscriptionOverview subscriptions={subscriptions} timeframe={timeframe} onTimeframeChange={setTimeframe} />

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 text-purple-600">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All Subscriptions
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Active
            </TabsTrigger>
            <TabsTrigger value="trial" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Trial
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Pending
            </TabsTrigger>
            <TabsTrigger value="expired" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Expired/Suspended
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <SubscriptionManagement subscriptions={subscriptions} filterType="all" />
          </TabsContent>
          <TabsContent value="active">
            <SubscriptionManagement
              subscriptions={subscriptions.filter((s) => s.status === "active")}
              filterType="active"
            />
          </TabsContent>
          <TabsContent value="trial">
            <SubscriptionManagement
              subscriptions={subscriptions.filter((s) => s.status === "trial")}
              filterType="trial"
            />
          </TabsContent>
          <TabsContent value="pending">
            <SubscriptionManagement
              subscriptions={subscriptions.filter((s) => s.status === "pending")}
              filterType="pending"
            />
          </TabsContent>
          <TabsContent value="expired">
            <SubscriptionManagement
              subscriptions={subscriptions.filter((s) => s.status === "expired" || s.status === "suspended")}
              filterType="expired"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Subscription Dialog */}
      <Dialog open={isAddSubscriptionDialogOpen} onOpenChange={setIsAddSubscriptionDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Subscription</DialogTitle>
              <DialogDescription>Create a new subscription for a factory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="factory">
                  Factory <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newSubscription.factoryId}
                  onValueChange={(value) => handleSelectChange("factoryId", value)}
                >
                  <SelectTrigger id="factory">
                    <SelectValue placeholder="Select a factory" />
                  </SelectTrigger>
                  <SelectContent>
                    {enhancedFactories.map((factory) => (
                      <SelectItem key={factory.id} value={factory.id}>
                        {factory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plan">
                    Subscription Plan <span className="text-red-500">*</span>
                  </Label>
                  <Select value={newSubscription.plan} onValueChange={(value) => handleSelectChange("plan", value)}>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingCycle">
                    Billing Cycle <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newSubscription.billingCycle}
                    onValueChange={(value) => handleSelectChange("billingCycle", value)}
                  >
                    <SelectTrigger id="billingCycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ETB)</Label>
                  <Input id="price" name="price" type="number" value={newSubscription.price} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={newSubscription.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">
                  Payment Method <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newSubscription.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telebirr">TeleBirr</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoRenew">Auto-Renew Subscription</Label>
                <Switch
                  id="autoRenew"
                  checked={newSubscription.autoRenew}
                  onCheckedChange={(checked) => handleSwitchChange("autoRenew", checked)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddSubscriptionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                Add Subscription
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
