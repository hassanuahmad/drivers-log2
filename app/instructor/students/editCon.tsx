import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { newStudentSchema } from "@/zod/schemas";
import { StudentFormValues } from "@/types/shared/forms";
import { updateStudentInfoAction } from "@/app/instructor/students/actions";

export type EditConProps = {
    studentInfo: StudentFormValues;
    open: boolean;
    onCancel: () => void;
};

export const EditCon = ({ studentInfo, open, onCancel }: EditConProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction] = useFormState(updateStudentInfoAction, {
        message: "",
        error: "",
        studentId: studentInfo.id as number,
    });

    const {
        first_name,
        last_name,
        phone_number,
        email,
        driving_class,
        bde,
        street_address,
        postal_code,
        city,
        province,
        country,
        remarks,
    } = studentInfo;

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

    const initialStudentFormValues: StudentFormValues = {
        first_name,
        last_name,
        phone_number,
        email,
        driving_class,
        bde,
        street_address,
        postal_code,
        city,
        province,
        country,
        remarks,
    };

    const [hiddenDrivingClassValue, setHiddenDrivingClassValue] =
        useState(driving_class);
    const [hiddenBdeValue, setHiddenBdeValue] = useState(bde);
    const { pending } = useFormStatus();

    const form = useForm<z.infer<typeof newStudentSchema>>({
        resolver: zodResolver(newStudentSchema),
        defaultValues: initialStudentFormValues,
    });

    return (
        <>
            <Dialog open={open} onOpenChange={onCancel}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            Edit {studentInfo.first_name}'s Student Record
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
                                        formAction(
                                            new FormData(formRef.current!)
                                        );
                                    })(event);
                                }}
                                className="space-y-8"
                            >
                                <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="driving_class"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Driving Class
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        setHiddenDrivingClassValue(
                                                            value
                                                        );
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="G2">
                                                            G2
                                                        </SelectItem>
                                                        <SelectItem value="G">
                                                            G
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="driving_class"
                                                    value={
                                                        hiddenDrivingClassValue
                                                    }
                                                />
                                                <FormMessage />
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
                                                        setHiddenBdeValue(
                                                            value
                                                        );
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="No">
                                                            No
                                                        </SelectItem>
                                                        <SelectItem value="Yes">
                                                            Yes
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <input
                                                    type="hidden"
                                                    name="bde"
                                                    value={hiddenBdeValue}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="street_address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Street Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                    {/*
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <Input {...field} />
                </Autocomplete>
                */}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="postal_code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Postal Code
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
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
                                                <FormMessage />
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
                                                <FormMessage />
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
                                                <FormMessage />
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={pending}
                                    >
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
