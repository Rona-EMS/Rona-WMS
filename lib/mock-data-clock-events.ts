import { subDays, setHours, setMinutes } from "date-fns"

// Define the interface for clock events
export interface ClockEvent {
  id: string
  workerId: string
  workerName: string
  eventType: "clock-in" | "clock-out"
  timestamp: Date
  kioskId: string
  kioskLocation: string
  method: "nfc" | "qr" | "manual"
  status: "normal" | "late" | "early" | "overtime"
  notes?: string
  verifiedBy?: string
}

// Helper function to generate a random time within a range
const randomTime = (baseDate: Date, minHour: number, maxHour: number, minMinute = 0, maxMinute = 59): Date => {
  const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour
  const minute = Math.floor(Math.random() * (maxMinute - minMinute + 1)) + minMinute
  return setMinutes(setHours(baseDate, hour), minute)
}

// Helper function to generate a random status based on time
const getClockInStatus = (time: Date): "normal" | "late" | "early" => {
  const hour = time.getHours()
  const minute = time.getMinutes()

  if (hour < 8 || (hour === 8 && minute <= 0)) return "early"
  if (hour > 8 || (hour === 8 && minute > 10)) return "late"
  return "normal"
}

const getClockOutStatus = (time: Date): "normal" | "overtime" => {
  const hour = time.getHours()
  const minute = time.getMinutes()

  if (hour > 17 || (hour === 17 && minute > 10)) return "overtime"
  return "normal"
}

// Helper function to generate notes based on status
const getLateNotes = (): string => {
  const lateReasons = [
    "Traffic delay",
    "Public transport issues",
    "Family emergency",
    "Medical appointment",
    "Car trouble",
    "Weather conditions",
    "Power outage at home",
    "Childcare issues",
  ]
  return lateReasons[Math.floor(Math.random() * lateReasons.length)]
}

const getOvertimeNotes = (): string => {
  const overtimeReasons = [
    "Production deadline",
    "Emergency maintenance",
    "Covering for absent colleague",
    "Inventory count",
    "Special order processing",
    "Equipment setup for next day",
    "Training new staff",
    "Quality control inspection",
  ]
  return overtimeReasons[Math.floor(Math.random() * overtimeReasons.length)]
}

// Helper function to generate verification info for manual entries
const getVerifier = (): string => {
  const verifiers = ["John Supervisor", "Sarah Manager", "Michael Admin", "Emily HR", "David Security"]
  return verifiers[Math.floor(Math.random() * verifiers.length)]
}

// Generate workers
const workers = [
  { id: "W001", name: "Abebe Kebede" },
  { id: "W002", name: "Tigist Haile" },
  { id: "W003", name: "Dawit Mengistu" },
  { id: "W004", name: "Hiwot Tesfaye" },
  { id: "W005", name: "Yonas Tadesse" },
  { id: "W006", name: "Meron Alemu" },
  { id: "W007", name: "Bereket Solomon" },
  { id: "W008", name: "Rahel Girma" },
  { id: "W009", name: "Henok Bekele" },
  { id: "W010", name: "Selamawit Mulugeta" },
]

// Generate kiosks
const kiosks = [
  { id: "K001", location: "Main Entrance" },
  { id: "K002", location: "Production Floor" },
  { id: "K003", location: "Warehouse" },
  { id: "K004", location: "Admin Building" },
]

// Authentication methods with weighted probabilities
const authMethods: ("nfc" | "qr" | "manual")[] = ["nfc", "nfc", "nfc", "qr", "qr", "manual"]

// Generate clock events for the past 7 days
export const generateClockEvents = (): ClockEvent[] => {
  const events: ClockEvent[] = []
  let eventId = 1

  // Generate data for the past 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = subDays(new Date(), day)

    // For each worker, generate clock in and out events
    workers.forEach((worker) => {
      // 10% chance a worker doesn't have any events on a given day (absent)
      if (Math.random() > 0.9) return

      // Select a kiosk
      const kiosk = kiosks[Math.floor(Math.random() * kiosks.length)]

      // Select authentication method
      const method = authMethods[Math.floor(Math.random() * authMethods.length)]

      // Generate clock-in time (between 7:30 AM and 10:00 AM)
      const clockInTime = randomTime(currentDate, 7, 10, 30, 59)
      const clockInStatus = getClockInStatus(clockInTime)

      // Create clock-in event
      const clockInEvent: ClockEvent = {
        id: `E${eventId++}`,
        workerId: worker.id,
        workerName: worker.name,
        eventType: "clock-in",
        timestamp: clockInTime,
        kioskId: kiosk.id,
        kioskLocation: kiosk.location,
        method,
        status: clockInStatus,
        notes: clockInStatus === "late" ? getLateNotes() : undefined,
        verifiedBy: method === "manual" ? getVerifier() : undefined,
      }

      events.push(clockInEvent)

      // Generate clock-out time (between 4:50 PM and 8:00 PM)
      const clockOutTime = randomTime(currentDate, 16, 20, 0, 59)
      const clockOutStatus = getClockOutStatus(clockOutTime)

      // Create clock-out event
      const clockOutEvent: ClockEvent = {
        id: `E${eventId++}`,
        workerId: worker.id,
        workerName: worker.name,
        eventType: "clock-out",
        timestamp: clockOutTime,
        kioskId: kiosk.id,
        kioskLocation: kiosk.location,
        method,
        status: clockOutStatus,
        notes: clockOutStatus === "overtime" ? getOvertimeNotes() : undefined,
        verifiedBy: method === "manual" ? getVerifier() : undefined,
      }

      events.push(clockOutEvent)
    })
  }

  // Sort events by timestamp (newest first)
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Export the mock data
export const mockClockEvents = generateClockEvents()

// Helper function to get unique kiosk locations from the data
export const getUniqueKioskLocations = (): string[] => {
  const locations = new Set<string>()
  mockClockEvents.forEach((event) => locations.add(event.kioskLocation))
  return Array.from(locations)
}

// Helper function to get unique worker names from the data
export const getUniqueWorkerNames = (): string[] => {
  const names = new Set<string>()
  mockClockEvents.forEach((event) => names.add(event.workerName))
  return Array.from(names)
}
