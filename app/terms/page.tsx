"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useEffect } from "react"
import { Logo } from "@/components/logo"
import { useSearchParams } from "next/navigation"

export default function TermsOfUsePage() {
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
              <h1 className="mb-4 text-3xl font-bold tracking-tight">Terms of Use</h1>
              <p className="text-muted-foreground">Last updated: March 31, 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Rona Workforce Management System ("Service"), you agree to be bound by these
                Terms of Use ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Use License</h2>
              <p>
                Permission is granted to temporarily use the Service for personal, non-commercial transitory viewing
                only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose;</li>
                <li>attempt to decompile or reverse engineer any software contained in the Service;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Disclaimer</h2>
              <p>
                The materials on the Service are provided on an 'as is' basis. Rona makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Limitations</h2>
              <p>
                In no event shall Rona or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the Service, even if Rona or a Rona authorized representative has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on the Service could include technical, typographical, or photographic errors.
                Rona does not warrant that any of the materials on the Service are accurate, complete, or current. Rona
                may make changes to the materials contained on the Service at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Links</h2>
              <p>
                Rona has not reviewed all of the sites linked to its Service and is not responsible for the contents of
                any such linked site. The inclusion of any link does not imply endorsement by Rona of the site. Use of
                any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Modifications</h2>
              <p>
                Rona may revise these Terms of Use for its Service at any time without notice. By using this Service,
                you are agreeing to be bound by the then current version of these Terms of Use.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Ethiopia, without regard to
                its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="font-medium">support@rona-wms.com</p>
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
