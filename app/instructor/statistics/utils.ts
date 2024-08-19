import { saveAs } from "file-saver";
import Papa from "papaparse";
import { getYearlyLessonsAction, getYearlyVehicleAction } from "./actions";

const generateCsv = (data: any[], fileName: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
};

export const generateYearlyCsv = async (year: number) => {
    try {
        const lessonRecords = await getYearlyLessonsAction(year);
        const vehicleRecords = await getYearlyVehicleAction(year);

        if (!lessonRecords || !vehicleRecords) {
            throw new Error("Failed to fetch records");
        }

        const lessonData = lessonRecords.map((record, index) => ({
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

        const vehicleData = vehicleRecords.map((record, index) => ({
            id: index + 1,
            date: record.date,
            odometer: record.odometer,
            gas: record.gas,
            maintenance: record.maintenance,
            remarks: record.remarks,
        }));

        generateCsv(lessonData, `dl-yearly-lessons-${year}.csv`);
        generateCsv(vehicleData, `dl-yearly-vehicle-${year}.csv`);
    } catch (err) {
        console.error("Error generating CSV: ", err);
    }
};
