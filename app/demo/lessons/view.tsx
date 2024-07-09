"use client";

import { columns } from "@/app/demo/lessons/columns";
import { DataTable } from "@/app/demo/lessons/data-table";
import TotalNumbers from "@/components/totalNumbers";
import { formatTotalHours } from "@/utils/utils";
import { useDemoContext } from "@/app/demo/demoContext";

export default function View() {
    const { lessons, lessonTotals } = useDemoContext();

    return (
        <>
            <div id="monthly-stats" className="items-center pt-4">
                <div className="flex items-center justify-end gap-4">
                    <div className="h-10 px-4 py-2 text-sm text-gray-500">
                        <span className="text-sm font-bold text-gray-500">
                            Total Hours:{" "}
                        </span>
                        {formatTotalHours(lessonTotals?.total_hours || 0)}
                    </div>
                    <TotalNumbers
                        title={"Total Interac"}
                        numbers={lessonTotals?.total_interac || 0}
                    />
                    <TotalNumbers
                        title={"Total Cash"}
                        numbers={lessonTotals?.total_cash || 0}
                    />
                </div>
            </div>
            <div id="lesson-table">
                {/* @ts-ignore */}
                <DataTable columns={columns} data={lessons || []} />
            </div>
        </>
    );
}
