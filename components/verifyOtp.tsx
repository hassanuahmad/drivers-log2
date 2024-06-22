import { useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { verifyOtpSchema } from "@/zod/schemas";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/app/auth/handleAuth";

type VerifyOtpProps = {
    from: string;
    email: string;
    handleVerifyText: () => void;
};

export default function VerifyOtp({
    from,
    email,
    handleVerifyText,
}: VerifyOtpProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();
    const router = useRouter();

    const [state, formAction] = useFormState(verifyOtp, {
        message: "",
        error: "",
        email: email,
    });

    useEffect(() => {
        const { message, error } = state || {};

        if (message || error) {
            const variant = message ? "success" : "error";
            const description = message || error || "";

            toast[variant](description, {
                duration: 3000,
            });
            // if (message) router.push("/instructor/lessons");
            if (message) router.push("/access");
        }
    }, [state, toast]);

    const form = useForm<z.infer<typeof verifyOtpSchema>>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            code: "",
        },
    });

    return (
        <>
            <Form {...form}>
                <form
                    ref={formRef}
                    action={formAction}
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.handleSubmit(() => {
                            formAction(new FormData(formRef.current!));
                        })(event);
                    }}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className="text-center">
                                <FormLabel className="text-center">
                                    Enter Verification Code
                                </FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the code sent to <strong>{email}</strong>.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        variant="primary"
                        className="w-full"
                        type="submit"
                        disabled={pending}
                    >
                        Verify
                    </Button>
                </form>
            </Form>
            {from === "register" ? (
                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link
                        href="/register"
                        onClick={handleVerifyText}
                        className="font-semibold leading-6 text-primary-color hover:text-primary-color-600"
                    >
                        Verify with another email address
                    </Link>
                </p>
            ) : (
                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link
                        href="/login"
                        onClick={handleVerifyText}
                        className="font-semibold leading-6 text-primary-color hover:text-primary-color-600"
                    >
                        Login again
                    </Link>
                </p>
            )}
        </>
    );
}
