"use client";

import { columns } from "@/app/demo/students/columns";
import { DataTable } from "@/app/demo/students/data-table";
import { useDemoContext } from "@/app/demo/demoContext";

export default function View() {
    const { students } = useDemoContext();

    return (
        <>
            <DataTable columns={columns} data={students || []} />
        </>
    );
}
