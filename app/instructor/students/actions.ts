"use server";

import { createClient } from "@/utils/supabase/server";
import { newStudentSchema } from "@/zod/schemas";
import { revalidatePath } from "next/cache";
import { StudentFormValues } from "@/types/shared/forms";
import { FormStateAdd, FormStateUpdateStudent } from "@/types/actions/actions";

// -----> HELPER FUNCTIONS START <-----

export async function fetchInstructorStudentsHelperFunction(
    phoneNumber: string,
) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
        console.error("No User ID found!");
        return null;
    }

    const { data: instructorStudents, error: instructorError } = await supabase
        .from("instructor_student")
        .select("student_id")
        .eq("instructor_id", userId);

    if (instructorError) {
        console.error("Error fetching instructor students:", instructorError);
        return null;
    }

    const studentIds =
        instructorStudents?.map(({ student_id }) => student_id) || [];

    if (studentIds.length === 0) return [];

    const { data: existingStudents, error: studentError } = await supabase
        .from("students")
        .select()
        .in("id", studentIds)
        .eq("phone_number", phoneNumber);

    if (studentError) {
        console.error("Error fetching students by phone number:", studentError);
        return null;
    }

    return existingStudents;
}

// -----> HELPER FUNCTIONS END <-----

export async function addStudentAction(
    prevState: FormStateAdd,
    data: FormData,
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
}> {
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

        if (existingStudents === null) {
            return {
                message: "",
                error:
                    "An error occured while adding the student, please refresh the page or login again",
            };
        }

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

export interface StudentRecordType {
    student_id: number;
    students: StudentFormValues;
    first_name: string;
}

export async function getStudentsAction(): Promise<StudentRecordType[] | null> {
    const supabase = createClient();

    // NOTE:: When student is deleted, it somwhow still pulls the students from the GET request (maybe use a supabase fn with a parameter)
    // Looks like its fixed but lets keep in mind until we do more testing

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found!");
            return null;
        }

        const { data, error } = await supabase
            .from("instructor_student")
            .select("student_id, students(*)")
            .eq("instructor_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching students:", error);
            return null;
        }

        // Type assertion to ensure correct typing
        // FIX: Fix the type : any here
        const students: StudentRecordType[] = data.map((record: any) => ({
            student_id: record.student_id,
            students: record.students as StudentFormValues,
            first_name: record.students.first_name,
        }));

        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

export async function getStudentByIdAction(studentId: number) {
    const supabase = createClient();

    try {
        const { data: student, error } = await supabase
            .from("students")
            .select()
            .eq("id", studentId);

        if (error) {
            console.error("Error fetching student:", error);
            return null;
        }

        return student.length ? student[0] : null;
    } catch (error) {
        console.error("Error fetching student:", error);
        return null;
    }
}

export async function updateStudentInfoAction(
    prevState: FormStateUpdateStudent,
    data: FormData,
): Promise<{
    message: string;
    error?: string;
    fields?: Record<string, string>;
    studentId: number;
}> {
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

export async function deleteStudentAction(recordId: number): Promise<boolean> {
    const supabase = createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
            console.error("No User ID found!");
            return false;
        }

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
