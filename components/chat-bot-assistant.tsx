"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Calendar,
  Users,
  DollarSign,
  Clock,
  HelpCircle,
  AlertTriangle,
  Settings,
  FileText,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type Message = {
  id: string
  text: string
  isBot: boolean
}

type QuickAction = {
  id: string
  text: string
  icon: React.ReactNode
  response: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! 👋 How can I help you with Rona workforce management today?",
    isBot: true,
  },
]

const quickActions: QuickAction[] = [
  {
    id: "schedule",
    text: "Shift Scheduling",
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
    response:
      "To schedule shifts, go to the Admin Dashboard > Shifts section. You can create new shifts, assign workers, and set recurring schedules. Would you like more specific instructions?",
  },
  {
    id: "employees",
    text: "Employee Management",
    icon: <Users className="h-4 w-4 text-purple-500" />,
    response:
      "For employee management, visit the Workers section in your Admin Dashboard. You can add new workers, update information, and manage permissions. Need help with a specific employee management task?",
  },
  {
    id: "payroll",
    text: "Payroll Questions",
    icon: <DollarSign className="h-4 w-4 text-purple-500" />,
    response:
      "Our payroll system automatically calculates hours based on clock-ins and approved shifts. Admins can review and process payroll in the Payroll section. What specific payroll question do you have?",
  },
  {
    id: "time",
    text: "Time Tracking",
    icon: <Clock className="h-4 w-4 text-purple-500" />,
    response:
      "Workers can clock in/out using the Clock page or the NFC card system if enabled. Time records are automatically stored and can be reviewed by admins. Do you need help with a specific time tracking feature?",
  },
  {
    id: "emergency",
    text: "Emergency Reporting",
    icon: <AlertTriangle className="h-4 w-4 text-purple-500" />,
    response:
      "For emergencies, workers can use the Emergency Reporting feature in their dashboard. This immediately notifies administrators and owners. Would you like to know more about emergency protocols?",
  },
  {
    id: "settings",
    text: "Account Settings",
    icon: <Settings className="h-4 w-4 text-purple-500" />,
    response:
      "You can manage your account settings, including profile information, notifications, and preferences in the Settings section of your dashboard. What specific settings would you like to adjust?",
  },
  {
    id: "reports",
    text: "Reports & Analytics",
    icon: <FileText className="h-4 w-4 text-purple-500" />,
    response:
      "Owners and admins can access detailed reports and analytics from their respective dashboards. These include attendance reports, productivity metrics, and financial summaries. Which reports are you interested in?",
  },
  {
    id: "help",
    text: "General Help",
    icon: <HelpCircle className="h-4 w-4 text-purple-500" />,
    response:
      "I'm here to help with any questions about Rona Workforce Management. You can also check our documentation for detailed guides and tutorials. What can I assist you with today?",
  },
]

export function ChatBotAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    // Reset quick actions when reopening chat
    if (!isOpen) {
      setShowQuickActions(messages.length <= 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleQuickAction = (action: QuickAction) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: action.text,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setShowQuickActions(false)
    setIsLoading(true)

    // Simulate bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: action.response,
        isBot: true,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Respond with the message about only accepting button questions
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, we currently don't accept typed questions. Please use the quick action buttons for assistance.",
        isBot: true,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)

      // Show quick actions again after this interaction
      setShowQuickActions(true)
    }, 1000)
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-24">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 md:w-96 shadow-lg border-purple-200">
              <CardHeader className="p-4 border-b bg-purple-50 dark:bg-purple-900/20 flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-lg">Rona Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="p-4 h-80 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.isBot ? "bg-muted text-foreground" : "bg-purple-600 text-white"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {(showQuickActions || messages.length > 1) && !isLoading && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Quick actions:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => (
                          <button
                            key={action.id}
                            className="flex items-center gap-2 p-3 bg-white hover:bg-gray-50 text-gray-800 rounded-md border border-gray-200 w-full text-sm font-medium transition-colors"
                            onClick={() => handleQuickAction(action)}
                          >
                            {action.icon}
                            <span>{action.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-2 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-purple-500 hover:bg-purple-600"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center bg-purple-600 hover:bg-purple-700"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
