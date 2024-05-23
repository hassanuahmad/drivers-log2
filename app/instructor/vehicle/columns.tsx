"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VehicleFormValues } from "@/types/shared/forms";
import { DropdownTableMenu } from "@/app/instructor/vehicle/dropdownTableMenu";

export const columns: ColumnDef<VehicleFormValues>[] = [
    {
        header: "#",
        cell: (context) => context.row.index + 1,
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "odometer",
        header: "Odometer",
    },
    {
        accessorKey: "gas",
        header: "Gas",
        cell: (context) => {
            const data = context.row.original;
            return "$" + data.gas;
        },
    },
    {
        accessorKey: "maintenance",
        header: "Maintenance",
        cell: (context) => {
            const data = context.row.original;
            return "$" + data.maintenance;
        },
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const record = row.original;
            return <DropdownTableMenu recordIds={record.id || -1} />;
        },
    },
];
