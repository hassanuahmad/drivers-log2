"use server";

import { createClient } from "@/utils/supabase/server";

export async function getInstructorStudentsAction() {
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

        const { data: students, error } = await supabase
            .from("instructor_student")
            .select("student_id, students(*)")
            .eq("instructor_id", userId);

        if (error) {
            console.error("Error fetching students:", error);
            return null;
        }

        return students;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}
