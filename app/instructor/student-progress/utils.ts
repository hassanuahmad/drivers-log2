import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { formatTotalHours } from "@/utils/utils";
import { createClient } from "@/utils/supabase/client";
import { StudentProgressLessonType } from "@/types/lessons";
import { StudentFormValues } from "@/types/shared/forms";
import { format } from "date-fns";

type PizZipUtilsType = {
    getBinaryContent: (
        url: string,
        callback: (
            error: Error | null,
            data: string | Uint8Array | null
        ) => void
    ) => void;
};

let PizZipUtils: PizZipUtilsType | null = null;
if (typeof window !== "undefined") {
    import("pizzip/utils/index.js").then(function (r) {
        PizZipUtils = r as unknown as PizZipUtilsType;
    });
}

function loadFile(
    url: string,
    callback: (error: Error | null, content: string | Uint8Array | null) => void
): void {
    if (PizZipUtils) {
        PizZipUtils.getBinaryContent(url, callback);
    } else {
        callback(new Error("PizZipUtils is not initialized"), null);
    }
}

type DocxTemplateError = {
    name: string;
    message: string;
    stack: string;
    properties: {
        id: string;
        explanation: string;
        xtag: string;
        offset: number;
        file: string;
    };
};

type RecordType = StudentProgressLessonType & {
    students: StudentFormValues;
};

export const generateBdeReport = async (records: RecordType[]) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
        console.error("No User ID found!");
        return null;
    }

    const { data } = supabase.storage
        .from("bde-templates")
        .getPublicUrl("east-star-bde-report.docx");

    loadFile(data.publicUrl, function (error, content) {
        if (error) {
            console.error("Error loading file:", error);
            throw error;
        }
        if (content === null) {
            throw new Error("File content is null");
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            linebreaks: true,
            paragraphLoop: true,
        });

        // Prepare your records, filling in with '-' if less than 10
        const preparedRecords = records.slice(0, 10).map((record, index) => ({
            i: index + 1,
            de: record.date || "-",
            ti: record.start_time || "-",
            to: record.end_time || "-",
            tt: formatTotalHours(record.duration) || "-",
        }));

        // Fill in remaining rows to make 10
        let nextIndex = preparedRecords.length + 1;
        while (preparedRecords.length < 10) {
            preparedRecords.push({
                i: nextIndex,
                de: "-",
                ti: "-",
                to: "-",
                tt: "-",
            });
            nextIndex++;
        }

        //instructor name
        const i_name =
            userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID
                ? process.env.NEXT_PUBLIC_INSTRUCTOR_NAME
                : "XYZ";
        //instructor licence
        const i_licence =
            userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID
                ? process.env.NEXT_PUBLIC_INSTRUCTOR_LICENCE
                : "XYZ";
        //instructor expiry date
        const i_expiry =
            userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID
                ? process.env.NEXT_PUBLIC_INSTRUCTOR_LICENCE_EXPIRY
                : "XYZ";
        //ontario licence
        const o_licence =
            userId === process.env.NEXT_PUBLIC_INSTRUCTOR_ID
                ? process.env.NEXT_PUBLIC_ONTARIO_LICENCE
                : "XYZ";

        const student_licence_number = records[0].students.licence_number;
        const student_licence_issue = records[0].students.issue_date;
        const student_licence_expiry = records[0].students.expiry_date;

        doc.setData({
            first_name: records[0].students.first_name.toUpperCase(),
            last_name: records[0].students.last_name.toUpperCase(),
            licence_number: student_licence_number
                ? student_licence_number
                : "XYZ",
            licence_issue: student_licence_issue
                ? student_licence_issue
                : "XYZ",
            licence_expiry: student_licence_expiry
                ? student_licence_expiry
                : "XYZ",
            address:
                records[0].students.street_address +
                " " +
                records[0].students.city +
                ", " +
                records[0].students.province +
                " " +
                records[0].students.postal_code,
            phone_number: records[0].students.phone_number,
            r: preparedRecords,
            i_name,
            i_licence,
            i_expiry,
            o_licence,
            todays_date: format(new Date(), "PPP"),
        });

        try {
            doc.render();
        } catch (error) {
            const typedError = error as {
                properties: { errors: DocxTemplateError };
            };
            console.error("Template Errors:", typedError.properties.errors);
        }

        const out = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(
            out,
            `${records[0].students.first_name} ${records[0].students.last_name} BDE Report.docx`
        );
    });
};
