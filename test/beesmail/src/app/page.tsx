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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container flex flex-col items-center gap-8 py-20 md:py-32 text-center">
          <Badge variant="secondary" className="gap-1">
            <Hexagon className="h-3 w-3 fill-amber-500 text-amber-500" />
            Introducing the Honeycomb Protocol
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
            Email, <span className="text-amber-500">reimagined</span> for developers
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl md:text-xl">
            Replace SMTP with direct API calls. Built with Next.js, tRPC, and PostgreSQL. 
            Type-safe, ultra-fast, and designed for modern applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                Read Documentation
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Open source</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Self-hostable</span>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-32">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Why BeesMail?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern approach to messaging that developers actually want to use
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-amber-500 mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Direct API calls replace SMTP. No more slow mail queues or delivery delays.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code2 className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>End-to-End Type Safety</CardTitle>
              <CardDescription>
                Built with tRPC and Zod. Catch errors at compile time, not runtime.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Enterprise-grade encryption, authentication, and compliance out of the box.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Gauge className="h-10 w-10 text-purple-500 mb-2" />
              <CardTitle>Optimized for Performance</CardTitle>
              <CardDescription>
                PostgreSQL with strategic indexing. Query optimization for instant inbox refresh.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="h-10 w-10 text-orange-500 mb-2" />
              <CardTitle>Powered by Prisma</CardTitle>
              <CardDescription>
                Type-safe database access with migrations, introspection, and incredible DX.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Workflow className="h-10 w-10 text-pink-500 mb-2" />
              <CardTitle>tRPC Integration</CardTitle>
              <CardDescription>
                Seamless RPC calls with automatic validation and type inference across your stack.
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
              Honeycomb Protocol
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              A protocol built for the modern web
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The Honeycomb Protocol replaces traditional SMTP with direct server-to-server API communication. 
              No more dealing with ancient email standards.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">Type-Safe Schema</div>
                  <div className="text-sm text-muted-foreground">Validate messages with Zod before they leave your server</div>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">Real-Time Delivery</div>
                  <div className="text-sm text-muted-foreground">Instant message delivery with built-in retry logic</div>
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                <div>
                  <div className="font-semibold">Rich Attachments</div>
                  <div className="text-sm text-muted-foreground">S3-compatible storage for files with automatic handling</div>
                </div>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/docs/protocol">
                Learn About Honeycomb
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-sm font-mono text-muted-foreground">Example: Sending a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm overflow-x-auto">
                <code>{`import { client } from '@beesmail/client'

const result = await client.messages.send({
  to: 'user@example.com',
  subject: 'Hello from Honeycomb!',
  body: 'This message is type-safe! ✨',
  attachments: [
    { url: 's3://bucket/file.pdf' }
  ]
})

// Type-safe response
console.log(result.messageId)`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <Card className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-500/20">
          <CardContent className="flex flex-col items-center text-center gap-6 p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl">
              Ready to modernize your messaging infrastructure?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Join developers building the future of email. Get started in minutes, scale to millions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
