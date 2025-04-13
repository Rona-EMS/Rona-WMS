"use client"

import { useState } from "react"
import { Clock, Clock3, CalendarDays, Briefcase } from "lucide-react"

// Mock data for requests
const requestsData = [
  {
    id: "1",
    employeeName: "John Doe",
    department: "Production",
    type: "Leave Request",
    dateSubmitted: "2023-04-10",
    startDate: "2023-04-20",
    endDate: "2023-04-22",
    status: "Pending",
    priority: "Medium",
    reason: "Family vacation",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    department: "Packaging",
    type: "Shift Swap",
    dateSubmitted: "2023-04-11",
    startDate: "2023-04-18",
    endDate: "2023-04-18",
    status: "Approved",
    priority: "High",
    reason: "Doctor appointment",
  },
  {
    id: "3",
    employeeName: "Robert Johnson",
    department: "Logistics",
    type: "Overtime Request",
    dateSubmitted: "2023-04-12",
    startDate: "2023-04-15",
    endDate: "2023-04-15",
    status: "Rejected",
    priority: "Low",
    reason: "Complete inventory count",
  },
  {
    id: "4",
    employeeName: "Emily Davis",
    department: "Quality Control",
    type: "Leave Request",
    dateSubmitted: "2023-04-13",
    startDate: "2023-04-25",
    endDate: "2023-04-28",
    status: "Pending",
    priority: "Medium",
    reason: "Personal matter",
  },
  {
    id: "5",
    employeeName: "Michael Wilson",
    department: "Production",
    type: "Equipment Request",
    dateSubmitted: "2023-04-14",
    startDate: "2023-04-17",
    endDate: "2023-04-17",
    status: "Approved",
    priority: "High",
    reason: "Broken safety equipment",
  },
  {
    id: "6",
    employeeName: "Sarah Brown",
    department: "Packaging",
    type: "Shift Swap",
    dateSubmitted: "2023-04-14",
    startDate: "2023-04-19",
    endDate: "2023-04-19",
    status: "Pending",
    priority: "Medium",
    reason: "Family emergency",
  },
  {
    id: "7",
    employeeName: "David Miller",
    department: "Logistics",
    type: "Leave Request",
    dateSubmitted: "2023-04-15",
    startDate: "2023-04-30",
    endDate: "2023-05-05",
    status: "Pending",
    priority: "Low",
    reason: "Wedding attendance",
  },
]

// Mock data for tasks
const tasksData = [
  {
    id: "1",
    title: "Review production reports",
    assignedTo: "Admin",
    dueDate: "2023-04-16",
    status: "In Progress",
    priority: "High",
    description: "Review and approve weekly production reports from all departments",
  },
  {
    id: "2",
    title: "Update employee handbook",
    assignedTo: "Admin",
    dueDate: "2023-04-20",
    status: "Not Started",
    priority: "Medium",
    description: "Update the employee handbook with new safety procedures",
  },
  {
    id: "3",
    title: "Prepare monthly payroll",
    assignedTo: "Admin",
    dueDate: "2023-04-30",
    status: "Not Started",
    priority: "High",
    description: "Prepare and verify monthly payroll for all employees",
  },
  {
    id: "4",
    title: "Conduct safety inspection",
    assignedTo: "Admin",
    dueDate: "2023-04-18",
    status: "Completed",
    priority: "High",
    description: "Conduct quarterly safety inspection of all facilities",
  },
  {
    id: "5",
    title: "Order new supplies",
    assignedTo: "Admin",
    dueDate: "2023-04-17",
    status: "In Progress",
    priority: "Medium",
    description: "Order new office supplies and safety equipment",
  },
]

export function RequestsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter requests data based on search term and status filter
  const filteredRequests = requestsData.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter tasks data based on search term
  const filteredTasks = tasksData.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Columns for the requests table
  const requestColumns = [
    {
      accessorKey: "employeeName",
      header: "Employee",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "type",
      header: "Request Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        const icon =
          type === "Leave Request" ? (
            <CalendarDays className="h-4 w-4 mr-1" />
          ) : type === "Shift Swap" ? (
            <Clock3 className="h-4 w-4 mr-1" />
          ) : type === "Overtime Request" ? (
            <Clock className="h-4 w-4 mr-1" />
          ) : (
            <Briefcase className="h-4 w-4 mr-1" />
          )

        return (
          <div className="flex items-center">
            {icon}
            <span>{type}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "dateSubmitted",
      header: "Date Submitted",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
  ]

  // Columns for the tasks table
  const taskColumns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Requests & Tasks Management</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search requests or tasks..."
          className="p-2 border rounded w-full md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded w-full md:w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Requests</h2>
        {filteredRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {requestColumns.map((column) => (
                    <th key={column.accessorKey} className="py-2 px-4 border-b">
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-100">
                    {requestColumns.map((column) => (
                      <td key={column.accessorKey} className="py-2 px-4 border-b">
                        {column.cell
                          ? column.cell({ row: { getValue: (key) => request[key] } })
                          : request[column.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No requests found.</p>
        )}
      </div>

      {/* Tasks Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        {filteredTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {taskColumns.map((column) => (
                    <th key={column.accessorKey} className="py-2 px-4 border-b">
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-100">
                    {taskColumns.map((column) => (
                      <td key={column.accessorKey} className="py-2 px-4 border-b">
                        {task[column.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  )
}
