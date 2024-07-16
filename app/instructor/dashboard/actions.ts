"use server";

import { createClient } from "@/utils/supabase/server";

export async function getDashboardStats() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    const userFirstName = user?.user_metadata.first_name;
    if (!userId) return null;

    let { data, error } = await supabase.rpc("get_dashboard_stats", {
        i_id: userId,
    });

    if (error) {
        console.error(
            "Error getting dashboard stats in getDashboardStats",
            error
        );
        return null;
    }

    return { data, userFirstName };
}
