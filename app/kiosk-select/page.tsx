"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMockData } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/context/auth-context"
import { ConsistentClock } from "@/components/consistent-clock"
import { Cpu, Factory, Search } from "lucide-react"

export default function KioskSelectPage() {
  const { factories } = useMockData()
  const { login } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFactory, setSelectedFactory] = useState<string | null>(null)
  const router = useRouter()

  const filteredFactories = factories.filter(
    (factory) =>
      factory.name.toLowerCase().includes(searchTerm.toLowerCase()) || factory.id.toString().includes(searchTerm),
  )

  const handleFactorySelect = async (factoryId: string) => {
    setSelectedFactory(factoryId)
    setIsLoading(true)

    try {
      // Login as kiosk for this factory
      await login("kiosk@rona.com", "kiosk-auth", "kiosk")

      // Store factory ID in localStorage
      localStorage.setItem("currentFactoryId", factoryId)

      // Navigate to kiosk page
      router.push("/kiosk")
    } catch (error) {
      console.error("Error logging into kiosk:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-purple-700 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rona Factory Kiosks</h1>
          <ConsistentClock variant="header" className="text-white" />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <Cpu className="h-10 w-10 text-purple-700" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Kiosk App Selector</CardTitle>
              <CardDescription className="text-center">Select a factory to access its kiosk app</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search factories by name or ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredFactories.map((factory) => (
                  <div
                    key={factory.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedFactory === factory.id
                        ? "border-purple-500 bg-purple-50"
                        : "hover:border-purple-200 hover:bg-purple-50"
                    }`}
                    onClick={() => handleFactorySelect(factory.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        {factory.branding?.logo ? (
                          <img
                            src={factory.branding.logo || "/placeholder.svg"}
                            alt={factory.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <Factory className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{factory.name}</h3>
                        <p className="text-xs text-gray-500">ID: {factory.id}</p>
                      </div>
                    </div>
                    <div
                      className="h-2 w-full rounded-full mt-2"
                      style={{ backgroundColor: factory.branding?.primaryColor || "#6366f1" }}
                    ></div>
                  </div>
                ))}

                {filteredFactories.length === 0 && (
                  <div className="col-span-full p-8 text-center text-gray-500">
                    No factories found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => router.push("/login")} className="mr-2">
                Back to Login
              </Button>
              <Button
                onClick={() => router.push("/kiosk")}
                disabled={!selectedFactory || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Loading..." : "Access Selected Kiosk"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-gray-500 border-t bg-white">
        RONA Workforce Management System © 2023. All rights reserved.
      </footer>
    </div>
  )
}
