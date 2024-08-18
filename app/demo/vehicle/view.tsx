"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/app/demo/vehicle/data-table";
import { columns } from "@/app/demo/vehicle/columns";
import TotalNumbers from "@/components/totalNumbers";
import { useDemoContext } from "@/app/demo/demoContext";
import { File } from "lucide-react";

export default function View() {
    const { vehicles, totalVehicles } = useDemoContext();

    return (
        <>
            <div className="py-10">
                <div className="items-center">
                    <div className="flex items-center justify-end gap-4">
                        <TotalNumbers
                            title={"Gas"}
                            numbers={totalVehicles.gas_total || 0}
                        />
                        <TotalNumbers
                            title={"Maintenance"}
                            numbers={totalVehicles.maintenance_total || 0}
                        />
                    </div>
                </div>
                <DataTable columns={columns} data={vehicles || []} />
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
                                    Export CSV: The feature is only available in
                                    the full version of our product. Purchase
                                    the full version to access all features and
                                    functionality.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
}
