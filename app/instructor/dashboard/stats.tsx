"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/statsCard";
import { DollarSign, LifeBuoy, Fuel, Clock1 } from "lucide-react";

type StatValue = {
    value: number;
    format: "number" | "hours" | "currency";
};

type PeriodStats = {
    lessons_count: StatValue;
    total_hours: StatValue;
    total_revenue: StatValue;
    total_gas: StatValue;
};

type StatsData = {
    today: PeriodStats;
    last_7_days: PeriodStats;
    last_30_days: PeriodStats;
};

export default function Stats({ data }: { data: StatsData }) {
    const today = data.today;
    const last_7_days = data.last_7_days;
    const last_30_days = data.last_30_days;

    return (
        <>
            <div className="flex-col md:flex">
                <div className="flex-1 space-y-4 pt-4">
                    <Tabs defaultValue="today" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="today">Today</TabsTrigger>
                            <TabsTrigger value="last_7_days">
                                Last 7 days
                            </TabsTrigger>
                            <TabsTrigger value="last_30_days">
                                Last 30 days
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="today" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <StatsCard
                                    title="Total Lessons"
                                    value={today.lessons_count.value}
                                    icon={
                                        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={today.lessons_count.format}
                                />
                                <StatsCard
                                    title="Total Hours"
                                    value={today.total_hours.value}
                                    icon={
                                        <Clock1 className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={today.total_hours.format}
                                />
                                <StatsCard
                                    title="Total Revenue"
                                    value={today.total_revenue.value}
                                    icon={
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={today.total_revenue.format}
                                />
                                <StatsCard
                                    title="Total Gas"
                                    value={today.total_gas.value}
                                    icon={
                                        <Fuel className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={today.total_gas.format}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="last_7_days" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <StatsCard
                                    title="Total Lessons"
                                    value={last_7_days.lessons_count.value}
                                    icon={
                                        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_7_days.lessons_count.format}
                                />
                                <StatsCard
                                    title="Total Hours"
                                    value={last_7_days.total_hours.value}
                                    icon={
                                        <Clock1 className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_7_days.total_hours.format}
                                />
                                <StatsCard
                                    title="Total Revenue"
                                    value={last_7_days.total_revenue.value}
                                    icon={
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_7_days.total_revenue.format}
                                />
                                <StatsCard
                                    title="Total Gas"
                                    value={last_7_days.total_gas.value}
                                    icon={
                                        <Fuel className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_7_days.total_gas.format}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="last_30_days" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <StatsCard
                                    title="Total Lessons"
                                    value={last_30_days.lessons_count.value}
                                    icon={
                                        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_30_days.lessons_count.format}
                                />
                                <StatsCard
                                    title="Total Hours"
                                    value={last_30_days.total_hours.value}
                                    icon={
                                        <Clock1 className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_30_days.total_hours.format}
                                />
                                <StatsCard
                                    title="Total Revenue"
                                    value={last_30_days.total_revenue.value}
                                    icon={
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_30_days.total_revenue.format}
                                />
                                <StatsCard
                                    title="Total Gas"
                                    value={last_30_days.total_gas.value}
                                    icon={
                                        <Fuel className="h-4 w-4 text-muted-foreground" />
                                    }
                                    format={last_30_days.total_gas.format}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="border-b border-gray-200" />
                </div>
            </div>
        </>
    );
}
