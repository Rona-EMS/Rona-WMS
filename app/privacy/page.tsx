"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useEffect } from "react"
import { Logo } from "@/components/logo"
import { useSearchParams } from "next/navigation"

export default function PrivacyNoticePage() {
  const searchParams = useSearchParams()
  const fromRegister = searchParams.get("from") === "register"

  // Ensure page starts at the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f5ff]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Logo size="md" />
            </Link>
            <ThemeSwitcher />
          </div>
          <div className="flex items-center gap-2">{/* Empty div to maintain layout */}</div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-200/50 -translate-x-1/2 translate-y-1/3"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-200/50 translate-x-1/2 -translate-y-1/3"></div>
        </div>

        <div className="container relative z-10 max-w-4xl py-12">
          <div className="mb-8">
            {fromRegister ? (
              <Link href="/register">
                <Button variant="ghost" className="flex items-center gap-2 pl-0 text-purple-700">
                  <ArrowLeft size={16} />
                  Back to Registration
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button variant="ghost" className="flex items-center gap-2 pl-0 text-purple-700">
                  <ArrowLeft size={16} />
                  Back to Home
                </Button>
              </Link>
            )}
          </div>

          <div className="space-y-8 bg-white p-8 rounded-xl border">
            <div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight">Privacy Notice</h1>
              <p className="text-muted-foreground">Last updated: March 31, 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                At Rona, we respect your privacy and are committed to protecting your personal data. This privacy notice
                will inform you about how we look after your personal data when you visit our website and use our
                Workforce Management System ("Service") and tell you about your privacy rights and how the law protects
                you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person
                can be identified. We may collect, use, store and transfer different kinds of personal data about you
                which we have grouped together as follows:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">Identity Data</span> includes first name, last name, username or similar
                  identifier.
                </li>
                <li>
                  <span className="font-medium">Contact Data</span> includes billing address, delivery address, email
                  address and telephone numbers.
                </li>
                <li>
                  <span className="font-medium">Technical Data</span> includes internet protocol (IP) address, your
                  login data, browser type and version, time zone setting and location, browser plug-in types and
                  versions, operating system and platform, and other technology on the devices you use to access this
                  website.
                </li>
                <li>
                  <span className="font-medium">Profile Data</span> includes your username and password, your interests,
                  preferences, feedback and survey responses.
                </li>
                <li>
                  <span className="font-medium">Usage Data</span> includes information about how you use our website and
                  Service.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal
                data in the following circumstances:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>
                  Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                  fundamental rights do not override those interests.
                </li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally
                lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to
                your personal data to those employees, agents, contractors and other third parties who have a business
                need to know. They will only process your personal data on our instructions and they are subject to a
                duty of confidentiality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
                collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or
                reporting requirements. We may retain your personal data for a longer period in the event of a complaint
                or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal
                data, including the right to:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Cookies</h2>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or
                access cookies. If you disable or refuse cookies, please note that some parts of this website may become
                inaccessible or not function properly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Changes to the Privacy Notice</h2>
              <p>
                We may update our privacy notice from time to time. We will notify you of any changes by posting the new
                privacy notice on this page and updating the "Last updated" date at the top of this privacy notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Contact Us</h2>
              <p>
                If you have any questions about this privacy notice or our privacy practices, please contact our data
                privacy manager at:
              </p>
              <p className="font-medium">privacy@rona-wms.com</p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-12 bg-white">
        <div className="container flex flex-col gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 Rona. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
