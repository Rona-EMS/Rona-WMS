"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Check, X, Building2, Copy, Save, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface CustomPlan {
  id: number
  name: string
  client: string
  price: number
  workers: number
  features: string[]
  status: "active" | "draft" | "archived"
  archivedDate?: string
}

export default function CustomPlansPage() {
  const [activePlan, setActivePlan] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState<CustomPlan | null>(null)

  // Initial plans data
  const [plans, setPlans] = useState<CustomPlan[]>([
    {
      id: 1,
      name: "Enterprise Premium",
      client: "Abyssinia Textiles",
      price: 75000,
      workers: 500,
      features: [
        "Attendance Tracking",
        "Basic Payroll",
        "Worker Management",
        "Shift Scheduling",
        "Emergency Reporting",
        "Multi-location Management",
        "Advanced Analytics",
        "Custom Reporting",
        "Priority Support",
      ],
      status: "active",
    },
    {
      id: 2,
      name: "Enterprise Basic",
      client: "Habesha Garments",
      price: 50000,
      workers: 350,
      features: [
        "Attendance Tracking",
        "Basic Payroll",
        "Worker Management",
        "Shift Scheduling",
        "Emergency Reporting",
        "Multi-location Management",
        "Custom Reporting",
      ],
      status: "active",
    },
    {
      id: 3,
      name: "Premium Plus",
      client: "Ethio Leather",
      price: 65000,
      workers: 400,
      features: [
        "Attendance Tracking",
        "Basic Payroll",
        "Worker Management",
        "Shift Scheduling",
        "Emergency Reporting",
        "Advanced Analytics",
        "Custom Reporting",
        "API Access",
      ],
      status: "active",
    },
    {
      id: 4,
      name: "Custom Basic",
      client: "Dira Dawa Cement Factory",
      archivedDate: "2023-03-10",
      price: 45000,
      workers: 250,
      features: [
        "Attendance Tracking",
        "Basic Payroll",
        "Worker Management",
        "Shift Scheduling",
        "Emergency Reporting",
      ],
      status: "archived",
    },
  ])

  // New plan form state
  const [newPlan, setNewPlan] = useState({
    name: "",
    client: "",
    price: 50000,
    workers: 500,
    yearlyBillingOnly: true,
    enterpriseSupport: false,
    features: {
      // Standard features
      "Attendance Tracking": true,
      "Basic Payroll": true,
      "Worker Management": true,
      "Shift Scheduling": true,
      "Emergency Reporting": true,
      // Advanced features
      "Multi-location Management": false,
      "Advanced Analytics": false,
      "Custom Reporting": false,
      "API Access": false,
      "White Labeling Options": false,
      "Priority Support": false,
      "Dedicated Account Manager": false,
    },
  })

  // Handle new plan input changes
  const handleNewPlanChange = (field: string, value: any) => {
    setNewPlan((prev) => ({ ...prev, [field]: value }))
  }

  // Handle new plan feature toggle
  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setNewPlan((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }))
  }

  // Handle create plan submit
  const handleCreatePlan = () => {
    // Validate form
    if (!newPlan.name || !newPlan.client) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Get selected features
    const selectedFeatures = Object.entries(newPlan.features)
      .filter(([_, isSelected]) => isSelected)
      .map(([feature]) => feature)

    // Create new plan
    const newPlanObj: CustomPlan = {
      id: Math.max(...plans.map((p) => p.id), 0) + 1,
      name: newPlan.name,
      client: newPlan.client,
      price: newPlan.price,
      workers: newPlan.workers,
      features: selectedFeatures,
      status: "draft",
    }

    // Add to plans
    setPlans([...plans, newPlanObj])

    // Reset form
    setNewPlan({
      name: "",
      client: "",
      price: 50000,
      workers: 500,
      yearlyBillingOnly: true,
      enterpriseSupport: false,
      features: {
        "Attendance Tracking": true,
        "Basic Payroll": true,
        "Worker Management": true,
        "Shift Scheduling": true,
        "Emergency Reporting": true,
        "Multi-location Management": false,
        "Advanced Analytics": false,
        "Custom Reporting": false,
        "API Access": false,
        "White Labeling Options": false,
        "Priority Support": false,
        "Dedicated Account Manager": false,
      },
    })

    // Show success message
    toast({
      title: "Plan created",
      description: `${newPlan.name} for ${newPlan.client} has been created as a draft`,
    })

    // Switch to draft tab
    setActiveTab("draft")
    setIsCreateDialogOpen(false)
  }

  // Handle edit plan
  const handleEditPlan = (plan: CustomPlan) => {
    setPlans(plans.map((p) => (p.id === plan.id ? { ...plan, status: "active" } : p)))

    toast({
      title: "Plan updated",
      description: `${plan.name} has been updated and is now active`,
    })
  }

  // Handle duplicate plan
  const handleDuplicatePlan = (plan: CustomPlan) => {
    const duplicatedPlan: CustomPlan = {
      ...plan,
      id: Math.max(...plans.map((p) => p.id), 0) + 1,
      name: `${plan.name} (Copy)`,
      status: "draft",
    }

    setPlans([...plans, duplicatedPlan])

    toast({
      title: "Plan duplicated",
      description: `${plan.name} has been duplicated as ${duplicatedPlan.name}`,
    })

    // Switch to draft tab if duplicating from archived
    if (plan.status === "archived") {
      setActiveTab("draft")
    }
  }

  // Handle restore plan
  const handleRestorePlan = (planId: number) => {
    setPlans(plans.map((p) => (p.id === planId ? { ...p, status: "active" } : p)))

    const plan = plans.find((p) => p.id === planId)

    toast({
      title: "Plan restored",
      description: `${plan?.name} has been restored and is now active`,
    })

    // Switch to active tab
    setActiveTab("active")
  }

  // Handle archive plan
  const handleArchivePlan = (planId: number) => {
    const today = new Date().toISOString().split("T")[0]

    setPlans(plans.map((p) => (p.id === planId ? { ...p, status: "archived", archivedDate: today } : p)))

    const plan = plans.find((p) => p.id === planId)

    toast({
      title: "Plan archived",
      description: `${plan?.name} has been archived`,
    })
  }

  // Handle delete confirmation
  const confirmDeletePlan = (plan: CustomPlan) => {
    setPlanToDelete(plan)
    setDeleteConfirmOpen(true)
  }

  // Handle delete plan
  const handleDeletePlan = () => {
    if (!planToDelete) return

    setPlans(plans.filter((p) => p.id !== planToDelete.id))

    toast({
      title: "Plan deleted",
      description: `${planToDelete.name} has been permanently deleted`,
      variant: "destructive",
    })

    setDeleteConfirmOpen(false)
    setPlanToDelete(null)
  }

  // Feature lists
  const standardFeatures = [
    "Attendance Tracking",
    "Basic Payroll",
    "Worker Management",
    "Shift Scheduling",
    "Emergency Reporting",
  ]

  const advancedFeatures = [
    "Multi-location Management",
    "Advanced Analytics",
    "Custom Reporting",
    "API Access",
    "White Labeling Options",
    "Priority Support",
    "Dedicated Account Manager",
  ]

  return (
    <DashboardShell
      title="Custom Subscription Plans"
      description="Create and manage tailored subscription plans for enterprise clients"
      headerAction={
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      }
    >
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 text-purple-600">
          <TabsTrigger value="active" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Active Plans
          </TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Draft Plans
          </TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Archived Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Active Custom Plans</CardTitle>
              <CardDescription>Custom subscription plans that are currently active for factories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {plans.filter((plan) => plan.status === "active").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No active plans found</div>
              ) : (
                plans
                  .filter((plan) => plan.status === "active")
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-4 rounded-lg border ${activePlan === plan.id ? "bg-purple-50 border-purple-200" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-purple-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{plan.name}</h3>
                            <p className="text-sm text-gray-500">For {plan.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-purple-600"
                            onClick={() => confirmDeletePlan(plan)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-purple-600"
                            onClick={() => handleArchivePlan(plan.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-purple-600"
                            onClick={() => handleDuplicatePlan(plan)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-purple-600"
                            onClick={() => setActivePlan(activePlan === plan.id ? null : plan.id)}
                          >
                            {activePlan === plan.id ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {activePlan === plan.id && (
                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500">Price (ETB)</p>
                              <p className="text-sm font-medium text-gray-900">{plan.price.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500">Worker Capacity</p>
                              <p className="text-sm font-medium text-gray-900">{plan.workers}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-gray-500">Features</p>
                              <p className="text-sm font-medium text-gray-900">{plan.features.length}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs text-gray-500">Included Features:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Check className="h-3 w-3 text-green-500" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Draft Plans</CardTitle>
              <CardDescription>Plans in progress - not yet assigned to any factory</CardDescription>
            </CardHeader>
            <CardContent>
              {plans.filter((plan) => plan.status === "draft").length === 0 ? (
                <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-gray-500 mb-2">No draft plans</h3>
                  <p className="text-sm text-gray-400 mb-4">Create a new custom plan to get started</p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Plan
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {plans
                    .filter((plan) => plan.status === "draft")
                    .map((plan) => (
                      <div key={plan.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-purple-600" />
                            <div>
                              <h3 className="font-medium text-gray-900">{plan.name}</h3>
                              <p className="text-sm text-gray-500">For {plan.client}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-purple-600"
                              onClick={() => handleEditPlan(plan)}
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Activate
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-purple-600"
                              onClick={() => confirmDeletePlan(plan)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Archived Plans</CardTitle>
              <CardDescription>Plans that are no longer in use</CardDescription>
            </CardHeader>
            <CardContent>
              {plans.filter((plan) => plan.status === "archived").length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No archived plans found</div>
              ) : (
                <div className="space-y-4">
                  {plans
                    .filter((plan) => plan.status === "archived")
                    .map((plan) => (
                      <div key={plan.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{plan.name}</h3>
                            <p className="text-sm text-gray-500">Previously for {plan.client}</p>
                            <p className="text-xs text-gray-400 mt-1">Archived on {plan.archivedDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-purple-600"
                              onClick={() => handleDuplicatePlan(plan)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-purple-600"
                              onClick={() => handleRestorePlan(plan.id)}
                            >
                              Restore
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create New Plan Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Create New Custom Plan</DialogTitle>
            <DialogDescription>Design a tailored subscription plan for enterprise clients</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  placeholder="e.g., Enterprise Premium"
                  value={newPlan.name}
                  onChange={(e) => handleNewPlanChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  placeholder="e.g., Acme Corp"
                  value={newPlan.client}
                  onChange={(e) => handleNewPlanChange("client", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (ETB)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="50000"
                  value={newPlan.price}
                  onChange={(e) => handleNewPlanChange("price", Number.parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="worker-capacity">Worker Capacity</Label>
                <Input
                  id="worker-capacity"
                  type="number"
                  placeholder="500"
                  value={newPlan.workers}
                  onChange={(e) => handleNewPlanChange("workers", Number.parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="billing-yearly">Yearly Billing Only</Label>
                <Switch
                  id="billing-yearly"
                  checked={newPlan.yearlyBillingOnly}
                  onCheckedChange={(checked) => handleNewPlanChange("yearlyBillingOnly", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="enterprise-support">Enterprise Support</Label>
                <Switch
                  id="enterprise-support"
                  checked={newPlan.enterpriseSupport}
                  onCheckedChange={(checked) => handleNewPlanChange("enterpriseSupport", checked)}
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <p className="font-medium text-gray-900">Included Features</p>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Standard Features (Always Included)</p>
                <div className="space-y-2">
                  {standardFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox id={`feature-${i}`} defaultChecked disabled />
                      <Label htmlFor={`feature-${i}`} className="text-gray-500">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Advanced Features</p>
                <div className="space-y-2">
                  {advancedFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Checkbox
                        id={`adv-feature-${i}`}
                        checked={newPlan.features[feature]}
                        onCheckedChange={(checked) => handleFeatureToggle(feature, !!checked)}
                      />
                      <Label htmlFor={`adv-feature-${i}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleCreatePlan}>
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this plan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {planToDelete && (
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                You are about to delete <span className="font-medium text-foreground">{planToDelete.name}</span> for{" "}
                <span className="font-medium text-foreground">{planToDelete.client}</span>.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePlan}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
