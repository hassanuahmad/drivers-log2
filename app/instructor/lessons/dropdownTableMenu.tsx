import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteCon } from "@/app/instructor/lessons/deleteCon";
import { EditCon } from "@/app/instructor/lessons/editCon";
import { LessonFormValues } from "@/types/shared/forms";

import { getLessonByIdAction } from "@/app/instructor/lessons/actions";
import { toast } from "sonner";

type DropdownTableMenuTypes = {
    recordIds: number | { id: number };
};

type LessonInfoType = LessonFormValues & {
    selected_student: number;
    students: { first_name: string };
};

export const DropdownTableMenu = ({ recordIds }: DropdownTableMenuTypes) => {
    const [selectedLessonId, setSelectedLessonId] = useState<number | undefined>(
        undefined,
    );
    const [selectedLessonInfo, setSelectedLessonInfo] = useState<
        LessonInfoType | undefined
    >(undefined);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    const getLessonIdType = (recordIds: number | { id: number }): number => {
        return typeof recordIds === "number" ? recordIds : recordIds.id;
    };

    const handleOpenEditDialog = async (recordId: number) => {
        try {
            const lessonInfo = await getLessonByIdAction(recordId);

            if (lessonInfo === null) {
                toast.error("Failed to fetch lesson information", {
                    duration: 2000,
                });
                return;
            }
            setSelectedLessonInfo(lessonInfo);

            setIsEditOpen(true);
        } catch (error) {
            console.error("Error fetching lesson information in FE:", error);
            toast.error("An unexpected error occurred", {
                duration: 2000,
            });
        }
    };

    return (
        <>
            {isEditOpen && selectedLessonInfo && (
                <EditCon
                    lessonInfo={selectedLessonInfo}
                    open={isEditOpen}
                    onCancel={() => {
                        setIsEditOpen(false);
                        setSelectedLessonInfo(undefined);
                    }}
                />
            )}
            <DeleteCon
                recordId={selectedLessonId!}
                open={isDeleteOpen}
                onCancel={() => {
                    setIsDeleteOpen(false);
                    setSelectedLessonId(undefined);
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
                            handleOpenEditDialog(getLessonIdType(recordIds));
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedLessonId(getLessonIdType(recordIds));
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
