"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSports } from "@/contexts/sports-context"
import { DriverCard } from "@/components/formula-one/driver-card"
import { Spinner } from "@/components/ui/spinner"

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

export function SearchForm() {
  const { availableSports } = useSports()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Driver[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      // This is a mock search since the endpoint is work in progress
      // In a real app, you would call the search API here

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just show some mock results
      // In a real app, you would use the actual API response
      if (searchQuery.toLowerCase().includes("ham")) {
        setSearchResults([
          {
            id: "hamilton",
            fullName: {
              familyName: "Hamilton",
              givenName: "Lewis",
            },
            currentElo: 1566,
            highestElo: 1570,
            lowestElo: 1000,
            lastRaceDate: "2023-12-01",
          },
        ])
      } else if (searchQuery.toLowerCase().includes("ver")) {
        setSearchResults([
          {
            id: "verstappen",
            fullName: {
              familyName: "Verstappen",
              givenName: "Max",
            },
            currentElo: 1600,
            highestElo: 1620,
            lowestElo: 1200,
            lastRaceDate: "2023-12-01",
          },
        ])
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by driver name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Sports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            {availableSports
              .filter((sport) => sport.isActive)
              .map((sport) => (
                <SelectItem key={sport.id} value={sport.id}>
                  {sport.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full sm:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {isSearching ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : hasSearched ? (
        searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((driver, index) => (
              <DriverCard key={driver.id} driver={driver} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <p className="text-sm mt-2">Try a different search term or sport</p>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term to find athletes</p>
          <p className="text-sm mt-2">Try searching for a driver name like "Hamilton" or "Verstappen"</p>
        </div>
      )}
    </div>
  )
}

