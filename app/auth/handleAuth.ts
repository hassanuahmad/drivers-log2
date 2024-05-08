"use server";

import { createClient } from "@/utils/supabase/server";

// TODO: fix any type
export async function handleSignUp(formData: any) {
    const supabase = createClient();

    const data = {
        email: formData.get("email"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
    };

    const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
            },
            emailRedirectTo: process.env.NEXT_PUBLIC_EMAIL_REDIRECT_LINK,
        },
    });

    if (error) throw error;
}

// TODO: fix any type
export async function handleLogin(formData: any) {
    const supabase = createClient();

    const data = { email: formData.get("email") };

    const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: process.env.NEXT_PUBLIC_EMAIL_REDIRECT_LINK,
        },
    });

    if (error) throw error;
}
