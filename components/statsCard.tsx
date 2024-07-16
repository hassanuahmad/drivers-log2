"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTotalHours } from "@/utils/utils";

type StatsProps = {
    title: string;
    value: number | string;
    icon: ReactNode;
    format?: string;
};

export default function StatsCard({ title, value, icon, format }: StatsProps) {
    const formatValue = (value: number | string, format?: string) => {
        if (typeof value === "string") return value;
        switch (format) {
            case "currency":
                return `$${value.toFixed(2)}`;
            case "hours":
                return formatTotalHours(value);
            case "number":
            default:
                return value.toLocaleString();
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {title}
                    </CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatValue(value, format)}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
