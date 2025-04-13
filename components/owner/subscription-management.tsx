"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, CreditCard, Download, Info, Shield, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function SubscriptionManagement() {
  const [selectedPlan, setSelectedPlan] = useState("standard")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [currency, setCurrency] = useState("ETB")

  const plans = {
    basic: {
      name: "Basic",
      price: {
        ETB: { monthly: 5000, quarterly: 13500, annual: 48000 },
        USD: { monthly: 150, quarterly: 405, annual: 1440 },
      },
      features: [
        "Up to 50 workers",
        "Basic attendance tracking",
        "Shift management",
        "Email support",
        "Mobile app access",
      ],
    },
    standard: {
      name: "Standard",
      price: {
        ETB: { monthly: 10000, quarterly: 27000, annual: 96000 },
        USD: { monthly: 300, quarterly: 810, annual: 2880 },
      },
      features: [
        "Up to 150 workers",
        "Advanced attendance tracking",
        "Shift management",
        "Payroll processing",
        "Basic reporting",
        "Email & phone support",
        "Mobile app access",
      ],
    },
    premium: {
      name: "Premium",
      price: {
        ETB: { monthly: 20000, quarterly: 54000, annual: 192000 },
        USD: { monthly: 600, quarterly: 1620, annual: 5760 },
      },
      features: [
        "Unlimited workers",
        "Advanced attendance tracking",
        "Shift management",
        "Payroll processing",
        "Advanced reporting",
        "Multi-location support",
        "Priority support 24/7",
        "Mobile app access",
        "API access",
      ],
    },
  }

  const getPrice = (plan) => {
    return plans[plan].price[currency][billingCycle]
  }

  const getSavings = (plan) => {
    const monthlyPrice = plans[plan].price[currency].monthly
    const currentPrice = plans[plan].price[currency][billingCycle]

    if (billingCycle === "quarterly") {
      return Math.round(((monthlyPrice * 3 - currentPrice) / (monthlyPrice * 3)) * 100)
    } else if (billingCycle === "annual") {
      return Math.round(((monthlyPrice * 12 - currentPrice) / (monthlyPrice * 12)) * 100)
    }

    return 0
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="bg-[#111827] border-0 mb-4">
          <TabsTrigger value="plans" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Subscription Plans
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Billing History
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription className="text-gray-400">Your active Rona subscription</CardDescription>
                </div>
                <Badge className="bg-gold-500 text-black mt-2 md:mt-0 w-fit">Standard Plan</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Billing Cycle</div>
                    <div className="font-medium">Monthly</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Next Billing Date</div>
                    <div className="font-medium">April 15, 2023</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Amount</div>
                    <div className="font-medium">ETB 10,000</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-2">Subscription Period</div>
                  <Progress value={50} className="h-2 bg-gray-700">
                    <div className="h-full bg-gold-500" style={{ width: "50%" }} />
                  </Progress>
                  <div className="flex justify-between text-xs mt-1">
                    <span>March 15, 2023</span>
                    <span>April 15, 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 border-t border-gray-700 pt-4">
              <Button
                variant="outline"
                className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
                onClick={() =>
                  toast({ title: "Invoice Downloaded", description: "Your subscription invoice has been downloaded." })
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button
                variant="outline"
                className="border-gold-500 text-gold-500 hover:bg-gold-500/10"
                onClick={() =>
                  toast({ title: "Cancellation", description: "Please contact support to cancel your subscription." })
                }
              >
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="inline-flex items-center rounded-md border border-gray-700 p-1">
                <Button
                  variant={billingCycle === "monthly" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "quarterly" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("quarterly")}
                >
                  Quarterly
                </Button>
                <Button
                  variant={billingCycle === "annual" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setBillingCycle("annual")}
                >
                  Annual
                </Button>
              </div>

              <div className="inline-flex items-center rounded-md border border-gray-700 p-1">
                <Button
                  variant={currency === "ETB" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrency("ETB")}
                >
                  ETB
                </Button>
                <Button
                  variant={currency === "USD" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrency("USD")}
                >
                  USD
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(plans).map((plan) => (
              <Card
                key={plan}
                className={`bg-[#111827] border-0 text-white ${selectedPlan === plan ? "ring-2 ring-gold-500" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{plans[plan].name}</span>
                    {plan === "standard" && <Badge className="bg-gold-500 text-black">Popular</Badge>}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {plan === "basic"
                      ? "For small factories"
                      : plan === "standard"
                        ? "For medium-sized factories"
                        : "For large enterprises"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">
                      {currency} {getPrice(plan).toLocaleString()}
                      <span className="text-sm font-normal text-gray-400">
                        /{billingCycle === "monthly" ? "mo" : billingCycle === "quarterly" ? "quarter" : "year"}
                      </span>
                    </div>
                    {billingCycle !== "monthly" && (
                      <div className="text-sm text-green-500 mt-1">
                        Save {getSavings(plan)}% with {billingCycle} billing
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {plans[plan].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={
                      selectedPlan === plan
                        ? "bg-gold-500 text-black hover:bg-gold-600 w-full"
                        : "bg-[#1F2937] hover:bg-[#2D3748] w-full"
                    }
                    onClick={() => {
                      setSelectedPlan(plan)
                      if (plan !== "standard") {
                        toast({
                          title: "Plan Selected",
                          description: `You've selected the ${plans[plan].name} plan. Proceed to checkout to complete your subscription change.`,
                        })
                      } else {
                        toast({
                          title: "Current Plan",
                          description: "You are already subscribed to the Standard plan.",
                        })
                      }
                    }}
                  >
                    {selectedPlan === plan ? (plan === "standard" ? "Current Plan" : "Selected") : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedPlan !== "standard" && (
            <Card className="bg-[#111827] border-0 text-white">
              <CardHeader>
                <CardTitle>Change Subscription</CardTitle>
                <CardDescription className="text-gray-400">Review your subscription change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Current Plan</div>
                      <div className="p-3 rounded-md bg-[#1F2937]">
                        <div className="font-medium">Standard Plan</div>
                        <div className="text-sm text-gray-400">ETB 10,000/month</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">New Plan</div>
                      <div className="p-3 rounded-md bg-[#1F2937]">
                        <div className="font-medium">{plans[selectedPlan].name} Plan</div>
                        <div className="text-sm text-gray-400">
                          {currency} {getPrice(selectedPlan).toLocaleString()}/
                          {billingCycle === "monthly" ? "month" : billingCycle === "quarterly" ? "quarter" : "year"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-[#1F2937] border-l-4 border-gold-500">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-gold-500 mr-2 shrink-0" />
                      <div>
                        <div className="font-medium">Subscription Change Information</div>
                        <div className="text-sm text-gray-400">
                          Your new subscription will take effect immediately. You will be charged the prorated
                          difference for the remainder of your current billing cycle.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  className="bg-gold-500 text-black hover:bg-gold-600"
                  onClick={() =>
                    toast({ title: "Proceeding to Checkout", description: "Redirecting to payment page..." })
                  }
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-400 hover:bg-gray-700/50"
                  onClick={() => setSelectedPlan("standard")}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription className="text-gray-400">View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Invoice #</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">Plan</TableHead>
                    <TableHead className="text-gray-400">Payment Method</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">INV-2023-0315</TableCell>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>ETB 10,000</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-400 hover:text-white"
                        onClick={() =>
                          toast({ title: "Downloading Invoice", description: "Your invoice is being downloaded..." })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">INV-2023-0215</TableCell>
                    <TableCell>Feb 15, 2023</TableCell>
                    <TableCell>ETB 10,000</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-400 hover:text-white"
                        onClick={() =>
                          toast({ title: "Downloading Invoice", description: "Your invoice is being downloaded..." })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">INV-2023-0115</TableCell>
                    <TableCell>Jan 15, 2023</TableCell>
                    <TableCell>ETB 10,000</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-400 hover:text-white"
                        onClick={() =>
                          toast({ title: "Downloading Invoice", description: "Your invoice is being downloaded..." })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="font-medium">INV-2022-1215</TableCell>
                    <TableCell>Dec 15, 2022</TableCell>
                    <TableCell>ETB 10,000</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 text-black">Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-gray-400 hover:text-white"
                        onClick={() =>
                          toast({ title: "Downloading Invoice", description: "Your invoice is being downloaded..." })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription className="text-gray-400">Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-[#1F2937] border border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Telebirr</div>
                      <div className="text-sm text-gray-400">+251 91*****67</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-black">Default</Badge>
                </div>

                <div className="p-4 rounded-md bg-[#1F2937] border border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-gray-400">Commercial Bank of Ethiopia</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-gray-400 hover:text-white"
                    onClick={() =>
                      toast({ title: "Set as Default", description: "Bank Transfer set as default payment method." })
                    }
                  >
                    Set as Default
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="bg-gold-500 text-black hover:bg-gold-600"
                  onClick={() => toast({ title: "Add Payment Method", description: "Opening payment method form..." })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-0 text-white">
            <CardHeader>
              <CardTitle>Payment Security</CardTitle>
              <CardDescription className="text-gray-400">Your payment information is secure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-md bg-[#1F2937] border-l-4 border-green-500">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <div>
                    <div className="font-medium">Secure Payment Processing</div>
                    <div className="text-sm text-gray-400">
                      All payment information is encrypted and securely processed. We do not store your complete payment
                      details on our servers.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
