"use server";

import { createClient } from "@/utils/supabase/server";
import { registerSchema, loginSchema, verifyOtpSchema } from "@/zod/schemas";

type FormState = {
    message: string;
    error?: string;
};

export async function handleSignUp(prevState: FormState, data: FormData) {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = registerSchema.safeParse(formData);

        if (!parse.success) {
            return {
                message: "",
                error: "Invalid form data, please check your data",
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase.auth.signInWithOtp({
            email: parsedData.email,
            options: {
                data: {
                    first_name: parsedData.first_name,
                    last_name: parsedData.last_name,
                    has_access: false,
                },
            },
        });

        if (error) {
            console.error("Error registering user", error);
            return {
                message: "",
                error: "Error registering user",
            };
        }

        return { message: "Success" };
    } catch (error) {
        console.error("Error registering user", error);
        throw error;
    }
}

type FormStateOtp = {
    message: string;
    error?: string;
    email: string;
};

export async function verifyOtp(prevState: FormStateOtp, otpData: FormData) {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(otpData);
        const parse = verifyOtpSchema.safeParse(formData);

        if (!parse.success) {
            return {
                message: "",
                error: "Invalid form data, please check your data",
            };
        }

        const parsedData = parse.data;

        const { error } = await supabase.auth.verifyOtp({
            email: prevState.email,
            token: parsedData.code,
            type: "email",
        });

        if (error) {
            console.error("Error registering user", error);
            return {
                message: "",
                error: "Error registering user",
            };
        }

        return { message: "Success! Redirecting you to the platform" };
    } catch (error) {
        console.error("Error registering user", error);
        throw error;
    }
}

type FormStateLogin = {
    message: string;
    error?: string;
};

export async function handleLogin(prevState: FormStateLogin, data: FormData) {
    const supabase = createClient();

    try {
        const formData = Object.fromEntries(data);
        const parse = loginSchema.safeParse(formData);

        if (!parse.success) {
            return {
                message: "",
                error: "Invalid form data, please check your data",
            };
        }

        const { email } = parse.data;

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: process.env.NEXT_PUBLIC_EMAIL_REDIRECT_LINK,
            },
        });

        if (error) {
            console.error("Error logging the user", error);
            const errorMsg =
                error.code === "otp_disabled"
                    ? "Account not found. If you don't have an account, please register first"
                    : "Error logging the user";

            return {
                message: "",
                error: errorMsg,
            };
        }

        return { message: "Success" };
    } catch (error) {
        console.error("Error logging the user", error);
        throw error;
    }
}
