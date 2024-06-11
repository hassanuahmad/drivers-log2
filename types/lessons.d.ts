export type LessonRecord = {
    id?: number;
    name: string;
    bde: string;
    selected_student: number;
    date: string;
    start_time: string;
    end_time: string;
    payment_type: string;
    payment_amount: number;
    road_test: string;
    remarks: string;
    students: {
        first_name: string;
        last_name: string;
        bde: string;
    };
};

export type LessonTotal = {
    total_hours: number;
    total_interac: number;
    total_cash: number;
};

export type LessonEditConType = {
    id?: number;
    selected_student: number;
    date: string;
    start_time: string;
    end_time: string;
    payment_type: string;
    payment_amount: number;
    road_test: string;
    remarks: string;
    students: {
        first_name: string;
    };
};

export type LessonEditInitialFormValues = {
    id?: number;
    selected_student: string;
    date: string;
    start_time: string;
    end_time: string;
    payment_type: string;
    payment_amount: number;
    road_test: string;
    remarks: string;
};
