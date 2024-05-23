export type FormStateAdd = {
    message: string;
    error?: string;
    fields?: Record<string, string>;
};

export type FormStateUpdateStudent = {
    message: string;
    error?: string;
    fields?: Record<string, string>;
    studentId: number;
};

export type FormStateUpdateVehicle = {
    message: string;
    error?: string;
    fields?: Record<string, string>;
    recordId: number;
};
