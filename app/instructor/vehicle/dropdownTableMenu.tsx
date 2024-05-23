import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DeleteCon } from "@/app/instructor/vehicle/deleteCon";
import { EditCon } from "@/app/instructor/vehicle/editCon";
import { VehicleFormValues } from "@/types/shared/forms";

import { getVehicleByIdAction } from "@/app/instructor/vehicle/actions";
import { toast } from "sonner";

export type DropdownTableMenuTypes = {
    recordIds: number | { id: number };
};

export const DropdownTableMenu = ({ recordIds }: DropdownTableMenuTypes) => {
    const [selectedVehicleId, setSelectedVehicleId] = useState<
        number | undefined
    >(undefined);
    const [selectedVehicleInfo, setSelectedVehicleInfo] = useState<
        VehicleFormValues | undefined
    >(undefined);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

    const getVehicleIdType = (recordIds: number | { id: number }): number => {
        return typeof recordIds === "number" ? recordIds : recordIds.id;
    };

    const handleOpenEditDialog = async (recordId: number) => {
        try {
            const vehicleInfo = await getVehicleByIdAction(recordId);
            if (vehicleInfo === null) {
                toast.error("Failed to fetch vehicle maintenance information", {
                    duration: 2000,
                });
                return;
            }
            setSelectedVehicleInfo(vehicleInfo);
            setIsEditOpen(true);
        } catch (error) {
            console.error(
                "Error fetching vehicle maintenance information in FE:",
                error,
            );
            toast.error("An unexpected error occurred", {
                duration: 2000,
            });
        }
    };

    return (
        <>
            {isEditOpen && selectedVehicleInfo && (
                <EditCon
                    vehicleInfo={selectedVehicleInfo}
                    open={isEditOpen}
                    onCancel={() => {
                        setIsEditOpen(false);
                        setSelectedVehicleInfo(undefined);
                    }}
                />
            )}
            <DeleteCon
                recordId={selectedVehicleId!}
                open={isDeleteOpen}
                onCancel={() => {
                    setIsDeleteOpen(false);
                    setSelectedVehicleId(undefined);
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
                            handleOpenEditDialog(getVehicleIdType(recordIds));
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setSelectedVehicleId(getVehicleIdType(recordIds));
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
