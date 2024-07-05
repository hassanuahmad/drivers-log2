"use client";

import {
    LifeBuoy,
    Clock1,
    ClipboardCheck,
    DollarSign,
    Fuel,
    Wrench,
    User,
    ClipboardX,
} from "lucide-react";
import { Chart } from "@/app/demo/statistics/chart";
import Stats from "@/app/demo/statistics/stats";
import { useDemoContext } from "@/app/demo/demoContext";

interface StatRecords {
    lessons: number;
    total_hours: number;
    total_revenue: number;
    students: number;
    passed_students: number;
    failed_students: number;
    gas: number;
    maintenance: number;
    monthly_data: Array<{
        month: string;
        payment_amount: number;
        duration: number;
    }>;
}

type StatKey = keyof Omit<StatRecords, "monthly_data">;

interface StatItem {
    key: StatKey;
    label: string;
    icon: React.ReactNode;
    format: "number" | "hours" | "currency";
}

export default function View() {
    const { getStatRecords } = useDemoContext();
    const statRecords = getStatRecords();

    const statsToDisplay: StatItem[] = [
        {
            key: "lessons",
            label: "Total Lessons",
            icon: <LifeBuoy className="h-4 w-4 text-muted-foreground" />,
            format: "number",
        },
        {
            key: "total_hours",
            label: "Total Hours",
            icon: <Clock1 className="h-4 w-4 text-muted-foreground" />,
            format: "hours",
        },
        {
            key: "total_revenue",
            label: "Total Revenue",
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            format: "currency",
        },
        {
            key: "students",
            label: "Total Students",
            icon: <User className="h-4 w-4 text-muted-foreground" />,
            format: "number",
        },
        {
            key: "passed_students",
            label: "Passed Students",
            icon: <ClipboardCheck className="h-4 w-4 text-muted-foreground" />,
            format: "number",
        },
        {
            key: "failed_students",
            label: "Failed Students",
            icon: <ClipboardX className="h-4 w-4 text-muted-foreground" />,
            format: "number",
        },
        {
            key: "gas",
            label: "Gas Expenses",
            icon: <Fuel className="h-4 w-4 text-muted-foreground" />,
            format: "currency",
        },
        {
            key: "maintenance",
            label: "Maintenance Costs",
            icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
            format: "currency",
        },
    ];

    return (
        <>
            <div className="my-10">
                <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsToDisplay.map((stat, index) => (
                        <Stats
                            key={index}
                            title={stat.label}
                            value={statRecords[stat.key]}
                            icon={stat.icon}
                            format={stat.format}
                        />
                    ))}
                </div>
                <Chart data={statRecords.monthly_data} />
            </div>
        </>
    );
}
