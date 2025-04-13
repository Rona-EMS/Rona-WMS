"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, WifiOff, UserCheck, AlertCircle, CheckCircle2, History } from "lucide-react"

// Mock data for scanned employees
const recentScans = [
  {
    id: "1",
    name: "John Doe",
    cardId: "NFC-1234-5678",
    timestamp: "2023-04-15 08:02:34",
    status: "Clock In",
    department: "Production",
  },
  {
    id: "2",
    name: "Jane Smith",
    cardId: "NFC-2345-6789",
    timestamp: "2023-04-15 08:05:12",
    status: "Clock In",
    department: "Packaging",
  },
  {
    id: "3",
    name: "Robert Johnson",
    cardId: "NFC-3456-7890",
    timestamp: "2023-04-15 08:15:33",
    status: "Clock In",
    department: "Logistics",
  },
  {
    id: "4",
    name: "Michael Wilson",
    cardId: "NFC-5678-9012",
    timestamp: "2023-04-15 16:30:12",
    status: "Clock Out",
    department: "Production",
  },
  {
    id: "5",
    name: "Sarah Brown",
    cardId: "NFC-6789-0123",
    timestamp: "2023-04-15 17:02:18",
    status: "Clock Out",
    department: "Packaging",
  },
]

export function NFCScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<null | {
    success: boolean
    employee?: (typeof recentScans)[0]
    message?: string
  }>(null)
  const [scanHistory, setScanHistory] = useState(recentScans)

  // Simulate NFC scanning
  const startScanning = () => {
    setIsScanning(true)
    setScanResult(null)

    // Simulate a scan after 2 seconds
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        // Randomly select an employee from the mock data
        const randomEmployee = recentScans[Math.floor(Math.random() * recentScans.length)]

        // Update the timestamp to now
        const now = new Date()
        const formattedTime = now.toISOString().replace("T", " ").substring(0, 19)

        const updatedEmployee = {
          ...randomEmployee,
          timestamp: formattedTime,
          status: Math.random() > 0.5 ? "Clock In" : "Clock Out",
        }

        setScanResult({
          success: true,
          employee: updatedEmployee,
        })

        // Add to scan history
        setScanHistory((prev) => [updatedEmployee, ...prev.slice(0, 9)])
      } else {
        setScanResult({
          success: false,
          message: "Card not recognized. Please try again.",
        })
      }

      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scanner">NFC Scanner</TabsTrigger>
          <TabsTrigger value="history">Scan History</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          <Card className="border-2 border-dashed">
            <CardHeader className="text-center">
              <CardTitle>NFC Card Scanner</CardTitle>
              <CardDescription>Scan employee NFC cards to record attendance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              {isScanning ? (
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
                    <Wifi className="h-12 w-12 text-purple-600 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-ping opacity-20"></div>
                  </div>
                  <div className="text-lg font-medium">Scanning...</div>
                  <p className="text-sm text-muted-foreground">Please hold the NFC card near the scanner</p>
                </div>
              ) : scanResult ? (
                <div className="text-center space-y-4 w-full max-w-md">
                  {scanResult.success ? (
                    <div className="space-y-6">
                      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{scanResult.employee?.name}</h3>
                        <p className="text-sm text-muted-foreground">{scanResult.employee?.department}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-muted-foreground">Card ID</div>
                          <div className="font-medium">{scanResult.employee?.cardId}</div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-muted-foreground">Time</div>
                          <div className="font-medium">{scanResult.employee?.timestamp.split(" ")[1]}</div>
                        </div>
                      </div>
                      <Badge
                        className={
                          scanResult.employee?.status === "Clock In"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {scanResult.employee?.status}
                      </Badge>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-10 w-10 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Scan Failed</h3>
                        <p className="text-muted-foreground">{scanResult.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <WifiOff className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="text-lg font-medium">Scanner Ready</div>
                  <p className="text-sm text-muted-foreground">Click the button below to start scanning</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button size="lg" onClick={startScanning} disabled={isScanning} className="w-full max-w-xs">
                {isScanning ? "Scanning..." : "Start Scanning"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>Last 5 employee scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanHistory.slice(0, 5).map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-8 w-8 text-purple-600 bg-purple-100 p-1.5 rounded-full" />
                      <div>
                        <div className="font-medium">{scan.name}</div>
                        <div className="text-sm text-muted-foreground">{scan.cardId}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          scan.status === "Clock In" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {scan.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{scan.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Complete record of NFC card scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanHistory.map((scan, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <History className="h-8 w-8 text-purple-600 bg-purple-100 p-1.5 rounded-full" />
                      <div>
                        <div className="font-medium">{scan.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {scan.department} • {scan.cardId}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          scan.status === "Clock In" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {scan.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{scan.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
