export interface LessonFormValues {
  id?: number;
  selected_student: string;
  date: string;
  start_time: string;
  end_time: string;
  payment_type: string;
  payment_amount: number;
  road_test: string;
  remarks: string;
}

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
