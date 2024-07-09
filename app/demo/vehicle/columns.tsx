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
import { VehicleFormValues } from "@/types/shared/forms";

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
