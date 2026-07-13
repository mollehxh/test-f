"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  CHANNEL_COUNT,
  generateSpectrum,
  type Factory,
} from "@/components/app/factory-data"

const chartConfig = {
  value: {
    label: "Интенсивность",
    color: "var(--foreground)",
  },
} satisfies ChartConfig

export function FactoryChart({ factory }: { factory: Factory }) {
  const data = React.useMemo(() => generateSpectrum(factory.id), [factory.id])

  return (
    <div className="flex min-h-0 flex-1 flex-col p-6 lg:p-10">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {factory.name}
        </h1>
      </header>

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-0 w-full flex-1"
        >
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, bottom: 8, left: 0 }}
          >
            <defs>
              <linearGradient id="factory-spectrum" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.28}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="channel"
              type="number"
              domain={[1, CHANNEL_COUNT]}
              ticks={[1, 50, 100, 150, 200, 250, 300]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={36}
              className="text-xs"
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    `Канал ${payload?.[0]?.payload?.channel ?? ""}`
                  }
                />
              }
            />
            <Area
              dataKey="value"
              type="monotone"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              fill="url(#factory-spectrum)"
              isAnimationActive={false}
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ChartContainer>

      </Card>
    </div>
  )
}
