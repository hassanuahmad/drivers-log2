"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LessonFormValues } from "@/types/shared/forms";
import { DropdownTableMenu } from "@/app/instructor/lessons/dropdownTableMenu";
import { format } from "date-fns";

type LessonTableColumnsType = LessonFormValues & {
    selected_student: number;
    duration: number;
    name: string;
    bde: string;
    students: {
        first_name: string;
        last_name: string;
        bde: string;
    };
};

export const columns: ColumnDef<LessonTableColumnsType>[] = [
    {
        header: "#",
        cell: (context) => context.row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "start_time",
        header: "Start Time",
        cell: (context) => {
            const data = context.row.original;
            const [hours, minutes, seconds] = data.start_time.split(":");
            const date = new Date(
                2022,
                0,
                1,
                Number(hours),
                Number(minutes),
                Number(seconds),
            );
            return format(date, "hh:mm a");
        },
    },
    {
        accessorKey: "end_time",
        header: "End Time",
        cell: (context) => {
            const data = context.row.original;
            const [hours, minutes, seconds] = data.end_time.split(":");
            const date = new Date(
                2022,
                0,
                1,
                Number(hours),
                Number(minutes),
                Number(seconds),
            );
            return format(date, "hh:mm a");
        },
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: (context) => {
            const data = context.row.original;
            let hours = Math.floor(data.duration / 60);
            let min = data.duration % 60;
            const hoursLabel = hours > 1 ? "hrs" : "hr";
            return `${hours}${hoursLabel} ${min}m`;
        },
    },
    {
        accessorKey: "cash_amount",
        header: "Cash Payment",
        cell: (context) => {
            const data = context.row.original;
            if (data.payment_type === "Cash") {
                return "$" + data.payment_amount;
            } else {
                return "";
            }
        },
    },
    {
        accessorKey: "interac_amount",
        header: "Interac Payment",
        cell: (context) => {
            const data = context.row.original;
            if (data.payment_type === "Interac") {
                return "$" + data.payment_amount;
            } else {
                return "";
            }
        },
    },
    {
        accessorKey: "road_test",
        header: "Road Test",
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
            return <DropdownTableMenu recordIds={record.id || -1} />;
        },
    },
];
