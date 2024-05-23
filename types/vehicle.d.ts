export type VehicleRecord = {
    id: number;
    date: string;
    odometer: number;
    gas: number;
    maintenance: number;
    remarks: string;
};

/* {
    id: 54,
        instructor_id: 'c7efad90-5492-45a7-8b20-922d2a8e5398',
            date: '2024-05-07',
                odometer: 0,
                    gas: 0,
                        maintenance: 1,
                            remarks: '',
                                created_at: '2024-05-22T23:12:12.161365+00:00'
}
] */
export type TotalVehicle = {
    gas_total: number;
    maintenance_total: number;
};

export type GetVehicleAction = (
    month: string,
    year: number,
) => Promise<VehicleRecord[] | null>;

export type GetTotalVehicle = (
    instructor_id: string,
    month: string,
    year: number,
) => Promise<TotalVehicle | null>;
