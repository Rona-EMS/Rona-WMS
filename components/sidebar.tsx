"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(true)

  return <SidebarContext.Provider value={{ expanded, setExpanded }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar()

  return (
    <div
      className={cn(
        "h-screen flex-col bg-background transition-all duration-300 ease-in-out relative border-r border-purple-100",
        expanded ? "w-64" : "w-20",
        className,
      )}
    >
      <div className="flex h-full flex-col">{children}</div>
    </div>
  )
}

export function SidebarHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar()

  return (
    <div className={cn("flex h-16 items-center border-b border-purple-100", expanded ? "px-4" : "px-2", className)}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto py-4", className)}>{children}</div>
}

export function SidebarFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-purple-100 py-4", className)}>{children}</div>
}

export function SidebarNav({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 px-3", className)}>{children}</div>
}

interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  variant?: "default" | "active"
  activeClassName?: string
}

export function SidebarItem({
  className,
  children,
  icon,
  variant = "default",
  activeClassName,
  ...props
}: SidebarItemProps) {
  const { expanded } = useSidebar()

  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md py-2 text-sm transition-colors",
        expanded ? "px-3 justify-start" : "px-0 justify-center w-full",
        variant === "active" && activeClassName ? activeClassName : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {icon}
      {expanded && <span>{children}</span>}
    </button>
  )
}

export function SidebarTrigger({ className }: React.HTMLAttributes<HTMLButtonElement>) {
  const { expanded, setExpanded } = useSidebar()

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-purple-600 hover:bg-purple-50 hover:text-purple-800 border border-purple-200 absolute -right-4 top-[72px] z-10",
        className,
      )}
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      title={expanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        {expanded ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  )
}

export function SidebarSeparator({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-2 border-t border-border/40", className)} />
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar()

  return (
    <div className={cn("flex flex-1 flex-col transition-all duration-300 ease-in-out", expanded ? "ml-64" : "ml-20")}>
      {children}
    </div>
  )
}
