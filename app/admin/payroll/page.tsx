"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { PayrollManagement } from "@/components/admin/payroll-management"
import { PayrollSecurityLock } from "@/components/admin/payroll-security-lock"
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"
import * as React from "react"

export default function PayrollPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showLockModal, setShowLockModal] = useState(false)

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Reset lock state when navigating away and back
    return () => {
      setIsUnlocked(false)
    }
  }, [])

  const handleUnlock = React.useCallback(() => {
    setIsUnlocked(true)
  }, [])

  const handleLock = React.useCallback(() => {
    setIsUnlocked(false)
  }, [])

  return (
    <DashboardShell
      title="Payroll Management"
      description="Process and manage worker payments"
      headerAction={
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Payroll Lock Status:</span>
            <div className="flex items-center gap-1 ml-2">
              {isUnlocked ? (
                <>
                  <Unlock className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">Locked</span>
                </>
              )}
            </div>
          </div>
          {isUnlocked ? (
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleLock}>
              <Lock className="mr-2 h-4 w-4" />
              Lock Payroll
            </Button>
          ) : (
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowLockModal(true)}>
              <Unlock className="mr-2 h-4 w-4" />
              Unlock Payroll
            </Button>
          )}
        </div>
      }
    >
      {isUnlocked ? (
        <PayrollManagement />
      ) : (
        <div className="flex items-center justify-center min-h-[70vh] p-4">
          <div className="text-center max-w-md mx-auto p-8 rounded-xl bg-white shadow-lg border-2 border-purple-500/30">
            <div className="bg-purple-500 text-white p-4 rounded-full mx-auto mb-6 w-16 h-16 flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-3">Payroll Data Locked</h3>
            <p className="text-gray-600 mb-6">
              This information is protected. Click the Unlock Payroll button above to access the data.
            </p>
          </div>
        </div>
      )}
      <PayrollSecurityLock isOpen={showLockModal} onClose={() => setShowLockModal(false)} onUnlock={handleUnlock} />
    </DashboardShell>
  )
}
