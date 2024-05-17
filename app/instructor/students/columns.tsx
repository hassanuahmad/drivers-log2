"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DropdownTableMenu } from "./dropdownTableMenu";
import { StudentFormValues } from "@/types/shared/forms";

export type StudentTableColumnsType = {
    student_id: number;
    students: StudentFormValues;
};

export const columns: ColumnDef<StudentTableColumnsType>[] = [
    {
        header: "#",
        cell: (context) => context.row.index + 1,
    },
    {
        accessorKey: "students.first_name",
        header: "First Name",
    },
    {
        accessorKey: "students.last_name",
        header: "Last Name",
    },
    {
        accessorKey: "students.phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "students.email",
        header: "Email",
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: (context) => {
            const data = context.row.original;
            return `${data.students.street_address} ${data.students.city} ${data.students.province} ${data.students.postal_code} ${data.students.country}`;
        },
    },
    {
        accessorKey: "students.driving_class",
        header: "Class",
    },
    {
        accessorKey: "students.bde",
        header: "BDE",
    },
    {
        accessorKey: "students.remarks",
        header: "Remarks",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const record = row.original;
            return <DropdownTableMenu recordIds={record.students.id || -1} />;
        },
    },
];
