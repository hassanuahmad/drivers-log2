"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DropdownTableMenu } from "./dropdownTableMenu";

export type StudentTableColumnsType = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    driving_class: string;
    bde: string;
    street_address: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
    remarks: string;
};

export const columns: ColumnDef<StudentTableColumnsType>[] = [
    {
        header: "#",
        cell: (context) => context.row.index + 1,
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: (context) => {
            const data = context.row.original;
            return `${data.street_address} ${data.city} ${data.province} ${data.postal_code} ${data.country}`;
        },
    },
    {
        accessorKey: "driving_class",
        header: "Class",
    },
    {
        accessorKey: "bde",
        header: "BDE",
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const record = row.original;
            return <DropdownTableMenu recordIds={record.id} />;
        },
    },
];
