import type { Subscription } from "./types"
import { factories } from "./mock-data"

// Enhanced mock subscriptions with more detailed data
export const enhancedSubscriptions: Subscription[] = [
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
    billingCycle: "annual",
    discount: 10,
    features: ["unlimited-users", "advanced-analytics", "priority-support", "custom-branding"],
    lastPaymentDate: "2025-01-01",
    nextPaymentDate: "2026-01-01",
    paymentStatus: "paid",
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
    billingCycle: "annual",
    discount: 0,
    features: ["50-users", "basic-analytics", "email-support"],
    lastPaymentDate: "2024-10-01",
    nextPaymentDate: "2025-09-30",
    paymentStatus: "paid",
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
    billingCycle: "monthly",
    discount: 0,
    features: ["25-users", "basic-analytics"],
    lastPaymentDate: null,
    nextPaymentDate: "2025-04-15",
    paymentStatus: "trial",
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
    billingCycle: "annual",
    discount: 5,
    features: ["50-users", "basic-analytics", "email-support"],
    lastPaymentDate: "2024-08-20",
    nextPaymentDate: "2025-08-20",
    paymentStatus: "paid",
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
    billingCycle: "annual",
    discount: 0,
    features: ["25-users", "basic-analytics"],
    lastPaymentDate: "2024-03-01",
    nextPaymentDate: null,
    paymentStatus: "overdue",
  },
  {
    id: "SUB-1006",
    factoryId: "FAC-1006",
    plan: "premium",
    status: "pending",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    price: 50000,
    paymentMethod: "bank-transfer",
    autoRenew: true,
    billingCycle: "annual",
    discount: 15,
    features: ["unlimited-users", "advanced-analytics", "priority-support", "custom-branding"],
    lastPaymentDate: null,
    nextPaymentDate: "2025-04-01",
    paymentStatus: "pending",
  },
  {
    id: "SUB-1007",
    factoryId: "FAC-1007",
    plan: "custom",
    status: "active",
    startDate: "2025-02-15",
    endDate: "2026-02-14",
    price: 75000,
    paymentMethod: "telebirr",
    autoRenew: true,
    billingCycle: "annual",
    discount: 20,
    features: [
      "unlimited-users",
      "advanced-analytics",
      "priority-support",
      "custom-branding",
      "dedicated-account-manager",
      "on-site-training",
    ],
    lastPaymentDate: "2025-02-15",
    nextPaymentDate: "2026-02-14",
    paymentStatus: "paid",
  },
  {
    id: "SUB-1008",
    factoryId: "FAC-1008",
    plan: "standard",
    status: "suspended",
    startDate: "2024-11-10",
    endDate: "2025-11-09",
    price: 35000,
    paymentMethod: "credit-card",
    autoRenew: false,
    billingCycle: "annual",
    discount: 0,
    features: ["50-users", "basic-analytics", "email-support"],
    lastPaymentDate: "2024-11-10",
    nextPaymentDate: "2025-02-10",
    paymentStatus: "overdue",
  },
  {
    id: "SUB-1009",
    factoryId: "FAC-1009",
    plan: "basic",
    status: "active",
    startDate: "2025-01-20",
    endDate: "2025-07-19",
    price: 12000,
    paymentMethod: "telebirr",
    autoRenew: true,
    billingCycle: "semi-annual",
    discount: 0,
    features: ["25-users", "basic-analytics"],
    lastPaymentDate: "2025-01-20",
    nextPaymentDate: "2025-07-19",
    paymentStatus: "paid",
  },
  {
    id: "SUB-1010",
    factoryId: "FAC-1010",
    plan: "premium",
    status: "active",
    startDate: "2024-12-05",
    endDate: "2025-12-04",
    price: 50000,
    paymentMethod: "bank-transfer",
    autoRenew: true,
    billingCycle: "annual",
    discount: 10,
    features: ["unlimited-users", "advanced-analytics", "priority-support", "custom-branding"],
    lastPaymentDate: "2024-12-05",
    nextPaymentDate: "2025-12-04",
    paymentStatus: "paid",
  },
]

// Helper function to get subscription by ID
export const getSubscriptionById = (id: string): Subscription | undefined => {
  return enhancedSubscriptions.find((subscription) => subscription.id === id)
}

// Helper function to get factory name by subscription
export const getFactoryNameBySubscription = (subscription: Subscription): string => {
  const factory = factories.find((f) => f.id === subscription.factoryId)
  return factory ? factory.name : "Unknown Factory"
}

// Helper function to get subscriptions by status
export const getSubscriptionsByStatus = (status: string): Subscription[] => {
  return enhancedSubscriptions.filter((subscription) => subscription.status === status)
}

// Helper function to get subscriptions by plan
export const getSubscriptionsByPlan = (plan: string): Subscription[] => {
  return enhancedSubscriptions.filter((subscription) => subscription.plan === plan)
}

// Helper function to get active subscriptions count
export const getActiveSubscriptionsCount = (): number => {
  return enhancedSubscriptions.filter((subscription) => subscription.status === "active").length
}

// Helper function to get trial subscriptions count
export const getTrialSubscriptionsCount = (): number => {
  return enhancedSubscriptions.filter((subscription) => subscription.status === "trial").length
}

// Helper function to get expired subscriptions count
export const getExpiredSubscriptionsCount = (): number => {
  return enhancedSubscriptions.filter((subscription) => subscription.status === "expired").length
}

// Helper function to calculate total revenue
export const getTotalRevenue = (): number => {
  return enhancedSubscriptions
    .filter((subscription) => subscription.status === "active" || subscription.status === "trial")
    .reduce((total, subscription) => total + subscription.price, 0)
}
