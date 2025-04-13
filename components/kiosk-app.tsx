"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import {
  QrCode,
  CreditCard,
  LogOut,
  CheckCircle2,
  User,
  Clock,
  Globe,
  Calendar,
  Info,
  AlertCircle,
  Fingerprint,
  Shield,
  HelpCircle,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"
import type { Worker } from "@/lib/mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { ConsistentClock } from "@/components/consistent-clock"
import { Progress } from "@/components/ui/progress"

// Helper function to format date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper function to format time
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

interface KioskAppProps {
  factoryId?: string
  factoryName?: string
  factoryLogo?: string
  factoryPrimaryColor?: string
  factorySecondaryColor?: string
  factoryAccentColor?: string
  workers?: Worker[]
}

export function KioskApp({
  factoryId = "123",
  factoryName = "Rona Manufacturing",
  factoryLogo = "/rona-logo.png",
  factoryPrimaryColor = "#6366f1", // Default to purple
  factorySecondaryColor = "#f43f5e",
  factoryAccentColor = "#ffffff",
  workers = [],
}: KioskAppProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [language, setLanguage] = useState("en")
  const [activeTab, setActiveTab] = useState("nfc")
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showCamera, setShowCamera] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [qrCodeValue, setQrCodeValue] = useState("")
  const [qrCodeExpiry, setQrCodeExpiry] = useState(0)
  const [lastScannedWorker, setLastScannedWorker] = useState<Worker | null>(null)
  const [clockAction, setClockAction] = useState<"in" | "out">("in")
  const [workerId, setWorkerId] = useState("")
  const [workerPin, setWorkerPin] = useState("")
  const [isWorkerAuthenticated, setIsWorkerAuthenticated] = useState(false)
  const [authenticatedWorker, setAuthenticatedWorker] = useState<Worker | null>(null)
  const [qrCodeRequested, setQrCodeRequested] = useState(false)
  const [qrCodeProgress, setQrCodeProgress] = useState(100)
  const [qrCodeLogs, setQrCodeLogs] = useState<
    Array<{
      workerId: string
      timestamp: Date
      action: "in" | "out"
      expiryTime: Date
    }>
  >([])
  const [isScanning, setIsScanning] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle NFC scan
  const handleNfcScan = (workerId: string) => {
    setIsScanning(true)

    // Simulate scanning delay
    setTimeout(() => {
      const worker = workers.find((w) => w.id === workerId)

      if (worker) {
        setLastScannedWorker(worker)
        setIsScanning(false)

        // Only show toast for admin
        if (isAdmin) {
          toast({
            title: `${clockAction === "in" ? "Clock In" : "Clock Out"} Successful`,
            description: `${worker.name} has clocked ${clockAction} at ${formatTime(new Date())}`,
            variant: "default",
          })
        }

        // Reset after 5 seconds
        const timeoutId = setTimeout(() => {
          setLastScannedWorker(null)
        }, 5000)

        return () => clearTimeout(timeoutId)
      } else {
        setIsScanning(false)
      }
    }, 1500)
  }

  // Generate a one-time QR code for clock in/out when requested
  useEffect(() => {
    if (!qrCodeRequested || !authenticatedWorker) return

    // Generate a new QR code
    const generateQrCode = () => {
      const expiry = Date.now() + 60000 // 1 minute expiry
      const expiryDate = new Date(expiry)
      // Include worker ID in the QR code for security
      const value = `factory-${factoryId}-worker-${authenticatedWorker.id}-${clockAction}-${expiry}`
      setQrCodeValue(value)
      setQrCodeExpiry(expiry)
      setQrCodeProgress(100)

      // Log the QR code generation for audit purposes
      setQrCodeLogs((prev) => [
        ...prev,
        {
          workerId: authenticatedWorker.id,
          timestamp: new Date(),
          action: clockAction,
          expiryTime: expiryDate,
        },
      ])

      // Only show toast for admin
      if (isAdmin) {
        toast({
          title: "QR Code Generated",
          description: `QR code for ${authenticatedWorker.name} (${authenticatedWorker.id}) will expire at ${formatTime(
            expiryDate,
          )}`,
        })
      }
    }

    generateQrCode()

    // Update progress bar
    const progressInterval = setInterval(() => {
      setQrCodeProgress((prev) => {
        const newValue = prev - 100 / 60 // 60 seconds total
        return newValue < 0 ? 0 : newValue
      })
    }, 1000)

    const refreshInterval = setInterval(generateQrCode, 60000) // Refresh every minute

    return () => {
      clearInterval(refreshInterval)
      clearInterval(progressInterval)
    }
  }, [qrCodeRequested, authenticatedWorker, factoryId, clockAction, isAdmin, toast])

  // Handle camera for QR code scanning
  useEffect(() => {
    if (activeTab !== "qr" || !showCamera) return

    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            setCameraError(false)
          }
        } else {
          setCameraError(true)
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
        setCameraError(true)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [activeTab, showCamera])

  const handleWorkerAuthentication = () => {
    // For testing purposes, accept any worker ID and PIN
    // In a real app, this would validate against a database
    if (workerId && workerPin.length > 0) {
      // Create a mock worker if one doesn't exist with this ID
      let worker = workers.find((w) => w.id === workerId)

      if (!worker) {
        worker = {
          id: workerId,
          name: `Test Worker (${workerId})`,
          department: "Test Department",
          position: "Test Position",
        }
      }

      setIsWorkerAuthenticated(true)
      setAuthenticatedWorker(worker)

      toast({
        title: "Worker Authenticated",
        description: `${worker.name} (${worker.id}) has been authenticated`,
      })
    } else {
      toast({
        title: "Invalid Input",
        description: "Please enter both Worker ID and PIN",
        variant: "destructive",
      })
    }
  }

  const handleQrCodeRequest = () => {
    setQrCodeRequested(true)

    // Log the request
    console.log(
      `QR Code requested by worker ${authenticatedWorker?.id} for ${clockAction} at ${new Date().toISOString()}`,
    )
  }

  const resetQrCodeAuthentication = () => {
    setWorkerId("")
    setWorkerPin("")
    setIsWorkerAuthenticated(false)
    setAuthenticatedWorker(null)
    setQrCodeRequested(false)
    setQrCodeValue("")
  }

  const getTimeRemaining = () => {
    const remaining = Math.max(0, Math.floor((qrCodeExpiry - Date.now()) / 1000))
    return `${remaining} seconds`
  }

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    // Store preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage)
    }
  }

  const handleLogout = () => {
    // Redirect immediately without waiting for toast
    window.location.href = "/kiosk-login"
  }

  // Simple QR code component since we can't use qrcode.react
  const SimpleQRCode = ({ value, size = 200 }: { value: string; size?: number }) => {
    return (
      <div
        className="relative bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
        style={{
          width: size,
          height: size,
        }}
      >
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="bg-purple-100 p-4 rounded-xl mb-4">
            <QrCode size={size * 0.5} className="text-purple-700" />
          </div>
          <div className="text-center">
            <div className="font-medium text-sm text-purple-900 mb-1">
              Scan to {clockAction === "in" ? "Clock In" : "Clock Out"}
            </div>
            <div className="text-xs text-purple-600">ID: {authenticatedWorker?.id}</div>
          </div>
        </div>
      </div>
    )
  }

  // Get current year for footer
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Top bar with time/date, factory info, and controls */}
      <header className="bg-purple-700 dark:bg-purple-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left: Logo and Factory name */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 relative overflow-hidden rounded-md bg-white p-1">
                <img
                  src={factoryLogo || "/rona-logo.png"}
                  alt={`${factoryName} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">{factoryName}</h1>
                <p className="text-xs opacity-80">Attendance Management System</p>
              </div>
            </div>

            {/* Center: Time and Date */}
            <ConsistentClock className="hidden md:flex" variant="header" textColor="white" />

            {/* Right: Language and Logout */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language === "en" ? "English" : "አማርኛ"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => changeLanguage("en")} className="flex items-center justify-between">
                    English {language === "en" && <CheckCircle2 className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLanguage("am")} className="flex items-center justify-between">
                    አማርኛ {language === "am" && <CheckCircle2 className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {language === "en" ? "Logout" : "ውጣ"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Time Display */}
      <div className="md:hidden bg-purple-600 dark:bg-purple-800 text-white py-2 px-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(currentTime).split(",")[0]}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl relative">
          <Card className="w-full shadow-lg border-purple-100 dark:border-purple-900">
            <CardHeader className="text-center border-b pb-6">
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">Attendance Management</CardTitle>
              <CardDescription>Please use your NFC card or scan a QR code to clock in or out</CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs
                defaultValue="nfc"
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value)
                  resetQrCodeAuthentication()
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="nfc" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                    <CreditCard className="mr-2 h-4 w-4" />
                    NFC Card
                  </TabsTrigger>
                  <TabsTrigger value="qr" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Code
                  </TabsTrigger>
                </TabsList>

                {/* Clock In/Out Toggle - Common for both tabs */}
                <div className="flex justify-center mb-8 bg-purple-50 dark:bg-gray-800 p-2 rounded-lg">
                  <Button
                    variant={clockAction === "in" ? "purple" : "outline"}
                    className={`rounded-r-none ${clockAction === "in" ? "" : "border-purple-700 text-purple-700"}`}
                    onClick={() => {
                      setClockAction("in")
                      resetQrCodeAuthentication()
                    }}
                  >
                    Clock In
                  </Button>
                  <Button
                    variant={clockAction === "out" ? "purple" : "outline"}
                    className={`rounded-l-none ${clockAction === "out" ? "" : "border-purple-700 text-purple-700"}`}
                    onClick={() => {
                      setClockAction("out")
                      resetQrCodeAuthentication()
                    }}
                  >
                    Clock Out
                  </Button>
                </div>

                <TabsContent value="nfc" className="focus-visible:outline-none focus-visible:ring-0">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {isScanning ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4 relative">
                          <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-opacity-50"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                          <CreditCard className="h-12 w-12 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Scanning...</h3>
                        <p className="text-muted-foreground">Please keep your card near the reader</p>
                      </div>
                    ) : !lastScannedWorker ? (
                      <>
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
                            <CreditCard className="h-12 w-12 text-purple-600" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Tap Your NFC Card</h3>
                          <p className="text-muted-foreground">
                            Hold your card near the reader to {clockAction === "in" ? "clock in" : "clock out"}
                          </p>
                        </div>

                        <div className="space-y-4 w-full max-w-md">
                          <div className="border rounded-lg p-4 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-gray-800/50">
                            <h4 className="font-medium mb-2 flex items-center text-purple-800 dark:text-purple-300">
                              <Info className="h-4 w-4 mr-2" />
                              Select a worker to simulate NFC scan:
                            </h4>
                            <div className="grid grid-cols-1 gap-2 mt-3">
                              {workers.length > 0 ? (
                                workers.map((worker) => (
                                  <Button
                                    key={worker.id}
                                    variant="outline"
                                    className="justify-start text-left border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                                    onClick={() => handleNfcScan(worker.id)}
                                  >
                                    <User className="h-4 w-4 mr-2" />
                                    {worker.name} - {worker.id}
                                  </Button>
                                ))
                              ) : (
                                <>
                                  <Button
                                    variant="outline"
                                    className="justify-start text-left border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                                    onClick={() => handleNfcScan("ETH-W-1001")}
                                  >
                                    <User className="h-4 w-4 mr-2" />
                                    Abebe Kebede - ETH-W-1001
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="justify-start text-left border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                                    onClick={() => handleNfcScan("ETH-W-1002")}
                                  >
                                    <User className="h-4 w-4 mr-2" />
                                    Tigist Haile - ETH-W-1002
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => {
                              // In a real app, this would activate the NFC reader
                              toast({
                                title: "NFC Reader Activated",
                                description: "Please tap your NFC card now",
                              })
                            }}
                          >
                            <Fingerprint className="mr-2 h-4 w-4" />
                            Activate NFC Reader
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="w-full max-w-md p-6 border rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 animate-fade-in">
                        <div className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full mr-4">
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{lastScannedWorker.name}</p>
                            <p className="text-sm text-green-700 dark:text-green-400">ID: {lastScannedWorker.id}</p>
                            <p className="text-sm mt-2">
                              Successfully clocked {clockAction} at {formatTime(new Date())}
                            </p>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => setLastScannedWorker(null)}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Scan Another Card
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="qr" className="focus-visible:outline-none focus-visible:ring-0">
                  {isWorkerAuthenticated ? (
                    <div className="flex flex-col items-center">
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6 w-full max-w-md">
                        <div className="flex items-start">
                          <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full mr-4">
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold">Authentication Successful</p>
                            <p className="text-sm text-green-700 dark:text-green-400">
                              {authenticatedWorker?.name} - {authenticatedWorker?.id}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!qrCodeRequested ? (
                        <div className="space-y-4 text-center w-full max-w-md">
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
                              Generate QR Code
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              Click the button below to generate a secure QR code for{" "}
                              {clockAction === "in" ? "clocking in" : "clocking out"}
                            </p>

                            <Button className="w-full" onClick={handleQrCodeRequest}>
                              <QrCode className="mr-2 h-4 w-4" />
                              Generate QR Code
                            </Button>

                            <Button
                              variant="outline"
                              onClick={resetQrCodeAuthentication}
                              className="w-full mt-3 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center w-full max-w-md">
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-4">
                              Your QR Code
                            </h3>
                            <div className="flex justify-center mb-4">
                              <SimpleQRCode value={qrCodeValue} size={240} />
                            </div>
                            <div className="mt-4 space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm text-purple-700 dark:text-purple-300">
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Expires in:
                                  </span>
                                  <span>{getTimeRemaining()}</span>
                                </div>
                                <Progress value={qrCodeProgress} className="h-2" />
                              </div>
                              <Button
                                variant="outline"
                                onClick={resetQrCodeAuthentication}
                                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-800/30 mb-4">
                            <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">
                            Worker Authentication
                          </h3>
                          <p className="text-muted-foreground">
                            Please enter your Worker ID and PIN to generate a secure QR code
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="worker-id" className="text-purple-700 dark:text-purple-300">
                              Worker ID
                            </Label>
                            <Input
                              id="worker-id"
                              placeholder="Enter your Worker ID"
                              value={workerId}
                              onChange={(e) => setWorkerId(e.target.value)}
                              className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="worker-pin" className="text-purple-700 dark:text-purple-300">
                              PIN
                            </Label>
                            <Input
                              id="worker-pin"
                              type="password"
                              placeholder="Enter your PIN"
                              value={workerPin}
                              onChange={(e) => setWorkerPin(e.target.value)}
                              className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                            />
                          </div>

                          <Button className="w-full" onClick={handleWorkerAuthentication}>
                            <Fingerprint className="mr-2 h-4 w-4" />
                            Authenticate
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex flex-col border-t pt-6">
              <div className="w-full">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="help" className="border-purple-200 dark:border-purple-800">
                    <AccordionTrigger className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100">
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Need Help?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 bg-purple-50/50 dark:bg-purple-900/10">
                          <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            My NFC card is not being detected
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Make sure your card is placed directly on the reader. If the problem persists, please
                            contact your administrator for assistance.
                          </p>
                        </div>

                        <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 bg-purple-50/50 dark:bg-purple-900/10">
                          <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />I forgot my PIN
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Please contact your supervisor or the HR department to reset your PIN.
                          </p>
                        </div>

                        <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 bg-purple-50/50 dark:bg-purple-900/10">
                          <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            The QR code is not scanning
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Make sure your camera is clean and the QR code is well-lit. Try generating a new QR code if
                            the current one has expired.
                          </p>
                        </div>

                        <div className="rounded-lg border border-purple-200 dark:border-purple-800 p-4 bg-purple-50/50 dark:bg-purple-900/10">
                          <h4 className="font-medium mb-2 text-purple-800 dark:text-purple-300 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            How do I change my language preference?
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Click the language button in the top-right corner of the screen to switch between English
                            and Amharic.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Admin QR Code Logs - only visible when in admin mode */}
        {isAdmin && qrCodeLogs.length > 0 && (
          <Card className="w-full max-w-3xl mt-6 shadow-lg border-purple-100 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="text-xl text-purple-700 dark:text-purple-400">QR Code Generation Logs</CardTitle>
              <CardDescription>Audit trail of QR codes generated for workers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-200 dark:border-purple-800">
                      <th className="text-left py-2 px-4 font-medium text-purple-700 dark:text-purple-300">
                        Worker ID
                      </th>
                      <th className="text-left py-2 px-4 font-medium text-purple-700 dark:text-purple-300">
                        Timestamp
                      </th>
                      <th className="text-left py-2 px-4 font-medium text-purple-700 dark:text-purple-300">Action</th>
                      <th className="text-left py-2 px-4 font-medium text-purple-700 dark:text-purple-300">
                        Expiry Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {qrCodeLogs.map((log, index) => (
                      <tr
                        key={index}
                        className="border-b border-purple-100 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-900/10"
                      >
                        <td className="py-2 px-4">{log.workerId}</td>
                        <td className="py-2 px-4">{formatTime(log.timestamp)}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              log.action === "in"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            }`}
                          >
                            {log.action === "in" ? "Clock In" : "Clock Out"}
                          </span>
                        </td>
                        <td className="py-2 px-4">{formatTime(log.expiryTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer with factory name and current year */}
      <footer className="py-4 px-6 text-center text-sm text-purple-700 dark:text-purple-300 border-t border-purple-100 dark:border-purple-900 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <Logo size="sm" className="mr-2" />
            <span>RONA Workforce Management System</span>
          </div>
          <div>
            {factoryName}'s app © {currentYear}. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 10px 10px;
        }
      `}</style>
    </div>
  )
}
