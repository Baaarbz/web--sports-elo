"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

interface EloChartProps {
  eloRecord: Array<{
    value: number
    occurredOn: string
  }>
}

export function EloChart({ eloRecord }: EloChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const isMobile = useMobile()

  useEffect(() => {
    // Sort by date ascending
    const sortedData = [...eloRecord].sort(
      (a, b) => new Date(a.occurredOn).getTime() - new Date(b.occurredOn).getTime(),
    )

    // Format data for the chart
    const formattedData = sortedData.map((record) => ({
      date: new Date(record.occurredOn).toLocaleDateString(),
      elo: record.value,
      fullDate: record.occurredOn,
    }))

    setChartData(formattedData)
  }, [eloRecord])

  if (chartData.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center p-4">
        <p className="text-muted-foreground">No ELO history available</p>
      </Card>
    )
  }

  // Calculate min and max for better visualization
  const eloValues = chartData.map((d) => d.elo)
  const minElo = Math.min(...eloValues)
  const maxElo = Math.max(...eloValues)

  // Add some padding to the domain
  const yDomain = [Math.max(0, Math.floor(minElo / 100) * 100 - 100), Math.ceil(maxElo / 100) * 100 + 100]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return isMobile ? `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}` : date.toLocaleDateString()
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">{new Date(data.fullDate).toLocaleDateString()}</p>
          <p className="text-sm">
            ELO: <span className="font-semibold">{data.elo}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} tickCount={isMobile ? 5 : 10} />
        <YAxis domain={yDomain} tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={1000} stroke="#888" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="elo"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

