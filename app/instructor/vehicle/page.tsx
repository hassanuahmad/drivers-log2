import VehicleForm from "@/app/instructor/vehicle/vehicleForm";
import SectionHeading from "@/components/sectionHeading";
import View from "@/app/instructor/vehicle/view";
import {
    getVehicleAction,
    getTotalVehicle,
} from "@/app/instructor/vehicle/actions";
import { monthOptions } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) return null;
    const month = monthOptions[new Date().getMonth()].value;
    const year = new Date().getFullYear();
    const vehicleRecords = await getVehicleAction(month, year);
    const vehicleTotal = await getTotalVehicle(userId, month, year);

    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Vehicle Maintenance"
                    description="Add vehicle maintenance record to keep track of your vehicle."
                />
            </div>
            <div className="container mx-auto">
                <VehicleForm />
            </div>
            <div className="container mx-auto py-10">
                <View
                    getVehicleAction={getVehicleAction}
                    getTotalVehicle={getTotalVehicle}
                    vehicleRecords={vehicleRecords}
                    vehicleTotal={vehicleTotal}
                />
            </div>
        </>
    );
}
