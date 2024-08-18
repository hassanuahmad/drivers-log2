import { saveAs } from "file-saver";
import Papa from "papaparse";
import { LessonRecord } from "@/types/lessons";

type LessonsCsvRecord = LessonRecord & {
    duration: number;
    students: {
        street_address: string;
        city: string;
        province: string;
        postal_code: string;
        country: string;
        phone_number: string;
    };
};

export const generateLessonsCsv = (
    records: LessonsCsvRecord[],
    month: Number,
    year: Number
) => {
    const data = records.map((record, index) => ({
        id: index + 1,
        name: `${record.students.first_name} ${record.students.last_name}`,
        date: record.date,
        start_time: record.start_time,
        end_time: record.end_time,
        duration: record.duration,
        payment_amount: record.payment_amount,
        bde: record.students.bde,
        road_test: record.road_test,
        address: `${record.students.street_address}, ${record.students.city}, ${record.students.province} ${record.students.postal_code}, ${record.students.country}`,
        phone_number: record.students.phone_number,
        remarks: record.remarks,
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const fileName = `dl-lessons-${month}-${year}.csv`;
    saveAs(blob, fileName);
};
