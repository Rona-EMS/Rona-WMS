"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useEffect } from "react"
import { Logo } from "@/components/logo"
import { useSearchParams } from "next/navigation"

export default function CookiePolicyPage() {
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
              <h1 className="mb-4 text-3xl font-bold tracking-tight">Cookie Policy</h1>
              <p className="text-muted-foreground">Last updated: March 31, 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Introduction</h2>
              <p>
                This Cookie Policy explains how Rona Workforce Management System ("we", "us", and "our") uses cookies
                and similar technologies to recognize you when you visit our website. It explains what these
                technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. What are cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners in order to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Rona) are called "first-party cookies". Cookies set by
                parties other than the website owner are called "third-party cookies". Third-party cookies enable
                third-party features or functionality to be provided on or through the website (e.g., advertising,
                interactive content, and analytics). The parties that set these third-party cookies can recognize your
                computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Why do we use cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical
                reasons in order for our website to operate, and we refer to these as "essential" or "strictly
                necessary" cookies. Other cookies also enable us to track and target the interests of our users to
                enhance the experience on our website. Third parties serve cookies through our website for advertising,
                analytics, and other purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. How can you control cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
                setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select
                which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are
                strictly necessary to provide you with services.
              </p>
              <p>
                If you choose to reject cookies, you may still use our website though your access to some functionality
                and areas of our website may be restricted. You may also set or amend your web browser controls to
                accept or refuse cookies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. The specific types of cookies served through our website</h2>
              <p>
                The specific types of first and third-party cookies served through our website and the purposes they
                perform are described below:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-medium">Essential website cookies:</span> These cookies are strictly necessary
                  to provide you with services available through our website and to use some of its features, such as
                  access to secure areas.
                </li>
                <li>
                  <span className="font-medium">Performance and functionality cookies:</span> These cookies are used to
                  enhance the performance and functionality of our website but are non-essential to their use. However,
                  without these cookies, certain functionality may become unavailable.
                </li>
                <li>
                  <span className="font-medium">Analytics and customization cookies:</span> These cookies collect
                  information that is used either in aggregate form to help us understand how our website is being used
                  or how effective our marketing campaigns are, or to help us customize our website for you.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Changes to our Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this
                Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Contact Us</h2>
              <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
              <p className="font-medium">cookies@rona-wms.com</p>
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
