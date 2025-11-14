import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Code2, Rocket, ArrowRight } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container py-12 md:py-20 max-w-6xl">
      <div className="mb-12">
        <Badge variant="outline" className="mb-4">
          <BookOpen className="h-3 w-3 mr-1" />
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Everything you need to get started
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Complete guides, API references, and examples to help you integrate BeesMail 
          into your application in minutes.
        </p>
      </div>

      <Tabs defaultValue="quickstart" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
          <TabsTrigger value="sdk">SDKs</TabsTrigger>
        </TabsList>

        {/* Quick Start Tab */}
        <TabsContent value="quickstart" className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-5 w-5 text-amber-500" />
                <CardTitle>Get Started in 5 Minutes</CardTitle>
              </div>
              <CardDescription>
                Follow these steps to send your first message with BeesMail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-sm">1</span>
                  Install the SDK
                </h3>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-bash">{`npm install @beesmail/client
# or
pnpm add @beesmail/client
# or
yarn add @beesmail/client`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-sm">2</span>
                  Initialize the Client
                </h3>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-typescript">{`import { BeesMailClient } from '@beesmail/client'

const client = new BeesMailClient({
  apiKey: process.env.BEESMAIL_API_KEY,
  endpoint: 'https://api.beesmail.dev'
})`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-sm">3</span>
                  Send Your First Message
                </h3>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-typescript">{`const message = await client.messages.send({
  to: 'recipient@example.com',
  from: 'sender@yourdomain.com',
  subject: 'Hello from BeesMail!',
  body: {
    html: '<h1>Welcome!</h1><p>This is your first message.</p>',
    text: 'Welcome! This is your first message.'
  }
})

console.log('Message sent:', message.id)`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <Link href="/signup">
                    Get Your API Key
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs/examples">View More Examples</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Common Patterns */}
          <Card>
            <CardHeader>
              <CardTitle>Common Patterns</CardTitle>
              <CardDescription>Learn how to handle common use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="attachments">
                  <AccordionTrigger>Sending Attachments</AccordionTrigger>
                  <AccordionContent>
                    <Card className="bg-muted/50 mt-2">
                      <CardContent className="p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code className="language-typescript">{`await client.messages.send({
  to: 'user@example.com',
  subject: 'Invoice Attached',
  body: { text: 'Please find your invoice attached.' },
  attachments: [
    {
      filename: 'invoice.pdf',
      content: buffer, // Buffer or base64
      contentType: 'application/pdf'
    }
  ]
})`}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="templates">
                  <AccordionTrigger>Using Templates</AccordionTrigger>
                  <AccordionContent>
                    <Card className="bg-muted/50 mt-2">
                      <CardContent className="p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code className="language-typescript">{`await client.messages.sendTemplate({
  to: 'user@example.com',
  templateId: 'welcome-email',
  variables: {
    name: 'John Doe',
    confirmationUrl: 'https://app.example.com/confirm'
  }
})`}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bulk">
                  <AccordionTrigger>Bulk Sending</AccordionTrigger>
                  <AccordionContent>
                    <Card className="bg-muted/50 mt-2">
                      <CardContent className="p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code className="language-typescript">{`await client.messages.sendBulk({
  messages: [
    { to: 'user1@example.com', subject: 'Hello', ... },
    { to: 'user2@example.com', subject: 'Hello', ... },
  ],
  batchSize: 100 // Send 100 at a time
})`}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="webhooks">
                  <AccordionTrigger>Setting Up Webhooks</AccordionTrigger>
                  <AccordionContent>
                    <Card className="bg-muted/50 mt-2">
                      <CardContent className="p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code className="language-typescript">{`// Receive delivery notifications
import { verifyWebhook } from '@beesmail/client'

export async function POST(request: Request) {
  const signature = request.headers.get('x-beesmail-signature')
  const payload = await request.json()
  
  if (!verifyWebhook(payload, signature)) {
    return new Response('Invalid signature', { status: 401 })
  }
  
  // Handle event
  if (payload.event === 'message.delivered') {
    console.log('Message delivered:', payload.data.messageId)
  }
  
  return new Response('OK')
}`}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Reference Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Complete reference for all BeesMail API endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Messages</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge>POST</Badge>
                        <code className="text-sm">/v1/messages/send</code>
                      </div>
                      <CardDescription>Send a new message</CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/v1/messages/:id</code>
                      </div>
                      <CardDescription>Retrieve a message by ID</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/v1/messages</code>
                      </div>
                      <CardDescription>List all messages with pagination</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive">DELETE</Badge>
                        <code className="text-sm">/v1/messages/:id</code>
                      </div>
                      <CardDescription>Delete a message</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">Templates</h3>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge>POST</Badge>
                        <code className="text-sm">/v1/templates</code>
                      </div>
                      <CardDescription>Create a new template</CardDescription>
                    </CardHeader>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">GET</Badge>
                        <code className="text-sm">/v1/templates/:id</code>
                      </div>
                      <CardDescription>Get template by ID</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <Button asChild>
                <Link href="/docs/api/full">
                  View Full API Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Protocol Tab */}
        <TabsContent value="protocol" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Honeycomb Protocol</CardTitle>
              <CardDescription>
                Learn how Honeycomb replaces SMTP with modern, type-safe API communication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Core Concepts</h3>
                <p className="text-muted-foreground mb-4">
                  The Honeycomb Protocol is designed around direct server-to-server communication 
                  using tRPC for end-to-end type safety.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Code2 className="h-5 w-5 text-amber-500 shrink-0" />
                    <span><strong>Type-Safe Schemas:</strong> All messages validated with Zod before transmission</span>
                  </li>
                  <li className="flex gap-2">
                    <Code2 className="h-5 w-5 text-amber-500 shrink-0" />
                    <span><strong>Direct API Calls:</strong> No intermediary mail servers or queues</span>
                  </li>
                  <li className="flex gap-2">
                    <Code2 className="h-5 w-5 text-amber-500 shrink-0" />
                    <span><strong>Built-in Retry Logic:</strong> Automatic retries with exponential backoff</span>
                  </li>
                  <li className="flex gap-2">
                    <Code2 className="h-5 w-5 text-amber-500 shrink-0" />
                    <span><strong>Real-Time Webhooks:</strong> Instant delivery status notifications</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Message Flow</h3>
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <ol className="space-y-4 text-sm">
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">1</span>
                        <span>Client validates message with Zod schema</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">2</span>
                        <span>Message sent via tRPC to sender's server</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">3</span>
                        <span>Sender's server resolves recipient's server endpoint</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">4</span>
                        <span>Direct API call to recipient's server with authentication</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">5</span>
                        <span>Recipient's server validates and stores message in PostgreSQL</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">6</span>
                        <span>Delivery confirmation sent back to sender</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-3">Security Model</h3>
                <p className="text-muted-foreground mb-4">
                  Every message is authenticated and encrypted using industry-standard protocols.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="auth">
                    <AccordionTrigger>Authentication</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        Server-to-server authentication uses API keys with optional mutual TLS. 
                        All keys are scoped to specific domains and can be revoked instantly.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="encryption">
                    <AccordionTrigger>Encryption</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        All messages are encrypted in transit with TLS 1.3 and at rest using AES-256. 
                        Optional end-to-end encryption available for sensitive content.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="spam">
                    <AccordionTrigger>Spam Prevention</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        Built-in rate limiting, sender reputation system, and content analysis 
                        protect against spam and abuse.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SDKs Tab */}
        <TabsContent value="sdk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>
                Type-safe clients for your favorite languages and frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Node.js / TypeScript</CardTitle>
                    <CardDescription>
                      <code className="text-xs">npm install @beesmail/client</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/sdk/nodejs">View Docs</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Python</CardTitle>
                    <CardDescription>
                      <code className="text-xs">pip install beesmail</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/sdk/python">View Docs</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Go</CardTitle>
                    <CardDescription>
                      <code className="text-xs">go get github.com/beesmail/go-sdk</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/sdk/go">View Docs</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Ruby</CardTitle>
                    <CardDescription>
                      <code className="text-xs">gem install beesmail</code>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/sdk/ruby">View Docs</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Community SDKs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These SDKs are maintained by the community. Want to add yours? Submit a PR!
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Rust</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">PHP</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Java</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
