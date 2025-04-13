"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/lib/context/language-context"
import { Logo } from "@/components/logo"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would connect to your newsletter service
    console.log("Subscribed:", email)
    setEmail("")
    // Add toast notification here
  }

  return (
    <footer className="w-full border-t bg-gray-50 text-gray-900 border-gray-200">
      {/* Top section with newsletter */}
      <div className="container mx-auto px-4 py-8 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <Logo size="md" href="/" />
            <div className="h-8 w-px bg-gray-300"></div>
            <span className="text-sm font-medium">African Workforce Management</span>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-64 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-700">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:ronaems.et@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="h-4 w-4" />
                ronaems.et@gmail.com
              </a>
              <a
                href="tel:+251985209263"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +251 985 209 263
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="py-4 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500">© 2025 Rona. All rights reserved.</div>
          <div className="mt-2 md:mt-0">
            <span className="text-sm text-gray-500">
              Made by{" "}
              <Link
                href="https://negusmarketing.com/services"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Negus Marketing
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
