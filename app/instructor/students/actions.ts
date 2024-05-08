"use server";

import { createClient } from "@/utils/supabase/server";
import { newStudentSchema } from "@/zod/schemas";

// TODO: fix prevState type so error in studentForm.tsx goes away.
export async function addStudent(
    prevState: { message: string },
    formData: FormData,
) {
    const supabase = createClient();

    const parse = newStudentSchema.safeParse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        phone_number: formData.get("phone_number"),
        email: formData.get("email"),
        driving_class: formData.get("driving_class"),
        bde: formData.get("bde"),
        street_address: formData.get("street_address"),
        postal_code: formData.get("postal_code"),
        city: formData.get("city"),
        province: formData.get("province"),
        country: formData.get("country"),
        remarks: formData.get("remarks"),
    });

    if (!parse.success) {
        return {
            errors: parse.error.flatten().fieldErrors,
        };
    }

    const data = parse.data;

    const { error } = await supabase.from("students").insert(data);

    console.log("error: ", error);
    // console.log("Data: ", data);
}
