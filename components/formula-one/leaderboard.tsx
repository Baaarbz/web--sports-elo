"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DriverCard } from "@/components/formula-one/driver-card"
import { DriverCardSkeleton } from "@/components/formula-one/driver-card-skeleton"

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

type SortBy = "currentElo" | "highestElo" | "lowestElo" | "id"
type SortOrder = "asc" | "desc"

type ApiResponse = {
  drivers: Driver[]
  page: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export function FormulaOneLeaderboard() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10) // Default to 10 to show top 10
  const [sortBy, setSortBy] = useState<SortBy>("highestElo")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://sportselo.barbzdev.com/api/v1/formula-one/drivers?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch drivers")
        }

        const data: ApiResponse = await response.json()
        setDrivers(data.drivers)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError("Failed to load drivers. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [page, pageSize, sortBy, sortOrder])

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
    setPage(0) // Reset to first page when sorting changes
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would implement search functionality here
    console.log("Searching for:", searchQuery)
    // Redirect to search page would be implemented here
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Show:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value))
              setPage(0)
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search drivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <span className="text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1 || loading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn("text-sm font-medium", sortBy === "currentElo" && "underline underline-offset-4")}
              onClick={() => handleSort("currentElo")}
            >
              Current ELO
              <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("text-sm font-medium", sortBy === "highestElo" && "underline underline-offset-4")}
              onClick={() => handleSort("highestElo")}
            >
              Highest ELO
              <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("text-sm font-medium", sortBy === "lowestElo" && "underline underline-offset-4")}
              onClick={() => handleSort("lowestElo")}
            >
              Lowest ELO
              <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>

          {loading
            ? // Skeleton loaders
              Array.from({ length: pageSize }).map((_, index) => <DriverCardSkeleton key={index} />)
            : drivers.map((driver, index) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  rank={page * pageSize + index + 1}
                  medal={index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : undefined}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

