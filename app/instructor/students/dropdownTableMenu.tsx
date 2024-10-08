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
import { StudentFormValues } from "@/types/shared/forms";

import { getStudentByIdAction } from "@/app/instructor/students/actions";
import { toast } from "sonner";

export type DropdownTableMenuTypes = {
    recordIds: number | { id: number };
};

export const DropdownTableMenu = ({ recordIds }: DropdownTableMenuTypes) => {
    const [selectedStudentId, setSelectedStudentId] = useState<
        number | undefined
    >(undefined);
    const [selectedStudentInfo, setSelectedStudentInfo] = useState<
        StudentFormValues | undefined
    >(undefined);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    const getStudentIdType = (recordIds: number | { id: number }): number => {
        return typeof recordIds === "number" ? recordIds : recordIds.id;
    };

    const handleOpenEditDialog = async (studentId: number) => {
        try {
            const studentInfo = await getStudentByIdAction(studentId);
            if (studentInfo === null) {
                toast.error("Failed to fetch student information", {
                    duration: 2000,
                });
                return;
            }
            setSelectedStudentInfo(studentInfo);
            setIsEditOpen(true);
        } catch (error) {
            console.error("Error fetching student information in FE:", error);
            toast.error("An unexpected error occurred", {
                duration: 2000,
            });
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
            <DeleteCon
                studentId={selectedStudentId!}
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
