import VehicleForm from "@/app/demo/vehicle/vehicleForm";
import SectionHeading from "@/components/sectionHeading";
import View from "@/app/demo/vehicle/view";

export default async function Page() {
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Vehicle Maintenance"
                    description="Add vehicle maintenance record to keep track of your vehicle."
                />
                <VehicleForm />
                <View />
            </div>
        </>
    );
}
