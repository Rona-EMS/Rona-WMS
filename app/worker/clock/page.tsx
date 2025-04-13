"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import {
  Clock,
  MapPin,
  Wifi,
  WifiOff,
  AlertTriangle,
  CreditCard,
  QrCode,
  Camera,
  RefreshCw,
  Shield,
  CheckCircle2,
  History,
  Calendar,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ClockPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [date] = useState(new Date())

  // Clock state
  const [isConnectedToCompanyWifi, setIsConnectedToCompanyWifi] = useState(false)
  const [isWithinGeofence, setIsWithinGeofence] = useState(false)
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastClockAction, setLastClockAction] = useState<string | null>(null)
  const [lateWarningCount, setLateWarningCount] = useState(2)
  const [currentTime] = useState(new Date().toLocaleTimeString())

  // NFC Card state
  const [nfcCardId, setNfcCardId] = useState("NFC-1001")
  const [isCardActive, setIsCardActive] = useState(true)
  const [isReplacementRequested, setIsReplacementRequested] = useState(false)

  // QR scanning state
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Simulate checking if connected to company WiFi and within geofence
  useEffect(() => {
    // In a real app, this would check the actual WiFi connection and geolocation
    const checkConnectivity = () => {
      // 70% chance of being connected to WiFi for demo purposes
      const wifiConnected = Math.random() > 0.3
      setIsConnectedToCompanyWifi(wifiConnected)

      // 80% chance of being within geofence for demo purposes
      const withinGeofence = Math.random() > 0.2
      setIsWithinGeofence(withinGeofence)
    }

    checkConnectivity()

    // Check connectivity status every 10 seconds
    const interval = setInterval(checkConnectivity, 10000)

    return () => clearInterval(interval)
  }, [])

  // Check if already clocked in (from localStorage for demo)
  useEffect(() => {
    const storedClockInTime = localStorage.getItem("clockInTime")
    if (storedClockInTime) {
      setIsClockedIn(true)
      setClockInTime(storedClockInTime)
    }
  }, [])

  // Standard Clock In/Out
  const handleClockAction = () => {
    if (!isConnectedToCompanyWifi && !isWithinGeofence) {
      toast({
        title: language === "en" ? "Location Verification Failed" : "የአካባቢ ማረጋገጫ አልተሳካም",
        description:
          language === "en"
            ? "You must be connected to company WiFi or within the factory premises to clock in/out"
            : "ለመግባት/ለመውጣት ከኩባንያው ዋይፋይ ጋር መገናኘት ወይም በፋብሪካው ግቢ ውስጥ መሆን አለብዎት",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString()

      if (isClockedIn) {
        // Clock out
        setIsClockedIn(false)
        setClockInTime(null)
        localStorage.removeItem("clockInTime")
        setLastClockAction(`${language === "en" ? "Clocked out at" : "የወጣበት ሰዓት"} ${timeString}`)

        toast({
          title: language === "en" ? "Clocked Out" : "ወጣህ",
          description:
            language === "en" ? `You have successfully clocked out at ${timeString}` : `በ${timeString} በተሳካ ሁኔታ ወጥተሃል`,
        })
      } else {
        // Clock in
        setIsClockedIn(true)
        setClockInTime(timeString)
        localStorage.setItem("clockInTime", timeString)
        setLastClockAction(`${language === "en" ? "Clocked in at" : "የገባበት ሰዓት"} ${timeString}`)

        // Check if late (for demo purposes, consider 8:00 AM as start time)
        const hour = now.getHours()
        const minute = now.getMinutes()
        const isLate = hour > 8 || (hour === 8 && minute > 0)

        if (isLate) {
          toast({
            title: language === "en" ? "Late Clock-In" : "የዘገየ መግቢያ",
            description:
              language === "en"
                ? `You are clocking in late. This is your ${lateWarningCount}nd late arrival this month.`
                : `በዘገየ ሰዓት እየገባህ ነው። ይህ በዚህ ወር ውስጥ ${lateWarningCount}ኛ የዘገየ መምጣትህ ነው።`,
            variant: "warning",
          })
        } else {
          toast({
            title: language === "en" ? "Clocked In" : "ገባህ",
            description:
              language === "en" ? `You have successfully clocked in at ${timeString}` : `በ${timeString} በተሳካ ሁኔታ ገብተሃል`,
          })
        }
      }

      setIsLoading(false)
    }, 1500)
  }

  // NFC Card functions
  const handleRequestReplacement = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsReplacementRequested(true)
      setIsLoading(false)

      toast({
        title: language === "en" ? "Replacement Requested" : "መተኪያ ተጠይቋል",
        description:
          language === "en" ? "Your NFC card replacement request has been submitted" : "የእርስዎ NFC ካርድ መተኪያ ጥያቄ ቀርቧል",
      })
    }, 1500)
  }

  const handleToggleCardStatus = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsCardActive(!isCardActive)
      setIsLoading(false)

      toast({
        title: isCardActive
          ? language === "en"
            ? "Card Deactivated"
            : "ካርድ ተሰናክሏል"
          : language === "en"
            ? "Card Activated"
            : "ካርድ ተንቀሳቅሷል",
        description: isCardActive
          ? language === "en"
            ? "Your NFC card has been deactivated"
            : "የእርስዎ NFC ካርድ ተሰናክሏል"
          : language === "en"
            ? "Your NFC card has been activated"
            : "የእርስዎ NFC ካርድ ተንቀሳቅሷል",
      })
    }, 1500)
  }

  // QR Code functions
  const startScanning = async () => {
    setIsScanning(true)
    setScanResult(null)

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraPermission(true)

        // Simulate successful scan after 3 seconds
        setTimeout(() => {
          if (isScanning) {
            const mockQrData = "RONA-FACTORY-CHECKIN-" + Math.floor(Math.random() * 1000000)
            setScanResult(mockQrData)
            setIsScanning(false)

            // Stop camera stream
            if (videoRef.current && videoRef.current.srcObject) {
              const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
              tracks.forEach((track) => track.stop())
            }
          }
        }, 3000)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraPermission(false)
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)

    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const handleClockInWithQr = () => {
    if (!scanResult) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsClockedIn(true)
      const timeString = new Date().toLocaleTimeString()
      setClockInTime(timeString)
      localStorage.setItem("clockInTime", timeString)

      toast({
        title: language === "en" ? "Successfully Clocked In" : "በተሳካ ሁኔታ ገብተዋል",
        description:
          language === "en" ? "Your attendance has been recorded via QR code" : "የእርስዎ መገኘት በQR ኮድ አማካኝነት ተመዝግቧል",
      })

      setIsLoading(false)
      setScanResult(null)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Status Banner */}
      <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{language === "en" ? "Clock In/Out" : "ግባ/ውጣ"}</h1>
            <p className="text-purple-100">
              {date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div
            className={`mt-3 flex items-center rounded-full px-4 py-2 md:mt-0 ${
              isClockedIn ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <Clock className="mr-2 h-5 w-5" />
            <span className="font-medium">
              {isClockedIn
                ? language === "en"
                  ? `Clocked in at ${clockInTime}`
                  : `በ${clockInTime} ገብቷል`
                : language === "en"
                  ? "Not clocked in"
                  : "አልገባም"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Clock In Methods */}
          <Card className="mb-6 overflow-hidden">
            <CardHeader className="bg-gray-50 pb-2">
              <CardTitle>{language === "en" ? "Attendance Methods" : "የመገኘት ዘዴዎች"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Choose your preferred method to clock in or out"
                  : "ለመግባት ወይም ለመውጣት የሚፈልጉትን ዘዴ ይምረጡ"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-none border-b p-0">
                  <TabsTrigger
                    value="standard"
                    className="rounded-none border-r data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {language === "en" ? "Standard" : "መደበኛ"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="nfc"
                    className="rounded-none border-r data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {language === "en" ? "NFC Card" : "NFC ካርድ"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="qr"
                    className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    {language === "en" ? "QR Code" : "QR ኮድ"}
                  </TabsTrigger>
                </TabsList>

                {/* Standard Clock In/Out Tab */}
                <TabsContent value="standard" className="p-4">
                  <div className="space-y-4">
                    {/* Status Indicators */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div
                        className={`rounded-lg p-3 ${isConnectedToCompanyWifi ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`}
                      >
                        <div className="flex items-center">
                          {isConnectedToCompanyWifi ? (
                            <Wifi className="h-5 w-5 text-green-600" />
                          ) : (
                            <WifiOff className="h-5 w-5 text-amber-600" />
                          )}
                          <span
                            className={`ml-2 font-medium ${isConnectedToCompanyWifi ? "text-green-700" : "text-amber-700"}`}
                          >
                            {isConnectedToCompanyWifi
                              ? language === "en"
                                ? "Connected to WiFi"
                                : "ከዋይፋይ ጋር ተገናኝቷል"
                              : language === "en"
                                ? "Not connected to WiFi"
                                : "ከዋይፋይ ጋር አልተገናኘም"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`rounded-lg p-3 ${isWithinGeofence ? "bg-green-50 border border-green-100" : "bg-amber-50 border border-amber-100"}`}
                      >
                        <div className="flex items-center">
                          <MapPin className={`h-5 w-5 ${isWithinGeofence ? "text-green-600" : "text-amber-600"}`} />
                          <span
                            className={`ml-2 font-medium ${isWithinGeofence ? "text-green-700" : "text-amber-700"}`}
                          >
                            {isWithinGeofence
                              ? language === "en"
                                ? "Within factory premises"
                                : "በፋብሪካው ግቢ ውስጥ"
                              : language === "en"
                                ? "Outside factory premises"
                                : "ከፋብሪካው ግቢ ውጪ"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Clock Status */}
                    <div className="rounded-lg bg-gray-50 p-6 text-center">
                      <div className="mb-2 text-3xl font-bold">
                        {isClockedIn ? (
                          <span className="text-green-600">
                            {language === "en" ? "Currently Clocked In" : "አሁን ገብቷል"}
                          </span>
                        ) : (
                          <span className="text-red-600">{language === "en" ? "Not Clocked In" : "አልገባም"}</span>
                        )}
                      </div>
                      {isClockedIn && clockInTime && (
                        <p className="text-gray-600">
                          {language === "en" ? `Since ${clockInTime}` : `ከ${clockInTime} ጀምሮ`}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full ${isClockedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                      size="lg"
                      disabled={isLoading || (!isConnectedToCompanyWifi && !isWithinGeofence)}
                      onClick={handleClockAction}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          {language === "en" ? "Processing..." : "በማስኬድ ላይ..."}
                        </span>
                      ) : isClockedIn ? (
                        <span className="flex items-center">
                          <Clock className="mr-2 h-5 w-5" />
                          {language === "en" ? "Clock Out" : "ውጣ"}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Clock className="mr-2 h-5 w-5" />
                          {language === "en" ? "Clock In" : "ግባ"}
                        </span>
                      )}
                    </Button>

                    {lastClockAction && (
                      <div className="rounded-lg bg-gray-100 p-3 text-center text-sm text-gray-600">
                        {lastClockAction}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* NFC Card Tab */}
                <TabsContent value="nfc" className="p-4">
                  <div className="space-y-4">
                    {/* NFC Card Display */}
                    <div className="flex justify-center">
                      <div className="h-48 w-80 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-5 shadow-lg">
                        <div className="flex h-full flex-col justify-between text-white">
                          <div className="flex justify-between">
                            <div className="text-lg font-bold">Rona</div>
                            <Shield className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="mb-1 text-xs opacity-80">
                              {language === "en" ? "Card ID" : "የካርድ መታወቂያ"}
                            </div>
                            <div className="text-xl font-bold">{nfcCardId}</div>
                            <div className="mt-2 flex items-center text-sm">
                              <div
                                className={`mr-2 h-2 w-2 rounded-full ${isCardActive ? "bg-green-400" : "bg-red-400"}`}
                              ></div>
                              <span>
                                {isCardActive
                                  ? language === "en"
                                    ? "Active"
                                    : "ንቁ"
                                  : language === "en"
                                    ? "Inactive"
                                    : "ቦዝኗል"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Status Controls */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 rounded-lg border p-4">
                        <Label htmlFor="card-status" className="text-sm font-medium">
                          {language === "en" ? "Card Status" : "የካርድ ሁኔታ"}
                        </Label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {isCardActive
                              ? language === "en"
                                ? "Active"
                                : "ንቁ"
                              : language === "en"
                                ? "Inactive"
                                : "ቦዝኗል"}
                          </span>
                          <Switch
                            id="card-status"
                            checked={isCardActive}
                            onCheckedChange={handleToggleCardStatus}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 rounded-lg border p-4">
                        <Label htmlFor="card-id" className="text-sm font-medium">
                          {language === "en" ? "Card ID" : "የካርድ መታወቂያ"}
                        </Label>
                        <Input id="card-id" value={nfcCardId} readOnly className="bg-gray-50" />
                      </div>
                    </div>

                    {/* Clock Status */}
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      {isClockedIn ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-700">
                            {language === "en" ? "Currently clocked in" : "አሁን ገብቷል"}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-600">
                          {language === "en"
                            ? "Tap your NFC card on the reader to clock in"
                            : "ለመግባት NFC ካርድዎን በማንበቢያው ላይ ይንኩ"}
                        </p>
                      )}
                    </div>

                    {/* Request Replacement Button */}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleRequestReplacement}
                      disabled={isLoading || isReplacementRequested}
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      {isReplacementRequested
                        ? language === "en"
                          ? "Replacement Requested"
                          : "መተኪያ ተጠይቋል"
                        : language === "en"
                          ? "Request Replacement Card"
                          : "የመተኪያ ካርድ ይጠይቁ"}
                    </Button>
                  </div>
                </TabsContent>

                {/* QR Code Tab */}
                <TabsContent value="qr" className="p-4">
                  <div className="space-y-4">
                    {/* QR Scanner */}
                    <div className="mx-auto aspect-square max-w-xs overflow-hidden rounded-lg bg-black">
                      {isScanning ? (
                        <div className="relative h-full w-full">
                          <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline />
                          <div className="absolute inset-0 border-2 border-purple-500 rounded-lg"></div>
                          <div
                            className="absolute left-0 right-0 h-1 bg-purple-500 animate-scan"
                            style={{ boxShadow: "0 0 8px 2px rgba(139, 92, 246, 0.8)" }}
                          ></div>
                        </div>
                      ) : scanResult ? (
                        <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4">
                          <QrCode className="mb-4 h-16 w-16 text-purple-600" />
                          <p className="text-center font-medium">
                            {language === "en" ? "QR Code Scanned!" : "QR ኮድ ተቃንቷል!"}
                          </p>
                          <p className="mt-2 text-center text-xs text-gray-500 break-all">{scanResult}</p>
                        </div>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4">
                          <Camera className="mb-4 h-16 w-16 text-gray-400" />
                          <p className="text-center text-gray-600">
                            {language === "en" ? "Press the button below to scan" : "ለመቃኘት ከታች ያለውን ቁልፍ ይጫኑ"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Camera Permission Alert */}
                    {cameraPermission === false && (
                      <Alert variant="destructive">
                        <AlertTitle>{language === "en" ? "Camera Access Denied" : "የካሜራ መዳረሻ ተከልክሏል"}</AlertTitle>
                        <AlertDescription>
                          {language === "en"
                            ? "Please allow camera access to scan QR codes"
                            : "እባክዎ QR ኮዶችን ለመቃኘት የካሜራ መዳረሻን ይፍቀዱ"}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* QR Scan Button */}
                    {scanResult ? (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="lg"
                        onClick={handleClockInWithQr}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        {language === "en" ? "Confirm Clock In" : "መግቢያን ያረጋግጡ"}
                      </Button>
                    ) : isScanning ? (
                      <Button variant="outline" className="w-full" size="lg" onClick={stopScanning}>
                        {language === "en" ? "Cancel Scanning" : "ቃኝትን ይሰርዙ"}
                      </Button>
                    ) : (
                      <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" onClick={startScanning}>
                        <Camera className="mr-2 h-4 w-4" />
                        {language === "en" ? "Start Scanning" : "ቃኝት ይጀምሩ"}
                      </Button>
                    )}

                    {/* QR Info */}
                    <Alert className="bg-blue-50 border-blue-100">
                      <QrCode className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">
                        {language === "en" ? "QR Code Check-In" : "በQR ኮድ መግቢያ"}
                      </AlertTitle>
                      <AlertDescription className="text-blue-700">
                        {language === "en"
                          ? "Scan the QR code displayed at your workplace entrance or kiosk"
                          : "በስራ ቦታዎ መግቢያ ወይም ኪዮስክ ላይ የሚታየውን QR ኮድ ይቃኙ"}
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Late Warning Alert */}
          {lateWarningCount >= 2 && (
            <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">
                {language === "en" ? "Late Arrival Warning" : "የዘገየ መምጣት ማስጠንቀቂያ"}
              </AlertTitle>
              <AlertDescription className="text-amber-700">
                {language === "en"
                  ? `You have been late ${lateWarningCount} times this month. Please ensure you arrive on time.`
                  : `በዚህ ወር ${lateWarningCount} ጊዜ ዘግይተሃል። እባክህ በሰዓቱ መድረስህን አረጋግጥ።`}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-6">
          {/* Current Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-purple-500" />
                {language === "en" ? "Current Status" : "የአሁኑ ሁኔታ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{language === "en" ? "Status" : "ሁኔታ"}</span>
                  <span className={`font-medium ${isClockedIn ? "text-green-600" : "text-red-600"}`}>
                    {isClockedIn
                      ? language === "en"
                        ? "Clocked In"
                        : "ገብቷል"
                      : language === "en"
                        ? "Not Clocked In"
                        : "አልገባም"}
                  </span>
                </div>
                {isClockedIn && clockInTime && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{language === "en" ? "Since" : "ከ"}</span>
                    <span className="font-medium">{clockInTime}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{language === "en" ? "Today's Date" : "የዛሬ ቀን"}</span>
                  <span className="font-medium">
                    {date.toLocaleDateString(language === "en" ? "en-US" : "am-ET", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <History className="mr-2 h-5 w-5 text-purple-500" />
                {language === "en" ? "Recent Activity" : "የቅርብ ጊዜ እንቅስቃሴ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{language === "en" ? "Clock In" : "ግባ"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Today, 5:58 AM" : "ዛሬ፣ 5:58 ጠዋት"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {language === "en" ? "On Time" : "በሰዓቱ"}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{language === "en" ? "Clock Out" : "ውጣ"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Yesterday, 2:03 PM" : "ትላንት፣ 2:03 ከሰዓት"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {language === "en" ? "On Time" : "በሰዓቱ"}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{language === "en" ? "Clock In" : "ግባ"}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Yesterday, 6:02 AM" : "ትላንት፣ 6:02 ጠዋት"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    {language === "en" ? "Late" : "የዘገየ"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                {language === "en" ? "Weekly Summary" : "የሳምንታዊ ማጠቃለያ"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{language === "en" ? "Hours Worked" : "የሰራ ሰዓታት"}</span>
                  <span className="font-medium">32.5 {language === "en" ? "hrs" : "ሰዓታት"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{language === "en" ? "On-Time Rate" : "በሰዓቱ የመድረስ መጠን"}</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{language === "en" ? "Overtime" : "ተጨማሪ ሰዓት"}</span>
                  <span className="font-medium">2.5 {language === "en" ? "hrs" : "ሰዓታት"}</span>
                </div>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-4/5 bg-purple-600"></div>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500">
                {language === "en" ? "4 of 5 workdays completed this week" : "በዚህ ሳምንት ከ5 የስራ ቀናት 4 ተጠናቅቋል"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
