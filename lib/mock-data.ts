"use client"

import type { Shift, AttendanceRecord, Request, PayrollRecord, Announcement, User, Subscription } from "./types"
import { useState } from "react"

// Define types for our mock data
export interface Worker {
  id: string
  name: string
  department: string
  position: string
  shift?: string
  phoneNumber?: string
  email?: string
  nfcCardId?: string
  status?: string
  joinDate?: string
  photo?: string
}

export interface Factory {
  id: string
  name: string
  location: string
  industry?: string
  totalWorkers?: number
  activeWorkers?: number
  subscriptionStatus?: string
  subscriptionEndDate?: string
  workers?: number
  branding?: {
    logo?: string
    primaryColor?: string
    secondaryColor?: string
  }
}

// Mock Workers
const mockWorkers: Worker[] = [
  {
    id: "W1001",
    name: "Abebe Kebede",
    department: "Production",
    position: "Machine Operator",
    shift: "Morning",
    photo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "W1002",
    name: "Tigist Haile",
    department: "Quality Control",
    position: "Inspector",
    shift: "Morning",
    photo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "W1003",
    name: "Dawit Mengistu",
    department: "Packaging",
    position: "Team Lead",
    shift: "Afternoon",
    photo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "W1004",
    name: "Hanna Tadesse",
    department: "Maintenance",
    position: "Technician",
    shift: "Night",
    photo: "/placeholder.svg?height=100&width=100",
  },
]

export const workers: Worker[] = [
  {
    id: "ETH-W-1001",
    name: "Abebe Kebede",
    department: "Textile",
    position: "Machine Operator",
    phoneNumber: "+251911234567",
    email: "abebe.k@example.com",
    nfcCardId: "NFC-1001",
    status: "active",
    joinDate: "2023-05-15",
  },
  {
    id: "ETH-W-1002",
    name: "Tigist Haile",
    department: "Garment",
    position: "Tailor",
    phoneNumber: "+251922345678",
    email: "tigist.h@example.com",
    nfcCardId: "NFC-1002",
    status: "active",
    joinDate: "2023-06-20",
  },
  {
    id: "ETH-W-1003",
    name: "Dawit Mengistu",
    department: "Packaging",
    position: "Supervisor",
    phoneNumber: "+251933456789",
    email: "dawit.m@example.com",
    nfcCardId: "NFC-1003",
    status: "active",
    joinDate: "2022-11-10",
  },
  {
    id: "ETH-W-1004",
    name: "Hanna Tadesse",
    department: "Quality Control",
    position: "Inspector",
    phoneNumber: "+251944567890",
    email: "hanna.t@example.com",
    nfcCardId: "NFC-1004",
    status: "on-leave",
    joinDate: "2023-02-05",
  },
  {
    id: "ETH-W-1005",
    name: "Solomon Girma",
    department: "Maintenance",
    position: "Technician",
    phoneNumber: "+251955678901",
    email: "solomon.g@example.com",
    nfcCardId: "NFC-1005",
    status: "active",
    joinDate: "2022-08-15",
  },
]

// Mock Shifts
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const dayAfterTomorrow = new Date(today)
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

export const shifts: Shift[] = [
  {
    id: "SHF-1001",
    workerId: "ETH-W-1001",
    date: today.toISOString().split("T")[0],
    type: "morning",
    startTime: "06:00",
    endTime: "14:00",
    status: "scheduled",
  },
  {
    id: "SHF-1002",
    workerId: "ETH-W-1002",
    date: today.toISOString().split("T")[0],
    type: "afternoon",
    startTime: "14:00",
    endTime: "22:00",
    status: "scheduled",
  },
  {
    id: "SHF-1003",
    workerId: "ETH-W-1003",
    date: today.toISOString().split("T")[0],
    type: "night",
    startTime: "22:00",
    endTime: "06:00",
    status: "scheduled",
  },
  {
    id: "SHF-1004",
    workerId: "ETH-W-1001",
    date: tomorrow.toISOString().split("T")[0],
    type: "morning",
    startTime: "06:00",
    endTime: "14:00",
    status: "scheduled",
  },
  {
    id: "SHF-1005",
    workerId: "ETH-W-1001",
    date: dayAfterTomorrow.toISOString().split("T")[0],
    type: "afternoon",
    startTime: "14:00",
    endTime: "22:00",
    status: "scheduled",
  },
]

// Mock Attendance Records
export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT-1001",
    workerId: "ETH-W-1001",
    date: "2025-03-27",
    checkInTime: "05:55",
    checkOutTime: "14:05",
    status: "present",
    location: {
      latitude: 9.0222,
      longitude: 38.7468,
    },
  },
  {
    id: "ATT-1002",
    workerId: "ETH-W-1002",
    date: "2025-03-27",
    checkInTime: "14:10",
    checkOutTime: "22:03",
    status: "late",
    location: {
      latitude: 9.0222,
      longitude: 38.7468,
    },
  },
  {
    id: "ATT-1003",
    workerId: "ETH-W-1003",
    date: "2025-03-27",
    checkInTime: "21:55",
    checkOutTime: "06:02",
    status: "present",
    location: {
      latitude: 9.0222,
      longitude: 38.7468,
    },
  },
  {
    id: "ATT-1004",
    workerId: "ETH-W-1005",
    date: "2025-03-27",
    checkInTime: null,
    checkOutTime: null,
    status: "absent",
  },
  {
    id: "ATT-1005",
    workerId: "ETH-W-1001",
    date: today.toISOString().split("T")[0],
    checkInTime: "05:58",
    checkOutTime: null,
    status: "present",
    location: {
      latitude: 9.0222,
      longitude: 38.7468,
    },
  },
]

// Mock Requests
export const requests: Request[] = [
  {
    id: "REQ-1001",
    workerId: "ETH-W-1004",
    type: "leave",
    status: "approved",
    createdAt: "2025-03-20T10:30:00Z",
    description: "Family emergency, need to travel to Bahir Dar",
    startDate: "2025-03-25",
    endDate: "2025-04-05",
  },
  {
    id: "REQ-1002",
    workerId: "ETH-W-1002",
    type: "shift-swap",
    status: "pending",
    createdAt: "2025-03-27T14:15:00Z",
    description: "Doctor appointment, need afternoon off",
    shiftId: "SHF-1002",
    targetShiftId: "SHF-1005",
  },
  {
    id: "REQ-1003",
    workerId: "ETH-W-1003",
    type: "emergency",
    status: "pending",
    createdAt: "2025-03-28T08:45:00Z",
    description: "Machine malfunction in Packaging Department, needs immediate attention",
  },
  {
    id: "REQ-1004",
    workerId: "ETH-W-1001",
    type: "leave",
    status: "pending",
    createdAt: "2025-03-28T09:20:00Z",
    description: "Wedding ceremony, need 3 days off",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
  },
  {
    id: "REQ-1005",
    workerId: "ETH-W-1005",
    type: "shift-swap",
    status: "rejected",
    createdAt: "2025-03-26T16:30:00Z",
    description: "Personal reasons",
    shiftId: "SHF-1003",
  },
]

// Mock Payroll Records
export const payrollRecords: PayrollRecord[] = [
  {
    id: "PAY-1001",
    workerId: "ETH-W-1001",
    period: "March 2025",
    basicSalary: 4000,
    overtime: 500,
    deductions: 200,
    bonus: 200,
    totalAmount: 4500,
    status: "pending",
    paymentDate: null,
  },
  {
    id: "PAY-1002",
    workerId: "ETH-W-1002",
    period: "March 2025",
    basicSalary: 3800,
    overtime: 300,
    deductions: 150,
    bonus: 0,
    totalAmount: 3950,
    status: "pending",
    paymentDate: null,
  },
  {
    id: "PAY-1003",
    workerId: "ETH-W-1003",
    period: "March 2025",
    basicSalary: 5500,
    overtime: 0,
    deductions: 250,
    bonus: 500,
    totalAmount: 5750,
    status: "pending",
    paymentDate: null,
  },
  {
    id: "PAY-1004",
    workerId: "ETH-W-1004",
    period: "March 2025",
    basicSalary: 4200,
    overtime: 0,
    deductions: 400, // Deduction for leave
    bonus: 0,
    totalAmount: 3800,
    status: "pending",
    paymentDate: null,
  },
  {
    id: "PAY-1005",
    workerId: "ETH-W-1005",
    period: "March 2025",
    basicSalary: 4500,
    overtime: 700,
    deductions: 200,
    bonus: 300,
    totalAmount: 5300,
    status: "pending",
    paymentDate: null,
  },
  {
    id: "PAY-0901",
    workerId: "ETH-W-1001",
    period: "February 2025",
    basicSalary: 4000,
    overtime: 600,
    deductions: 200,
    bonus: 0,
    totalAmount: 4400,
    status: "paid",
    paymentDate: "2025-02-28",
  },
  {
    id: "PAY-0902",
    workerId: "ETH-W-1002",
    period: "February 2025",
    basicSalary: 3800,
    overtime: 400,
    deductions: 150,
    bonus: 200,
    totalAmount: 4250,
    status: "paid",
    paymentDate: "2025-02-28",
  },
]

// Mock Factories
const mockFactories: Factory[] = [
  {
    id: "123",
    name: "Addis Textile Mills",
    location: "Addis Ababa",
    workers: 120,
    branding: {
      logo: "/rona-logo.png",
      primaryColor: "#6366f1",
      secondaryColor: "#f43f5e",
    },
  },
  {
    id: "456",
    name: "Hawassa Industrial Park",
    location: "Hawassa",
    workers: 250,
    branding: {
      logo: "/rona-logo-dark.png",
      primaryColor: "#10b981",
      secondaryColor: "#0ea5e9",
    },
  },
]

export const factories: Factory[] = [
  {
    id: "FAC-1001",
    name: "Addis Textile Mills",
    location: "Addis Ababa",
    industry: "Textile",
    totalWorkers: 120,
    activeWorkers: 115,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-12-31",
  },
  {
    id: "FAC-1002",
    name: "Hawassa Industrial Garments",
    location: "Hawassa",
    industry: "Garment",
    totalWorkers: 250,
    activeWorkers: 240,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-09-30",
  },
  {
    id: "FAC-1003",
    name: "Mekelle Leather Products",
    location: "Mekelle",
    industry: "Leather",
    totalWorkers: 85,
    activeWorkers: 80,
    subscriptionStatus: "trial",
    subscriptionEndDate: "2025-04-15",
  },
  {
    id: "FAC-1004",
    name: "Bahir Dar Food Processing",
    location: "Bahir Dar",
    industry: "Food Processing",
    totalWorkers: 150,
    activeWorkers: 145,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-08-20",
  },
  {
    id: "FAC-1005",
    name: "Dire Dawa Cement Factory",
    location: "Dire Dawa",
    industry: "Construction",
    totalWorkers: 200,
    activeWorkers: 190,
    subscriptionStatus: "expired",
    subscriptionEndDate: "2025-02-28",
  },
]

// Mock Announcements
export const announcements: Announcement[] = [
  {
    id: "ANN-1001",
    title: "Factory Maintenance",
    content:
      "The south wing will be closed for maintenance on April 2. All workers assigned to that area will be temporarily relocated.",
    createdAt: "2025-03-26T10:00:00Z",
    createdBy: "Admin",
    priority: "medium",
    targetAudience: "all",
  },
  {
    id: "ANN-1002",
    title: "New Safety Protocols",
    content:
      "All workers must attend the safety training session on April 5. This is mandatory for continued employment.",
    createdAt: "2025-03-21T14:30:00Z",
    createdBy: "Owner",
    priority: "high",
    targetAudience: "workers",
  },
  {
    id: "ANN-1003",
    title: "Quarterly Performance Review",
    content: "Department heads are requested to submit Q1 performance reports by April 10.",
    createdAt: "2025-03-28T09:15:00Z",
    createdBy: "Owner",
    priority: "medium",
    targetAudience: "admins",
  },
  {
    id: "ANN-1004",
    title: "Holiday Schedule",
    content: "The factory will be closed on April 17 for Ethiopian Easter. Normal operations will resume on April 18.",
    createdAt: "2025-03-25T11:45:00Z",
    createdBy: "Admin",
    priority: "low",
    targetAudience: "all",
  },
  {
    id: "ANN-1005",
    title: "Bonus Announcement",
    content: "Workers who achieve 100% attendance in April will receive a 500 ETB bonus in their May paycheck.",
    createdAt: "2025-03-29T16:20:00Z",
    createdBy: "Owner",
    priority: "medium",
    targetAudience: "workers",
  },
]

// Mock Users
export const users: User[] = [
  {
    id: "USR-1001",
    name: "Abebe Kebede",
    email: "abebe.k@example.com",
    role: "worker",
    factoryId: "FAC-1001",
    workerId: "ETH-W-1001",
    language: "en",
  },
  {
    id: "USR-1002",
    name: "Tigist Haile",
    email: "tigist.h@example.com",
    role: "worker",
    factoryId: "FAC-1001",
    workerId: "ETH-W-1002",
    language: "am",
  },
  {
    id: "USR-1003",
    name: "Yonas Alemu",
    email: "yonas.a@example.com",
    role: "admin",
    factoryId: "FAC-1001",
    language: "en",
  },
  {
    id: "USR-1004",
    name: "Meron Tadesse",
    email: "meron.t@example.com",
    role: "owner",
    factoryId: "FAC-1001",
    language: "en",
  },
  {
    id: "USR-1005",
    name: "Bereket Solomon",
    email: "bereket.s@rona.com",
    role: "saas-admin",
    language: "en",
  },
]

// Mock Subscriptions
export const subscriptions: Subscription[] = [
  {
    id: "SUB-1001",
    factoryId: "FAC-1001",
    plan: "premium",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    price: 50000,
    paymentMethod: "telebirr",
    autoRenew: true,
  },
  {
    id: "SUB-1002",
    factoryId: "FAC-1002",
    plan: "standard",
    status: "active",
    startDate: "2024-10-01",
    endDate: "2025-09-30",
    price: 35000,
    paymentMethod: "bank-transfer",
    autoRenew: false,
  },
  {
    id: "SUB-1003",
    factoryId: "FAC-1003",
    plan: "basic",
    status: "trial",
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    price: 0,
    paymentMethod: "telebirr",
    autoRenew: false,
  },
  {
    id: "SUB-1004",
    factoryId: "FAC-1004",
    plan: "standard",
    status: "active",
    startDate: "2024-08-20",
    endDate: "2025-08-20",
    price: 35000,
    paymentMethod: "telebirr",
    autoRenew: true,
  },
  {
    id: "SUB-1005",
    factoryId: "FAC-1005",
    plan: "basic",
    status: "expired",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    price: 20000,
    paymentMethod: "credit-card",
    autoRenew: false,
  },
]

// Create a hook to access and update mock data
export function useMockData() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers)
  const [factories, setFactories] = useState<Factory[]>(mockFactories)

  const updateWorker = (updatedWorker: Worker) => {
    setWorkers((prev) => prev.map((worker) => (worker.id === updatedWorker.id ? updatedWorker : worker)))
  }

  const updateFactory = (updatedFactory: Factory) => {
    setFactories((prev) => prev.map((factory) => (factory.id === updatedFactory.id ? updatedFactory : factory)))
  }

  return {
    workers,
    factories,
    updateWorker,
    updateFactory,
  }
}

// Helper function to get worker by ID
export const getWorkerById = (id: string): Worker | undefined => {
  // Use find instead of filter for better performance when looking for a single item
  return workers.find((worker) => worker.id === id)
}

// Helper function to get shifts by worker ID
export const getShiftsByWorkerId = (workerId: string): Shift[] => {
  // Create a memoization cache for repeated calls
  if (!getShiftsByWorkerId.cache) {
    getShiftsByWorkerId.cache = new Map<string, Shift[]>()
  }

  if (!getShiftsByWorkerId.cache.has(workerId)) {
    const result = shifts.filter((shift) => shift.workerId === workerId)
    getShiftsByWorkerId.cache.set(workerId, result)
  }

  return getShiftsByWorkerId.cache.get(workerId) || []
}
// Add the cache property to the function
getShiftsByWorkerId.cache = new Map<string, Shift[]>()

// Helper function to get attendance records by worker ID
export const getAttendanceByWorkerId = (workerId: string): AttendanceRecord[] => {
  // Create a memoization cache for repeated calls
  if (!getAttendanceByWorkerId.cache) {
    getAttendanceByWorkerId.cache = new Map<string, AttendanceRecord[]>()
  }

  if (!getAttendanceByWorkerId.cache.has(workerId)) {
    const result = attendanceRecords.filter((record) => record.workerId === workerId)
    getAttendanceByWorkerId.cache.set(workerId, result)
  }

  return getAttendanceByWorkerId.cache.get(workerId) || []
}
// Add the cache property to the function
getAttendanceByWorkerId.cache = new Map<string, AttendanceRecord[]>()

// Add TypeScript declaration for the cache property
declare global {
  interface Function {
    cache?: Map<string, any>
  }
}

// Helper function to get requests by worker ID
export const getRequestsByWorkerId = (workerId: string): Request[] => {
  return requests.filter((request) => request.workerId === workerId)
}

// Helper function to get payroll records by worker ID
export const getPayrollByWorkerId = (workerId: string): PayrollRecord[] => {
  return payrollRecords.filter((record) => record.workerId === workerId)
}

// Helper function to get factory by ID
export const getFactoryById = (id: string): Factory | undefined => {
  return factories.find((factory) => factory.id === id)
}

// Helper function to get subscription by factory ID
export const getSubscriptionByFactoryId = (factoryId: string): Subscription | undefined => {
  return subscriptions.find((subscription) => subscription.factoryId === factoryId)
}

// Helper function to get pending requests count
export const getPendingRequestsCount = (): number => {
  return requests.filter((request) => request.status === "pending").length
}

// Helper function to get active workers count
export const getActiveWorkersCount = (): number => {
  return workers.filter((worker) => worker.status === "active").length
}

// Helper function to get workers on leave count
export const getWorkersOnLeaveCount = (): number => {
  return workers.filter((worker) => worker.status === "on-leave").length
}

// Helper function to get attendance rate
export const getAttendanceRate = (date: string): number => {
  const records = attendanceRecords.filter((record) => record.date === date)
  const present = records.filter((record) => record.status === "present" || record.status === "late").length
  return records.length > 0 ? Math.round((present / records.length) * 100) : 0
}
