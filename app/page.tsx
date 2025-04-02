import Link from "next/link"
import { Trophy3D } from "@/components/trophy-3d"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <section className="flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Sports ELO Rating System
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A statistical approach to ranking athletes across different sports based on their performance over
                  time.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/leaderboards/formula-one">
                  <Button>
                    View Formula One Rankings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/methodology">
                  <Button variant="outline">Learn How It Works</Button>
                </Link>
              </div>
            </div>
            <div className="h-[400px] lg:h-[500px]">
              <Trophy3D />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">About Sports ELO</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Sports ELO is a personal project dedicated to applying the ELO rating system to various sports
              competitions. The system tracks athlete performance over time, providing an objective measure of skill and
              achievement.
            </p>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                This is a personal project and is not affiliated with any sports organization, team, or brand. All
                calculations are based on publicly available data and mathematical models.
              </p>
            </div>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 mt-12">
            {/* Sport Cards */}
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-[180px] flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold">Formula One</h3>
                  <p className="text-sm text-muted-foreground">
                    ELO ratings for Formula One drivers based on race results and field strength.
                  </p>
                </div>
                <Link href="/leaderboards/formula-one">
                  <Button variant="outline" className="w-full">
                    View Rankings
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-[180px] flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold">MotoGP</h3>
                  <p className="text-sm text-muted-foreground">Coming soon - ELO ratings for MotoGP riders.</p>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-[180px] flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold">Boxing</h3>
                  <p className="text-sm text-muted-foreground">Coming soon - ELO ratings for professional boxers.</p>
                </div>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

