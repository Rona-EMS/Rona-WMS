import type { Factory } from "./types"

// Enhanced mock factories with more detailed data
export const enhancedFactories: Factory[] = [
  {
    id: "FAC-1001",
    name: "Addis Textile Mills",
    location: "Addis Ababa",
    industry: "Textile",
    totalWorkers: 120,
    activeWorkers: 115,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-12-31",
    contactPerson: "Meron Tadesse",
    contactEmail: "meron.t@addistextile.com",
    contactPhone: "+251911234567",
    registrationDate: "2024-01-15",
    lastLoginDate: "2025-03-28",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 95,
    monthlyRevenue: 450000,
    subscriptionPlan: "premium",
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
    contactPerson: "Solomon Bekele",
    contactEmail: "solomon.b@hawassagarments.com",
    contactPhone: "+251922345678",
    registrationDate: "2024-02-20",
    lastLoginDate: "2025-03-27",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 92,
    monthlyRevenue: 780000,
    subscriptionPlan: "standard",
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
    contactPerson: "Tigist Haile",
    contactEmail: "tigist.h@mekelleleather.com",
    contactPhone: "+251933456789",
    registrationDate: "2025-03-15",
    lastLoginDate: "2025-03-26",
    verificationStatus: "pending",
    operationalStatus: "partially-operational",
    averageAttendance: 88,
    monthlyRevenue: 320000,
    subscriptionPlan: "basic",
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
    contactPerson: "Dawit Mengistu",
    contactEmail: "dawit.m@bahirdarfood.com",
    contactPhone: "+251944567890",
    registrationDate: "2024-08-20",
    lastLoginDate: "2025-03-25",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 94,
    monthlyRevenue: 560000,
    subscriptionPlan: "standard",
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
    contactPerson: "Abebe Kebede",
    contactEmail: "abebe.k@diredawacement.com",
    contactPhone: "+251955678901",
    registrationDate: "2024-03-01",
    lastLoginDate: "2025-02-25",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 90,
    monthlyRevenue: 680000,
    subscriptionPlan: "basic",
  },
  {
    id: "FAC-1006",
    name: "Adama Steel Manufacturing",
    location: "Adama",
    industry: "Metal",
    totalWorkers: 180,
    activeWorkers: 175,
    subscriptionStatus: "pending",
    subscriptionEndDate: "2026-03-31",
    contactPerson: "Yonas Alemu",
    contactEmail: "yonas.a@adamasteel.com",
    contactPhone: "+251966789012",
    registrationDate: "2025-03-20",
    lastLoginDate: "2025-03-28",
    verificationStatus: "pending",
    operationalStatus: "pre-operational",
    averageAttendance: 0,
    monthlyRevenue: 0,
    subscriptionPlan: "premium",
  },
  {
    id: "FAC-1007",
    name: "Jimma Coffee Processors",
    location: "Jimma",
    industry: "Agriculture",
    totalWorkers: 300,
    activeWorkers: 290,
    subscriptionStatus: "active",
    subscriptionEndDate: "2026-02-14",
    contactPerson: "Hanna Tadesse",
    contactEmail: "hanna.t@jimmacoffee.com",
    contactPhone: "+251977890123",
    registrationDate: "2025-02-15",
    lastLoginDate: "2025-03-27",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 96,
    monthlyRevenue: 920000,
    subscriptionPlan: "custom",
  },
  {
    id: "FAC-1008",
    name: "Gondar Pharmaceutical",
    location: "Gondar",
    industry: "Pharmaceutical",
    totalWorkers: 120,
    activeWorkers: 110,
    subscriptionStatus: "suspended",
    subscriptionEndDate: "2025-11-09",
    contactPerson: "Solomon Girma",
    contactEmail: "solomon.g@gondarpharma.com",
    contactPhone: "+251988901234",
    registrationDate: "2024-11-10",
    lastLoginDate: "2025-01-15",
    verificationStatus: "verified",
    operationalStatus: "partially-operational",
    averageAttendance: 85,
    monthlyRevenue: 420000,
    subscriptionPlan: "standard",
  },
  {
    id: "FAC-1009",
    name: "Dessie Furniture Makers",
    location: "Dessie",
    industry: "Furniture",
    totalWorkers: 75,
    activeWorkers: 72,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-07-19",
    contactPerson: "Mekdes Abebe",
    contactEmail: "mekdes.a@dessiefurniture.com",
    contactPhone: "+251999012345",
    registrationDate: "2025-01-20",
    lastLoginDate: "2025-03-26",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 93,
    monthlyRevenue: 280000,
    subscriptionPlan: "basic",
  },
  {
    id: "FAC-1010",
    name: "Harar Brewery",
    location: "Harar",
    industry: "Beverage",
    totalWorkers: 220,
    activeWorkers: 215,
    subscriptionStatus: "active",
    subscriptionEndDate: "2025-12-04",
    contactPerson: "Bereket Solomon",
    contactEmail: "bereket.s@hararbrewery.com",
    contactPhone: "+251900123456",
    registrationDate: "2024-12-05",
    lastLoginDate: "2025-03-28",
    verificationStatus: "verified",
    operationalStatus: "fully-operational",
    averageAttendance: 97,
    monthlyRevenue: 850000,
    subscriptionPlan: "premium",
  },
]

// Helper function to get factory by ID
export const getEnhancedFactoryById = (id: string): Factory | undefined => {
  return enhancedFactories.find((factory) => factory.id === id)
}

// Helper function to get factories by subscription status
export const getFactoriesBySubscriptionStatus = (status: string): Factory[] => {
  return enhancedFactories.filter((factory) => factory.subscriptionStatus === status)
}

// Helper function to get factories by industry
export const getFactoriesByIndustry = (industry: string): Factory[] => {
  return enhancedFactories.filter((factory) => factory.industry === industry)
}

// Helper function to get factories by location
export const getFactoriesByLocation = (location: string): Factory[] => {
  return enhancedFactories.filter((factory) => factory.location === location)
}

// Helper function to get active factories count
export const getActiveFactoriesCount = (): number => {
  return enhancedFactories.filter((factory) => factory.subscriptionStatus === "active").length
}

// Helper function to get trial factories count
export const getTrialFactoriesCount = (): number => {
  return enhancedFactories.filter((factory) => factory.subscriptionStatus === "trial").length
}

// Helper function to get expired factories count
export const getExpiredFactoriesCount = (): number => {
  return enhancedFactories.filter((factory) => factory.subscriptionStatus === "expired").length
}

// Helper function to calculate total workers across all factories
export const getTotalWorkersCount = (): number => {
  return enhancedFactories.reduce((total, factory) => total + factory.totalWorkers, 0)
}

// Helper function to calculate total active workers across all factories
export const getTotalActiveWorkersCount = (): number => {
  return enhancedFactories.reduce((total, factory) => total + factory.activeWorkers, 0)
}

// Helper function to get unique industries
export const getUniqueIndustries = (): string[] => {
  const industries = enhancedFactories.map((factory) => factory.industry)
  return [...new Set(industries)]
}

// Helper function to get unique locations
export const getUniqueLocations = (): string[] => {
  const locations = enhancedFactories.map((factory) => factory.location)
  return [...new Set(locations)]
}
