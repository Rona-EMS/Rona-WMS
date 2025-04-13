"use client"

import React from "react"

import { useState, useEffect } from "react"
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
import { MoreHorizontal, Search, Filter, Edit, Trash2, Mail, RefreshCw, Eye, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { Factory } from "@/lib/types"

interface FactoryManagementProps {
  factories: Factory[]
  filterType: string
}

export function FactoryManagement({ factories, filterType }: FactoryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState<string | null>(null)
  const [locationFilter, setLocationFilter] = useState<string | null>(null)
  const [filteredFactories, setFilteredFactories] = useState<Factory[]>(factories)
  const [viewFactory, setViewFactory] = useState<Factory | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [currentFactory, setCurrentFactory] = useState<Factory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isExporting, setIsExporting] = useState(false)
  const itemsPerPage = 5
  const { toast } = useToast()

  // Get unique industries and locations for filters
  const uniqueIndustries = [...new Set(factories.map((factory) => factory.industry))]
  const uniqueLocations = [...new Set(factories.map((factory) => factory.location))]

  // Apply filters whenever search term or filters change
  useEffect(() => {
    const filtered = factories.filter((factory) => {
      const matchesSearch =
        factory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        factory.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        factory.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesIndustry = !industryFilter || factory.industry === industryFilter
      const matchesLocation = !locationFilter || factory.location === locationFilter

      return matchesSearch && matchesIndustry && matchesLocation
    })

    setFilteredFactories(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [factories, searchTerm, industryFilter, locationFilter])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setIndustryFilter(null)
    setLocationFilter(null)
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
    })
  }

  // Handle export button click
  const handleExport = () => {
    setIsExporting(true)

    // Simulate export delay with reduced timeout
    setTimeout(() => {
      setIsExporting(false)
      toast({
        title: "Export complete",
        description: `Exported ${filteredFactories.length} factories to CSV`,
      })
    }, 800) // Reduced from 1500ms for better responsiveness
  }

  // Handle factory view
  const handleViewFactory = (factory: Factory) => {
    setViewFactory(factory)
    setIsViewDialogOpen(true)
  }

  // Handle factory edit
  const handleEditFactory = (factory: Factory) => {
    setCurrentFactory(factory)
    setIsEditDialogOpen(true)
  }

  // Handle factory contact
  const handleContactFactory = (factory: Factory) => {
    setCurrentFactory(factory)
    setIsEmailDialogOpen(true)
  }

  // Handle factory delete
  const handleDeleteFactory = (factory: Factory) => {
    setCurrentFactory(factory)
    setIsDeleteDialogOpen(true)
  }

  // Submit contact form
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailDialogOpen(false)
    toast({
      title: "Email sent",
      description: `Email has been sent to ${currentFactory?.contactPerson} at ${currentFactory?.contactEmail}`,
    })
  }

  // Submit edit form
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    toast({
      title: "Factory updated",
      description: `${currentFactory?.name} has been updated successfully`,
    })
  }

  // Confirm delete
  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Factory deleted",
      description: `${currentFactory?.name} has been deleted successfully`,
      variant: "destructive",
    })
  }

  // Pagination
  const totalPages = Math.ceil(filteredFactories.length / itemsPerPage)
  const paginatedFactories = React.useMemo(() => {
    return filteredFactories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }, [filteredFactories, currentPage, itemsPerPage])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search factories..."
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
                Industry
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Industry</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueIndustries.map((industry) => (
                <DropdownMenuItem
                  key={industry}
                  onClick={() => setIndustryFilter(industry)}
                  className={industryFilter === industry ? "bg-purple-50" : ""}
                >
                  {industry}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Location
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueLocations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => setLocationFilter(location)}
                  className={locationFilter === location ? "bg-purple-50" : ""}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchTerm || industryFilter || locationFilter) && (
            <Button variant="ghost" onClick={resetFilters}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}

          <Button variant="outline" onClick={handleExport} disabled={isExporting}>
            <Download className="h-4 w-4 mr-1" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factory Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Workers</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFactories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No factories found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              paginatedFactories.map((factory) => (
                <TableRow key={factory.id}>
                  <TableCell className="font-medium">{factory.name}</TableCell>
                  <TableCell>{factory.location}</TableCell>
                  <TableCell>{factory.industry}</TableCell>
                  <TableCell>
                    {factory.activeWorkers}/{factory.totalWorkers}
                  </TableCell>
                  <TableCell>
                    <div>{factory.contactPerson}</div>
                    <div className="text-xs text-muted-foreground">{factory.contactEmail}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={factory.subscriptionStatus} />
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
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewFactory(factory)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditFactory(factory)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Factory
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleContactFactory(factory)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Factory
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDeleteFactory(factory)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Factory
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
          Showing{" "}
          <strong>
            {Math.min(filteredFactories.length, (currentPage - 1) * itemsPerPage + 1)}-
            {Math.min(currentPage * itemsPerPage, filteredFactories.length)}
          </strong>{" "}
          of <strong>{filteredFactories.length}</strong> factories
        </div>
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className={currentPage === i + 1 ? "bg-purple-50" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            {totalPages > 3 && <span>...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* View Factory Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Factory Details</DialogTitle>
          </DialogHeader>
          {viewFactory && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Factory Name</h3>
                  <p className="text-base">{viewFactory.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                  <p className="text-base">{viewFactory.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="text-base">{viewFactory.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Workers</h3>
                  <p className="text-base">{viewFactory.totalWorkers}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Active Workers</h3>
                  <p className="text-base">{viewFactory.activeWorkers}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Subscription Status</h3>
                  <StatusBadge status={viewFactory.subscriptionStatus} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p className="text-base">{viewFactory.contactPerson}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Email</h3>
                  <p className="text-base">{viewFactory.contactEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Phone</h3>
                  <p className="text-base">{viewFactory.contactPhone || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                  <p className="text-base">{viewFactory.registrationDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Subscription End Date</h3>
                  <p className="text-base">{viewFactory.subscriptionEndDate || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Subscription Plan</h3>
                  <p className="text-base capitalize">{viewFactory.subscriptionPlan}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={() => handleContactFactory(viewFactory)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Factory
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEditFactory(viewFactory)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Factory
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Factory Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {currentFactory && (
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Factory</DialogTitle>
                <DialogDescription>Update the factory information below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Factory Name</Label>
                    <Input id="edit-name" defaultValue={currentFactory.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input id="edit-location" defaultValue={currentFactory.location} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-industry">Industry</Label>
                  <Select defaultValue={currentFactory.industry}>
                    <SelectTrigger id="edit-industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueIndustries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-contact-person">Contact Person</Label>
                    <Input id="edit-contact-person" defaultValue={currentFactory.contactPerson} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-contact-email">Contact Email</Label>
                    <Input id="edit-contact-email" defaultValue={currentFactory.contactEmail} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-contact-phone">Contact Phone</Label>
                  <Input id="edit-contact-phone" defaultValue={currentFactory.contactPhone || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Subscription Status</Label>
                  <Select defaultValue={currentFactory.subscriptionStatus}>
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Factory Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {currentFactory && (
            <form onSubmit={handleSendEmail}>
              <DialogHeader>
                <DialogTitle>Contact Factory</DialogTitle>
                <DialogDescription>
                  Send an email to {currentFactory.contactPerson} at {currentFactory.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Input id="email-subject" placeholder="Enter email subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-message">Message</Label>
                  <textarea
                    id="email-message"
                    className="w-full min-h-[150px] p-3 rounded-md border border-input bg-transparent text-sm"
                    placeholder="Enter your message here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Email</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Factory Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Factory</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this factory? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentFactory && (
              <p className="text-sm text-muted-foreground">
                You are about to delete <span className="font-medium text-foreground">{currentFactory.name}</span>. All
                data associated with this factory will be permanently removed.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
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
