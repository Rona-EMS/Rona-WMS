"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/context/language-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { workers, payrollRecords } from "@/lib/mock-data"
import { Check, FileSpreadsheet } from "lucide-react"

// Import the useRouter hook
import { useRouter } from "next/navigation"

export function PayrollProcessor() {
  const [period, setPeriod] = useState("March 2025")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([])

  const { toast } = useToast()
  const { language, t } = useLanguage()

  // Add the router inside the component
  const router = useRouter()

  // Replace the existing handleSelectAllWorkers function with this optimized version
  const handleSelectAllWorkers = React.useCallback(() => {
    if (selectedWorkers.length === workers.length) {
      setSelectedWorkers([])
    } else {
      setSelectedWorkers(workers.map((worker) => worker.id))
    }
  }, [selectedWorkers.length, workers])

  // Replace the existing handleWorkerSelection function with this memoized version
  const handleWorkerSelection = React.useCallback((workerId: string) => {
    setSelectedWorkers((prev) => (prev.includes(workerId) ? prev.filter((id) => id !== workerId) : [...prev, workerId]))
  }, [])

  // Update the process payroll handler to be more efficient
  const handleProcessPayroll = React.useCallback(() => {
    if (selectedWorkers.length === 0) {
      toast({
        title: language === "en" ? "No workers selected" : "ምንም ሰራተኞች አልተመረጡም",
        description:
          language === "en"
            ? "Please select at least one worker to process payroll"
            : "እባክዎ ክፍያ ለማስኬድ ቢያንስ አንድ ሰራተኛ ይምረጡ",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call with optimized approach
    const timeoutId = setTimeout(() => {
      toast({
        title: language === "en" ? "Payroll processed" : "ክፍያ ተከናውኗል",
        description:
          language === "en"
            ? `Successfully processed payroll for ${selectedWorkers.length} workers`
            : `ለ${selectedWorkers.length} ሰራተኞች ክፍያ በተሳካ ሁኔታ ተከናውኗል`,
      })

      setIsProcessing(false)
      setIsProcessed(true)

      // Use router.refresh() instead of a full page reload
      router.refresh()
    }, 1000) // Reduced timeout for better responsiveness

    // Clean up timeout on component unmount
    return () => clearTimeout(timeoutId)
  }, [selectedWorkers, language, toast, router])

  // Make the export payroll handler more interactive
  const handleExportPayroll = () => {
    toast({
      title: language === "en" ? "Exporting payroll" : "ክፍያ በመላክ ላይ",
      description: language === "en" ? "Preparing payroll data for export..." : "የክፍያ ዳታ ለመላክ በማዘጋጀት ላይ...",
    })

    // Simulate export delay
    setTimeout(() => {
      toast({
        title: language === "en" ? "Payroll exported" : "ክፍያ ተልኳል",
        description: language === "en" ? "Payroll data has been exported to Excel" : "የክፍያ ዳታ ወደ Excel ተልኳል",
      })
    }, 1500)
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>{language === "en" ? "Process Payroll" : "ክፍያ አስኪያጅ"}</CardTitle>
        <CardDescription>
          {language === "en" ? "Calculate and process worker payments" : "የሰራተኞችን ክፍያዎች አስላ እና አስኪድ"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
          <div className="space-y-2">
            <Label htmlFor="period">{language === "en" ? "Pay Period" : "የክፍያ ጊዜ"}</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id="period">
                <SelectValue placeholder={language === "en" ? "Select period" : "ጊዜ ይምረጡ"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="March 2025">{language === "en" ? "March 2025" : "መጋቢት 2017"}</SelectItem>
                <SelectItem value="April 2025">{language === "en" ? "April 2025" : "ሚያዝያ 2017"}</SelectItem>
                <SelectItem value="May 2025">{language === "en" ? "May 2025" : "ግንቦት 2017"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-date">{language === "en" ? "Payment Date" : "የክፍያ ቀን"}</Label>
            <Input id="payment-date" type="date" defaultValue="2025-03-31" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{language === "en" ? "Select Workers" : "ሰራተኞችን ይምረጡ"}</Label>
            <Button variant="outline" size="sm" onClick={handleSelectAllWorkers}>
              {selectedWorkers.length === workers.length
                ? language === "en"
                  ? "Deselect All"
                  : "ሁሉንም አትምረጥ"
                : language === "en"
                  ? "Select All"
                  : "ሁሉንም ምረጥ"}
            </Button>
          </div>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">{language === "en" ? "Select" : "ምረጥ"}</TableHead>
                  <TableHead>{language === "en" ? "ID" : "መታወቂያ"}</TableHead>
                  <TableHead>{language === "en" ? "Name" : "ስም"}</TableHead>
                  <TableHead>{language === "en" ? "Department" : "ክፍል"}</TableHead>
                  <TableHead>{language === "en" ? "Basic Salary" : "መሰረታዊ ደመወዝ"}</TableHead>
                  <TableHead>{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers.map((worker) => {
                  const payroll = payrollRecords.find(
                    (record) => record.workerId === worker.id && record.period === period,
                  )
                  return (
                    <TableRow key={worker.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedWorkers.includes(worker.id)}
                          onChange={() => handleWorkerSelection(worker.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell>{worker.id}</TableCell>
                      <TableCell>{worker.name}</TableCell>
                      <TableCell>{worker.department}</TableCell>
                      <TableCell>{payroll ? payroll.basicSalary : 4000} ETB</TableCell>
                      <TableCell>
                        {payroll ? (
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                              payroll.status === "paid"
                                ? "text-green-800 dark:text-green-400 border-green-800 dark:border-green-400"
                                : "text-yellow-800 dark:text-yellow-400 border-yellow-800 dark:border-yellow-400"
                            }`}
                          >
                            {payroll.status === "paid"
                              ? language === "en"
                                ? "Paid"
                                : "ተከፍሏል"
                              : language === "en"
                                ? "Pending"
                                : "በመጠባበቅ ላይ"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-400 border-blue-800 dark:border-blue-400">
                            {language === "en" ? "Not Processed" : "አልተከናወነም"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            // Reset selections
            setSelectedWorkers([])
          }}
        >
          {language === "en" ? "Cancel" : "ሰርዝ"}
        </Button>
        <div className="flex space-x-2">
          {isProcessed && (
            <Button variant="outline" onClick={handleExportPayroll}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {language === "en" ? "Export to Excel" : "ወደ Excel ላክ"}
            </Button>
          )}
          <Button onClick={handleProcessPayroll} disabled={isProcessing || selectedWorkers.length === 0}>
            {isProcessing ? (
              <span>{language === "en" ? "Processing..." : "በማስኬድ ላይ..."}</span>
            ) : isProcessed ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {language === "en" ? "Processed" : "ተከናውኗል"}
              </>
            ) : (
              <span>{language === "en" ? "Process Payroll" : "ክፍያ አስኪድ"}</span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
