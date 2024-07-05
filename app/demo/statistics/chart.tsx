"use client";

import {
    Bar,
    BarChart,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTotalHours } from "@/utils/utils";

type MonthlyData = {
    month: string;
    payment_amount: number;
    duration: number;
}[];

type ChartProps = {
    data: MonthlyData;
};

export function Chart({ data }: ChartProps) {
    return (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
                    <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 10,
                                    left: 10,
                                    bottom: 0,
                                }}
                            >
                                <XAxis
                                    dataKey="month"
                                    tick={{ stroke: "#888888", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    tick={{ stroke: "#888888", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                {payload[0].payload.month}
                                                            </span>
                                                            <span className="font-bold">
                                                                ${payload[0].value?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    strokeWidth={2}
                                    dataKey="payment_amount"
                                    activeDot={{
                                        r: 8,
                                        style: { fill: "#1ba8a5" },
                                    }}
                                    stroke="#1ba8a5"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">
                    <CardTitle>Hours Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 sm:mt-0 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis
                                    dataKey="month"
                                    tick={{ stroke: "#888888", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => {
                                        const hours = Math.floor(value / 60);
                                        const hoursLabel = hours > 1 ? "hrs" : "hr";
                                        return `${hours}${hoursLabel}`;
                                    }}
                                    tick={{ stroke: "#888888", fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                {payload[0].payload.month}
                                                            </span>
                                                            <span className="font-bold">
                                                                {formatTotalHours(payload[0].value as number)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Bar
                                    dataKey="duration"
                                    radius={[4, 4, 0, 0]}
                                    style={
                                        {
                                            fill: "#1ba8a5",
                                            opacity: 1,
                                        } as React.CSSProperties
                                    }
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
