import Link from "next/link"
import { Hexagon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getServerTranslations } from "@/lib/server-translations"

export async function Footer() {
  const t = await getServerTranslations();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Hexagon className="h-6 w-6 fill-amber-500 text-amber-500" />
              <span>BeesMail</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.product}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.features}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.security}
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.changelog}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.developers}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.documentation}
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.apiReference}
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.sdks}
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.status}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.footer.company}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}