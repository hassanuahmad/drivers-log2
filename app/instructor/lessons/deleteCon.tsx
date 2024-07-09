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

import { deleteLessonAction } from "@/app/instructor/lessons/actions";
import { toast } from "sonner";

export type DeleteConProps = {
    recordId: number;
    open: boolean;
    onCancel: () => void;
};

export const DeleteCon = ({ recordId, open, onCancel }: DeleteConProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this lesson record? Once
                        deleted, it cannot be recovered.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={"bg-red-600 hover:bg-red-500"}
                        onClick={async () => {
                            try {
                                const deleteLesson =
                                    await deleteLessonAction(recordId);
                                if (deleteLesson) {
                                    toast.success("Lesson Record Deleted", {
                                        duration: 2000,
                                    });
                                } else {
                                    toast.error(
                                        "Failed to delete lesson record",
                                        {
                                            duration: 2000,
                                        }
                                    );
                                }
                            } catch (error) {
                                console.error(
                                    "Error deleting lesson record:",
                                    error
                                );
                                toast.error(
                                    "An error occurred while deleting lesson record",
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
