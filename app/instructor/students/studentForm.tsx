"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState, useFormStatus } from "react-dom";

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
import { Input } from "@/components/ui/input";

import { newStudentSchema } from "@/zod/schemas";
import { StudentFormValues } from "@/types/shared/forms";
import { addStudent } from "@/app/instructor/students/actions";

export default function StudentForm() {
    const [hiddenDrivingClassValue, setHiddenDrivingClassValue] = useState("G2");
    const [hiddenBdeValue, setHiddenBdeValue] = useState("No");
    const { pending } = useFormStatus();

    const initialStudentFormValues: StudentFormValues = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        driving_class: "G2",
        bde: "No",
        street_address: "",
        postal_code: "",
        city: "",
        province: "",
        country: "",
        remarks: "",
    };

    const form = useForm<z.infer<typeof newStudentSchema>>({
        resolver: zodResolver(newStudentSchema),
        defaultValues: initialStudentFormValues,
    });

    const [state, formAction] = useFormState(addStudent, { errors: [] });

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-8">
                <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.first_name}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.last_name}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.phone_number}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.email}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="driving_class"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Driving Class</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setHiddenDrivingClassValue(value);
                                    }}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="G2">G2</SelectItem>
                                        <SelectItem value="G">G</SelectItem>
                                    </SelectContent>
                                </Select>
                                <input
                                    type="hidden"
                                    name="driving_class"
                                    value={hiddenDrivingClassValue}
                                />
                                <FormMessage>{state?.errors?.driving_class}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bde"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>BDE</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setHiddenBdeValue(value);
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
                                        <SelectItem value="Yes">Yes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="bde" value={hiddenBdeValue} />

                                <FormMessage>{state?.errors?.bde}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street_address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                    {/*
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <Input {...field} />
                </Autocomplete>
                */}
                                </FormControl>
                                <FormMessage>{state?.errors?.street_address}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="postal_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.postal_code}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.city}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.province}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.country}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage>{state?.errors?.remarks}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={pending}>
                        Save Student
                    </Button>
                </div>
            </form>
        </Form>
    );
}
