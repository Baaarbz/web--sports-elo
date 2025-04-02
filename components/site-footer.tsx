import Link from "next/link"
import { Trophy } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sports ELO. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/methodology" className="text-sm text-muted-foreground hover:text-foreground">
            Methodology
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}

