"use client"

import { createContext, useContext, type ReactNode } from "react"

type Sport = {
  id: string
  name: string
  isActive: boolean
  route: string
}

type SportsContextType = {
  availableSports: Sport[]
  activeSport: string | null
}

const SportsContext = createContext<SportsContextType | undefined>(undefined)

export function SportsProvider({ children }: { children: ReactNode }) {
  // Define available sports
  const availableSports: Sport[] = [
    {
      id: "formula-one",
      name: "Formula One",
      isActive: true,
      route: "/leaderboards/formula-one",
    },
    {
      id: "motogp",
      name: "MotoGP",
      isActive: false,
      route: "/leaderboards/motogp",
    },
    {
      id: "boxing",
      name: "Boxing",
      isActive: false,
      route: "/leaderboards/boxing",
    },
  ]

  // Currently active sport
  const activeSport = "formula-one"

  return (
    <SportsContext.Provider
      value={{
        availableSports,
        activeSport,
      }}
    >
      {children}
    </SportsContext.Provider>
  )
}

export function useSports() {
  const context = useContext(SportsContext)
  if (context === undefined) {
    throw new Error("useSports must be used within a SportsProvider")
  }
  return context
}

