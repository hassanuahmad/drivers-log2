"use server";

import { createClient } from "@/utils/supabase/server";
import { newVehicleSchema } from "@/zod/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { FormStateAdd, FormStateUpdateVehicle } from "@/types/actions/actions";

export async function addVehicleAction(
    prevState: FormStateAdd,
    data: FormData
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
}> {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = newVehicleSchema.safeParse(formData);

        if (!parse.success) {
            const fields: Record<string, string> = {};
            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                message: "",
                error: "Invalid form data, please check your data",
                fields,
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase.from("vehicle").insert(parsedData);

        if (error) {
            console.error(
                "Error inserting vehicle maintenance record (addVehicleAction)",
                error
            );
            return {
                message: "",
                error: "Error inserting vehicle maintenance record",
            };
        }

        revalidatePath("/instructor/vehicle");
        return { message: "Successfully saved vehicle maintenance record" };
    } catch (error) {
        console.error(
            "Error adding vehicle maintenance (addVehicleAction): ",
            error
        );
        throw error;
    }
}

export async function getVehicleAction(month: string, year: number) {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in getVehicleAction!");
            return null;
        }

        const monthNum = parseInt(month, 10);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            console.error("Invalid month value in getVehicleAction!");
            return null;
        }

        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 1);

        const { data: vehicle, error } = await supabase
            .from("vehicle")
            .select()
            .eq("instructor_id", userId)
            .gte("date", startDate.toISOString())
            .lt("date", endDate.toISOString())
            .order("date");

        if (error) {
            console.error(
                "Error fetching vehicle maintenance records in getVehicleAction:",
                error
            );
            return null;
        }

        return vehicle;
    } catch (error) {
        console.error(
            "Error fetching vehicle maintenance records in getVehicleAction:",
            error
        );
        throw error;
    }
}

export async function getTotalVehicle(
    instructor_id: string,
    month: string,
    year: number
) {
    const supabase = createClient();

    if (instructor_id === null) return null;

    let { data, error } = await supabase.rpc("calculate_total_vehicle", {
        i_id: instructor_id,
        month: month,
        year: year,
    });

    if (error) {
        console.error("Error getting total vehicle in getTotalVehicle ", error);
        return null;
    }
    return data;
}

export async function getVehicleByIdAction(recordId: number) {
    const supabase = createClient();

    try {
        const { data: vehicle, error } = await supabase
            .from("vehicle")
            .select()
            .eq("id", recordId);

        if (error) {
            console.error(
                "Error fetching vehicle maintenance record by id:",
                error
            );
            return null;
        }

        return vehicle.length ? vehicle[0] : null;
    } catch (error) {
        console.error(
            "Error fetching vehicle maintenance record by id:",
            error
        );
        return null;
    }
}

export async function updateVehicleInfoAction(
    prevState: FormStateUpdateVehicle,
    data: FormData
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
    recordId: number;
}> {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = newVehicleSchema.safeParse(formData);

        if (!parse.success) {
            const fields: Record<string, string> = {};
            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                message: "",
                error: "Invalid form data, please check your data",
                fields,
                recordId: prevState.recordId,
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase
            .from("vehicle")
            .update(parsedData)
            .eq("id", prevState.recordId);

        if (error) {
            console.error("Error updating vehicle maintenance record", error);
            return {
                message: "",
                error: "Error updating vehicle maintenance",
                recordId: prevState.recordId,
            };
        }

        revalidatePath("/instructor/vehicle");
        return {
            message: "Successfully updated vehicle maintenance record",
            recordId: prevState.recordId,
        };
    } catch (error) {
        console.error("Error updating vehicle maintenance record: ", error);
        throw error;
    }
}

export async function deleteVehicleAction(recordId: number): Promise<boolean> {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in deleteVehicleAction!");
            return false;
        }

        const { error } = await supabase
            .from("vehicle")
            .delete()
            .match({ instructor_id: userId, id: recordId });

        if (error) {
            console.error(
                "Error deleting the vehicle maintenance record",
                error
            );
            return false;
        }
        revalidatePath("/instructor/vehicle");
        return true;
    } catch (error) {
        console.error("Error: Deleting vehicle maintenance record", error);
        throw error;
    }
}
