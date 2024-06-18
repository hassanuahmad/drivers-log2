"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import { newLessonSchema } from "@/zod/schemas";
import { LessonFormValues, StudentFormValues } from "@/types/shared/forms";
import { addLessonAction } from "@/app/instructor/lessons/actions";

type StudentRecordType = {
    student_id: number;
    students: StudentFormValues;
};

interface LessonFormProps {
    studentRecords: StudentRecordType[];
}

export default function LessonForm({ studentRecords }: LessonFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const { pending } = useFormStatus();

    const [state, formAction] = useFormState(addLessonAction, {
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
            if (message) form.reset(initialLessonFormValues);
        }
    }, [state, toast]);

    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const [hiddenDateValue, setHiddenDateValue] = useState(formattedToday);
    const [hiddenSelectedStudentValue, setHiddenSelectedStudentValue] =
        useState("");
    const [hiddenPaymentTypeValue, setHiddenPaymentTypeValue] =
        useState("Interac");
    const [hiddenRoadTestValue, setHiddenRoadTestValue] = useState("No");
    const [isSelectedStudentOpen, setIsSelectedStudentOpen] =
        useState<boolean>(false);

    const initialLessonFormValues: LessonFormValues = {
        selected_student: "",
        date: formattedToday,
        start_time: "",
        end_time: "",
        payment_type: "Interac",
        payment_amount: 0,
        road_test: "No",
        remarks: "",
        ...(state?.fields ?? {}),
    };

    const form = useForm<z.infer<typeof newLessonSchema>>({
        resolver: zodResolver(newLessonSchema),
        defaultValues: initialLessonFormValues,
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
                            name="selected_student"
                            render={({ field }) => (
                                <FormItem className="flex flex-col justify-end">
                                    <FormLabel>Select Student</FormLabel>
                                    <Popover
                                        open={isSelectedStudentOpen}
                                        onOpenChange={setIsSelectedStudentOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value
                                                        ? `${studentRecords.find(
                                                            (studentRecord) =>
                                                                studentRecord.student_id ===
                                                                Number(field.value),
                                                        )?.students.first_name
                                                        } ${studentRecords.find(
                                                            (studentRecord) =>
                                                                studentRecord.student_id ===
                                                                Number(field.value),
                                                        )?.students.last_name
                                                        }`
                                                        : "Select Student"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-72 sm:w-auto p-0">
                                            <Command>
                                                <CommandInput placeholder="Search student..." />
                                                <CommandEmpty>No student found.</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandList>
                                                        {studentRecords.map((student) => (
                                                            <CommandItem
                                                                value={student.students.first_name}
                                                                key={student.student_id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "selected_student",
                                                                        String(student.student_id),
                                                                    );
                                                                    setHiddenSelectedStudentValue(
                                                                        String(student.student_id),
                                                                    );
                                                                    setIsSelectedStudentOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        student.student_id === Number(field.value)
                                                                            ? "opacity-100"
                                                                            : "opacity-0",
                                                                    )}
                                                                />
                                                                {student.students.first_name}{" "}
                                                                {student.students.last_name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandList>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <input
                                        type="hidden"
                                        name="selected_student"
                                        value={hiddenSelectedStudentValue}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
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
                        <div className={"sm:col-span-2 lg:col-span-5"}>
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
                            Save Lesson
                        </Button>
                    </div>
                    <div className="border-b border-gray-200" />
                </form>
            </Form>
        </>
    );
}
