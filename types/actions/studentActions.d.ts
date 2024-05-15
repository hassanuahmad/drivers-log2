export type FormStateAdd = {
    message: string;
    error?: string;
    fields?: Record<string, string>;
};

export type FormStateUpdate = {
    message: string;
    error?: string;
    fields?: Record<string, string>;
    studentId: number;
};
