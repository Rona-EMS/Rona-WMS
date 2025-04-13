"use client"

import React from "react"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FactoryOverview } from "@/components/saas-admin/factories/factory-overview"
import { FactoryManagement } from "@/components/saas-admin/factories/factory-management"
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
import { useToast } from "@/components/ui/use-toast"

export default function FactoriesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isAddFactoryDialogOpen, setIsAddFactoryDialogOpen] = useState(false)
  const [timeframe, setTimeframe] = useState("monthly")
  const [factories, setFactories] = useState(enhancedFactories)
  const { toast } = useToast()

  // Form state for new factory
  const [newFactory, setNewFactory] = useState({
    name: "",
    location: "",
    industry: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Optimize the handleInputChange function with useCallback
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFactory((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Optimize the handleSelectChange function with useCallback
  const handleSelectChange = React.useCallback((field: string, value: string) => {
    setNewFactory((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Optimize the handleSubmit function with useCallback
  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Validate form
      if (
        !newFactory.name ||
        !newFactory.location ||
        !newFactory.industry ||
        !newFactory.contactPerson ||
        !newFactory.contactEmail
      ) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // Create new factory object with a more efficient ID generation
      const newFactoryObj = {
        id: `FAC-${Date.now().toString(36)}`,
        name: newFactory.name,
        location: newFactory.location,
        industry: newFactory.industry,
        totalWorkers: 0,
        activeWorkers: 0,
        subscriptionStatus: "pending",
        subscriptionEndDate: "",
        contactPerson: newFactory.contactPerson,
        contactEmail: newFactory.contactEmail,
        contactPhone: newFactory.contactPhone,
        registrationDate: new Date().toISOString().split("T")[0],
        lastLoginDate: null,
        verificationStatus: "pending",
        operationalStatus: "pre-operational",
        averageAttendance: 0,
        monthlyRevenue: 0,
        subscriptionPlan: "basic",
      }

      // Add to factories with optimized state update
      setFactories((prev) => [newFactoryObj, ...prev])

      // Close dialog and reset form
      setIsAddFactoryDialogOpen(false)
      setNewFactory({
        name: "",
        location: "",
        industry: "",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
      })

      toast({
        title: "Factory added",
        description: `${newFactory.name} has been added successfully`,
      })
    },
    [newFactory, toast],
  )

  return (
    <DashboardShell
      title="Factory Management"
      description="Manage registered factories and their subscriptions"
      headerAction={
        <Button
          variant="default"
          className="px-4 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => setIsAddFactoryDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Factory
        </Button>
      }
    >
      <div className="space-y-6">
        <FactoryOverview factories={factories} timeframe={timeframe} onTimeframeChange={setTimeframe} />

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 text-purple-600">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              All Factories
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
            <FactoryManagement factories={factories} filterType="all" />
          </TabsContent>
          <TabsContent value="active">
            <FactoryManagement
              factories={factories.filter((f) => f.subscriptionStatus === "active")}
              filterType="active"
            />
          </TabsContent>
          <TabsContent value="trial">
            <FactoryManagement
              factories={factories.filter((f) => f.subscriptionStatus === "trial")}
              filterType="trial"
            />
          </TabsContent>
          <TabsContent value="pending">
            <FactoryManagement
              factories={factories.filter((f) => f.subscriptionStatus === "pending")}
              filterType="pending"
            />
          </TabsContent>
          <TabsContent value="expired">
            <FactoryManagement
              factories={factories.filter(
                (f) => f.subscriptionStatus === "expired" || f.subscriptionStatus === "suspended",
              )}
              filterType="expired"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Factory Dialog */}
      <Dialog open={isAddFactoryDialogOpen} onOpenChange={setIsAddFactoryDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Factory</DialogTitle>
              <DialogDescription>
                Add a new factory to the platform. They will be able to use the system after verification.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Factory Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter factory name"
                    value={newFactory.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City/Region"
                    value={newFactory.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Select value={newFactory.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Textile">Textile</SelectItem>
                    <SelectItem value="Garment">Garment</SelectItem>
                    <SelectItem value="Leather">Leather</SelectItem>
                    <SelectItem value="Food Processing">Food Processing</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">
                    Contact Person <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Full name"
                    value={newFactory.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">
                    Contact Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Email address"
                    value={newFactory.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="Phone number"
                  value={newFactory.contactPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddFactoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                Add Factory
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
