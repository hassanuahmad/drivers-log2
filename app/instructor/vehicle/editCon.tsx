import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { updateVehicleInfoAction } from "@/app/instructor/vehicle/actions";

export type EditConProps = {
    vehicleInfo: VehicleFormValues;
    open: boolean;
    onCancel: () => void;
};

export const EditCon = ({ vehicleInfo, open, onCancel }: EditConProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction] = useFormState(updateVehicleInfoAction, {
        message: "",
        error: "",
        recordId: vehicleInfo.id as number,
    });

    const { date, odometer, gas, maintenance, remarks } = vehicleInfo;

    useEffect(() => {
        const { message, error } = state || {};

        if (message || error) {
            const variant = message ? "success" : "error";
            const description = message || error || "";

            toast[variant](description, {
                duration: 2000,
            });
            if (message) onCancel();
        }
    }, [state, toast]);

    const initialVehicleFormValues: VehicleFormValues = {
        date,
        odometer,
        gas,
        maintenance,
        remarks,
    };

    const [hiddenDateValue, setHiddenDateValue] = useState(date);
    const { pending } = useFormStatus();

    const form = useForm<z.infer<typeof newVehicleSchema>>({
        resolver: zodResolver(newVehicleSchema),
        defaultValues: initialVehicleFormValues,
    });

    return (
        <>
            <Dialog open={open} onOpenChange={onCancel}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Vehicle Maintenance Record</DialogTitle>
                    </DialogHeader>
                    <div>
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
                                <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
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
                                                                date > new Date() ||
                                                                date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <input
                                                    type="hidden"
                                                    name="date"
                                                    value={hiddenDateValue}
                                                />
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
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={pending}>
                                        Save changes
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
