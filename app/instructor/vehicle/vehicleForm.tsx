"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import { newVehicleSchema } from "@/zod/schemas";
import { VehicleFormValues } from "@/types/shared/forms";
import { addVehicleAction } from "@/app/instructor/vehicle/actions";

export default function VehicleForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();

    const [state, formAction] = useFormState(addVehicleAction, {
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
            if (message) form.reset(initialVehicleFormValues);
        }
    }, [state, toast]);

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const [hiddenDateValue, setHiddenDateValue] = useState(formattedToday);

    const initialVehicleFormValues: VehicleFormValues = {
        date: formattedToday,
        odometer: 0,
        gas: 0,
        maintenance: 0,
        remarks: "",
        ...(state?.fields ?? {}),
    };

    const form = useForm<z.infer<typeof newVehicleSchema>>({
        resolver: zodResolver(newVehicleSchema),
        defaultValues: initialVehicleFormValues,
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
                    className="space-y-8"
                >
                    <div
                        className={
                            "my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
                        }
                    >
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-end sm:h-[72px]">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(parseISO(field.value), "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={
                                                    field.value ? parseISO(field.value) : undefined
                                                }
                                                onSelect={(selectedDate) => {
                                                    if (selectedDate) {
                                                        const formattedDate = format(
                                                            selectedDate,
                                                            "yyyy-MM-dd",
                                                        );
                                                        field.onChange(formattedDate);
                                                        setHiddenDateValue(formattedDate);
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" name="date" value={hiddenDateValue} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="odometer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Odometer</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gas"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gas</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maintenance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maintenance</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="sm:col-span-2">
                            <FormField
                                control={form.control}
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Remarks</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button variant="primary" type="submit" disabled={pending}>
                            Save Maintenance
                        </Button>
                    </div>
                    <div className="border-b border-gray-200" />
                </form>
            </Form>
        </>
    );
}
