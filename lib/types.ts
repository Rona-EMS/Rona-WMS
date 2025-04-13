// Worker Types
export type Worker = {
  id: string
  name: string
  department: string
  position: string
  phoneNumber: string
  email: string
  nfcCardId: string
  status: "active" | "inactive" | "on-leave"
  joinDate: string
}

// Shift Types
export type ShiftType = "morning" | "afternoon" | "night"

export type Shift = {
  id: string
  workerId: string
  date: string
  type: ShiftType
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "missed" | "swapped"
}

// Attendance Types
export type AttendanceRecord = {
  id: string
  workerId: string
  date: string
  checkInTime: string | null
  checkOutTime: string | null
  status: "present" | "absent" | "late" | "early-departure"
  location?: {
    latitude: number
    longitude: number
  }
}

// Request Types
export type RequestType = "leave" | "shift-swap" | "emergency"
export type RequestStatus = "pending" | "approved" | "rejected"

export type Request = {
  id: string
  workerId: string
  type: RequestType
  status: RequestStatus
  createdAt: string
  description: string
  startDate?: string
  endDate?: string
  shiftId?: string
  targetShiftId?: string
}

// Payroll Types
export type PayrollRecord = {
  id: string
  workerId: string
  period: string
  basicSalary: number
  overtime: number
  deductions: number
  bonus: number
  totalAmount: number
  status: "pending" | "processed" | "paid"
  paymentDate: string | null
}

// Factory Types
export type Factory = {
  id: string
  name: string
  location: string
  industry: string
  totalWorkers: number
  activeWorkers: number
  subscriptionStatus: "active" | "trial" | "expired"
  subscriptionEndDate: string
}

// Announcement Types
export type Announcement = {
  id: string
  title: string
  content: string
  createdAt: string
  createdBy: string
  priority: "low" | "medium" | "high"
  targetAudience: "all" | "workers" | "admins"
}

// User Types
export type UserRole = "worker" | "admin" | "owner" | "saas-admin" | "kiosk"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  factoryId?: string
  workerId?: string
  language: "en" | "am"
}

// Subscription Types
export type SubscriptionPlan = "basic" | "standard" | "premium" | "enterprise"
export type SubscriptionStatus = "active" | "trial" | "expired" | "cancelled"
export type PaymentMethod = "telebirr" | "bank-transfer" | "credit-card"

export type Subscription = {
  id: string
  factoryId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  startDate: string
  endDate: string
  price: number
  paymentMethod: PaymentMethod
  autoRenew: boolean
}
