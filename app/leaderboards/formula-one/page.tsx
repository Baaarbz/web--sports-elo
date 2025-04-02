import { Suspense } from "react"
import { FormulaOneLeaderboard } from "@/components/formula-one/leaderboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Formula One Leaderboard - Sports ELO",
  description: "ELO ratings for Formula One drivers based on race results and field strength.",
}

export default function FormulaOnePage() {
  return (
    <div className="container max-w-7xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Formula One ELO Leaderboard</h1>
        <p className="mt-2 text-muted-foreground">Driver rankings based on race performance and field strength</p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-[200px]" />
            ))}
          </div>
        }
      >
        <FormulaOneLeaderboard />
      </Suspense>
    </div>
  )
}

