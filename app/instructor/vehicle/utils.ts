import { saveAs } from "file-saver";
import Papa from "papaparse";
import { VehicleRecord } from "@/types/vehicle";

export const generateVehicleCsv = (
    records: VehicleRecord[],
    month: Number,
    year: Number
) => {
    const data = records.map((record, index) => ({
        id: index + 1,
        date: record.date,
        odometer: record.odometer,
        gas: record.gas,
        maintenance: record.maintenance,
        remarks: record.remarks,
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const fileName = `dl-vehicle-${month}-${year}.csv`;
    saveAs(blob, fileName);
};
