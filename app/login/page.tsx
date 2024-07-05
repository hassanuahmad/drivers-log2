"use client";

import { useRef, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { loginSchema } from "@/zod/schemas";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { handleLogin } from "@/app/auth/handleAuth";
import { LoginFormValues } from "@/types/shared/forms";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import VerifyOtp from "@/components/verifyOtp";

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();

    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [canRequestOtp, setCanRequestOtp] = useState<boolean>(true);

    const [state, formAction] = useFormState(handleLogin, {
        message: "",
        error: "",
    });

    useEffect(() => {
        const { message, error } = state || {};

        if (message || error) {
            const variant = message ? "success" : "error";
            const description = message || error || "";

            toast[variant](description, {
                duration: 3000,
            });
            if (message) setShowOtpInput(true);
        }
    }, [state, toast]);

    const initialLoginValues: LoginFormValues = {
        email: "",
    };

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: initialLoginValues,
    });

    const handleLoginAgain = () => {
        setShowOtpInput(false);
        setEmail("");
        form.reset(initialLoginValues);
    };

    return (
        <>
            <div className="flex h-screen flex-1 flex-col justify-center content-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image src={logo} alt="logo" className="mx-auto w-auto h-16" />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Welcome back!
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!showOtpInput && (
                        <>
                            <Form {...form}>
                                <form
                                    ref={formRef}
                                    action={formAction}
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        if (!canRequestOtp) {
                                            toast.error(
                                                "Please wait 60 seconds before requesting a new code.",
                                            );
                                            return;
                                        }
                                        form.handleSubmit((data) => {
                                            formAction(new FormData(formRef.current!));
                                            setEmail(data.email);
                                            setCanRequestOtp(false);
                                            setTimeout(() => setCanRequestOtp(true), 60000);
                                        })(event);
                                    }}
                                    className="space-y-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="pt-4">
                                        <Button
                                            variant="primary"
                                            className="w-full"
                                            type="submit"
                                            disabled={pending}
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don't have an account yet?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold leading-6 text-primary-color-500 hover:text-primary-color-600"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </>
                    )}
                    {showOtpInput && (
                        <div className="flex flex-col items-center">
                            <VerifyOtp
                                from="login"
                                email={email}
                                handleVerifyText={handleLoginAgain}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
