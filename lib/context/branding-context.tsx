"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useMockData } from "@/lib/mock-data"

interface BrandingContextType {
  companyName: string
  companyLogo: string
  primaryColor: string
  secondaryColor: string
  updateBranding: (branding: Partial<BrandingState>) => void
  logo: string
  accentColor: string
  factoryId: string
  getContrastColor: (color: string) => string
  getButtonTextColor: (bgColor: string) => string
}

interface BrandingState {
  companyName: string
  companyLogo: string
  primaryColor: string
  secondaryColor: string
}

const defaultBranding: BrandingState = {
  companyName: "Your Company",
  companyLogo: "/company-logo.png", // Default placeholder
  primaryColor: "#6366f1", // Purple
  secondaryColor: "#f43f5e", // Pink
}

const BrandingContext = createContext<BrandingContextType>({
  ...defaultBranding,
  logo: "/rona-logo.png",
  accentColor: "#ffffff",
  factoryId: "123",
  updateBranding: () => {},
  getContrastColor: () => "#000000",
  getButtonTextColor: () => "#ffffff",
})

export const useBranding = () => useContext(BrandingContext)

interface BrandingProviderProps {
  children: ReactNode
  factoryId?: string
}

// Helper function to calculate contrast ratio
const getLuminance = (hexColor: string): number => {
  // Remove the # if present
  const color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor

  // Convert to RGB
  const r = Number.parseInt(color.substr(0, 2), 16) / 255
  const g = Number.parseInt(color.substr(2, 2), 16) / 255
  const b = Number.parseInt(color.substr(4, 2), 16) / 255

  // Calculate luminance
  const luminance =
    0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
    0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
    0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4))

  return luminance
}

// Helper function to determine if a color is light or dark
const isLightColor = (hexColor: string): boolean => {
  const luminance = getLuminance(hexColor)
  return luminance > 0.5
}

export function BrandingProvider({ children, factoryId = "123" }: BrandingProviderProps) {
  const { factories } = useMockData()
  const [branding, setBranding] = useState<BrandingState>(defaultBranding)

  // Function to get a contrasting color (black or white) based on background
  const getContrastColor = (bgColor: string): string => {
    return isLightColor(bgColor) ? "#000000" : "#ffffff"
  }

  // Function to get appropriate text color for buttons
  const getButtonTextColor = (bgColor: string): string => {
    return isLightColor(bgColor) ? "#000000" : "#ffffff"
  }

  // Load branding from localStorage on mount
  useEffect(() => {
    const savedBranding = localStorage.getItem("branding")
    if (savedBranding) {
      try {
        const parsedBranding = JSON.parse(savedBranding)
        setBranding((prev) => ({ ...prev, ...parsedBranding }))
      } catch (error) {
        console.error("Failed to parse branding data:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Find the factory by ID
    const factory = factories.find((f) => f.id === factoryId)

    if (factory && factory.branding) {
      setBranding({
        companyName: factory.name || defaultBranding.companyName,
        companyLogo: factory.branding.logo || defaultBranding.companyLogo,
        primaryColor: factory.branding.primaryColor || defaultBranding.primaryColor,
        secondaryColor: factory.branding.secondaryColor || defaultBranding.secondaryColor,
      })
    }
  }, [factoryId, factories])

  const updateBranding = (newBranding: Partial<BrandingState>) => {
    setBranding((prev) => {
      const updated = { ...prev, ...newBranding }
      // Save to localStorage
      localStorage.setItem("branding", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <BrandingContext.Provider
      value={{
        ...branding,
        logo: branding.companyLogo,
        accentColor: "#ffffff",
        factoryId: "123",
        updateBranding,
        getContrastColor,
        getButtonTextColor,
      }}
    >
      {children}
    </BrandingContext.Provider>
  )
}
