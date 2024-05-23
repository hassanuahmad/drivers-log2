export type StudentFormValues = {
    id?: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    driving_class: string;
    bde: string;
    street_address: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
    remarks: string;
};

export interface VehicleFormValues {
    id?: number;
    date: string;
    odometer: number;
    gas: number;
    maintenance: number;
    remarks: string;
}
