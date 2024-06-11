import VehicleForm from "@/app/instructor/vehicle/vehicleForm";
import SectionHeading from "@/components/sectionHeading";
import View from "@/app/instructor/vehicle/view";
import {
  getVehicleAction,
  getTotalVehicle,
} from "@/app/instructor/vehicle/actions";

export default async function Page() {
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
        />
      </div>
    </>
  );
}
