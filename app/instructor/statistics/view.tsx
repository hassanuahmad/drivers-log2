"use client";

import { useState, useEffect } from "react";
import {
    LifeBuoy,
    Clock1,
    ClipboardCheck,
    DollarSign,
    Fuel,
    Wrench,
    User,
    ClipboardX,
    File,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Chart } from "@/app/instructor/statistics/chart";
import { Button } from "@/components/ui/button";
import Stats from "@/app/instructor/statistics/stats";
import { generateYearlyCsv } from "./utils";

export default function View({ getYearlyStats, yearlyStats }: any) {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [statRecords, setStatRecords] = useState(yearlyStats);
    const years = [
        2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ];

    const statsToDisplay = [
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

    useEffect(() => {
        const getStats = async () => {
            const stats = await getYearlyStats(year);
            setStatRecords(stats);
        };

        getStats();
    }, [year, getYearlyStats]);

    return (
        <>
            <div className="my-10">
                <div className="flex justify-between pb-4">
                    <div>
                        <Label>Select Year</Label>
                        <div className="mt-2">
                            <Select
                                value={setYear.toString()}
                                onValueChange={(value) =>
                                    setYear(Number(value))
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    {year ? year.toString() : "Select Year"}
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem
                                            key={year}
                                            value={year.toString()}
                                        >
                                            {year.toString()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Export Button Start */}
                    <div className="flex items-end">
                        <Button
                            variant="outline"
                            className="gap-1"
                            onClick={() => generateYearlyCsv(year)}
                        >
                            <File className="h-3.5 w-3.5" />
                            <span>Export CSV</span>
                        </Button>
                    </div>
                    {/* Export Button End */}
                </div>
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
