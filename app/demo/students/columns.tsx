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

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { StudentFormValues } from "@/types/shared/forms";

export const columns: ColumnDef<StudentFormValues>[] = [
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
