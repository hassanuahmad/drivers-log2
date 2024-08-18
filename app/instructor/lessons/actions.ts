"use server";

import { createClient } from "@/utils/supabase/server";
import { newLessonSchema } from "@/zod/schemas";
import { revalidatePath } from "next/cache";
import { FormStateAdd, FormStateUpdateLesson } from "@/types/actions/actions";
import { differenceInMinutes } from "date-fns";

export async function addLessonAction(
    prevState: FormStateAdd,
    data: FormData
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
}> {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);

        const start = new Date(`1970-01-01T${formData.start_time}:00`);
        const end = new Date(`1970-01-01T${formData.end_time}:00`);
        const duration = differenceInMinutes(end, start);
        formData["duration"] = duration.toString();

        const parse = newLessonSchema.safeParse(formData);

        if (!parse.success) {
            const fields: Record<string, string> = {};
            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                message: "",
                error: "Invalid form data, please check your data",
                fields,
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase.from("lessons").insert(parsedData);

        if (error) {
            console.error(
                "Error inserting lesson record (addLessonAction)",
                error
            );
            return {
                message: "",
                error: "Error inserting lesson record",
            };
        }

        revalidatePath("/instructor/lessons");
        return { message: "Successfully saved lesson record" };
    } catch (error) {
        console.error("Error adding lesson (addLessonAction): ", error);
        throw error;
    }
}

export async function getLessonAction(month: string, year: number) {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in getLessonAction!");
            return null;
        }

        const monthNum = parseInt(month, 10);

        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
            console.error("Invalid month value in getLessonAction!");
            return null;
        }

        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 1);

        const { data: lessons, error } = await supabase
            .from("lessons")
            .select("* , students(*)")
            .eq("instructor_id", userId)
            .gte("date", startDate.toISOString())
            .lt("date", endDate.toISOString())
            .order("date")
            .order("start_time");

        if (error) {
            console.error(
                "Error fetching lesson records in getLessonAction:",
                error
            );
            return null;
        }

        return lessons;
    } catch (error) {
        console.error(
            "Error fetching lesson records in getLessonAction:",
            error
        );
        throw error;
    }
}

export async function getLessonsTotal(
    instructor_id: string,
    month: string,
    year: number
) {
    const supabase = createClient();

    if (instructor_id === null) return null;

    let { data, error } = await supabase.rpc("calculate_lessons_total", {
        i_id: instructor_id,
        month: month,
        year: year,
    });

    if (error) {
        console.error("Error getting lessons total in getLessonsTotal ", error);
        return null;
    }

    return data;
}

export async function getLessonByIdAction(recordId: number) {
    const supabase = createClient();

    try {
        const { data: lesson, error } = await supabase
            .from("lessons")
            .select("*, students(first_name)")
            .eq("id", recordId);

        if (error) {
            console.error("Error fetching lesson record by id:", error);
            return null;
        }

        return lesson.length ? lesson[0] : null;
    } catch (error) {
        console.error("Error fetching lesson record by id:", error);
        return null;
    }
}

export async function updateLessonInfoAction(
    prevState: FormStateUpdateLesson,
    data: FormData
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
    recordId: number;
}> {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);

        const start = new Date(`1970-01-01T${formData.start_time}`);
        const end = new Date(`1970-01-01T${formData.end_time}`);
        const duration = differenceInMinutes(end, start);
        formData["duration"] = duration.toString();

        const parse = newLessonSchema.safeParse(formData);

        if (!parse.success) {
            const fields: Record<string, string> = {};
            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                message: "",
                error: "Invalid form data, please check your data",
                fields,
                recordId: prevState.recordId,
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase
            .from("lessons")
            .update(parsedData)
            .eq("id", prevState.recordId);

        if (error) {
            console.error("Error updating lesson record", error);
            return {
                message: "",
                error: "Error updating lesson",
                recordId: prevState.recordId,
            };
        }

        revalidatePath("/instructor/lessons");
        return {
            message: "Successfully updated lesson record",
            recordId: prevState.recordId,
        };
    } catch (error) {
        console.error("Error updating lesson record: ", error);
        throw error;
    }
}

export async function deleteLessonAction(recordId: number): Promise<boolean> {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found in deleteLessonAction!");
            return false;
        }

        const { error } = await supabase
            .from("lessons")
            .delete()
            .match({ instructor_id: userId, id: recordId });

        if (error) {
            console.error("Error deleting the lesson record", error);
            return false;
        }
        revalidatePath("/instructor/lessons");
        return true;
    } catch (error) {
        console.error("Error: Deleting lesson record", error);
        throw error;
    }
}
