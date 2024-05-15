import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  return <div>Dashboard</div>;
}
