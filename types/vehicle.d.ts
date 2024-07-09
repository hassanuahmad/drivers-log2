export type VehicleRecord = {
    id: number;
    date: string;
    odometer: number;
    gas: number;
    maintenance: number;
    remarks: string;
};

export type TotalVehicle = {
    gas_total: number;
    maintenance_total: number;
};
