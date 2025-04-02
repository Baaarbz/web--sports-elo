import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Medal } from "lucide-react"
import { cn } from "@/lib/utils"

type Driver = {
  id: string
  fullName: {
    familyName: string
    givenName: string
  }
  currentElo: number
  highestElo: number
  lowestElo: number
  lastRaceDate: string
}

type MedalType = "gold" | "silver" | "bronze" | undefined

interface DriverCardProps {
  driver: Driver
  rank: number
  medal?: MedalType
}

export function DriverCard({ driver, rank, medal }: DriverCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getMedalColor = (medal: MedalType) => {
    switch (medal) {
      case "gold":
        return "bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900"
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
      case "bronze":
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  const getMedalIcon = (medal: MedalType) => {
    switch (medal) {
      case "gold":
        return <Trophy className="h-4 w-4" />
      case "silver":
        return <Award className="h-4 w-4" />
      case "bronze":
        return <Medal className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Link href={`/leaderboards/formula-one/drivers/${driver.id}`}>
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-md border-2",
          medal === "gold"
            ? "border-yellow-400"
            : medal === "silver"
              ? "border-gray-300"
              : medal === "bronze"
                ? "border-amber-600"
                : "border-transparent",
        )}
      >
        <div className={cn("p-4", medal ? getMedalColor(medal) : "bg-gradient-to-r from-primary/10 to-primary/5")}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full font-bold",
                  medal ? "bg-white/20" : "bg-primary/10 text-primary",
                )}
              >
                {rank}
              </div>
              <h3 className="font-bold text-lg">
                {driver.fullName.givenName} {driver.fullName.familyName}
              </h3>
            </div>
            {medal && (
              <div className="flex items-center gap-1">
                {getMedalIcon(medal)}
                <span className="text-xs font-bold capitalize">{medal}</span>
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="font-bold text-lg">{driver.currentElo}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Highest</p>
              <p className="font-bold text-lg text-green-600 dark:text-green-500">{driver.highestElo}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Lowest</p>
              <p className="font-bold text-lg text-red-600 dark:text-red-500">{driver.lowestElo}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-2 bg-muted/50 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Last race: {formatDate(driver.lastRaceDate)}</span>
          <Badge variant="outline">View Profile</Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}

