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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import { newLessonSchema } from "@/zod/schemas";
import {
    LessonEditConType,
    LessonEditInitialFormValues,
} from "@/types/lessons";
import { updateLessonInfoAction } from "@/app/instructor/lessons/actions";

export type EditConProps = {
    lessonInfo: LessonEditConType;
    open: boolean;
    onCancel: () => void;
};

export const EditCon = ({ lessonInfo, open, onCancel }: EditConProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction] = useFormState(updateLessonInfoAction, {
        message: "",
        error: "",
        recordId: lessonInfo.id as number,
    });

    const {
        selected_student,
        date,
        start_time,
        end_time,
        payment_type,
        payment_amount,
        road_test,
        remarks,
    } = lessonInfo;

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

    const selected_student_string = selected_student.toString();

    const initialLessonFormValues: LessonEditInitialFormValues = {
        selected_student: selected_student_string,
        date,
        start_time,
        end_time,
        payment_type,
        payment_amount,
        road_test,
        remarks,
        ...(state?.fields ?? {}),
    };

    const [hiddenDateValue, setHiddenDateValue] = useState(date);
    const [hiddenPaymentTypeValue, setHiddenPaymentTypeValue] =
        useState(payment_type);
    const [hiddenRoadTestValue, setHiddenRoadTestValue] = useState(road_test);
    const { pending } = useFormStatus();

    const form = useForm<z.infer<typeof newLessonSchema>>({
        resolver: zodResolver(newLessonSchema),
        defaultValues: initialLessonFormValues,
    });

    return (
        <>
            <Dialog open={open} onOpenChange={onCancel}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Edit {lessonInfo.students.first_name}'s Lesson
                        </DialogTitle>
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
                                    {/* Added this hidden input because the FormDate requires it */}
                                    <input
                                        type="hidden"
                                        name="selected_student"
                                        value={selected_student}
                                    />
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
                                        name="start_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Time</FormLabel>
                                                <FormControl>
                                                    <Input type={"time"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="end_time"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Time</FormLabel>
                                                <FormControl>
                                                    <Input type={"time"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payment_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Type</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        setHiddenPaymentTypeValue(value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Interac">Interac</SelectItem>
                                                        <SelectItem value="Cash">Cash</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="payment_type"
                                                    value={hiddenPaymentTypeValue}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="payment_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Amount</FormLabel>
                                                <FormControl>
                                                    <Input type={"number"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="road_test"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Road Test</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        setHiddenRoadTestValue(value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="No">No</SelectItem>
                                                        <SelectItem value="Pass">Pass</SelectItem>
                                                        <SelectItem value="Fail">Fail</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="road_test"
                                                    value={hiddenRoadTestValue}
                                                />
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
