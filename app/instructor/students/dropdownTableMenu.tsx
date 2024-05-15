import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteCon } from "@/app/instructor/students/deleteCon";
import { EditCon } from "@/app/instructor/students/editCon";

import { getStudentByIdAction } from "@/app/instructor/students/actions";

export type DropdownTableMenuTypes = {
    recordIds: number | { id: number };
};

export const DropdownTableMenu = ({ recordIds }: DropdownTableMenuTypes) => {
    const [selectedStudentId, setSelectedStudentId] = useState<
        number | undefined
    >(undefined);
    const [selectedStudentInfo, setSelectedStudentInfo] = useState();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const getStudentIdType = (recordIds: number | { id: number }): number => {
        return typeof recordIds === "number" ? recordIds : recordIds.id;
    };

    const handleOpenEditDialog = async (studentId: number) => {
        try {
            const studentInfo = await getStudentByIdAction(studentId);
            setSelectedStudentInfo(studentInfo);
            setIsEditOpen(true);
        } catch (error) {
            console.error("Error fetching student information in FE:", error);
        }
    };

    return (
        <>
            {isEditOpen && selectedStudentInfo && (
                <EditCon
                    studentInfo={selectedStudentInfo}
                    open={isEditOpen}
                    onCancel={() => {
                        setIsEditOpen(false);
                        setSelectedStudentInfo(undefined);
                    }}
                />
            )}
            {/* NOTE: See if i can the same checks as for the edit just for security */}
            <DeleteCon
                studentId={selectedStudentId as number}
                open={isDeleteOpen}
                onCancel={() => {
                    setIsDeleteOpen(false);
                    setSelectedStudentId(undefined);
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open actions menu</span>
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => {
                            handleOpenEditDialog(getStudentIdType(recordIds));
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedStudentId(getStudentIdType(recordIds));
                            setIsDeleteOpen(true);
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
