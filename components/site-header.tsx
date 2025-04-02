"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useSports } from "@/contexts/sports-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { availableSports } = useSports()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/search",
      label: "Search Athletes",
      active: pathname === "/search",
    },
    {
      href: "/methodology",
      label: "Methodology",
      active: pathname === "/methodology",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span className="font-bold">Sports ELO</span>
        </Link>

        {!isMobile ? (
          <nav className="ml-auto flex items-center space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    pathname.includes("/leaderboards") ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Leaderboards
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {availableSports.map((sport) => (
                  <DropdownMenuItem key={sport.id} disabled={!sport.isActive}>
                    <Link
                      href={sport.route}
                      className={cn("w-full", !sport.isActive && "opacity-50 cursor-not-allowed")}
                    >
                      {sport.name}
                      {!sport.isActive && " (Coming Soon)"}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        ) : (
          <div className="ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="container pb-4">
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}

            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-2">Leaderboards</p>
              {availableSports.map((sport) => (
                <Link
                  key={sport.id}
                  href={sport.isActive ? sport.route : "#"}
                  className={cn(
                    "block py-1 text-sm transition-colors hover:text-primary",
                    pathname.includes(sport.id) ? "text-primary" : "text-muted-foreground",
                    !sport.isActive && "opacity-50 cursor-not-allowed",
                  )}
                  onClick={() => sport.isActive && setIsMenuOpen(false)}
                >
                  {sport.name}
                  {!sport.isActive && " (Coming Soon)"}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

