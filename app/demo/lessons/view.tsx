"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { columns } from "@/app/demo/lessons/columns";
import { DataTable } from "@/app/demo/lessons/data-table";
import TotalNumbers from "@/components/totalNumbers";
import { formatTotalHours } from "@/utils/utils";
import { useDemoContext } from "@/app/demo/demoContext";
import { File } from "lucide-react";

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
            <div className="flex justify-end pt-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <Button
                                    size="sm"
                                    disabled={true}
                                    variant="outline"
                                    className="h-8 gap-1"
                                >
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export CSV
                                    </span>
                                </Button>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Export CSV: The feature is only available in the
                                full version of our product. Purchase the full
                                version to access all features and
                                functionality.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </>
    );
}
