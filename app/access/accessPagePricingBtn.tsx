"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { handlePayment } from "@/app/access/actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

interface PaymentResult {
    success: boolean;
    url?: string;
    error?: string;
}

export default function AccessPagePricingBtn() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 2000,
            });

            const timer = setTimeout(() => {
                setError(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!user?.email) {
            setError("User email not found. Please log in.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = (await handlePayment(user.email)) as PaymentResult;
            if (result?.success && result?.url) {
                window.open(result.url, "_blank");
            } else {
                setError(result?.error || "Failed to create checkout session");
            }
        } catch (err) {
            console.error("Unexpected error: ", err);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="primary"
            className="mt-10 block w-full"
            onClick={onSubmit}
            disabled={isLoading || !user}
        >
            {isLoading ? "Processing..." : "Get access"}
        </Button>
    );
}
