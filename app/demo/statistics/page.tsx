import SectionHeading from "@/components/sectionHeading";
import View from "@/app/demo/statistics/view";

export default async function Page() {
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Statistics"
                    description="View your yearly statistics"
                />
                <View />
            </div>
        </>
    );
}
