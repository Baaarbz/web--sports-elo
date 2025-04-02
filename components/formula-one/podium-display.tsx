import Link from "next/link"
import { Trophy } from "lucide-react"

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

interface PodiumDisplayProps {
  drivers: Driver[]
}

export function PodiumDisplay({ drivers }: PodiumDisplayProps) {
  if (drivers.length < 3) return null

  const [first, second, third] = drivers

  return (
    <div className="w-full py-8 mb-8">
      <h2 className="text-2xl font-bold text-center mb-8">Top Drivers</h2>
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-700">2</span>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-xs font-bold">
              Silver
            </div>
          </div>
          <div className="h-24 md:h-32 w-20 bg-gradient-to-t from-gray-200 to-gray-100 mt-4 flex items-center justify-center rounded-t-lg shadow-md">
            <Link href={`/leaderboards/formula-one/drivers/${second.id}`} className="text-center p-2 hover:underline">
              <p className="font-bold truncate max-w-[80px]">{second.fullName.familyName}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[80px]">{second.fullName.givenName}</p>
              <p className="text-xs mt-1">{second.currentElo}</p>
            </Link>
          </div>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-100 flex items-center justify-center shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-yellow-600" />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 text-xs font-bold">
              Gold
            </div>
          </div>
          <div className="h-32 md:h-40 w-20 bg-gradient-to-t from-yellow-200 to-yellow-100 mt-4 flex items-center justify-center rounded-t-lg shadow-md">
            <Link href={`/leaderboards/formula-one/drivers/${first.id}`} className="text-center p-2 hover:underline">
              <p className="font-bold truncate max-w-[80px]">{first.fullName.familyName}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[80px]">{first.fullName.givenName}</p>
              <p className="text-xs mt-1">{first.currentElo}</p>
            </Link>
          </div>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-900">3</span>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-200 text-amber-800 rounded-full px-3 py-1 text-xs font-bold">
              Bronze
            </div>
          </div>
          <div className="h-16 md:h-24 w-20 bg-gradient-to-t from-amber-200 to-amber-100 mt-4 flex items-center justify-center rounded-t-lg shadow-md">
            <Link href={`/leaderboards/formula-one/drivers/${third.id}`} className="text-center p-2 hover:underline">
              <p className="font-bold truncate max-w-[80px]">{third.fullName.familyName}</p>
              <p className="text-sm text-muted-foreground truncate max-w-[80px]">{third.fullName.givenName}</p>
              <p className="text-xs mt-1">{third.currentElo}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

