"use client";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { DataTable } from "@/app/instructor/lessons/data-table";
import { columns } from "@/app/instructor/lessons/columns";

import { createClient } from "@/utils/supabase/client";
import { monthOptions } from "@/utils/utils";
import TotalNumbers from "@/components/totalNumbers";
import { LessonTotal, LessonRecord } from "@/types/lessons";

export default function View({
    lessonRecords,
    lessonTotal,
    getLessonAction,
    getLessonsTotal,
}) {
    const supabase = createClient();
    const years = [
        2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ];
    const [selectedMonth, setSelectedMonth] = useState<string>(
        monthOptions[new Date().getMonth()].value,
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear(),
    );
    const [allLessonRecords, setAllLessonRecords] = useState<
        LessonRecord[] | null
    >(lessonRecords);
    const [totalRecords, setTotalRecords] = useState<LessonTotal | null>(
        lessonTotal,
    );

    // NOTE: There is probably a better way of revalidating this than using it in a useEffect but I have to look into that
    useEffect(() => {
        const getLessonRecords = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const userId = user?.id;
            if (!userId) return null;

            let lesson_record = await getLessonAction(selectedMonth, selectedYear);
            let lesson_total = await getLessonsTotal(
                userId,
                selectedMonth,
                selectedYear,
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
                    "flex flex-col justify-start space-y-4 md:flex-row md:justify-between md:items-center"
                }
            >
                <div className={"flex"}>
                    <Select onValueChange={(value) => setSelectedMonth(value)}>
                        <SelectTrigger className="w-[140px]">
                            {monthOptions.find(
                                (monthOption) => monthOption.value === selectedMonth,
                            )?.label || "Month"}
                        </SelectTrigger>
                        <SelectContent>
                            {monthOptions.map((monthOption, index) => (
                                <SelectItem key={index} value={monthOption.value}>
                                    {monthOption.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={"ml-4"}>
                        <Select onValueChange={(value) => setSelectedYear(Number(value))}>
                            <SelectTrigger className="w-[140px]">
                                {selectedYear || "Year"}
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((yearOption, index) => (
                                    <SelectItem key={index} value={yearOption.toString()}>
                                        {yearOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="items-center">
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
            <div>
                <DataTable columns={columns} data={processedRecords || []} />
            </div>
        </>
    );
}
