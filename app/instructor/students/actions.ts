"use server";

import { createClient } from "@/utils/supabase/server";
import { newStudentSchema } from "@/zod/schemas";
import { revalidatePath } from "next/cache";
import { FormStateAdd, FormStateUpdate } from "@/types/actions/studentActions";

// -----> HELPER FUNCTIONS START <-----

export async function fetchInstructorStudentsHelperFunction(
    phoneNumber: string,
) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;

    const { data: instructorStudents } = await supabase
        .from("instructor_student")
        .select("student_id")
        .eq("instructor_id", userId);

    const studentIds =
        instructorStudents?.map(({ student_id }) => student_id) || [];

    const { data: existingStudents } = await supabase
        .from("students")
        .select()
        .in("id", studentIds)
        .eq("phone_number", phoneNumber);

    return existingStudents;
}

// -----> HELPER FUNCTIONS END <-----

export async function addStudentAction(
    prevState: FormStateAdd,
    data: FormData,
) {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = newStudentSchema.safeParse(formData);

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

        let existingStudents = await fetchInstructorStudentsHelperFunction(
            parsedData.phone_number,
        );

        if (existingStudents && existingStudents?.length > 0) {
            return {
                message: "",
                error: "Student with this Phone Number already exists",
            };
        }

        const { error } = await supabase.from("students").insert(parsedData);

        if (error) {
            console.error("Error inserting a student", error);
            return {
                message: "",
                error: "Error inserting a student",
            };
        }

        revalidatePath("/instructor/students");
        return { message: "Successfully saved student" };
    } catch (error) {
        console.error("Error adding a student: ", error);
        throw error;
    }
}

export async function getStudentsAction() {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const user_id = user?.id;

        // FIX: Its grabbing all students regardless of the instructor_id because of the * in select
        const { data: students } = await supabase
            .from("students")
            .select("*, instructor_student(student_id, instructor_id)")
            .eq("instructor_student.instructor_id", user_id);

        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

// FIX:: When an error occurs or when the query is null, handle that properly and show that in the FE with a toast
export async function getStudentByIdAction(studentId: number) {
    const supabase = createClient();

    try {
        const { data: student } = await supabase
            .from("students")
            .select()
            .eq("id", studentId);

        if (student) return student[0];
    } catch (error) {
        console.error("Error fetching student:", error);
        throw error;
    }
}

export async function updateStudentInfoAction(
    prevState: FormStateUpdate,
    data: FormData,
) {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = newStudentSchema.safeParse(formData);

        if (!parse.success) {
            const fields: Record<string, string> = {};
            for (const key of Object.keys(formData)) {
                fields[key] = formData[key].toString();
            }
            return {
                message: "",
                error: "Invalid form data, please check your data",
                fields,
                studentId: prevState.studentId,
            };
        }

        const parsedData = parse.data;

        let existingStudents = await fetchInstructorStudentsHelperFunction(
            parsedData.phone_number,
        );

        if (
            existingStudents &&
            existingStudents.length > 0 &&
            existingStudents[0].id !== prevState.studentId
        ) {
            return {
                message: "",
                error: "Student with this Phone Number already exists",
                studentId: prevState.studentId,
            };
        }

        const { error } = await supabase
            .from("students")
            .update(parsedData)
            .eq("id", prevState.studentId);

        if (error) {
            console.error("Error updating the student", error);
            return {
                message: "",
                error: "Error updating the student",
                studentId: prevState.studentId,
            };
        }

        revalidatePath("/instructor/students");
        return {
            message: "Successfully updated student",
            studentId: prevState.studentId,
        };
    } catch (error) {
        console.error("Error updating a student: ", error);
        throw error;
    }
}

export async function deleteStudentAction(recordId: number) {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        const { error } = await supabase
            .from("instructor_student")
            .delete()
            .match({ instructor_id: userId, student_id: recordId });

        if (error) {
            console.error("Error deleting the student", error);
            return false;
        }

        revalidatePath("/instructor/students");
        return true;
    } catch (error) {
        console.error("Error: Deleting student", error);
        throw error;
    }
}
