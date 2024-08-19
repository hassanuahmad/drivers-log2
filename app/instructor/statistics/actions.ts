"use server";

import { createClient } from "@/utils/supabase/server";

export async function getYearlyStats(year: number) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) return null;

    let { data, error } = await supabase.rpc("get_yearly_stats", {
        i_id: userId,
        year,
    });

    if (error) {
        console.error("Error getting yearly stats in getYearlyStats", error);
        return null;
    }

    return data;
}

export async function getYearlyLessonsAction(year: number) {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in getYearlyLessonsAction!");
            return null;
        }

        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);

        const { data: lessons, error } = await supabase
            .from("lessons")
            .select("* , students(*)")
            .eq("instructor_id", userId)
            .gte("date", startDate.toISOString())
            .lt("date", endDate.toISOString())
            .order("date")
            .order("start_time");

        if (error) {
            console.error(
                "Error fetching lesson records in getYearlyLessonsAction:",
                error
            );
            return null;
        }

        return lessons;
    } catch (error) {
        console.error(
            "Error fetching lesson records in getYearlyLessonsAction:",
            error
        );
        throw error;
    }
}

export async function getYearlyVehicleAction(year: number) {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in getYearlyVehicleAction!");
            return null;
        }

        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);

        const { data: vehicle, error } = await supabase
            .from("vehicle")
            .select()
            .eq("instructor_id", userId)
            .gte("date", startDate.toISOString())
            .lt("date", endDate.toISOString())
            .order("date");

        if (error) {
            console.error(
                "Error fetching vehicle maintenance records in getYearlyVehicleAction:",
                error
            );
            return null;
        }

        return vehicle;
    } catch (error) {
        console.error(
            "Error fetching vehicle maintenance records in getYearlyVehicleAction:",
            error
        );
        throw error;
    }
}
