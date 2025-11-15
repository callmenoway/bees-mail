import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Check, ArrowRight, Zap, Building2, Rocket, X } from "lucide-react"
import { getServerTranslations } from "@/lib/server-translations";

export default async function PricingPage() {
  const t = await getServerTranslations();
  
  return (
    <div className="container py-12 md:py-20 max-w-7xl">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">{t.pricing.price}</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          {t.pricing.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.pricing.description}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {/* Free Tier */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{t.pricing.plans.starter.name}</CardTitle>
            </div>
            <CardDescription>{t.pricing.plans.starter.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{t.pricing.plans.starter.price}</span>
              <span className="text-muted-foreground">{t.pricing.plans.starter.time}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.emails}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.domain}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.templates}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.api}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.support}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.starter.feautures.storage}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/register">
                {t.pricing.plans.starter.button}
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
              <CardTitle>{t.pricing.plans.pro.name}</CardTitle>
            </div>
            <CardDescription>{t.pricing.plans.pro.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{t.pricing.plans.pro.price}</span>
              <span className="text-muted-foreground">{t.pricing.plans.pro.time}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span><strong>{t.pricing.plans.pro.feautures.emails}</strong></span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span><strong>{t.pricing.plans.pro.feautures.verify}</strong></span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.domain}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.templates}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.api}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.support}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.logs}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.webhook}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.pro.feautures.dashboard}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/register?plan=pro">
                {t.pricing.plans.pro.button}
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
              <CardTitle>{t.pricing.plans.enterprise.name}</CardTitle>
            </div>
            <CardDescription>{t.pricing.plans.enterprise.description}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">{t.pricing.plans.enterprise.price}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span><strong>{t.pricing.plans.enterprise.feautures.emails}</strong></span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.domain}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.infrastracture}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.infrastracture}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.support}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.logs}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.security}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.team}</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span>{t.pricing.plans.enterprise.feautures.manager}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/contact">
                {t.pricing.plans.enterprise.button}
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
          {t.pricing.plans.comparison.title}
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">{t.pricing.plans.comparison.table.feauture}</th>
                    <th className="text-center p-4 font-semibold">{t.pricing.plans.comparison.table.starter}</th>
                    <th className="text-center p-4 font-semibold">{t.pricing.plans.comparison.table.pro}</th>
                    <th className="text-center p-4 font-semibold">{t.pricing.plans.comparison.table.enterprise}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.messages.title}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.messages.starter}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.messages.pro}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.messages.enterprise}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.domains.title}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.domains.starter}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.domains.pro}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.domains.enterprise}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.api.title}</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.webhook.title}</td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.analytics.title}</td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.team.title}</td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.team.enterprise}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.log.title}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.log.starter}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.log.pro}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.log.enterprise}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">{t.pricing.plans.comparison.rows.support.title}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.support.starter}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.support.pro}</td>
                    <td className="text-center p-4">{t.pricing.plans.comparison.rows.support.enterprise}
                    </td>
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
          {t.pricing.faq.title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">{t.pricing.faq.questions.q1.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.faq.questions.q1.answer}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">{t.pricing.faq.questions.q2.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.faq.questions.q2.answer}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">{t.pricing.faq.questions.q3.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.faq.questions.q3.answer}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">{t.pricing.faq.questions.q4.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.faq.questions.q4.answer}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">{t.pricing.faq.questions.q5.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.pricing.faq.questions.q5.answer}
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
            <h2 className="text-2xl font-bold mb-4">{t.pricing.faq.descriptions.title}</h2>
            <p className="text-muted-foreground mb-6">
              {t.pricing.faq.descriptions.answer}
            </p>
            <Button asChild>
              <Link href="/contact">
                {t.pricing.faq.descriptions.contact}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
