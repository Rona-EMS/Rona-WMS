"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for custom plans
const initialCustomPlans = [
  {
    id: 1,
    name: "Enterprise Plus",
    factory: "Acme Manufacturing",
    price: 1299,
    billingCycle: "monthly",
    status: "active",
    features: [
      "Unlimited Workers",
      "Advanced Analytics",
      "Multi-Location Support",
      "Priority Support",
      "Custom Branding",
      "API Access",
      "Dedicated Account Manager",
      "Custom Integrations",
    ],
  },
  {
    id: 2,
    name: "Manufacturing Pro",
    factory: "Global Industries",
    price: 899,
    billingCycle: "monthly",
    status: "active",
    features: [
      "Up to 500 Workers",
      "Advanced Analytics",
      "Multi-Location Support",
      "Priority Support",
      "Custom Branding",
      "API Access",
    ],
  },
  {
    id: 3,
    name: "Seasonal Package",
    factory: "Harvest Farms",
    price: 599,
    billingCycle: "monthly",
    status: "active",
    features: [
      "Up to 200 Workers",
      "Basic Analytics",
      "Multi-Location Support",
      "Standard Support",
      "Seasonal Worker Management",
    ],
  },
]

// Available features for custom plans
const availableFeatures = [
  { id: "unlimited-workers", label: "Unlimited Workers" },
  { id: "advanced-analytics", label: "Advanced Analytics" },
  { id: "multi-location", label: "Multi-Location Support" },
  { id: "priority-support", label: "Priority Support" },
  { id: "custom-branding", label: "Custom Branding" },
  { id: "api-access", label: "API Access" },
  { id: "account-manager", label: "Dedicated Account Manager" },
  { id: "custom-integrations", label: "Custom Integrations" },
  { id: "seasonal-management", label: "Seasonal Worker Management" },
  { id: "advanced-reporting", label: "Advanced Reporting" },
  { id: "payroll-automation", label: "Payroll Automation" },
  { id: "compliance-tools", label: "Compliance Tools" },
]

// Mock factory data for dropdown
const factories = [
  { id: 1, name: "Acme Manufacturing" },
  { id: 2, name: "Global Industries" },
  { id: 3, name: "Harvest Farms" },
  { id: 4, name: "Tech Assembly" },
  { id: 5, name: "Precision Parts" },
  { id: 6, name: "Food Processing Inc." },
]

export function CustomPlansManagement() {
  const [customPlans, setCustomPlans] = useState(initialCustomPlans)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [newPlan, setNewPlan] = useState({
    name: '',
    factory: '',
    price: 0,
    billingCycle: 'monthly',
    features: [] as string[]
  })
  
  // Function to handle creating a new custom plan
  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.factory || newPlan.price <= 0 || newPlan.features.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and select at least one feature.",
        variant: "destructive"
      })
      return
    }
    
    const createdPlan = {
      id: customPlans.length + 1,
      ...newPlan,
      status: 'active'
    }
    
    setCustomPlans([...customPlans, createdPlan])
    setNewPlan({
      name: '',
      factory: '',
      price: 0,
      billingCycle: 'monthly',
      features: []
    })
    setIsCreateDialogOpen(false)
    
    toast({
      title: "Plan Created",
      description: `Custom plan "${createdPlan.name}" has been created successfully.`
    })
  }
  
  // Function to handle editing an existing custom plan
  const handleEditPlan = () => {
    if (!currentPlan) return
    
    const updatedPlans = customPlans.map(plan => 
      plan.id === currentPlan.id ? currentPlan : plan
    )
    
    setCustomPlans(updatedPlans)
    setIsEditDialogOpen(false)
    
    toast({
      title: "Plan Updated",
      description: `Custom plan "${currentPlan.name}" has been updated successfully.`
    })
  }
  
  // Function to handle deleting a custom plan
  const handleDeletePlan = () => {
    if (!currentPlan) return
    
    const updatedPlans = customPlans.filter(plan => plan.id !== currentPlan.id)
    setCustomPlans(updatedPlans)
    setIsDeleteDialogOpen(false)
    
    toast({
      title: "Plan Deleted",
      description: `Custom plan "${currentPlan.name}" has been deleted successfully.`
    })
  }
  
  // Function to toggle a feature in the new plan
  const toggleFeature = (feature: string) => {
    if (isCreateDialogOpen) {
      setNewPlan(prev => {
        const features = prev.features.includes(feature)
          ? prev.features.filter(f => f !== feature)
          : [...prev.features, feature]
        return { ...prev, features }
      })
    } else if (isEditDialogOpen && currentPlan) {
      setCurrentPlan(prev => {
        const features = prev.features.includes(feature)
          ? prev.features.filter(f => f !== feature)
          : [...prev.features, feature]
        return { ...prev, features }
      })
    }
  }
  
  // Function to handle toggling plan status
  const togglePlanStatus = (planId: number) => {
    const updatedPlans = customPlans.map(plan => {
      if (plan.id === planId) {
        const newStatus = plan.status === 'active' ? 'inactive' : 'active'
        return { ...plan, status: newStatus }
      }
      return plan
    })
    
    setCustomPlans(updatedPlans)
    
    const plan = updatedPlans.find(p => p.id === planId)
    toast({
      title: `Plan ${plan?.status === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `Custom plan "${plan?.name}" has been ${plan?.status === 'active' ? 'activated' : 'deactivated'}.`
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Custom Subscription Plans</h1>
          <p className="text-muted-foreground">
            Manage custom subscription plans for specific factories
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Custom Subscription Plan</DialogTitle>
              <DialogDescription>
                Create a tailored subscription plan for a specific factory with custom pricing and features.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plan-name">Plan Name</Label>
                  <Input
                    id="plan-name"
                    placeholder="Enterprise Plus"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="factory">Factory</Label>
                  <Select 
                    value={newPlan.factory} 
                    onValueChange={(value) => setNewPlan({ ...newPlan, factory: value })}
                  >
                    <SelectTrigger id="factory">
                      <SelectValue placeholder="Select factory" />
                    </SelectTrigger>
                    <SelectContent>
                      {factories.map((factory) => (
                        <SelectItem key={factory.id} value={factory.name}>
                          {factory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="999"
                    value={newPlan.price || ''}
                    onChange={(e) => setNewPlan({ ...newPlan, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <Select 
                    value={newPlan.billingCycle} 
                    onValueChange={(value) => setNewPlan({ ...newPlan, billingCycle: value })}
                  >
                    <SelectTrigger id="billing-cycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Included Features</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-4">
                  {availableFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`feature-${feature.id}`}
                        checked={newPlan.features.includes(feature.label)}
                        onCheckedChange={() => toggleFeature(feature.label)}
                      />
                      <Label 
                        htmlFor={`feature-${feature.i
