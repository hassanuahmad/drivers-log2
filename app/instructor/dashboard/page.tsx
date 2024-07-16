import Stats from "@/app/instructor/dashboard/stats";
import { getDashboardStats } from "@/app/instructor/dashboard/actions";
import ClientCalendar from "./clientCalendar";

export default async function Page() {
    const data = await getDashboardStats();
    const title = `Hello ${data?.userFirstName}!`;

    return (
        <>
            <div className="container mx-auto">
                <div className="border-b border-gray-200 py-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                        {title}
                    </h3>
                    <p className="mt-2 max-w-4xl text-sm text-gray-500">
                        Let's drive success today!
                    </p>
                </div>
                <Stats data={data?.data} />
                <ClientCalendar data={data?.data.three_week_view} />
            </div>
        </>
    );
}
