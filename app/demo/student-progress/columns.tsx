"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LessonRecord } from "@/types/lessons";
import { format, parse } from "date-fns";

type StudentProgressColumnsType = LessonRecord & {
    duration: number;
};

const formatTime = (timeString: string) => {
    try {
        const date = parse(timeString, "HH:mm", new Date());
        return format(date, "hh:mm a");
    } catch (error) {
        console.error("Error parsing time:", error);
        return timeString;
    }
};

export const columns: ColumnDef<StudentProgressColumnsType>[] = [
    {
        header: "#",
        cell: (context) => context.row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: (context) => {
            const data = context.row.original.students;
            return data.first_name + " " + data.last_name;
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "start_time",
        header: "Start Time",
        cell: (context) => formatTime(context.row.original.start_time),
    },
    {
        accessorKey: "end_time",
        header: "End Time",
        cell: (context) => formatTime(context.row.original.end_time),
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
        cell: (context) => {
            const data = context.row.original.students;
            return data.bde;
        },
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
];
