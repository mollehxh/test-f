import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card } from "@/shared/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";
import {
  CHANNEL_COUNT,
  generateSpectrum,
  type Factory,
} from "../model/factory";

const chartConfig = {
  value: {
    label: "Интенсивность",
    color: "var(--foreground)",
  },
} satisfies ChartConfig;

const chartMargin = { top: 8, right: 12, bottom: 8, left: 0 } as const;
const tooltipCursor = { stroke: "var(--border)", strokeWidth: 1 } as const;
const activeDot = { r: 3 } as const;

function createChannelTicks(channelCount: number, intervalCount = 6) {
  const step = channelCount / intervalCount;

  return Array.from({ length: intervalCount + 1 }, (_, index) =>
    Math.max(1, Math.round(index * step)),
  );
}

const channelTicks = createChannelTicks(CHANNEL_COUNT);

type Props = {
  factory: Factory;
};

function formatChannelLabel(
  _: React.ReactNode,
  payload: readonly { payload?: { channel?: number } }[],
) {
  return `Канал ${payload[0]?.payload?.channel ?? ""}`;
}

export function FactoryChart(props: Props) {
  const { factory } = props;

  const data = React.useMemo(() => generateSpectrum(factory.id), [factory.id]);
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className="flex min-h-0 flex-1 flex-col p-6 lg:p-10">
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {factory.prefix}
        </h1>
        <p className="truncate text-sm text-muted-foreground">
          {factory.folderPath}
        </p>
      </header>

      <Card className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-0 w-full flex-1"
        >
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
              ticks={channelTicks}
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
              cursor={tooltipCursor}
              content={
                <ChartTooltipContent labelFormatter={formatChannelLabel} />
              }
            />
            <Area
              dataKey="value"
              type="monotone"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              dot={false}
              activeDot={activeDot}
            />
          </AreaChart>
        </ChartContainer>
      </Card>
    </div>
  );
}
