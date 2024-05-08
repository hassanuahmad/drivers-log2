import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    // console.log("Data: ,", data);
    return <div>Dashboard</div>;
}
