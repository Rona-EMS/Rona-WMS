"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarContextType {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function WorkerSidebarProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true)

  return <SidebarContext.Provider value={{ expanded, setExpanded }}>{children}</SidebarContext.Provider>
}

export function useWorkerSidebar() {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error("useWorkerSidebar must be used within a WorkerSidebarProvider")
  }

  return context
}
