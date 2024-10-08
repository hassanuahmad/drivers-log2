"use client";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/instructor/lessons/data-table";
import { columns } from "@/app/instructor/lessons/columns";
import { File } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { monthOptions } from "@/utils/utils";
import { generateLessonsCsv } from "./utils";
import TotalNumbers from "@/components/totalNumbers";
import { LessonTotal, LessonRecord } from "@/types/lessons";

export default function View({
    lessonRecords,
    lessonTotal,
    getLessonAction,
    getLessonsTotal,
}: any) {
    const supabase = createClient();
    const years = [
        2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ];
    const [selectedMonth, setSelectedMonth] = useState<string>(
        monthOptions[new Date().getMonth()].value
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );
    const [allLessonRecords, setAllLessonRecords] = useState<
        LessonRecord[] | null
    >(lessonRecords);
    const [totalRecords, setTotalRecords] = useState<LessonTotal | null>(
        lessonTotal
    );

    // NOTE: There is probably a better way of revalidating this than using it in a useEffect but I have to look into that
    useEffect(() => {
        const getLessonRecords = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const userId = user?.id;
            if (!userId) return null;

            let lesson_record = await getLessonAction(
                selectedMonth,
                selectedYear
            );
            let lesson_total = await getLessonsTotal(
                userId,
                selectedMonth,
                selectedYear
            );

            setAllLessonRecords(lesson_record);
            setTotalRecords(lesson_total);
        };

        getLessonRecords();
    }, [selectedMonth, selectedYear, getLessonAction]);

    // This is to pass the name in the records so we can search in the data-table
    const processedRecords = allLessonRecords?.map((record) => ({
        ...record,
        name: `${record.students.first_name} ${record.students.last_name}`,
        bde: record.students.bde,
    }));

    function formatTotalHours(duration: number) {
        const hours = Math.floor(duration / 60);
        const min = duration % 60;
        const hoursLabel = hours > 1 ? "hrs" : "hr";
        return `${hours}${hoursLabel} ${min}m`;
    }

    return (
        <>
            {/* Dropdowns Start */}
            <div
                className={
                    "flex flex-col justify-start space-y-4 md:flex-row md:items-center md:justify-between"
                }
            >
                <div className={"flex"}>
                    <Select onValueChange={(value) => setSelectedMonth(value)}>
                        <SelectTrigger className="w-[140px]">
                            {monthOptions.find(
                                (monthOption) =>
                                    monthOption.value === selectedMonth
                            )?.label || "Month"}
                        </SelectTrigger>
                        <SelectContent>
                            {monthOptions.map((monthOption, index) => (
                                <SelectItem
                                    key={index}
                                    value={monthOption.value}
                                >
                                    {monthOption.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={"ml-4"}>
                        <Select
                            onValueChange={(value) =>
                                setSelectedYear(Number(value))
                            }
                        >
                            <SelectTrigger className="w-[140px]">
                                {selectedYear || "Year"}
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((yearOption, index) => (
                                    <SelectItem
                                        key={index}
                                        value={yearOption.toString()}
                                    >
                                        {yearOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div id="monthly-stats" className="items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-10 px-4 py-2 text-sm text-gray-500">
                            <span className="text-sm font-bold text-gray-500">
                                Total Hours:{" "}
                            </span>
                            {formatTotalHours(totalRecords?.total_hours || 0)}
                        </div>
                        <TotalNumbers
                            title={"Total Interac"}
                            numbers={totalRecords?.total_interac || 0}
                        />
                        <TotalNumbers
                            title={"Total Cash"}
                            numbers={totalRecords?.total_cash || 0}
                        />
                    </div>
                </div>
            </div>
            {/* Dropdowns End */}
            <div id="lesson-table">
                {/* @ts-ignore */}
                <DataTable columns={columns} data={processedRecords || []} />
            </div>
            {/* Export Button Start */}
            <div className="flex justify-end py-4">
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                    onClick={() =>
                        generateLessonsCsv(
                            // @ts-ignore
                            allLessonRecords,
                            selectedMonth,
                            selectedYear
                        )
                    }
                >
                    <File className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                </Button>
            </div>
            {/* Export Button End */}
        </>
    );
}
