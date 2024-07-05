"use client";

import { DataTable } from "@/app/demo/vehicle/data-table";
import { columns } from "@/app/demo/vehicle/columns";
import TotalNumbers from "@/components/totalNumbers";
import { useDemoContext } from "@/app/demo/demoContext";

export default function View() {
    const { vehicles, totalVehicles } = useDemoContext();

    return (
        <>
            <div className="py-10">
                <div className="items-center">
                    <div className="flex justify-end items-center gap-4">
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
            </div>
        </>
    );
}
