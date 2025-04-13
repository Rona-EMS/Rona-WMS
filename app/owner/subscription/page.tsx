"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useLanguage } from "@/lib/context/language-context"
import { CreditCard, Download, Shield, Check, Info, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function OwnerSubscriptionPage() {
  const { language } = useLanguage?.() || { language: "en" }
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("plans")
  const [selectedPlan, setSelectedPlan] = useState("standard")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [currency, setCurrency] = useState("ETB")

  const plans = {
    basic: {
      name: language === "en" ? "Basic" : "መሰረታዊ",
      price: {
        ETB: { monthly: 5000, quarterly: 13500, annual: 48000 },
        USD: { monthly: 150, quarterly: 405, annual: 1440 },
      },
      features: [
        language === "en" ? "Up to 50 workers" : "እስከ 50 ሰራተኞች",
        language === "en" ? "Basic attendance tracking" : "መሰረታዊ የመገኘት መከታተያ",
        language === "en" ? "Shift management" : "የፈረቃ አስተዳደር",
        language === "en" ? "Email support" : "በኢሜይል ድጋፍ",
        language === "en" ? "Mobile app access" : "የሞባይል መተግበሪያ መዳረሻ",
      ],
    },
    standard: {
      name: language === "en" ? "Standard" : "መደበኛ",
      price: {
        ETB: { monthly: 10000, quarterly: 27000, annual: 96000 },
        USD: { monthly: 300, quarterly: 810, annual: 2880 },
      },
      features: [
        language === "en" ? "Up to 150 workers" : "እስከ 150 ሰራተኞች",
        language === "en" ? "Advanced attendance tracking" : "የላቀ የመገኘት መከታተያ",
        language === "en" ? "Shift management" : "የፈረቃ አስተዳደር",
        language === "en" ? "Payroll processing" : "የደመወዝ ክፍያ አስተዳደር",
        language === "en" ? "Basic reporting" : "መሰረታዊ ሪፖርት አቀራረብ",
        language === "en" ? "Email & phone support" : "በኢሜይል እና በስልክ ድጋፍ",
        language === "en" ? "Mobile app access" : "የሞባይል መተግበሪያ መዳረሻ",
      ],
    },
    premium: {
      name: language === "en" ? "Premium" : "ፕሪሚየም",
      price: {
        ETB: { monthly: 20000, quarterly: 54000, annual: 192000 },
        USD: { monthly: 600, quarterly: 1620, annual: 5760 },
      },
      features: [
        language === "en" ? "Unlimited workers" : "ያልተገደበ የሰራተኞች ብዛት",
        language === "en" ? "Advanced attendance tracking" : "የላቀ የመገኘት መከታተያ",
        language === "en" ? "Shift management" : "የፈረቃ አስተዳደር",
        language === "en" ? "Payroll processing" : "የደመወዝ ክፍያ አስተዳደር",
        language === "en" ? "Advanced reporting" : "የላቀ ሪፖርት አቀራረብ",
        language === "en" ? "Multi-location support" : "ለብዙ ቦታዎች ድጋፍ",
        language === "en" ? "Priority support 24/7" : "ቅድሚያ የሚሰጠው ድጋፍ 24/7",
        language === "en" ? "Mobile app access" : "የሞባይል መተግበሪያ መዳረሻ",
        language === "en" ? "API access" : "API መዳረሻ",
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

  const handleExport = (format: string) => {
    toast({
      title: language === "en" ? `Exporting as ${format}` : `እንደ ${format} በመላክ ላይ`,
      description: language === "en" ? "Your invoice is being prepared for download." : "ደረሰኝዎ ለማውረድ በመዘጋጀት ላይ ነው።",
    })
  }

  return (
    <DashboardShell
      title={language === "en" ? "Subscription Management" : "የደንበኝነት አስተዳደር"}
      description={
        language === "en" ? "Manage your Rona subscription and payment options" : "የሮና ደንበኝነትዎን እና የክፍያ አማራጮችን ያስተዳድሩ"
      }
      headerAction={
        <div className="flex items-center gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={language === "en" ? "Currency" : "ገንዘብ"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETB">ETB</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
            onClick={() =>
              toast({
                title: language === "en" ? "Update Payment Method" : "የክፍያ ዘዴን ያዘምኑ",
                description: language === "en" ? "Opening payment method form..." : "የክፍያ ዘዴ ቅጽ በመክፈት ላይ...",
              })
            }
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {language === "en" ? "Update Payment" : "ክፍያን ያዘምኑ"}
          </Button>
        </div>
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {language === "en" ? "Subscription Plans" : "የደንበኝነት እቅዶች"}
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            {language === "en" ? "Billing History" : "የክፍያ ታሪክ"}
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {language === "en" ? "Payment Methods" : "የክፍያ ዘዴዎች"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{language === "en" ? "Current Subscription" : "የአሁኑ ደንበኝነት"}</CardTitle>
                  <CardDescription>
                    {language === "en" ? "Your active Rona subscription" : "የእርስዎ ንቁ የሮና ደንበኝነት"}
                  </CardDescription>
                </div>
                <Badge className="bg-purple-500 mt-2 md:mt-0 w-fit">
                  {language === "en" ? "Standard Plan" : "መደበኛ እቅድ"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {language === "en" ? "Billing Cycle" : "የክፍያ ዑደት"}
                    </div>
                    <div className="font-medium">{language === "en" ? "Monthly" : "ወርሃዊ"}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {language === "en" ? "Next Billing Date" : "የሚቀጥለው የክፍያ ቀን"}
                    </div>
                    <div className="font-medium">April 15, 2023</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">{language === "en" ? "Amount" : "መጠን"}</div>
                    <div className="font-medium">{currency === "ETB" ? "ETB 10,000" : "USD 300"}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-muted-foreground mb-2">
                    {language === "en" ? "Subscription Period" : "የደንበኝነት ጊዜ"}
                  </div>
                  <Progress value={50} className="h-2">
                    <div className="h-full bg-purple-500" style={{ width: "50%" }} />
                  </Progress>
                  <div className="flex justify-between text-xs mt-1">
                    <span>March 15, 2023</span>
                    <span>April 15, 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 border-t pt-4">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                onClick={() => handleExport("PDF")}
              >
                <Download className="h-4 w-4 mr-2" />
                {language === "en" ? "Download Invoice" : "ደረሰኝ አውርድ"}
              </Button>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
                onClick={() =>
                  toast({
                    title: language === "en" ? "Cancellation" : "ስረዛ",
                    description:
                      language === "en"
                        ? "Please contact support to cancel your subscription."
                        : "ደንበኝነትዎን ለመሰረዝ እባክዎን ድጋፍን ያግኙ።",
                  })
                }
              >
                {language === "en" ? "Cancel Subscription" : "ደንበኝነትን ይሰርዙ"}
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="inline-flex items-center rounded-md border p-1">
              <Button
                variant={billingCycle === "monthly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("monthly")}
              >
                {language === "en" ? "Monthly" : "ወርሃዊ"}
              </Button>
              <Button
                variant={billingCycle === "quarterly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("quarterly")}
              >
                {language === "en" ? "Quarterly" : "ሩብ ዓመታዊ"}
              </Button>
              <Button
                variant={billingCycle === "annual" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("annual")}
              >
                {language === "en" ? "Annual" : "ዓመታዊ"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(plans).map((plan) => (
              <Card key={plan} className={`${selectedPlan === plan ? "ring-2 ring-purple-500" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{plans[plan].name}</span>
                    {plan === "standard" && (
                      <Badge className="bg-purple-500">{language === "en" ? "Popular" : "ታዋቂ"}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {plan === "basic"
                      ? language === "en"
                        ? "For small factories"
                        : "ለትንንሽ ፋብሪካዎች"
                      : plan === "standard"
                        ? language === "en"
                          ? "For medium-sized factories"
                          : "ለመካከለኛ መጠን ያላቸው ፋብሪካዎች"
                        : language === "en"
                          ? "For large enterprises"
                          : "ለትላልቅ ድርጅቶች"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold">
                      {currency} {getPrice(plan).toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">
                        /
                        {billingCycle === "monthly"
                          ? language === "en"
                            ? "mo"
                            : "ወር"
                          : billingCycle === "quarterly"
                            ? language === "en"
                              ? "quarter"
                              : "ሩብ ዓመት"
                            : language === "en"
                              ? "year"
                              : "ዓመት"}
                      </span>
                    </div>
                    {billingCycle !== "monthly" && (
                      <div className="text-sm text-green-500 mt-1">
                        {language === "en"
                          ? `Save ${getSavings(plan)}% with ${billingCycle} billing`
                          : `በ${billingCycle === "quarterly" ? "ሩብ ዓመታዊ" : "ዓመታዊ"} ክፍያ ${getSavings(plan)}% ይቆጥቡ`}
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
                        ? "bg-purple-500 hover:bg-purple-600 w-full"
                        : "bg-muted hover:bg-muted/80 w-full"
                    }
                    onClick={() => {
                      setSelectedPlan(plan)
                      if (plan !== "standard") {
                        toast({
                          title: language === "en" ? "Plan Selected" : "እቅድ ተመርጧል",
                          description:
                            language === "en"
                              ? `You've selected the ${plans[plan].name} plan. Proceed to checkout to complete your subscription change.`
                              : `የ${plans[plan].name} እቅድን መርጠዋል። የደንበኝነት ለውጥዎን ለማጠናቀቅ ወደ ክፍያ ይቀጥሉ።`,
                        })
                      } else {
                        toast({
                          title: language === "en" ? "Current Plan" : "የአሁኑ እቅድ",
                          description:
                            language === "en"
                              ? "You are already subscribed to the Standard plan."
                              : "አስቀድመው ለመደበኛው እቅድ ተመዝግበዋል።",
                        })
                      }
                    }}
                  >
                    {selectedPlan === plan
                      ? plan === "standard"
                        ? language === "en"
                          ? "Current Plan"
                          : "የአሁኑ እቅድ"
                        : language === "en"
                          ? "Selected"
                          : "ተመርጧል"
                      : language === "en"
                        ? "Select Plan"
                        : "እቅድ ይምረጡ"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedPlan !== "standard" && (
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Change Subscription" : "ደንበኝነትን ይቀይሩ"}</CardTitle>
                <CardDescription>
                  {language === "en" ? "Review your subscription change" : "የደንበኝነት ለውጥዎን ይገምግሙ"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {language === "en" ? "Current Plan" : "የአሁኑ እቅድ"}
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <div className="font-medium">{language === "en" ? "Standard Plan" : "መደበኛ እቅድ"}</div>
                        <div className="text-sm text-muted-foreground">
                          {currency === "ETB" ? "ETB 10,000" : "USD 300"}/{language === "en" ? "month" : "ወር"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {language === "en" ? "New Plan" : "አዲስ እቅድ"}
                      </div>
                      <div className="p-3 rounded-md bg-muted">
                        <div className="font-medium">
                          {plans[selectedPlan].name} {language === "en" ? "Plan" : "እቅድ"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currency} {getPrice(selectedPlan).toLocaleString()}/
                          {billingCycle === "monthly"
                            ? language === "en"
                              ? "month"
                              : "ወር"
                            : billingCycle === "quarterly"
                              ? language === "en"
                                ? "quarter"
                                : "ሩብ ዓመት"
                              : language === "en"
                                ? "year"
                                : "ዓመት"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-muted border-l-4 border-purple-500">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-purple-500 mr-2 shrink-0" />
                      <div>
                        <div className="font-medium">
                          {language === "en" ? "Subscription Change Information" : "የደንበኝነት ለውጥ መረጃ"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === "en"
                            ? "Your new subscription will take effect immediately. You will be charged the prorated difference for the remainder of your current billing cycle."
                            : "አዲሱ ደንበኝነትዎ ወዲያውኑ ተግባራዊ ይሆናል። ለአሁኑ የክፍያ ዑደትዎ ቀሪ ጊዜ ተመጣጣኝ ልዩነት ይከፍላሉ።"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() =>
                    toast({
                      title: language === "en" ? "Proceeding to Checkout" : "ወደ ክፍያ በመሄድ ላይ",
                      description: language === "en" ? "Redirecting to payment page..." : "ወደ የክፍያ ገጽ በማዘዋወር ላይ...",
                    })
                  }
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {language === "en" ? "Proceed to Checkout" : "ወደ ክፍያ ይቀጥሉ"}
                </Button>
                <Button
                  variant="outline"
                  className="border-muted-foreground/20 text-muted-foreground hover:bg-muted/50"
                  onClick={() => setSelectedPlan("standard")}
                >
                  {language === "en" ? "Cancel" : "ይቅር"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="billing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Billing History" : "የክፍያ ታሪክ"}</CardTitle>
              <CardDescription>
                {language === "en" ? "View and download your past invoices" : "ያለፉ ደረሰኞችዎን ይመልከቱ እና ያውርዱ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground">
                      {language === "en" ? "Invoice #" : "ደረሰኝ #"}
                    </TableHead>
                    <TableHead className="text-muted-foreground">{language === "en" ? "Date" : "ቀን"}</TableHead>
                    <TableHead className="text-muted-foreground">{language === "en" ? "Amount" : "መጠን"}</TableHead>
                    <TableHead className="text-muted-foreground">{language === "en" ? "Plan" : "እቅድ"}</TableHead>
                    <TableHead className="text-muted-foreground">
                      {language === "en" ? "Payment Method" : "የክፍያ ዘዴ"}
                    </TableHead>
                    <TableHead className="text-muted-foreground">{language === "en" ? "Status" : "ሁኔታ"}</TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      {language === "en" ? "Actions" : "ድርጊቶች"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0315</TableCell>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>{currency === "ETB" ? "ETB 10,000" : "USD 300"}</TableCell>
                    <TableCell>{language === "en" ? "Standard" : "መደበኛ"}</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{language === "en" ? "Paid" : "ተከፍሏል"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          toast({
                            title: language === "en" ? "Downloading Invoice" : "ደረሰኝ በማውረድ ላይ",
                            description:
                              language === "en" ? "Your invoice is being downloaded..." : "ደረሰኝዎ በማውረድ ላይ ነው...",
                          })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {language === "en" ? "Download" : "አውርድ"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0215</TableCell>
                    <TableCell>Feb 15, 2023</TableCell>
                    <TableCell>{currency === "ETB" ? "ETB 10,000" : "USD 300"}</TableCell>
                    <TableCell>{language === "en" ? "Standard" : "መደበኛ"}</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{language === "en" ? "Paid" : "ተከፍሏል"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          toast({
                            title: language === "en" ? "Downloading Invoice" : "ደረሰኝ በማውረድ ላይ",
                            description:
                              language === "en" ? "Your invoice is being downloaded..." : "ደረሰኝዎ በማውረድ ላይ ነው...",
                          })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {language === "en" ? "Download" : "አውርድ"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV-2023-0115</TableCell>
                    <TableCell>Jan 15, 2023</TableCell>
                    <TableCell>{currency === "ETB" ? "ETB 10,000" : "USD 300"}</TableCell>
                    <TableCell>{language === "en" ? "Standard" : "መደበኛ"}</TableCell>
                    <TableCell>Telebirr</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">{language === "en" ? "Paid" : "ተከፍሏል"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          toast({
                            title: language === "en" ? "Downloading Invoice" : "ደረሰኝ በማውረድ ላይ",
                            description:
                              language === "en" ? "Your invoice is being downloaded..." : "ደረሰኝዎ በማውረድ ላይ ነው...",
                          })
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {language === "en" ? "Download" : "አውርድ"}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Payment Methods" : "የክፍያ ዘዴዎች"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Manage your payment options" : "የክፍያ አማራጮችዎን ያስተዳድሩ"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-md border flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Telebirr</div>
                      <div className="text-sm text-muted-foreground">+251 91*****67</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500">{language === "en" ? "Default" : "ነባሪ"}</Badge>
                </div>

                <div className="p-4 rounded-md border flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{language === "en" ? "Bank Transfer" : "የባንክ ዝውውር"}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Commercial Bank of Ethiopia" : "የኢትዮጵያ ንግድ ባንክ"}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      toast({
                        title: language === "en" ? "Set as Default" : "እንደ ነባሪ አዘጋጅ",
                        description:
                          language === "en"
                            ? "Bank Transfer set as default payment method."
                            : "የባንክ ዝውውር እንደ ነባሪ የክፍያ ዘዴ ተዘጋጅቷል።",
                      })
                    }
                  >
                    {language === "en" ? "Set as Default" : "እንደ ነባሪ አዘጋጅ"}
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() =>
                    toast({
                      title: language === "en" ? "Add Payment Method" : "የክፍያ ዘዴ ጨምር",
                      description: language === "en" ? "Opening payment method form..." : "የክፍያ ዘዴ ቅጽ በመክፈት ላይ...",
                    })
                  }
                >
                  {language === "en" ? "Add Payment Method" : "የክፍያ ዘዴ ጨምር"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Payment Security" : "የክፍያ ደህንነት"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Your payment information is secure" : "የክፍያ መረጃዎ ደህንነቱ የተጠበቀ ነው"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-md border-l-4 border-green-500">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <div>
                    <div className="font-medium">
                      {language === "en" ? "Secure Payment Processing" : "ደህንነቱ የተጠበቀ የክፍያ ሂደት"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === "en"
                        ? "All payment information is encrypted and securely processed. We do not store your complete payment details on our servers."
                        : "ሁሉም የክፍያ መረጃዎች ተመስጥረው በደህንነት ይከናወናሉ። ሙሉ የክፍያ ዝርዝሮችዎን በሰርቨሮቻችን ላይ አናከማቸውም።"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
