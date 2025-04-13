"use client"

import { useState, useEffect } from "react"

type DeviceType = "mobile" | "tablet" | "desktop" | "largeScreen"

export function useResponsive() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      // Update device type
      if (window.innerWidth < 640) {
        setDeviceType("mobile")
        setIsMobile(true)
        setIsTablet(false)
        setIsDesktop(false)
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setDeviceType("tablet")
        setIsMobile(false)
        setIsTablet(true)
        setIsDesktop(false)
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1536) {
        setDeviceType("desktop")
        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(true)
      } else {
        setDeviceType("largeScreen")
        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(true)
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    windowSize,
    // Utility functions for responsive design
    isPortrait: windowSize.height > windowSize.width,
    isLandscape: windowSize.width > windowSize.height,
    // Safe area utilities for notched devices
    safeAreaTop: "env(safe-area-inset-top, 0px)",
    safeAreaBottom: "env(safe-area-inset-bottom, 0px)",
    safeAreaLeft: "env(safe-area-inset-left, 0px)",
    safeAreaRight: "env(safe-area-inset-right, 0px)",
  }
}
