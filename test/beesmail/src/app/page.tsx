import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Zap, 
  Shield, 
  Code2, 
  Gauge, 
  Lock, 
  CheckCircle2,
  ArrowRight,
  Hexagon,
  Database,
  Workflow
} from "lucide-react"
import { getServerTranslations } from "@/lib/server-translations"
import { CodeSnippet } from "@/components/code-snippet"

export default async function Home() {
  const t = await getServerTranslations();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container flex flex-col items-center gap-8 py-20 md:py-32 text-center">
          <Badge variant="secondary" className="gap-1">
            <Hexagon className="h-3 w-3 fill-amber-500 text-amber-500" />
            {t.homepage.bread}
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
            {t.homepage.title.p1}<span className="text-amber-500">{t.homepage.title.p2}</span>{t.homepage.title.p3}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl md:text-xl">
            {t.homepage.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/register">
                {t.homepage.buttons.getStarted}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                {t.homepage.buttons.docs}
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{t.homepage.toasts.t1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{t.homepage.toasts.t2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{t.homepage.toasts.t3}</span>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-32">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">{t.homepage.why.feautures}</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            {t.homepage.why.q1}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.homepage.why.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-amber-500 mb-2" />
              <CardTitle>{t.homepage.why.t1}</CardTitle>
              <CardDescription>
                {t.homepage.why.d1}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code2 className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>{t.homepage.why.t2}</CardTitle>
              <CardDescription>
                {t.homepage.why.d2}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>{t.homepage.why.t3}</CardTitle>
              <CardDescription>
                {t.homepage.why.d3}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Gauge className="h-10 w-10 text-purple-500 mb-2" />
              <CardTitle>{t.homepage.why.t4}</CardTitle>
              <CardDescription>
                {t.homepage.why.d4}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>{t.homepage.why.t5}</CardTitle>
              <CardDescription>
                {t.homepage.why.d5}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Workflow className="h-10 w-10 text-pink-500 mb-2" />
              <CardTitle>{t.homepage.why.t6}</CardTitle>
              <CardDescription>
                {t.homepage.why.d6}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Protocol Section */}
      <section className="container py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              <Hexagon className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
              {t.homepage.protocol.badge}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t.homepage.protocol.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t.homepage.protocol.description}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">{t.homepage.protocol.feautures.t1}</div>
                  <div className="text-sm text-muted-foreground">{t.homepage.protocol.feautures.d1}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">{t.homepage.protocol.feautures.t2}</div>
                  <div className="text-sm text-muted-foreground">{t.homepage.protocol.feautures.d2}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">{t.homepage.protocol.feautures.t3}</div>
                  <div className="text-sm text-muted-foreground">{t.homepage.protocol.feautures.d3}</div>
                </div>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/docs/protocol">
                {t.homepage.protocol.learnMore}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <CodeSnippet
            title={t.homepage.protocol.example}
            language="typescript"
            code={`import { client } from '@beesmail/client'

const result = await client.messages.send({
  to: 'user:beesmail',
  subject: 'Hello from Honeycomb!',
  body: 'This message is type-safe! ✨',
  attachments: [
    { url: 's3://bucket/file.pdf' }
  ]
})

// Type-safe response
console.log(result.messageId)`}
          />
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <Card className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-500/20">
          <CardContent className="flex flex-col items-center text-center gap-6 p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl">
              {t.homepage.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              {t.homepage.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  {t.homepage.cta.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  {t.homepage.cta.button2}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
