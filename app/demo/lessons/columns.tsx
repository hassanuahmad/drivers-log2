"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { LessonFormValues } from "@/types/shared/forms";
import { format, parse } from "date-fns";

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

const formatTime = (timeString: string) => {
    try {
        const date = parse(timeString, "HH:mm", new Date());
        return format(date, "hh:mm a");
    } catch (error) {
        console.error("Error parsing time:", error);
        return timeString;
    }
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
        cell: (context) => context.row.original.students.bde,
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        id: "actions",
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open actions menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Feature Restricted in Demo
                                    </DialogTitle>
                                    <DialogDescription>
                                        The edit feature is only available in
                                        the full version of our product.
                                        Purchase the full version to access all
                                        features and functionality.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Link href="/register">
                                        <Button variant="outline">
                                            Create an account
                                        </Button>
                                    </Link>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Feature Restricted in Demo
                                    </DialogTitle>
                                    <DialogDescription>
                                        The delete feature is only available in
                                        the full version of our product. Create
                                        an account to access all features and
                                        functionality.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Link href="/register">
                                        <Button variant="outline">
                                            Create an account
                                        </Button>
                                    </Link>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
