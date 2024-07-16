"use client";

import dynamic from "next/dynamic";

const CalendarComponent = dynamic(() => import("./calendar"), { ssr: false });

type Lesson = {
    date: string;
    start_time: string;
    end_time: string;
    student: {
        first_name: string;
        last_name: string;
        phone_number: string;
    };
};

type ClientCalendarProps = {
    data: Lesson[];
};

export default function ClientCalendar({ data }: ClientCalendarProps) {
    return <CalendarComponent data={data} />;
}
