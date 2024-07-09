import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteStudentAction } from "@/app/instructor/students/actions";
import { toast } from "sonner";

export type DeleteConProps = {
    studentId: number;
    open: boolean;
    onCancel: () => void;
};

export const DeleteCon = ({ studentId, open, onCancel }: DeleteConProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this student? Once
                        deleted, it cannot be recovered.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={"bg-red-600 hover:bg-red-500"}
                        onClick={async () => {
                            try {
                                const deletedStudent =
                                    await deleteStudentAction(studentId);
                                if (deletedStudent) {
                                    toast.success("Student Deleted", {
                                        duration: 2000,
                                    });
                                } else {
                                    toast.error("Failed to delete student", {
                                        duration: 2000,
                                    });
                                }
                            } catch (error) {
                                console.error("Error deleting student:", error);
                                toast.error(
                                    "An error occurred while deleting student",
                                    {
                                        duration: 2000,
                                    }
                                );
                            }
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
