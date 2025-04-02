"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { EloChart } from "@/components/formula-one/elo-chart"
import { Skeleton } from "@/components/ui/skeleton"

type DriverDetail = {
  id: string
  fullName: {
    familyName: string
    givenName: string
  }
  code: string
  permanentNumber: string
  birthDate: string
  nationality: {
    countryCode: string
    countryName: string
    value: string
  }
  infoUrl: string
  currentElo: {
    value: number
    occurredOn: string
  }
  highestElo: {
    value: number
    occurredOn: string
  }
  lowestElo: {
    value: number
    occurredOn: string
  }
  eloRecord: Array<{
    value: number
    occurredOn: string
  }>
}

interface DriverProfileProps {
  driverId: string
}

export function DriverProfile({ driverId }: DriverProfileProps) {
  const [driver, setDriver] = useState<DriverDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDriver = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://sportselo.barbzdev.com/api/v1/formula-one/drivers/${driverId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch driver details")
        }

        const data = await response.json()
        setDriver(data)
      } catch (err) {
        setError("Failed to load driver details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDriver()
  }, [driverId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return <DriverProfileSkeleton />
  }

  if (error || !driver) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-red-500">{error || "Driver not found"}</p>
        <Link href="/leaderboards/formula-one">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leaderboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/leaderboards/formula-one">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leaderboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg">
          <h1 className="text-3xl font-bold tracking-tight">
            {driver.fullName.givenName} {driver.fullName.familyName}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold">{driver.code}</span>
            {driver.permanentNumber && (
              <span className="rounded-full bg-muted px-2 py-1 text-sm font-medium">#{driver.permanentNumber}</span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground">{driver.nationality.value}</p>
          <p className="text-muted-foreground">Born: {formatDate(driver.birthDate)}</p>
          <div className="mt-4">
            <a
              href={driver.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              Wikipedia
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driver.currentElo.value}</div>
              <p className="text-xs text-muted-foreground">As of {formatDate(driver.currentElo.occurredOn)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Highest ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driver.highestElo.value}</div>
              <p className="text-xs text-muted-foreground">On {formatDate(driver.highestElo.occurredOn)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lowest ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{driver.lowestElo.value}</div>
              <p className="text-xs text-muted-foreground">On {formatDate(driver.lowestElo.occurredOn)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-transparent via-primary/5 to-transparent p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">ELO Rating History</h2>
        <div className="h-[400px]">
          <EloChart eloRecord={driver.eloRecord} />
        </div>
      </div>
    </div>
  )
}

function DriverProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Highest ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lowest ELO</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-transparent via-primary/5 to-transparent p-6 rounded-lg">
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="h-[400px] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  )
}

