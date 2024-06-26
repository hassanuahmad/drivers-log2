import SectionHeading from "@/components/sectionHeading";
import { getYearlyStats } from "@/app/instructor/statistics/actions";
import View from "@/app/instructor/statistics/view";

export default async function Page() {
    const year = new Date().getFullYear();
    const yearlyStats = await getYearlyStats(year);

    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Statistics"
                    description="View your yearly statistics"
                />
                <View getYearlyStats={getYearlyStats} yearlyStats={yearlyStats} />
            </div>
        </>
    );
}
