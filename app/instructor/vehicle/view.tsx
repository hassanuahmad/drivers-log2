"use client";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { DataTable } from "@/app/instructor/vehicle/data-table";
import { columns } from "@/app/instructor/vehicle/columns";

import { createClient } from "@/utils/supabase/client";
import { monthOptions } from "@/utils/utils";
import TotalNumbers from "@/components/totalNumbers";
import { TotalVehicle, VehicleRecord } from "@/types/vehicle";

export default function View({
    getVehicleAction,
    getTotalVehicle,
    vehicleRecords,
    vehicleTotal,
}: any) {
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
    const [allVehicleRecords, setAllVehicleRecords] = useState<
        VehicleRecord[] | null
    >(vehicleRecords);
    const [totalRecords, setTotalRecords] = useState<TotalVehicle | null>(
        vehicleTotal,
    );

    // NOTE: There is probably a better way of revalidating this than using it in a useEffect but I have to look into that
    useEffect(() => {
        const getVehicleRecords = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const userId = user?.id;
            if (!userId) return null;

            let vehicleRecord = await getVehicleAction(selectedMonth, selectedYear);
            let totalVehicle = await getTotalVehicle(
                userId,
                selectedMonth,
                selectedYear,
            );

            setAllVehicleRecords(vehicleRecord);
            setTotalRecords(totalVehicle);
        };

        getVehicleRecords();
    }, [selectedMonth, selectedYear, getVehicleAction]);

    return (
        <>
            {/* Dropdowns Start */}
            <div
                className={
                    "flex flex-col justify-start space-y-4 sm:flex-row sm:justify-between sm:items-center"
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
                        <TotalNumbers
                            title={"Gas"}
                            numbers={totalRecords?.gas_total || 0}
                        />
                        <TotalNumbers
                            title={"Maintenance"}
                            numbers={totalRecords?.maintenance_total || 0}
                        />
                    </div>
                </div>
            </div>
            {/* Dropdowns End */}
            <div>
                <DataTable columns={columns} data={allVehicleRecords || []} />
            </div>
        </>
    );
}
