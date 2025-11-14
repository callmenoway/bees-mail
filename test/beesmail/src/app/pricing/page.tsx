import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Check, ArrowRight, Zap, Building2, Rocket } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20 max-w-7xl">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">Pricing</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start free and scale as you grow. No hidden fees, no surprises.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {/* Free Tier */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Starter</CardTitle>
            </div>
            <CardDescription>Perfect for trying out BeesMail</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>1,000 messages/month</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>1 sending domain</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Basic templates</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>API access</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Community support</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>7-day log retention</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Tier */}
        <Card className="flex flex-col border-amber-500 border-2 relative">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
            Most Popular
          </Badge>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <CardTitle>Professional</CardTitle>
            </div>
            <CardDescription>For growing teams and applications</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span><strong>50,000 messages/month</strong></span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>5 sending domains</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Advanced templates</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Priority API access</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Email & chat support</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>30-day log retention</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Custom webhooks</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Analytics dashboard</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Team collaboration (5 seats)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/signup?plan=pro">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Tier */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              <CardTitle>Enterprise</CardTitle>
            </div>
            <CardDescription>For large-scale operations</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">Custom</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span><strong>Unlimited messages</strong></span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Unlimited domains</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>White-label solution</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Dedicated infrastructure</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>24/7 phone support</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Custom log retention</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Advanced security features</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>SLA guarantees</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Unlimited team seats</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator className="my-16" />

      {/* Feature Comparison */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Compare features
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold">Professional</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-4">Messages per month</td>
                    <td className="text-center p-4">1,000</td>
                    <td className="text-center p-4">50,000</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Sending domains</td>
                    <td className="text-center p-4">1</td>
                    <td className="text-center p-4">5</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">API access</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Webhooks</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Analytics dashboard</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Team collaboration</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4">5 seats</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Log retention</td>
                    <td className="text-center p-4">7 days</td>
                    <td className="text-center p-4">30 days</td>
                    <td className="text-center p-4">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Support</td>
                    <td className="text-center p-4">Community</td>
                    <td className="text-center p-4">Email & Chat</td>
                    <td className="text-center p-4">24/7 Phone</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">SLA</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4">White-label</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4 text-muted-foreground">-</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-16" />

      {/* FAQ Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Frequently asked questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">What happens if I exceed my plan limit?</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you when you reach 80% of your limit. After exceeding, you can upgrade 
                    or pay for overage at $0.001 per additional message.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Can I change plans at any time?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can upgrade or downgrade at any time. Changes take effect immediately, 
                    and we'll prorate the difference.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Is there a free trial for paid plans?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, Professional and Enterprise plans include a 14-day free trial. 
                    No credit card required to start.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. 
                    Invoicing is available for annual subscriptions.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Can I self-host BeesMail?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! BeesMail is open source. Enterprise customers receive additional support 
                    for self-hosted deployments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-500/20">
          <CardContent className="p-12">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the right plan for your needs.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
