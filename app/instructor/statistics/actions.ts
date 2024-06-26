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
